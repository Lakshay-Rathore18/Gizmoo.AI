import type { Config } from 'tailwindcss';

/**
 * Cream-on-true-black, editorial / cinematic.
 * Cream `#E1E0CC` is the foreground. Black `#070707` is the void.
 * Accent ≠ a hue — accent is the same cream, used italic in Instrument Serif.
 *
 * Token names are preserved (text-accent, bg-bg-primary, border-border-subtle,
 * etc.) so existing components inherit the repaint without refactor.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#070707',
          secondary: '#0e0d0b',
          tertiary: '#161512',
        },
        text: {
          primary: '#E1E0CC',
          secondary: 'rgba(225,224,204,0.66)',
          tertiary: 'rgba(225,224,204,0.58)',
        },
        accent: {
          DEFAULT: '#DEDBC8',
          hover: '#F2EFD9',
          glow: 'rgba(222,219,200,0.12)',
          strong: 'rgba(222,219,200,0.30)',
        },
        border: {
          subtle: 'rgba(225,224,204,0.10)',
        },
        cream: {
          50: '#F6F4E2',
          100: '#EFEDD7',
          200: '#E1E0CC',
          300: '#DEDBC8',
          400: '#C8C5B1',
          500: '#A4A28E',
          600: '#7A7868',
        },
      },
      fontFamily: {
        sans: ['var(--font-almarai)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['var(--font-almarai)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['var(--font-instrument-serif)', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Premium body baseline — user calls out small text
        body: ['1.3125rem', { lineHeight: '1.55', letterSpacing: '-0.005em' }],
        'body-sm': ['1.0625rem', { lineHeight: '1.55' }],
        'display-lg': ['clamp(3.25rem, 11vw, 9rem)', { lineHeight: '0.94', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(2.25rem, 7vw, 5.75rem)', { lineHeight: '1.02', letterSpacing: '-0.028em' }],
        'display-sm': ['clamp(1.75rem, 4.4vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        widerprem: '0.32em',
        kinetic: '-0.04em',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        'float': 'float 9s ease-in-out infinite',
        'float-delayed': 'float 9s ease-in-out 2s infinite',
        'float-slow': 'float 12s ease-in-out 1s infinite',
        'glow-drift': 'glow-drift 24s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 5s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 2.4s ease-in-out infinite',
        'slide-up': 'slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.6s ease forwards',
        'cream-pulse': 'cream-pulse 4.6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-drift': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(28px, -18px)' },
          '50%': { transform: 'translate(-22px, 12px)' },
          '75%': { transform: 'translate(12px, 28px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.10' },
          '50%': { opacity: '0.20' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'cream-pulse': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
      spacing: {
        'section': 'clamp(96px, 14vh, 200px)',
        'section-sm': 'clamp(64px, 9vh, 120px)',
      },
      maxWidth: {
        'content': '1440px',
        'reading': '68ch',
      },
      backgroundImage: {
        'cream-gradient':
          'linear-gradient(135deg, #F2EFD9 0%, #DEDBC8 35%, #C8C5B1 100%)',
        'cream-fade':
          'linear-gradient(180deg, rgba(225,224,204,0) 0%, rgba(225,224,204,0.04) 50%, rgba(225,224,204,0) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
