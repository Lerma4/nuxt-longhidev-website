/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    safelist: [
        'font-win95',
        'bg-win-gray',
        'text-win-black',
        'win95-window',
        'win95-button',
        'win95-inset',
        'win95-title-bar'
    ],
    theme: {
        extend: {
            colors: {
                primary: "#ff3ddb",
                "background-light": "#e5e5e5",
                "background-dark": "#121212",
                'win-gray': '#c0c0c0',
                'win-dark-gray': '#808080',
                'win-blue': '#000080',
                'win-white': '#ffffff',
                'win-black': '#0a0a0a',
            },
            fontFamily: {
                display: ["Space Grotesk", "sans-serif"],
                win95: ["VT323", "monospace"],
            },
            borderRadius: {
                DEFAULT: "0px",
            },
        },
    },
    plugins: [],
}
