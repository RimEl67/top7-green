"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight, Package, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { useLanguageStore, translations } from "@/lib/language-store"

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false)
  const store = useCartStore()
  const { language, isRTL } = useLanguageStore()
  const t = translations[language].cart

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = store

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: isRTL ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed ${isRTL ? 'left-0' : 'right-0'} top-0 bottom-0 z-[95] w-full max-w-md bg-white shadow-2xl flex flex-col ${isRTL ? 'font-arabic' : ''}`}
          >
            {/* Header */}
            <div className={`p-6 border-b border-[#254633]/10 ${isRTL ? 'text-right' : ''}`}>
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-full bg-[#70b62b]/10 flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-[#70b62b]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#254633]">{t.title}</h2>
                    <p className="text-sm text-[#254633]/60">
                      {getTotalItems()} {language === 'ar' ? 'منتجات' : 'article'}{getTotalItems() > 1 && language === 'fr' ? "s" : ""}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeCart}
                  className="w-10 h-10 rounded-full bg-[#f8f0da] flex items-center justify-center text-[#254633] hover:text-[#70b62b] transition-colors"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-[#f8f0da] flex items-center justify-center mb-6">
                    <Package className="h-12 w-12 text-[#254633]/30" />
                  </div>
                  <h3 className="text-xl font-bold text-[#254633] mb-2">
                    {t.empty}
                  </h3>
                  <p className="text-[#254633]/60 mb-6">
                    {t.emptyDesc}
                  </p>
                  <Button
                    onClick={closeCart}
                    className="bg-[#066532] hover:bg-[#254633] text-white rounded-full px-6"
                  >
                    {t.continueShopping}
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRTL ? 50 : -50, height: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex gap-4 p-4 bg-[#f8f0da]/30 rounded-2xl border border-[#254633]/5 ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        {/* Image */}
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={language === 'ar' ? item.nameAr : item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                          <div className={`flex items-start justify-between gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div>
                              <h4 className="font-bold text-[#254633] truncate">
                                {language === 'ar' ? item.nameAr : item.name}
                              </h4>
                              <p className="text-xs text-[#70b62b] font-sans">
                                {language === 'ar' ? item.name : item.nameAr}
                              </p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.id)}
                              className="text-red-400 hover:text-red-500 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </motion.button>
                          </div>

                          <div className={`flex items-center justify-between mt-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            {/* Quantity controls */}
                            <div className={`flex items-center gap-2 bg-white rounded-full p-1 shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-7 h-7 rounded-full bg-[#f8f0da] flex items-center justify-center text-[#254633]"
                              >
                                <Minus className="h-3 w-3" />
                              </motion.button>
                              <span className="w-6 text-center font-bold text-[#254633] text-sm">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-7 h-7 rounded-full bg-[#f8f0da] flex items-center justify-center text-[#254633]"
                              >
                                <Plus className="h-3 w-3" />
                              </motion.button>
                            </div>


                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Clear cart */}
                  {items.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={clearCart}
                      className="w-full py-3 text-sm text-red-400 hover:text-red-500 transition-colors"
                    >
                      {language === 'ar' ? 'تفريغ السلة' : 'Vider le panier'}
                    </motion.button>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 border-t border-[#254633]/10 bg-white ${isRTL ? 'text-right' : ''}`}
              >
                {/* Shipping */}
                <div className={`flex items-center justify-between text-sm mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-[#254633]/60">{t.shipping}</span>
                  <span className="text-[#70b62b] font-bold">{t.free}</span>
                </div>

                {/* Checkout button */}
                <Button className={`w-full bg-[#066532] hover:bg-[#254633] text-white py-6 rounded-xl text-lg font-semibold shadow-xl shadow-[#066532]/25 group ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{t.checkout}</span>
                  {isRTL ? <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                </Button>

                {/* Trust message */}
                <p className="text-center text-xs text-[#254633]/50 mt-4">
                  {language === 'ar' ? 'طلب آمن - شحن مجاني' : 'Traitement sécurisé - Livraison gratuite'}
                </p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

