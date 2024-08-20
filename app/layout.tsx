import type { Metadata } from "next"
import "./globals.css"
import Footer from "./_components/footer"

// const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MarcaFlex",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}
