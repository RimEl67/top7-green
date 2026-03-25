"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Leaf, Sparkles } from "lucide-react"
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
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

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {t.hero.title1}{" "}
            <span className="italic text-[#70b62b]">{t.hero.titleHighlight}</span>{" "}
            {t.hero.title2}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium"
          >
            {t.hero.phrase}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`flex flex-col sm:flex-row items-center justify-center gap-6 ${isRTL ? 'sm:flex-row-reverse' : ''} mt-4`}
          >
            <Link href="/produits" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="group bg-[#70b62b] hover:bg-[#066532] text-white px-10 py-7 text-lg rounded-full shadow-2xl transition-all duration-300 w-full"
              >
                <span>{t.hero.cta1}</span>
                <ArrowRight className={`h-5 w-5 group-hover:translate-x-1 transition-transform ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2'}`} />
              </Button>
            </Link>
            <Link href="/a-propos" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="group bg-white text-[#066532] hover:bg-[#70b62b] hover:text-white px-10 py-7 text-lg rounded-full transition-all duration-300 font-bold shadow-xl w-full"
              >
                <Leaf className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span>{t.hero.cta2}</span>
              </Button>
            </Link>
          </motion.div>



        </div>
      </motion.div>

    </section>
  )
}
