"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { ArrowUpRight, Leaf, Sparkles, Heart, Star } from "lucide-react"
import { useLanguageStore, translations } from "@/lib/language-store"

export default function CategoriesSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { language, isRTL } = useLanguageStore()
  const t = translations[language].categories

  const categories = [
    {
      id: 1,
      title: t.herbs.title,
      description: t.herbs.description,
      image: "/images/products/img.png",
      icon: Leaf,
      count: language === 'ar' ? "+٤٥ منتج" : "45+ Produits",
      color: "#70b62b",
    },
    {
      id: 2,
      title: t.cosmetics.title,
      description: t.cosmetics.description,
      image: "/images/SHOOTING Produits _/IMG_7295.JPG",
      icon: Sparkles,
      count: language === 'ar' ? "+٣٨ منتج" : "38+ Produits",
      color: "#066532",
    },
    {
      id: 3,
      title: t.wellness.title,
      description: t.wellness.description,
      image: "/images/categories/wellness.jpg",
      icon: Heart,
      count: language === 'ar' ? "+٣٢ منتج" : "32+ Produits",
      color: "#254633",
    },
    {
      id: 4,
      title: t.traditional.title,
      description: t.traditional.description,
      image: "/images/categories/traditional.jpg",
      icon: Star,
      count: language === 'ar' ? "+٤٠ منتج" : "40+ Produits",
      color: "#70b62b",
    },
  ]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  return (
    <section
      id="categories"
      ref={sectionRef}
      className={`py-24 md:py-32 bg-white relative overflow-hidden ${isRTL ? 'font-arabic' : ''}`}
      style={{ position: "relative" }}
    >
      {/* Animated background decoration */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#f8f0da]/30 to-transparent"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#70b62b]/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          style={{ scale }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm font-medium text-[#70b62b] tracking-wider uppercase mb-4"
          >
            {t.title}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#254633] mb-6 text-balance"
          >
            {language === 'ar' ? (
              <>
                استكشف <span className="text-gradient">عالمنا</span> الطبيعي
              </>
            ) : (
              <>
                Explorez Notre Univers <span className="text-gradient">Naturel</span>
              </>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#254633]/60 text-lg"
          >
            {t.subtitle}
          </motion.p>
        </motion.div>

        {/* Categories grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 ${isRTL ? 'direction-rtl' : ''}`}>
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 80, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15 * index,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="group cursor-pointer perspective-1000"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
                {/* Image with parallax */}
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.7 }}
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#254633]/90 via-[#254633]/30 to-transparent" />

                {/* Animated border */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 border-2 border-[#70b62b] rounded-2xl"
                />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className={`w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/20 ${isRTL ? 'mr-0' : ''}`}
                  >
                    <category.icon className="h-6 w-6 text-white" />
                  </motion.div>

                  {/* Text */}
                  <motion.h3
                    className={`text-xl font-bold text-white mb-2 group-hover:text-[#70b62b] transition-colors duration-300 ${isRTL ? 'text-right' : ''}`}
                  >
                    {category.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                    className={`text-white/70 text-sm mb-3 line-clamp-2 group-hover:text-white transition-colors ${isRTL ? 'text-right' : ''}`}
                  >
                    {category.description}
                  </motion.p>

                  {/* Footer */}
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-xs text-white/60 font-medium group-hover:text-white/80 transition-colors">
                      {category.count}
                    </span>
                    <motion.div
                      initial={{ x: isRTL ? 10 : -10, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1, rotate: isRTL ? -45 : 45 }}
                      className="w-8 h-8 rounded-full bg-[#70b62b] flex items-center justify-center"
                    >
                      <ArrowUpRight className={`h-4 w-4 text-white ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                    </motion.div>
                  </div>
                </div>

                {/* Shine effect */}
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "100%", opacity: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

