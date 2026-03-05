# Prod Bug Fixes: Auth & Loading Issues

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 3 live bugs found in prod test: signup fails, auth guard inconsistency, /my-profile stuck loading.

**Root causes:**
1. `routing="hash"` on `<SignUp>`/`<SignIn>` broken in Clerk v6 + Next.js 15 App Router → Continue does nothing
2. `ConvexProvider` + custom `ClerkConvexAdapter` doesn't pass auth tokens correctly (JWT template 'convex' missing) → Convex auth always null → `convexUser` stays null for signed-in users → "Please sign in" shows alongside "Logout" in sidebar
3. No timeout/error state on loading → infinite spinner on /my-profile

**Fix:**
1. `routing="path"` on both auth pages
2. Replace `ClerkConvexAdapter` + `ConvexProvider` with `ConvexProviderWithClerk` from `convex/react-clerk`
3. Contextual loading states in all 10 dashboard sections + timeout error state in ProfileDetails

---

### Task 1: Fix signup/login routing

**Files:**
- Modify: `src/app/(auth)/register/page.jsx`
- Modify: `src/app/(auth)/login/page.jsx`

Change `routing="hash"` to `routing="path"` and add the `path` prop.

Register: `<SignUp routing="path" path="/register" fallbackRedirectUrl={afterSignUpUrl} signInUrl="/login" />`
Login: `<SignIn routing="path" path="/login" fallbackRedirectUrl="/dashboard" signUpUrl="/register" />`

### Task 2: Fix Convex auth provider

**Files:**
- Modify: `src/components/Providers.jsx`

Replace `ConvexProvider` + `ClerkConvexAdapter` with `ConvexProviderWithClerk` from `convex/react-clerk`.

```jsx
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/nextjs";

// Remove: ClerkConvexAdapter function entirely
// Remove: ConvexProvider import

export default function Providers({ children }) {
  return (
    <ClerkProvider publishableKey={...}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ConvexUserSync />
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
```

### Task 3: Fix "Please sign in" messages (10 files)

**Files:**
- Modify: src/components/dashboard/section/DashboardInfo.jsx
- Modify: src/components/dashboard/section/MessageInfo.jsx
- Modify: src/components/dashboard/section/ReviewsInfo.jsx
- Modify: src/components/dashboard/section/PayoutInfo.jsx
- Modify: src/components/dashboard/section/SavedInfo.jsx
- Modify: src/components/dashboard/section/OrdersInfo.jsx
- Modify: src/components/dashboard/section/StatementInfo.jsx
- Modify: src/components/dashboard/section/ProposalInfo.jsx
- Modify: src/components/dashboard/section/ManageJobInfo.jsx
- Modify: src/components/dashboard/section/InvoiceInfo.jsx

Pattern in each file: find the `!userId` or `!convexUser` guard and replace message:
- `undefined` (still loading) → spinner
- `null` (Clerk user has no Convex record) → "Setting up your account..."
- has value → show content

### Task 4: Fix /my-profile loading states

**Files:**
- Modify: `src/components/dashboard/section/ProfileDetails.jsx`

Add timeout + proper error state using `isLoaded` from `useConvexProfile` → `useConvexUser`.
