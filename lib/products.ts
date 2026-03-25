import { type Product } from "./cart-store"

export const products: Product[] = [
  // SIDR
  {
    id: 1,
    name: "Sidr Premium",
    nameAr: "سدر ممتاز",
    description: "Poudre de feuilles de sidr pure pour cheveux et peau",
    descriptionAr: "بودرة أوراق السدر النقية للشعر والبشرة",
    longDescription:
      "Le sidr premium est récolté avec soin pour offrir un soin ancestral naturel pour les cheveux et la peau. Riche en nutriments, il nettoie en profondeur tout en respectant l'équilibre de votre épiderme.",
    longDescriptionAr: "يتم حصاد السدر الممتاز بعناية لتقديم عناية طبيعية عريقة للشعر والبشرة. غني بالمغذيات، ينظف بعمق مع احترام توازن بشرتك.",
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
    ingredients: ["Poudre de Sidr 100% pure"],
    ingredientsAr: ["مسحوق سدر نقي 100%"],
    usage: "Mélanger avec de l'eau tiède pour former une pâte. Appliquer sur les cheveux ou le visage.",
    usageAr: "اخلطيه مع الماء الدافئ لتكوين عجينة. ضعيه على الشعر أو الوجه.",
    benefits: ["Nettoie le cuir chevelu", "Fortifie les cheveux", "Apaise la peau"],
    benefitsAr: ["ينظف فروة الرأس", "يقوي الشعر", "يهدئ البشرة"],
    weight: "200g"
  },
  {
    id: 2,
    name: "Masque au Sidr",
    nameAr: "ماسك السدر",
    description: "Soin nourrissant naturel pour cheveux ternes",
    descriptionAr: "عناية طبيعية مغذية للشعر الباهت",
    longDescription:
      "Un masque inspiré des rituels marocains, enrichi en sidr pour fortifier et purifier. Sa formule onctueuse pénètre au cœur de la fibre capillaire pour un éclat instantané.",
    longDescriptionAr: "قناع مستوحى من الطقوس المغربية، غني بالسدر للتقوية والتنقية. تركيبته الكريمية تتغلغل في قلب ألياف الشعر لإشراقة فورية.",
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
    ingredients: ["Extrait de Sidr", "Huile d'Argan", "Eau de Rose"],
    ingredientsAr: ["خلاصة السدر", "زيت الأركان", "ماء الورد"],
    usage: "Appliquer après le shampooing, laisser poser 15 minutes puis rincer.",
    usageAr: "يوضع بعد الشامبو، يترك لمدة 15 دقيقة ثم يشطف.",
    weight: "250ml"
  },

  // ROMARIN
  {
    id: 3,
    name: "Romarin Séché",
    nameAr: "روزماري مجفف",
    description: "Romarin marocain de haute qualité pour infusions",
    descriptionAr: "إكليل الجبل المغربي عالي الجودة للحقن",
    longDescription:
      "Notre romarin est séché naturellement afin de préserver ses arômes et ses bienfaits. Idéal en infusion pour la digestion ou en soin capillaire pour stimuler la pousse.",
    longDescriptionAr: "يتم تجفيف الروزماري الخاص بنا بشكل طبيعي للحفاظ على نكهاته وفوائده. مثالي كمنقوع للهضم أو كعناية بالشعر لتحفيز النمو.",
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
    weight: "100g"
  },
  {
    id: 4,
    name: "Bouquet de Romarin",
    nameAr: "باقة الروزماري",
    description: "Romarin naturel pour déco, tisane et bien-être",
    descriptionAr: "روزماري طبيعي للديكور والحقن والراحة",
    longDescription:
      "Une sélection raffinée de romarin aux usages multiples pour la maison et les rituels naturels. Son parfum revigorant purifie l'atmosphère.",
    longDescriptionAr: "مجموعة مختارة من الروزماري لاستخدامات متعددة للمنزل والطقوس الطبيعية. عطرها المنعش ينقي الأجواء.",
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
      "L'or liquide du Maroc. Une huile multi-usage pour la peau et les cheveux. Riche en vitamine E et en antioxydants, elle nourrit intensément et protège contre le vieillissement.",
    longDescriptionAr: "الذهب السائل للمغرب. زيت متعدد الاستخدامات للبشرة والشعر. غني بفيتامين E ومضادات الأكسدة، يغذي بعمق ويحمي من الشيخوخة.",
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
    weight: "100ml"
  },
  {
    id: 6,
    name: "Huile de Romarin",
    nameAr: "زيت الروزماري",
    description: "Huile naturelle fortifiante pour cheveux",
    descriptionAr: "زيت طبيعي مقوي للشعر",
    longDescription:
      "Une huile végétale enrichie aux extraits de romarin pour aider à revitaliser les cheveux et stimuler le cuir chevelu. Idéale pour les bains d'huile.",
    longDescriptionAr: "زيت نباتي غني بخلاصة الروزماري للمساعدة في تنشيط الشعر وتحفيز فروة الرأس. مثالي لحمامات الزيت.",
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
    weight: "50ml"
  },

  // COSMETIQUES
  {
    id: 7,
    name: "Henné Naturel",
    nameAr: "حناء طبيعي",
    description: "Henné pur pour coloration et soin",
    descriptionAr: "حناء نقي للتلوين والعناية",
    longDescription:
      "Henné traditionnel de qualité, sans additifs chimiques, idéal pour fortifier les cheveux ou pour l'art du tatouage éphémère.",
    longDescriptionAr: "حناء تقليدي عالي الجودة، بدون إضافات كيميائية، مثالي لتقوية الشعر أو لفن الوشم المؤقت.",
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
    weight: "250g"
  },
  {
    id: 8,
    name: "Savon Noir Bio",
    nameAr: "صابون بلدي عضوي",
    description: "Savon traditionnel à l'huile d'olive pour le hammam",
    descriptionAr: "صابون تقليدي بزيت الزيتون للحمام",
    longDescription:
      "Nettoie en profondeur et exfolie délicatement la peau pour un rituel marocain authentique. À utiliser avec un gant kessa pour une peau de soie.",
    longDescriptionAr: "ينظف بعمق ويقشر البشرة بلطف لطقوس مغربية أصيلة. يستخدم مع قفاز الكيسة لبشرة ناعمة كالحرير.",
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
    weight: "200g"
  },
  {
    id: 9,
    name: "Crème Naturelle Visage",
    nameAr: "كريم طبيعي للوجه",
    description: "Crème douce nourrissante à base d'ingrédients naturels",
    descriptionAr: "كريم ناعم مغذي بمكونات طبيعية",
    longDescription:
      "Une texture onctueuse inspirée des soins botaniques pour hydrater et apaiser la peau au quotidien. Laisse un fini doux sans effet gras.",
    longDescriptionAr: "قوام كريمي مستوحى من العناية النباتية لترطيب وتهدئة البشرة يومياً. يترك لمسة ناعمة بدون أثر دهني.",
    price: 135,
    originalPrice: 160,
    image:
      "https://media.istockphoto.com/id/651873946/fr/photo/bouteille-cosm%C3%A9tique-contenant-de-fines-herbes-vertes-feuilles-%C3%A9tiquette-vierge-pour-la.jpg?s=612x612&w=0&k=20&c=xEED2Nae6YjXctc0Fk8Zr1-1fBvBiDmFT2pEWa8PbU=",
    rating: 4.7,
    reviews: 58,
    badge: "Soin",
    badgeColor: "#70b62b",
    category: "Cosmétiques Naturels",
    categoryAr: "تجميل طبيعي",
    weight: "50ml"
  },

  // PLANTES MEDICINALES
  {
    id: 10,
    name: "Thym Sauvage",
    nameAr: "زعتر بري",
    description: "Thym sauvage des montagnes pour infusions",
    descriptionAr: "زعتر بري من الجبال للحقن",
    longDescription:
      "Un thym puissant et aromatique, idéal pour les préparations bien-être et les tisanes. Réputé pour ses propriétés antiseptiques et purifiantes.",
    longDescriptionAr: "زعتر قوي وعطري، مثالي لتحضيرات الرفاهية والمنقوعات. مشهور بخصائصه المطهرة والمنقية.",
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
    weight: "80g"
  },
  {
    id: 11,
    name: "Lavande Séchée",
    nameAr: "خزامى مجففة",
    description: "Lavande naturelle parfumée pour infusion et ambiance",
    descriptionAr: "خزامى طبيعية معطرة للحقن والأجواء",
    longDescription:
      "Une lavande délicate pour vos rituels de détente et vos préparations naturelles. Calme l'esprit et favorise un sommeil réparateur.",
    longDescriptionAr: "خزامى رقيقة لطقوس الاسترخاء والتحضيرات الطبيعية. تهدئ العقل وتساعد على نوم مريح.",
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
    weight: "50g"
  },

  // PRODUITS TRADITIONNELS
  {
    id: 12,
    name: "Awlouz (Amlou) Traditionnel",
    nameAr: "أملو تقليدي",
    description: "Pâte d'amandes, huile d'argan et miel",
    descriptionAr: "معجون اللوز وزيت الأركان والعسل",
    longDescription:
      "Le célèbre amlou marocain, énergisant et gourmand, préparé selon la tradition à partir d'amandes grillées et d'huile d'argan pure.",
    longDescriptionAr: "أملو المغربي الشهير، منشط وشهي، يحضر حسب التقاليد من اللوز المحمص وزيت الأركان النقي.",
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
    weight: "250g"
  },
  {
    id: 13,
    name: "Miel Naturel",
    nameAr: "عسل طبيعي",
    description: "Miel pur aux saveurs authentiques du terroir",
    descriptionAr: "عسل نقي بنكهات أصيلة من التراث",
    longDescription:
      "Un miel sélectionné pour sa richesse aromatique et sa douceur naturelle. Récolté dans les meilleures zones de butinage du Maroc.",
    longDescriptionAr: "عسل مختار لغناه العطري وحلاوته الطبيعية. يتم حصاده من أفضل مناطق الرعي في المغرب.",
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
    weight: "500g"
  },
  {
    id: 14,
    name: "Kit Découverte Terroir",
    nameAr: "مجموعة اكتشاف التراث",
    description: "Assortiment de trésors naturels marocains",
    descriptionAr: "تشكيلة من الكنوز الطبيعية المغربية",
    longDescription:
      "Le coffret parfait pour découvrir l'univers naturel marocain en un seul ensemble. Comprend une sélection de nos meilleurs produits.",
    longDescriptionAr: "صندوق مثالي لاكتشاف العالم الطبيعي المغربي في مجموعة واحدة. يتضمن تشكيلة من أفضل منتجاتنا.",
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

export const categories = [
  { id: "all", name: "Tous", nameAr: "الكل", count: "120+" },
  { id: "sidr", name: "Sidr", nameAr: "السدر", desc: "Poudres et soins au sidr", count: "12+" },
  { id: "romarin", name: "Romarin", nameAr: "إكليل الجبل", desc: "Herbe aromatique et soins", count: "10+" },
  { id: "huiles", name: "Huiles Naturelles", nameAr: "زيوت طبيعية", desc: "Argan, romarin et huiles botaniques", count: "18+" },
  { id: "cosmetiques", name: "Cosmétiques Naturels", nameAr: "تجميل طبيعي", desc: "Beauté et soin naturels", count: "24+" },
  { id: "plantes", name: "Plantes Médicinales", nameAr: "نباتات طبية", desc: "Herbes thérapeutiques", count: "16+" },
  { id: "traditionnels", name: "Produits Traditionnels", nameAr: "منتجات تقليدية", desc: "Trésors marocains authentiques", count: "14+" },
]
