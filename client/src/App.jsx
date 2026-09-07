import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Store from './pages/Store'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Combo from './pages/Combo'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

import { CartProvider, useCart } from './context/CartContext'

function StorePage() {
  const { addToCart } = useCart()

  return <Store onAddToCart={addToCart} />
}

function ProductPage() {
  const { addToCart } = useCart()

  return <ProductDetails onAddToCart={addToCart} />
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-[#fff8ed]">
          <Navbar />

          <Routes>
            {/* Home */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* Store */}
            <Route
              path="/store"
              element={<StorePage />}
            />

            {/* Product Details */}
            <Route
              path="/product/:productId"
              element={<ProductPage />}
            />

            {/* Cart */}
            <Route
              path="/cart"
              element={<Cart />}
            />

            {/* Build Your Box */}
            <Route
              path="/combo"
              element={<Combo />}
            />

            {/* About */}
            <Route
              path="/about"
              element={<About />}
            />

            {/* Blog */}
            <Route
              path="/blog"
              element={<Blog />}
            />

            {/* Contact */}
            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* Fallback */}
            <Route
              path="*"
              element={<Home />}
            />
          </Routes>

          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App