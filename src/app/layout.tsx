import type { Metadata } from "next";

import { ThemeProvider } from "@/components/context/theme";
import { Header } from "@/components/header";
import "./globals.css";

// const myFont = localFont({
//   src: "../../public/fonts/parastoo-variablefont_wght.woff2",
//   variable: "--font-parastoo",
//   display: "swap",
//   weight: "400",
//   style: "normal",
// });

export const metadata: Metadata = {
  title: "Cherie's Playground",
  description: "A frontend blog and experimental platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <ThemeProvider>
        {/* <AppRouterCacheProvider> */}
        <body
          className={`mx-0 flex h-screen min-w-[375px] flex-col gap-9 bg-background antialiased md:mx-24 lg:mx-48`}
        >
          <Header />
          <main>{children}</main>
        </body>
        {/* </AppRouterCacheProvider> */}
      </ThemeProvider>
      {/* <Analytics />
      <SpeedInsights /> */}
    </html>
  );
}
