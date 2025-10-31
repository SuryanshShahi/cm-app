// Tailwind config for twrnc (must be CommonJS)
/** @type {import('twrnc').TWConfig} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#475467',
        tertiary: '#667085',
        bgColor: '#F9F9F9',
        brand: '#F47216',
        'yellow-primary': '#FBF31C',
      },
      scrollPadding: {
        top: '10px',
      },
    },
  },
  plugins: [],
};
