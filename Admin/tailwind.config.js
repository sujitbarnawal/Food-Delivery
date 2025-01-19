/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'max-1050': { 'max': '1050px' }, // Custom breakpoint for <= 1050px
      'max-1000': { 'max': '1000px' }, // Custom breakpoint for <= 1000px
      'max-900':{'max':'900px'}, // Custom breakpoint for <= 900px
      'max-750':{'max':'750px'}, // Custom breakpoint for <= 750px
      'max-600':{'max':'600px'}, // Custom breakpoint for <= 600px
      'max-480':{'max':'480px'}, // Custom breakpoint for <= 480px
    },
  },
  plugins: [],
}

