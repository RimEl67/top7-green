"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

// Global variable to track if the preloader has already been shown during this session
// This survives client-side navigation but resets on full page refresh
let hasBeenShown = false;

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(!hasBeenShown)
  const [progress, setProgress] = useState(hasBeenShown ? 100 : 0)

  useEffect(() => {
    if (hasBeenShown) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setIsLoading(false)
            hasBeenShown = true;
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#f8f0da] flex flex-col items-center justify-center"
        >
          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <Image
              src="/images/logo-nobg.png"
              alt="Top7green"
              width={200}
              height={80}
              className="h-20 w-auto object-contain"
              style={{ width: "auto" }}
              priority
            />
          </motion.div>

          {/* Animated leaves */}
          <div className="relative w-24 h-24 mb-4">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1, 1, 0],
                  rotate: [0, 180, 360, 360],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={i % 2 === 0 ? "text-[#70b62b]" : "text-[#066532]"}
                >
                  <path
                    d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5 0 3-.3 4.3-.9-.8-1.5-1.3-3.3-1.3-5.1 0-5 3.6-9.2 8.3-9.9C21.7 3.4 17.2 2 12 2z"
                    fill="currentColor"
                  />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-48 h-1 bg-[#254633]/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#70b62b] to-[#066532] rounded-full"
            />
          </div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 text-[#254633]/60 text-sm font-medium"
          >
            Be Known Be Natural
          </motion.p>

          {/* Percentage */}
          <motion.span
            key={progress}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-[#70b62b] font-bold text-lg"
          >
            {progress}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
