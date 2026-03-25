"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useLanguageStore, translations } from "@/lib/language-store"

const testimonialsBase = [
  {
    id: 1,
    name: "Fatima Zahra",
    role: "Happy Customer",
    avatar: "/images/testimonials/avatar-1.png",
    rating: 5.0,
    title: "Le Meilleur Produit pour ma Peau !",
    text: "Les produits Top7green ont transformé ma routine beauté. L'huile d'argan est exceptionnelle, ma peau n'a jamais été aussi douce. Je recommande vivement !",
  },
  {
    id: 2,
    name: "Mohammed Amine",
    role: "Verified Buyer",
    avatar: "/images/testimonials/avatar-2.png",
    rating: 5.0,
    title: "Résultats Incroyables !",
    text: "Qualité exceptionnelle du sidr ! Je l'utilise pour mes cheveux depuis 6 mois et les résultats sont incroyables. Livraison rapide et service client au top.",
  },
  {
    id: 3,
    name: "Sarah Benjelloun",
    role: "Loyal Customer",
    avatar: "/images/testimonials/avatar-3.png",
    rating: 5.0,
    title: "100% Naturel et Authentique",
    text: "Enfin des produits naturels authentiques ! Le savon noir beldi est exactement comme celui que ma grand-mère utilisait. Merci Top7green pour ce retour aux sources.",
  },
  {
    id: 4,
    name: "Youssef El Idrissi",
    role: "Happy Customer",
    avatar: "/images/testimonials/avatar-4.png",
    rating: 5.0,
    title: "Qualité Remarquable",
    text: "Le romarin est d'une fraîcheur incomparable. Je fais des infusions quotidiennes et je me sens en pleine forme. Produits de qualité supérieure.",
  },
  {
    id: 5,
    name: "Khadija B.",
    role: "Happy Customer",
    avatar: "/images/testimonials/avatar-5.png",
    rating: 5.0,
    title: "Mon rituel favori !",
    text: "L'authenticité se ressent dès la première utilisation. L'odeur et la texture sont au rendez-vous. Mes amis n'arrêtent pas de me demander mon secret.",
  }
]

const testimonialsAr = [
  { id: 1, name: "فاطمة الزهراء", role: "عميلة سعيدة", avatar: "/images/testimonials/avatar-1.png", rating: 5.0, title: "أفضل منتج لبشرتي!", text: "منتجات Top7green غيّرت روتيني الجمالي. زيت الأركان استثنائي، بشرتي لم تكن كذلك من قبل. أنصح به بشدة!" },
  { id: 2, name: "محمد أمين", role: "مشتري موثق", avatar: "/images/testimonials/avatar-2.png", rating: 5.0, title: "نتائج رائعة!", text: "جودة السدر استثنائية! أستخدمه لشعري منذ 6 أشهر والنتائج مذهلة. توصيل سريع وخدمة عملاء ممتازة." },
  { id: 3, name: "سارة بنجلون", role: "عميلة وفية", avatar: "/images/testimonials/avatar-3.png", rating: 5.0, title: "100% طبيعي وأصيل", text: "أخيراً منتجات طبيعية أصيلة! الصابون البلدي الأسود مثل الذي كانت جدتي تستخدمه. شكراً Top7green!" },
  { id: 4, name: "يوسف الإدريسي", role: "عميل سعيد", avatar: "/images/testimonials/avatar-4.png", rating: 5.0, title: "جودة رائعة", text: "الزعتر طازج لا مثيل له. أعد نقيعة يومية وأشعر بصحة ممتازة. منتجات ذات جودة عالية." },
  { id: 5, name: "خديجة ب.", role: "عميلة سعيدة", avatar: "/images/testimonials/avatar-5.png", rating: 5.0, title: "طقسي المفضل!", text: "الأصالة تشعر بها من أول استخدام. الرائحة والقوام رائعان. أصدقائي يسألونني عن سري." }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(2)
  const [direction, setDirection] = useState(0)
  const { language, isRTL } = useLanguageStore()
  const t = translations[language].testimonials
  const testimonials = language === 'ar' ? testimonialsAr : testimonialsBase

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const getVisibleAvatars = () => {
    const avatars = []
    for (let i = -2; i <= 2; i++) {
      const idx = (currentIndex + i + testimonials.length) % testimonials.length
      avatars.push({ ...testimonials[idx], offset: i })
    }
    return avatars
  }

  return (
    <section className="py-24 md:py-32 bg-[#fcfbfa] relative overflow-hidden" style={{ position: "relative" }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-16 ${isRTL ? 'font-arabic' : ''}`}>
          <span className="inline-block text-sm font-medium text-[#70b62b] tracking-wider uppercase mb-4">
            {language === 'ar' ? 'آراء عملائنا' : 'Témoignages'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#254633] font-serif leading-tight">
            {t.title.split(' ').slice(0,3).join(' ')} <br />
            <span className="text-[#70b62b]">{t.title.split(' ').slice(3).join(' ')}</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {/* Avatar Selector */}
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-12 h-24">
            {getVisibleAvatars().map((t) => {
              const isCenter = t.offset === 0
              return (
                <div 
                   key={`${t.id}-${t.offset}`}
                   onClick={() => {
                     if (t.offset !== 0) {
                        setDirection(t.offset > 0 ? 1 : -1)
                        setCurrentIndex(t.id - 1)
                     }
                   }}
                   className={`relative rounded-full overflow-hidden transition-all duration-500 cursor-pointer ${
                     isCenter 
                       ? "w-20 h-20 md:w-24 md:h-24 ring-[6px] ring-offset-4 ring-[#70b62b]/20" 
                       : "w-12 h-12 md:w-16 md:h-16 opacity-50 hover:opacity-100"
                   }`}
                >
                  {t.avatar ? (
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center text-white font-bold text-xl md:text-2xl transition-all duration-500 ${isCenter ? 'bg-[#70b62b]' : 'bg-[#e2dfdb] text-gray-500'}`}>
                      {t.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="w-full relative flex items-center justify-between gap-4 md:gap-12">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#70b62b] text-white flex items-center justify-center hover:bg-[#066532] transition-colors shadow-lg z-10 shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex-1 overflow-hidden text-center min-h-[250px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                   key={currentIndex}
                   custom={direction}
                   initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: direction < 0 ? 30 : -30 }}
                   transition={{ duration: 0.3 }}
                   className="flex flex-col items-center"
                >
                  <h4 className="text-xl md:text-2xl font-bold text-[#254633] mb-4 font-serif">
                    {testimonials[currentIndex].title}
                  </h4>
                  <p className="text-gray-500 leading-relaxed md:text-lg mb-6 italic max-w-2xl px-4">
                    "{testimonials[currentIndex].text}"
                  </p>
                  
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 font-bold text-[#254633]">
                      {testimonials[currentIndex].rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="font-bold text-lg text-[#254633] capitalize">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {testimonials[currentIndex].role}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button 
              onClick={handleNext}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#70b62b] text-white flex items-center justify-center hover:bg-[#066532] transition-colors shadow-lg z-10 shrink-0"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
