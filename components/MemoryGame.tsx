'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { ArrowLeft, Trophy, Timer, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

type CardType = {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

const EMOJIS = ['🎯', '🚀', '💎', '🌟', '🎨', '🎪', '🎭', '🎪', '🌈', '🦄', '🔮', '⚡']

export default function MemoryGame({ onBack }: { onBack: () => void }) {
  const [cards, setCards] = useState<CardType[]>([])
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [highScore, setHighScore] = useState(0)

  // Initialize game
  const initializeGame = useCallback(() => {
    const shuffledEmojis = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }))
    setCards(shuffledEmojis)
    setSelectedCards([])
    setMoves(0)
    setMatches(0)
    setScore(0)
    setGameComplete(false)
    setTimeElapsed(0)
  }, [])

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem('memoryGameHighScore')
    if (saved) setHighScore(parseInt(saved))
  }, [])

  // Initialize game on mount
  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (!gameComplete) {
        setTimeElapsed(prev => prev + 1)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [gameComplete])

  // Handle card click
  const handleCardClick = (id: number) => {
    if (isProcessing || selectedCards.length >= 2) return
    if (cards[id].isFlipped || cards[id].isMatched) return

    const newCards = [...cards]
    newCards[id].isFlipped = true
    setCards(newCards)
    setSelectedCards([...selectedCards, id])

    if (selectedCards.length === 1) {
      setIsProcessing(true)
      setMoves(moves + 1)
      
      // Check for match
      setTimeout(() => {
        if (cards[selectedCards[0]].emoji === cards[id].emoji) {
          // Match found!
          newCards[selectedCards[0]].isMatched = true
          newCards[id].isMatched = true
          setMatches(matches + 1)
          const newScore = score + (1000 - timeElapsed * 10) + (matches * 100)
          setScore(newScore)
          
          // Check if game is complete
          if (matches + 1 === EMOJIS.length) {
            setGameComplete(true)
            if (newScore > highScore) {
              setHighScore(newScore)
              localStorage.setItem('memoryGameHighScore', newScore.toString())
            }
            // Celebration!
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            })
          }
        } else {
          // No match
          newCards[selectedCards[0]].isFlipped = false
          newCards[id].isFlipped = false
        }
        setCards(newCards)
        setSelectedCards([])
        setIsProcessing(false)
      }, 1000)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>
        
        <div className="flex gap-6 text-white">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            <span className="font-mono text-xl">{formatTime(timeElapsed)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span className="font-mono text-xl">移動: {moves}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span className="font-mono text-xl">スコア: {score}</span>
          </div>
        </div>
      </div>

      {highScore > 0 && (
        <div className="text-center mb-4 text-yellow-400 text-lg">
          ハイスコア: {highScore}
        </div>
      )}

      <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-8">
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className={`aspect-square flex items-center justify-center text-4xl md:text-5xl cursor-pointer transition-all duration-300 ${
                  card.isFlipped || card.isMatched
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                    : 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700'
                } ${card.isMatched ? 'ring-4 ring-green-400 scale-95' : ''}`}
                onClick={() => handleCardClick(card.id)}
              >
                <motion.div
                  initial={false}
                  animate={{ 
                    rotateY: card.isFlipped || card.isMatched ? 0 : 180,
                    scale: card.isMatched ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {(card.isFlipped || card.isMatched) ? (
                    <motion.span
                      animate={card.isMatched ? {
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.2, 1.2, 1]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {card.emoji}
                    </motion.span>
                  ) : (
                    <span className="text-gray-500">?</span>
                  )}
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {gameComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            🎉 おめでとう！ 🎉
          </h2>
          <p className="text-xl text-gray-300 mb-2">
            {moves}回の移動で全てのペアを見つけました！
          </p>
          <p className="text-2xl text-yellow-400 font-bold mb-6">
            最終スコア: {score}
          </p>
          <Button 
            size="lg"
            onClick={initializeGame}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          >
            もう一度プレイ
          </Button>
        </motion.div>
      )}
    </div>
  )
}