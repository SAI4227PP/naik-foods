import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { cartCount } = useCart()

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#ead9c4] bg-[#fffdf8]/95 shadow-sm backdrop-blur-md"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="font-serif text-2xl font-bold tracking-tight text-[#6d2e16] transition hover:text-[#9a4b26] sm:text-3xl"
        >
          Naik Foods
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link
            to="/"
            className="text-sm font-medium text-[#4b3327] transition hover:text-[#9a4b26]"
          >
            Home
          </Link>

          <Link
            to="/store"
            className="text-sm font-medium text-[#4b3327] transition hover:text-[#9a4b26]"
          >
            Store
          </Link>

          {/* Build Your Box */}
          <Link
            to="/combo"
            className="rounded-full bg-[#fff1dc] px-4 py-2 text-sm font-bold text-[#6d2e16] transition hover:bg-[#f4dfbd]"
          >
            Build Your Box
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium text-[#4b3327] transition hover:text-[#9a4b26]"
          >
            About
          </Link>

          <Link
            to="/blog"
            className="text-sm font-medium text-[#4b3327] transition hover:text-[#9a4b26]"
          >
            Blog
          </Link>

          <Link
            to="/contact"
            className="text-sm font-medium text-[#4b3327] transition hover:text-[#9a4b26]"
          >
            Contact
          </Link>
        </div>

        {/* Search + Cart + Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Search */}
          <button
            type="button"
            aria-label="Search products"
            className="hidden rounded-full p-2.5 text-[#6d2e16] transition hover:bg-[#f8ead8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a4b26] sm:block"
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
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label={`Shopping cart with ${cartCount} items`}
            className="relative rounded-full p-2.5 text-[#6d2e16] transition hover:bg-[#f8ead8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a4b26]"
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

            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#9a4b26] px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </Link>

          {/* Mobile Menu Button */}
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
          className="border-t border-[#ead9c4] bg-[#fffdf8] px-4 py-4 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">

            <Link
              to="/"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 font-medium text-[#4b3327] transition hover:bg-[#f8ead8] hover:text-[#9a4b26]"
            >
              Home
            </Link>

            <Link
              to="/store"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 font-medium text-[#4b3327] transition hover:bg-[#f8ead8] hover:text-[#9a4b26]"
            >
              Store
            </Link>

            {/* Build Your Box */}
            <Link
              to="/combo"
              onClick={closeMenu}
              className="rounded-lg bg-[#fff1dc] px-4 py-3 font-bold text-[#6d2e16] transition hover:bg-[#f4dfbd]"
            >
              🧺 Build Your Box
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 font-medium text-[#4b3327] transition hover:bg-[#f8ead8] hover:text-[#9a4b26]"
            >
              About
            </Link>

            <Link
              to="/blog"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 font-medium text-[#4b3327] transition hover:bg-[#f8ead8] hover:text-[#9a4b26]"
            >
              Blog
            </Link>

            <Link
              to="/contact"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 font-medium text-[#4b3327] transition hover:bg-[#f8ead8] hover:text-[#9a4b26]"
            >
              Contact
            </Link>

            <Link
              to="/cart"
              onClick={closeMenu}
              className="flex items-center justify-between rounded-lg px-4 py-3 font-medium text-[#4b3327] transition hover:bg-[#f8ead8] hover:text-[#9a4b26]"
            >
              <span>Cart</span>

              <span className="rounded-full bg-[#9a4b26] px-2 py-0.5 text-xs font-bold text-white">
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