/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#000",
          "primary-content": "#fff",
          secondary: "#f3f4f6",
          "secondary-content": "#16110b",
          accent: "#034C9B",
          "accent-content": "#fff",
          neutral: "#fff",
          "neutral-content": "#080808",
          "base-100": "#fff",
          "base-200": "#dedede",
          "base-300": "#bebebe",
          "base-content": "#161616",
          info: "#4A7195",
          "info-content": "#fff",
          success: "#13A038",
          "success-content": "#fff",
          warning: "#9B4E06",
          "warning-content": "#fff",
          error: "#E92425",
          "error-content": "#fff",
        },
      },
    ],
  },
  plugins: [typography, daisyui],
};
