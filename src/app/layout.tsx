import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthContextProvider } from "@/contexts/AuthenticationContext";
import { Toaster, toast } from "sonner";

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
          <AuthContextProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                classNames: {
                  error: "text-red-600 bg-red-100 border border-red-600",
                  success:
                    "text-green-600 bg-green-100 border border-green-600",
                  warning:
                    "text-yellow-400 bg-yellow-100 border border-yellow-600",
                  info: "bg-blue-400 bg-blue-100 border border-blue-600",
                },
              }}
            />{" "}
            {children}
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
