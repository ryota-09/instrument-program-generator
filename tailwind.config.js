/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        sway: {
          "0%, 100%": { transform: "translateX(-5%)" },
          "50%": { transform: "translateX(5%)" },
        },
      },
      animation: {
        sway: "sway 0.15s ease-in-out infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
