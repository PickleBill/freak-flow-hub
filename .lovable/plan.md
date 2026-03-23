

## Plan: Pickleball Freakshow — Full Polish & Functionality Pass

This is a comprehensive update across 7 areas. Here's the breakdown:

---

### 1. Glitch Animation on Navbar Brand Name (every 15s)
- Update the `Navbar.tsx` brand text to use a `useState` + `setInterval` approach that toggles a CSS glitch class every 15 seconds for ~500ms
- Create a new `@keyframes glitch-brand` animation in `index.css` that's shorter/punchier than the existing glitch
- Apply the same glitch effect on product/apparel detail page brand names

### 2. Subtle Hover Glitch on Interactive Cards
- Add a CSS `.hover-glitch` utility class that applies a very subtle glitch (tiny translate + hue-rotate) on hover
- Apply to: Freak-Flow social cards, Guerilla Drop product cards, Tech Dashboard stat cards, and feature cards on ProductShowcase
- Keep it subtle: 1-2px movement, quick duration

### 3. Freak-Flow Social Feed — Unique People Images + Modal Pop-ups
- Generate 5 unique pickleball athlete images (action shots, urban settings) for each social post instead of reusing `athlete-urban.jpg`
- Add a `Dialog` modal that opens when clicking a social post card
- Modal renders a platform-specific frame:
  - **TikTok**: vertical video placeholder with TikTok UI chrome
  - **Instagram**: square post with IG header/engagement bar
  - **YouTube**: 16:9 embed frame with YouTube player UI
- Modal includes the "Shop the Look" CTA within it

### 4. Tech Dashboard Visual Cleanup
- Redesign the dashboard preview section to be crisp and clean — replace the single large image with a structured HUD layout:
  - A clean paddle silhouette/icon with data overlays (swing arc, impact zone)
  - Stat cards with proper spacing and refined typography
  - Add subtle hover-glitch to stat cards
- Make it feel like an actual app interface, not just a screenshot

### 5. Checkout Flow (No Stripe — Mock Apple Pay / Express Checkout)
- Create a `CheckoutPage.tsx` with:
  - Order summary sidebar
  - Express checkout buttons (Apple Pay, Google Pay styled mock buttons)
  - Standard form: email, shipping address, card number fields
  - "Place Order" CTA that shows a success toast/confirmation
- Add cart state management via React Context (`CartContext`):
  - `addToCart`, `removeFromCart`, `cartItems`, `cartCount`
  - Cart drawer/sidebar accessible from navbar ShoppingBag icon
- Wire up all "Add to Cart" buttons across ProductDetail, ApparelDetail, ProductShowcase, FreakFlow, GuerillaDropSection
- Wire "Buy Now" buttons to navigate to checkout

### 6. Waitlist / Early Access CTAs Throughout Site
- Create an `EarlyAccessModal` component (reusable Dialog):
  - Email input field
  - "Sign up with Google" and "Sign up with Apple" mock buttons (icons + styled, no actual OAuth)
  - "Get Early Access" submit button with success state
- Place "Join the Waitlist" / "Get Early Access" CTAs in:
  - Hero section (add a third CTA or replace "Join the Freak-Flow")
  - Below the product showcase
  - Tech Dashboard section
  - Footer (enhance existing email capture)
  - Future of Freaking page CTA section
- All trigger the same `EarlyAccessModal`

### 7. Miscellaneous Polish
- Ensure all navbar links on sub-pages navigate home first then scroll to section
- Add route for `/checkout`
- Make the footer email capture functional (toast confirmation on submit)

---

### Technical Details

**New files:**
- `src/context/CartContext.tsx` — Cart state with React Context + useReducer
- `src/components/CartDrawer.tsx` — Slide-out cart sidebar using Sheet component
- `src/components/EarlyAccessModal.tsx` — Waitlist signup dialog
- `src/components/SocialPostModal.tsx` — Platform-specific social feed viewer
- `src/pages/CheckoutPage.tsx` — Mock checkout page
- 5 new athlete images in `src/assets/`

**Modified files:**
- `src/index.css` — Add `glitch-brand` keyframes, `.hover-glitch` utility
- `src/App.tsx` — Wrap in CartProvider, add `/checkout` route
- `src/components/Navbar.tsx` — Glitch interval on brand, cart count badge, cart drawer trigger
- `src/components/FreakFlowSection.tsx` — Unique images per post, click opens SocialPostModal, hover-glitch on cards
- `src/components/TechDashboard.tsx` — Redesign to clean HUD app mockup, hover-glitch on stat cards
- `src/components/ProductShowcase.tsx` — Wire Add to Cart, add early access CTA
- `src/components/GuerillaDropSection.tsx` — hover-glitch on cards
- `src/components/HeroSection.tsx` — Add early access CTA
- `src/components/FooterSection.tsx` — Enhanced email capture with toast
- `src/pages/ProductDetail.tsx` — Wire Add to Cart + Buy Now to checkout, hover-glitch on feature cards
- `src/pages/ApparelDetail.tsx` — Wire Add to Cart + Buy Now to checkout
- `src/pages/FutureOfFreaking.tsx` — Add early access CTA

