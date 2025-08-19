/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/index.html",
    "./src/*.{js,ts,jsx,tsx}",
    "./src/*.tsx",
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
