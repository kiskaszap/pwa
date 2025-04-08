/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: ["light"], 
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [require("daisyui")], 
};
