import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import WebVitalsReporter from '@/components/WebVitalsReporter'
import PWARegister from '@/components/PWARegister'
import { ParticleBackground } from '@/components/ParticleBackground'
import { AIChatbot } from '@/components/AIChatbot'
import { CollaborativeWhiteboard } from '@/components/CollaborativeWhiteboard'
import { VoiceNavigation } from '@/components/VoiceNavigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern Web Experience',
  description: '最高の技術を使った最高のWebサイト',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Modern Web Experience',
    description: '最高の技術を使った最高のWebサイト',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <ParticleBackground />
        <WebVitalsReporter />
        <PWARegister />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded">
          メインコンテンツへスキップ
        </a>
        {children}
        <AIChatbot />
        <CollaborativeWhiteboard />
        <VoiceNavigation />
      </body>
    </html>
  )
}