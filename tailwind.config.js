/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0B2545',
          navyDark: '#06152B',
          navyLight: '#133B6B',
          ash: '#1E293B',
          saffron: '#F97316',
          saffronLight: '#FED7AA',
          emerald: '#059669',
          crimson: '#DC2626',
          amber: '#D97706',
          border: '#E2E8F0',
          bg: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
