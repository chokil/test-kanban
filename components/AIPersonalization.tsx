"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Sparkles, Zap, Heart, Star, TrendingUp } from "lucide-react"

interface PersonalityTrait {
  icon: React.ReactNode
  label: string
  value: number
  color: string
}

export function AIPersonalization() {
  const [userName, setUserName] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [personality, setPersonality] = useState<PersonalityTrait[]>([])
  const [recommendation, setRecommendation] = useState("")

  const analyzePersonality = () => {
    setAnalyzing(true)
    
    setTimeout(() => {
      const traits = [
        { icon: <Brain />, label: "創造性", value: Math.random() * 100, color: "#ff0080" },
        { icon: <Zap />, label: "行動力", value: Math.random() * 100, color: "#00ffff" },
        { icon: <Heart />, label: "共感性", value: Math.random() * 100, color: "#ff00ff" },
        { icon: <Star />, label: "革新性", value: Math.random() * 100, color: "#ffff00" },
        { icon: <TrendingUp />, label: "成長志向", value: Math.random() * 100, color: "#00ff00" },
      ]
      
      setPersonality(traits)
      
      const topTrait = traits.reduce((prev, current) => 
        prev.value > current.value ? prev : current
      )
      
      const recommendations = {
        "創造性": "あなたの創造的な思考を活かして、新しいプロジェクトに挑戦してみましょう！",
        "行動力": "その素晴らしい行動力で、今すぐ新しいスキルの習得を始めましょう！",
        "共感性": "あなたの共感力を活かして、チームでのコラボレーションを楽しんでください！",
        "革新性": "革新的なアイデアで、世界を変えるサービスを作り出しましょう！",
        "成長志向": "常に成長を求めるあなたに、最新技術の学習をおすすめします！"
      }
      
      setRecommendation(recommendations[topTrait.label as keyof typeof recommendations])
      setAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg p-8 backdrop-blur-sm border border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-8 h-8 text-yellow-400" />
        <h3 className="text-2xl font-bold text-white">AI パーソナリティ分析</h3>
      </div>
      
      {!personality.length ? (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="あなたの名前を入力してください"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && userName && analyzePersonality()}
          />
          <button
            onClick={analyzePersonality}
            disabled={!userName || analyzing}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {analyzing ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="w-5 h-5" />
                </motion.div>
                分析中...
              </span>
            ) : (
              "パーソナリティを分析"
            )}
          </button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <p className="text-white text-lg">
              こんにちは、<span className="font-bold text-yellow-400">{userName}</span>さん！
            </p>
            
            <div className="space-y-3">
              {personality.map((trait, index) => (
                <motion.div
                  key={trait.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center" style={{ color: trait.color }}>
                    {trait.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-white">{trait.label}</span>
                      <span className="text-white/60">{Math.round(trait.value)}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${trait.value}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: trait.color }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-white/20"
            >
              <p className="text-white/90">
                <span className="font-bold text-yellow-400">AIからのおすすめ:</span><br />
                {recommendation}
              </p>
            </motion.div>
            
            <button
              onClick={() => {
                setPersonality([])
                setUserName("")
              }}
              className="text-white/60 hover:text-white text-sm underline"
            >
              もう一度分析する
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}