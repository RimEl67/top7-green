"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useLanguageStore, type Language } from "@/lib/language-store"
import { useState, useEffect } from "react"

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguageStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  const isFR = language === 'fr'

  return (
    <div
      className="relative flex items-center h-9 rounded-full bg-[#254633]/8 backdrop-blur-md border border-white/20 p-0.5 cursor-pointer select-none overflow-hidden shadow-inner"
      style={{ width: '80px', background: 'rgba(37,70,51,0.08)' }}
      role="button"
      aria-label="Toggle language"
    >
      {/* Sliding pill */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="absolute top-0.5 bottom-0.5 w-[38px] rounded-full bg-[#254633] shadow-md z-0"
        style={{ left: isFR ? '2px' : 'calc(100% - 40px)' }}
      />

      {/* FR */}
      <button
        onClick={() => setLanguage('fr' as Language)}
        className="relative z-10 flex-1 flex items-center justify-center h-full rounded-full text-xs font-bold tracking-wider transition-colors duration-200"
        style={{ color: isFR ? 'white' : '#254633' }}
      >
        FR
      </button>

      {/* AR */}
      <button
        onClick={() => setLanguage('ar' as Language)}
        className="relative z-10 flex-1 flex items-center justify-center h-full rounded-full text-xs font-bold tracking-wider transition-colors duration-200"
        style={{ color: !isFR ? 'white' : '#254633' }}
      >
        AR
      </button>
    </div>
  )
}
