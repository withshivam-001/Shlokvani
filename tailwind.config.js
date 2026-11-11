/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        gold: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
        },
        google: {
          bg: '#FAFAFA',
          card: '#FFFFFF',
          text: '#1F1F1F',
          subtext: '#5F6368',
          border: '#E0E0E0',
          hover: '#F1F3F4'
        }
      },
      fontFamily: {
        devanagari: ['var(--font-devanagari)', 'Noto Sans Devanagari', 'sans-serif'],
        serifDeva: ['var(--font-devanagari-serif)', 'Noto Serif Devanagari', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'google': '0 1px 3px 0 rgba(60,64,67,0.1), 0 4px 8px 3px rgba(60,64,67,0.05)',
        'google-hover': '0 2px 6px 0 rgba(60,64,67,0.15), 0 8px 16px 4px rgba(60,64,67,0.08)',
        'floating-player': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'glow-saffron': '0 0 25px rgba(234, 88, 12, 0.25)',
        'glow-gold': '0 0 30px rgba(202, 138, 4, 0.25)',
      },
      keyframes: {
        wave: {
          '0%, 100%': { height: '6px' },
          '50%': { height: '24px' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      },
      animation: {
        'wave-1': 'wave 1.2s ease-in-out infinite',
        'wave-2': 'wave 1.2s ease-in-out infinite 0.2s',
        'wave-3': 'wave 1.2s ease-in-out infinite 0.4s',
        'wave-4': 'wave 1.2s ease-in-out infinite 0.1s',
        'wave-5': 'wave 1.2s ease-in-out infinite 0.3s',
        'float-slow': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

