"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./Button"
import { Card } from "./Card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Testimonial } from "@/lib/types"
import { slideInFromRight } from "@/lib/animations"

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "田中 太郎",
    role: "プロダクトマネージャー",
    content: "この技術スタックは本当に素晴らしい。開発速度が格段に向上しました。",
    avatar: "🧑‍💼",
  },
  {
    id: 2,
    name: "佐藤 花子",
    role: "フロントエンドエンジニア",
    content: "TypeScriptとTailwindの組み合わせは最高です。保守性も抜群。",
    avatar: "👩‍💻",
  },
  {
    id: 3,
    name: "鈴木 一郎",
    role: "UXデザイナー",
    content: "美しいUIと優れたパフォーマンス。ユーザー体験が劇的に改善されました。",
    avatar: "🧑‍🎨",
  },
]

export function InteractiveSection() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonialData.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonialData.length) % testimonialData.length)
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
            key={currentTestimonialIndex}
            variants={slideInFromRight}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 text-center">
              <div className="text-6xl mb-4">{testimonialData[currentTestimonialIndex].avatar}</div>
              <p className="text-lg mb-6 italic">&ldquo;{testimonialData[currentTestimonialIndex].content}&rdquo;</p>
              <h3 className="font-semibold text-xl">{testimonialData[currentTestimonialIndex].name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{testimonialData[currentTestimonialIndex].role}</p>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            size="icon"
            variant="outline"
            onClick={prevTestimonial}
            className="rounded-full"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex gap-2">
            {testimonialData.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentTestimonialIndex
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
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}