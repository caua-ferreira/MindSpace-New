/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        sage: {
          50: '#f8faf8',
          100: '#e8efe8',
          200: '#cddccd',
          300: '#a8c3a8',
          400: '#7fa47f',
          500: '#5f855f',
          600: '#4a684a',
          700: '#3d543d',
          800: '#334433',
          900: '#2b382b',
          950: '#1a211a',
        },
        lavender: {
          50: '#f7f7fe',
          100: '#efeffd',
          200: '#e0e0fc',
          300: '#c5c5fa',
          400: '#a5a5f7',
          500: '#8181f3',
          600: '#6161e8',
          700: '#4f4fd1',
          800: '#4242ab',
          900: '#3a3a89',
          950: '#232352',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};