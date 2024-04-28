/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    
    animation: {
      ["infinite-slider"]: "infiniteSlider 20s linear infinite",
    },
    keyframes: {
      infiniteSlider: {
        "0%": { transform: "translateX(0)" },
        "100%": {
          transform: "translateX(calc(-250px * 5))",
        },
      },
    },
    
    extend: {

      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },

     colors: {
       theme:'#3AAFA9',
       secondry:'#17252A',
       primaryLight:'#2B7A78',
       lightTheme:'#Def2f1'
      },
    },
    screens: {
      '2xll': '1500px',
      '3xxl':'1600px'
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
});