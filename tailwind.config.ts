import type { Config } from "tailwindcss";

// useless in tailwind V4
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-light": "var(--color-primary-light)",
        "primary-dark": "var(--color-primary-dark)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",

        background: "var(--color-background)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",

        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-disabled": "var(--color-text-disabled)",

        chart1: "var(--color-chart-1)",
        chart2: "var(--color-chart-2)",
        chart3: "var(--color-chart-3)",
        chart4: "var(--color-chart-4)",
        chart5: "var(--color-chart-5)",
        chart6: "var(--color-chart-6)",
      },
      fontSize: {
        h1: "var(--text-h1)",
        h2: "var(--text-h2)",
        h3: "var(--text-h3)",
        h4: "var(--text-h4)",
        h5: "var(--text-h5)",
        h6: "var(--text-h6)",
        text: "var(--text-body)",
        button: "var(--text-button)",
        label: "var(--text-label)",
      },
    },
  },
  plugins: [],
};

export default config;
