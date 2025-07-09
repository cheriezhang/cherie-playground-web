import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { Header } from "@/components/header";

import theme from "../theme";
import "./globals.css";

const myFont = localFont({
  src: "../../public/fonts/parastoo-variablefont_wght.woff2",
  variable: "--font-parastoo",
  display: "swap",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Cherie's Playground",
  description: "A frontend blog and experimental platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${myFont.variable} flex h-screen flex-col antialiased`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Header />
            <main className="flex-1 bg-gray-100">{children}</main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
