/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      textShadow: {
        md: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        lg: "0 0 5px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "quick-fade-in": "fadeIn 0.2s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-in-delay": "fadeIn 1s ease-out forwards",
        "fade-in-delay2": "fadeIn 2s ease-out forwards",
        "slide-up": "slide-up 0.25s ease-out forwards",
        "expandDown": "expandDown 0.1s ease-out forwards",
      },
      keyframes: {
        "fadeIn": {
          "0%": { opacity: 0, transform: "scale(0.95)"},
          "100%": { opacity: 1, transform: "scale(1)"},
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      boxShadow: {
        custom: "0 0 12px #efeff2",
        shadowOuter: "-2px -3px 6px white, 2px 3px 6px gray",
        shadowOuterLarge: "-6px -6px 7px white, 6px 6px 7px gray",
        shadowInner: "inset -2px -3px 6px white, inset 2px 3px 6px gray",
        "neon-green": "0 0 8px #32ff7e",
        "neon-blue": "0 0 12px #18dcff",
        "neon-pink": "0 0 8px #ff4dff",
      },
    },
  },
  plugins: [],
};
