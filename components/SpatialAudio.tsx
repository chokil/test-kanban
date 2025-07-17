"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX, Music, Headphones } from "lucide-react"

interface AudioNode {
  id: number
  x: number
  y: number
  frequency: number
  active: boolean
}

export function SpatialAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioNodes, setAudioNodes] = useState<AudioNode[]>([])
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<Map<number, OscillatorNode>>(new Map())
  const gainNodesRef = useRef<Map<number, GainNode>>(new Map())
  
  useEffect(() => {
    const nodes: AudioNode[] = [
      { id: 1, x: 20, y: 20, frequency: 440, active: false },
      { id: 2, x: 80, y: 20, frequency: 554, active: false },
      { id: 3, x: 50, y: 50, frequency: 659, active: false },
      { id: 4, x: 20, y: 80, frequency: 880, active: false },
      { id: 5, x: 80, y: 80, frequency: 1108, active: false },
    ]
    setAudioNodes(nodes)
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])
  
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }
  
  const toggleNode = (nodeId: number) => {
    initAudio()
    const audioContext = audioContextRef.current!
    
    setAudioNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, active: !node.active } : node
    ))
    
    const node = audioNodes.find(n => n.id === nodeId)
    if (!node) return
    
    if (!node.active) {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      const panner = audioContext.createPanner()
      
      oscillator.type = "sine"
      oscillator.frequency.value = node.frequency
      
      gainNode.gain.value = 0
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1)
      
      panner.setPosition((node.x - 50) / 10, 0, (node.y - 50) / 10)
      
      oscillator.connect(gainNode)
      gainNode.connect(panner)
      panner.connect(audioContext.destination)
      
      oscillator.start()
      
      oscillatorsRef.current.set(nodeId, oscillator)
      gainNodesRef.current.set(nodeId, gainNode)
    } else {
      const oscillator = oscillatorsRef.current.get(nodeId)
      const gainNode = gainNodesRef.current.get(nodeId)
      
      if (oscillator && gainNode) {
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1)
        setTimeout(() => {
          oscillator.stop()
          oscillator.disconnect()
          gainNode.disconnect()
          oscillatorsRef.current.delete(nodeId)
          gainNodesRef.current.delete(nodeId)
        }, 100)
      }
    }
  }
  
  const togglePlayAll = () => {
    if (!isPlaying) {
      audioNodes.forEach(node => {
        if (!node.active) {
          toggleNode(node.id)
        }
      })
    } else {
      audioNodes.forEach(node => {
        if (node.active) {
          toggleNode(node.id)
        }
      })
    }
    setIsPlaying(!isPlaying)
  }
  
  return (
    <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-lg p-8 backdrop-blur-sm border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Headphones className="w-8 h-8 text-purple-400" />
          <h3 className="text-2xl font-bold text-white">空間音響シンセサイザー</h3>
        </div>
        <button
          onClick={togglePlayAll}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          {isPlaying ? (
            <VolumeX className="w-6 h-6 text-white" />
          ) : (
            <Volume2 className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
      
      <div className="relative w-full h-96 bg-black/30 rounded-lg overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-0.5 p-4">
          {audioNodes.map((node) => (
            <motion.button
              key={node.id}
              onClick={() => toggleNode(node.id)}
              className="absolute w-16 h-16 rounded-full"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)"
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`
                  w-full h-full rounded-full flex items-center justify-center
                  ${node.active 
                    ? "bg-gradient-to-r from-purple-500 to-pink-500" 
                    : "bg-white/20 hover:bg-white/30"
                  }
                `}
                animate={node.active ? {
                  boxShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                    "0 0 40px rgba(236, 72, 153, 0.5)",
                    "0 0 20px rgba(168, 85, 247, 0.5)"
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Music className="w-6 h-6 text-white" />
              </motion.div>
              {node.active && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/20"
                  initial={{ scale: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>
        
        <div className="absolute bottom-4 left-4 text-white/70 text-sm">
          <p>クリックして音を再生・停止</p>
          <p>各ノードは異なる周波数と空間位置を持っています</p>
        </div>
      </div>
    </div>
  )
}