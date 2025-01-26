// tailwind.config.cjs
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#00e5ff', 
        },
        gray: {
          800: '#1A1C2E', 
          900: '#0B0D21',
        }
      },
    },
  },
  plugins: [],
}