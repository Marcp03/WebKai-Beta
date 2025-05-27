/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#004972',
        accent1: '#E40303',
        accent2: '#FF8C00',
        accent3: '#FFED00',
        accent4: '#008026',
        accent5: '#004DFF',
        accent6: '#750787',
        neutralLight: '#fafafa',
        neutralDark: '#222222'
      }
    }
  },
  plugins: [],
}