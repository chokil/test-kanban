import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Navigation } from './Navigation'

jest.mock('framer-motion', () => {
  const MockNav = React.forwardRef<HTMLElement, any>(({ children, initial, animate, transition, ...props }, ref) => (
    <nav ref={ref} {...props}>{children}</nav>
  ))
  MockNav.displayName = 'MotionNav'
  
  const MockDiv = React.forwardRef<HTMLDivElement, any>(({ children, initial, animate, ...props }, ref) => (
    <div ref={ref} {...props}>{children}</div>
  ))
  MockDiv.displayName = 'MotionDiv'
  
  return {
    motion: {
      nav: MockNav,
      div: MockDiv
    }
  }
})

jest.mock('./Button', () => ({
  Button: ({ children, className, size, ...props }: any) => (
    <button className={className} data-size={size} {...props}>
      {children}
    </button>
  )
}))

describe('Navigation Component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0
    })
  })

  it('should render the logo', () => {
    render(<Navigation />)
    expect(screen.getByText('ModernWeb')).toBeInTheDocument()
  })

  it('should render navigation items on desktop', () => {
    render(<Navigation />)
    expect(screen.getByText('ホーム')).toBeInTheDocument()
    expect(screen.getByText('機能')).toBeInTheDocument()
    expect(screen.getByText('価格')).toBeInTheDocument()
    expect(screen.getByText('お問い合わせ')).toBeInTheDocument()
  })

  it('should render login button', () => {
    render(<Navigation />)
    const loginButtons = screen.getAllByText('ログイン')
    expect(loginButtons.length).toBeGreaterThan(0)
  })

  it('should have transparent background initially', () => {
    const { container } = render(<Navigation />)
    const nav = container.querySelector('nav')
    expect(nav).toHaveClass('bg-transparent')
  })

  it('should change background when scrolled', () => {
    const { container } = render(<Navigation />)
    const nav = container.querySelector('nav')
    
    act(() => {
      window.scrollY = 20
      window.dispatchEvent(new Event('scroll'))
    })
    
    expect(nav).toHaveClass('bg-white/80')
    expect(nav).toHaveClass('backdrop-blur-lg')
    expect(nav).toHaveClass('shadow-lg')
  })

  it('should render mobile menu button', () => {
    render(<Navigation />)
    const mobileMenuButton = screen.getByRole('button', { name: '' })
    expect(mobileMenuButton).toBeInTheDocument()
  })

  it('should toggle mobile menu when button is clicked', () => {
    render(<Navigation />)
    const mobileMenuButton = screen.getByRole('button', { name: '' })
    
    expect(screen.queryByText('価格', { selector: '.block' })).not.toBeInTheDocument()
    
    fireEvent.click(mobileMenuButton)
    
    const mobileMenuItems = screen.getAllByText('価格')
    expect(mobileMenuItems).toHaveLength(2)
  })

  it('should hide desktop navigation on mobile', () => {
    const { container } = render(<Navigation />)
    const desktopNav = container.querySelector('.hidden.md\\:flex')
    expect(desktopNav).toBeInTheDocument()
  })

  it('should hide mobile menu button on desktop', () => {
    const { container } = render(<Navigation />)
    const mobileMenuContainer = container.querySelector('.md\\:hidden')
    expect(mobileMenuContainer).toBeInTheDocument()
  })

  it('should have fixed positioning', () => {
    const { container } = render(<Navigation />)
    const nav = container.querySelector('nav')
    expect(nav).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50')
  })

  it('should clean up scroll event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const { unmount } = render(<Navigation />)
    
    unmount()
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    removeEventListenerSpy.mockRestore()
  })

  it('should have gradient text for logo', () => {
    render(<Navigation />)
    const logo = screen.getByText('ModernWeb')
    expect(logo).toHaveClass('bg-clip-text', 'text-transparent', 'bg-gradient-to-r')
  })

  it('should render all nav items in mobile menu', () => {
    render(<Navigation />)
    const mobileMenuButton = screen.getByRole('button', { name: '' })
    
    fireEvent.click(mobileMenuButton)
    
    const mobileMenu = screen.getByText('ホーム', { selector: '.block' })
    expect(mobileMenu).toBeInTheDocument()
    expect(screen.getByText('機能', { selector: '.block' })).toBeInTheDocument()
    expect(screen.getByText('価格', { selector: '.block' })).toBeInTheDocument()
    expect(screen.getByText('お問い合わせ', { selector: '.block' })).toBeInTheDocument()
  })

  it('should render login button in mobile menu', () => {
    render(<Navigation />)
    const mobileMenuButton = screen.getByRole('button', { name: '' })
    
    fireEvent.click(mobileMenuButton)
    
    const loginButtons = screen.getAllByText('ログイン')
    const mobileLoginButton = loginButtons.find(btn => btn.classList.contains('w-full'))
    expect(mobileLoginButton).toBeInTheDocument()
  })
})