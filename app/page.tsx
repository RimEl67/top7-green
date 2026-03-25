"use client"

import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import FeaturesMarquee from "@/components/features-marquee"
import CategoriesSection from "@/components/categories-section"
import ProductsSection from "@/components/products-section"
import AboutSection from "@/components/about-section"
import TestimonialsSection from "@/components/testimonials-section"
import NewsletterSection from "@/components/newsletter-section"
import NewsAndBlogsSection from "@/components/news-and-blogs-section"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import ProductModal from "@/components/product-modal"
import SmoothScrollProvider from "@/components/smooth-scroll-provider"

const Preloader = dynamic(() => import("@/components/preloader"), {
  ssr: false,
})

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Preloader />
      <main className="relative">
        <Navigation />
        <HeroSection />
        <FeaturesMarquee />
        <CategoriesSection />
        <ProductsSection />
        <AboutSection />
        <TestimonialsSection />
        <NewsAndBlogsSection />
        <NewsletterSection />
        <Footer />
        <CartDrawer />
        <ProductModal />
      </main>
    </SmoothScrollProvider>
  )
}
