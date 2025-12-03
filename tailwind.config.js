/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#ff3ddb",
                "background-light": "#e5e5e5",
                "background-dark": "#121212",
            },
            fontFamily: {
                display: ["Space Grotesk", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0px",
            },
        },
    },
    plugins: [],
}
