# Varad Water Solutions — Animation System & Global Particle Guide

> **Target File:** `ANIMATION_GUIDE.md`  
> **Audience:** Developers, designers, and maintainers configuring or extending animations across the website.  
> **Core Principle:** Subtle, engineered, water-inspired motion. Home page is the Single Source of Truth for all timing, easing, reveals, transitions, and particle physics.

---

# 1. Global Particle System Architecture

The water particle engine is implemented as a single, centralized, hardware-accelerated HTML5 Canvas 2D system that runs continuously behind all page content without interruption or recreation across routes.

| Property | Location | Implementation Details |
| :--- | :--- | :--- |
| **Component File** | `src/components/ParticleBackground.jsx` | Pure 2D Canvas rendering engine with sinusoidal water wave drift and cursor repulsion. |
| **Global Mount Point** | `src/App.jsx` (Line 60) | Mounted once directly inside the root layout before `<Navbar />`. |
| **Layering Depth** | `z-0` (Fixed viewport) | Locked to viewport with `fixed inset-0 pointer-events-none overflow-hidden z-0`. |
| **Route Persistence** | Persistent across navigation | Stays active when users navigate from Home to Products, Services, Projects, About, or Contact without recreating the canvas or resetting physics. |

---

# 2. Particle Configuration & Source of Truth

All particle settings are consolidated in `src/components/ParticleBackground.jsx`:

### 2.1. Particle Colors (Question 3)
- **File:** `src/components/ParticleBackground.jsx`
- **Location:** Line 35
```javascript
// Water droplet palette:
const colors = ['#A9D1E3', '#7FB8D0', '#3FAFD0', '#A9D1E3', '#2C7DA0'];
```
- **How to edit:** Add or replace hex strings in the `colors` array. All particles randomly select from this palette on initialization.

### 2.2. Particle Density & Responsive Counts (Questions 4 & 13)
- **File:** `src/components/ParticleBackground.jsx`
- **Location:** Lines 38–41
```javascript
const isMobile = window.innerWidth < 768;
const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
const particleCount = prefersReducedMotion ? 12 : isMobile ? 18 : isTablet ? 30 : 48;
```
- **Desktop (≥ 1024px):** 48 particles
- **Tablet (768px – 1023px):** 30 particles
- **Mobile (< 768px):** 18 particles
- **Reduced Motion:** 12 particles (rendered statically, animation loop halted)

### 2.3. Particle Speed & Drift Direction (Question 5)
- **File:** `src/components/ParticleBackground.jsx`
- **Location:** Lines 69–72, 106–107
```javascript
vx: Math.random() * 0.35 + 0.18,  // Rightward drift component (↗)
vy: -(Math.random() * 0.32 + 0.16), // Upward drift component (↗)
wobbleSpeed: Math.random() * 0.02 + 0.012,
wobbleOffset: Math.random() * Math.PI * 2,

// Sinusoidal wave applied during update:
p.x += p.vx + Math.sin(time + p.wobbleOffset) * 0.16;
p.y += p.vy + Math.cos(time + p.wobbleOffset) * 0.12;
```
- **How to edit:** Increase `vx` or `vy` multipliers to make particles move faster; change the signs to reverse direction.

### 2.4. Particle Opacity & Highlight (Question 6)
- **File:** `src/components/ParticleBackground.jsx`
- **Location:** Lines 67–68, 119, 136, 143
```javascript
baseOpacity: Math.random() * 0.28 + 0.18, // 0.18 to 0.46 base opacity
// On desktop cursor proximity:
p.opacity = Math.min(0.68, p.baseOpacity + force * 0.35);
// Specular droplet highlight:
ctx.fillStyle = '#FFFFFF';
ctx.globalAlpha = p.opacity * 0.75;
```

### 2.5. Particle Connections & Lines (Question 7)
- **File:** `src/components/ParticleBackground.jsx`
- **Location:** Lines 82–100
```javascript
const maxDistance = 95; // Maximum distance in pixels to form a connecting line
if (dist < maxDistance) {
  const lineOpacity = (1 - dist / maxDistance) * 0.22;
  ctx.strokeStyle = `rgba(169, 209, 227, ${lineOpacity})`;
  ctx.lineWidth = 0.85;
  ctx.stroke();
}
```
- **How to edit:** Change `maxDistance` to increase or decrease line connections. Increase `0.22` for stronger line visibility.

---

# 3. Scroll Reveal System

Scroll-triggered animations are governed by GreenSock (GSAP) with the ScrollTrigger plugin, unified in `src/animations/animations.js`.

### 3.1. Reveal Attributes & Selectors (Question 8)
- **File:** `src/animations/animations.js`
- **Function:** `initScrollReveals()`

| Attribute | Applied To | Animation Effect | Timing |
| :--- | :--- | :--- | :--- |
| `data-reveal="fade-up"` | Section titles, text blocks, banners, matrices, maps | Gentle vertical rise (`y: 28px → 0`) with smooth fade (`opacity: 0 → 1`) | Duration: `0.85s`<br>Ease: `'power2.out'`<br>Trigger: `top 88%` |
| `data-reveal-group` | Card grid containers (`<div>` wrapping cards) | Container element orchestrating staggered card reveals | Trigger: `top 85%` |
| `data-reveal-item` | Individual cards (`ProductCard`, `ServiceCard`, `ProjectCard`, `SolutionCard`) | Staggered entrance (`y: 24px → 0, opacity: 0 → 1`) | Duration: `0.75s`<br>Stagger: `0.12s`<br>Ease: `'power2.out'` |
| `data-water-conduit` | Water Journey flow pipeline line | Horizontal scale wipe (`scaleX: 0 → 1`) | Duration: `1.2s`<br>Ease: `'power2.out'` |

### 3.2. Animation Durations & Easings (Questions 9 & 10)
- **File:** `src/animations/animations.js`
- **GSAP Easing:** `'power2.out'` (engineered deceleration feeling like hydraulic flow).
- **Framer Motion Easing:** `[0.25, 0.1, 0.25, 1]` (smooth cubic-bezier curve).
- **Page Transition Duration:** `0.45s` entry, `0.25s` exit.
- **Card Hover Elevation Duration:** `300ms` ease-out (`hover:-translate-y-1` or `hover:-translate-y-1.5`).

---

# 4. Page Load & Route Transition System (Question 4)

Page transitions are coordinated globally using Framer Motion's `<AnimatePresence mode="wait">` in `src/App.jsx`.

```jsx
// src/App.jsx
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}
```

Every page component wraps its content in:
```jsx
<motion.div
  variants={pageVariants}
  initial="initial"
  animate="animate"
  exit="exit"
  className="pt-28 pb-20 lg:pt-36 lg:pb-28 bg-transparent min-h-screen text-brand-ink"
>
```
- **Exit:** `opacity: 0, y: -8px` in `0.25s` (`easeIn`).
- **Entry:** `opacity: 1, y: 0` in `0.45s` (`[0.25, 0.1, 0.25, 1]`).
- **Scroll Reset:** `ScrollToTop` automatically scrolls viewport to `(0, 0)`.

---

# 5. Component Layering Hierarchy (SRS Z-Index Architecture)

To ensure particles remain an atmospheric background element and never obstruct text or click targets:

```text
[Viewport Root] (bg-brand-ivory #FAF9F4)
  │
  ├── [Z-0 Fixed]  ParticleBackground.jsx (Canvas 2D, pointer-events-none)
  │
  ├── [Z-10 Relative]  <main> Page Content
  │     ├── Page Titles & Subtitles (data-reveal="fade-up")
  │     ├── Opaque Cards (bg-brand-white, hover:-translate-y-1)
  │     ├── Buttons & Links (pointer-events-auto)
  │     └── Opaque Contrast Sections (bg-brand-deepOcean, bg-brand-coolWhite)
  │
  ├── [Z-40/50 Sticky/Fixed]  <Navbar /> (Glassmorphic header, mobile menu)
  ├── [Z-50 Fixed]  <WhatsAppButton /> (Bottom-right floating action)
  └── [Z-50 Fixed]  <CursorAura /> (Pointer-events-none desktop follower)
```

---

# 6. How-To Quick Guides

### How to Change the Animation Globally (Question 11)
- **Change reveal speed:** Open `src/animations/animations.js` and modify `duration: 0.85` in `initScrollReveals()`.
- **Change page transition speed:** Modify `duration: 0.45` in `pageVariants` in `src/animations/animations.js`.
- **Change particle colors:** Update the `colors` array in `src/components/ParticleBackground.jsx`.

### How to Temporarily Disable Particles (Question 12)
1. Open `src/App.jsx`.
2. Comment out line 60:
   ```jsx
   {/* <ParticleBackground /> */}
   ```
3. Save the file. All particles will disappear with zero side effects on layouts or content.

### How to Customize Mobile Settings (Question 13)
Open `src/components/ParticleBackground.jsx`:
- Adjust the breakpoint: `const isMobile = window.innerWidth < 768;`
- Adjust particle count: Change `isMobile ? 18 : ...` to any desired integer (e.g. `10` for ultra-light mobile).
- Note: Cursor calculations are automatically disabled on mobile screens to preserve battery life and 60 FPS performance.

### How to Add the Same Animation to a Future Page (Question 14)
When creating a new page (e.g. `src/pages/Careers.jsx`):
1. Import the animation helpers:
   ```jsx
   import { useEffect } from 'react';
   import { motion } from 'framer-motion';
   import { pageVariants, initScrollReveals } from '../animations/animations';
   import SectionHeading from '../components/SectionHeading';
   ```
2. Call `initScrollReveals()` inside `useEffect`:
   ```jsx
   useEffect(() => {
     initScrollReveals();
   }, []);
   ```
3. Wrap page with `motion.div` using `bg-transparent`:
   ```jsx
   <motion.div
     variants={pageVariants}
     initial="initial"
     animate="animate"
     exit="exit"
     className="pt-28 pb-20 lg:pt-36 lg:pb-28 bg-transparent min-h-screen text-brand-ink"
   >
   ```
4. Add `data-reveal="fade-up"` to headings and content blocks.
5. Add `data-reveal-group` to card grids and `data-reveal-item` to each card wrapper.

---

# 7. Dependencies & Packages Used (Question 15)

| Package | Version | Purpose in Animation System |
| :--- | :--- | :--- |
| `gsap` | `^3.12.7` | High-performance timeline and ScrollTrigger viewport intersection reveals. |
| `framer-motion` | `^12.4.7` | Page exit/enter transitions (`AnimatePresence`) and hero interactive variants. |
| `lucide-react` | `^0.475.0` | UI icons with hover-slide arrow micro-interactions. |
| `HTML5 Canvas 2D` | Native API | Zero-dependency, 60 FPS water droplet particle engine. |

---

# 8. Performance & Accessibility Considerations (Question 16)

1. **Single Canvas Instance:** Exactly one `<canvas>` element exists in the DOM at any time. When switching pages, the canvas is never re-initialized or destroyed.
2. **Reduced Motion Compliance (`prefers-reduced-motion`):**
   - Automatically detected via `usePrefersReducedMotion()`.
   - Halts the particle animation loop (renders static droplets once, 0 ongoing RAF calls).
   - Skips all GSAP scroll translations and renders content fully visible immediately.
3. **Hardware Acceleration:** Canvas drawing uses native GPU 2D acceleration. Card elevations use CSS `transform: translateY(...)` which executes entirely on the GPU compositor thread without triggering layout reflow.
4. **Pointer Events:** Canvas wrapper explicitly declares `pointer-events-none`, guaranteeing 0 latency or click interception on buttons, inputs, links, or cards.
5. **No Memory Leaks:** `cancelAnimationFrame` and `window.removeEventListener` are executed cleanly on component unmount.
