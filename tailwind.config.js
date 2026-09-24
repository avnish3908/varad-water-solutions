/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Exact Light-First Architectural Water Palette:
          ivory: '#FAF9F4',          // Primary warm background (55-60%)
          white: '#FFFFFF',          // Cards, navigation, forms, clean sections
          coolWhite: '#F5F8FA',      // Alternate sections, subtle separation (20-25%)
          paleBlue: '#E8F2F7',       // Highlight sections, hover backgrounds
          softBlue: '#BFDCEB',       // Decorative lines, water conduits, shapes
          primaryBlue: '#256B8A',    // Main brand blue (buttons, links, active UI)
          deepOcean: '#123B52',      // Deep Ocean contrast sections (Projects, CTA, headers)
          ink: '#17252D',            // Main text, headings, footer (10-15%)
          bodyText: '#53666F',       // Crisp editorial body text
          waterAccent: '#35B8D0',    // Bright water accent (used sparingly, 1-3%)
          border: '#DCE7EC',         // Clean, light, architectural border

          // Semantic aliases mapped to the light-first palette:
          bg: '#FAF9F4',             // Ivory primary background
          bgAlt: '#F5F8FA',          // Cool white secondary background
          surface: '#FFFFFF',        // Pure white card surfaces
          text: '#17252D',           // Dark ink main text
          textMuted: '#53666F',      // Body text
          accent: '#256B8A',         // Primary Blue
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 5vw + 1rem, 5.25rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'section': ['clamp(2rem, 3.5vw + 0.5rem, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'subhead': ['clamp(1.15rem, 1.25vw + 0.5rem, 1.5rem)', { lineHeight: '1.5' }],
      },
      borderRadius: {
        'sm-elem': '8px',
        'card': '16px',
        'surface-lg': '24px',
        'pill': '999px',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(23, 37, 45, 0.04), 0 1px 3px rgba(23, 37, 45, 0.02)',
        'card-soft': '0 10px 30px -5px rgba(18, 59, 82, 0.06), 0 4px 12px -2px rgba(18, 59, 82, 0.03)',
        'card-hover': '0 18px 38px -10px rgba(18, 59, 82, 0.12), 0 8px 16px -4px rgba(18, 59, 82, 0.05)',
        'blue-glow': '0 0 20px -3px rgba(37, 107, 138, 0.25)',
        'water-glow': '0 0 15px rgba(53, 184, 208, 0.4)',
      },
    },
  },
  plugins: [],
}
