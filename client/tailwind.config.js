// /** @type {import('tailwindcss').Config} */
// export default {
// 	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
// 	theme: {
// 	  extend: {},
// 	},
// 	plugins: [],
//   }
  
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
	  extend: {
		colors: {
		  // Optional: Customize if needed
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: "hsl(var(--primary))",
		  "primary-foreground": "hsl(var(--primary-foreground))",
		  muted: "hsl(var(--muted))",
		  "muted-foreground": "hsl(var(--muted-foreground))",
		},
	  },
	},
	plugins: [
		// require("tailwindcss-animate")

	],
  }
  