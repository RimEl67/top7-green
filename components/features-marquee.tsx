"use client"

import { motion } from "framer-motion"
import { Leaf, Truck, Shield, Award, Recycle, Heart } from "lucide-react"
import { useLanguageStore } from "@/lib/language-store"

const featuresFr = [
  { icon: Leaf, text: "100% Naturel" },
  { icon: Truck, text: "Livraison Gratuite dès 200 DH" },
  { icon: Shield, text: "Paiement Sécurisé" },
  { icon: Award, text: "Qualité Certifiée" },
  { icon: Recycle, text: "Éco-Responsable" },
  { icon: Heart, text: "Satisfaction Garantie" },
]
const featuresAr = [
  { icon: Leaf, text: "100% طبيعي" },
  { icon: Truck, text: "شحن مجاني من 200 درهم" },
  { icon: Shield, text: "دفع آمن" },
  { icon: Award, text: "جودة معتمدة" },
  { icon: Recycle, text: "صديق للبيئة" },
  { icon: Heart, text: "ضمان الرضا" },
]

export default function FeaturesMarquee() {
  const { language } = useLanguageStore()
  const features = language === 'ar' ? featuresAr : featuresFr

  return (
    <section className="py-3 bg-[#066532] overflow-hidden">
      <div className="relative">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" } }}
          className="flex items-center gap-12 whitespace-nowrap"
        >
          {[...features, ...features, ...features, ...features].map((feature, index) => (
            <div key={index} className="flex items-center gap-3 text-white/90">
              <feature.icon className="h-5 w-5 text-[#70b62b]" />
              <span className="font-medium text-sm">{feature.text}</span>
              <span className="w-2 h-2 rounded-full bg-[#70b62b]/50" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
