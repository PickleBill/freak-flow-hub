## Plan: Final Cleanup Pass + Stripe Readiness

### Issues Found

1. **PreorderPage.tsx — Card fields still pre-filled** (lines 185-189): `defaultValue="4242 4242 4242 4242"`, `"12 / 28"`, `"123"` are still present. The CheckoutPage was fixed but the PreorderPage was missed. Also the disclaimer still says "Test mode — no real charges will be made." instead of the updated Stripe messaging.
2. **No other dead buttons or broken flows.** Everything else checks out: nav items match section order, footer links all wired, Apple button shows toast, restock modal personalized, countdown timer uses real date, size guide toast works, social proof bar present, aggregate rating bar present, all auth flows functional.
3. Yes, and also none of them are particularly broken, but I really don't like how the user flow on all the e-commerce things go to this dead page that there's no other interaction to it except to go back that's not a good e-commerce flow and it's like an extra step anyway like yeah, we can have detailed information about the products, but that should be like as part of the flow and like an optional learn more but like if they click check out or click anything like basically added to the card and definitely not send it to Paige you can only go back from like this has to be like a catalog type of thing or they can look at this and like instantly scroll you know to see other products like normally e-commerce standard best practices you don't want to put money at a dead end with called action and it does it on every product page so I want you to fix that in a.

### Changes

**File: `src/pages/PreorderPage.tsx**`

- Line 185: Remove `defaultValue="4242 4242 4242 4242"` from card number input
- Line 187: Remove `defaultValue="12 / 28"` from expiry input  
- Line 188: Remove `defaultValue="123"` from CVV input
- Line 191: Change disclaimer text to match CheckoutPage: "Stripe integration coming soon. Your order will be reserved and confirmed — you'll be contacted before any charge."

### Stripe Integration (Next Step)

Once this cleanup is done, we can enable Stripe for real payment processing. You mentioned you have API keys — after this pass we can wire up Stripe checkout for both the standard cart flow and the pre-order flow. That's a separate step after this cleanup lands.

### What's Already Solid

- Backend: Lovable Cloud is fully set up with `profiles`, `orders`, `order_items`, `waitlist`, and `user_roles` tables, all with RLS policies
- Auth: Email + Google OAuth working, Apple shows "coming soon" toast
- All buttons wired — zero silent clicks
- Homepage flow: Hero → Hardware → Ecosystem → Data → Drops → Flow → Reviews
- Mobile: bottom nav (4 items), responsive grids, wrapping stats