// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5722', // Warm orange
        secondary: '#795548', // Brown
        accent: '#FF9800', // Lighter orange
        neutral: '#FFFFFF', // White
        dark: '#212121' // Dark grey
      }
    },
  },
  plugins: [],
}
