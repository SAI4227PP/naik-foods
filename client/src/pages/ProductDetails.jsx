import { Link, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

import ProductGrid from '../components/ProductGrid'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

import {
  getProductById,
  getProducts,
} from '../services/api'

import { useCart } from '../context/CartContext'

const FREE_DELIVERY_THRESHOLD = 999

function normalizeProduct(product) {
  if (!product) return null

  return {
    ...product,
    id: product.id || product._id,
  }
}

function ProductDetails({ onAddToCart }) {
  const { productId } = useParams()
  const { cartSubtotal } = useCart()

  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])

  const [loading, setLoading] = useState(true)
  const [relatedLoading, setRelatedLoading] = useState(false)
  const [error, setError] = useState('')

  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [pincode, setPincode] = useState('')
  const [deliveryMessage, setDeliveryMessage] = useState('')

  /*
   * Load product
   */
  useEffect(() => {
    let cancelled = false

    async function loadProduct() {
      try {
        setLoading(true)
        setError('')
        setProduct(null)
        setQuantity(1)

        const response =
          await getProductById(productId)

        if (cancelled) return

        const loadedProduct =
          normalizeProduct(response.product)

        if (!loadedProduct) {
          setError('Product not found')
          return
        }

        setProduct(loadedProduct)
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message ||
              'Unable to load product',
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    if (productId) {
      loadProduct()
    }

    return () => {
      cancelled = true
    }
  }, [productId])

  /*
   * Load related products
   */
  useEffect(() => {
    let cancelled = false

    async function loadRelatedProducts() {
      if (!product?.category) return

      try {
        setRelatedLoading(true)

        const response =
          await getProducts({
            category: product.category,
            inStock: true,
          })

        if (cancelled) return

        const products = (
          response.products || []
        )
          .map(normalizeProduct)
          .filter(
            (item) =>
              item.id !== product.id &&
              item.stock > 0 &&
              item.price > 0,
          )
          .slice(0, 4)

        setRelatedProducts(products)
      } catch {
        if (!cancelled) {
          setRelatedProducts([])
        }
      } finally {
        if (!cancelled) {
          setRelatedLoading(false)
        }
      }
    }

    loadRelatedProducts()

    return () => {
      cancelled = true
    }
  }, [product])

  /*
   * Quantity
   */
  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(
        current + 1,
        product?.stock || 1,
      ),
    )
  }

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(current - 1, 1),
    )
  }

  /*
   * Add to cart
   */
  const handleAddToCart = () => {
    if (!product || product.stock <= 0) {
      return
    }

    onAddToCart?.(
      {
        ...product,
        id: product.id || product._id,
      },
      quantity,
    )

    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  /*
   * Delivery checker
   */
  const checkDelivery = () => {
    const cleanPincode =
      pincode.trim()

    if (!/^\d{6}$/.test(cleanPincode)) {
      setDeliveryMessage(
        'Please enter a valid 6-digit pincode.',
      )
      return
    }

    setDeliveryMessage(
      `Delivery availability checked for ${cleanPincode}.`,
    )
  }

  const productTotal = useMemo(() => {
    if (!product) return 0

    return product.price * quantity
  }, [product, quantity])

  const remainingForFreeDelivery =
    Math.max(
      FREE_DELIVERY_THRESHOLD -
        cartSubtotal,
      0,
    )

  /*
   * Loading
   */
  if (loading) {
    return (
      <main className="min-h-screen bg-[#fff8ed] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-[#ead8c0] bg-white shadow-sm">
            <div className="grid lg:grid-cols-2">
              <div className="flex min-h-[500px] items-center justify-center bg-[#fff1dc]">
                <Loading
                  type="cart"
                  count={1}
                />
              </div>

              <div className="space-y-6 p-8 sm:p-12">
                <div className="h-5 w-40 animate-pulse rounded bg-[#ead8c0]" />

                <div className="h-12 w-4/5 animate-pulse rounded bg-[#ead8c0]" />

                <div className="h-8 w-32 animate-pulse rounded bg-[#ead8c0]" />

                <div className="h-24 animate-pulse rounded bg-[#ead8c0]" />

                <div className="h-12 animate-pulse rounded bg-[#ead8c0]" />
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  /*
   * Error / not found
   */
  if (error || !product) {
    return (
      <main className="min-h-screen bg-[#fff8ed] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#ead8c0] bg-white px-6 py-16 text-center shadow-sm">
          <div className="mb-5 text-6xl">
            {error ? '⚠️' : '🔎'}
          </div>

          <ErrorMessage
            title={
              error
                ? 'Unable to Load Product'
                : 'Product Not Found'
            }
            message={
              error ||
              "Sorry, we couldn't find the product you're looking for."
            }
          />

          <Link
            to="/store"
            className="mt-7 inline-flex rounded-full bg-[#6d2e16] px-7 py-3.5 font-bold text-white transition hover:bg-[#9a4b26]"
          >
            Back to Store
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#fff8ed] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm">
          <Link
            to="/"
            className="text-[#795746] hover:text-[#6d2e16]"
          >
            Home
          </Link>

          <span className="text-[#bca894]">
            /
          </span>

          <Link
            to="/store"
            className="text-[#795746] hover:text-[#6d2e16]"
          >
            Store
          </Link>

          <span className="text-[#bca894]">
            /
          </span>

          <span className="font-medium text-[#6d2e16]">
            {product.name}
          </span>
        </nav>

        {/* Product */}
        <section className="overflow-hidden rounded-3xl border border-[#ead8c0] bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">

            {/* Image */}
            <div className="flex min-h-[440px] items-center justify-center bg-[#fff1dc] p-8 sm:p-12">
              <div className="relative flex min-h-[380px] w-full items-center justify-center">

                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-[520px] w-full object-contain p-6 transition duration-500 hover:scale-105 sm:p-10"
                  />
                ) : (
                  <div className="flex h-72 w-72 items-center justify-center rounded-full bg-[#f4dfbd] shadow-inner sm:h-96 sm:w-96">
                    <div className="text-center">
                      <div className="font-serif text-5xl font-bold text-[#6d2e16] sm:text-6xl">
                        Naik
                      </div>

                      <p className="mt-2 text-lg font-semibold text-[#9a4b26]">
                        Foods
                      </p>

                      <p className="mt-4 max-w-[220px] font-serif text-lg font-bold text-[#6d2e16]">
                        {product.name}
                      </p>
                    </div>
                  </div>
                )}

                <div className="absolute right-2 top-5 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#6d2e16] shadow-lg sm:right-5">
                  ★ {product.rating || 0}
                </div>
              </div>
            </div>

            {/* Information */}
            <div className="p-7 sm:p-10 lg:p-12">

              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9a4b26]">
                {product.category}
              </p>

              <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-[#6d2e16] sm:text-5xl">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#fff1dc] px-3 py-1.5 text-sm font-bold text-[#6d2e16]">
                  ★ {product.rating || 0}
                </span>

                <span className="text-sm text-[#795746]">
                  {product.reviewCount || 0}{' '}
                  reviews
                </span>

                <span className="text-[#bca894]">
                  •
                </span>

                <span className="text-sm font-medium text-[#795746]">
                  {product.region ||
                    'Maharashtra'}
                </span>
              </div>

              {/* Price */}
              <div className="mt-7 border-y border-[#ead8c0] py-6">
                <div className="flex flex-wrap items-end gap-3">
                  <span className="text-4xl font-extrabold text-[#6d2e16]">
                    ₹{product.price}
                  </span>

                  {product.weight && (
                    <span className="pb-1 text-[#795746]">
                      / {product.weight}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm text-[#795746]">
                  Inclusive of applicable taxes
                </p>
              </div>

              {/* Description */}
              <div className="mt-7">
                <h2 className="text-lg font-bold text-[#3d2519]">
                  About this product
                </h2>

                <p className="mt-3 leading-7 text-[#795746]">
                  {product.description ||
                    `Enjoy the authentic taste of ${product.name}, inspired by traditional Maharashtrian flavours.`}
                </p>
              </div>

              {/* Tags */}
              {product.tags?.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-[#3d2519]">
                    Product Highlights
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.tags.map(
                      (tag, index) => (
                        <span
                          key={`${tag}-${index}`}
                          className="rounded-full border border-[#ead8c0] bg-[#fffaf3] px-3 py-2 text-sm font-medium text-[#795746]"
                        >
                          ✓ {tag}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Stock */}
              <div className="mt-6">
                {product.stock > 0 ? (
                  <p className="text-sm font-semibold text-green-700">
                    ✓ In Stock
                  </p>
                ) : (
                  <p className="text-sm font-semibold text-red-600">
                    Currently Out of Stock
                  </p>
                )}
              </div>

              {/* Quantity */}
              {product.stock > 0 && (
                <div className="mt-6">
                  <p className="mb-2 text-sm font-bold text-[#3d2519]">
                    Quantity
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex h-12 w-fit items-center overflow-hidden rounded-xl border border-[#dec8ad]">
                      <button
                        type="button"
                        onClick={
                          decreaseQuantity
                        }
                        disabled={
                          quantity <= 1
                        }
                        className="flex h-full w-12 items-center justify-center text-xl font-bold text-[#6d2e16] transition hover:bg-[#fff1dc] disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <span className="flex h-full w-12 items-center justify-center border-x border-[#dec8ad] font-bold text-[#3d2519]">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={
                          increaseQuantity
                        }
                        disabled={
                          quantity >=
                          product.stock
                        }
                        className="flex h-full w-12 items-center justify-center text-xl font-bold text-[#6d2e16] transition hover:bg-[#fff1dc] disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={
                        handleAddToCart
                      }
                      className="h-12 flex-1 rounded-xl bg-[#6d2e16] px-6 font-bold text-white transition hover:bg-[#9a4b26]"
                    >
                      {added
                        ? '✓ Added to Cart'
                        : `Add ${quantity} to Cart — ₹${productTotal}`}
                    </button>
                  </div>
                </div>
              )}

              {/* Delivery checker */}
              <div className="mt-7 rounded-2xl border border-[#ead8c0] bg-[#fffaf3] p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
                    🚚
                  </span>

                  <div className="flex-1">
                    <h2 className="font-bold text-[#3d2519]">
                      Check Delivery
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-[#795746]">
                      Enter your pincode to
                      check delivery
                      availability.
                    </p>

                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={pincode}
                        onChange={(event) =>
                          setPincode(
                            event.target.value.replace(
                              /\D/g,
                              '',
                            ),
                          )
                        }
                        placeholder="Enter pincode"
                        className="h-11 min-w-0 flex-1 rounded-xl border border-[#dec8ad] bg-white px-3 text-sm outline-none focus:border-[#9a4b26]"
                      />

                      <button
                        type="button"
                        onClick={
                          checkDelivery
                        }
                        className="rounded-xl bg-[#6d2e16] px-4 text-sm font-bold text-white transition hover:bg-[#9a4b26]"
                      >
                        Check
                      </button>
                    </div>

                    {deliveryMessage && (
                      <p className="mt-3 text-xs font-semibold text-[#6d2e16]">
                        {deliveryMessage}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Free delivery */}
              <div className="mt-4 rounded-2xl bg-[#fff1dc] p-4">
                {remainingForFreeDelivery >
                0 ? (
                  <p className="text-sm text-[#795746]">
                    Add{' '}
                    <strong className="text-[#6d2e16]">
                      ₹
                      {
                        remainingForFreeDelivery
                      }
                    </strong>{' '}
                    more to your cart to
                    unlock{' '}
                    <strong>
                      FREE DELIVERY
                    </strong>
                    .
                  </p>
                ) : (
                  <p className="text-sm font-bold text-[#6d2e16]">
                    🎉 Your cart qualifies for
                    FREE DELIVERY!
                  </p>
                )}
              </div>

              {/* Trust */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#fff8ed] p-4">
                  <p className="text-lg">
                    🔒
                  </p>

                  <p className="mt-2 text-sm font-bold text-[#3d2519]">
                    Secure Payment
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#795746]">
                    Safe and secure online
                    payments.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#fff8ed] p-4">
                  <p className="text-lg">
                    ❤️
                  </p>

                  <p className="mt-2 text-sm font-bold text-[#3d2519]">
                    Authentic Flavour
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#795746]">
                    Inspired by traditional
                    regional recipes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product information */}
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-[#ead8c0] bg-white p-6">
            <div className="text-3xl">
              🌾
            </div>

            <h2 className="mt-4 font-bold text-[#6d2e16]">
              Regional Flavours
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#795746]">
              Discover flavours inspired by
              Maharashtra, Vidarbha and Konkan
              food traditions.
            </p>
          </div>

          <div className="rounded-3xl border border-[#ead8c0] bg-white p-6">
            <div className="text-3xl">
              📋
            </div>

            <h2 className="mt-4 font-bold text-[#6d2e16]">
              Product Details
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#795746]">
              Category: {product.category}
              <br />
              Weight:{' '}
              {product.weight ||
                'Not specified'}
              <br />
              Region:{' '}
              {product.region ||
                'Maharashtra'}
              <br />
              Stock: {product.stock}
            </p>
          </div>

          <div className="rounded-3xl border border-[#ead8c0] bg-white p-6">
            <div className="text-3xl">
              📦
            </div>

            <h2 className="mt-4 font-bold text-[#6d2e16]">
              Easy Shopping
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#795746]">
              Add products to your cart and
              combine them with other favourites
              to unlock free delivery.
            </p>
          </div>
        </section>

        {/* Related Products */}
        {(relatedLoading ||
          relatedProducts.length > 0) && (
          <section className="mt-12">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9a4b26]">
                  You may also like
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold text-[#3d2519]">
                  More from this category
                </h2>
              </div>

              <Link
                to="/store"
                className="font-bold text-[#6d2e16] hover:text-[#9a4b26]"
              >
                View all →
              </Link>
            </div>

            {relatedLoading ? (
              <Loading
                type="products"
                count={4}
              />
            ) : (
              <ProductGrid
                products={relatedProducts}
                onAddToCart={
                  onAddToCart
                }
              />
            )}
          </section>
        )}

        {/* Continue */}
        <div className="py-10 text-center">
          <Link
            to="/store"
            className="font-bold text-[#6d2e16] hover:text-[#9a4b26]"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails