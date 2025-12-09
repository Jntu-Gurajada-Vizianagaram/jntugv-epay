module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        jntu: {
          50: "#f5f8ff",
          100: "#e6f0ff",
          200: "#bcd8ff",
          300: "#90bfff",
          400: "#5fa9ff",
          500: "#0b5cff",   // primary
          600: "#084bd6",
          700: "#0639a3",
          800: "#042772",
          900: "#021541"
        }
      },
      borderRadius: { "xl-2": "1rem" },
      animation: {
        spin: "spin 1s linear infinite",
        pulse: "pulse 2s infinite"
      }
    }
  },
  plugins: [],

};
