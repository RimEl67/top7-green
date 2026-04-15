"use client"

import Link from "next/link"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { ShoppingBag, Heart, Star, Eye, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore, type Product } from "@/lib/cart-store"
import { useLanguageStore, translations } from "@/lib/language-store"

const products: Product[] = [


  {
    id: 24,
    name: "Serum de Rose",
    nameAr: "سيروم الورد",
    description: "Serum de Rose",
    descriptionAr: "سيروم الورد",
    longDescription: "Serum de Rose",
    price: 75,
    originalPrice: 90,
    image: "/images/SHOOTING Produits _/IMG_7301.JPG",
    rating: 4.7,
    reviews: 24,
    badge: null,
    badgeColor: null,
    category: "Cosmétiques Naturels",
    categoryAr: "تجميل طبيعي",
  },
  {
    id: 25,
    name: "Huile D'oliban",
    nameAr: "زيت اللبان",
    description: "Huile D'oliban",
    descriptionAr: "زيت اللبان",
    longDescription: "Huile D'oliban",
    price: 210,
    originalPrice: 250,
    image: "/images/SHOOTING Produits _/IMG_7302.JPG",
    rating: 4.9,
    reviews: 15,
    badge: "Cadeau",
    badgeColor: "#066532",
    category: "Huiles Naturelles",
    categoryAr: "زيوت طبيعية",
  },
  {
    id: 26,
    name: "Huile de Sider",
    nameAr: "زيت السدر",
    description: "Huile de Sider",
    descriptionAr: "زيت السدر",
    longDescription: "Huile de Sider",
    price: 65,
    originalPrice: null,
    image: "/images/SHOOTING Produits _/IMG_7303.JPG",
    rating: 4.8,
    reviews: 37,
    badge: null,
    badgeColor: null,
    category: "Huiles Naturelles",
    categoryAr: "زيوت طبيعية",
  },
  {
    id: 27,
    name: "Vinaigre de cidre de pomme",
    nameAr: "خل التفاح",
    description: "Vinaigre de cidre de pomme",
    descriptionAr: "خل التفاح",
    longDescription: "Vinaigre de cidre de pomme",
    price: 45,
    originalPrice: null,
    image: "/images/SHOOTING Produits _/IMG_7304.JPG",
    rating: 4.7,
    reviews: 82,
    badge: "Love",
    badgeColor: "#70b62b",
    category: "Produits Alimentaires",
    categoryAr: "منتجات غذائية",
  },

  {
    id: 29,
    name: "Huile d'argan torrifiee",
    nameAr: "زيت أركان محمص",
    description: "Huile d'argan torrifiee",
    descriptionAr: "زيت أركان محمص",
    longDescription: "Huile d'argan torrifiee",
    price: 95,
    originalPrice: 120,
    image: "/images/SHOOTING Produits _/IMG_7306.JPG",
    rating: 4.9,
    reviews: 26,
    badge: "Healthy",
    badgeColor: "#70b62b",
    category: "Huiles Naturelles",
    categoryAr: "زيوت طبيعية",
  },
  {
    id: 23,
    name: "Miel des Herbes",
    nameAr: "عسل الأعشاب",
    description: "Miel des Herbes",
    descriptionAr: "عسل الأعشاب",
    longDescription: "Miel des Herbes",
    price: 35,
    originalPrice: null,
    image: "/images/SHOOTING Produits _/IMG_7300.JPG",
    rating: 4.8,
    reviews: 62,
    badge: "Craft",
    badgeColor: "#70b62b",
    category: "Produits Alimentaires",
    categoryAr: "منتجات غذائية",
  },
]

export default function ProductsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { language, isRTL } = useLanguageStore()
  const t = translations[language].products

  const [activeFilter, setActiveFilter] = useState("Tous")
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const { addItem, openCart, openProductModal } = useCartStore()

  const filters = [
    { label: t.all, value: "Tous" },
    { label: language === 'ar' ? "السدر" : "Sidr", value: "Sidr" },
    { label: language === 'ar' ? "زيوت طبيعية" : "Huiles Naturelles", value: "Huiles Naturelles" },
    { label: language === 'ar' ? "تجميل طبيعي" : "Cosmétiques Naturels", value: "Cosmétiques Naturels" },
    { label: language === 'ar' ? "منتجات تقليدية" : "Produits Traditionnels", value: "Produits Traditionnels" },
  ]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5])

  const filteredProducts = activeFilter === "Tous"
    ? products
    : products.filter(p => p.category === activeFilter)

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product)
    openCart()
  }

  const handleProductClick = (product: Product) => {
    openProductModal(product)
  }

  return (
    <section
      id="produits"
      ref={sectionRef}
      className={`py-24 md:py-32 bg-[#f8f0da]/30 relative overflow-hidden ${isRTL ? 'font-arabic' : ''}`}
      style={{ position: "relative" }}
    >
      {/* Animated background elements */}
      <motion.div
        style={{ y: backgroundY, opacity }}
        className="absolute top-40 left-0 w-96 h-96 bg-[#70b62b]/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: backgroundY, opacity }}
        className="absolute bottom-0 right-0 w-80 h-80 bg-[#066532]/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : ''}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block text-sm font-medium text-[#70b62b] tracking-wider uppercase mb-4"
            >
              {language === 'ar' ? 'مجموعة حصرية' : 'Collection Exclusive'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-[#254633] text-balance"
            >
              {language === 'ar' ? (
                <>
                  منتجاتنا <span className="text-gradient">المميزة</span>
                </>
              ) : (
                <>
                  Nos Produits <span className="text-gradient">Phares</span>
                </>
              )}
            </motion.h2>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {filters.map((filter) => (
              <motion.button
                key={filter.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter.value
                  ? "bg-[#066532] text-white shadow-lg shadow-[#066532]/25"
                  : "bg-white text-[#254633] hover:bg-[#70b62b]/10 border border-[#254633]/10"
                  }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Products grid */}
        <motion.div
          layout
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-8 ${isRTL ? 'direction-rtl' : ''}`}
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -10 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => handleProductClick(product)}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#254633]/5 cursor-pointer relative"
              >
                {/* Product image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={language === 'ar' ? product.nameAr || product.name : product.name}
                    fill
                    priority={index < 3}
                    className="object-cover transition-transform duration-700 scale-110 group-hover:scale-125"
                  />

                  {/* Overlay gradient on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-[#254633]/60 via-transparent to-transparent"
                  />

                  {/* Badge */}
                  {(language === 'ar' ? product.badgeAr : product.badge) && (
                    <motion.div
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg`}
                      style={{ backgroundColor: product.badgeColor || "#70b62b" }}
                    >
                      {language === 'ar' ? product.badgeAr : product.badge}
                    </motion.div>
                  )}

                  {/* Quick actions */}
                  <motion.div
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{
                      opacity: hoveredProduct === product.id ? 1 : 0,
                      x: hoveredProduct === product.id ? 0 : (isRTL ? -20 : 20)
                    }}
                    className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} flex flex-col gap-2`}
                  >
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#254633] hover:text-red-500 transition-colors"
                    >
                      <Heart className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: -10 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#254633] hover:text-[#70b62b] transition-colors"
                    >
                      <Eye className="h-5 w-5" />
                    </motion.button>
                  </motion.div>

                  {/* Add to cart overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredProduct === product.id ? 1 : 0,
                      y: hoveredProduct === product.id ? 0 : 20
                    }}
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <Button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-full bg-[#066532] hover:bg-[#254633] text-white rounded-xl py-3 shadow-lg group/btn"
                    >
                      <ShoppingBag className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'} group-hover/btn:scale-110 transition-transform`} />
                      {t.addToCart}
                    </Button>
                  </motion.div>
                </div>

                {/* Product info */}
                <div className={`p-6 ${isRTL ? 'text-right' : ''}`}>
                  {/* Rating */}
                  <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating)
                            ? "fill-[#70b62b] text-[#70b62b]"
                            : "fill-gray-200 text-gray-200"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-[#254633]">
                      {product.rating}
                    </span>
                    <span className="text-sm text-[#254633]/50">
                      ({product.reviews} {language === 'ar' ? 'تقييم' : 'avis'})
                    </span>
                  </div>

                  <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h3 className="text-lg font-bold text-[#254633] group-hover:text-[#066532] transition-colors">
                      {language === 'ar' ? product.nameAr : product.name}
                    </h3>
                  </div>


                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/produits">
            <Button
              variant="outline"
              size="lg"
              className="group border-2 border-[#066532] text-[#066532] hover:bg-[#066532] hover:text-white px-8 py-6 rounded-full"
            >
              {t.viewAll}
              <ArrowRight className={`ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
