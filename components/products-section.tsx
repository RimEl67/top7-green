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
    id: 1,
    name: "Sidr Premium",
    nameAr: "سدر ممتاز",
    description: "Poudre de feuilles de Sidr pure pour cheveux et peau",
    descriptionAr: "مسحوق أوراق السدر النقي للشعر والبشرة",
    longDescription: "Le Sidr, aussi connu sous le nom de jujubier, est un trésor ancestral utilisé depuis des millénaires dans la médecine traditionnelle. Notre poudre de Sidr premium est récoltée à la main dans les montagnes de l'Atlas marocain.",
    price: 89,
    originalPrice: 120,
    image: "/images/products/sidr.jpg",
    images: ["/images/products/sidr.jpg"],
    rating: 4.9,
    reviews: 128,
    badge: "Best Seller",
    badgeAr: "الأكثر مبيعاً",
    badgeColor: "#70b62b",
    category: "Plantes",
    categoryAr: "نباتات",
    benefits: ["Renforce les cheveux", "Purifie le cuir chevelu", "Anti-pelliculaire naturel", "Ajoute brillance et volume"],
    usage: "Mélangez 2-3 cuillères à soupe avec de l'eau tiède pour former une pâte. Appliquez sur cheveux humides.",
    ingredients: ["100% Poudre de feuilles de Sidr"],
    weight: "200g"
  },
  {
    id: 2,
    name: "Romarin Séché",
    nameAr: "إكليل الجبل مجفف",
    description: "Romarin marocain de haute qualité pour infusions",
    descriptionAr: "إكليل الجبل مغربي عالي الجودة للابتلاع",
    longDescription: "Notre romarin est cultivé dans les terroirs les plus purs du Maroc. Séché naturellement au soleil.",
    price: 45,
    originalPrice: null,
    image: "/images/products/romarin.jpg",
    images: ["/images/products/romarin.jpg"],
    rating: 4.8,
    reviews: 96,
    badge: "Nouveau",
    badgeAr: "جديد",
    badgeColor: "#066532",
    category: "Plantes",
    categoryAr: "نباتات",
    benefits: ["Stimule la mémoire", "Favorise la digestion", "Antioxydant puissant", "Effet tonifiant"],
    usage: "Infusez 1 cuillère à café dans 250ml d'eau bouillante pendant 10 minutes.",
    ingredients: ["100% Romarin séché"],
    weight: "100g"
  },
  {
    id: 3,
    name: "Huile d'Argan Pure",
    nameAr: "زيت أرغان بكر",
    description: "Huile d'argan bio pressée à froid",
    descriptionAr: "زيت أرغان عضوي معصور على البارد",
    longDescription: "L'or liquide du Maroc. Notre huile d'argan est extraite artisanalement par des coopératives de femmes berbères.",
    price: 189,
    originalPrice: 220,
    image: "/images/products/argan-oil.jpg",
    images: ["/images/products/argan-oil.jpg"],
    rating: 5.0,
    reviews: 234,
    badge: "Premium",
    badgeAr: "ممتاز",
    badgeColor: "#254633",
    category: "Huiles",
    categoryAr: "زيوت",
    benefits: ["Hydrate intensément", "Anti-âge naturel", "Répare les cheveux", "Renforce les ongles"],
    usage: "Appliquez quelques gouttes sur peau propre matin et soir.",
    ingredients: ["100% Huile d'argan vierge"],
    weight: "100ml"
  },
  {
    id: 4,
    name: "Awlouz Traditionnel",
    nameAr: "أملو تقليدي",
    description: "Pâte d'amandes à l'argan artisanale",
    descriptionAr: "عجينة اللوز بزيت الأركان التقليدية",
    longDescription: "L'Amlou est une délicieuse pâte traditionnelle berbère à base d'amandes grillées.",
    price: 75,
    originalPrice: null,
    image: "/images/products/awlouz.jpg",
    images: ["/images/products/awlouz.jpg"],
    rating: 4.7,
    reviews: 87,
    badge: null,
    badgeAr: null,
    badgeColor: null,
    category: "Bien-être",
    categoryAr: "صحة",
    benefits: ["Riche en énergie", "Source d'oméga", "Délicieux au petit-déjeuner", "100% naturel"],
    usage: "À tartiner sur du pain ou à déguster à la cuillère.",
    ingredients: ["Amandes grillées", "Huile d'argan", "Miel naturel"],
    weight: "250g"
  },
  {
    id: 5,
    name: "Savon Noir Beldi",
    nameAr: "صابون بلدي مغربي",
    description: "Savon noir traditionnel à l'huile d'olive",
    descriptionAr: "صابون أسود تقليدي بزيت الزيتون",
    longDescription: "Le savon noir beldi est l'incontournable du rituel hammam marocain.",
    price: 55,
    originalPrice: 70,
    image: "/images/products/savon-noir.jpg",
    images: ["/images/products/savon-noir.jpg"],
    rating: 4.9,
    reviews: 156,
    badge: "-20%",
    badgeAr: "-20%",
    badgeColor: "#70b62b",
    category: "Cosmétiques",
    categoryAr: "تجميل",
    benefits: ["Exfoliant naturel", "Nettoie en profondeur", "Prépare au gommage", "Peau douce et lisse"],
    usage: "Appliquez généreusement sur peau humide, laissez poser 5-10 minutes.",
    ingredients: ["Huile d'olive", "Olives noires macérées"],
    weight: "200g"
  },
  {
    id: 6,
    name: "Ghassoul Atlas",
    nameAr: "غاسول الأطلس",
    description: "Argile minérale pure des montagnes de l'Atlas",
    descriptionAr: "طين معدني نقي من جبال الأطلس",
    longDescription: "Le Ghassoul est une argile volcanique unique extraite des montagnes de l'Atlas.",
    price: 65,
    originalPrice: null,
    image: "/images/products/ghassoul.jpg",
    images: ["/images/products/ghassoul.jpg"],
    rating: 4.8,
    reviews: 112,
    badge: "Populaire",
    badgeAr: "شائع",
    badgeColor: "#066532",
    category: "Cosmétiques",
    categoryAr: "تجميل",
    benefits: ["Purifie naturellement", "Absorbe l'excès de sébum", "Adoucit les cheveux", "Convient peaux sensibles"],
    usage: "Mélangez avec de l'eau tiède ou de l'eau de rose pour former une pâte.",
    ingredients: ["100% Ghassoul pur"],
    weight: "250g"
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
    { label: language === 'ar' ? "نباتات" : "Plantes", value: "Plantes" },
    { label: language === 'ar' ? "تجميل" : "Cosmétiques", value: "Cosmétiques" },
    { label: language === 'ar' ? "زيوت" : "Huiles", value: "Huiles" },
    { label: language === 'ar' ? "صحة" : "Bien-être", value: "Bien-être" },
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
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
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

                  {/* Name */}
                  <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h3 className="text-lg font-bold text-[#254633] group-hover:text-[#066532] transition-colors">
                      {language === 'ar' ? product.nameAr : product.name}
                    </h3>
                    <span className="text-sm text-[#70b62b] font-medium font-sans">
                      {language === 'ar' ? product.name : product.nameAr}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#254633]/60 mb-4 line-clamp-2">
                    {language === 'ar' ? product.descriptionAr : product.description}
                  </p>

                  {/* Price */}
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <motion.span
                      className="text-2xl font-bold text-[#066532]"
                      whileHover={{ scale: 1.05 }}
                    >
                      {product.price} {language === 'ar' ? 'درهم' : 'DH'}
                    </motion.span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#254633]/40 line-through">
                        {product.originalPrice} {language === 'ar' ? 'درهم' : 'DH'}
                      </span>
                    )}
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
