import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { cartCount } = useCart()
  const location = useLocation()

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }

    return location.pathname.startsWith(path)
  }

  const navLinkClass = (path) => {
    return `relative rounded-full px-3 py-2 text-sm font-semibold transition ${
      isActive(path)
        ? 'bg-[#fff1dc] text-[#6d2e16]'
        : 'text-[#4b3327] hover:bg-[#fff7eb] hover:text-[#9a4b26]'
    }`
  }

  const mobileLinkClass = (path) => {
    return `flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition ${
      isActive(path)
        ? 'bg-[#fff1dc] text-[#6d2e16]'
        : 'text-[#4b3327] hover:bg-[#f8ead8] hover:text-[#9a4b26]'
    }`
  }

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#ead9c4]/80 bg-[#fffdf8]/95 shadow-sm backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-2"
          aria-label="Naik Foods home"
        >
          <span className="font-serif text-2xl font-bold tracking-tight text-[#6d2e16] transition group-hover:text-[#9a4b26] sm:text-3xl">
            Naik Foods
          </span>

          <span className="hidden rounded-full bg-[#fff1dc] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#9a4b26] xl:inline-block">
            Authentic
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          <Link to="/" className={navLinkClass('/')}>
            Home
          </Link>

          <Link to="/store" className={navLinkClass('/store')}>
            Store
          </Link>

          <Link
            to="/combo"
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              isActive('/combo')
                ? 'bg-[#6d2e16] text-white shadow-md'
                : 'bg-[#fff1dc] text-[#6d2e16] hover:bg-[#f4dfbd] hover:shadow-sm'
            }`}
          >
            Build Your Box
          </Link>

          <Link to="/about" className={navLinkClass('/about')}>
            About
          </Link>

          <Link to="/blog" className={navLinkClass('/blog')}>
            Blog
          </Link>

          <Link to="/contact" className={navLinkClass('/contact')}>
            Contact
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Search */}
          <Link
            to="/store"
            aria-label="Search products"
            className="hidden rounded-full p-2.5 text-[#6d2e16] transition hover:bg-[#f8ead8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a4b26] sm:flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label={`Shopping cart with ${cartCount} items`}
            className={`relative rounded-full p-2.5 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a4b26] ${
              isActive('/cart')
                ? 'bg-[#fff1dc] text-[#6d2e16]'
                : 'text-[#6d2e16] hover:bg-[#f8ead8]'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5 sm:h-6 sm:w-6"
              aria-hidden="true"
            >
              <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>

            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#9a4b26] px-1 text-[10px] font-bold text-white ring-2 ring-[#fffdf8]">
              {cartCount}
            </span>
          </Link>

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={
              isMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="rounded-full p-2.5 text-[#6d2e16] transition hover:bg-[#f8ead8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a4b26] lg:hidden"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#ead9c4] bg-[#fffdf8] px-4 py-4 shadow-lg lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            <Link
              to="/"
              onClick={closeMenu}
              className={mobileLinkClass('/')}
            >
              Home
            </Link>

            <Link
              to="/store"
              onClick={closeMenu}
              className={mobileLinkClass('/store')}
            >
              Store
            </Link>

            <Link
              to="/combo"
              onClick={closeMenu}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition ${
                isActive('/combo')
                  ? 'bg-[#6d2e16] text-white'
                  : 'bg-[#fff1dc] text-[#6d2e16] hover:bg-[#f4dfbd]'
              }`}
            >
              <span>🧺 Build Your Box</span>
              <span className="text-xs opacity-70">3 products</span>
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className={mobileLinkClass('/about')}
            >
              About
            </Link>

            <Link
              to="/blog"
              onClick={closeMenu}
              className={mobileLinkClass('/blog')}
            >
              Blog
            </Link>

            <Link
              to="/contact"
              onClick={closeMenu}
              className={mobileLinkClass('/contact')}
            >
              Contact
            </Link>

            <div className="my-2 border-t border-[#ead9c4]" />

            <Link
              to="/cart"
              onClick={closeMenu}
              className={mobileLinkClass('/cart')}
            >
              <span>Shopping Cart</span>

              <span className="rounded-full bg-[#9a4b26] px-2.5 py-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar