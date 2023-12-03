/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],  theme: {
    extend: {
      colors: {
        "blueberry": "#0a2f83",
        "redberry": "#b3000f",
        "lightGray": "#efefef",
        "darkGray": "#595959",
    },
    },  },
plugins: [
    function ({ addVariant }) {
        addVariant('childOdd', '&>*:nth-child(odd)');
        addVariant('childEven', '&>*:nth-child(even)');
        addVariant('child', '& > div');
        addVariant('child-hover', '& > div:hover');
    }
],
}

