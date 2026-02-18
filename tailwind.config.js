/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Old Money" / Editorial Palette (Hero/Header)
        editorial: {
          bg: '#F2EEE3', // Travertine Beige
          silk: '#FAF9F6', // Oatmeal Silk
          text: '#2D2823', // Espresso Brown
          subtext: '#6B645C', // Taupe
          accent: '#C2A378', // Warm Gold/Beige
          border: '#E2DED0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
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
      }
    },
  },
  plugins: [],
}
