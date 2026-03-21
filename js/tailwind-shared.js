window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        ice: '#5ee6ff',
        neon: '#a855f7',
        dark: '#070b14',
        dark2: '#0e1628',
        dark3: '#152238',
        glass: 'rgba(21,34,56,0.48)',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'ui-sans-serif', 'system-ui'],
        mono: ['Chakra Petch', 'ui-monospace'],
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 8px #7dd3fc55, 0 0 20px #7dd3fc22' },
          '50%': { boxShadow: '0 0 18px #7dd3fcaa, 0 0 40px #7dd3fc44' },
        },
        'neon-pulse': {
          '0%, 100%': { boxShadow: '0 0 8px #a855f755, 0 0 20px #a855f722' },
          '50%': { boxShadow: '0 0 18px #a855f7aa, 0 0 40px #a855f744' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
        'neon-pulse': 'neon-pulse 2.5s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite',
        scanline: 'scanline 3s linear infinite',
      },
    },
  },
};
