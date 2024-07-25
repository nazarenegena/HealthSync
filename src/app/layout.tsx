import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthContextProvider } from "@/contexts/AuthenticationContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "healthSync",
  description: "Sync Your Life, Elevate Your Health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthContextProvider>{children}</AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
