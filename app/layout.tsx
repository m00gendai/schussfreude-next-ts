import '@/styles/globals.css'
import Navbar from "@/components/Navbar"
import { Inter } from 'next/font/google'
import Navbar_Mobile from '@/components/Navbar_Mobile'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar_Mobile />
        <Navbar />
        {children}
      </body>
    </html>
  )
}

