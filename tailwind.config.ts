import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Nouvelle palette de couleurs
        'brand': {
          'orange': {
            50: '#FFF5E6',
            100: '#FFE5BF',
            200: '#FFD699',
            300: '#FFC266',
            400: '#FFB84D',
            500: '#FFA31A', // Orange principal
            600: '#E68A00',
            700: '#B36B00',
            800: '#804C00',
            900: '#663D00',
          },
          'blue': {
            50: '#E6ECFF',
            100: '#B3C6FF',
            200: '#809FFF',
            300: '#4D79FF',
            400: '#1A52FF',
            500: '#0033CC', // Bleu roi principal
            600: '#002699',
            700: '#001A66',
            800: '#000D33',
            900: '#000819',
          },
          'green': {
            50: '#E6FFE6',
            100: '#B3FFB3',
            200: '#80FF80',
            300: '#4DFF4D',
            400: '#1AFF1A',
            500: '#00CC00', // Vert principal
            600: '#009900',
            700: '#006600',
            800: '#003300',
            900: '#001A00',
          },
          'gray': {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280', // Gris principal
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          },
        },
        // Couleurs de base
        'buntu': {
          'primary': '#FFA31A',    // Orange
          'secondary': '#0033CC',  // Bleu roi
          'accent': '#00CC00',     // Vert
          'light': '#FFFFFF',      // Blanc
          'dark': '#111827',       // Noir
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;