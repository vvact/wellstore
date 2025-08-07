/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        brand: {
          DEFAULT: '#2563EB',
          secondary: '#F59E0B',
          accent: '#10B981',
          background: '#F9FAFB',
          text: '#111827',
          muted: '#9CA3AF',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.foreground'),
            fontFamily: theme('fontFamily.sans').join(', '),
            a: {
              color: theme('colors.primary.DEFAULT'),
              fontWeight: '500',
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.primary.foreground'),
              },
            },
            h1: {
              fontWeight: '700',
              marginBottom: '0.75em',
            },
            h2: {
              fontWeight: '600',
              marginBottom: '0.6em',
            },
            h3: {
              fontWeight: '600',
              marginBottom: '0.5em',
            },
            strong: {
              fontWeight: '600',
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.5rem',
              marginBottom: '1em',
            },
            p: {
              marginBottom: '0.8em',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.foreground'),
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.primary.foreground'),
              },
            },
            strong: { color: theme('colors.foreground') },
            h1: { color: theme('colors.foreground') },
            h2: { color: theme('colors.foreground') },
            h3: { color: theme('colors.foreground') },
          },
        },
      }),
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};
