"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Leaf, Sparkles, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { useLanguageStore, translations } from "@/lib/language-store"

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  const { language, isRTL } = useLanguageStore()
  const t = translations[language]

  const [mounted, setMounted] = useState(false)
  const [videoSrc, setVideoSrc] = useState("/videos/hero-bg.mp4")
  const [isVideoTransitioning, setIsVideoTransitioning] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleProductsClick = () => {
    setIsVideoTransitioning(true)
    setTimeout(() => {
      setVideoSrc("/videos/hero-bg2.mp4")
      setIsVideoTransitioning(false)
    }, 300)

    // Scroll to products section
    const productsSection = document.getElementById('produits')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={ref}
      id="accueil"
      className="relative min-h-screen flex items-end justify-center pb-28 md:pb-40 overflow-hidden"
      style={{ position: "relative" }}
    >
      {/* Video Background */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 -z-10"
      >
        <motion.video
          key={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          initial={{ opacity: 0 }}
          animate={{ opacity: isVideoTransitioning ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </motion.video>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="container mx-auto px-4 md:px-6 w-full relative z-10"
      >
        <div className={`max-w-4xl mx-auto text-center ${isRTL ? 'font-arabic' : ''}`}>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`flex flex-col sm:flex-row items-center justify-center gap-6 ${isRTL ? 'sm:flex-row-reverse' : ''} mt-4`}
          >
            <Link href="/produits" className="w-auto">
              <Button
                size="lg"
                className="group bg-[#70b62b] hover:bg-[#066532] text-white px-7 py-5 sm:px-10 sm:py-7 text-base sm:text-lg rounded-full shadow-2xl transition-all duration-300 w-auto"
              >
                <span>{t.hero.cta1}</span>
                <ArrowRight className={`h-5 w-5 group-hover:translate-x-1 transition-transform ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2'}`} />
              </Button>
            </Link>
          </motion.div>

          {/* Scroll Down Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium mb-1">Explorer</span>
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.div>



        </div>
      </motion.div>

    </section>
  )
}
