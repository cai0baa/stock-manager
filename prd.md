Product Requirements Document (PRD): Consruction Stock Manager

1.  Introduction & Vision
    To develop a modern, responsive, web-based stock management application that replaces the current error-prone spreadsheet system. The application will provide real-time inventory tracking, intelligent alerts, and a detailed audit history for a construction business, simplifying operations and preventing stock shortages.

2.  Target User
    Construction site managers and workers who need a simple, fast, and reliable way to track tools and materials on a tablet or mobile device.

3.  Core Features (MVP)

    3.1. Unified Item Database: A single Items table in Supabase will manage all items, categorized by a tracking_type enum.

        Assets (Ferramenta): Unique, trackable tools. Tracks status (In Stock, On Site, Maintenance) and location.

        Tracked Inventory (Controle): Consumable materials with alerts. Tracks quantity and min_stock_level.

        Untracked Inventory (Nao Controle): Bulk consumables. Tracks quantity
        only, with no alerts.

    3.2. Smart Stock Dashboard: The main interface will feature a three-tab view to filter between Assets, Tracked Inventory, and Untracked Inventory. Items will display visual status badges (e.g., "Low Stock", "On Site") using shadcn/ui. Pop-up dialogs will allow for quick actions like checking items in/out or updating stock.

    3.3. Automated Purchase Order System: The system will automatically generate draft "Purchase Orders" when a "Tracked Inventory" item's quantity falls below its min_stock_level. Users can manage the PO lifecycle from Draft to Ordered to Received. Receiving a PO automatically updates stock levels.

    3.4. Filterable History Log: A comprehensive audit trail of every action (item created, stock updated, asset assigned). The log will be presented in a searchable and filterable shadcn/ui data table.

    3.5. Proactive Email Notifications: A daily Supabase Edge Function will scan the inventory. If any "Tracked Inventory" item has been below its minimum stock level for over 24 hours, a summary email will be sent to a designated manager.

    3.6. Simple User Authentication: A single login/logout system using email and password, managed by Supabase Auth. All pages will be protected and require a user to be logged in.

    3.7. Data Migration: A one-time "Import from CSV" feature to populate the database from the existing Google Sheet.

4.  Tech Stack

    Framework: Next.js (App Router)

    Database & Auth: Supabase

    UI Components: shadcn/ui

    Deployment: Vercel (recommended)

5.  Future Enhancements (Out of Scope for MVP)

    QR Code generation and scanning for rapid asset tracking.

    A dedicated "Sites" management tab for tracking asset distribution across multiple job sites.
