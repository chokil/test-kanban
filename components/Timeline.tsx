"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollAnimation } from "./ScrollAnimation"

const timelineData = [
  {
    id: 1,
    year: "2024",
    title: "革新的な技術の導入",
    description: "最新のWeb技術を駆使して、ユーザー体験を根本から変革します。AIとの統合により、パーソナライズされた体験を提供。",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    year: "2025",
    title: "グローバル展開",
    description: "世界中のユーザーに最高の体験を届けるため、多言語対応とローカライゼーションを強化。",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    year: "2026",
    title: "次世代プラットフォーム",
    description: "XR技術やメタバースとの統合により、現実と仮想の境界を越えた体験を創造。",
    color: "from-green-500 to-emerald-500"
  }
]

export function Timeline() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            未来への道のり
          </h2>
        </ScrollAnimation>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-gray-300 to-gray-100"></div>

          {timelineData.map((item, index) => (
            <ScrollAnimation key={item.id} delay={index * 0.2}>
              <motion.div
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex-1">
                  <motion.div
                    className={`bg-white p-6 rounded-2xl shadow-lg cursor-pointer ${
                      selectedItem === item.id ? "shadow-2xl" : ""
                    }`}
                    onClick={() => setSelectedItem(item.id === selectedItem ? null : item.id)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.year}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    
                    <AnimatePresence>
                      {selectedItem === item.id && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-gray-600 mt-3"
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                <div className="w-4 h-4 bg-white border-4 border-purple-500 rounded-full absolute left-1/2 transform -translate-x-1/2 z-10"></div>
                
                <div className="flex-1"></div>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}