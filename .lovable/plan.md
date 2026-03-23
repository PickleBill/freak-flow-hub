

## Plan: Expand Catalog, Enable Stripe, Polish E-Commerce Flow

### 1. Enable Stripe Integration
Call `stripe--enable_stripe` to scaffold the Stripe integration. This sets up the framework — you'll provide your API key later. The checkout flow will be wired to use Stripe Checkout sessions.

### 2. Expand Apparel Catalog — New Wild Items
Add 4 new products to both `GuerillaDropSection.tsx` and `ApparelDetail.tsx`:

- **'Freakshow' Tropical Court Shirt** — $85 — Hawaiian-style button-up with neon paddle prints, UV-protective, mesh-back ventilation. Tag: DROP 004.
- **'Chubby Freak' Wide-Leg Pants** — $92 — Loud branded wide-leg pants with all-over Freakshow pattern, elastic waist, deep pockets. Tag: DROP 004.
- **'Electro-Ball' LED Pickleballs (3-pack)** — $34 — Glow-in-the-dark pickleballs with embedded LEDs, tournament-weight, USB rechargeable. Tag: NEW GEAR.
- **'Neural Net' Court Bag** — $120 — Tech-enabled duffel with paddle compartment, shoe pocket, NFC tag, and reflective branding. Tag: PRE-ORDER.

Since we don't have real images, we'll reuse existing asset images mapped creatively (e.g., `athlete-urban.jpg`, `apparel-collection.jpg`, `app-dashboard.jpg`, `athlete-1.jpg`).

**Files changed:**
- `src/components/GuerillaDropSection.tsx` — add 4 new product entries to the `products` array, update grid layout
- `src/pages/ApparelDetail.tsx` — add 4 matching entries to `apparelData` with sizes, details, materials

### 3. Add New Gear Route for Non-Apparel Items
The LED pickleballs and court bag aren't apparel — but they can share the `ApparelDetail` page pattern since it handles sizes and details generically. We'll route them through `/apparel/` for simplicity (rename concept to "gear" in the UI but keep the route).

### 4. Polish Checkout Flow with Stripe Placeholder
Update `CheckoutPage.tsx` to show a cleaner "Pay with Stripe" button that will eventually trigger a Stripe Checkout session. Remove the manual card fields entirely and replace with a single CTA that says "Pay with Stripe — ${total}" (disabled with "Coming soon" tooltip until API key is added).

**Files changed:**
- `src/pages/CheckoutPage.tsx` — replace card input fields with Stripe CTA button
- `src/pages/PreorderPage.tsx` — same treatment

### 5. Verify Cross-Sell Circularity
Ensure `ApparelDetail.tsx` cross-sell section shows the new items too (it already dynamically filters from `apparelData`, so adding entries is sufficient).

### Summary of Files
| File | Change |
|------|--------|
| `GuerillaDropSection.tsx` | Add 4 new products to array |
| `ApparelDetail.tsx` | Add 4 new product data entries |
| `CheckoutPage.tsx` | Replace card fields with Stripe CTA |
| `PreorderPage.tsx` | Replace card fields with Stripe CTA |
| Stripe enable | Call `stripe--enable_stripe` tool |

