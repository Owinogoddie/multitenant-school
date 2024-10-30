// import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { ReactNode } from "react"

export default function RootLayout({ children }: {children:ReactNode}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
        <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
