// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#10b981", // Emerald-500
        secondary: "#34d399", // Emerald-400
        dark: "#111827", // Gray-900
        accent: "#f59e0b", // Amber-500
        "eco-green": "#22c55e",
        "eco-light": "#f0fdf4",
      },
    },
  },
  plugins: [],
};
