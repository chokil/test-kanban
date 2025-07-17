'use client'

import { useState } from 'react'
import MemoryGame from '@/components/MemoryGame'
import { Button } from '@/components/Button'
import Link from 'next/link'
import { Home } from 'lucide-react'

export default function GamePage() {
  const [gameStarted, setGameStarted] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Home className="mr-2 h-4 w-4" />
                ホームに戻る
              </Button>
            </Link>
          </div>

          {!gameStarted ? (
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-pulse">
                マジカルメモリー
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                驚異的な記憶力チャレンジ！<br/>
                同じカードのペアを見つけて、最高記録に挑戦しよう！
              </p>
              <Button 
                size="lg"
                onClick={() => setGameStarted(true)}
                className="text-xl px-8 py-6 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 transform hover:scale-105 transition-all duration-300"
              >
                ゲームスタート
              </Button>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">🎯 簡単操作</h3>
                  <p className="text-gray-300">カードをクリックするだけ！直感的な操作で誰でも楽しめます。</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-green-400 mb-2">⚡ スピード勝負</h3>
                  <p className="text-gray-300">時間との戦い！素早くペアを見つけて高得点を目指そう。</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">🏆 ランキング</h3>
                  <p className="text-gray-300">ハイスコアに挑戦！あなたの記録は保存されます。</p>
                </div>
              </div>
            </div>
          ) : (
            <MemoryGame onBack={() => setGameStarted(false)} />
          )}
        </div>
      </div>
    </div>
  )
}