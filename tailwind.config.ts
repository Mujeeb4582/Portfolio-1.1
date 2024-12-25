import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-geist-sans)',
        mono: 'var(--font-geist-mono)',
        ubuntu: 'var(--font-ubuntu)',
        ibmPlexMono: 'var(--font-ibm-plex-mono)',
      },
      colors: {
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
        // Custom Colors
        bg1: '#292F36',
        bg2: '#1A1E23',
        brand1: '#12F7D6',
        brand2: '#98FAEC',
        grey: '#43454D',
        white: '#FFFFFF',
        html: '#E54F26',
        css: '#0C73B9',
        js: '#E7A020',
        react: '#28A9E0',
      },
      // borderRadius: {
      //   lg: 'var(--radius)',
      //   md: 'calc(var(--radius) - 2px)',
      //   sm: 'calc(var(--radius) - 4px)',
      // },
      fontSize: {
        // Ubuntu Typography
        'bg-text-u': ['117px', { lineHeight: '134px', fontWeight: '400' }],
        'h1-u': ['64px', { lineHeight: '72px', fontWeight: '400' }],
        'h2-u': ['32px', { lineHeight: '36px', fontWeight: '400' }],
        'button-u': ['20px', { lineHeight: '24px', fontWeight: '400' }],
        'article-u': ['16px', { lineHeight: '32px', fontWeight: '300' }],
        'para-u': ['16px', { lineHeight: '18px', fontWeight: '300' }],
        'label-u-m': ['14px', { lineHeight: '16px', fontWeight: '500' }],
        'label-u-l': ['14px', { lineHeight: '16px', fontWeight: '300' }],

        // IBM Plex Mono Typography
        'number-m': ['48px', { lineHeight: '62px', fontWeight: '500' }],
        'h2-m': ['32px', { lineHeight: '42px', fontWeight: '500' }],
        'logo-m': ['32px', { lineHeight: '42px', fontWeight: '500' }],
        'menu-m': ['24px', { lineHeight: '32px', fontWeight: '400' }],
        'media-m': ['16px', { lineHeight: '20px', fontWeight: '400' }],
        'para-m': ['16px', { lineHeight: '20px', fontWeight: '400' }],
        'code-m': ['14px', { lineHeight: '18px', fontWeight: '500' }],
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
export default config
