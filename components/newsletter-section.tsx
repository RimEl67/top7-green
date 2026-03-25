"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Send, Leaf, Gift, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useLanguageStore, translations } from "@/lib/language-store"

const benefitsFr = [
  { icon: Gift, text: "10% de réduction sur votre première commande" },
  { icon: Leaf, text: "Accès exclusif aux nouveautés" },
  { icon: Sparkles, text: "Conseils beauté et bien-être naturels" },
]
const benefitsAr = [
  { icon: Gift, text: "خصم 10% على طلبك الأول" },
  { icon: Leaf, text: "وصول حصري إلى المنتجات الجديدة" },
  { icon: Sparkles, text: "نصائح الجمال والصحة الطبيعية" },
]

export default function NewsletterSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { language, isRTL } = useLanguageStore()
  const t = translations[language].newsletter
  const benefits = language === 'ar' ? benefitsAr : benefitsFr

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.02, 0.95])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitting(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubscribed(true)
      setIsSubmitting(false)
      setEmail("")
    }
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#f8f0da] relative overflow-hidden"
      style={{ position: "relative" }}
    >
      {/* Animated background decorations */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-[#70b62b]/10 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-[#066532]/10 rounded-full blur-3xl" 
      />

      {/* Floating leaves decoration */}
      <motion.div
        animate={{ 
          y: [0, -30, 0], 
          rotate: [0, 15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 text-[#70b62b]/20"
      >
        <Leaf className="h-20 w-20" />
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, 30, 0], 
          rotate: [0, -15, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 text-[#066532]/20"
      >
        <Leaf className="h-16 w-16" />
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, -20, 0], 
          x: [0, 10, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-1/4 text-[#70b62b]/10"
      >
        <Leaf className="h-12 w-12" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            style={{ scale }}
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-[#254633]/5 relative overflow-hidden"
          >
            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#70b62b]/10 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#066532]/10 to-transparent rounded-tr-full" />

            <div className="text-center mb-10 relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#70b62b]/10 mb-6"
              >
                <Send className="h-8 w-8 text-[#70b62b]" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`text-3xl md:text-4xl font-bold text-[#254633] mb-4 text-balance ${isRTL ? 'font-arabic' : ''}`}
              >
                {language === 'ar' ? 'انضم إلى مجتمع ' : 'Rejoignez la Communauté '}
                <span className="text-gradient">Top7green</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`text-[#254633]/60 text-lg max-w-xl mx-auto ${isRTL ? 'font-arabic' : ''}`}
              >
                {t.subtitle}
              </motion.p>
            </div>

            {/* Benefits with stagger */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center gap-3 cursor-default"
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-full bg-[#70b62b]/10 flex items-center justify-center flex-shrink-0"
                  >
                    <benefit.icon className="h-5 w-5 text-[#70b62b]" />
                  </motion.div>
                  <span className="text-sm text-[#254633]">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Form */}
            {!isSubscribed ? (
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                <div className="flex-1 relative">
                  <Input
                    type="email"
                    placeholder="Votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-14 rounded-xl border-[#254633]/20 focus:border-[#70b62b] focus:ring-[#70b62b] text-[#254633] placeholder:text-[#254633]/40 pr-4"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="h-14 px-8 bg-[#066532] hover:bg-[#254633] text-white rounded-xl shadow-lg shadow-[#066532]/25 transition-all duration-300 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        {"S'inscrire"}
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-center py-8 px-8 rounded-xl bg-[#70b62b]/10 max-w-lg mx-auto"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <CheckCircle2 className="h-12 w-12 text-[#70b62b] mx-auto mb-4" />
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-[#066532] font-bold text-lg mb-2"
                >
                  Bienvenue dans la famille Top7green !
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-[#254633]/60"
                >
                  Vérifiez votre boîte email pour profiter de votre réduction de 10%.
                </motion.p>
              </motion.div>
            )}

            {/* Privacy note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center text-xs text-[#254633]/40 mt-6"
            >
              En vous inscrivant, vous acceptez notre politique de confidentialité.
              Désabonnement possible à tout moment.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
