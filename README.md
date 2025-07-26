# Construction Stock Manager

A modern, responsive web application for managing construction tools and materials inventory.

## 📁 Project Structure

```
stock-manager/
├── src/app/                 # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── public/                 # Static assets (images, icons)
├── node_modules/           # Dependencies (auto-generated)
├── package.json           # Project dependencies & scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.ts         # Next.js configuration
└── prd.md                 # Product Requirements Document
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📋 Features (Planned)

- **Smart Stock Dashboard** - Three-tab view for Assets, Tracked, and Untracked inventory
- **Automated Purchase Orders** - Auto-generate POs when stock runs low
- **Audit History** - Complete trail of all inventory changes
- **Email Notifications** - Daily low-stock alerts
- **CSV Import** - Migrate from existing spreadsheets

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase
- **UI**: shadcn/ui + Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## 📖 Documentation

- `prd.md` - Product Requirements Document
- `detailed-tasklist.md` - Implementation roadmap
- `original-tasklist.md` - Original step-by-step guide