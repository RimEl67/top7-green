"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Search, Menu, X, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { useLanguageStore, translations } from "@/lib/language-store"
import LanguageToggle from "./language-toggle"

export default function Navigation() {
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getTotalItems, openCart } = useCartStore()
  const { language, isRTL } = useLanguageStore()
  const t = translations[language]

  useEffect(() => {
    setMounted(true)
  }, [])

  const totalItems = mounted ? getTotalItems() : 0

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/produits", label: t.nav.products },
    { href: "/a-propos", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/90 backdrop-blur-lg shadow-lg py-2"
      >
        <div className="container mx-auto px-4 md:px-6">
          <nav className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <Image
                  src="/images/logo-nobg.png"
                  alt="Top7green - Be Known Be Natural"
                  width={180}
                  height={70}
                  className="h-14 md:h-16 w-auto object-contain"
                  style={{ width: 'auto', height: 'auto', maxHeight: '64px' }}
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className={`hidden lg:flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`relative font-medium text-sm tracking-wide transition-colors group text-[#70b62b] ${isRTL ? 'font-arabic' : ''}`}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#70b62b] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className={`hidden lg:flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <LanguageToggle />
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`text-[#70b62b] hover:bg-[#70b62b]/10`}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`text-[#70b62b] hover:bg-[#70b62b]/10`}
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={openCart}
                  className={`relative text-[#70b62b] hover:bg-[#70b62b]/10`}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <AnimatePresence mode="wait">
                    {totalItems > 0 && (
                      <motion.span
                        key={totalItems}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-[#70b62b] text-white text-xs rounded-full flex items-center justify-center font-bold"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className={`lg:hidden flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <LanguageToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative text-[#70b62b]"
              >
                <ShoppingBag className="h-5 w-5" />
                <AnimatePresence mode="wait">
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-[#70b62b] text-white text-xs rounded-full flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#70b62b]"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6 text-[#70b62b]" />
                )}
              </Button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: isRTL ? "-100%" : "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-0 bottom-0 w-80 bg-[#f8f0da] shadow-2xl flex flex-col`}>
              <div className="p-6 flex-1">
                <div className="mt-20 space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-3 text-lg font-medium text-[#254633] hover:text-[#70b62b] transition-colors border-b border-[#254633]/10 ${isRTL ? 'text-right font-arabic' : ''}`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className={`mt-8 flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-[#066532] text-[#066532] hover:bg-[#066532] hover:text-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-[#066532] text-[#066532] hover:bg-[#066532] hover:text-white"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
