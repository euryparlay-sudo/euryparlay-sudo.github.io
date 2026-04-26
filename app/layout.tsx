import type { Metadata, Viewport } from "next"
import { Bebas_Neue, Special_Elite, Courier_Prime } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
})

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-elite",
})

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier",
})

export const metadata: Metadata = {
  title: "X-A | Eternal Archive",
  description:
    "Sebuah arsip yang tetap hidup. Kalau kamu mendengar gema ini, berarti kamu pernah ada di sini.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#060608",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${bebas.variable} ${specialElite.variable} ${courier.variable} bg-background`}
    >
      <body className="font-mono antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
