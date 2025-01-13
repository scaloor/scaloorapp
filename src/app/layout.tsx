import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./prosemirror.css";
import { ThemeProvider } from "@/app/_components/providers/theme-provider";
import { Toaster } from "@/app/_components/ui/sonner";
import { cn } from "@/lib/utils";
import { Plus_Jakarta_Sans } from 'next/font/google'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-plus-jakarta'
})

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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${plusJakarta.variable}`}>
      <head />
      <body className={cn("font-inter")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
