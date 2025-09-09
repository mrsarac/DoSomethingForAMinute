/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#EDEDED',
        'custom-text': '#32302D',
        'status-draft': '#6941C6',
        'status-published': '#027A48',
        'status-archived': '#363F72',
      }
    },
  },
  plugins: [],
}
