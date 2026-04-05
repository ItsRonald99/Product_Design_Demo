# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Next.js version notice

This project uses **Next.js 16** (Turbopack), which has breaking changes from earlier versions. Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`. Pay attention to deprecation notices. Key differences from older Next.js:

- Client-side navigation performance: if fixing slow navigations, `Suspense` alone is not enough — you must also export `unstable_instant` from the route. Read `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md`.
- Tailwind is v4, configured via `@tailwindcss/postcss` (not the classic `tailwind.config.js` plugin). Theme tokens are defined in `app/globals.css` under `@theme inline`, not in a config file.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build (also runs TypeScript check)
npm run lint     # ESLint
```

There are no tests in this project.

## Architecture

**This is a fully frontend-only app — no backend, no API calls.** All state is managed in-memory via Zustand with `localStorage` persistence (`storio-bank-storage` key).

### State (`store/useAppStore.ts`)

Single Zustand store with `persist` middleware. Shape:

- `balance: number` — current account balance
- `transactions: Transaction[]` — ordered newest-first; added via `addTransaction()`
- `cart: CartItem[]` — includes `emoji` field for display; mutated via `addToCart()`, `updateCartQty()`, `removeFromCart()`, `clearCart()`
- `loanApproved: boolean` — set by `applyLoan()`

`updateBalance(amount)` is additive (pass negative to deduct). Always pair a balance update with `addTransaction()` so the UI stays consistent.

### Routing

App Router pages, all static. Auth pages (`/login`, `/register`, `/forgot-password`) have no bottom nav. All other pages (`/home`, `/loan`, `/loan/offer`, `/loan/denied`, `/store`, `/cart`) render `<BottomNav />` manually at the bottom of each page component.

**Loan approval logic** (in `/loan/page.tsx`): `housing === "Own" && income > 60000` → `/loan/offer`, otherwise → `/loan/denied`.

**Purchase logic** (in `/cart/page.tsx`): `balance >= total` → deduct + transaction + clear cart + redirect to `/home`, otherwise → show insufficient funds modal.

### Styling

- Black/white/green theme. Background `#000`, cards `#111`, borders `#1e1e1e` or `#222`, muted text `#666` or `#888`, primary accent `green-500` (`#22c55e`).
- Mobile-first, max width `400px`, centered via the root layout wrapper.
- `lib/utils.ts` exports `cn()` (class merger), `formatCurrency()`, and `formatDate()`.
- Mock product data and `TAX_RATE = 0.13` live in `lib/mockData.ts`.
