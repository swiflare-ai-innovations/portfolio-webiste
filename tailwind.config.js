/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'editorial-bg': 'var(--color-bg)',
        'editorial-charcoal': 'var(--color-text)',
        'editorial-text': 'var(--color-text)',
        'editorial-accent': 'var(--color-accent)',
        'editorial-subtext': 'var(--color-subtext)',
        'editorial-border': 'var(--color-border)',
        'editorial-silk': 'var(--color-silk)',
        'editorial-heading': 'var(--color-heading)',
        'editorial-secondary': 'var(--color-secondary)',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        'arch': '10rem 10rem 0 0',
      },
      boxShadow: {
        'float': '0 20px 40px -10px rgba(28, 25, 23, 0.05)',
      },
      letterSpacing: {
        'editorial': '-0.03em',
        'widest': '0.2em',
      },
      fontSize: {
        'sm': ['0.925rem', { lineHeight: '1.375rem' }], // ~14.8px
        'base': ['1.05rem', { lineHeight: '1.625rem' }], // ~16.8px
      }
    },
  },
  plugins: [],
}
