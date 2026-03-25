import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Language = 'fr' | 'ar'

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'fr',
      isRTL: false,
      setLanguage: (lang) => set({ language: lang, isRTL: lang === 'ar' }),
    }),
    {
      name: 'top7green-language',
    }
  )
)

export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      products: "Nos Produits",
      categories: "Catégories",
      about: "À Propos",
      contact: "Contact",
    },
    hero: {
      badge: "100% Naturel & Authentique",
      title1: "Découvrez la",
      titleHighlight: "Puissance",
      title2: "de la Nature",
      subtitle: "Plantes médicinales marocaines, herbes aromatiques et cosmétiques naturels. Une collection unique de trésors botaniques pour votre bien-être et votre beauté.",
      phrase: "L'excellence des trésors naturels du Maroc, sélectionnés avec soin pour votre bien-être.",
      cta1: "Nos Produits",
      cta2: "Notre Histoire",
      stats: {
        products: "Produits Naturels",
        clients: "Clients Satisfaits",
        bio: "Bio & Naturel",
        expertise: "Ans d'Expertise",
      },
    },
    categories: {
      title: "Nos Catégories",
      subtitle: "Explorez notre sélection de produits naturels authentiques",
      herbs: {
        title: "Plantes Médicinales",
        description: "Herbes traditionnelles aux vertus thérapeutiques",
      },
      cosmetics: {
        title: "Cosmétiques Naturels",
        description: "Soins beauté à base d'ingrédients purs",
      },
      wellness: {
        title: "Bien-être",
        description: "Produits pour votre équilibre corps et esprit",
      },
      traditional: {
        title: "Produits Traditionnels",
        description: "Trésors du patrimoine marocain",
      },
      explore: "Explorer",
    },
    products: {
      title: "Nos Produits Phares",
      subtitle: "Sélection premium de nos meilleures ventes",
      all: "Tous",
      herbs: "Plantes",
      cosmetics: "Cosmétiques",
      traditional: "Traditionnel",
      addToCart: "Ajouter au panier",
      viewAll: "Voir Tous les Produits",
    },
    about: {
      badge: "Notre Histoire",
      title: "La Tradition Marocaine au Service de Votre Bien-être",
      description: "Depuis plus de 15 ans, Top7green perpétue l'héritage ancestral des plantes médicinales marocaines. Notre mission est de vous offrir des produits 100% naturels, récoltés avec soin dans les régions les plus préservées du Maroc.",
      quote: "\"Chaque plante raconte une histoire, chaque produit est un voyage au cœur de la nature marocaine.\"",
      values: {
        organic: {
          title: "100% Biologique",
          description: "Produits certifiés sans pesticides ni additifs chimiques",
        },
        artisanal: {
          title: "Savoir-faire Artisanal",
          description: "Méthodes traditionnelles préservées de génération en génération",
        },
        quality: {
          title: "Qualité Premium",
          description: "Sélection rigoureuse des meilleures matières premières",
        },
      },
    },
    testimonials: {
      title: "Ce Que Disent Nos Clients",
      subtitle: "Des milliers de clients satisfaits nous font confiance",
    },
    newsletter: {
      title: "Restez Connecté à la Nature",
      subtitle: "Inscrivez-vous pour recevoir nos conseils bien-être et offres exclusives",
      placeholder: "Votre adresse email",
      button: "S'inscrire",
      success: "Merci! Vous êtes maintenant inscrit.",
      privacy: "Nous respectons votre vie privée. Désabonnement possible à tout moment.",
    },
    footer: {
      description: "Votre destination pour des produits naturels authentiques du Maroc. Qualité, tradition et bien-être depuis 2009.",
      products: "Produits",
      company: "Entreprise",
      support: "Support",
      links: {
        herbs: "Plantes Médicinales",
        cosmetics: "Cosmétiques Naturels",
        wellness: "Bien-être",
        traditional: "Produits Traditionnels",
        about: "À Propos",
        blog: "Blog",
        careers: "Carrières",
        press: "Presse",
        faq: "FAQ",
        shipping: "Livraison",
        returns: "Retours",
        contact: "Contact",
      },
      rights: "Tous droits réservés.",
    },
    cart: {
      title: "Votre Panier",
      empty: "Votre panier est vide",
      emptyDesc: "Ajoutez des produits pour commencer vos achats",
      continueShopping: "Continuer les achats",
      subtotal: "Sous-total",
      shipping: "Livraison",
      free: "Gratuite",
      total: "Total",
      checkout: "Passer la commande",
    },
    product: {
      benefits: "Bienfaits",
      usage: "Mode d'Emploi",
      ingredients: "Ingrédients",
      addToCart: "Ajouter au Panier",
      inStock: "En stock",
      category: "Catégorie",
    },
    marquee: {
      freeShipping: "Livraison Gratuite dès 300 DH",
      natural: "100% Naturel",
      organic: "Certifié Bio",
      morocco: "Origine Maroc",
      satisfaction: "Satisfaction Garantie",
    },
    blogs: {
      title: "Nos Dernières Actualités",
      badge: "Actualités & Blogs",
      viewAll: "Voir Tous les Blogs",
      readMore: "Lire la suite",
      close: "Fermer l'article",
      back: "Retour",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      products: "منتجاتنا",
      categories: "الفئات",
      about: "من نحن",
      contact: "اتصل بنا",
    },
    hero: {
      badge: "100% طبيعي وأصيل",
      title1: "اكتشف",
      titleHighlight: "قوة",
      title2: "الطبيعة",
      subtitle: "نباتات طبية مغربية، أعشاب عطرية ومستحضرات تجميل طبيعية. مجموعة فريدة من الكنوز النباتية لصحتك وجمالك.",
      phrase: "تميز الكنوز الطبيعية المغربية، المختارة بعناية لرفاهيتك.",
      cta1: "منتجاتنا",
      cta2: "قصتنا",
      stats: {
        products: "منتج طبيعي",
        clients: "عميل راضٍ",
        bio: "طبيعي وعضوي",
        expertise: "سنة خبرة",
      },
    },
    categories: {
      title: "فئاتنا",
      subtitle: "استكشف مجموعتنا من المنتجات الطبيعية الأصيلة",
      herbs: {
        title: "النباتات الطبية",
        description: "أعشاب تقليدية ذات فوائد علاجية",
      },
      cosmetics: {
        title: "مستحضرات تجميل طبيعية",
        description: "منتجات جمال من مكونات نقية",
      },
      wellness: {
        title: "الصحة والعافية",
        description: "منتجات لتوازن الجسم والروح",
      },
      traditional: {
        title: "منتجات تقليدية",
        description: "كنوز من التراث المغربي",
      },
      explore: "استكشف",
    },
    products: {
      title: "منتجاتنا المميزة",
      subtitle: "اختيار متميز من أفضل مبيعاتنا",
      all: "الكل",
      herbs: "نباتات",
      cosmetics: "تجميل",
      traditional: "تقليدي",
      addToCart: "أضف إلى السلة",
      viewAll: "عرض جميع المنتجات",
    },
    about: {
      badge: "قصتنا",
      title: "التقليد المغربي في خدمة صحتك",
      description: "منذ أكثر من 15 عامًا، تحافظ Top7green على الإرث العريق للنباتات الطبية المغربية. مهمتنا هي تقديم منتجات طبيعية 100%، يتم جمعها بعناية من أكثر مناطق المغرب نقاءً.",
      quote: "\"كل نبتة تحكي قصة، كل منتج هو رحلة إلى قلب الطبيعة المغربية.\"",
      values: {
        organic: {
          title: "100% عضوي",
          description: "منتجات معتمدة بدون مبيدات أو إضافات كيميائية",
        },
        artisanal: {
          title: "حرفية تقليدية",
          description: "طرق تقليدية محفوظة من جيل إلى جيل",
        },
        quality: {
          title: "جودة متميزة",
          description: "اختيار دقيق لأفضل المواد الخام",
        },
      },
    },
    testimonials: {
      title: "ماذا يقول عملاؤنا",
      subtitle: "آلاف العملاء الراضين يثقون بنا",
    },
    newsletter: {
      title: "ابقَ على اتصال بالطبيعة",
      subtitle: "اشترك لتلقي نصائحنا الصحية والعروض الحصرية",
      placeholder: "بريدك الإلكتروني",
      button: "اشترك",
      success: "شكراً! أنت الآن مشترك.",
      privacy: "نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.",
    },
    footer: {
      description: "وجهتك للمنتجات الطبيعية الأصيلة من المغرب. جودة وتقليد وصحة منذ 2009.",
      products: "المنتجات",
      company: "الشركة",
      support: "الدعم",
      links: {
        herbs: "النباتات الطبية",
        cosmetics: "مستحضرات تجميل طبيعية",
        wellness: "الصحة والعافية",
        traditional: "منتجات تقليدية",
        about: "من نحن",
        blog: "المدونة",
        careers: "الوظائف",
        press: "الصحافة",
        faq: "الأسئلة الشائعة",
        shipping: "الشحن",
        returns: "الإرجاع",
        contact: "اتصل بنا",
      },
      rights: "جميع الحقوق محفوظة.",
    },
    cart: {
      title: "سلة التسوق",
      empty: "سلتك فارغة",
      emptyDesc: "أضف منتجات لبدء التسوق",
      continueShopping: "متابعة التسوق",
      subtotal: "المجموع الفرعي",
      shipping: "الشحن",
      free: "مجاني",
      total: "المجموع",
      checkout: "إتمام الطلب",
    },
    product: {
      benefits: "الفوائد",
      usage: "طريقة الاستخدام",
      ingredients: "المكونات",
      addToCart: "أضف إلى السلة",
      inStock: "متوفر",
      category: "الفئة",
    },
    marquee: {
      freeShipping: "شحن مجاني من 300 درهم",
      natural: "100% طبيعي",
      organic: "عضوي معتمد",
      morocco: "منشأ مغربي",
      satisfaction: "ضمان الرضا",
    },
    blogs: {
      title: "آخر أخبارنا",
      badge: "الأخبار والمدونات",
      viewAll: "عرض جميع المدونات",
      readMore: "اقرأ المزيد",
      close: "إغلاق المقال",
      back: "عودة",
    },
  },
} as const

export type Translations = typeof translations.fr
