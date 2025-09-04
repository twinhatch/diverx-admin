/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "custom-blue": "#FF9D28",
        "custom-yellow": "#0D97AE",
        "custom-darkBlack": "#323232",
        "custom-black": "#303030",
        "custom-lightBlue": "#0D97AE",
        "custom-green": "#04CD00",
        "custom-darkGreen": "#83CC25",
        "custom-darkBlue": "#0B63F8",
        "custom-darkGreens": "#07A404",
        "custom-red": "#FF0000",
        "custom-darkRed": "#D20202",
        "custom-darksRed": "#B90000",
        "custom-darksGreen": "#009C3E",
        "custom-gray": "#797979"
      }
    },
  },
  plugins: [],
}
