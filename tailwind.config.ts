import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: 'var(--isle-paper)',
        card: 'var(--isle-card)',
        ink: 'var(--isle-ink)',
        muted: 'var(--isle-muted)',
        lagoon: 'var(--isle-lagoon)',
        'lagoon-hover': 'var(--isle-lagoon-hover)',
        sand: 'var(--isle-sand)',
        line: 'var(--isle-line)',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          'PingFang SC',
          'Hiragino Sans GB',
          'Noto Sans SC',
          'sans-serif',
        ],
        display: [
          'ui-serif',
          'Iowan Old Style',
          'Palatino Linotype',
          'Songti SC',
          'serif',
        ],
      },
      maxWidth: {
        isle: '72rem',
      },
      boxShadow: {
        isle: '0 1px 0 var(--isle-line), 0 12px 32px -16px rgb(28 42 40 / 0.18)',
      },
    },
  },
} satisfies Config
