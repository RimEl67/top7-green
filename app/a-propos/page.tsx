"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Leaf, Award, Users, Globe, CheckCircle2, ArrowRight } from "lucide-react"
import PageLayout from "@/components/page-layout"
import { useLanguageStore } from "@/lib/language-store"
import Link from "next/link"

const features = [
  { icon: Leaf, titleFr: "100% Naturel", titleAr: "100% طبيعي", descFr: "Produits purs sans additifs chimiques", descAr: "منتجات نقية بدون إضافات كيميائية", color: "#70b62b" },
  { icon: Award, titleFr: "Qualité Premium", titleAr: "جودة ممتازة", descFr: "Sélection rigoureuse des meilleures herbes", descAr: "اختيار دقيق لأجود الأعشاب", color: "#066532" },
  { icon: Users, titleFr: "Expertise Locale", titleAr: "خبرة محلية", descFr: "Partenariat avec des agriculteurs marocains", descAr: "شراكة مع المزارعين المغاربة", color: "#70b62b" },
  { icon: Globe, titleFr: "Éco-Responsable", titleAr: "مسؤولية بيئية", descFr: "Pratiques durables et respectueuses", descAr: "ممارسات مستدامة وصديقة للبيئة", color: "#066532" },
]

const valuesFr = ["Récolte traditionnelle à la main", "Séchage naturel au soleil", "Emballage écologique", "Traçabilité complète", "Commerce équitable", "Certification bio"]
const valuesAr = ["الحصاد اليدوي التقليدي", "تجفيف طبيعي بالشمس", "تغليف صديق للبيئة", "تتبع كامل للمنتجات", "تجارة عادلة", "شهادة عضوية"]

const statsFr = [
  { value: "15+", label: "Années d'expérience" },
  { value: "200+", label: "Produits naturels" },
  { value: "5000+", label: "Clients satisfaits" },
  { value: "100%", label: "Naturel & Bio" },
]
const statsAr = [
  { value: "15+", label: "سنوات من الخبرة" },
  { value: "200+", label: "منتج طبيعي" },
  { value: "5000+", label: "عميل راضٍ" },
  { value: "100%", label: "طبيعي وعضوي" },
]

export default function AProposPage() {
  const { language, isRTL } = useLanguageStore()
  const storyRef = useRef(null)
  const valuesRef = useRef(null)
  const statsRef = useRef(null)
  const isStoryInView = useInView(storyRef, { once: true })
  const isValuesInView = useInView(valuesRef, { once: true })
  const isStatsInView = useInView(statsRef, { once: true })

  const isAr = language === 'ar'
  const values = isAr ? valuesAr : valuesFr
  const stats = isAr ? statsAr : statsFr

  return (
    <PageLayout
      title={isAr ? "من نحن | Top7green" : "À Propos | de Nous"}
      subtitle={isAr ? "منذ أكثر من 15 عامًا، نشارك كنوز المغرب النباتية مع العالم." : "Depuis plus de 15 ans, nous partageons les trésors botaniques du Maroc avec le monde."}
      breadcrumb={isAr ? "قصتنا" : "Notre Histoire"}
      videoSrc="/videos/hero-bg.mp4"
    >
      {/* Stats Banner */}
      <section className="bg-[#70b62b] py-10 text-white" ref={statsRef}>
        <div className="container mx-auto px-4 md:px-6">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 text-center ${isRTL ? 'font-arabic' : ''}`}>
            {stats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={isStatsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <div className="text-4xl font-bold mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28 bg-white" ref={storyRef}>
        <div className="container mx-auto px-4 md:px-6">
          <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: isRTL ? 60 : -60 }} animate={isStoryInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, type: "spring", stiffness: 50 }} className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/images/about-story.jpg" alt={isAr ? "قصتنا - Top7green" : "Notre histoire - Top7green"} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#254633]/40 to-transparent" />
              </div>
              <motion.div initial={{ opacity: 0, y: 40 }} animate={isStoryInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.5 }}
                className={`absolute -bottom-6 ${isRTL ? '-left-6 md:left-8' : '-right-6 md:right-8'} bg-white rounded-2xl p-5 shadow-xl border border-[#254633]/5`}>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-full bg-[#70b62b]/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-[#70b62b]">15+</span>
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <div className="text-xs text-[#254633]/60">{isAr ? 'سنة' : 'Années'}</div>
                    <div className="font-bold text-[#254633] text-sm">{isAr ? 'من الخبرة' : "d'Expertise"}</div>
                  </div>
                </div>
              </motion.div>
              <div className={`absolute -top-5 ${isRTL ? '-right-5' : '-left-5'} w-20 h-20 border-2 border-[#70b62b]/30 rounded-2xl`} />
            </motion.div>

            {/* Content */}
            <motion.div initial={{ opacity: 0, x: isRTL ? -60 : 60 }} animate={isStoryInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, type: "spring", stiffness: 50 }}
              className={isRTL ? 'text-right font-arabic' : ''}>
              <span className="inline-block text-sm font-medium text-[#70b62b] tracking-wider uppercase mb-3">
                {isAr ? 'قصتنا' : 'Notre Histoire'}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#254633] mb-6 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                {isAr ? 'الطبيعة في قلب' : 'La Nature au Cœur de'}{" "}
                <span className="text-[#70b62b]">{isAr ? 'مهمتنا' : 'Notre Mission'}</span>
              </h2>
              <p className="text-lg text-[#254633]/70 mb-6 leading-relaxed">
                {isAr
                  ? "منذ أكثر من 15 عامًا، تحافظ Top7green على التراث المغربي للنباتات الطبية والعطرية. التزامنا: تقديم منتجات أصيلة 100% طبيعية، يتم جمعها بعناية من أنقى مناطق المغرب."
                  : "Depuis plus de 15 ans, Top7green perpétue la tradition marocaine des plantes médicinales et aromatiques. Notre engagement : vous offrir des produits authentiques, récoltés avec soin dans les régions les plus pures du Maroc."}
              </p>
              <p className="text-[#254633]/60 mb-8 leading-relaxed">
                {isAr
                  ? "تتعاون شركتنا مباشرةً مع التعاونيات النسائية والمزارعين المحليين لضمان التتبع الكامل والتجارة العادلة، مع الحفاظ على المعارف الموروثة."
                  : "Basée à Agadir, notre maison collabore directement avec des coopératives féminines et des agriculteurs locaux pour garantir une traçabilité complète et un commerce équitable."}
              </p>
              <div className={`grid grid-cols-2 gap-3 ${isRTL ? 'text-right' : ''}`}>
                {values.map((value, index) => (
                  <motion.div key={value} initial={{ opacity: 0, x: isRTL ? 20 : -20 }} animate={isStoryInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                    className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle2 className="h-4 w-4 text-[#70b62b] flex-shrink-0" />
                    <span className="text-sm text-[#254633]">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#f8f0da]/30" ref={valuesRef}>
        <div className="container mx-auto px-4 md:px-6">
          <div className={`text-center mb-14 ${isRTL ? 'font-arabic' : ''}`}>
            <span className="text-sm font-medium text-[#70b62b] tracking-widest uppercase">
              {isAr ? 'التزاماتنا' : 'Nos Engagements'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#254633] mt-3" style={{ fontFamily: 'var(--font-playfair)' }}>
              {isAr ? 'لماذا تختارنا؟' : 'Pourquoi Nous Choisir ?'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div key={feature.titleFr} initial={{ opacity: 0, y: 40 }} animate={isValuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -6 }} className={`bg-white rounded-3xl p-7 shadow-md hover:shadow-xl transition-all duration-300 text-center ${isRTL ? 'font-arabic' : ''}`}>
                <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: `${feature.color}15` }}>
                  <feature.icon className="h-8 w-8" style={{ color: feature.color }} />
                </div>
                <h3 className="font-bold text-[#254633] mb-2">{isAr ? feature.titleAr : feature.titleFr}</h3>
                <p className="text-sm text-[#254633]/60">{isAr ? feature.descAr : feature.descFr}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 bg-[#254633] text-white text-center ${isRTL ? 'font-arabic' : ''}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            {isAr ? 'مستعد لاكتشاف منتجاتنا؟' : "Prêt à Découvrir Nos Produits ?"}
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            {isAr ? 'استكشف مجموعتنا من النباتات الطبية ومستحضرات التجميل الطبيعية المصنوعة بشغف.' : "Explorez notre gamme de plantes médicinales et cosmétiques naturels fabriqués avec passion."}
          </p>
          <Link href="/produits" className="inline-flex items-center gap-2 px-8 py-4 bg-[#70b62b] hover:bg-[#066532] text-white rounded-full font-semibold transition-colors shadow-lg">
            {isAr ? 'شاهد منتجاتنا' : 'Voir nos produits'}
            <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
