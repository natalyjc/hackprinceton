/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        'neutral': {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          800: '#292524',
          900: '#1c1917',
        },
        'accent': {
          300: '#60a5fa',
          400: '#3b82f6',
          500: '#2563eb',
        }
      },
      fontFamily: {
        'display': ['DM Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      boxShadow: {
        'warm': '0 4px 14px rgba(59, 130, 246, 0.1)',
        'glow': '0 0 30px rgba(59, 130, 246, 0.15)'
      }
    },
  },
  plugins: [],
}