"use client"

import { motion } from "framer-motion"
import { Button } from "./Button"
import { ArrowRight, Sparkles, Gamepad2 } from "lucide-react"
import { ANIMATION_DELAY, GRADIENTS } from "@/lib/constants"
import { fadeInUp } from "@/lib/animations"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950 animate-gradient" />
      
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: `${ANIMATION_DELAY.typing}ms` }} />
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: `${ANIMATION_DELAY.fadeIn}ms` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8 }}
        >
          <h1 className={`text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${GRADIENTS.primary} mb-6`}>
            次世代のWeb体験
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            最新技術を駆使した、美しく高速なウェブサイトをご体験ください
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="group">
            <Sparkles className="mr-2 h-4 w-4" />
            はじめる
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Link href="/game">
            <Button size="lg" variant="outline" className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700">
              <Gamepad2 className="mr-2 h-4 w-4" />
              ゲームで遊ぶ
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            詳しく見る
          </Button>
        </motion.div>
      </div>
    </section>
  )
}