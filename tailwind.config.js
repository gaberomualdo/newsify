module.exports = {
  mode: 'JIT',
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    safelist: Array.from(
      new Set(
        `
bg-gray-100 transition-all block px-4 py-2 text-sm text-gray-700 w-full text-left truncate ml-3 absolute top-0 right-0 p-2
transition-all max-w-xs bg-white border rounded-full flex items-center text-sm outline-none p-2 md:hover:bg-gray-100
h-5 w-5 p-0.5
hidden ml-0 text-gray-700 text-sm font-medium lg:block
sr-only
no-underline
bg-white
cursor-pointer
transition ease-out duration-100
transform opacity-0 scale-95
transform opacity-100 scale-100
transition ease-in duration-75
transform opacity-100 scale-100
transform opacity-0 scale-95
origin-top-right absolute right-2 mt-2 w-48 rounded-md py-1 bg-white focus:outline-none z-50
prose
prose-md
prose-lg
`
          .trim()
          .split('\n')
          .join(' ')
          .split(' ')
      )
    ),
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
