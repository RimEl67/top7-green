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
    description: "Poudre de feuilles de Sidr pure pour cheveux et peau",
    descriptionAr: "بودرة أوراق السدر النقية للشعر والبشرة",
    longDescription: "Le Sidr, aussi connu sous le nom de jujubier, est un trésor ancestral utilisé depuis des millénaires dans la médecine traditionnelle. Notre poudre de Sidr premium est récolté à la main dans les montagnes de l'Atlas marocain, garantissant une qualité exceptionnelle.",
    longDescriptionAr: "السدر، المعروف أيضاً بالنبق، هو كنز عريق يستخدم منذ آلاف السنين في الطب التقليدي. يتم جمع مسحوق السدر الممتاز يدوياً في جبال الأطلس المغربية، مما يضمن جودة استثنائية.",
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
    benefitsAr: ["يقوي الشعر", "يطهر فروة الرأس", "مضاد طبيعي للقشرة", "يضيف لمعاناً وحجماً"],
    usage: "Mélangez 2-3 cuillères à soupe avec de l'eau tiède pour former une pâte. Appliquez sur cheveux humides, laissez poser 30-45 minutes puis rincez abondamment.",
    usageAr: "اخلطي 2-3 ملاعق كبيرة مع الماء الدافئ لتشكيل عجينة. ضعيها على شعر رطب، اتركيها لمدة 30-45 دقيقة ثم اشطفيها جيداً.",
    ingredients: ["100% Poudre de feuilles de Sidr (Ziziphus spina-christi)"],
    weight: "200g"
  },
  {
    id: 2,
    name: "Romarin Séché",
    nameAr: "إكليل الجبل مجفف",
    description: "Romarin marocain de haute qualité pour infusions",
    descriptionAr: "إكليل الجبل المغربي عالي الجودة للحقن",
    longDescription: "Notre romarin est cultivé dans les terroirs les plus purs du Maroc. Séché naturellement au soleil, il conserve tous ses arômes et propriétés thérapeutiques pour des infusions revigorantes.",
    longDescriptionAr: "يتم زراعة إكليل الجبل في أنقى أراضي المغرب. يتم تجفيفه طبيعياً تحت أشعة الشمس، ويحتفظ بجميع نكهاته وخصائصه العلاجية للحقن المنعشة.",
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
    benefitsAr: ["ينشط الذاكرة", "يعزز الهضم", "مضاد قوي للأكسدة", "تأثير منشط"],
    usage: "Infusez 1 cuillère à café dans 250ml d'eau bouillante pendant 10 minutes. Consommez 2-3 tasses par jour.",
    usageAr: "انقعي ملعقة صغيرة في 250 مل من الماء المغلي لمدة 10 دقائق. تناولي 2-3 أكواب في اليوم.",
    ingredients: ["100% Romarin séché (Rosmarinus officinalis)"],
    weight: "100g"
  },
  {
    id: 3,
    name: "Huile d'Argan Pure",
    nameAr: "زيت أركان صافي",
    description: "Huile d'argan bio pressée à froid",
    descriptionAr: "زيت أركان عضوي معصور على البارد",
    longDescription: "L'or liquide du Maroc. Notre huile d'argan est extraite artisanalement par des coopératives de femmes berbères selon des méthodes ancestrales. Pressée à froid, elle conserve tous ses bienfaits nutritifs.",
    longDescriptionAr: "ذهب المغرب السائل. يتم استخراج زيت الأركان لدينا يدوياً من قبل تعاونيات نسائية أمازيغية وفقاً لطرق الأجداد. معصور على البارد، يحتفظ بجميع فوائده الغذائية.",
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
    benefitsAr: ["يرطب بكثافة", "مضاد طبيعي للشيخوخة", "يصلح الشعر", "يقوي الأظافر"],
    usage: "Appliquez quelques gouttes sur peau propre matin et soir. Pour les cheveux, utilisez en masque avant le shampooing.",
    usageAr: "ضعي بضع قطرات على بشرة نظيفة صباحاً ومساءً. للشعر، استخدميه كقناع قبل الشامبو.",
    ingredients: ["100% Huile d'argan vierge (Argania spinosa)"],
    weight: "100ml"
  },
  {
    id: 4,
    name: "Awlouz Traditionnel",
    nameAr: "أملو تقليدي",
    description: "Pâte d'amandes à l'argan artisanale",
    descriptionAr: "عجينة اللوز بالأركان الحرفية",
    longDescription: "L'Amlou est une délicieuse pâte traditionnelle berbère à base d'amandes grillées, d'huile d'argan et de miel. Un super-aliment énergétique préparé selon la recette ancestrale.",
    longDescriptionAr: "أملو هو عجينة أمازيغية تقليدية لذيذة مصنوعة من اللوز المحمص وزيت الأركان والعسل. غذاء طاقة فائق محضر وفقاً لوصفة الأجداد.",
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
    benefitsAr: ["غني بالطاقة", "مصدر للأوميغا", "لذيذ في الفطور", "100% طبيعي"],
    usage: "À tartiner sur du pain, à mélanger avec du yaourt ou à déguster à la cuillère. Conservez au frais après ouverture.",
    usageAr: "للدهن على الخبز، أو الخلط مع الزبادي أو التناول بالملعقة. يحفظ في مكان بارد بعد الفتح.",
    ingredients: ["Amandes grillées", "Huile d'argan", "Miel naturel"],
    weight: "250g"
  },
  {
    id: 5,
    name: "Savon Noir Beldi",
    nameAr: "صابون بلدي",
    description: "Savon noir traditionnel à l'huile d'olive",
    descriptionAr: "صابون أسود تقليدي بزيت الزيتون",
    longDescription: "Le savon noir beldi est l'incontournable du rituel hammam marocain. Fabriqué à base d'huile d'olive et d'olives noires, il nettoie en profondeur tout en nourrissant la peau.",
    longDescriptionAr: "الصابون البلدي هو جزء لا يتجزأ من طقوس الحمام المغربي. مصنوع من زيت الزيتون والزيتون الأسود، ينظف بعمق بينما يغذي البشرة.",
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
    benefitsAr: ["مقشر طبيعي", "ينظف بعمق", "يجهز لعملية التقشير", "بشرة ناعمة وسلسة"],
    usage: "Appliquez généreusement sur peau humide, laissez poser 5-10 minutes puis gommez avec un gant kessa. Rincez abondamment.",
    usageAr: "ضعي كمية وفيرة على بشرة مبللة، اتركيها لمدة 5-10 دقائق ثم قومي بالتقشير باستخدام كيس الحمام. اشطفي جيدا.",
    ingredients: ["Huile d'olive", "Olives noires macérées", "Potasse naturelle"],
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

