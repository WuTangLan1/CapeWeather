// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            500: '#00e5ff', // Aligns with MUI's primary.main
            600: '#00d4e5',
            700: '#00c3d5',
            // Add more shades if needed
          },
        },
      },
    },
    plugins: [],
  }
  