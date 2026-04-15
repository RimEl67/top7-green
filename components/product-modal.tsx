"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"
import { X, ShoppingBag, Heart, Star, Minus, Plus, Truck, Shield, Leaf, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore, type Product } from "@/lib/cart-store"
import { useLanguageStore, translations } from "@/lib/language-store"

const allProducts: Product[] = [
  {
    id: 1,
    name: "Sidr Premium",
    nameAr: "سدر ممتاز",
    description: "Poudre de feuilles de Sidr pure",
    descriptionAr: "بودرة أوراق السدر النقية للشعر والبشرة",
    longDescription: "Le Sidr est un trésor ancestral utilisé dans la médecine traditionnelle.",
    longDescriptionAr: "السدر هو كنز عريق يستخدم في الطب التقليدي.",
    price: 89,
    originalPrice: 120,
    image: "/images/SHOOTING Produits _/IMG_7278.JPG",
    images: ["/images/SHOOTING Produits _/IMG_7278.JPG"],
    rating: 4.9,
    reviews: 128,
    badge: "Best Seller",
    badgeAr: "الأكثر مبيعاً",
    badgeColor: "#70b62b",
    category: "Plantes",
    categoryAr: "نباتات",
    benefits: ["Renforce les cheveux", "Purifie le cuir chevelu"],
    benefitsAr: ["يقوي الشعر", "يطهر فروة الرأس"],
    usage: "Mélangez avec de l'eau tiède.",
    usageAr: "اخلطي مع الماء الدافئ.",
    ingredients: ["100% Sidr"],
    weight: "200g"
  },
  {
    id: 3,
    name: "Huile d'Argan Pure",
    nameAr: "زيت أركان صافي",
    description: "Huile d'argan bio pressée à froid",
    descriptionAr: "زيت أركان عضوي معصور على البارد",
    longDescription: "L'or liquide du Maroc.",
    longDescriptionAr: "ذهب المغرب السائل.",
    price: 189,
    originalPrice: 220,
    image: "/images/SHOOTING Produits _/IMG_7282.JPG",
    images: ["/images/SHOOTING Produits _/IMG_7282.JPG"],
    rating: 5.0,
    reviews: 234,
    badge: "Premium",
    badgeAr: "ممتاز",
    badgeColor: "#254633",
    category: "Huiles",
    categoryAr: "زيوت",
    benefits: ["Hydrate intensément", "Anti-âge"],
    benefitsAr: ["يرطب بكثافة", "مضاد للشيخوخة"],
    usage: "Appliquez quelques gouttes.",
    usageAr: "ضعي بضع قطرات.",
    ingredients: ["100% Argan"],
    weight: "100ml"
  },
  {
    id: 5,
    name: "Savon Noir Beldi",
    nameAr: "صابون بلدي",
    description: "Savon noir traditionnel",
    descriptionAr: "صابون أسود تقليدي بزيت الزيتون",
    longDescription: "Le savon noir beldi est l'incontournable du hammam.",
    longDescriptionAr: "الصابون البلدي جزء لا يتجزأ من طقوس الحمام.",
    price: 55,
    originalPrice: 70,
    image: "/images/SHOOTING Produits _/IMG_7285.JPG",
    images: ["/images/SHOOTING Produits _/IMG_7285.JPG"],
    rating: 4.9,
    reviews: 156,
    badge: "-20%",
    badgeAr: "-20%",
    badgeColor: "#70b62b",
    category: "Cosmétiques",
    categoryAr: "تجميل",
    benefits: ["Exfoliant naturel"],
    benefitsAr: ["مقشر طبيعي"],
    usage: "Appliquez sur peau humide.",
    usageAr: "ضعي كمية وفيرة على بشرة مبللة.",
    ingredients: ["Huile d'olive"],
    weight: "200g"
  },
  {
    id: 6,
    name: "Ghassoul Atlas",
    nameAr: "غاسول الأطلس",
    description: "Argile minérale pure des montagnes de l'Atlas",
    descriptionAr: "طين معدني نقي من جبال الأطلس",
    longDescription: "Le Ghassoul est une argile volcanique unique extraite des montagnes de l'Atlas. Utilisée depuis des siècles par les femmes marocaines, elle nettoie et purifie naturellement cheveux et peau.",
    longDescriptionAr: "الغاسول هو طين بركاني فريد يستخرج من جبال الأطلس. تستخدمه النساء المغربيات منذ قرون، وهو ينظف ويطهر الشعر والبشرة طبيعياً.",
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
    benefitsAr: ["يطهر طبيعياً", "يمتص الدهون الزائدة", "ينعم الشعر", "مناسب للبشرة الحساسة"],
    usage: "Mélangez avec de l'eau tiède ou de l'eau de rose pour former une pâte. Appliquez sur cheveux ou visage, laissez sécher puis rincez.",
    usageAr: "اخلطي مع الماء الدافئ أو ماء الورد لتشكيل عجينة. ضعيها على الشعر أو الوجه، اتركيها لتجف ثم اشطفيها.",
    ingredients: ["100% Ghassoul pur (Argile saponifère)"],
    weight: "250g"
  },
  {
    id: 19,
    name: "Sérum Éclat",
    nameAr: "سيروم النضارة",
    description: "Coup d'éclat immédiat",
    descriptionAr: "نضارة فورية",
    longDescription: "Un sérum riche en vitamines.",
    longDescriptionAr: "سيروم غني بالفيتامينات.",
    price: 190,
    originalPrice: 240,
    image: "/images/SHOOTING Produits _/IMG_7296.JPG",
    images: ["/images/SHOOTING Produits _/IMG_7296.JPG"],
    rating: 5.0,
    reviews: 28,
    badge: "Nouveau",
    badgeAr: "جديد",
    badgeColor: "#066532",
    category: "Cosmétiques",
    categoryAr: "تجميل",
    weight: "30ml"
  },
  {
    id: 22,
    name: "Huile de Figue de Barbarie",
    nameAr: "زيت التين الشوكي",
    description: "Élixir précieux",
    descriptionAr: "إكسير ثمين",
    longDescription: "La plus rare des huiles botaniques.",
    longDescriptionAr: "أندر الزيوت النباتية وأكثرها غنى.",
    price: 350,
    originalPrice: 420,
    image: "/images/SHOOTING Produits _/IMG_7299.JPG",
    images: ["/images/SHOOTING Produits _/IMG_7299.JPG"],
    rating: 5.0,
    reviews: 19,
    badge: "Luxe",
    badgeAr: "فاخر",
    badgeColor: "#eab308",
    category: "Huiles",
    categoryAr: "زيوت",
    weight: "15ml"
  },
]

export function getProductById(id: number): Product | undefined {
  return allProducts.find(p => p.id === id)
}

export function getAllProducts(): Product[] {
  return allProducts
}

export default function ProductModal() {
  const [mounted, setMounted] = useState(false)
  const store = useCartStore()
  const { language, isRTL } = useLanguageStore()
  const t = translations[language].product

  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const { selectedProduct, isProductModalOpen, closeProductModal, addItem, openCart } = store

  if (!selectedProduct) return null

  const handleAddToCart = () => {
    setIsAdding(true)
    for (let i = 0; i < quantity; i++) {
      addItem(selectedProduct)
    }
    setTimeout(() => {
      setIsAdding(false)
      closeProductModal()
      openCart()
    }, 600)
  }

  const isAr = language === 'ar'
  const productName = isAr ? selectedProduct.nameAr : selectedProduct.name
  const productDesc = isAr ? (selectedProduct.longDescriptionAr || selectedProduct.descriptionAr || selectedProduct.description) : (selectedProduct.longDescription || selectedProduct.description)
  const productBadge = isAr ? (selectedProduct.badgeAr || selectedProduct.badge) : selectedProduct.badge
  const productBenefits = isAr ? (selectedProduct.benefitsAr || selectedProduct.benefits) : selectedProduct.benefits
  const productUsage = isAr ? (selectedProduct.usageAr || selectedProduct.usage) : selectedProduct.usage

  return (
    <AnimatePresence>
      {isProductModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeProductModal}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden ${isRTL ? 'font-arabic text-right' : ''}`}
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeProductModal}
              className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-[#254633] hover:text-[#70b62b] transition-colors`}
            >
              <X className="h-5 w-5" />
            </motion.button>

            <div className={`grid md:grid-cols-2 ${isRTL ? 'direction-rtl' : ''}`}>
              {/* Image Section */}
              <div className={`relative bg-[#f8f0da]/30 p-8 ${isRTL ? 'md:order-2' : ''}`}>
                {/* Badge */}
                {productBadge && (
                  <motion.div
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`absolute top-6 ${isRTL ? 'right-6' : 'left-6'} z-10 px-4 py-2 rounded-full text-sm font-bold text-white`}
                    style={{ backgroundColor: selectedProduct.badgeColor || "#70b62b" }}
                  >
                    {productBadge}
                  </motion.div>
                )}

                {/* Main Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-xl"
                >
                  <Image
                    src={selectedProduct.images?.[activeImage] || selectedProduct.image}
                    alt={productName}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Thumbnails */}
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="flex gap-3 mt-4 justify-center">
                    {selectedProduct.images.map((img, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveImage(idx)}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx
                          ? "border-[#70b62b] shadow-lg"
                          : "border-transparent"
                          }`}
                      >
                        <Image src={img} alt="" fill className="object-cover" />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className={`p-8 md:p-10 overflow-y-auto max-h-[90vh] md:max-h-none ${isRTL ? 'md:order-1' : ''}`}>
                {/* Rating */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(selectedProduct.rating)
                          ? "fill-[#70b62b] text-[#70b62b]"
                          : "fill-gray-200 text-gray-200"
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-[#254633]">
                    {selectedProduct.rating}
                  </span>
                  <span className="text-sm text-[#254633]/50">
                    ({selectedProduct.reviews} {language === 'ar' ? 'مراجعة' : 'avis'})
                  </span>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mb-4"
                >
                  <h2 className="text-3xl font-bold text-[#254633] mb-1">
                    {productName}
                  </h2>
                  <span className="text-lg text-[#70b62b] font-sans font-medium">
                    {isAr ? selectedProduct.name : selectedProduct.nameAr}
                  </span>
                </motion.div>

                {/* Weight */}
                {selectedProduct.weight && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6"
                  >
                    <span className="px-3 py-1 bg-[#f8f0da] rounded-full text-sm text-[#254633] font-sans">
                      {selectedProduct.weight}
                    </span>
                  </motion.div>
                )}

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="text-[#254633]/70 leading-relaxed mb-6"
                >
                  {productDesc}
                </motion.p>

                {/* Benefits */}
                {productBenefits && productBenefits.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6"
                  >
                    <h4 className="font-bold text-[#254633] mb-3">{t.benefits}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {productBenefits.map((benefit, idx) => (
                        <motion.div
                          key={benefit}
                          initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.55 + idx * 0.05 }}
                          className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                        >
                          <CheckCircle2 className="h-4 w-4 text-[#70b62b] flex-shrink-0" />
                          <span className="text-sm text-[#254633]">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Usage */}
                {productUsage && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mb-6 p-4 bg-[#f8f0da]/50 rounded-xl"
                  >
                    <h4 className="font-bold text-[#254633] mb-2">{t.usage}</h4>
                    <p className="text-sm text-[#254633]/70">{productUsage}</p>
                  </motion.div>
                )}

                {/* Quantity selector */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <span className="text-sm font-medium text-[#254633]">{language === 'ar' ? 'الكمية' : 'Quantité'}</span>
                  <div className={`flex items-center gap-3 bg-[#f8f0da]/50 rounded-full p-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-[#254633] hover:text-[#70b62b]"
                    >
                      <Minus className="h-4 w-4" />
                    </motion.button>
                    <span className="w-12 text-center font-bold text-[#254633] text-lg font-sans">
                      {quantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-[#254633] hover:text-[#70b62b]"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className={`flex gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`flex-1 bg-[#066532] hover:bg-[#254633] text-white py-6 rounded-xl text-lg font-semibold shadow-xl shadow-[#066532]/25 disabled:opacity-70 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {isAdding ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <ShoppingBag className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        {t.addToCart}
                      </>
                    )}
                  </Button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all ${isWishlisted
                      ? "bg-red-50 border-red-400 text-red-500"
                      : "border-[#254633]/10 text-[#254633] hover:border-[#70b62b] hover:text-[#70b62b]"
                      }`}
                  >
                    <Heart className={`h-6 w-6 ${isWishlisted ? "fill-current" : ""}`} />
                  </motion.button>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                  className={`grid grid-cols-3 gap-4 pt-6 border-t border-[#254633]/10 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {[
                    { icon: Truck, label: language === 'ar' ? "شحن سريع" : "Livraison Rapide" },
                    { icon: Shield, label: language === 'ar' ? "دفع آمن" : "Paiement Sécurisé" },
                    { icon: Leaf, label: language === 'ar' ? "100% طبيعي" : "100% Naturel" },
                  ].map((item, idx) => (
                    <div key={item.label} className="flex flex-col items-center text-center">
                      <item.icon className="h-5 w-5 text-[#70b62b] mb-1" />
                      <span className="text-xs text-[#254633]/60">{item.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

