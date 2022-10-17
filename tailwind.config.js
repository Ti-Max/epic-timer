const colors = require("./css/colors.js")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.{ejs,html}"],
  theme: {
    colors: colors,
  },
  plugins: [],
}
