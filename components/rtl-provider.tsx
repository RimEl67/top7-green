"use client"

import { useEffect } from "react"
import { useLanguageStore } from "@/lib/language-store"

export default function RTLProvider({ children }: { children: React.ReactNode }) {
  const { language, isRTL } = useLanguageStore()

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  }, [language, isRTL])

  return <>{children}</>
}
