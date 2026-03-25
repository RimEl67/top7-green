"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2 } from "lucide-react"
import PageLayout from "@/components/page-layout"
import { useLanguageStore } from "@/lib/language-store"

export default function ContactPage() {
  const { language, isRTL } = useLanguageStore()
  const ref = useRef(null)
  const formRef = useRef(null)
  const isInView = useInView(ref, { once: true })
  const isFormInView = useInView(formRef, { once: true })
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
  const isAr = language === 'ar'

  const contactCards = [
    { icon: Phone, titleFr: "Téléphone", titleAr: "الهاتف", value: "+212 671 013 099", subFr: "Lundi – Samedi, 9h–19h", subAr: "الإثنين – السبت، 9ص–7م", href: "tel:+212671013099", bg: "#70b62b" },
    { icon: Mail, titleFr: "Email", titleAr: "البريد الإلكتروني", value: "top7green@gmail.com", subFr: "Réponse sous 24h", subAr: "رد خلال 24 ساعة", href: "mailto:top7green@gmail.com", bg: "#254633" },
    { icon: MapPin, titleFr: "Adresse", titleAr: "العنوان", value: "Agadir, Maroc", subFr: "Livraison dans tout le Maroc", subAr: "التوصيل في جميع أنحاء المغرب", href: "https://maps.google.com/?q=Agadir,Maroc", bg: "#066532" },
    { icon: Clock, titleFr: "Horaires", titleAr: "ساعات العمل", value: "9h – 19h", subFr: "Lundi au Samedi", subAr: "الإثنين إلى السبت", href: null, bg: "#70b62b" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <PageLayout
      title={isAr ? "تواصل | معنا" : "Contactez | Nous"}
      subtitle={isAr ? "نحن هنا للمساعدة. لا تتردد في التواصل معنا بأي من الطرق أدناه." : "Nous sommes là pour vous aider. N'hésitez pas à nous contacter."}
      breadcrumb={isAr ? "تواصل" : "Contact"}
      videoSrc="/videos/contact.mp4"
    >
      {/* Contact Cards */}
      <section className="py-16 md:py-24 bg-white" ref={ref}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactCards.map((card, index) => (
              <motion.div key={card.titleFr} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -6 }}>
                {card.href ? (
                  <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#254633]/5 group h-full">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${card.bg}15` }}>
                      <card.icon className="h-7 w-7" style={{ color: card.bg }} />
                    </div>
                    <span className="text-xs text-[#254633]/50 uppercase tracking-widest mb-1">{isAr ? card.titleAr : card.titleFr}</span>
                    <span className="font-bold text-[#254633] mb-1">{card.value}</span>
                    <span className="text-xs text-[#254633]/60">{isAr ? card.subAr : card.subFr}</span>
                  </a>
                ) : (
                  <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-md border border-[#254633]/5 h-full">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: `${card.bg}15` }}>
                      <card.icon className="h-7 w-7" style={{ color: card.bg }} />
                    </div>
                    <span className="text-xs text-[#254633]/50 uppercase tracking-widest mb-1">{isAr ? card.titleAr : card.titleFr}</span>
                    <span className="font-bold text-[#254633] mb-1">{card.value}</span>
                    <span className="text-xs text-[#254633]/60">{isAr ? card.subAr : card.subFr}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Form + WhatsApp */}
          <div className={`grid lg:grid-cols-2 gap-12 items-start ${isRTL ? 'direction-rtl' : ''}`} ref={formRef}>
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: isRTL ? 50 : -50 }} animate={isFormInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}
              className={isRTL ? 'text-right font-arabic' : ''}>
              <span className="text-sm font-medium text-[#70b62b] tracking-widest uppercase mb-3 block">
                {isAr ? 'النموذج' : 'Formulaire'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#254633] mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
                {isAr ? 'أرسل لنا رسالة' : 'Envoyez-nous un Message'}
              </h2>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-[#70b62b]/10 flex items-center justify-center mb-5">
                    <CheckCircle2 className="h-10 w-10 text-[#70b62b]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#254633] mb-2">{isAr ? 'تم إرسال رسالتك!' : 'Message Envoyé !'}</h3>
                  <p className="text-[#254633]/60">{isAr ? 'سنرد عليك خلال 24 ساعة.' : 'Nous vous répondrons dans les 24 heures.'}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#254633] mb-2">{isAr ? 'الاسم الكامل *' : 'Nom complet *'}</label>
                      <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl border border-[#254633]/20 focus:outline-none focus:border-[#70b62b] focus:ring-2 focus:ring-[#70b62b]/20 transition-all text-[#254633] ${isRTL ? 'text-right' : ''}`}
                        placeholder={isAr ? 'اسمك' : 'Votre nom'} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#254633] mb-2">{isAr ? 'الهاتف' : 'Téléphone'}</label>
                      <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl border border-[#254633]/20 focus:outline-none focus:border-[#70b62b] focus:ring-2 focus:ring-[#70b62b]/20 transition-all text-[#254633] ${isRTL ? 'text-right' : ''}`}
                        placeholder="+212 6xx xxx xxx" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#254633] mb-2">{isAr ? 'البريد الإلكتروني *' : 'Email *'}</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl border border-[#254633]/20 focus:outline-none focus:border-[#70b62b] focus:ring-2 focus:ring-[#70b62b]/20 transition-all text-[#254633] ${isRTL ? 'text-right' : ''}`}
                      placeholder={isAr ? 'بريدك@example.com' : 'votre@email.com'} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#254633] mb-2">{isAr ? 'الرسالة *' : 'Message *'}</label>
                    <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl border border-[#254633]/20 focus:outline-none focus:border-[#70b62b] focus:ring-2 focus:ring-[#70b62b]/20 transition-all text-[#254633] resize-none ${isRTL ? 'text-right' : ''}`}
                      placeholder={isAr ? 'كيف يمكننا مساعدتك؟' : 'Comment pouvons-nous vous aider ?'} />
                  </div>
                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 bg-[#254633] hover:bg-[#70b62b] text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Send className="h-5 w-5" />
                    {isAr ? 'إرسال الرسالة' : 'Envoyer le message'}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* WhatsApp + Map */}
            <motion.div initial={{ opacity: 0, x: isRTL ? -50 : 50 }} animate={isFormInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}
              className={`space-y-8 ${isRTL ? 'text-right font-arabic' : ''}`}>
              <div>
                <span className="text-sm font-medium text-[#70b62b] tracking-widest uppercase mb-3 block">{isAr ? 'رد سريع' : 'Réponse Rapide'}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#254633] mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {isAr ? 'تحدث معنا' : 'Chattez avec Nous'}
                </h2>
                <p className="text-[#254633]/60 leading-relaxed mb-8">
                  {isAr ? 'للحصول على رد سريع، تواصل معنا عبر واتساب. فريقنا متاح من الإثنين إلى السبت من 9 صباحًا حتى 7 مساءً.' : 'Pour une réponse rapide, contactez-nous directement sur WhatsApp. Notre équipe est disponible du lundi au samedi de 9h à 19h.'}
                </p>
              </div>

              <motion.a href="https://wa.me/212671013099" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-6 p-7 bg-[#25D366] text-white rounded-3xl shadow-xl shadow-[#25D366]/20 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-9 w-9" />
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <div className="font-bold text-xl mb-1">WhatsApp</div>
                  <div className="text-white/80 text-sm">+212 671 013 099</div>
                  <div className="text-white/70 text-xs mt-1">{isAr ? 'رد في دقائق' : 'Réponse en quelques minutes'}</div>
                </div>
              </motion.a>

            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
