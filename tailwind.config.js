/** @type {import('tailwindcss').Config} */
import { addDynamicIconSelectors } from '@iconify/tailwind'
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        base: '14px',
      },
      colors: {
        'light-blue-gray': '#e8e8e8',
      },
      backgroundImage: {
        'gradient-light-blue-b': 'linear-gradient(to bottom, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%)',
        'theme-gradient': 'linear-gradient(0deg, #DDE4FF 0%, #8DA2EE 100%);'
      },
      boxShadow: {
        'light-blue': '0px 30px 30px -20px rgba(133, 189, 215, 0.8784313725)',
      }
    },
  },
  plugins: [
    addDynamicIconSelectors(),
  ],
}

