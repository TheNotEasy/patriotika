/** @type {import('tailwindcss').Config} */
console.log("asd")

module.exports = {
  content: [
    "./src/**/*.{tsx,jsx,ts,js,html}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
};