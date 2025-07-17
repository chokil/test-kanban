"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./Button"
import { Card } from "./Card"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "田中 太郎",
    role: "プロダクトマネージャー",
    content: "この技術スタックは本当に素晴らしい。開発速度が格段に向上しました。",
    avatar: "🧑‍💼",
  },
  {
    name: "佐藤 花子",
    role: "フロントエンドエンジニア",
    content: "TypeScriptとTailwindの組み合わせは最高です。保守性も抜群。",
    avatar: "👩‍💻",
  },
  {
    name: "鈴木 一郎",
    role: "UXデザイナー",
    content: "美しいUIと優れたパフォーマンス。ユーザー体験が劇的に改善されました。",
    avatar: "🧑‍🎨",
  },
]

export function InteractiveSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">ユーザーの声</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          実際に利用されている方々からのフィードバック
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 text-center">
              <div className="text-6xl mb-4">{testimonials[currentIndex].avatar}</div>
              <p className="text-lg mb-6 italic">"{testimonials[currentIndex].content}"</p>
              <h3 className="font-semibold text-xl">{testimonials[currentIndex].name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{testimonials[currentIndex].role}</p>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            size="icon"
            variant="outline"
            onClick={prevTestimonial}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-purple-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>

          <Button
            size="icon"
            variant="outline"
            onClick={nextTestimonial}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}