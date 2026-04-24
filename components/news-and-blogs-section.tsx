"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, X, Calendar, User, Tag } from "lucide-react"
import { useLanguageStore, translations } from "@/lib/language-store"

const blogs = [
  {
    id: 1,
    slug: "guide-ultime-peau-eclatante",
    image: "/images/SHOOTING Produits _/IMG_7295.JPG",
    category: "Soin de la peau",
    categoryAr: "العناية بالبشرة",
    author: "Khadija Idrissi",
    authorAr: "خديجة الإدريسي",
    date: "22 Mars 2026",
    dateAr: "٢٢ مارس ٢٠٢٦",
    title: "Votre Guide Ultime pour une Peau Saine et Éclatante",
    titleAr: "دليلك النهائي لبشرة صحية ومشرقة",
    excerpt: "Découvrez les secrets naturels pour un teint frais et radieux...",
    excerptAr: "اكتشف الأسرار الطبيعية لبشرة نضرة ومشرقة...",
    content: "Obtenir une peau saine et éclatante ne nécessite pas un processus scientifique compliqué rempli de produits chimiques imprononçables. Le véritable éclat commence lorsque nous retournons aux ingrédients les plus authentiques et puissants de la nature.\n\nDans ce guide, nous plongeons profondément dans les rituels essentiels et les trésors botaniques qui ont été utilisés par les cultures traditionnelles pendant des centuries pour maintenir une peau parfaite et lumineuse.\n\nLa nature nous fournit tous les éléments essentiels nécessaires pour une vitalité absolue. Lorsque nous retirons les composants synthétiques de nos routines modernes, ce qu'il reste ce sont des formules naturelles simples, puissantes et profondément thérapeutiques.",
    contentAr: "الحصول على بشرة صحية ومشرقة لا يتطلب عملية علمية معقدة مليئة بالمواد الكيميائية التي يصعب نطقها. التوهج الحقيقي يبدأ عندما نعود إلى المكونات الأكثر أصالة وقوة في الطبيعة.\n\nفي هذا الدليل، نغوص بعمق في الطقوس الأساسية والكنوز النباتية التي استخدمتها الثقافات التقليدية لقرون للحفاظ على بشرة مثالية ومضيئة.\n\nتوفر لنا الطبيعة جميع العناصر الأساسية اللازمة للحيوية المطلقة. عندما نزيل المكونات الاصطناعية من روتيننا الحديث، فإن ما يتبقى هو تركيبات طبيعية بسيطة وقوية وعلاجية بعمق."
  },
  {
    id: 2,
    slug: "meilleurs-produits-soin-corps",
    image: "/images/products/sidr.jpg",
    category: "Soin du corps",
    categoryAr: "العناية بالجسم",
    author: "Fatima Zahra",
    authorAr: "فاطمة الزهراء",
    date: "18 Mars 2026",
    dateAr: "١٨ مارس ٢٠٢٦",
    title: "Les Meilleurs Produits de Soin pour Chaque Type de Peau",
    titleAr: "أفضل منتجات العناية لكل نوع بشرة",
    excerpt: "Trouvez la correspondance parfaite pour les besoins uniques de votre peau...",
    excerptAr: "ابحث عن المطابقة المثالية لاحتياجات بشرتك الفريدة...",
    content: "Naviguer dans le monde écrasant des soins corporels peut être intimidant. Avec des lotions, gommages et sérums à l'infini, comment trouvez-vous exactement ce dont votre peau unique a besoin ? La réponse réside dans les solutions les plus pures à ingrédient unique que la nature offre.\n\nDes propriétés profondément hydratantes de l'Argan pur au pouvoir nettoyant du savon Beldi authentique, nous vous aiderons à créer la routine de soins corporels bio parfaite. Adopter une routine imprégnée d'ingrédients biologiques comme des huiles pressées pures et des eaux florales distillées élève instantanément notre bien-être.",
    contentAr: "يمكن أن يكون التنقل في عالم العناية بالجسم المربك أمراً شاقاً. مع وجود عدد لا يحصى من المستحضرات والمقشرات والأمصال، كيف تجدين بالضبط ما تحتاجه بشرتك الفريدة؟ تكمن الإجابة في أنقى الحلول ذات المكون الواحد التي تقدمها الطبيعة.\n\nمن الخصائص المرطبة بعمق للأركان النقي إلى القوة المنظفة للصابون البلدي الأصيل، سنساعدك في إنشاء روتين عضوي مثالي للعناية بالجسم. إن تبني روتين مشبع بمكونات عضوية مثل الزيوت المعصورة النقية والمياه الزهرية المقطرة يرفع من جودة حياتنا على الفور."
  },
  {
    id: 3,
    slug: "importance-protection-solaire",
    image: "/images/products/romarin.jpg",
    category: "Soin de la peau",
    categoryAr: "العناية بالبشرة",
    author: "Sanaa Alaoui",
    authorAr: "سناء العلوي",
    date: "14 Mars 2026",
    dateAr: "١٤ مارس ٢٠٢٦",
    title: "Pourquoi une Routine Naturelle Régulière est Essentielle",
    titleAr: "لماذا يعتبر الروتين الطبيعي المنتظم ضرورياً",
    excerpt: "Protégez et nourrissez votre peau des agressions externes naturellement...",
    excerptAr: "قم بحماية وتغذية بشرتك من الاعتداءات الخارجية بشكل طبيعي...",
    content: "Bien que l'environnement extérieur nous fournisse de la vitalité, l'exposition quotidienne sans soins adéquats est la principale cause de vieillissement prématuré et de dommages cutanés. Cependant, vous n'avez pas besoin de crèmes synthétiques lourdes pour protéger votre peau.\n\nNous explorons l'équilibre délicat entre profiter de son environnement tout en utilisant des antioxydants naturels et des huiles botaniques améliorant la barrière qui gardent votre peau résiliente et en bonne santé. Non seulement les avantages physiques sont évidents, mais l'arôme apaisant des botaniques naturels agit comme une aromathérapie quotidienne, calmant l'esprit.",
    contentAr: "بينما توفر لنا البيئة الخارجية الحيوية، فإن التعرض اليومي دون رعاية كافية هو السبب الرئيسي للشيخوخة المبكرة وتلف الجلد. ومع ذلك، لا تحتاجي إلى كريمات اصطناعية ثقيلة لحماية بشرتك.\n\nنحن نستكشف التوازن الدقيق بين الاستمتاع ببيئتك مع استخدام مضادات الأكسدة الطبيعية والزيوت النباتية المعززة للحواجز التي تحافظ على بشرتك مرنة وصحية. لا تقتصر الفوائد الجسدية على الوضوح فحسب، بل تعمل الرائحة المهدئة للنباتات الطبيعية كعلاج عطري يومي يهدئ العقل."
  }
]

export default function NewsAndBlogsSection() {
  const [selectedBlog, setSelectedBlog] = useState<(typeof blogs)[0] | null>(null)
  const { language, isRTL } = useLanguageStore()
  const t = translations[language].blogs

  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [selectedBlog])

  return (
    <>
      <section className={`py-24 md:py-32 bg-white relative overflow-hidden ${isRTL ? 'font-arabic' : ''}`} id="blogs" style={{ position: "relative" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className={`flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : ''}>
              <span className="inline-block text-sm font-medium text-[#70b62b] tracking-wider uppercase mb-4">
                {t.badge}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#254633] font-serif leading-tight">
                {language === 'ar' ? (
                  <>
                    آخر <span className="text-[#70b62b]">أخبارنا</span>
                  </>
                ) : (
                  <>
                    Nos Dernières <span className="text-[#70b62b]">Actualités</span>
                  </>
                )}
              </h2>
            </div>
          </div>

          <div className={`grid md:grid-cols-3 gap-8 ${isRTL ? 'direction-rtl' : ''}`}>
            {blogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group flex flex-col cursor-pointer"
                onClick={() => setSelectedBlog(blog)}
              >
                <div className="block relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-gray-100">
                  <Image
                    src={blog.image}
                    alt={language === 'ar' ? blog.titleAr : blog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} bg-[#70b62b] text-white text-xs font-bold px-3 py-1.5 rounded-md tracking-wider shadow-md`}>
                    {language === 'ar' ? blog.categoryAr : blog.category}
                  </div>
                </div>

                <div className={`flex items-center gap-2 text-xs text-[#70b62b] mb-4 font-bold tracking-wide ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{language === 'ar' ? blog.authorAr : blog.author}</span>
                  <span className="text-xl leading-none font-black text-[#254633]">•</span>
                  <span className="text-gray-500 font-medium">{language === 'ar' ? blog.dateAr : blog.date}</span>
                </div>

                <h3 className={`text-xl md:text-2xl font-bold text-[#254633] mb-4 font-serif leading-snug group-hover:text-[#70b62b] transition-colors flex-1 ${isRTL ? 'text-right' : ''}`}>
                  {language === 'ar' ? blog.titleAr : blog.title}
                </h3>

                <div className={`mt-auto pt-2 ${isRTL ? 'text-right' : ''}`}>
                  <span
                    className={`text-[#70b62b] font-bold text-sm hover:text-[#066532] transition-colors flex items-center gap-2 uppercase tracking-wide ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {t.readMore}
                    {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Pop-Up Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`bg-[#fcfbfa] w-full max-w-4xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-y-auto relative overscroll-contain ${isRTL ? 'font-arabic' : ''}`}
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing the modal
            >
              {/* Close Button Top Right */}
              <button
                onClick={() => setSelectedBlog(null)}
                className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} md:top-6 md:${isRTL ? 'left-6' : 'right-6'} z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#254633] hover:bg-white hover:scale-110 shadow-lg transition-all`}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-6 md:p-12 pt-16 md:pt-16">
                {/* Back Button */}
                <button
                  onClick={() => setSelectedBlog(null)}
                  className={`inline-flex items-center gap-3 text-[#70b62b] hover:text-[#066532] font-bold mb-8 transition-all duration-300 group ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`p-3 rounded-full bg-[#70b62b]/10 group-hover:bg-[#066532]/10 transition-all ${isRTL ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`}>
                    {isRTL ? <ArrowRight className="h-5 w-5" /> : <ArrowLeft className="h-5 w-5" />}
                  </div>
                  {t.back}
                </button>

                {/* Header */}
                <header className={`mb-8 md:mb-12 ${isRTL ? 'text-right' : ''}`}>
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 bg-[#70b62b]/10 text-[#066532] text-xs font-bold uppercase tracking-wider rounded-full mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Tag className="h-3.5 w-3.5" />
                    {language === 'ar' ? selectedBlog.categoryAr : selectedBlog.category}
                  </div>

                  <h1 className="text-3xl md:text-5xl font-bold text-[#254633] mb-6 font-serif leading-tight">
                    {language === 'ar' ? selectedBlog.titleAr : selectedBlog.title}
                  </h1>

                  <div className={`flex flex-wrap items-center gap-6 text-gray-500 font-medium pb-6 border-b border-gray-200 text-sm md:text-base ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <User className="h-4 w-4 md:h-5 md:w-5 text-[#70b62b]" />
                      {language === 'ar' ? selectedBlog.authorAr : selectedBlog.author}
                    </div>
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Calendar className="h-4 w-4 md:h-5 md:w-5 text-[#70b62b]" />
                      {language === 'ar' ? selectedBlog.dateAr : selectedBlog.date}
                    </div>
                  </div>
                </header>

                {/* Hero Image */}
                <div className="relative w-full aspect-[16/9] rounded-2xl md:rounded-[2rem] overflow-hidden mb-10 shadow-lg">
                  <Image
                    src={selectedBlog.image}
                    alt={language === 'ar' ? selectedBlog.titleAr : selectedBlog.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Content */}
                <div className={`prose prose-lg md:prose-xl max-w-none text-gray-700 leading-loose font-serif pb-8 ${isRTL ? 'text-right' : ''}`}>
                  {(language === 'ar' ? selectedBlog.contentAr : selectedBlog.content).split('\n\n').map((paragraph, index) => (
                    <p key={index} className={index === 0 ? `first-letter:text-6xl first-letter:font-bold first-letter:text-[#70b62b] first-letter:mr-3 first-letter:float-left text-lg md:text-xl leading-relaxed mb-6 ${isRTL ? 'first-letter:mr-0 first-letter:ml-3 first-letter:float-right' : ''}` : "mb-6"}>
                      {paragraph}
                    </p>
                  ))}

                  {/* Bottom close button */}
                  <div className="mt-12 pt-8 border-t border-gray-200 flex justify-center">
                    <button
                      onClick={() => setSelectedBlog(null)}
                      className={`inline-flex items-center justify-center gap-3 px-8 py-3 md:px-10 md:py-4 bg-[#254633] hover:bg-[#70b62b] text-white font-bold rounded-full transition-all shadow-xl shadow-[#066532]/20 text-base md:text-lg tracking-wide group ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      {isRTL ? <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />}
                      {t.close}
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

