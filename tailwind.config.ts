import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        navy: {
          900: '#0A0E1F', // Deep Space Blue
          800: '#111827',
          700: '#1F2937',
        },
        tech: {
          primary: '#00FF88', // Matrix Green
          secondary: '#60A5FA', // Hologram Blue
          accent: '#FF6B35', // Alert Orange
          danger: '#EF4444', // Red
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 20px rgba(0, 255, 136, 0.2)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
