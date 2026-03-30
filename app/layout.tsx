import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import RTLProvider from '@/components/rtl-provider'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin", "latin-ext"],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Top7green | Be Known Be Natural - Plantes Médicinales & Cosmétiques Naturels',
  description: 'Découvrez notre collection exclusive de plantes médicinales marocaines, herbes aromatiques et cosmétiques naturels. Sidr, romarin, awlouz et plus encore. Qualité premium, 100% naturel.',
  keywords: 'plantes médicinales, cosmétiques naturels, Maroc, sidr, romarin, awlouz, herbes aromatiques, produits naturels, beauté naturelle',
  openGraph: {
    title: 'Top7green | Be Known Be Natural',
    description: 'Plantes médicinales marocaines et cosmétiques naturels de qualité premium',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <RTLProvider>
          {children}
        </RTLProvider>
        <Analytics />
      </body>
    </html>
  )
}

