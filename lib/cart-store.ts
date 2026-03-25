"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Product {
  id: number
  name: string
  nameAr: string
  description: string
  descriptionAr?: string
  longDescription?: string
  longDescriptionAr?: string
  price: number
  originalPrice: number | null
  image: string
  images?: string[]
  rating: number
  reviews: number
  badge: string | null
  badgeAr?: string | null
  badgeColor: string | null
  category?: string
  categoryAr?: string
  benefits?: string[]
  benefitsAr?: string[]
  usage?: string
  usageAr?: string
  ingredients?: string[]
  ingredientsAr?: string[]
  weight?: string
  videoUrl?: string
  videoDescription?: string
  videoDescriptionAr?: string
}

export interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  selectedProduct: Product | null
  isProductModalOpen: boolean
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  openProductModal: (product: Product) => void
  closeProductModal: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      selectedProduct: null,
      isProductModalOpen: false,

      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }
          return { items: [...state.items, { ...product, quantity: 1 }] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.id !== productId) }
          }
          return {
            items: state.items.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
          }
        })
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      openProductModal: (product) => set({ selectedProduct: product, isProductModalOpen: true }),
      closeProductModal: () => set({ selectedProduct: null, isProductModalOpen: false }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
    }),
    {
      name: "top7green-cart",
    }
  )
)
