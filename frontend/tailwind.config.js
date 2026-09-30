/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#FDFBF7',
        parchmentDark: '#F4EFE6',
        royalNavy: '#1E1848',
        royalGold: '#D4AF37',
        coffeeTint: 'rgba(212, 175, 55, 0.04)',
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        handwriting: ['Caveat', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}