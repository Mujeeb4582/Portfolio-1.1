import '@testing-library/jest-dom'

window.IntersectionObserver = vi.fn().mockImplementation(class {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
