"use client"

import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import ProductModal from "@/components/product-modal"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useLanguageStore } from "@/lib/language-store"

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  breadcrumb?: string
  videoSrc?: string
}

export default function PageLayout({ children, title, subtitle, breadcrumb, videoSrc }: PageLayoutProps) {
  const { isRTL } = useLanguageStore()

  // Handle split title for highlights (e.g. "Nos | Produits")
  const titleParts = title.split('|').map(s => s.trim())
  const mainTitle = titleParts[0]
  const highlightTitle = titleParts[1]

  return (
    <>
      <Navigation />
      {/* Hero Banner */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-[#254633]">
        {/* Video Background */}
        {videoSrc && (
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50" />
            <div className={`absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#254633]`} />
          </div>
        )}

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #70b62b 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Glowing orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#70b62b]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#70b62b]/15 rounded-full blur-3xl"
        />

        <div className={`container mx-auto px-4 md:px-6 relative z-10 py-24 pt-44 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex mb-8 ${isRTL ? 'justify-end' : 'justify-start'}`}
          >
            <Link
              href="/"
              className={`inline-flex items-center gap-2 text-white/60 hover:text-[#70b62b] transition-colors text-sm group ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <motion.div whileHover={{ x: isRTL ? 5 : -5 }} transition={{ type: "spring", stiffness: 400 }}>
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
              </motion.div>
              {isRTL ? 'العودة للرئيسية' : "Retour à l'accueil"}
            </Link>
          </motion.div>

          {/* Breadcrumb / Tagline with bar */}
          {breadcrumb && (
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-12 h-0.5 bg-[#70b62b] origin-left" 
              />
              <span className="text-sm font-bold text-[#70b62b] tracking-[0.2em] uppercase">
                {breadcrumb}
              </span>
            </motion.div>
          )}

          {/* Title - Staggered reveal */}
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-[1.05] block"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {mainTitle}
            </motion.h1>
            {highlightTitle && (
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-6xl md:text-7xl italic font-serif text-[#70b62b] block mt-2"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {highlightTitle}
              </motion.span>
            )}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Animated line indicator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className={`mt-12 h-1 bg-gradient-to-r from-[#70b62b] to-transparent rounded-full max-w-xs ${isRTL ? 'ml-0 mr-0' : ''}`}
          />
        </div>
      </section>

      {/* Page Content */}
      <main className="relative z-10">{children}</main>

      <Footer />
      <CartDrawer />
      <ProductModal />
    </>
  )
}
