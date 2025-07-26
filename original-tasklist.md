Step-by-Step Task List for Claude Code

This is your roadmap. Give these tasks to Claude one by one.

Phase 0: Project Setup

    Open the built-in terminal in Cursor (View -> Terminal or Ctrl+J).

    Run the following command to initialize the Next.js project:
    Bash

npx create-next-app@latest . -ts -tailwind --eslint --app --src-dir --import-alias "@/\*"

(Note the . which tells it to install in the current stock-manager directory).

In the same terminal, initialize shadcn/ui:
Bash

npx shadcn-ui@latest init

(Accept the defaults when it asks questions).

In the terminal, install the Supabase libraries:
Bash

npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

In the terminal, initialize a git repository:
Bash

git init && git add . && git commit -m "Initial commit: project setup"

Ask Claude to generate the content for a .env.local file with the necessary Supabase placeholders. Then, manually create the .env.local file yourself in the file explorer and paste the content in. You will add your secret keys here.

Phase 1: Database Schema (Supabase)

    "Based on our PRD, provide the SQL CREATE TABLE statements for our three main tables: Items, History, and PurchaseOrders. Remember to include the tracking_type enum for the Items table."

    (You will copy this SQL and run it in the Supabase SQL Editor yourself).

    "Provide the SQL statements to set up Row Level Security (RLS) on these tables, ensuring only authenticated users can access the data."

Phase 2: Backend Logic & Authentication

    "Create the Supabase authentication client. Set up the login page at /login with a simple email and password form using shadcn/ui components (Input, Button, Card)."

    "Implement the server-side logic (using Server Actions) to handle user login and logout."

    "Create a middleware file (middleware.ts) to protect all routes, redirecting unauthenticated users to the /login page."

    "Create the backend functions for all CRUD (Create, Read, Update, Delete) operations for the Items table. For example, a function to updateItemQuantity and another to checkoutAsset."

Phase 3: Frontend Development

    "Build the main layout (/src/app/layout.tsx) with a persistent sidebar. The sidebar should contain links to 'Stock', 'History', and 'Orders'."

    "Create the main Stock Dashboard page (/src/app/page.tsx). First, just fetch and display all items in a simple list."

    "Now, enhance the Stock Dashboard. Add the three-tab filter (shadcn/ui Tabs) for 'Assets', 'Tracked Inventory', and 'Untracked Inventory'."

    "Create a reusable ItemCard.tsx component. It should display the item's name and use shadcn/ui Badges to show its status ('Low Stock', 'On Site', etc.)."

    "Implement the 'Quick Action' dialogs. When a user clicks 'Add Stock' on an Item Card, a shadcn/ui Dialog should appear with a form to enter the new quantity."

    "Build the History page (/src/app/history/page.tsx). Use the shadcn/ui DataTable component to create a filterable and searchable table for the History log."

    "Build the initial Purchase Orders page (/src/app/orders/page.tsx). It should list all POs and their status."

Phase 4: Final Features & Polish

    "Implement the logic that automatically creates a draft Purchase Order when a 'Tracked Inventory' item is updated and its quantity falls below min_stock_level."

    "Create the 'Import from CSV' page. It should have a file upload button and a 'Process' button that will parse the CSV and add the items to the database."

    (Advanced) "Provide the code for a Supabase Edge Function named daily-low-stock-check that runs once a day, finds all items below their minimum stock for over 24 hours, and sends a summary email."

Review the entire application for responsiveness. In your terminal, run npm run dev to start the server. Then, you can ask Claude to use the @playwright tool to check the site on a simulated mobile device."
