// postcss.config.js
  export default {
    plugins: {
      '@tailwindcss/postcss7-compat': {}, // Use the compatibility package for Tailwind CSS
      autoprefixer: {},                  // Add vendor prefixes for CSS
    },
  };
