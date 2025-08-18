"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "./Button"
import { Menu, X } from "lucide-react"
import { SCROLL_THRESHOLD, Z_INDEX, GRADIENTS } from "@/lib/constants"
import { fadeInUp } from "@/lib/animations"
import { NavItem } from "@/lib/types"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems: NavItem[] = [
    { name: "ホーム", href: "#home" },
    { name: "機能", href: "#features" },
    { name: "ゲーム", href: "/game" },
    { name: "価格", href: "#pricing" },
    { name: "お問い合わせ", href: "#contact" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
      style={{ zIndex: Z_INDEX.navigation }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${GRADIENTS.primary}`}>
              ModernWeb
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <Button size="sm">ログイン</Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="px-4 pt-2 pb-3 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              >
                {item.name}
              </a>
            ))}
            <Button size="sm" className="w-full">ログイン</Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}