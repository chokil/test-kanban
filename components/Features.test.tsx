import React from 'react'
import { render, screen } from '@testing-library/react'
import { Features } from './Features'

jest.mock('framer-motion', () => {
  const MockDiv = React.forwardRef<HTMLDivElement, any>(({ children, initial, whileInView, transition, viewport, ...props }, ref) => (
    <div ref={ref} {...props}>{children}</div>
  ))
  MockDiv.displayName = 'MotionDiv'
  
  return {
    motion: {
      div: MockDiv
    }
  }
})

jest.mock('./Card', () => ({
  Card: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>{children}</div>
  )
}))

describe('Features Component', () => {
  it('should render the section title and subtitle', () => {
    render(<Features />)
    expect(screen.getByText('最先端の機能')).toBeInTheDocument()
    expect(screen.getByText('現代のWeb開発における最高の技術を結集')).toBeInTheDocument()
  })

  it('should render all 6 feature cards', () => {
    render(<Features />)
    
    expect(screen.getByText('超高速パフォーマンス')).toBeInTheDocument()
    expect(screen.getByText('セキュアな設計')).toBeInTheDocument()
    expect(screen.getByText('美しいデザイン')).toBeInTheDocument()
    expect(screen.getByText('レスポンシブ対応')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('コンポーネント設計')).toBeInTheDocument()
  })

  it('should render feature descriptions', () => {
    render(<Features />)
    
    expect(screen.getByText('Next.js 14の最新機能を活用し、圧倒的な速度を実現')).toBeInTheDocument()
    expect(screen.getByText('最新のセキュリティ標準に準拠した安全な実装')).toBeInTheDocument()
    expect(screen.getByText('Tailwind CSSによる洗練されたモダンなUI')).toBeInTheDocument()
    expect(screen.getByText('あらゆるデバイスで最適な表示を実現')).toBeInTheDocument()
    expect(screen.getByText('型安全性を保証する堅牢なコード')).toBeInTheDocument()
    expect(screen.getByText('再利用可能な効率的なアーキテクチャ')).toBeInTheDocument()
  })

  it('should have proper section structure', () => {
    const { container } = render(<Features />)
    const section = container.querySelector('section')
    
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('py-20', 'px-4', 'max-w-7xl', 'mx-auto')
  })

  it('should use grid layout for feature cards', () => {
    const { container } = render(<Features />)
    const grid = container.querySelector('.grid')
    
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-8')
  })

  it('should render feature icons within gradient backgrounds', () => {
    const { container } = render(<Features />)
    const iconContainers = container.querySelectorAll('.bg-gradient-to-br')
    
    expect(iconContainers).toHaveLength(6)
    iconContainers.forEach(container => {
      expect(container).toHaveClass('from-purple-500', 'to-pink-500')
    })
  })

  it('should have h2 heading for main title', () => {
    render(<Features />)
    const heading = screen.getByRole('heading', { level: 2, name: '最先端の機能' })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('text-4xl', 'font-bold')
  })

  it('should have h3 headings for feature titles', () => {
    render(<Features />)
    const featureTitles = [
      '超高速パフォーマンス',
      'セキュアな設計',
      '美しいデザイン',
      'レスポンシブ対応',
      'TypeScript',
      'コンポーネント設計'
    ]
    
    featureTitles.forEach(title => {
      const heading = screen.getByRole('heading', { level: 3, name: title })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass('text-xl', 'font-semibold')
    })
  })

  it('should render all features inside Card components', () => {
    const { container } = render(<Features />)
    const cards = container.querySelectorAll('.p-6.h-full')
    
    expect(cards).toHaveLength(6)
  })

  it('should have proper text styling for descriptions', () => {
    const { container } = render(<Features />)
    const descriptions = container.querySelectorAll('p.text-gray-600')
    
    expect(descriptions).toHaveLength(7)
  })
})