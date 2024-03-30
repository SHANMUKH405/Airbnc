/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F5385D",
      },
    },
  },
  screens: {
    xs: "480px",
    "2xl": "1400px",
    xl: { raw: "(min-width: 1000px) and (min-height: 400px)" },
  },

  plugins: [],
};
