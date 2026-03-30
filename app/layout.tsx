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
  title: "Top7green | Be Known Be Natural",
  description:
    "Top7green, experts au Maroc en plantes médicinales, herbes aromatiques et cosmétiques naturels. Collection premium 100% naturelle (Sidr, Romarin, Huile d'Argan). Achat en ligne partout au Maroc.",
  keywords: [
    "produit naturel maroc",
    "cosmétique naturel maroc",
    "plantes médicinales maroc",
    "acheter sidr maroc",
    "huile argan premium maroc",
    "herbes aromatiques maroc",
    "savon noir maroc",
    "ghassoul maroc",
    "awlouz maroc",
    "top7green",
  ],
  authors: [{ name: "Top7green" }],
  creator: "Top7green",
  metadataBase: new URL("https://top7green.ma"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logos/LOGO-JPEG.jpg",
  },
  openGraph: {
    title: "Top7green | Be Known Be Natural",
    description:
      "Découvrez notre collection exclusive de plantes médicinales, herbes aromatiques et cosmétiques naturels de qualité premium 100% authentique au Maroc.",
    url: "https://top7green.ma",
    siteName: "Top7green",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Top7green Produits Naturels Maroc",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Produits Naturels & Cosmétiques | Top7green",
    description:
      "Experts en plantes médicinales, herbes aromatiques et cosmétiques naturels premium au Maroc.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* 🔥 Schema SEO (IMPORTANT) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Top7green",
              image: "https://top7green.ma/logo.png",
              url: "https://top7green.ma",
              telephone: "+212671013099",
              address: {
                "@type": "PostalAddress",
                addressCountry: "MA",
                addressLocality: "Agadir",
              },
              description:
                "Experts en plantes médicinales marocaines, cosmétiques naturels et produits du terroir (Sidr, Argan, Awlouz).",
              areaServed: "Morocco",
              sameAs: [
                "https://facebook.com/",
                "https://instagram.com/",
              ],
            }),
          }}
        />

        {/* Mobile SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Theme color */}
        <meta name="theme-color" content="#254633" />
      </head>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <RTLProvider>
          {children}
        </RTLProvider>
        <Analytics />
      </body>
    </html>
  )
}

