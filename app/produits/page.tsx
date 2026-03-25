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
  // SIDR
  {
    id: 1,
    name: "Sidr Premium",
    nameAr: "سدر ممتاز",
    description: "Poudre de feuilles de sidr pure pour cheveux et peau",
    descriptionAr: "بودرة أوراق السدر النقية للشعر والبشرة",
    longDescription:
      "Le sidr premium est récolté avec soin pour offrir un soin ancestral naturel pour les cheveux et la peau.",
    price: 89,
    originalPrice: 120,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjqRyGxjb1pvisVHX7eBfsmtmQ7fzfTFYwDg&s",
    rating: 4.9,
    reviews: 128,
    badge: "Best Seller",
    badgeColor: "#70b62b",
    category: "Sidr",
    categoryAr: "السدر",
  },
  {
    id: 2,
    name: "Masque au Sidr",
    nameAr: "ماسك السدر",
    description: "Soin nourrissant naturel pour cheveux ternes",
    descriptionAr: "عناية طبيعية مغذية للشعر الباهت",
    longDescription:
      "Un masque inspiré des rituels marocains, enrichi en sidr pour fortifier et purifier.",
    price: 110,
    originalPrice: null,
    image:
      "https://mirasecret.com/cdn/shop/files/Youlia_Bilay_Masterclass_13_4K_6.png?v=1767816529&width=990",
    rating: 4.8,
    reviews: 73,
    badge: "Naturel",
    badgeColor: "#066532",
    category: "Sidr",
    categoryAr: "السدر",
  },

  // ROMARIN
  {
    id: 3,
    name: "Romarin Séché",
    nameAr: "روزماري مجفف",
    description: "Romarin marocain de haute qualité pour infusions",
    descriptionAr: "إكليل الجبل المغربي عالي الجودة للحقن",
    longDescription:
      "Notre romarin est séché naturellement afin de préserver ses arômes et ses bienfaits.",
    price: 45,
    originalPrice: null,
    image:
      "https://www.compo.de/dam/jcr:d63bb815-ac78-4146-b52d-ffb37c23a518/drying-rosemary_Rosmarin-trocknen.jpg?x=76&y=52",
    rating: 4.7,
    reviews: 89,
    badge: "Nouveau",
    badgeColor: "#066532",
    category: "Romarin",
    categoryAr: "إكليل الجبل",
  },
  {
    id: 4,
    name: "Bouquet de Romarin",
    nameAr: "باقة الروزماري",
    description: "Romarin naturel pour déco, tisane et bien-être",
    descriptionAr: "روزماري طبيعي للديكور والحقن والراحة",
    longDescription:
      "Une sélection raffinée de romarin aux usages multiples pour la maison et les rituels naturels.",
    price: 39,
    originalPrice: null,
    image:
      "https://thumbs.dreamstime.com/b/un-bouquet-de-romarin-frais-rosmarinus-officinalis-et-sauge-salvia-ficel%C3%A9-repose-sur-une-surface-en-bois-rustique-les-feuilles-409026842.jpg",
    rating: 4.6,
    reviews: 51,
    badge: null,
    badgeColor: null,
    category: "Romarin",
    categoryAr: "إكليل الجبل",
  },

  // HUILES NATURELLES
  {
    id: 5,
    name: "Huile d'Argan Premium",
    nameAr: "زيت أركان ممتاز",
    description: "Huile d'argan pure de première pression à froid",
    descriptionAr: "زيت أركان بكر معصور على البارد",
    longDescription:
      "L'or liquide du Maroc. Une huile multi-usage pour la peau et les cheveux.",
    price: 189,
    originalPrice: 220,
    image:
      "https://cdn1.costatic.com/assets/img/guide_achat/articles/huile-argan_1120x740px.jpg",
    rating: 5.0,
    reviews: 215,
    badge: "Premium",
    badgeColor: "#70b62b",
    category: "Huiles Naturelles",
    categoryAr: "زيوت طبيعية",
    videoUrl: "https://cdn.pixabay.com/video/2016/06/17/3494-171120038_large.mp4",
  },
  {
    id: 6,
    name: "Huile de Romarin",
    nameAr: "زيت الروزماري",
    description: "Huile naturelle fortifiante pour cheveux",
    descriptionAr: "زيت طبيعي مقوي للشعر",
    longDescription:
      "Une huile végétale enrichie aux extraits de romarin pour aider à revitaliser les cheveux.",
    price: 95,
    originalPrice: 120,
    image:
      "https://cdn.pharma-gdd.com/cache/sub_page_original/68652d726f6d6172696e2d612d63616d70687265b3b1878c.jpg",
    rating: 4.8,
    reviews: 67,
    badge: "Fortifiant",
    badgeColor: "#70b62b",
    category: "Huiles Naturelles",
    categoryAr: "زيوت طبيعية",
  },

  // COSMETIQUES
  {
    id: 7,
    name: "Henné Naturel",
    nameAr: "حناء طبيعي",
    description: "Henné pur pour coloration et soin",
    descriptionAr: "حناء نقي للتلوين والعناية",
    longDescription:
      "Henné traditionnel de qualité, sans additifs chimiques, idéal pour cheveux et mains.",
    price: 55,
    originalPrice: null,
    image:
      "https://www.goji.ma/cdn/shop/products/le-henne-une-poudre-aux-multiples-facettes_d6e62855-bf5c-4401-a7b4-ca8aa7d0dccd.jpg?v=1605656179",
    rating: 4.8,
    reviews: 97,
    badge: null,
    badgeColor: null,
    category: "Cosmétiques Naturels",
    categoryAr: "تجميل طبيعي",
  },
  {
    id: 8,
    name: "Savon Noir Bio",
    nameAr: "صابون بلدي عضوي",
    description: "Savon traditionnel à l'huile d'olive pour le hammam",
    descriptionAr: "صابون تقليدي بزيت الزيتون للحمام",
    longDescription:
      "Nettoie en profondeur et exfolie délicatement la peau pour un rituel marocain authentique.",
    price: 65,
    originalPrice: null,
    image:
      "https://les-tresors-du-maroc.fr/wp-content/uploads/2025/07/ghassoulsavon-beldi-henna-1-scaled.jpg",
    rating: 4.9,
    reviews: 142,
    badge: "Essentiel",
    badgeColor: "#066532",
    category: "Cosmétiques Naturels",
    categoryAr: "تجميل طبيعي",
  },
  {
    id: 9,
    name: "Crème Naturelle Visage",
    nameAr: "كريم طبيعي للوجه",
    description: "Crème douce nourrissante à base d'ingrédients naturels",
    descriptionAr: "كريم ناعم مغذي بمكونات طبيعية",
    longDescription:
      "Une texture onctueuse inspirée des soins botaniques pour hydrater et apaiser la peau.",
    price: 135,
    originalPrice: 160,
    image:
      "https://media.istockphoto.com/id/651873946/fr/photo/bouteille-cosm%C3%A9tique-contenant-de-fines-herbes-vertes-feuilles-%C3%A9tiquette-vierge-pour-la.jpg?s=612x612&w=0&k=20&c=xEED2Nae6YjXkctc0Fk8Zr1-1fBvBiDmFT2pEWa8PbU=",
    rating: 4.7,
    reviews: 58,
    badge: "Soin",
    badgeColor: "#70b62b",
    category: "Cosmétiques Naturels",
    categoryAr: "تجميل طبيعي",
  },

  // PLANTES MEDICINALES
  {
    id: 10,
    name: "Thym Sauvage",
    nameAr: "زعتر بري",
    description: "Thym sauvage des montagnes pour infusions",
    descriptionAr: "زعتر بري من الجبال للحقن",
    longDescription:
      "Un thym puissant et aromatique, idéal pour les préparations bien-être et les tisanes.",
    price: 35,
    originalPrice: null,
    image:
      "https://m.media-amazon.com/images/S/aplus-media-library-service-media/640848ca-b5e9-48a2-b7f3-18bb71f3d82e.__CR0,0,2000,2000_PT0_SX300_V1___.png",
    rating: 4.6,
    reviews: 52,
    badge: null,
    badgeColor: null,
    category: "Plantes Médicinales",
    categoryAr: "نباتات طبية",
  },
  {
    id: 11,
    name: "Lavande Séchée",
    nameAr: "خزامى مجففة",
    description: "Lavande naturelle parfumée pour infusion et ambiance",
    descriptionAr: "خزامى طبيعية معطرة للحقن والأجواء",
    longDescription:
      "Une lavande délicate pour vos rituels de détente et vos préparations naturelles.",
    price: 42,
    originalPrice: null,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGUQJy_DNEjRDOADD2vjki2tbYg95OwURzFA&s",
    rating: 4.7,
    reviews: 61,
    badge: "Aromatique",
    badgeColor: "#254633",
    category: "Plantes Médicinales",
    categoryAr: "نباتات طبية",
  },

  // PRODUITS TRADITIONNELS
  {
    id: 12,
    name: "Awlouz (Amlou) Traditionnel",
    nameAr: "أملو تقليدي",
    description: "Pâte d'amandes, huile d'argan et miel",
    descriptionAr: "معجون اللوز وزيت الأركان والعسل",
    longDescription:
      "Le célèbre amlou marocain, énergisant et gourmand, préparé selon la tradition.",
    price: 120,
    originalPrice: 150,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHbCPamQa--PiGzn8jlpwwXtKd4fxBeFZJg&s",
    rating: 4.8,
    reviews: 64,
    badge: "Terroir",
    badgeColor: "#eab308",
    category: "Produits Traditionnels",
    categoryAr: "منتجات تقليدية",
  },
  {
    id: 13,
    name: "Miel Naturel",
    nameAr: "عسل طبيعي",
    description: "Miel pur aux saveurs authentiques du terroir",
    descriptionAr: "عسل نقي بنكهات أصيلة من التراث",
    longDescription:
      "Un miel sélectionné pour sa richesse aromatique et sa douceur naturelle.",
    price: 99,
    originalPrice: null,
    image:
      "https://www.shutterstock.com/image-photo/natural-honey-dripping-wooden-dipper-260nw-2707950587.jpg",
    rating: 4.9,
    reviews: 85,
    badge: "Pur",
    badgeColor: "#eab308",
    category: "Produits Traditionnels",
    categoryAr: "منتجات تقليدية",
  },
  {
    id: 14,
    name: "Kit Découverte Terroir",
    nameAr: "مجموعة اكتشاف التراث",
    description: "Assortiment de trésors naturels marocains",
    descriptionAr: "تشكيلة من الكنوز الطبيعية المغربية",
    longDescription:
      "Le coffret parfait pour découvrir l'univers naturel marocain en un seul ensemble.",
    price: 299,
    originalPrice: 350,
    image:
      "/images/products/kit.png",
    rating: 4.9,
    reviews: 42,
    badge: "Coffret",
    badgeColor: "#254633",
    category: "Produits Traditionnels",
    categoryAr: "منتجات تقليدية",
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

                <div className="mt-12 pt-8 border-t border-[#254633]/10">
                  <h3 className="font-bold text-[#254633] mb-4">{isAr ? "السعر" : "Prix"}</h3>
                  <div className="space-y-2">
                    <div className="h-1 bg-[#254633]/10 rounded-full relative">
                      <div className="absolute inset-0 bg-[#70b62b] w-2/3 rounded-full" />
                      <div className="absolute -top-1.5 left-0 w-4 h-4 bg-white border-2 border-[#70b62b] rounded-full shadow-md" />
                      <div className="absolute -top-1.5 left-2/3 w-4 h-4 bg-white border-2 border-[#70b62b] rounded-full shadow-md" />
                    </div>
                    <div className="flex justify-between text-xs text-[#254633]/50 pt-4">
                      <span>0 MAD</span>
                      <span>500+ MAD</span>
                    </div>
                  </div>
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
                      <option value="price-low">{isAr ? "السعر (منخفض)" : "Prix: Croissant"}</option>
                      <option value="price-high">{isAr ? "السعر (مرتفع)" : "Prix: Décroissant"}</option>
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
          className="object-cover group-hover:scale-110 transition-transform duration-700"
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

          <p className="text-sm text-[#254633]/50 line-clamp-2 leading-relaxed mb-4">
            {isAr ? product.descriptionAr : product.description}
          </p>
        </div>

        <div className={`flex items-end justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
          <div>
            <div className="text-xl font-bold text-[#254633]">
              {product.price} <span className="text-xs font-medium">MAD</span>
            </div>
            {product.originalPrice && (
              <div className="text-xs text-[#254633]/30 line-through">{product.originalPrice} MAD</div>
            )}
          </div>

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