/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // Tệp HTML gốc
    './src/**/*.{js,ts,jsx,tsx}', // Tất cả các tệp mã nguồn
    './node_modules/@mantine/core/**/*.{js,ts,jsx,tsx}', // Mantine components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

