"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Leaf, Award, Users, Globe, CheckCircle2 } from "lucide-react"
import { useLanguageStore, translations } from "@/lib/language-store"

const features = [
  {
    icon: Leaf,
    title: "100% Naturel",
    description: "Produits purs sans additifs chimiques",
  },
  {
    icon: Award,
    title: "Qualité Premium",
    description: "Sélection rigoureuse des meilleures herbes",
  },
  {
    icon: Users,
    title: "Expertise Locale",
    description: "Partenariat avec des agriculteurs marocains",
  },
  {
    icon: Globe,
    title: "Éco-Responsable",
    description: "Pratiques durables et respectueuses",
  },
]

const values = [
  "Récolte traditionnelle à la main",
  "Séchage naturel au soleil",
  "Emballage écologique",
  "Traçabilité complète",
  "Commerce équitable",
  "Certification bio",
]

export default function AboutSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { language, isRTL } = useLanguageStore()
  const t = translations[language].about
  
  const featuresFr = [
    { icon: Leaf, title: "100% Naturel", description: "Produits purs sans additifs chimiques" },
    { icon: Award, title: "Qualité Premium", description: "Sélection rigoureuse des meilleures herbes" },
    { icon: Users, title: "Expertise Locale", description: "Partenariat avec des agriculteurs marocains" },
    { icon: Globe, title: "Éco-Responsable", description: "Pratiques durables et respectueuses" },
  ]
  const featuresAr = [
    { icon: Leaf, title: "100% طبيعي", description: "منتجات نقية بدون إضافات كيميائية" },
    { icon: Award, title: "جودة ممتازة", description: "اختيار دقيق لأجود الأعشاب" },
    { icon: Users, title: "خبرة محلية", description: "شراكة مع المزارعين المغاربة" },
    { icon: Globe, title: "مسؤولية بيئية", description: "ممارسات مستدامة وصديقة للبيئة" },
  ]
  const valuesFr = ["Récolte traditionnelle à la main", "Séchage naturel au soleil", "Emballage écologique", "Traçabilité complète", "Commerce équitable", "Certification bio"]
  const valuesAr = ["الحصاد اليدوي التقليدي", "تجفيف طبيعي بالشمس", "تغليف صديق للبيئة", "تتبع كامل للمنتجات", "تجارة عادلة", "شهادة عضوية"]
  const features = language === 'ar' ? featuresAr : featuresFr
  const values = language === 'ar' ? valuesAr : valuesFr
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])
  const rotate = useTransform(scrollYProgress, [0, 1], ["-3deg", "3deg"])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.9])

  return (
    <section
      id="apropos"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white relative overflow-hidden"
      style={{ position: "relative" }}
    >
      {/* Background decoration with parallax */}
      <motion.div 
        style={{ y: textY }}
        className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#f8f0da]/20 to-transparent" 
      />
      <motion.div 
        style={{ scale }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-[#70b62b]/5 rounded-full blur-3xl" 
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:[direction:rtl]' : ''}`}>
          {/* Left - Image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            className="relative"
          >
            {/* Main image with parallax */}
            <motion.div 
              style={{ y: imageY, rotate }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/about-story.jpg"
                alt="Notre histoire - Top7green"
                fill
                className="object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#254633]/40 to-transparent" />
              
              {/* Animated shine */}
              <motion.div
                animate={{ 
                  x: ["-100%", "200%"],
                  opacity: [0, 0.3, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  repeatDelay: 5 
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12"
              />
            </motion.div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="absolute -bottom-8 -right-8 md:right-8 bg-white rounded-2xl p-6 shadow-xl border border-[#254633]/5"
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-14 h-14 rounded-full bg-[#70b62b]/10 flex items-center justify-center"
                >
                  <span className="text-2xl font-bold text-[#70b62b]">15+</span>
                </motion.div>
                <div>
                  <div className="text-sm text-[#254633]/60">{language === 'ar' ? 'سنة' : 'Années'}</div>
                  <div className="font-bold text-[#254633]">{language === 'ar' ? 'من الخبرة' : "d'Expertise"}</div>
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div 
              style={{ rotate }}
              className="absolute -top-6 -left-6 w-24 h-24 border-2 border-[#70b62b]/30 rounded-2xl" 
            />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#70b62b]/10 rounded-full blur-xl" 
            />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block text-sm font-medium text-[#70b62b] tracking-wider uppercase mb-4"
            >
              {t.badge}
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-3xl md:text-5xl font-bold text-[#254633] mb-6 leading-tight text-balance ${isRTL ? 'text-right font-arabic' : ''}`}
            >
              {language === 'ar' ? 'الطبيعة في قلب ' : 'La Nature au Coeur de '}
              <span className="text-gradient">{language === 'ar' ? 'مهمتنا' : 'Notre Mission'}</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`text-lg text-[#254633]/70 mb-8 leading-relaxed ${isRTL ? 'text-right font-arabic' : ''}`}
            >
              {t.description}
            </motion.p>

            {/* Values list with stagger animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 gap-3 mb-10"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center gap-2 cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#70b62b] flex-shrink-0" />
                  </motion.div>
                  <span className="text-sm text-[#254633]">{value}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1 + index * 0.15 }}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.03,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                  className="p-4 rounded-2xl bg-[#f8f0da]/50 border border-[#254633]/5 transition-all cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="h-8 w-8 text-[#70b62b] mb-3" />
                  </motion.div>
                  <h4 className="font-bold text-[#254633] mb-1">{feature.title}</h4>
                  <p className="text-xs text-[#254633]/60">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
