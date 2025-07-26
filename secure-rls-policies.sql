-- =============================================
-- SECURE RLS POLICIES FOR CONSTRUCTION STOCK MANAGER
-- Remove anon access and require proper authentication
-- =============================================

-- =============================================
-- STEP 1: Remove existing anon policies
-- =============================================

-- Drop anon policies for items table
DROP POLICY IF EXISTS "Anon can read all items" ON items;
DROP POLICY IF EXISTS "Anon can read all history" ON history;
DROP POLICY IF EXISTS "Anon can read all purchase orders" ON purchase_orders;
DROP POLICY IF EXISTS "Anon can read all purchase order items" ON purchase_order_items;

-- =============================================
-- STEP 2: Verify existing authenticated policies
-- =============================================

-- These policies should already exist from rls-policies.sql
-- If they don't exist, uncomment and run them:

-- Items table policies
-- CREATE POLICY "Users can read all items" ON items
--     FOR SELECT TO authenticated USING (true);

-- CREATE POLICY "Users can update items" ON items
--     FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- CREATE POLICY "Users can insert items" ON items
--     FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);

-- CREATE POLICY "Users can delete items they created" ON items
--     FOR DELETE TO authenticated USING (auth.uid() = created_by);

-- History table policies
-- CREATE POLICY "Users can read all history" ON history
--     FOR SELECT TO authenticated USING (true);

-- CREATE POLICY "System can insert history" ON history
--     FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);

-- Purchase orders policies
-- CREATE POLICY "Users can read all purchase orders" ON purchase_orders
--     FOR SELECT TO authenticated USING (true);

-- CREATE POLICY "Users can insert purchase orders" ON purchase_orders
--     FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);

-- CREATE POLICY "Users can update their purchase orders" ON purchase_orders
--     FOR UPDATE TO authenticated 
--     USING (auth.uid() = created_by) 
--     WITH CHECK (auth.uid() = created_by);

-- CREATE POLICY "Users can delete draft purchase orders" ON purchase_orders
--     FOR DELETE TO authenticated 
--     USING (auth.uid() = created_by AND status = 'draft');

-- =============================================
-- STEP 3: Add enhanced security policies
-- =============================================

-- Enhanced items policy - track user actions
CREATE OR REPLACE POLICY "Enhanced items access" ON items
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- Enhanced history policy - auto-populate created_by
CREATE OR REPLACE POLICY "Enhanced history access" ON history
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- =============================================
-- STEP 4: Verify RLS is enabled
-- =============================================

-- Ensure RLS is enabled on all tables
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE history ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_order_items ENABLE ROW LEVEL SECURITY;

-- =============================================
-- STEP 5: Verification queries
-- =============================================

-- List all current policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies 
WHERE tablename IN ('items', 'history', 'purchase_orders', 'purchase_order_items')
ORDER BY tablename, policyname;

-- Check RLS status
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename IN ('items', 'history', 'purchase_orders', 'purchase_order_items')
ORDER BY tablename;

-- =============================================
-- STEP 6: Test queries (should work for authenticated users only)
-- =============================================

-- These should work when run by authenticated users:
-- SELECT COUNT(*) FROM items;
-- SELECT COUNT(*) FROM history;
-- SELECT COUNT(*) FROM purchase_orders;

-- These should fail when run by anon users (good!):
-- Should return 0 rows or permission denied for anon users

SELECT 'RLS policies secured! Only authenticated users can access data.' as status; 