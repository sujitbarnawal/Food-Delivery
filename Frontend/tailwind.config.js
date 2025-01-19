/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 3s',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
    },
    screens: {
      'max-1050': { 'max': '1050px' }, // Custom breakpoint for <= 1050px
      'max-900':{'max':'900px'}, // Custom breakpoint for <= 900px
      'max-750':{'max':'750px'}, // Custom breakpoint for <= 750px
      'max-480':{'max':'480px'}, // Custom breakpoint for <= 480px
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          'scrollbar-width': 'none', /* Firefox */
          '-ms-overflow-style': 'none', /* Internet Explorer 10+ */
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none', /* Chrome, Safari, Edge */
        },
      });
    },
  ],
}

