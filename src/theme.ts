"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-parastoo), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    // sync with Tailwindcss
    h1: {
      fontSize: '2.25rem', // text-4xl
      fontWeight: 800, // font-extrabold
      lineHeight: 1.25,
    },
    h2: {
      fontSize: '1.875rem', // text-3xl
      fontWeight: 700, // font-bold
      lineHeight: 1.375,
    },
    h3: {
      fontSize: '1.5rem', // text-2xl
      fontWeight: 600, // font-semibold
      lineHeight: 1.5,
    },
    h4: {
      fontSize: '1.25rem', // text-xl
      fontWeight: 600, // font-semibold
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem', // text-base
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none', // Disable uppercase transformation
    },
  },
});

export default theme;
