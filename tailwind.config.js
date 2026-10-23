/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#090a0f',
          surface: '#11131a',
          card: '#161922',
          cardHover: '#1c202c',
          border: '#232736',
          borderSubtle: '#1a1d28',
          muted: '#8b949e',
        },
        warm: {
          50: '#faf9f6',
          100: '#f5f4ef',
          200: '#eae7df',
          300: '#dcd7cb',
          400: '#b8b09f',
          500: '#948a74',
          600: '#756c59',
          700: '#5a5243',
          800: '#3e382d',
          900: '#231f18',
          950: '#14120e',
        },
        surface: {
          light: '#fdfdfc',
          card: '#ffffff',
          muted: '#f7f6f2',
          border: '#e7e5dc',
          borderSubtle: '#f0ede6',
        },
        ink: {
          primary: '#111827',
          secondary: '#4b5563',
          muted: '#6b7280',
          subtle: '#9ca3af',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 3px 1px rgba(0, 0, 0, 0.02)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
        'elevated': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.25)',
        'glow-indigo': '0 0 20px -3px rgba(99, 102, 241, 0.25)',
        'glow-amber': '0 0 20px -3px rgba(245, 158, 11, 0.25)',
      }
    },
  },
  plugins: [],
}
