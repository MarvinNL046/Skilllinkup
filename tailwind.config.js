/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./emails/**/*.{js,jsx,ts,tsx}",
  ],
  // Don't generate Tailwind utilities whose names collide with Bootstrap
  // component classes still loaded from public/css/bootstrap.min.css.
  // The remaining Bootstrap CSS provides the .row/.col grid + .d-* utility
  // helpers that the legacy template + bridge depend on; Tailwind keeps
  // the rest. Each blocked name maps to a clash that broke (or would
  // break) something concrete:
  //
  //   collapse   — TW visibility:collapse hid every accordion panel
  //                that depends on Bootstrap's .collapse.show state
  //                (Category sidebar, FAQ, mobile nav offcanvas)
  //   container  — BS .container has fixed max-widths per breakpoint;
  //                TW .container resets that to 100% which broke the
  //                expected centered-page rhythm on all listing pages
  //   table      — BS .table is a component class with margin/border/
  //                stripe styles for actual <table> elements; TW
  //                display:table would silently override that
  //   shadow     — BS .shadow is a heavy 0 .5rem 1rem rgba(0,0,0,.15);
  //                TW .shadow is a thin 0 1px 3px. Different defaults,
  //                inconsistent visual output. Use shadow-1..5 tokens
  //                instead.
  //   rounded    — BS .rounded uses --bs-border-radius (0.375rem) with
  //                !important; TW .rounded is 0.25rem. Use rounded-md
  //                or radius tokens instead.
  //
  // Verified via grep: none of the above are used as bare Tailwind
  // utilities in src/. Adding them here doesn't break any current
  // class lists.
  blocklist: ["collapse", "container", "table", "shadow", "rounded"],
  theme: {
    extend: {
      colors: {
        // shadcn-compat semantic tokens — all pull from our OKLCH variables
        background: "var(--bg)",
        foreground: "var(--text-primary)",
        muted: {
          DEFAULT: "var(--surface-2)",
          foreground: "var(--text-tertiary)",
        },
        card: {
          DEFAULT: "var(--bg-elevated)",
          foreground: "var(--text-primary)",
        },
        popover: {
          DEFAULT: "var(--bg-elevated)",
          foreground: "var(--text-primary)",
        },
        primary: {
          DEFAULT: "var(--primary-600)",
          foreground: "var(--neutral-0)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
        },
        secondary: {
          DEFAULT: "var(--secondary-500)",
          foreground: "var(--neutral-900)",
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          800: "var(--secondary-800)",
          900: "var(--secondary-900)",
        },
        accent: {
          DEFAULT: "var(--secondary-500)",
          foreground: "var(--neutral-900)",
        },
        destructive: {
          DEFAULT: "var(--error-600)",
          foreground: "var(--neutral-0)",
        },
        success: {
          DEFAULT: "var(--success-600)",
          foreground: "var(--neutral-0)",
        },
        warning: {
          DEFAULT: "var(--warning-600)",
          foreground: "var(--neutral-900)",
        },
        info: {
          DEFAULT: "var(--info-600)",
          foreground: "var(--neutral-0)",
        },
        border: "var(--border-default)",
        input: "var(--border-default)",
        ring: "var(--primary-500)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Poppins", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Instrument Serif", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-md)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        1: "var(--shadow-1)",
        2: "var(--shadow-2)",
        3: "var(--shadow-3)",
        4: "var(--shadow-4)",
        5: "var(--shadow-5)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
        emphasized: "var(--ease-emphasized)",
        decelerate: "var(--ease-decelerate)",
        accelerate: "var(--ease-accelerate)",
        spring: "var(--ease-spring)",
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
        slower: "var(--dur-slower)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s var(--ease-standard)",
        "accordion-up": "accordion-up 0.2s var(--ease-standard)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
