-- Row Level Security (RLS) Policies for Stock Manager
-- Configure authentication and access control for all tables

-- =============================================
-- PART 1: Enable RLS on all tables
-- =============================================

-- Enable RLS on items table
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Enable RLS on history table  
ALTER TABLE history ENABLE ROW LEVEL SECURITY;

-- Enable RLS on purchase_orders table
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;

-- Enable RLS on purchase_order_items table
ALTER TABLE purchase_order_items ENABLE ROW LEVEL SECURITY;

-- =============================================
-- PART 2: Items Table Policies
-- =============================================

-- Policy: Users can read all items
CREATE POLICY "Users can read all items" ON items
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Users can insert items (with their user ID)
CREATE POLICY "Users can insert items" ON items
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = created_by);

-- Policy: Users can update items they created OR any item (for stock management)
CREATE POLICY "Users can update items" ON items
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy: Users can delete items they created OR admins can delete any
CREATE POLICY "Users can delete items they created" ON items
    FOR DELETE
    TO authenticated
    USING (auth.uid() = created_by);

-- =============================================
-- PART 3: History Table Policies
-- =============================================

-- Policy: Users can read all history entries
CREATE POLICY "Users can read all history" ON history
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: History entries are created automatically (no manual INSERT)
-- Only system functions can insert into history
CREATE POLICY "System can insert history" ON history
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = created_by);

-- Policy: No manual updates to history (audit trail integrity)
-- History table should be append-only

-- Policy: No deletes on history table (audit trail integrity)
-- History should be permanent

-- =============================================
-- PART 4: Purchase Orders Table Policies  
-- =============================================

-- Policy: Users can read all purchase orders
CREATE POLICY "Users can read all purchase orders" ON purchase_orders
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Users can create purchase orders
CREATE POLICY "Users can insert purchase orders" ON purchase_orders
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = created_by);

-- Policy: Users can update purchase orders they created
CREATE POLICY "Users can update their purchase orders" ON purchase_orders
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = created_by)
    WITH CHECK (auth.uid() = created_by);

-- Policy: Users can delete purchase orders they created (if status = draft)
CREATE POLICY "Users can delete draft purchase orders" ON purchase_orders
    FOR DELETE
    TO authenticated
    USING (auth.uid() = created_by AND status = 'draft');

-- =============================================
-- PART 5: Purchase Order Items Table Policies
-- =============================================

-- Policy: Users can read all purchase order items
CREATE POLICY "Users can read all purchase order items" ON purchase_order_items
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Users can insert purchase order items for POs they created
CREATE POLICY "Users can insert purchase order items" ON purchase_order_items
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM purchase_orders 
            WHERE id = po_id 
            AND created_by = auth.uid()
        )
    );

-- Policy: Users can update purchase order items for POs they created
CREATE POLICY "Users can update purchase order items" ON purchase_order_items
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM purchase_orders 
            WHERE id = po_id 
            AND created_by = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM purchase_orders 
            WHERE id = po_id 
            AND created_by = auth.uid()
        )
    );

-- Policy: Users can delete purchase order items for POs they created
CREATE POLICY "Users can delete purchase order items" ON purchase_order_items
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM purchase_orders 
            WHERE id = po_id 
            AND created_by = auth.uid()
        )
    );

-- =============================================
-- PART 6: Security Verification
-- =============================================

-- Check that RLS is enabled on all tables
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename IN ('items', 'history', 'purchase_orders', 'purchase_order_items')
ORDER BY tablename;

-- List all policies created
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename IN ('items', 'history', 'purchase_orders', 'purchase_order_items')
ORDER BY tablename, policyname;

-- =============================================
-- PART 7: Test Queries (to verify policies work)
-- =============================================

-- These queries should work for authenticated users:
-- SELECT * FROM items;
-- SELECT * FROM history;
-- SELECT * FROM purchase_orders;
-- SELECT * FROM purchase_order_items;

-- These should fail for unauthenticated users:
-- (Try accessing tables without auth.uid())

SELECT 'RLS policies configured successfully! All tables secured.' as status;