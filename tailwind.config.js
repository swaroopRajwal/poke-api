/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cgray: "#323232",
        cred: "#FF1E56",
        cyellow: "#FFAC41",
      }
    },
  },
  plugins: [
    require("tailwindcss-debug-screens"),
  ],
}
