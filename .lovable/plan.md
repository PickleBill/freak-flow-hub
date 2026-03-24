

## Plan: Shop Page + Video Content in Freak-Flow

### 1. Create `/shop` Page (`src/pages/ShopPage.tsx`)

A dedicated catalog page with category filtering. Combines all paddles, apparel, and gear into one browsable grid.

**Data source:** Reuse the same product data already defined in `ProductShowcase.tsx` (3 paddles), `GuerillaDropSection.tsx` (7 apparel/gear items). Consolidate into a single array on this page with a `category` field: `"Paddles" | "Apparel" | "Gear"`.

**Category mapping:**
- Paddles: Gen 1 OG, Gen 2 Trainer, Gen 3 Haptic Pro
- Apparel: Renegade Tee, Cyber-Mesh Shorts, Freakshow Tech-Hat, Tropical Court Shirt, Chubby Freak Pants
- Gear: Electro-Ball LED Pickleballs, Neural Net Court Bag

**UI structure:**
- Top navbar (brand + back to home + cart icon)
- Category filter pills: ALL / Paddles / Apparel / Gear (neon-styled toggle buttons)
- Responsive product grid (2-col mobile, 3-col tablet, 4-col desktop)
- Each card: image, name, price, tag badge, "Add to Cart" button
- Clicking card navigates to `/product/:slug` for paddles or `/apparel/:slug` for apparel/gear

### 2. Add Route + Nav Link

**`src/App.tsx`:** Add `<Route path="/shop" element={<ShopPage />} />`.

**`src/components/Navbar.tsx`:** Add a "Shop" link to the nav that navigates to `/shop` (not a scroll target). Update the mobile bottom nav to link to `/shop` instead of scrolling to hardware.

### 3. Copy Videos + Add to Freak-Flow (`src/components/FreakFlowSection.tsx`)

Copy the two uploaded videos into `src/assets/`:
- `user-uploads://bluey_dad_body_4pane.mp4` → `src/assets/flow-video-instagram.mp4`
- `user-uploads://That_Shot.mov` → `src/assets/flow-video-youtube.mov`

Add two new entries to the `socialPosts` array — one as a YouTube post, one as Instagram. These will use `<video>` elements instead of `<img>` tags, with an on-brand overlay mask:

- Dark gradient overlay with platform badge (YouTube / Instagram)
- Neon-lime border glow on hover
- Play button overlay (already exists in current card design)
- The videos autoplay muted on hover, pause on mouse leave

**Card detection:** Add an optional `video` field to post objects. When present, render `<video>` instead of `<img>`, with `muted playsInline loop` attributes and hover-triggered play/pause.

### 4. Files Changed

| File | Change |
|------|--------|
| `src/pages/ShopPage.tsx` | New — full catalog page with filters |
| `src/App.tsx` | Add `/shop` route |
| `src/components/Navbar.tsx` | Add Shop nav link, update mobile bottom nav |
| `src/components/FreakFlowSection.tsx` | Add 2 video posts with video element rendering |
| `src/assets/flow-video-instagram.mp4` | Copied from upload |
| `src/assets/flow-video-youtube.mov` | Copied from upload |

