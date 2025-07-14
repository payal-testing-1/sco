/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          blue: '#146EB4',
          orange: '#FF9900',
          light: '#F3F3F3',
          dark: '#232F3E',
        }
      },
      fontFamily: {
        'amazon': ['Amazon Ember', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}