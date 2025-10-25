// Tailwind config for twrnc (must be CommonJS)
/** @type {import('twrnc').TWConfig} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#22303E',
        secondary: '#475467',
        tertiary: '#667085',
        bgColor: '#F9F9F9',
        brand: '#FFB82D',
        'yellow-primary': '#FBF31C',
      },
      scrollPadding: {
        top: '10px',
      },
    },
  },
  plugins: [],
};
