import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Mode - Beach White Theme
        light: {
          'bg-primary': '#FDFCFA',
          'bg-surface': '#FFFFFF',
          'bg-elevated': '#FAFAF8',
          'bg-hover': '#F8F7F5',
          'text-primary': '#0D0D0D',
          'text-secondary': '#525252',
          'text-tertiary': '#888888',
          'accent': '#1A1A1A',
          'border': '#E8E8E6',
        },
        // Dark Mode - Pure Contrast
        dark: {
          'bg-primary': '#080808',
          'bg-surface': '#121212',
          'bg-elevated': '#1A1A1A',
          'bg-hover': '#1F1F1F',
          'text-primary': '#FDFDFD',
          'text-secondary': '#B0B0B0',
          'text-tertiary': '#6B6B6B',
          'accent': '#FFFFFF',
          'border': '#262626',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],     // Body font
        display: ['Manrope Variable', 'sans-serif'], // Display headings
        mono: ['JetBrains Mono', 'monospace'],       // Code
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '40px',
        '5xl': '56px',
        '6xl': '72px',
      },
      lineHeight: {
        'body': '1.7',
        'heading': '1.2',
      },
      letterSpacing: {
        tighter: '-0.02em',
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
        '96': '96px',
        '128': '128px',
        '160': '160px',
        '256': '256px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.04)',
        'md': '0 1px 2px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.08)',
        'lg': '0 1px 2px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.12)',
        'sm-dark': '0 1px 2px rgba(255,255,255,0.03)',
        'md-dark': '0 1px 2px rgba(255,255,255,0.03), 0 4px 8px rgba(255,255,255,0.06)',
        'lg-dark': '0 1px 2px rgba(255,255,255,0.03), 0 4px 8px rgba(255,255,255,0.06), 0 8px 16px rgba(255,255,255,0.09)',
      },
      zIndex: {
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
      },
      transitionTimingFunction: {
        'elastic': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '200': '200ms',
        '400': '400ms',
        '700': '700ms',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '30%': { transform: 'translate(3%, -15%)' },
          '50%': { transform: 'translate(12%, 9%)' },
          '70%': { transform: 'translate(9%, 4%)' },
          '90%': { transform: 'translate(-1%, 7%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      minHeight: {
        '44': '44px', // Touch target minimum
      },
      minWidth: {
        '44': '44px', // Touch target minimum
      },
    },
  },
  plugins: [],
} satisfies Config
