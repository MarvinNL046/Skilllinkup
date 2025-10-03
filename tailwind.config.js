/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        heading: ['var(--font-lexend)', 'Lexend', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#ef2b70',
          dark: '#d91a5f',
          light: '#ff4085',
        },
        secondary: {
          DEFAULT: '#1e1541',
          dark: '#0f0b1a',
          medium: '#2a2250',
          light: '#3d3460',
        },
        accent: {
          DEFAULT: '#22c55e',
          light: '#4ade80',
          dark: '#16a34a',
        },
        text: {
          primary: '#1e1541',
          secondary: '#64607d',
          muted: '#9691ad',
        },
        background: {
          white: '#ffffff',
          light: '#f8f9fb',
          gray: '#f3f4f6',
          tint: '#faf9fc',
        },
      },
      borderRadius: {
        'sm': '8px',
        DEFAULT: '16px',
        'lg': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0, 0, 0, 0.04)',
        DEFAULT: '0 4px 12px rgba(0, 0, 0, 0.08)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'xl': '0 16px 48px rgba(0, 0, 0, 0.16)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
