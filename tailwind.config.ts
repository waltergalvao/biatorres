import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F4E9E6',
          'bg-light': '#F9F3F1',
          'bg-dark': '#EDE0DC',
          'bg-deep': '#E5D5CF',
          text: '#3E4A3F',
          'text-light': '#5A6B5C',
          'text-muted': '#7A8A7C',
          accent: '#3E4A3F',
          border: '#D4C5BE',
          'border-light': '#E8DCD7',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.25rem, 4.5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'heading': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.3' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'smooth-out': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        '800': '800ms',
        '1200': '1200ms',
      },
    },
  },
  plugins: [],
}

export default config
