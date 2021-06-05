import tailwindConfig from "./tailwind.config";

// postcss.config.js
 export = {
	plugins: [
		require('tailwindcss'),
		require('autoprefixer'),
	],
};
