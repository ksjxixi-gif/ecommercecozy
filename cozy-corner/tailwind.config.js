/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'cream-bg': '#f5f1ed',
      'soft-white': '#faf8f5',
      'sage-green': '#4a6b5c',
      'charcoal': '#2c2520',
      'warm-gray': '#d4cdc4',
      'dark-wood': '#4a3428',
      'soft-beige': '#e8e3dc',
      'light-sage': '#7a9b8c',
      'accent-terracotta': '#b8876b',
      'accent-orange': '#c87855',
      'text-primary': '#2c2520',
      'text-secondary': '#6b5d52',
      'text-light': '#9a8d82',
    },
    fontFamily: {
      cairo: ['var(--font-cairo)', 'sans-serif'],
      poppins: ['var(--font-poppins)', 'sans-serif'],
    },
  },
  plugins: [],
}
