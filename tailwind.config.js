/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        cardIn: {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        card: "cardIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
