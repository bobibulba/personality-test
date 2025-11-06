/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: '#FF6F61',
        purple: '#6B5B95',
        lime: '#88B04B',
        pink: '#F7CAC9',
        cyan: '#00CED1',
        yellow: '#FFD700',
        orange: '#FF8C42',
        magenta: '#FF1493',
      },
      fontFamily: {
        baloo: ['"Baloo 2"', 'cursive'],
        fredoka: ['Fredoka', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
