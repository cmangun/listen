import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "../theme/src/scss/styles.scss" // Global styles from your theme
import { ThemeProvider } from "@/components/theme-provider" // Assuming you have this from default v0 setup

export const metadata: Metadata = {
  title: "Listen Music App",
  description: "Music Streaming Application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>{/* Favicon and other meta tags can be added here from your theme/index.html if needed */}</head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Script src="/js/amplitude.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  )
}


import './globals.css'