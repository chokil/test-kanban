'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-gradient-to-b from-purple-900 to-black">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: y1, scale, opacity }}
      >
        <div className="text-center">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-4">
            無限の可能性
          </h2>
          <p className="text-xl md:text-2xl text-purple-200">
            スクロールで変化する世界
          </p>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-pink-500 rounded-full blur-xl"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500 rounded-full blur-xl"
        style={{ y: y3 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500 rounded-full blur-lg"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-36 h-36 bg-green-500 rounded-full blur-xl"
        style={{ y: y2 }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    </section>
  );
}