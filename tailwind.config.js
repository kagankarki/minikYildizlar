/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#050506",
          soft: "#0b0b0d",
          raised: "#121215",
          line: "#1e1e23",
        },
        gold: {
          50: "#fbf6ea",
          100: "#f4e7c8",
          200: "#e9d29b",
          300: "#dcb970",
          400: "#cfa14d",
          500: "#b9873a",
          600: "#96682b",
        },
        cream: "#f2eee7",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        shell: "78rem",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
        "scroll-hint": {
          "0%": { transform: "translateY(-40%)", opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { transform: "translateY(140%)", opacity: "0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 1.2s ease both",
        shimmer: "shimmer 2.4s linear infinite",
        "pulse-soft": "pulse-soft 2.8s ease-in-out infinite",
        "scroll-hint": "scroll-hint 2s ease-in-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
      },
    },
  },
  plugins: [],
};
