"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { ScrollAnimation } from "./ScrollAnimation"

const testimonials = [
  {
    id: 1,
    name: "田中 太郎",
    role: "スタートアップCEO",
    content: "このプラットフォームのおかげで、私たちのビジネスは飛躍的に成長しました。ユーザー体験が素晴らしく、チーム全体の生産性が向上しています。",
    rating: 5,
    avatar: "🧑‍💼"
  },
  {
    id: 2,
    name: "佐藤 花子",
    role: "デザイナー",
    content: "直感的なインターフェースと美しいデザインに感動しました。クリエイティブな作業がこれまで以上に楽しくなりました。",
    rating: 5,
    avatar: "👩‍🎨"
  },
  {
    id: 3,
    name: "鈴木 一郎",
    role: "エンジニア",
    content: "技術的な観点から見ても、このサイトは最高水準です。パフォーマンスが素晴らしく、開発者として学ぶことがたくさんあります。",
    rating: 5,
    avatar: "👨‍💻"
  }
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            ユーザーの声
          </h2>
        </ScrollAnimation>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 md:p-12 rounded-3xl shadow-xl"
              >
                <div className="flex items-center mb-6">
                  <div className="text-5xl mr-4">{testimonials[currentIndex].avatar}</div>
                  <div>
                    <h3 className="text-xl font-bold">{testimonials[currentIndex].name}</h3>
                    <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  &ldquo;{testimonials[currentIndex].content}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-purple-500 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}