/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: { ink: "#080d19", panel: "#101827", line: "#202c40", muted: "#8b9bb4", cyan: "#54d6e8", violet: "#8b7cff" } } },
  plugins: []
};