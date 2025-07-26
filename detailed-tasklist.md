# Construction Stock Manager - Detailed Task List

## Current Status Analysis
✅ **COMPLETED:**
- Basic Next.js project initialized with TypeScript and Tailwind CSS
- Supabase dependencies installed (@supabase/supabase-js, @supabase/auth-helpers-nextjs)
- **✅ PROJECT CLEANUP**: Moved main app from `/code/` to root, removed `/msc/` folder
- **✅ SHADCN/UI SETUP**: Full installation with Tailwind v3, components system ready
- **✅ CLEAN STRUCTURE**: Minimal, organized project structure with clear documentation

❌ **NOT STARTED:**
- Database schema design and creation
- Authentication system
- Core application functionality

---

## Detailed Implementation Roadmap

### Phase 0: Project Structure Cleanup & Setup ✅ **COMPLETED**
- [x] **0.1** Clean up project structure by moving main app from `/code/` to root
- [x] **0.2** Initialize shadcn/ui components library
- [ ] **0.3** Create .env.local file with Supabase configuration placeholders
- [x] **0.4** Set up Git repository properly

### Phase 1: Database Architecture & Authentication
- [ ] **1.1** Design and create database schema in Supabase:
  - [ ] Items table with tracking_type enum (Assets, Tracked, Untracked)
  - [ ] History table for audit trail
  - [ ] PurchaseOrders table for purchase management
- [ ] **1.2** Configure Row Level Security (RLS) policies
- [ ] **1.3** Create Supabase client configuration
- [ ] **1.4** Implement authentication system:
  - [ ] Login page with shadcn/ui components
  - [ ] Server Actions for auth
  - [ ] Middleware for route protection

### Phase 2: Core Backend Logic
- [ ] **2.1** Create database service functions:
  - [ ] CRUD operations for Items
  - [ ] History logging functions
  - [ ] Purchase Order management
- [ ] **2.2** Implement business logic:
  - [ ] Stock level checking
  - [ ] Auto-PO generation when min stock reached
  - [ ] Asset status management

### Phase 3: Frontend - Core Pages & Components
- [ ] **3.1** Main Layout with Navigation:
  - [ ] Sidebar with Stock/History/Orders navigation
  - [ ] User authentication state
- [ ] **3.2** Stock Dashboard (Main Page):
  - [ ] Three-tab interface (Assets, Tracked, Untracked)
  - [ ] Item cards with status badges
  - [ ] Quick action dialogs for stock updates
- [ ] **3.3** History/Audit Log Page:
  - [ ] Filterable data table with shadcn/ui
  - [ ] Search functionality
- [ ] **3.4** Purchase Orders Page:
  - [ ] PO listing with status management
  - [ ] Draft → Ordered → Received workflow

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
stock-manager/                    ← Clean root directory
├── src/
│   ├── app/                     ← Next.js App Router pages
│   │   ├── layout.tsx           ← Root layout
│   │   ├── page.tsx             ← Home page
│   │   └── globals.css          ← shadcn/ui CSS variables
│   ├── components/ui/           ← shadcn/ui components
│   │   └── button.tsx           ← Example component
│   └── lib/
│       └── utils.ts             ← Utility functions
├── public/                      ← Static assets
├── node_modules/                ← All dependencies consolidated
├── package.json                 ← Single source of truth for deps
├── components.json              ← shadcn/ui configuration
├── tailwind.config.js           ← Tailwind v3 setup
├── prd.md                       ← Product requirements
└── detailed-tasklist.md         ← This file
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
1. **Phase 0.3**: Create .env.local for Supabase config
2. **Phase 1.1**: Design database schema
3. **Phase 1.3**: Set up Supabase client