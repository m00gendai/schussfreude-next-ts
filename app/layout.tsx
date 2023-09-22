import '@/styles/globals.css'
import Navbar from "@/components/Navbar"
import Navbar_Mobile from '@/components/Navbar_Mobile'
import Footer from '@/components/Footer'
import Footer_Mobile from '@/components/Footer_Mobile'
import CookieProvider from "@/components/CookieProvider"

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
        <CookieProvider>
          {children}
        </CookieProvider>
        <Footer />
        <Footer_Mobile />
      </body>
    </html>
  )
}

