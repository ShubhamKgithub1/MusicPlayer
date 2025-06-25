/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      textShadow: {
           'md': '2px 2px 4px rgba(0, 0, 0, 0.5)',
           'lg': '0 0 5px rgba(0, 0, 0, 0.5)',
         },
      backgroundImage: {
        forest: "linear-gradient(135deg, #134e5e, #71b280);",
        hyperGlow: "linear-gradient(135deg, #ff6ec4, #7873f5);",
        neon:"background: linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b);",
        darkBg: "linear-gradient(135deg, #0f2027, #203a43, #2c5364);",
        
      },
      colors: {
        darkBg: "#0f172a", // Deep dark background
        darkCard: "rgba(30, 41, 59, 0.6)", // Glass-like card background
        neonGreen: "#32ff7e", // Neon accent (for play buttons etc.)
        neonBlue: "#18dcff", // Another neon accent
        neonPink: "#ff4dff", // Pink glow text
        textPrimary: "#e0e0e0", // Main text color
        textMuted: "#94a3b8", // Secondary text color
        borderSoft: "rgba(255, 255, 255, 0.1)", // Light glass border
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-in-delay": "fadeIn 1s ease-out forwards",
        "fade-in-delay2": "fadeIn 2s ease-out forwards",
        "slide-up": "slideUp 1.2s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      boxShadow: {
        box: "6px 6px 12px #b8b9be, -6px -6px 12px #fff",
        custom: "0 0 12px #efeff2",
        shadowOuter:"-2px -3px 6px white, 2px 3px 6px gray",
        shadowOuterLarge:"-6px -6px 7px white, 6px 6px 7px gray",
        shadowInner:"inset -2px -3px 6px white, inset 2px 3px 6px gray",
        "neon-green": "0 0 8px #32ff7e",
        "neon-blue": "0 0 8px #18dcff",
        "neon-pink": "0 0 8px #ff4dff",
      },
    },
  },
  plugins: [],
};
