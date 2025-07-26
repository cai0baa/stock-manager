# Construction Stock Manager - Detailed Task List

## Current Status Analysis

✅ **COMPLETED:**

- Basic Next.js project initialized with TypeScript and Tailwind CSS
- Supabase dependencies installed (@supabase/supabase-js, @supabase/auth-helpers-nextjs)
- **✅ PROJECT CLEANUP**: Moved main app from `/code/` to root, removed `/msc/` folder
- **✅ SHADCN/UI SETUP**: Full installation with Tailwind v3, components system ready
- **✅ CLEAN STRUCTURE**: Minimal, organized project structure with clear documentation
- **✅ DATABASE SCHEMA**: Complete Supabase schema with Items, History, PurchaseOrders tables
- **✅ AUTHENTICATION**: Full auth system with login, middleware, and route protection
- **✅ DATABASE SERVICES**: Complete CRUD operations and history logging (Phase 2.1)
- **✅ DASHBOARD**: Real-time stats and activity feed from database
- **✅ ROOT PAGE FIX**: Properly redirects to login/dashboard based on auth state
- **✅ PHASE 3.2**: Complete main pages (Estoque/Histórico/Pedidos) with Supabase table previews
- **✅ NAVIGATION**: Working sidebar navigation with Portuguese labels and active states

🔄 **IN PROGRESS:**

- **🔒 PRIORITY**: Phase 3.5 - Security & Data Cleanup
  - Replace hardcoded admin/admin with proper Supabase Auth
  - Remove mock data and use only real Supabase data
  - Implement email whitelist for secure access
  - Clean up RLS policies to require authentication

✅ **RECENTLY COMPLETED:**

- **✅ SUPABASE CONNECTION**: Fixed environment variables and client setup
- **✅ DATA ACCESS**: Added anon policies to access real construction data
- **✅ REAL DATA VISIBLE**: Estoque page now shows actual construction items

❌ **NOT STARTED:**

- Phase 3.3: History/Audit Log Page enhancements
- Phase 3.4: Purchase Orders Page advanced features
- Phase 4: Advanced Features (email notifications, etc.)

✅ **JUST COMPLETED:**

- **🔧 SIMPLE AUTH SYSTEM**: Replaced Supabase auth with hardcoded admin/admin credentials
- **🔧 FIXED COOKIES**: Eliminated Next.js 15 compatibility warnings completely
- **🔧 STREAMLINED LOGIN**: Username/password with clear admin/admin instructions
- **🔧 MOCK DASHBOARD**: Replaced database calls with mock data for testing
- **🔧 SUPABASE CLIENT**: Updated database services to use admin client with fallback
- **🔧 ERROR HANDLING**: Graceful fallback when Supabase unavailable
- **📋 ESTOQUE PAGE**: Full inventory interface working with realistic construction data
- **📊 DASHBOARD**: Complete layout with sidebar navigation and Portuguese localization

❌ **NOT STARTED:**

- Purchase Order management functions
- Three-tab inventory interface (Assets/Tracked/Untracked)
- Advanced features and email notifications

---

## Detailed Implementation Roadmap

### Phase 0: Project Structure Cleanup & Setup ✅ **COMPLETED**

- [x] **0.1** Clean up project structure by moving main app from `/code/` to root
- [x] **0.2** Initialize shadcn/ui components library
- [x] **0.2.1** **BONUS**: Clean root folder - removed 15+ temporary import/cleanup scripts
- [x] **0.3** Create .env.local file with Supabase configuration placeholders
- [x] **0.4** Set up Git repository properly (GitHub connected & working)

### Phase 1: Database Architecture & Authentication

- [x] **1.1** Design and create database schema in Supabase:
  - [x] Items table with tracking_type enum (Assets, Tracked, Untracked)
  - [x] History table for audit trail
  - [x] PurchaseOrders table for purchase management
  - [x] **BONUS**: Complete CSV import system created (205 real inventory items)
  - [x] **FIXED**: Separate unit and category columns (no more cluttered descriptions)
  - [x] **FIXED**: Real location data only (no imaginary values)
  - [x] **FIXED**: Corrected "Ferramenta" items to be tracked (not assets)
  - [x] **RESOLVED**: Created cleanup scripts to fix duplicate entries
- [x] **1.1.1** Run cleanup script (`cleanup-and-corrected-import.sql`) to remove duplicates
- [x] **1.2** Configure Row Level Security (RLS) policies (fixed column name error)
- [x] **1.3** Create Supabase client configuration (TypeScript types + middleware)
- [x] **1.4** Implement authentication system:
  - [x] Login page with shadcn/ui components
  - [x] Server Actions for auth
  - [x] Middleware for route protection

### Phase 2: Core Backend Logic ✅ **COMPLETED**

- [x] **2.1** Create database service functions:
  - [x] CRUD operations for Items (✅ COMPLETED: src/lib/db-items.ts)
  - [x] History logging functions (✅ COMPLETED: src/lib/db-history.ts)
  - [x] Purchase Order management (✅ COMPLETED: src/lib/db-purchase-orders.ts)
- [x] **2.2** Implement business logic: ✅ COMPLETED
  - [x] Stock level checking (✅ COMPLETED: ItemsHelper.isLowStock)
  - [x] Auto-PO generation when min stock reached (✅ COMPLETED: AutoPOService + business-logic.ts)
  - [x] Asset status management (✅ COMPLETED: updateAssetStatus functions)
  - [x] **BONUS**: Complete business orchestrator with daily monitoring and smart recommendations

### Phase 3: Frontend - Core Pages & Components

- [x] **3.1** Main Layout with Navigation: ✅ COMPLETED
  - [x] Sidebar with Stock/History/Orders navigation (✅ Portuguese labels: Dashboard/Estoque/Histórico/Pedidos)
  - [x] User authentication state (✅ User profile in sidebar with sign out)
- [x] **3.2** Stock Dashboard (Main Page): ✅ COMPLETED
  - [x] Estoque page with items table preview from Supabase (✅ Working with fallback data)
  - [x] Histórico page with history table from Supabase (✅ /historico with before/after values)
  - [x] Pedidos page with purchase_orders + purchase_order_items tables (✅ /pedidos with relationship view)
  - [x] **BONUS**: Complete navigation system with Portuguese labels and active states
  - [ ] Quick action dialogs for stock updates
- [ ] **3.3** History/Audit Log Page:
  - [ ] Filterable data table with shadcn/ui
  - [ ] Search functionality
- [ ] **3.4** Purchase Orders Page:
  - [ ] PO listing with status management
  - [ ] Draft → Ordered → Received workflow

### Phase 3.5: 🔒 Security & Data Cleanup **PRIORITY**

#### **3.5.1 Implement Proper Authentication Security**

- [ ] **Replace hardcoded admin/admin with real Supabase Auth**
  - [ ] Set up Supabase Auth email/password system
  - [ ] Create email whitelist mechanism (only specific emails can access)
  - [ ] Implement user registration with email verification
  - [ ] Add email domain restriction or manual approval system
- [ ] **Secure RLS Policies**

  - [ ] Remove current anon RLS policies that allow open access
  - [ ] Restore authenticated-only RLS policies using auth.uid()
  - [ ] Test that unauthorized users cannot access data
  - [ ] Verify that only whitelisted emails can register and access

- [ ] **Update Authentication Flow**
  - [ ] Replace src/lib/auth-actions.ts with proper Supabase Auth
  - [ ] Update middleware to use real Supabase sessions
  - [ ] Add proper user session management
  - [ ] Implement secure logout functionality

#### **3.5.2 Remove Mock Data & Use Real Supabase Data**

- [ ] **Clean up Estoque Page**

  - [ ] Remove fallbackItemsData array from src/app/estoque/page.tsx
  - [ ] Remove fallback logic and dataSource switching
  - [ ] Use only real Supabase data via itemsClient.getAllItems()
  - [ ] Add proper error handling for failed database queries

- [ ] **Clean up Dashboard Page**

  - [ ] Remove mockStats object from src/app/dashboard/page.tsx
  - [ ] Remove mockRecentActivity array
  - [ ] Replace with real data from itemsClient.getItemStats()
  - [ ] Replace with real history data from historyClient queries

- [ ] **Update Connection Test**

  - [ ] Keep SupabaseTest component for debugging
  - [ ] Remove any mock aspects from the test
  - [ ] Show real item count and sample data
  - [ ] Add authentication status to the test

- [ ] **Verify All Pages Use Real Data**
  - [ ] Audit all components for mock/fallback data
  - [ ] Ensure Histórico page uses real history data
  - [ ] Ensure Pedidos page uses real purchase order data
  - [ ] Remove any remaining placeholder/mock content

### Phase 4: Advanced Features

- [ ] **4.1** Automated Purchase Order System:
  - [ ] Background process to monitor stock levels
  - [ ] Auto-generation of draft POs
- [ ] **4.2** CSV Import Feature:
  - [ ] File upload interface
  - [ ] CSV parsing and data validation
  - [ ] Bulk item creation
- [ ] **4.3** Email Notifications:
  - [ ] Supabase Edge Function for daily stock checks
  - [ ] Email service integration

### Phase 5: Polish & Deployment

- [ ] **5.1** Mobile Responsiveness:
  - [ ] Test and optimize for tablet/mobile use
  - [ ] Touch-friendly interactions
- [ ] **5.2** Performance Optimization:
  - [ ] Database query optimization
  - [ ] Client-side caching where appropriate
- [ ] **5.3** Testing & QA:
  - [ ] Unit tests for critical functions
  - [ ] E2E testing with Playwright
- [ ] **5.4** Deployment to Vercel

---

## Technical Requirements Checklist

### Database Schema (Items Table)

```sql
-- Items table structure needed:
- id: UUID (primary key)
- name: TEXT
- tracking_type: ENUM ('assets', 'tracked', 'untracked')
- quantity: INTEGER (nullable for assets)
- min_stock_level: INTEGER (nullable, for tracked items)
- status: TEXT (for assets: 'in_stock', 'on_site', 'maintenance')
- location: TEXT (optional)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### Required shadcn/ui Components

- [x] **INSTALLED**: Button component (test successful)
- [ ] Input, Card, Badge, Tabs
- [ ] Dialog, DataTable, Select, Form
- [ ] Alert, Toast for notifications

### Authentication Flow

- [ ] Email/password login only
- [ ] All routes protected except /login
- [ ] Session management with Supabase Auth

---

## ✅ Environment Status - READY FOR DEVELOPMENT

### Current Project Structure

```
stock-manager/                           ← Clean root directory
├── src/
│   ├── app/                            ← Next.js App Router pages
│   │   ├── layout.tsx                  ← Root layout
│   │   ├── page.tsx                    ← Home page
│   │   └── globals.css                 ← shadcn/ui CSS variables
│   ├── components/ui/                  ← shadcn/ui components
│   │   └── button.tsx                  ← Example component
│   └── lib/
│       └── utils.ts                    ← Utility functions
├── public/                             ← Static assets
├── node_modules/                       ← Dependencies
├── package.json                        ← Dependencies
├── components.json                     ← shadcn/ui configuration
├── tailwind.config.js                  ← Tailwind v3 setup
├── fixed-schema.sql                    ← Final database schema
├── corrected-complete-csv-import.sql   ← Final CSV import script
├── Estoque Modelo - Estoque.csv        ← Original data (reference)
├── prd.md                              ← Product requirements
├── detailed-tasklist.md                ← This file
└── README.md                           ← Project documentation
```

### Dependencies Installed & Verified

- ✅ Next.js 15.4.4 (App Router)
- ✅ TypeScript & React 19
- ✅ Tailwind CSS v3 (shadcn/ui compatible)
- ✅ Supabase client libraries
- ✅ shadcn/ui system (clsx, tailwind-merge, class-variance-authority)
- ✅ Lucide React icons
- ✅ Build process verified working

## Next Immediate Steps Available:

1. **Phase 1.4**: Implement authentication system with login page
2. **Phase 2.1**: Create database service functions for CRUD operations
3. **Phase 3.1**: Build main layout with navigation
