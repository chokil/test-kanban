'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const Experience3D = dynamic(() => import('./Experience3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-900 rounded-2xl flex items-center justify-center">
      <div className="text-white text-xl">Loading 3D Experience...</div>
    </div>
  ),
});

const AIChat = dynamic(() => import('./AIChat'), {
  ssr: false,
});

type ExperienceType = '3d' | 'ai' | 'gesture' | 'sound';

export default function ExperienceSection() {
  const [activeExperience, setActiveExperience] = useState<ExperienceType>('3d');

  const experiences = [
    {
      id: '3d' as ExperienceType,
      title: '3Dビジュアライゼーション',
      description: 'WebGLを使用したインタラクティブな3D体験',
      icon: '🎮',
    },
    {
      id: 'ai' as ExperienceType,
      title: 'AI対話システム',
      description: '次世代のAIアシスタントとの対話',
      icon: '🤖',
    },
    {
      id: 'gesture' as ExperienceType,
      title: 'ジェスチャーコントロール',
      description: '手の動きでインターフェースを操作',
      icon: '👋',
    },
    {
      id: 'sound' as ExperienceType,
      title: '空間オーディオ',
      description: '没入感のあるサウンドスケープ',
      icon: '🎵',
    },
  ];

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            未知の体験へようこそ
          </h2>
          <p className="text-xl text-gray-300">
            最先端技術による革新的なWeb体験
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {experiences.map((exp) => (
            <motion.button
              key={exp.id}
              onClick={() => setActiveExperience(exp.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 rounded-xl transition-all duration-300 ${
                activeExperience === exp.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
              }`}
            >
              <div className="text-4xl mb-3">{exp.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{exp.title}</h3>
              <p className="text-sm opacity-80">{exp.description}</p>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeExperience}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {activeExperience === '3d' && <Experience3D />}
            {activeExperience === 'ai' && <AIChat />}
            {activeExperience === 'gesture' && (
              <div className="w-full h-[600px] bg-gray-900 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">👋</div>
                  <h3 className="text-2xl font-bold mb-2">ジェスチャーコントロール</h3>
                  <p className="text-gray-400">カメラアクセスを許可して手の動きで操作</p>
                  <p className="text-sm text-gray-500 mt-4">（実装予定）</p>
                </div>
              </div>
            )}
            {activeExperience === 'sound' && (
              <div className="w-full h-[600px] bg-gray-900 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎵</div>
                  <h3 className="text-2xl font-bold mb-2">空間オーディオ体験</h3>
                  <p className="text-gray-400">3Dサウンドで没入感のある体験を</p>
                  <p className="text-sm text-gray-500 mt-4">（実装予定）</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}