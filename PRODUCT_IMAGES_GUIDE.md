# Varad Water Solutions — Product Images Guide & Maintenance Manual

> **Target File:** `PRODUCT_IMAGES_GUIDE.md`  
> **Audience:** Developers, content managers, graphic designers, and site maintainers.  
> **Golden Rule:** Updating, adding, or replacing product images **never** requires redesigning cards, modifying pricing logic, altering responsive grids, or changing global brand styling.

---

# 1. Image Directory & File Structure

All actual product photography and renders are hosted directly within the public static asset folder of the project:

```text
varad-water-solutions/
├── public/
│   ├── newImages/                               <-- PRIMARY PRODUCT IMAGE FOLDER
│   │   ├── 100LphRoPlant.png                    (Commercial 100 LPH RO)
│   │   ├── 250LphRoPlant.png                    (Commercial 250 LPH RO)
│   │   ├── 500LphRoPlant.png                    (Industrial 500 LPH RO)
│   │   ├── WaterSoftener.png                    (Commercial Softener)
│   │   ├── P90Basic.png                         (Domestic P90 Basic)
│   │   ├── P90Classic.png                       (Domestic P90 Classic)
│   │   ├── P90Premium.png                       (Domestic P90 Premium)
│   │   ├── DewPremiumClassic.jpg                (Domestic Dew Classic)
│   │   ├── DewPremiumAutoflush.jpg              (Domestic Dew Autoflush)
│   │   ├── StainlessSteelPurifier-Maroon.png    (Domestic SS Maroon)
│   │   ├── StainlessSteelPurifier-White.png     (Domestic SS White)
│   │   ├── StainlessSteelPurifier-Blue.png      (Domestic SS Blue)
│   │   ├── StainlessSteelPurifier-Black.png     (Domestic SS Black)
│   │   └── DomesticMultiStageAlkalinePurifier.png (Domestic Multi-Stage)
│   └── images/
│       ├── varad-emblem.jpg                     (Brand Header Logo Emblem)
│       └── ...
```

### URL Resolution in Vite / React
Files stored inside `public/` are served at the web server's root domain:
- A file located at `public/newImages/P90Premium.png` is resolved in code and in the browser as:
  ```text
  /newImages/P90Premium.png
  ```
- **Do not** write `../public/newImages/...` or `public/newImages/...` in your code. Always start with an absolute forward-slash: `/newImages/<FileName>`.

---

# 2. Complete Product-to-Image Inventory

Every product on the website is mapped 1-to-1 in `src/data/products.js`:

| Product ID | Product Name | Category | Image File Path | Dimensions | Alpha Transparency |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `100lph-ro` | 100 LPH RO Plant | Commercial | `/newImages/100LphRoPlant.png` | 944 × 1126 | Transparent PNG |
| `250lph-ro` | 250 LPH RO Plant | Commercial / Institutional | `/newImages/250LphRoPlant.png` | 896 × 1195 | Transparent PNG |
| `500lph-ro` | 500 LPH Industrial RO Plant | Industrial | `/newImages/500LphRoPlant.png` | 1268 × 832 | Transparent PNG |
| `commercial-softener` | Commercial Water Softener | Water Softening | `/newImages/WaterSoftener.png` | 896 × 1195 | Transparent PNG |
| `p90-basic` | P90 Basic | Domestic | `/newImages/P90Basic.png` | 843 × 1264 | Transparent PNG |
| `p90-classic` | P90 Classic | Domestic | `/newImages/P90Classic.png` | 843 × 1264 | Transparent PNG |
| `p90-premium` | P90 Premium | Domestic | `/newImages/P90Premium.png` | 843 × 1264 | Transparent PNG |
| `dew-premium-classic` | Dew Premium Classic | Domestic | `/newImages/DewPremiumClassic.jpg` | 682 × 1024 | Clean Studio RGB |
| `dew-premium-autoflush` | Dew Premium Autoflush | Domestic | `/newImages/DewPremiumAutoflush.jpg` | 682 × 1024 | Clean Studio RGB |
| `ss-purifier-maroon` | Stainless Steel Purifier — Maroon | Domestic | `/newImages/StainlessSteelPurifier-Maroon.png` | 1408 × 768 | Transparent PNG |
| `ss-purifier-white` | Stainless Steel Purifier — White | Domestic | `/newImages/StainlessSteelPurifier-White.png` | 880 × 1197 | Transparent PNG |
| `ss-purifier-blue` | Stainless Steel Purifier — Blue | Domestic | `/newImages/StainlessSteelPurifier-Blue.png` | 880 × 1197 | Transparent PNG |
| `ss-purifier-black` | Stainless Steel Purifier — Black | Domestic | `/newImages/StainlessSteelPurifier-Black.png` | 880 × 1197 | Transparent PNG |
| `domestic-cyclone-alkaline` | Domestic Multi-Stage Alkaline Purifier | Domestic | `/newImages/DomesticMultiStageAlkalinePurifier.png` | 843 × 1264 | Transparent PNG |

---

# 3. Where Image Mapping is Configured

The central data store for all products is:

**`src/data/products.js`**

Each entry in the `productsData` array contains the `image` property:

```javascript
// src/data/products.js
export const productsData = [
  {
    id: "p90-premium",
    name: "P90 Premium",
    capacity: "Domestic Flow Rate",
    category: "Domestic",
    price: "Contact for quotation",
    gst: "18% extra",
    isVerified: false,
    tagline: "Advanced multi-stage domestic purification system",
    description: "High-tier domestic water purifier engineered for thorough mineral retention...",
    image: "/newImages/P90Premium.png", // <-- IMAGE POINTER
    keySpecs: [ ... ],
    features: [ ... ],
    recommendedFor: [ ... ]
  },
  // ...
];
```

---

# 4. How to Replace a Product Image (Step-by-Step)

Follow these steps to replace any product photo with an updated one:

### Step 1 — Prepare your new image asset
1. **Background**: Transparent cutout PNG or WebP is strongly recommended. This lets the engineering drafting grid and clean gradient canvas show through behind the unit.
2. **Crop & Padding**: Crop tightly to the edges of the physical unit, leaving approximately 4–6% transparent margin around the equipment so it doesn't clip against boundaries.
3. **Dimensions**: Minimum 800px on the shortest edge (e.g. 1000 × 1200px or 1200 × 800px).
4. **Optimization**: Keep file size under 600KB using tools like TinyPNG or Squoosh.

### Step 2 — Place the image into `public/newImages/`
Copy your prepared file into the directory:
```text
C:\Users\dell\...\varad-water-solutions\public\newImages\MyUpdatedModel.png
```

### Step 3 — Update `src/data/products.js`
Open `src/data/products.js`, locate the target product by its `id` or `name`, and update its `image` path:

```diff
  {
    id: "p90-premium",
    name: "P90 Premium",
-   image: "/newImages/P90Premium.png",
+   image: "/newImages/MyUpdatedModel.png",
    // ...
  }
```

### Step 4 — Save & Verify
Save `products.js`. The Vite dev server will trigger Hot Module Replacement (HMR) and update the card on `http://localhost:5173/products` instantly.

---

# 5. How to Add a New Product with an Image

When introducing a new purification system to the catalog:

1. Save the new image in `public/newImages/` (e.g. `1000LphRoPlant.png`).
2. Open `src/data/products.js` and add a new object to the end of `productsData`:

```javascript
{
  id: "1000lph-ro",
  name: "1000 LPH Industrial RO Plant",
  capacity: "1000 Litres / Hour",
  capacityValue: 1000,
  price: "[Custom Quotation]",
  priceRaw: null,
  gst: "18% extra",
  isVerified: false,
  category: "Industrial", // Options: "Commercial", "Industrial", "Water Softening", "Domestic"
  tagline: "High-capacity continuous industrial skid",
  description: "Heavy-duty industrial reverse osmosis plant designed for manufacturing facilities, bottling setups, and institutions.",
  image: "/newImages/1000LphRoPlant.png",
  keySpecs: [
    { label: "Flow Rate", value: "1000 Litres / Hour" },
    { label: "Recovery Rate", value: "Up to 60%" },
    { label: "Membranes", value: "8040 Industrial TFC Elements" },
    { label: "High Pressure Pump", value: "Multi-Stage Vertical Centrifugal" }
  ],
  features: [
    "Fully automated control panel with safety interlocks",
    "Continuous digital conductivity and TDS monitoring",
    "Dual rotameter permeate/reject flow indicators",
    "SS-304 industrial frame skid"
  ],
  recommendedFor: [
    "Packaged Drinking Water Plants",
    "Pharmaceutical Cleanrooms",
    "Textile Processing Units",
    "Large Residential Townships"
  ]
}
```

The new product will automatically:
- Appear in the product grid on `/products`.
- Filter under the correct category pill ("Industrial").
- Open the detailed specification modal on "View Details".
- Pre-populate the contact form on "Get Quote".

---

# 6. Card Layout & Image Sizing Architecture

Product card visuals are governed by:

**`src/components/ProductCard.jsx`**

### Visual Section Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│  [ Category Badge ]                  [ Verified / Status ]  │ <-- Absolute Top Bar (z-20)
│                                                             │
│                                                             │
│                      [ PRODUCT IMAGE ]                      │ <-- Centered & Grounded
│                 object-contain object-bottom                │     (Full Width & Height)
│                                                             │
│                                                   [ ID Tag] │ <-- Absolute Bottom Bar (z-20)
├─────────────────────────────────────────────────────────────┤ <-- Shelf Grounding Gradient
│  Product Name                                               │
│  ₹ Price + GST                                              │
│  Description text...                                        │
│  [ Spec 1 ]        [ Spec 2 ]                               │
├─────────────────────────────────────────────────────────────┤
│  [ View Details ]                [ Get Quote ]              │
└─────────────────────────────────────────────────────────────┘
```

### Key Layout Elements in `ProductCard.jsx`:

1. **Upper Image Canvas Container**:
   ```jsx
   <div className="relative h-64 sm:h-72 bg-gradient-to-b from-brand-coolWhite/90 via-brand-mistBlue/40 to-brand-mistBlue/70 border-b border-brand-border overflow-hidden">
   ```
   - `h-64 sm:h-72`: Provides **256px** vertical height on mobile and **288px** on desktop screens.
   - `bg-gradient-to-b`: Subtle architectural studio lighting from soft white to cool mist blue.
   - Architectural drafting grid background overlaid with `opacity-[0.035]`.

2. **Full-Section Image Wrapper**:
   ```jsx
   <div className="absolute inset-0 z-10 flex items-center justify-center p-4 pt-11 pb-2">
     <img
       src={product.image}
       alt={product.name}
       className="w-full h-full object-contain object-bottom filter drop-shadow-[0_12px_22px_rgba(18,59,82,0.13)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
       loading="lazy"
     />
   </div>
   ```

3. **Floating Top Badges**:
   ```jsx
   <div className="absolute top-3.5 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
     {/* Category Pill on Left, Status Badge on Right */}
   </div>
   ```
   - Floating with `z-20` and `backdrop-blur-sm` above the image.
   - Padded `pt-11` on the image container ensures the product never collides with or obscures the badges.

4. **Bottom Grounding Shelf & Gradient Dissolve**:
   ```jsx
   <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-brand-white/80 via-brand-white/30 to-transparent pointer-events-none z-15" />
   ```
   - Provides a natural studio "floor" where the product's base rests comfortably just above the lower border partition.

5. **Modal Image Display (`src/pages/Products.jsx` & `src/pages/Home.jsx`)**:
   ```jsx
   {selectedProductForModal.image && (
     <div className="w-full h-44 mb-4 rounded-lg bg-brand-paleBlue/30 border border-brand-border/60 flex items-center justify-center p-3 overflow-hidden">
       <img
         src={selectedProductForModal.image}
         alt={selectedProductForModal.name}
         className="max-h-full max-w-full object-contain filter drop-shadow-sm"
         loading="lazy"
       />
     </div>
   )}
   ```

---

# 7. Common Styling Classes Reference

| Tailwind Class | Purpose | Rationale |
| :--- | :--- | :--- |
| `h-64 sm:h-72` | Card visual container height | 256px on mobile screens, 288px on tablet & desktop for prominent, HD presence. |
| `w-full h-full` | Fill image container | Allows the image element to utilize 100% of the upper visual canvas. |
| `object-contain` | Aspect-ratio preservation | **CRITICAL:** Prevents stretching, squishing, or cropping of equipment components, valves, and gauges. |
| `object-bottom` | Vertical baseline alignment | Grounds the physical purifier or skid onto the bottom partition shelf. |
| `drop-shadow-[0_12px_22px_rgba(18,59,82,0.13)]` | High-fidelity drop shadow | Casts a soft, realistic studio shadow onto the card backdrop using the brand deep ocean blue palette. |
| `group-hover:scale-[1.03]` | Subtle hover zoom | Smooth 3% expansion when hovering over the card for interactive tactile feedback. |
| `duration-500 ease-out` | Animation easing | Prevents abrupt visual jumps; provides silk-smooth transition. |
| `loading="lazy"` | Performance optimization | Defers off-screen product image loading to accelerate Initial Page Load / Core Web Vitals. |

---

# 8. Responsive Behavior Across Breakpoints

| Breakpoint | Screen Width | Grid Columns | Image Canvas Height | Card Visual Presentation |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile (`< 640px`)** | 320px – 639px | 1 column (`grid-cols-1`) | `h-64` (256px) | Full card width; large, clearly visible product details with generous touch targets. |
| **Tablet (`sm` & `md`)** | 640px – 1023px | 2 columns (`sm:grid-cols-2`) | `sm:h-72` (288px) | Balanced two-column grid; HD sharpness preserved without awkward vertical gaps. |
| **Desktop (`lg` & `xl`)** | 1024px+ | 3 columns (`lg:grid-cols-3`) | `sm:h-72` (288px) | Spacious 3-column catalog layout with high-fidelity studio look and subtle hover states. |

---

# 9. Best Practices & Naming Conventions

### File Naming Conventions:
1. **PascalCase or kebab-case**: Use descriptive, readable names like `250LphRoPlant.png` or `dew-premium-classic.jpg`.
2. **Never use spaces**: Avoid filenames like `P90 Premium Final (1).png`. Rename them to `P90Premium.png`.
3. **Avoid special characters**: Do not include `#`, `%`, `&`, `?`, or quotes in image filenames.

### Recommended Formats:
- **PNG (`.png`)**: Best for products requiring transparent background isolation.
- **WebP (`.webp`)**: Modern, ultra-compressed format for fast web delivery.
- **JPEG (`.jpg`)**: Suitable for studio photography with clean, solid white or neutral backdrops.

### Resolution Guidelines:
- Minimum resolution: `800 × 800` pixels.
- Recommended resolution: `1000 × 1200` (vertical) or `1400 × 800` (horizontal).
- Keep source resolution crisp to avoid blurriness on Retina or 4K monitors.

---

# 10. Precautions & Troubleshooting

### 1. Image is not showing up (broken icon or empty space)
- **Check leading slash**: Paths must begin with `/` (e.g., `/newImages/MyImage.png`, NOT `newImages/MyImage.png` or `./newImages/MyImage.png`).
- **Check case sensitivity**: On Linux and modern web servers, `myimage.png` is **different** from `MyImage.PNG`. Match the exact casing.
- **Check file extension**: Ensure the file extension matches the actual format (e.g. `.png` vs `.jpg`).

### 2. Browser shows the old image after replacement (Browser Caching)
- Web browsers aggressively cache static assets. If you replaced a file with the exact same name, do a hard refresh:
  - Windows: `Ctrl + F5` or `Ctrl + Shift + R`
  - Mac: `Cmd + Shift + R`
- Or add a query parameter to force reload:
  ```javascript
  image: "/newImages/P90Premium.png?v=2"
  ```

### 3. Product appears stretched or squished
- Never replace `object-contain` with `object-fill`.
- `object-contain` ensures the intrinsic proportions of the water purifier are preserved at all times.

---

# 11. Maintenance Checklist for Future Updates

- [ ] Placed new image into `public/newImages/`.
- [ ] Verified filename has no spaces or illegal characters.
- [ ] Confirmed image has a clean transparent background or matching neutral backdrop.
- [ ] Verified `image:` path in `src/data/products.js` starts with `/newImages/`.
- [ ] Checked that `npm run build` succeeds without warnings.
- [ ] Verified card appearance on mobile (< 640px) and desktop (1280px+).
- [ ] Verified product modal dialog ("View Details") displays the photo cleanly.
- [ ] Verified "Get Quote" button navigates to `/contact?model=...` with the correct model query.
