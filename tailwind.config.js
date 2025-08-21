/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
			smbelow: {
				max: '576px'
			},
			mdbelow: {
				max: '768px'
			},
			sm: '576px',
			md: '768px',
			lg: '991px',
			xl: '1280px'
		},
    },
  },
  plugins: [],
}

