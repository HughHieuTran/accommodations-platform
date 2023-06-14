import ClientOnly from './components/ClientOnly'

import RegisterModal from './components/Modal/RegisterModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'

import { Nunito } from "next/font/google"

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb app',
}

const font = Nunito({
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className} >
        <ClientOnly>
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
