'use client'

import { useState, useEffect } from 'react'
import { Cairo, Poppins } from 'next/font/google'
import LoadingScreen from '@/components/layout/LoadingScreen'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Chatbot from '@/components/chatbot/Chatbot'
import '../globals.css'

const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' })
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export default function RootLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isArabic = lang === 'ar'

  if (!mounted) return null

  return (
    <html
      lang={lang}
      dir={isArabic ? 'rtl' : 'ltr'}
      className={isArabic ? cairo.variable : poppins.variable}
    >
      <body>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        {!loading && (
          <>
            <Header />
            <main>{children}</main>
            <Footer />
            <Chatbot lang={lang} />
          </>
        )}
      </body>
    </html>
  )
}
