/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './posts/**/*.mdx',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          primary:   '#0d1117',
          secondary: '#161b22',
          tertiary:  '#1c2128',
        },
        green: {
          DEFAULT: '#00ff88',
          dim:     '#22c55e',
        },
        amber:  { DEFAULT: '#f59e0b' },
        blue:   { DEFAULT: '#60a5fa' },
        purple: { DEFAULT: '#a855f7' },
        red:    { DEFAULT: '#ef4444' },
        border: { DEFAULT: '#30363d' },
        muted:  { DEFAULT: '#8b949e' },
      },
      animation: {
        'blink':     'blink 1s step-end infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'fadeIn':    'fadeIn 0.5s ease forwards',
        'scanline':  'scan 6s linear infinite',
        'typing':    'typing 1.8s steps(30,end) both',
      },
      keyframes: {
        blink: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
        'pulse-dot': {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(0,255,136,0.4)' },
          '50%':     { boxShadow: '0 0 0 5px rgba(0,255,136,0)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        scan: {
          '0%':   { transform: 'translateY(-60px)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        typing: {
          from: { maxWidth: '0' },
          to:   { maxWidth: '100%' },
        },
      },
    },
  },
  plugins: [],
};
