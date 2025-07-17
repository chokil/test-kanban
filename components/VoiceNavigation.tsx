"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function VoiceNavigation() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [feedback, setFeedback] = useState('')
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'ja-JP'

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        setTranscript(transcript)

        if (event.results[current].isFinal) {
          handleCommand(transcript)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error)
        setIsListening(false)
        setFeedback('音声認識エラーが発生しました')
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const handleCommand = (command: string) => {
    const lowerCommand = command.toLowerCase()
    
    if (lowerCommand.includes('ホーム') || lowerCommand.includes('トップ')) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setFeedback('ホームに移動しました')
    } else if (lowerCommand.includes('機能')) {
      const element = document.querySelector('#features')
      element?.scrollIntoView({ behavior: 'smooth' })
      setFeedback('機能セクションに移動しました')
    } else if (lowerCommand.includes('ギャラリー')) {
      const element = document.querySelector('#gallery')
      element?.scrollIntoView({ behavior: 'smooth' })
      setFeedback('ギャラリーに移動しました')
    } else if (lowerCommand.includes('下') || lowerCommand.includes('スクロール')) {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
      setFeedback('下にスクロールしました')
    } else if (lowerCommand.includes('上')) {
      window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })
      setFeedback('上にスクロールしました')
    } else if (lowerCommand.includes('ダーク') || lowerCommand.includes('暗い')) {
      document.documentElement.classList.add('dark')
      setFeedback('ダークモードに切り替えました')
    } else if (lowerCommand.includes('ライト') || lowerCommand.includes('明るい')) {
      document.documentElement.classList.remove('dark')
      setFeedback('ライトモードに切り替えました')
    } else {
      setFeedback('コマンドが認識できませんでした')
    }

    setTimeout(() => {
      setFeedback('')
      setTranscript('')
    }, 3000)
  }

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setFeedback('音声認識がサポートされていません')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
    } else {
      recognitionRef.current.start()
      setIsListening(true)
      setTranscript('')
      setFeedback('お話しください...')
    }
  }

  return (
    <>
      <motion.button
        onClick={toggleListening}
        className={`fixed top-20 right-6 z-40 ${
          isListening
            ? 'bg-red-600 animate-pulse'
            : 'bg-gradient-to-r from-purple-600 to-pink-600'
        } text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {(transcript || feedback) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-36 right-6 z-40 max-w-sm"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4">
              {transcript && (
                <div className="mb-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">認識中:</p>
                  <p className="text-lg font-medium">{transcript}</p>
                </div>
              )}
              {feedback && (
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {feedback}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-24 right-6 z-40 text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 max-w-xs">
        <p className="font-semibold mb-1">音声コマンド例:</p>
        <ul className="space-y-1">
          <li>「ホームに移動」</li>
          <li>「機能を見せて」</li>
          <li>「下にスクロール」</li>
          <li>「ダークモード」</li>
        </ul>
      </div>
    </>
  )
}