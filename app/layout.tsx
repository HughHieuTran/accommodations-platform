import getCurrentUser from './action/getCurrentUser'
import ClientOnly from './components/ClientOnly'
import LoginModal from './components/Modal/LoginModal'

import RegisterModal from './components/Modal/RegisterModal'
import RentModal from './components/Modal/RentModal'
import SearchModal from './components/Modal/SearchModal'
import ToasterProvider from './components/Provider/ToasterProvider'
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className} >
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}

        </div>
      </body>
    </html>
  )
}
