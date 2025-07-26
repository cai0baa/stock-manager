# 🏗️ Construction Stock Manager

## Admin-Controlled Accounts – Implementation Plan

────────────────────────────────────────
PHASE 0 – Pre-Requisites (≈ 30 min)
────────────────────────────────────────

1. Supabase project on Free or higher tier (email provider enabled).
2. `.env.local` must contain
   ```
   NEXT_PUBLIC_SUPABASE_URL=…
   NEXT_PUBLIC_SUPABASE_ANON_KEY=…
   NEXT_PUBLIC_SITE_URL=http://localhost:3000   # or your prod URL
   ```
   ────────────────────────────────────────
   PHASE 1 – Turn OFF Public Sign-Ups (10 min)
   ────────────────────────────────────────
   Supabase → Auth → Settings
3. Disable **“Enable Signups”**.
4. Ensure all external OAuth providers are off.  
   → Only the **Service Role** key or invited email can create users.

────────────────────────────────────────
PHASE 2 – Admin User Management (≈ 60 min)
────────────────────────────────────────

### A. Server-side helpers (`src/lib/admin-users.ts`)

```ts
import { createServerClient } from "@supabase/ssr";

const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // *server env only*
);

export async function inviteUser(email: string) {
  return supabase.auth.admin.createUser({
    email,
    email_confirm: false, // sends “Set password” email
    invite_email: true,
  });
}

export async function removeUser(uid: string) {
  return supabase.auth.admin.deleteUser(uid);
}
```

Add to env (dev + prod):

### B. Optional lightweight Admin UI

Route `/admin/users` (restricted to your UID)  
• List current users • “Invite user” • “Remove”

### C. Invitation Flow

1. Admin runs `inviteUser(email)`
2. Supabase emails **“Set your password”** link
3. User clicks → `/auth/callback` (already handled)
4. User chooses password, logs in
5. Profile page lets them change/forget password later (`supabase.auth.updateUser`).

────────────────────────────────────────
PHASE 3 – Hardening Security (≈ 45 min)
────────────────────────────────────────

1. Keep RLS on all tables with `authenticated` role only.
2. Retain `isEmailAuthorized()` check in `auth-config.ts` (optional redundancy).
3. Middleware already checks session; extend to block non-whitelisted emails after invite.

────────────────────────────────────────
PHASE 4 – Forgot / Change Password (≈ 30 min)
────────────────────────────────────────

1. Login page: link “Forgot password?” → `/api/auth/reset-password`.
2. Handler:

```ts
const sb = createServerClient(...serviceRoleKey);
await sb.auth.resetPasswordForEmail(email, {
  redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
});
```

3. `/reset-password` page reads `access_token`, calls  
   `supabase.auth.updateUser({ password: newPassword })`.

────────────────────────────────────────
PHASE 5 – Remove Mock Data (≈ 60 min)
────────────────────────────────────────

1. Delete `mockStats`, `mockRecentActivity`, fallback arrays.
2. Replace with real queries (`itemsClient`, `historyClient`).
3. Re-run `secure-rls-policies.sql`.

────────────────────────────────────────
PHASE 6 – Acceptance Tests (≈ 45 min)
────────────────────────────────────────

1. Invite two emails → confirm invitation & login.
2. Attempt random signup → **should fail**.
3. Remove user → immediate 401 on next request.
4. Forgot-password flow works end-to-end.

────────────────────────────────────────
FILE / ENV CHECKLIST
────────────────────────────────────────
• `src/lib/admin-users.ts` (new)  
• `src/app/admin/users/page.tsx` (optional UI)  
• `.env.local`  
 – `SUPABASE_SERVICE_ROLE_KEY`  
 – `NEXT_PUBLIC_SITE_URL`  
• Remove mock data in dashboard & estoque pages.  
• Update `middleware.ts` if extra checks needed.

────────────────────────────────────────
ROUGH TIMELINE
────────────────────────────────────────
Total ≈ **3–4 hours** (coding + testing).
