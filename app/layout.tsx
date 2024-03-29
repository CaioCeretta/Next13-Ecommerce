import CartProvider from '@/providers/CartProvider'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Footer } from './components/footer/Footer'
import { Navbar } from './components/nav/NavBar'
import './globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700', '800'] })

export const metadata: Metadata = {
  title: 'E-shop',
  description: 'Generated by create next app',
}

export default function RootAppTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster
          toastOptions={{
            style: {
              background: 'rgb(51 65 85)',
              color: '#fff',
            },
          }}
        />
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
