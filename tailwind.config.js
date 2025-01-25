// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '6rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    extend: {
      colors: {
        primary: {
          50: '#f0fcff',
          100: '#ccf6ff',
          200: '#99edff',
          300: '#66e4ff',
          400: '#33dbff',
          500: '#00e5ff',
          600: '#00d4e5',
          700: '#00c3d5',
          800: '#00b3c5',
          900: '#00a2b4',
        },
        secondary: {
          500: '#ff4081',
          600: '#e5356f',
          700: '#cc2d61',
        },
        neutral: {
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#ffffff',
            a: {
              color: '#00e5ff',
              '&:hover': {
                color: '#00d4e5',
              },
            },
            h1: { color: '#ffffff' },
            h2: { color: '#ffffff' },
            h3: { color: '#ffffff' },
            strong: { color: '#ffffff' },
          },
        },
      },
      outline: {
        primary: '2px solid #00e5ff',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
  safelist: [
    'bg-primary-500',
    'bg-primary-600',
    'text-primary-500',
    'hover:bg-primary-500',
    'hover:bg-primary-600',
  ],
};
