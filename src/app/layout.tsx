import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { getServerSession } from "next-auth"
import SessionProvider from "./components/SessionProvider"
import ReduxProvider from "../../redux/ReduxProvider"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "UEats App",
  description: "Aplicación de pedidos de comida para la universidad",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <ReduxProvider>
          <SessionProvider>{children}</SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
