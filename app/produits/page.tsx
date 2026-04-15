"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ShoppingBag,
  Star,
  Filter,
  LayoutGrid,
  List,
  ChevronRight,
  MessageCircle,
  Search,
  X,
  SlidersHorizontal,
} from "lucide-react"
import { useCartStore, type Product } from "@/lib/cart-store"
import { useLanguageStore } from "@/lib/language-store"
import PageLayout from "@/components/page-layout"
import { Button } from "@/components/ui/button"

// Expanded product list with categories aligned to filters
const products: Product[] = [

  {
    id: 2,
    name: "Crème de Nila",
    nameAr: "كريم النيلة",
    description: "Soin nourrissant naturel pour cheveux ternes",
    descriptionAr: "عناية طبيعية مغذية للبشرة",
    longDescription: "Un masque inspiré des rituels marocains, enrichi en sidr pour fortifier et purifier.",
    price: 110,
    originalPrice: null,
    image: "/images/SHOOTING Produits _/IMG_7279.JPG",
    rating: 4.8,
    reviews: 73,
    badge: "Naturel",
    badgeColor: "#066532",
    category: "Nila",
    categoryAr: "النيلة",
  },
  {
    id: 3,
    name: "Shampoing Anti-chute des cheveux",
    nameAr: "شامبو مضاد تساقط الشعر",
    description: "Anti-chute des cheveux",
    descriptionAr: "شامبو مضاد تساقط الشعر",
    longDescription: "Shampoing Anti-chute des cheveux",
    price: 45,
    originalPrice: null,
    image: "/images/SHOOTING Produits _/IMG_7280.JPG",
    rating: 4.7,
    reviews: 89,
    badge: "Nouveau",
    badgeColor: "#066532",
    category: "Shampoing",
    categoryAr: "شامبو",
  },
  {
    id: 4,
    name: "Huile Anti-chute des cheveux",
    nameAr: "زيت مضاد تساقط الشعر",
    description: "Anti-chute des cheveux",
    descriptionAr: "زيت مضاد تساقط الشعر",
    longDescription: "Huile Anti-chute des cheveux",
    price: 39,
    originalPrice: null,
    image: "/images/SHOOTING Produits _/IMG_7281.JPG",
    rating: 4.6,
    reviews: 51,
    badge: null,
    badgeColor: null,
    category: "Huile",
    categoryAr: "زيت",
  },
  {
    id: 5,
    name: "Sel de Bain",
    nameAr: "ملح الحمام",
    description: "Sel de bain relaxant",
    descriptionAr: "ملح الحمام المريح",
    longDescription: "Sel de bain relaxant",
    price: 189,
    originalPrice: 220,
    image: "/images/SHOOTING Produits _/IMG_7282.JPG",
    rating: 5.0,
    reviews: 215,
    badge: "Premium",
    badgeColor: "#70b62b",
    category: "Sel de Bain",
    categoryAr: "ملح الحمام",
  },
  {
    id: 6,
    name: "Amlou",
    nameAr: "أملو",
    description: "Aux amandes & huile d'argan",
    descriptionAr: "زيت اللوز و زيت الأركان",
    longDescription: "Aux amandes & huile d'argan",
    price: 95,
    originalPrice: 120,
    image: "/images/SHOOTING Produits _/IMG_7283.JPG",
    rating: 4.8,
    reviews: 67,
    badge: "Fortifiant",
    badgeColor: "#70b62b",
    category: "Amlou",
    categoryAr: "أملو",
  },
  {
    id: 7,
    name: "Gommage & Masque Sider",
    nameAr: "مقشر و قناع السدر",
    description: "Gommage & Masque Sider",
    descriptionAr: "مقشر و قناع السدر",
    longDescription: "Gommage & Masque Sider",
    price: 55,
    originalPrice: null,
    image: "/images/SHOOTING Produits _/IMG_7284.JPG",
    rating: 4.8,
    reviews: 97,
    badge: null,
    badgeColor: null,
    category: "Cosmétiques Naturels",
    categoryAr: "تجميل طبيعي",
  },
  {
    id: 8,
    name: "Gommage au Nila",
    nameAr: "مقشر النيلة",
    description: "Gommage au Nila",
    descriptionAr: "مقشر النيلة",
    longDescription: "Gommage au Nila",
    price: 65,
    originalPrice: null,
    image: "/images/SHOOTING Produits _/IMG_7285.JPG",
    rating: 4.9,
    reviews: 142,
    badge: "Essentiel",
    badgeColor: "#066532",
    category: "Nila",
    categoryAr: "النيلة",
  },

  {
    id: 10,
    name: "Fabago",
    nameAr: "فاباجو",
    description: "Fabago",
    descriptionAr: "فاباجو",
    longDescription: "Fabago",
    price: 35,
    originalPrice: null,
    image: "/images/SHOOTING Produits _/IMG_7287.JPG",
    rating: 4.6,
    reviews: 52,
    badge: null,
    badgeColor: null,
    category: "Plantes Médicinales",
    categoryAr: "نباتات طبية",
  },
  {
    id: 11,
    name: "Crème parfumée pour le corps",
    nameAr: "كريم معطر للجسم",
    description: "Crème parfumée pour le corps",
    descriptionAr: "كريم معطر للجسم",
    longDescription: "Crème parfumée pour le corps",
    price: 42,
    originalPrice: null,
    image: "/images/SHOOTING Produits _/IMG_7288.JPG",
    rating: 4.7,
    reviews: 61,
    badge: "Aromatique",
    badgeColor: "#254633",
    category: "Cosmétiques Naturels",
    categoryAr: "تجميل طبيعي",
  },

  {
    id: 15,
    name: "Eau florale de rose",
    nameAr: "ماء الورد",
    description: "Sélection relaxante",
    descriptionAr: "مجموعة مريحة",
    longDescription: "Eau florale de rose",
    price: 150,
    originalPrice: 180,
    image: "/images/SHOOTING Produits _/IMG_7292.JPG",
    rating: 4.8,
    reviews: 35,
    badge: "Eco",
    badgeColor: "#70b62b",
    category: "Cosmétiques Naturels",
    categoryAr: "تجميل طبيعي",
  },
  {
    id: 16,
    name: "Poudre de Sider",
    nameAr: "بودرة السدر",
    description: "Soin protecteur",
    descriptionAr: "عناية واقية",
    longDescription: "Poudre de Sider",
    price: 120,
    originalPrice: null,
    image: "/images/SHOOTING Produits _/IMG_7293.JPG",
    rating: 4.9,
    reviews: 48,
    badge: "Rare",
    badgeColor: "#066532",
    category: "Plantes Médicinales",
    categoryAr: "نباتات طبية",
  },
  {
    id: 17,
    name: "Crème d'argan",
    nameAr: "كريم أركان",
    description: "Crème d'argan",
    descriptionAr: "كريم أركان",
    longDescription: "Crème d'argan",
    price: 45,
    originalPrice: null,
    image: "/images/SHOOTING Produits _/IMG_7294.JPG",
    rating: 4.7,
    reviews: 55,
    badge: "Frais",
    badgeColor: "#70b62b",
    category: "Cosmétiques Naturels",
    categoryAr: "تجميل طبيعي",
  },
  {
    id: 18,
    name: "Huile d'Argan Non Torréfiée",
    nameAr: "زيت أركان غير محمص",
    description: "Huile d'Argan Non Torréfiée",
    descriptionAr: "زيت أركان غير محمص",
    longDescription: "Huile d'Argan Non Torréfiée",
    price: 85,
    originalPrice: 100,
    image: "/images/SHOOTING Produits _/IMG_7295.JPG",
    rating: 4.8,
    reviews: 32,
    badge: null,
    badgeColor: null,
    category: "Huiles Naturelles",
    categoryAr: "زيوت طبيعية",
  },
  {
    id: 19,
    name: "Savon Artisanal",
    nameAr: "صابون يدوي",
    description: "Fabriqué à froid",
    descriptionAr: "صناعة باردة",
    longDescription: "Un savon doux pour toute la famille.",
    price: 190,
    originalPrice: 240,
    image: "/images/SHOOTING Produits _/IMG_7296.JPG",
    rating: 5.0,
    reviews: 28,
    badge: "Nouveau",
    badgeColor: "#066532",
    category: "Cosmétiques Naturels",
    categoryAr: "تجميل طبيعي",
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
]

const categories = [
  { id: "all", name: "Tous", nameAr: "الكل", count: "120+" },
  { id: "sidr", name: "Sidr", nameAr: "السدر", desc: "Poudres et soins au sidr", count: "12+" },
  { id: "romarin", name: "Romarin", nameAr: "إكليل الجبل", desc: "Herbe aromatique et soins", count: "10+" },
  { id: "huiles", name: "Huiles Naturelles", nameAr: "زيوت طبيعية", desc: "Argan, romarin et huiles botaniques", count: "18+" },
  { id: "cosmetiques", name: "Cosmétiques Naturels", nameAr: "تجميل طبيعي", desc: "Beauté et soin naturels", count: "24+" },
  { id: "plantes", name: "Plantes Médicinales", nameAr: "نباتات طبية", desc: "Herbes thérapeutiques", count: "16+" },
  { id: "traditionnels", name: "Produits Traditionnels", nameAr: "منتجات تقليدية", desc: "Trésors marocains authentiques", count: "14+" },
]

export default function ProduitsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Tous"])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const { addItem, openProductModal } = useCartStore()
  const { language, isRTL } = useLanguageStore()
  const isAr = language === "ar"

  const toggleCategory = (catName: string) => {
    if (catName === "Tous") {
      setSelectedCategories(["Tous"])
      return
    }

    setSelectedCategories((prev) => {
      const newCats = prev.filter((c) => c !== "Tous")
      if (newCats.includes(catName)) {
        const filtered = newCats.filter((c) => c !== catName)
        return filtered.length === 0 ? ["Tous"] : filtered
      } else {
        return [...newCats, catName]
      }
    })
  }

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((p) => {
      const categoryMatch =
        selectedCategories.includes("Tous") ||
        selectedCategories.includes(p.category || "") ||
        (isAr && selectedCategories.includes(p.categoryAr || ""))

      const searchMatch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.nameAr && p.nameAr.includes(searchQuery)) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.descriptionAr && p.descriptionAr.includes(searchQuery))

      return categoryMatch && searchMatch
    })

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price)
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price)
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating)

    return result
  }, [selectedCategories, sortBy, searchQuery, isAr])

  return (
    <PageLayout
      title={isAr ? "منتجاتنا | المميزة" : "Nos | Produits"}
      subtitle={isAr ? "اكتشف مجموعتنا الطبيعية" : "Découvrez notre collection naturelle"}
      breadcrumb="Top7green"
      videoSrc="/videos/hero-bg2.mp4"
    >
      <div className="bg-[#f8f0da]/20 min-h-screen py-8">
        <div className="container mx-auto px-4 md:px-6">
          <nav className={`flex items-center gap-2 text-sm text-[#254633]/60 mb-8 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Link href="/" className="hover:text-[#70b62b] transition-colors">
              {isAr ? "الرئيسية" : "Accueil"}
            </Link>
            <ChevronRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            <span className="text-[#254633] font-medium">{isAr ? "منتجاتنا" : "Produits"}</span>
          </nav>

          <div className={`flex flex-col lg:flex-row gap-8 ${isRTL ? "lg:flex-row-reverse" : ""}`}>
            <div className="lg:hidden flex justify-between items-center mb-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm font-medium text-[#254633]"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {isAr ? "تصفية" : "Filtrer"}
              </button>
              <span className="text-sm text-[#254633]/60">
                {filteredAndSortedProducts.length} {isAr ? "منتج" : "produits"}
              </span>
            </div>

            <aside className={`w-full lg:w-64 flex-shrink-0 space-y-8 hidden lg:block ${isRTL ? "font-arabic" : ""}`}>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#254633]/5 sticky top-32">
                <h3 className="text-xl font-bold text-[#254633] mb-6 flex items-center gap-2">
                  <Filter className="h-5 w-5 text-[#70b62b]" />
                  {isAr ? "الفئات" : "Catégories"}
                </h3>

                <div className="space-y-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.name)}
                      className={`w-full group/cat flex items-start gap-3 py-3 px-3 rounded-2xl transition-all duration-300 ${selectedCategories.includes(cat.name)
                        ? "bg-[#70b62b]/10 text-[#70b62b]"
                        : "text-[#254633]/70 hover:bg-[#f8f0da]/50"
                        }`}
                    >
                      <div
                        className={`mt-1 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-colors ${selectedCategories.includes(cat.name)
                          ? "bg-[#70b62b] border-[#70b62b]"
                          : "border-[#254633]/20 group-hover/cat:border-[#70b62b]/50"
                          }`}
                      >
                        {selectedCategories.includes(cat.name) && <div className="w-1.5 h-1.5 bg-white rounded-sm" />}
                      </div>

                      <div className="flex flex-col items-start text-left overflow-hidden">
                        <div className="flex items-center justify-between w-full gap-2">
                          <span
                            className={`text-sm font-bold ${selectedCategories.includes(cat.name) ? "text-[#066532]" : "text-[#254633]"
                              }`}
                          >
                            {isAr ? cat.nameAr : cat.name}
                          </span>
                          {cat.count && (
                            <span className="text-[10px] bg-[#254633]/5 px-2 py-0.5 rounded-full font-medium text-[#254633]/40">
                              {cat.count}
                            </span>
                          )}
                        </div>
                        {cat.desc && <span className="text-[10px] text-[#254633]/40 line-clamp-1 mt-0.5">{cat.desc}</span>}
                      </div>
                    </button>
                  ))}
                </div>


              </div>
            </aside>

            <div className="flex-1">
              <div
                className={`bg-white rounded-3xl p-4 mb-8 shadow-sm border border-[#254633]/5 flex flex-wrap items-center justify-between gap-4 ${isRTL ? "flex-row-reverse" : ""
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search
                      className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-[#254633]/40 ${isRTL ? "right-4" : "left-4"
                        }`}
                    />
                    <input
                      type="text"
                      placeholder={isAr ? "بحث عن منتج..." : "Rechercher..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`pl-10 pr-4 py-2 bg-[#f8f0da]/30 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#70b62b]/30 w-full sm:w-64 ${isRTL ? "pr-10 pl-4" : ""
                        }`}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#254633]/60 hidden sm:inline">
                      {isAr ? "ترتيب حسب:" : "Trier par:"}
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent text-sm font-bold text-[#254633] focus:outline-none cursor-pointer"
                    >
                      <option value="relevance">{isAr ? "الأكثر صلة" : "Pertinence"}</option>
                      <option value="rating">{isAr ? "التقييم" : "Mieux notés"}</option>
                    </select>
                  </div>

                  <div className="h-6 w-px bg-[#254633]/10 hidden sm:block" />

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-colors ${viewMode === "grid"
                        ? "bg-[#70b62b] text-white shadow-md"
                        : "text-[#254633]/40 hover:bg-[#f8f0da]/50"
                        }`}
                    >
                      <LayoutGrid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-colors ${viewMode === "list"
                        ? "bg-[#70b62b] text-white shadow-md"
                        : "text-[#254633]/40 hover:bg-[#f8f0da]/50"
                        }`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategories.join("-") + sortBy + searchQuery + viewMode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}
                >
                  {filteredAndSortedProducts.length > 0 ? (
                    filteredAndSortedProducts.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        mode={viewMode}
                        index={index}
                        isAr={isAr}
                        isRTL={isRTL}
                        onView={() => openProductModal(product)}
                        onAdd={() => addItem(product)}
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center">
                      <Search className="h-12 w-12 text-[#254633]/20 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-[#254633]">
                        {isAr ? "لم يتم العثور على منتجات" : "Aucun produit trouvé"}
                      </h3>
                      <p className="text-[#254633]/50 mt-2">
                        {isAr ? "حاول تغيير معايير البحث" : "Essayez de modifier votre recherche ou vos filtres."}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/212671013099"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-8 ${isRTL ? "left-8" : "right-8"} z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group`}
      >
        <MessageCircle className="h-8 w-8" />
        <span
          className={`absolute ${isRTL ? "left-20" : "right-20"} whitespace-nowrap bg-white text-[#254633] px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity`}
        >
          {isAr ? "تحدث معنا" : "Discutez avec nous"}
        </span>
      </a>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: isRTL ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "-100%" : "100%" }}
              className={`fixed inset-y-0 ${isRTL ? "left-0" : "right-0"} w-80 bg-white z-[101] p-8 shadow-2xl`}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-[#254633]">{isAr ? "تصفية" : "Filtrer"}</h3>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-[#f8f0da] rounded-full">
                  <X className="h-6 w-6 text-[#254633]" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-[#254633] mb-4">{isAr ? "الفئات" : "Catégories"}</h4>
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          toggleCategory(cat.name)
                          setIsSidebarOpen(false)
                        }}
                        className={`w-full flex items-start gap-4 py-4 px-4 rounded-2xl transition-all ${selectedCategories.includes(cat.name)
                          ? "bg-[#70b62b]/10 text-[#70b62b]"
                          : "bg-[#f8f0da]/20 text-[#254633]/70"
                          }`}
                      >
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold">{isAr ? cat.nameAr : cat.name}</span>
                            {cat.count && <span className="text-xs opacity-50">{cat.count}</span>}
                          </div>
                          {cat.desc && <p className="text-xs opacity-60 leading-tight">{cat.desc}</p>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageLayout>
  )
}

function ProductCard({
  product,
  mode,
  index,
  isAr,
  isRTL,
  onView,
  onAdd,
}: {
  product: Product
  mode: "grid" | "list"
  index: number
  isAr: boolean
  isRTL: boolean
  onView: () => void
  onAdd: () => void
}) {
  const isGrid = mode === "grid"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className={`bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#254633]/5 group flex ${isGrid ? "flex-col" : "flex-row h-64"
        }`}
    >
      <div className={`relative overflow-hidden bg-[#f8f0da]/30 ${isGrid ? "aspect-square" : "w-64 flex-shrink-0"}`}>
        <Image
          src={product.image}
          alt={isAr ? product.nameAr || product.name : product.name}
          fill
          className="object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
        />

        {isGrid && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              onClick={onView}
              className="w-12 h-12 bg-white text-[#254633] rounded-full flex items-center justify-center hover:bg-[#70b62b] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={onAdd}
              className="w-12 h-12 bg-white text-[#254633] rounded-full flex items-center justify-center hover:bg-[#70b62b] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75"
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        )}

        {product.badge && (
          <span
            className={`absolute top-4 ${isRTL ? "right-4" : "left-4"} px-3 py-1 rounded-full text-white text-[10px] uppercase font-bold tracking-widest`}
            style={{ backgroundColor: product.badgeColor || "#70b62b" }}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className={`p-6 flex flex-col justify-between flex-1 ${isRTL ? "text-right" : ""}`}>
        <div>
          <div className={`flex justify-between items-start mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className="text-[10px] text-[#70b62b] font-bold uppercase tracking-[2px]">
              {isAr ? product.categoryAr : product.category}
            </span>
            <div className={`flex gap-0.5 ${isRTL ? "flex-row-reverse text-right" : ""}`}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-[#70b62b] fill-[#70b62b]" : "text-gray-200"}`}
                />
              ))}
            </div>
          </div>

          <h3 className="text-lg font-bold text-[#254633] mb-2 group-hover:text-[#70b62b] transition-colors line-clamp-1">
            {isAr ? product.nameAr : product.name}
          </h3>
        </div>

        <div className={`flex items-end justify-between ${isRTL ? "flex-row-reverse" : ""}`}>


          {!isGrid && (
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-[#70b62b] text-[#70b62b] hover:bg-[#70b62b] hover:text-white"
                onClick={onView}
              >
                {isAr ? "عرض التفاصيل" : "Voir Détails"}
              </Button>
              <Button
                size="sm"
                className="rounded-full bg-[#70b62b] text-white hover:bg-[#066532]"
                onClick={onAdd}
              >
                {isAr ? "أضف للسلة" : "Ajouter"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}