import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { InteractiveSection } from './InteractiveSection'

jest.mock('framer-motion', () => {
  const MockDiv = React.forwardRef<HTMLDivElement, any>(({ children, initial, animate, exit, whileInView, transition, viewport, ...props }, ref) => (
    <div ref={ref} {...props}>{children}</div>
  ))
  MockDiv.displayName = 'MotionDiv'
  
  return {
    motion: {
      div: MockDiv
    },
    AnimatePresence: ({ children, mode }: any) => <>{children}</>
  }
})

jest.mock('./Button', () => ({
  Button: ({ children, onClick, size, variant, className, ...props }: any) => (
    <button 
      onClick={onClick} 
      className={className} 
      data-size={size} 
      data-variant={variant} 
      {...props}
    >
      {children}
    </button>
  )
}))

jest.mock('./Card', () => ({
  Card: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>{children}</div>
  )
}))

describe('InteractiveSection Component', () => {
  it('should render the section title and subtitle', () => {
    render(<InteractiveSection />)
    expect(screen.getByText('ユーザーの声')).toBeInTheDocument()
    expect(screen.getByText('実際に利用されている方々からのフィードバック')).toBeInTheDocument()
  })

  it('should render the first testimonial by default', () => {
    render(<InteractiveSection />)
    expect(screen.getByText('田中 太郎')).toBeInTheDocument()
    expect(screen.getByText('プロダクトマネージャー')).toBeInTheDocument()
    expect(screen.getByText(/この技術スタックは本当に素晴らしい。開発速度が格段に向上しました。/)).toBeInTheDocument()
    expect(screen.getByText('🧑‍💼')).toBeInTheDocument()
  })

  it('should show next testimonial when next button is clicked', () => {
    render(<InteractiveSection />)
    const nextButton = screen.getAllByRole('button')[1]
    
    fireEvent.click(nextButton)
    
    expect(screen.getByText('佐藤 花子')).toBeInTheDocument()
    expect(screen.getByText('フロントエンドエンジニア')).toBeInTheDocument()
    expect(screen.getByText(/TypeScriptとTailwindの組み合わせは最高です。保守性も抜群。/)).toBeInTheDocument()
    expect(screen.getByText('👩‍💻')).toBeInTheDocument()
  })

  it('should show previous testimonial when prev button is clicked', () => {
    render(<InteractiveSection />)
    const prevButton = screen.getAllByRole('button')[0]
    
    fireEvent.click(prevButton)
    
    expect(screen.getByText('鈴木 一郎')).toBeInTheDocument()
    expect(screen.getByText('UXデザイナー')).toBeInTheDocument()
    expect(screen.getByText(/美しいUIと優れたパフォーマンス。ユーザー体験が劇的に改善されました。/)).toBeInTheDocument()
    expect(screen.getByText('🧑‍🎨')).toBeInTheDocument()
  })

  it('should cycle through all testimonials', () => {
    render(<InteractiveSection />)
    const nextButton = screen.getAllByRole('button')[1]
    
    fireEvent.click(nextButton)
    expect(screen.getByText('佐藤 花子')).toBeInTheDocument()
    
    fireEvent.click(nextButton)
    expect(screen.getByText('鈴木 一郎')).toBeInTheDocument()
    
    fireEvent.click(nextButton)
    expect(screen.getByText('田中 太郎')).toBeInTheDocument()
  })

  it('should render navigation dots', () => {
    const { container } = render(<InteractiveSection />)
    const dots = container.querySelectorAll('.h-2.w-2.rounded-full')
    
    expect(dots).toHaveLength(3)
  })

  it('should highlight active dot', () => {
    const { container } = render(<InteractiveSection />)
    const dots = container.querySelectorAll('.h-2.w-2.rounded-full')
    
    expect(dots[0]).toHaveClass('bg-purple-600')
    expect(dots[1]).toHaveClass('bg-gray-300')
    expect(dots[2]).toHaveClass('bg-gray-300')
  })

  it('should update active dot when navigating', () => {
    const { container } = render(<InteractiveSection />)
    const nextButton = screen.getAllByRole('button')[1]
    
    fireEvent.click(nextButton)
    
    const dots = container.querySelectorAll('.h-2.w-2.rounded-full')
    expect(dots[0]).toHaveClass('bg-gray-300')
    expect(dots[1]).toHaveClass('bg-purple-600')
    expect(dots[2]).toHaveClass('bg-gray-300')
  })

  it('should have proper section structure', () => {
    const { container } = render(<InteractiveSection />)
    const section = container.querySelector('section')
    
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('py-20', 'px-4', 'max-w-7xl', 'mx-auto')
  })

  it('should render navigation buttons with correct icons', () => {
    render(<InteractiveSection />)
    const buttons = screen.getAllByRole('button')
    
    expect(buttons[0]).toHaveAttribute('data-size', 'icon')
    expect(buttons[0]).toHaveAttribute('data-variant', 'outline')
    expect(buttons[1]).toHaveAttribute('data-size', 'icon')
    expect(buttons[1]).toHaveAttribute('data-variant', 'outline')
  })

  it('should wrap to last testimonial when clicking prev on first', () => {
    render(<InteractiveSection />)
    const prevButton = screen.getAllByRole('button')[0]
    
    fireEvent.click(prevButton)
    
    expect(screen.getByText('鈴木 一郎')).toBeInTheDocument()
  })

  it('should wrap to first testimonial when clicking next on last', () => {
    render(<InteractiveSection />)
    const nextButton = screen.getAllByRole('button')[1]
    
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)
    
    expect(screen.getByText('田中 太郎')).toBeInTheDocument()
  })

  it('should have proper heading hierarchy', () => {
    render(<InteractiveSection />)
    
    const mainHeading = screen.getByRole('heading', { level: 2, name: 'ユーザーの声' })
    expect(mainHeading).toBeInTheDocument()
    
    const testimonialName = screen.getByRole('heading', { level: 3, name: '田中 太郎' })
    expect(testimonialName).toBeInTheDocument()
  })
})