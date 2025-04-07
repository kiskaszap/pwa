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
    themes: ["light"], // Disable dark mode and use only the light theme
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [require("daisyui")], // Add DaisyUI as a plugin
};
