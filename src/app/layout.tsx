import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { cn } from "@/shared/lib/utils";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("antialiased", inter.className)}
        suppressHydrationWarning
      >
        <Providers>
          <div className="flex min-h-svh flex-col">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
