"use client"

import '@/styles/globals.css'
import Navbar from "@/components/Navbar"
import { Inter } from 'next/font/google'
import {useMediaQuery} from '@react-hook/media-query'
import Navbar_Mobile from '@/components/Navbar_Mobile'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const isMobile = useMediaQuery('only screen and (max-aspect-ratio: 13/9)')

  return (
    <html lang="en">
      <body className={inter.className}>
        {isMobile ? <Navbar_Mobile /> : <Navbar />}
        {children}
      </body>
    </html>
  )
}

