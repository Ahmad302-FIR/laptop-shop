/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary / Base Dark Palette (Deep Navy / Charcoal)
        navy: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#0b1120',
        },
        dark: {
          base: '#0b1120',
          surface: '#0f172a',
          card: '#1e293b',
          border: '#334155',
          muted: '#94a3b8'
        },
        // Secondary Off-white / Light Slate Surfaces
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          DEFAULT: '#f8fafc',
          card: '#ffffff',
          dark: '#0f172a'
        },
        // Accent Palette (Rich Amber / Gold for CTAs, Badges, Highlights)
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
          DEFAULT: '#f59e0b',
          hover: '#d97706',
          light: '#fef3c7',
          dark: '#b45309',
          glow: 'rgba(245, 158, 11, 0.25)'
        },
        // Brand aliases to accent for seamless theme consistency
        brand: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Status Colors
        status: {
          success: '#10b981',
          'success-dark': '#059669',
          danger: '#ef4444',
          'danger-dark': '#dc2626',
        },
        whatsapp: {
          light: '#25D366',
          DEFAULT: '#25D366',
          dark: '#128C7E',
          hover: '#1ebe57',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'card-hover': '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.06)',
        'glow-accent': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
        'glow-dark': '0 0 30px -5px rgba(15, 23, 42, 0.6)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
