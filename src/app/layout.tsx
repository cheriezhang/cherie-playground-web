import { Tab, Tabs } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

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

const Header = () => {
  const routes = [
    {
      label: "Blogs",
      path: "/blogs",
    },
    {
      label: "Demos",
      path: "/demos",
    },
  ];
  return (
    <header className="flex h-16 items-center gap-4 border-b border-gray-200 bg-white p-4 text-lg font-medium text-gray-700">
      <Link href="/">
        <Image
          src="/snowflake.svg"
          alt="logo"
          width={32}
          height={32}
          priority
        />
      </Link>
      <Tabs slots={{ list: "nav" }}>
        {routes.map((route) => {
          return (
            <Tab key={route.label} label={route.label} href={route.path} />
          );
        })}
      </Tabs>
    </header>
  );
};

export default function RootLayout({
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
