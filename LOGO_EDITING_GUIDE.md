# Varad Water Solutions — Logo Image Replacement & Maintenance Guide

> **Target File:** `LOGO_EDITING_GUIDE.md`  
> **Audience:** Developers, designers, and site maintainers needing to replace or resize the company logo.  
> **Important Rule:** Replacing the logo does **NOT** require modifying the header layout, navigation links, mobile menu, animations, colors, or page components.

---

# 1. Current Logo Location & Implementation

In this project, the logo is centralized in a dedicated, reusable React component:

| Parameter | Current Value | Notes |
| :--- | :--- | :--- |
| **Component File** | `src/components/Logo.jsx` | Single source of truth for the site logo. |
| **Component Name** | `Logo` | Default exported React component: `export default function Logo(...)` |
| **Where Used** | 1. Header: `src/components/Navbar.jsx` (line 94)<br>2. Footer: `src/components/Footer.jsx` (line 22) | Any change made to `Logo.jsx` automatically updates both the navbar and the footer. |
| **Current Format** | Authentic Graphical Emblem (`/images/varad-emblem.jpg`) + CSS Typography | Exact user-provided emblem (droplet outline, central water/Ganesha symbol, green leaves, bottom wave) inside a 40×40px badge with adjacent brand text ("VARAD WATER Solutions"). |
| **Active Emblem Asset** | `public/images/varad-emblem.jpg` | Exact, unaltered image file directly used as the brand emblem. |
| **Browser Tab Favicon** | `public/favicon.svg` | Scalable vector icon used in `index.html` browser tab and Schema.org metadata. |

---

# 2. How to Replace the Logo Image (Step-by-Step)

Follow these steps when you have a new logo image file from your designer:

### Step 1 — Prepare the new logo file
- Ensure the image has a **transparent background** (not a solid white or black box).
- Trim any excessive transparent padding/whitespace around the edges of the logo artwork.

### Step 2 — Choose the recommended file format
- **Vector SVG (`.svg`)** *(Recommended)*: Sharp on all retina/4K displays at any size.
- **WebP (`.webp`)** or **PNG (`.png`)**: High-resolution with 24-bit transparency.

### Step 3 — Recommended dimensions
- **If replacing only the icon mark (Square 1:1):** 80×80px up to 256×256px.
- **If replacing the full logo (Horizontal 3:1 to 5:1 with text included):** Width 300–500px, Height 80–120px.

### Step 4 — Place the image in the `public/` directory
Copy your new file into the `public/images/` folder:
```text
varad-water-solutions/
└── public/
    └── images/
        └── logo.svg   <-- (or logo.png / logo.webp)
```
*(Files in `public/` are accessible directly at root `/images/logo.svg` in your browser and code).*

### Step 5 — Update `src/components/Logo.jsx`
Open `src/components/Logo.jsx` and replace the visual element with your new `<img>` tag (detailed below in Section 3 and Section 9).

### Step 6 — Save & Verify
Save the file. Vite Hot Module Replacement (HMR) will update the logo in your browser instantly without losing your page state.

---

# 3. Two Replacement Methods

Choose the method that matches how your logo asset is designed:

---

## METHOD A: Replace Entire Logo with a Combined Image (Icon + Text in One File)

*Use this if your logo graphic already includes the company name "VARAD WATER SOLUTIONS" in the image itself.*

### Step 1:
Place `varad-logo.svg` (or `.png` / `.webp`) in `public/images/varad-logo.svg`.

### Step 2:
Open `src/components/Logo.jsx` and replace the return statement:

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '' }) {
  return (
    <Link 
      to="/" 
      className={`inline-flex items-center group ${className}`} 
      aria-label="Varad Water Solutions Home"
    >
      <img
        src="/images/varad-logo.svg"
        alt="Varad Water Solutions"
        className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        loading="eager"
      />
    </Link>
  );
}
```

### Why this is popular:
- Perfect visual reproduction of brand typography and graphics.
- Eliminates any font mismatches across different operating systems.
- Automatically scales and preserves exact aspect ratio via `h-9 sm:h-10 w-auto object-contain`.

---

## METHOD B: Replace Only the Icon Mark (Keep the HTML Brand Text)

*Use this if you have an icon mark (like the current authentic Varad emblem, or a custom water droplet, crest, or shield) and want to keep the clean, styled HTML typography beside it.*

### Step 1:
Place your image file in `public/images/` (for example, `public/images/varad-emblem.jpg`).

### Step 2:
Open `src/components/Logo.jsx` and inspect or update the `<img>` tag inside the 40×40px badge:

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '', showText = true }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 group ${className}`} aria-label="Varad Water Solutions Home">
      {/* 40x40px Icon Badge */}
      <div className="relative w-10 h-10 rounded-xl bg-brand-white border border-brand-border flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-brand-primaryBlue group-hover:shadow-card-soft">
        {/* Exact Authentic Graphical Emblem */}
        <img
          src="/images/varad-emblem.jpg"
          alt="Varad Water Solutions Emblem"
          className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
          loading="eager"
        />
      </div>

      {/* Styled Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-lg tracking-tight text-brand-ink group-hover:text-brand-primaryBlue transition-colors">
              VARAD
            </span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-brand-paleBlue border border-brand-border text-brand-primaryBlue font-semibold tracking-wider">
              WATER
            </span>
          </div>
          <span className="text-[10px] tracking-widest text-brand-bodyText uppercase font-medium">
             Solutions
          </span>
        </div>
      )}
    </Link>
  );
}
```

---

# 4. Logo Sizing, Styling, and Responsiveness

The logo's visual presentation is governed by standard Tailwind CSS utility classes:

### Dimensions Currently in Use
- **Icon Container:** `w-10 h-10` (40px wide by 40px tall).
- **Icon Graphic:** `w-5 h-5` / `w-6 h-6` (20px to 24px) centered inside the badge.
- **Combined Horizontal Logo (if using Method A):** `h-9 sm:h-10 w-auto` (36px high on mobile, 40px on tablet/desktop, with auto-proportional width).

### Responsive Classes Reference
| Problem | Cause | How to Fix in `Logo.jsx` |
| :--- | :--- | :--- |
| **Logo is too large** | Image height class is too big | Change `h-10` to `h-8` or `h-9` (e.g. `h-8 sm:h-9 w-auto`). |
| **Logo is too small** | Image height class is too small, or image file has empty transparent padding | Change `h-9` to `h-10 sm:h-11`. If still small, crop empty space from the image file. |
| **Logo looks stretched or squished** | Width and height are both explicitly set | Always use `h-X w-auto object-contain` so the aspect ratio is locked automatically. |
| **Logo is cropped on sides** | Container has `overflow-hidden` with fixed width | Remove fixed width and ensure `w-auto object-contain` is used. |
| **Logo is vertically misaligned** | Parent link missing flex alignment | Ensure `inline-flex items-center` is present on the outer `<Link>` tag. |

---

# 5. Do NOT Change the Header by Accident

> [!IMPORTANT]
> **Changing the logo image should NOT require changing the header layout, navigation, mobile menu, colors, or typography.**

- In `src/components/Navbar.jsx`, the header simply renders `<Logo />`:
  ```jsx
  {/* Line 94 in Navbar.jsx */}
  <Logo />
  ```
- Do **NOT** modify `<Navbar />` when updating the logo.
- Only edit `src/components/Logo.jsx`.
- Because `<Logo />` is also used in `src/components/Footer.jsx`, updating `src/components/Logo.jsx` updates both the header and footer simultaneously while maintaining 100% design consistency.

---

# 6. Logo Image File Requirements & Best Practices

To ensure your replacement logo looks sharp and premium:

1. **Format:**
   - **SVG (`.svg`)** is strongly recommended for infinite vector sharpness without pixelation.
   - If using a raster format, use **transparent WebP** or **PNG-24**. Avoid JPEG (`.jpg`) because JPEGs cannot have transparent backgrounds.
2. **Background:**
   - Must be transparent (`alpha: 0`).
   - Do **NOT** use a solid white rectangle background, as it will clash with the navbar's warm ivory (`#FAF9F4`) and blur states.
3. **Internal Padding:**
   - Crop all blank transparent margins tightly around the artwork.
   - *Why:* If your 200×200px PNG has 50px of blank empty space around the artwork, the logo will appear tiny on screen even when set to `h-10`.
4. **Resolution:**
   - If using PNG/WebP, export at **2× or 3× retina resolution** (e.g. for a 40px display height, export the image at 80px to 120px height).

---

# 7. Mobile Logo Behavior

The current implementation uses the **exact same `<Logo />` component on desktop, tablet, and mobile**.

### Optional: Showing a Compact Icon on Mobile vs Full Logo on Desktop
If you choose to use a full horizontal logo on desktop but want a compact square icon mark on mobile to save header space:

```jsx
export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center group ${className}`} aria-label="Varad Water Solutions Home">
      {/* Compact Icon on Mobile (< 640px) */}
      <img
        src="/images/logo-icon-only.svg"
        alt="Varad Water"
        className="block sm:hidden h-8 w-auto object-contain"
      />

      {/* Full Horizontal Logo on Tablet & Desktop (>= 640px) */}
      <img
        src="/images/varad-logo-full.svg"
        alt="Varad Water Solutions"
        className="hidden sm:block h-9 sm:h-10 w-auto object-contain"
      />
    </Link>
  );
}
```

---

# 8. Updating the Browser Favicon

To replace the browser tab icon (favicon):
1. Prepare your icon as a square SVG file named `favicon.svg`.
2. Overwrite `public/favicon.svg`.
3. In `index.html`, the favicon is linked at line 5:
   ```html
   <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
   ```
4. Clear your browser cache to see the new favicon.

---

# 9. "EDIT THIS" — Exact Code Location

Open **`src/components/Logo.jsx`**:

```jsx
// ==========================================
// FILE: src/components/Logo.jsx
// ==========================================
import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '', showText = true }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 group ${className}`} aria-label="Varad Water Solutions Home">
      
      {/* ==================================================== */}
      {/* >>> EDIT THIS SECTION TO CHANGE LOGO GRAPHIC <<<     */}
      {/* ==================================================== */}
      <div className="relative w-10 h-10 rounded-xl bg-brand-white border border-brand-border flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-brand-primaryBlue group-hover:shadow-card-soft">
        {/* Exact Authentic Graphical Emblem uploaded by user */}
        <img
          src="/images/varad-emblem.jpg"
          alt="Varad Water Solutions Emblem"
          className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
          loading="eager"
        />
      </div>
      {/* ==================================================== */}

      {/* Brand Text (Keep if using Method B, remove if using Method A) */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-lg tracking-tight text-brand-ink group-hover:text-brand-primaryBlue transition-colors">
              VARAD
            </span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-brand-paleBlue border border-brand-border text-brand-primaryBlue font-semibold tracking-wider">
              WATER
            </span>
          </div>
          <span className="text-[10px] tracking-widest text-brand-bodyText uppercase font-medium">
             Solutions
          </span>
        </div>
      )}
    </Link>
  );
}
```

### What to Change:
- **To change or replace the icon mark:**
  - Either overwrite `public/images/varad-emblem.jpg` with a new file of the same name.
  - Or place a new graphic in `public/images/` and change the `src` attribute (e.g. `src="/images/new-emblem.png"` or `src="/images/logo-mark.svg"`).
  - To adjust the padding or sizing inside the 40×40 badge, adjust `p-1` (e.g. `p-0.5` or `p-1.5`). Keep `object-contain` so proportions never warp.
- **To change the adjacent brand text:**
  - Edit `"VARAD"`, `"WATER"`, or `"Solutions"` directly in lines 21–29.

### What NOT to Change:
- Do **NOT** remove `<Link to="/">` — this provides the home route navigation.
- Do **NOT** remove `aria-label="Varad Water Solutions Home"` — this is required for accessibility.
- Do **NOT** touch `src/components/Navbar.jsx`.

---

# 10. Mobile Navigation Reference (Maintenance Guide)

For future maintainers who need to adjust the mobile navigation:

| Setting | Location in `src/components/Navbar.jsx` | Description |
| :--- | :--- | :--- |
| **Component** | `src/components/Navbar.jsx` | Main header and isolated mobile navigation layer. |
| **Open / Close State** | Line 19: `const [mobileMenuOpen, setMobileMenuOpen] = useState(false);` | Boolean state controlling whether the mobile drawer is open or closed. |
| **Responsive Breakpoint** | `lg:hidden` (Active on `< 1024px`) | Mobile menu controls and floating drawer display on screens smaller than 1024px. Desktop horizontal links display on `lg:flex` (`≥ 1024px`). |
| **Body Scroll Lock** | Lines 37–46: `useEffect` with `document.body.style.overflow = 'hidden'` | Prevents page scrolling behind the open menu. Automatically restores scroll position on close. |
| **Menu Animations** | Lines 188–230: `<motion.div>` using Framer Motion | Smooth 280ms vertical slide (`y: -14px → 0`) and fade-in with 40ms staggered link reveals. |
| **Menu Button Animation** | Lines 144–165: 3-bar animated hamburger | Bars smoothly rotate ±45° and scale to form an `×` when opened, with zero abrupt icon popping. |
| **Subtle Backdrop** | Lines 191–201: `<motion.div className="fixed inset-0 bg-[#123B52]/15 backdrop-blur-[2px] z-40 lg:hidden">` | Translucent overlay that isolates the drawer and closes the menu on click. |
| **Active Nav Link Styling** | Lines 250–265: `bg-[#E8F3F8] text-[#2C7DA0] shadow-xs border border-brand-border/50` | Active state pill matches the desktop active indicator with a subtle blue dot. |

---

# 11. Before / After Replacement Checklist

Use this checklist whenever you replace the logo:

- [ ] New logo asset placed in `public/images/`.
- [ ] Asset has a transparent background (no solid white rectangle).
- [ ] Transparent padding is cropped tightly around the artwork.
- [ ] Path updated in `src/components/Logo.jsx` (e.g. `src="/images/..."`).
- [ ] Desktop navbar checked (`http://localhost:5173/`).
- [ ] Mobile navbar checked (tested at 375px and 768px).
- [ ] Footer logo checked at bottom of page.
- [ ] Logo is crisp, proportional, and not stretched or cropped.
- [ ] Clicking the logo returns to the Homepage (`/`).
- [ ] Mobile navigation hamburger still opens and closes smoothly.
- [ ] Production build succeeds (`npm run build`).
