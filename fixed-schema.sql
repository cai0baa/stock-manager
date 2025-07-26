-- Construction Stock Manager - FIXED Database Schema
-- Addresses: separate unit/category columns, real location data only

-- =============================================
-- CLEANUP EXISTING DATA (if needed)
-- =============================================

-- Drop triggers first
DROP TRIGGER IF EXISTS auto_po_generation_trigger ON items;
DROP TRIGGER IF EXISTS log_item_changes_trigger ON items;
DROP TRIGGER IF EXISTS update_items_updated_at ON items;

-- Drop functions
DROP FUNCTION IF EXISTS check_and_create_po();
DROP FUNCTION IF EXISTS log_item_changes();
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP FUNCTION IF EXISTS generate_po_number();

-- Clear all data
DELETE FROM purchase_order_items;
DELETE FROM purchase_orders;
DELETE FROM history;
DELETE FROM items;

-- Drop tables completely for fresh start
DROP TABLE IF EXISTS purchase_order_items CASCADE;
DROP TABLE IF EXISTS purchase_orders CASCADE;
DROP TABLE IF EXISTS history CASCADE;
DROP TABLE IF EXISTS items CASCADE;

-- Drop custom types
DROP TYPE IF EXISTS po_status CASCADE;
DROP TYPE IF EXISTS asset_status CASCADE;
DROP TYPE IF EXISTS tracking_type CASCADE;

-- =============================================
-- RECREATE SCHEMA WITH FIXES
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE tracking_type AS ENUM ('assets', 'tracked', 'untracked');
CREATE TYPE asset_status AS ENUM ('in_stock', 'on_site', 'maintenance');
CREATE TYPE po_status AS ENUM ('draft', 'ordered', 'received');

-- =============================================
-- ITEMS TABLE - FIXED with separate unit/category columns
-- =============================================
CREATE TABLE items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT, -- For actual descriptions/notes only
    unit TEXT NOT NULL, -- NEW: Unit of measurement (Placa, Saco, Rolo, etc.)
    category TEXT NOT NULL, -- NEW: Category (Gesso, Concreto, EPI, etc.)
    tracking_type tracking_type NOT NULL,
    
    -- Quantity fields (nullable for assets)
    quantity INTEGER CHECK (
        (tracking_type = 'assets' AND quantity IS NULL) OR 
        (tracking_type IN ('tracked', 'untracked') AND quantity >= 0)
    ),
    min_stock_level INTEGER CHECK (
        (tracking_type = 'tracked' AND min_stock_level > 0) OR 
        (tracking_type IN ('assets', 'untracked') AND min_stock_level IS NULL)
    ),
    
    -- Asset-specific fields
    status asset_status CHECK (
        (tracking_type = 'assets' AND status IS NOT NULL) OR 
        (tracking_type IN ('tracked', 'untracked') AND status IS NULL)
    ),
    location TEXT, -- KEPT but will only use real data from CSV
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    
    -- Validation constraint
    CONSTRAINT valid_tracking_config CHECK (
        (tracking_type = 'assets' AND quantity IS NULL AND min_stock_level IS NULL AND status IS NOT NULL) OR
        (tracking_type = 'tracked' AND quantity IS NOT NULL AND min_stock_level IS NOT NULL AND status IS NULL) OR
        (tracking_type = 'untracked' AND quantity IS NOT NULL AND min_stock_level IS NULL AND status IS NULL)
    )
);

-- =============================================
-- HISTORY TABLE - Updated to track unit/category changes
-- =============================================
CREATE TABLE history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    item_id UUID REFERENCES items(id) ON DELETE CASCADE,
    action TEXT NOT NULL, -- 'created', 'updated', 'checked_out', 'checked_in', 'stock_added', etc.
    
    -- Change details
    old_values JSONB,
    new_values JSONB,
    notes TEXT,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    
    -- For efficient filtering
    item_name TEXT, -- Denormalized for faster searches
    change_type TEXT -- 'quantity', 'status', 'location', 'unit', 'category', etc.
);

-- =============================================
-- PURCHASE ORDERS TABLE - Unchanged
-- =============================================
CREATE TABLE purchase_orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    po_number TEXT UNIQUE NOT NULL, -- Auto-generated: PO-YYYY-MM-DD-XXX
    status po_status DEFAULT 'draft',
    
    -- PO Details
    supplier_name TEXT,
    supplier_email TEXT,
    total_amount DECIMAL(10,2),
    notes TEXT,
    
    -- Lifecycle dates
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ordered_at TIMESTAMP WITH TIME ZONE,
    received_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES auth.users(id),
    
    -- Auto-generation flag
    auto_generated BOOLEAN DEFAULT FALSE
);

-- =============================================
-- PURCHASE ORDER ITEMS - Unchanged
-- =============================================
CREATE TABLE purchase_order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    po_id UUID REFERENCES purchase_orders(id) ON DELETE CASCADE,
    item_id UUID REFERENCES items(id),
    
    -- Order details
    requested_quantity INTEGER NOT NULL CHECK (requested_quantity > 0),
    received_quantity INTEGER DEFAULT 0 CHECK (received_quantity >= 0),
    unit_price DECIMAL(10,2),
    
    -- Snapshot data (in case item gets deleted)
    item_name TEXT NOT NULL,
    item_description TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INDEXES for performance - Updated for new columns
-- =============================================
CREATE INDEX idx_items_tracking_type ON items(tracking_type);
CREATE INDEX idx_items_name ON items(name);
CREATE INDEX idx_items_unit ON items(unit); -- NEW: Index for unit searches
CREATE INDEX idx_items_category ON items(category); -- NEW: Index for category searches
CREATE INDEX idx_items_status ON items(status) WHERE tracking_type = 'assets';
CREATE INDEX idx_items_low_stock ON items(tracking_type, quantity, min_stock_level) 
    WHERE tracking_type = 'tracked';

CREATE INDEX idx_history_item_id ON history(item_id);
CREATE INDEX idx_history_created_at ON history(created_at DESC);
CREATE INDEX idx_history_action ON history(action);

CREATE INDEX idx_po_status ON purchase_orders(status);
CREATE INDEX idx_po_created_at ON purchase_orders(created_at DESC);
CREATE INDEX idx_po_auto_generated ON purchase_orders(auto_generated) WHERE auto_generated = TRUE;

-- =============================================
-- FUNCTIONS for automation - Updated for new columns
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_items_updated_at 
    BEFORE UPDATE ON items 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Function to log changes to history table - Updated for new columns
CREATE OR REPLACE FUNCTION log_item_changes()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert history record for updates
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO history (item_id, action, old_values, new_values, item_name, change_type, created_by)
        VALUES (
            NEW.id,
            'updated',
            to_jsonb(OLD),
            to_jsonb(NEW),
            NEW.name,
            CASE 
                WHEN OLD.quantity != NEW.quantity THEN 'quantity'
                WHEN OLD.status != NEW.status THEN 'status'
                WHEN OLD.location != NEW.location THEN 'location'
                WHEN OLD.unit != NEW.unit THEN 'unit'
                WHEN OLD.category != NEW.category THEN 'category'
                ELSE 'general'
            END,
            auth.uid()
        );
        RETURN NEW;
    END IF;
    
    -- Insert history record for inserts
    IF TG_OP = 'INSERT' THEN
        INSERT INTO history (item_id, action, new_values, item_name, change_type, created_by)
        VALUES (
            NEW.id,
            'created',
            to_jsonb(NEW),
            NEW.name,
            'creation',
            auth.uid()
        );
        RETURN NEW;
    END IF;
    
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Trigger to auto-log changes
CREATE TRIGGER log_item_changes_trigger
    AFTER INSERT OR UPDATE ON items
    FOR EACH ROW
    EXECUTE FUNCTION log_item_changes();

-- Function to generate PO numbers
CREATE OR REPLACE FUNCTION generate_po_number()
RETURNS TEXT AS $$
DECLARE
    po_number TEXT;
    counter INTEGER;
BEGIN
    -- Get today's date in YYYY-MM-DD format
    SELECT COUNT(*) + 1 INTO counter 
    FROM purchase_orders 
    WHERE DATE(created_at) = CURRENT_DATE;
    
    -- Generate PO number: PO-YYYY-MM-DD-XXX
    po_number := 'PO-' || TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD') || '-' || LPAD(counter::TEXT, 3, '0');
    
    RETURN po_number;
END;
$$ language 'plpgsql';

-- Function to auto-generate PO for low stock items
CREATE OR REPLACE FUNCTION check_and_create_po()
RETURNS TRIGGER AS $$
BEGIN
    -- Only for tracked items that fall below minimum stock
    IF NEW.tracking_type = 'tracked' AND NEW.quantity <= NEW.min_stock_level THEN
        -- Check if there's already a pending PO for this item
        IF NOT EXISTS (
            SELECT 1 FROM purchase_order_items poi
            JOIN purchase_orders po ON poi.po_id = po.id
            WHERE poi.item_id = NEW.id 
            AND po.status IN ('draft', 'ordered')
        ) THEN
            -- Create auto-generated PO
            INSERT INTO purchase_orders (po_number, status, auto_generated, notes, created_by)
            VALUES (
                generate_po_number(),
                'draft',
                TRUE,
                'Auto-generated due to low stock: ' || NEW.name,
                auth.uid()
            );
            
            -- Add item to the PO
            INSERT INTO purchase_order_items (po_id, item_id, requested_quantity, item_name, item_description)
            VALUES (
                (SELECT id FROM purchase_orders ORDER BY created_at DESC LIMIT 1),
                NEW.id,
                GREATEST(NEW.min_stock_level * 2, 10), -- Order 2x minimum or 10, whichever is higher
                NEW.name,
                NEW.description
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for auto PO generation
CREATE TRIGGER auto_po_generation_trigger
    AFTER UPDATE ON items
    FOR EACH ROW
    EXECUTE FUNCTION check_and_create_po();

-- =============================================
-- SAMPLE DATA to verify schema works
-- =============================================

-- Sample with proper unit and category columns
INSERT INTO items (name, description, unit, category, tracking_type, quantity, min_stock_level, created_by) VALUES
('Placa ST Acartonado', NULL, 'Placa', 'Gesso', 'tracked', 10, 3, auth.uid()),
('Fita Papel Drywall', NULL, 'Rolo', 'Gesso', 'tracked', 2, 1, auth.uid()),
('Máscara PFF', NULL, 'Unidade', 'EPI', 'tracked', 19, 5, auth.uid());

-- Sample asset with real location from CSV
INSERT INTO items (name, description, unit, category, tracking_type, status, location, created_by) VALUES
('Máscara de Solda', 'Emprestado Donovan (Elisandro)', 'Unidade', 'EPI', 'assets', 'on_site', 'Com Donovan (Elisandro)', auth.uid());

-- Sample untracked item
INSERT INTO items (name, description, unit, category, tracking_type, quantity, created_by) VALUES
('Disco Metal 9"', NULL, 'Unidade', 'Disco', 'untracked', 20, auth.uid());

-- =============================================
-- VERIFICATION QUERIES
-- =============================================

-- Check the new structure
SELECT 
    name, 
    unit, 
    category, 
    tracking_type, 
    quantity, 
    min_stock_level, 
    status, 
    location,
    description
FROM items 
ORDER BY category, name
LIMIT 10;

-- Check if auto-POs were generated
SELECT COUNT(*) as auto_pos_created FROM purchase_orders WHERE auto_generated = true;

SELECT 'Fixed schema ready! Unit and category are now separate columns.' as status;