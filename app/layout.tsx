import '@/styles/globals.css'
import Navbar from "@/components/Navbar"
import Navbar_Mobile from '@/components/Navbar_Mobile'
import Footer from '@/components/Footer'
import Footer_Mobile from '@/components/Footer_Mobile'
import CookieProvider from "@/components/CookieProvider"
import '@mantine/core/styles.css';

import { MantineProvider, ColorSchemeScript } from '@mantine/core';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="de">
      <body>
        <Navbar_Mobile />
        <Navbar />
        <MantineProvider>
        <CookieProvider>
          {children}
        </CookieProvider>
        </MantineProvider>
        <Footer />
        <Footer_Mobile />
      </body>
    </html>
  )
}

