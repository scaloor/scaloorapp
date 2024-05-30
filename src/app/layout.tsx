import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/app/_components/providers/theme-provider";
import ModalProvider from "@/app/_components/providers/modal-provider";
import { Toaster } from "@/app/_components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scaloor",
  description: "No code funnel builder",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ModalProvider>

              {children}
              <Toaster />
            </ModalProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html >
  );
}
