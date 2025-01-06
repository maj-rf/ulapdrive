/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		}
  	}
  },
  plugins: [
    plugin(function spicyGradients({ addUtilities }) {
      addUtilities({
        '.bg-none': { 'background-image': 'none' },
        '.bg-gradient-to-t': {
          'background-image': 'linear-gradient(to top, var(--tw-gradient-stops))',
          '@supports (background: linear-gradient(in oklch to top, black, white))': {
            'background-image': 'linear-gradient(in oklch to top, var(--tw-gradient-stops))',
          },
        },
        '.bg-gradient-to-b': {
          'background-image': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
          '@supports (background: linear-gradient(in oklch to bottom, black, white))': {
            'background-image': 'linear-gradient(in oklch to bottom, var(--tw-gradient-stops))',
          },
        },
        '.bg-gradient-to-l': {
          'background-image': 'linear-gradient(to left, var(--tw-gradient-stops))',
          '@supports (background: linear-gradient(in oklch to left, black, white))': {
            'background-image': 'linear-gradient(in oklch to left, var(--tw-gradient-stops))',
          },
        },
        '.bg-gradient-to-r': {
          'background-image': 'linear-gradient(to right, var(--tw-gradient-stops))',
          '@supports (background: linear-gradient(in oklch to right, black, white))': {
            'background-image': 'linear-gradient(in oklch to right, var(--tw-gradient-stops))',
          },
        },
        '.bg-gradient-to-tl': {
          'background-image': 'linear-gradient(to top left, var(--tw-gradient-stops))',
          '@supports (background: linear-gradient(in oklch to top left, black, white))': {
            'background-image': 'linear-gradient(in oklch to top left, var(--tw-gradient-stops))',
          },
        },
        '.bg-gradient-to-tr': {
          'background-image': 'linear-gradient(to top right, var(--tw-gradient-stops))',
          '@supports (background: linear-gradient(in oklch to top right, black, white))': {
            'background-image': 'linear-gradient(in oklch to top right, var(--tw-gradient-stops))',
          },
        },
        '.bg-gradient-to-bl': {
          'background-image': 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
          '@supports (background: linear-gradient(in oklch to bottom left, black, white))': {
            'background-image':
              'linear-gradient(in oklch to bottom left, var(--tw-gradient-stops))',
          },
        },
        '.bg-gradient-to-br': {
          'background-image': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
          '@supports (background: linear-gradient(in oklch to bottom right, black, white))': {
            'background-image':
              'linear-gradient(in oklch to bottom right, var(--tw-gradient-stops))',
          },
        },
      });
    }),
      require("tailwindcss-animate")
],
};
