

## Plan: Full E-Commerce Flow, Product Catalog Expansion & Lovable Cloud Backend

This plan transforms the site from a visual prototype into a functional pre-commerce platform with real auth, database-backed orders, and an expanded product catalog.

---

### 1. Expand Product Catalog — 3 Paddles + Apparel

Add two new paddles alongside the existing Gen 3 Haptic Pro:

- **Freakshow Gen 1 OG** — The original. Standard foam core, no sensors. $149. Status: In Stock.
- **Freakshow Gen 2 Trainer** — Smaller training paddle for drills. Thinner profile, lightweight. $189. Status: In Stock.
- **Freakshow Gen 3 Haptic Pro** — (existing) $289. Status: Pre-Order.

Update `ProductDetail.tsx` to include all three paddles in the `productData` map. Update `ProductShowcase` on the homepage to show all three paddles (not just the Gen 3). Each links to `/product/:slug`.

For apparel, change the "Sold Out" Tech-Hat to a pre-order item instead. Remove the "Notify" CTA; replace with a pre-order button.

### 2. Pre-Order + Freak Member Pricing

On every product detail page, replace the current "Buy Now — Instant Checkout" pink button with a **Freak Member Pre-Order** CTA:

- Show original price crossed out + 25% discount price (e.g., Gen 3: ~~$289~~ → **$216.75**)
- Label: "FREAK MEMBERS — PRE-ORDER EXCLUSIVE"
- Clicking this opens a **Pre-Order Flow page** (`/preorder/:slug`) that:
  1. Asks for email (or sign in via Google/Apple if authed)
  2. Shows the discounted price and product summary
  3. Has shipping address + dummy credit card fields (pre-filled with test data)
  4. "Confirm Pre-Order" button → saves order to database → shows confirmation

The regular "Add to Cart" at full price remains for standard checkout.

### 3. Enable Lovable Cloud — Auth + Database

**Authentication:**
- Enable Lovable Cloud with email + Google OAuth
- Create a simple auth flow: sign-in modal (email/password + Google) accessible from navbar
- Once signed in, user sees their name/avatar in the navbar instead of a sign-in button
- The existing EarlyAccessModal email capture also creates an account (or adds to waitlist table)

**Database tables:**
- `profiles` — user profile (name, avatar_url), linked to `auth.users`
- `user_roles` — role enum (admin, user), security definer function
- `waitlist` — email, source (which CTA they came from), created_at
- `orders` — user_id (nullable for guest), items (jsonb), total, status (pending/confirmed), shipping address, created_at
- `order_items` — order_id, product_slug, product_name, quantity, unit_price, size

RLS: users can read/insert their own orders and profile. Waitlist is insert-only for authenticated/anon.

### 4. Checkout Flow Upgrade

Enhance `CheckoutPage.tsx`:
- If user is authenticated, pre-fill email and name from profile
- Auto-fill dummy test card info (4242 4242 4242 4242, 12/28, 123) so users can "test" the flow
- On "Place Order", write the order to the `orders` table in Supabase
- Show order confirmation with a real order ID from the database
- Apple Pay / Google Pay buttons → same flow (simulated), writes to DB

### 5. Pre-Order Page

New route: `/preorder/:slug`

- Shows the product at Freak Member discount (25% off)
- If not signed in → prompts sign-in/sign-up first (inline, not a redirect)
- Shipping form + dummy card (pre-filled)
- "Confirm Pre-Order" → writes to `orders` table with status `preorder`
- Confirmation screen with order number, expected ship date, and "You saved $X" messaging

### 6. Wire All CTAs Consistently

- **"Shop the Revolution"** (Hero) → scrolls to hardware section
- **"Join the Freak-Flow"** (Hero) → opens EarlyAccessModal (writes to `waitlist` table)
- **"Shop Now"** buttons → navigate to the full product catalog or specific product
- **All "Add to Cart"** buttons → verified working everywhere, adds to cart context
- **"Pre-Order Exclusive"** (pink CTA on product pages) → `/preorder/:slug`
- **Social feed "Shop the Look"** → navigates to the relevant product page
- **Sold-out items** → show as pre-order instead

### 7. Mobile Responsiveness Pass

- Verify all new pages (pre-order, auth modal, expanded catalog) render cleanly on mobile
- Bottom-docked nav bar should include cart badge count
- Checkout and pre-order forms stack properly on small screens

### 8. Social Feeds (Discovery Only — No Implementation)

Social feed integration (TikTok/IG/YouTube API embedding) is noted for a future phase. Current social cards with placeholder images and platform-styled modals remain as-is.

---

### Technical Details

**Lovable Cloud setup:**
- Enable Cloud for auth + database
- Configure Google OAuth provider
- Run migrations for `profiles`, `user_roles`, `waitlist`, `orders`, `order_items` tables
- Set up RLS policies and triggers (auto-create profile on signup)

**New files:**
- `src/pages/PreorderPage.tsx` — Freak Member pre-order checkout
- `src/components/AuthModal.tsx` — Sign-in/sign-up modal (email + Google)
- `src/hooks/useAuth.ts` — Auth state hook wrapping Supabase `onAuthStateChange`
- `src/integrations/supabase/` — auto-generated client + types

**Modified files:**
- `src/pages/ProductDetail.tsx` — Add Gen 1, Gen 2 to product data; replace "Buy Now" with pre-order CTA
- `src/components/ProductShowcase.tsx` — Show all 3 paddles with links
- `src/components/GuerillaDropSection.tsx` — Change sold-out hat to pre-order
- `src/pages/ApparelDetail.tsx` — Pre-order flow for unavailable items
- `src/pages/CheckoutPage.tsx` — Auto-fill test card, write orders to DB
- `src/components/Navbar.tsx` — Auth state (show user or sign-in button)
- `src/components/EarlyAccessModal.tsx` — Write to `waitlist` table on submit
- `src/App.tsx` — Add `/preorder/:slug` route, wrap with auth provider
- `src/context/CartContext.tsx` — No major changes, works as-is

**New routes:**
- `/preorder/:slug` — Pre-order checkout page

