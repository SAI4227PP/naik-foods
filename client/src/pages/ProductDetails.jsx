import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react'

import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import ProductGrid from '../components/ProductGrid'

import {
  getProductById,
  getProducts,
  getRecommendations,
} from '../services/api'

const UNWANTED_TAGS = new Set([
  'home',
  'about',
  'shop',
  'blogs',
  'blog',
  'contact',
  'store',
])

const UNWANTED_DESCRIPTION_PHRASES = [
  'quick links',
  'visit our stores',
  'shop:',
  'cart 0',
  'home about',
  'about shop',
  'blogs contact',
]

function cleanText(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanTags(tags = []) {
  if (!Array.isArray(tags)) {
    return []
  }

  return tags
    .map((tag) => cleanText(tag))
    .filter(Boolean)
    .filter(
      (tag) =>
        !UNWANTED_TAGS.has(
          tag.toLowerCase(),
        ),
    )
    .slice(0, 12)
}

function cleanDescription(description) {
  const text = cleanText(description)

  if (!text) {
    return ''
  }

  let cleaned = text

  UNWANTED_DESCRIPTION_PHRASES.forEach(
    (phrase) => {
      const index = cleaned
        .toLowerCase()
        .indexOf(phrase)

      if (index !== -1) {
        cleaned = cleaned
          .slice(0, index)
          .trim()
      }
    },
  )

  return cleaned
}

function ProductDetails({ onAddToCart }) {
  const { productId } = useParams()

  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] =
    useState([])
  const [recommendations, setRecommendations] =
    useState([])

  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  const [pincode, setPincode] = useState('')
  const [pincodeMessage, setPincodeMessage] =
    useState('')

  const [loading, setLoading] = useState(true)
  const [relatedLoading, setRelatedLoading] =
    useState(true)
  const [recommendationsLoading, setRecommendationsLoading] =
    useState(true)

  const [error, setError] = useState('')
  const [recommendationsError, setRecommendationsError] =
    useState('')
  const [adding, setAdding] = useState(false)
  const [addedMessage, setAddedMessage] =
    useState('')

  useEffect(() => {
    let mounted = true

    async function loadProduct() {
      try {
        setLoading(true)
        setError('')
        setAddedMessage('')

        const data = await getProductById(productId)

        if (!mounted) return

        setProduct(data?.product || null)
        setActiveImage(0)
        setQuantity(1)
      } catch (err) {
        if (!mounted) return

        console.error(
          'Failed to load product:',
          err,
        )

        setError(
          err.message ||
            'Unable to load this product.',
        )
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    if (productId) {
      loadProduct()
    }

    return () => {
      mounted = false
    }
  }, [productId])

  useEffect(() => {
    let mounted = true

    async function loadRecommendations() {
      const currentProductId =
        product?.id || product?._id

      if (!currentProductId) {
        setRecommendations([])
        setRecommendationsLoading(false)
        return
      }

      try {
        setRecommendationsLoading(true)
        setRecommendationsError('')

        const data = await getRecommendations([
          currentProductId,
        ])

        if (!mounted) return

        const items = Array.isArray(
          data?.recommendations,
        )
          ? data.recommendations
          : []

        setRecommendations(
          items
            .filter(
              (item) =>
                String(item.id || item._id) !==
                String(currentProductId),
            )
            .slice(0, 4),
        )
      } catch (err) {
        if (!mounted) return

        console.error(
          'Failed to load recommendations:',
          err,
        )

        setRecommendations([])
        setRecommendationsError(
          err.message ||
            'Unable to load recommendations.',
        )
      } finally {
        if (mounted) {
          setRecommendationsLoading(false)
        }
      }
    }

    loadRecommendations()

    return () => {
      mounted = false
    }
  }, [product])

  useEffect(() => {
    let mounted = true

    async function loadRelatedProducts() {
      if (!product?.category) {
        setRelatedProducts([])
        setRelatedLoading(false)
        return
      }

      try {
        setRelatedLoading(true)

        const data = await getProducts({
          category: product.category,
          inStock: true,
        })

        if (!mounted) return

        const currentId =
          product.id || product._id

        const products = Array.isArray(
          data?.products,
        )
          ? data.products
          : []

        const filtered = products
          .filter(
            (item) =>
              (item.id || item._id) !==
              currentId,
          )
          .slice(0, 4)

        setRelatedProducts(filtered)
      } catch (err) {
        if (!mounted) return

        console.error(
          'Failed to load related products:',
          err,
        )

        setRelatedProducts([])
      } finally {
        if (mounted) {
          setRelatedLoading(false)
        }
      }
    }

    loadRelatedProducts()

    return () => {
      mounted = false
    }
  }, [product])

  const stock = Number(
    product?.stock ?? 0,
  )

  const price = Number(
    product?.price || 0,
  )

  const rating = Math.min(
    Math.max(
      Number(product?.rating || 0),
      0,
    ),
    5,
  )

  const reviewCount = Math.max(
    Number(product?.reviewCount || 0),
    0,
  )

  const isOutOfStock = stock <= 0

  const description = cleanDescription(
    product?.description,
  )

  const highlights = useMemo(
    () => cleanTags(product?.tags),
    [product?.tags],
  )

  const images = useMemo(() => {
    const productImages = Array.isArray(
      product?.images,
    )
      ? product.images.filter(Boolean)
      : []

    if (
      product?.image &&
      !productImages.includes(product.image)
    ) {
      productImages.unshift(product.image)
    }

    return productImages.length > 0
      ? productImages
      : ['']
  }, [product])

  const totalPrice = useMemo(
    () => price * quantity,
    [price, quantity],
  )

  const increaseQuantity = () => {
    if (isOutOfStock) return

    setQuantity((current) =>
      Math.min(current + 1, stock),
    )

    setAddedMessage('')
  }

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(current - 1, 1),
    )

    setAddedMessage('')
  }

  const handleQuantityChange = (
    event,
  ) => {
    const value = Number(
      event.target.value,
    )

    if (!Number.isInteger(value)) {
      return
    }

    const safeValue = Math.min(
      Math.max(value, 1),
      Math.max(stock, 1),
    )

    setQuantity(safeValue)
    setAddedMessage('')
  }

  const handleAddToCart = async () => {
    if (
      !product ||
      isOutOfStock ||
      adding
    ) {
      return
    }

    try {
      setAdding(true)
      setAddedMessage('')

      const added = await onAddToCart?.(
        product,
        quantity,
      )

      if (added) {
        setAddedMessage(
          `${product.name} has been added to your cart.`,
        )
      }
    } catch (err) {
      console.error(
        'Add to cart failed:',
        err,
      )
    } finally {
      setAdding(false)
    }
  }

  const handlePincodeCheck = () => {
    const cleanPincode =
      pincode.trim()

    if (!/^\d{6}$/.test(cleanPincode)) {
      setPincodeMessage(
        'Please enter a valid 6-digit pincode.',
      )
      return
    }

    setPincodeMessage(
      'Delivery availability will be confirmed at checkout.',
    )
  }

  const previousImage = () => {
    setActiveImage((current) =>
      current === 0
        ? images.length - 1
        : current - 1,
    )
  }

  const nextImage = () => {
    setActiveImage((current) =>
      current === images.length - 1
        ? 0
        : current + 1,
    )
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fff8ed] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Loading count={1} />
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#fff8ed] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <ErrorMessage
            title="Unable to load product"
            message={error}
            buttonText="Try Again"
            onRetry={() =>
              window.location.reload()
            }
          />
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#fff8ed] px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <ErrorMessage
            title="Product not found"
            message="This product may no longer be available."
            buttonText="Back to Store"
            onRetry={() => {
              window.location.href =
                '/store'
            }}
          />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#fffaf4]">
      {/* Breadcrumb */}
      <section className="border-b border-[#ead9c4] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#927665] sm:text-sm">
            <Link
              to="/"
              className="transition hover:text-[#8f3f1f]"
            >
              Home
            </Link>

            <span>›</span>

            <Link
              to="/store"
              className="transition hover:text-[#8f3f1f]"
            >
              Store
            </Link>

            <span>›</span>

            <span>
              {product.category ||
                'Product'}
            </span>

            <span>›</span>

            <span className="font-bold text-[#8f3f1f]">
              {product.name}
            </span>
          </div>
        </div>
      </section>

      {/* Main product area */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-14">
          {/* =====================================================
              LEFT — PRODUCT GALLERY
          ====================================================== */}
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-[28px] border border-[#e7d5bf] bg-[#eee6da] shadow-sm">
              {/* Bestseller / stock badge */}
              <div className="absolute left-5 top-5 z-10">
                {!isOutOfStock ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#f0cda8] bg-[#fff7e8] px-4 py-2 text-xs font-extrabold text-[#a64b25] shadow-sm">
                    <Star
                      size={13}
                      fill="currentColor"
                    />
                    Bestseller
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-4 py-2 text-xs font-bold text-red-700">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Main image */}
              <div className="flex min-h-[430px] items-center justify-center p-8 sm:min-h-[540px] sm:p-12">
                {images[activeImage] ? (
                  <img
                    src={images[activeImage]}
                    alt={product.name}
                    className="max-h-[500px] w-full object-contain drop-shadow-xl transition duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-[#c7ae97]">
                    <Package size={72} />

                    <p className="mt-4 text-sm font-semibold">
                      Product image unavailable
                    </p>
                  </div>
                )}
              </div>

              {/* Previous */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#ead9c4] bg-white text-[#6d2e16] shadow-md transition hover:bg-[#fff8ed]"
                  aria-label="Previous product image"
                >
                  <ChevronLeft size={20} />
                </button>
              )}

              {/* Next */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#ead9c4] bg-white text-[#6d2e16] shadow-md transition hover:bg-[#fff8ed]"
                  aria-label="Next product image"
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {images.map(
                (image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() =>
                      setActiveImage(index)
                    }
                    className={`h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 bg-[#f5eee5] p-2 transition ${
                      activeImage === index
                        ? 'border-[#8f3f1f] shadow-sm'
                        : 'border-transparent hover:border-[#d9bda4]'
                    }`}
                    aria-label={`View product image ${index + 1}`}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <Package
                        size={25}
                        className="mx-auto mt-5 text-[#c7ae97]"
                      />
                    )}
                  </button>
                ),
              )}
            </div>

            {/* About product */}
            <div className="mt-10">
              <h2 className="font-serif text-2xl font-bold text-[#5f2814]">
                About this product
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#795746] sm:text-base">
                {description ||
                  `${product.name} is a traditional favourite from Naik Foods, prepared to bring authentic Maharashtrian flavours to your everyday meals and snacks.`}
              </p>
            </div>

            {/* Product specifications */}
            <div className="mt-8 border-t border-[#ead9c4] pt-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0dc] text-[#8f3f1f]">
                    <Package size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#927665]">
                      Weight
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#6d2e16]">
                      {product.weight ||
                        'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0dc] text-[#8f3f1f]">
                    <Package size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#927665]">
                      Category
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#6d2e16]">
                      {product.category ||
                        'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0dc] text-[#8f3f1f]">
                    <Leaf size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#927665]">
                      Region
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#6d2e16]">
                      {product.region ||
                        'Maharashtra'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0dc] text-[#8f3f1f]">
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#927665]">
                      Availability
                    </p>

                    <p
                      className={`mt-1 text-sm font-bold ${
                        isOutOfStock
                          ? 'text-red-600'
                          : 'text-emerald-700'
                      }`}
                    >
                      {isOutOfStock
                        ? 'Out of Stock'
                        : 'In Stock'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredient/value banner */}
            <div className="mt-8 flex items-start gap-4 rounded-3xl bg-[#fff0dc] p-5 sm:p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#a64b25]">
                <Leaf size={22} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#6d2e16] sm:text-base">
                  Made for authentic flavour
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#795746] sm:text-sm">
                  A traditional choice inspired by
                  Maharashtrian food culture.
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT — PURCHASE PANEL
          ====================================================== */}
          <div className="min-w-0">
            <div className="lg:sticky lg:top-24">
              {/* Category */}
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#a64b25]">
                {product.category ||
                  'Authentic Product'}
              </p>

              {/* Title */}
              <h1 className="mt-3 max-w-xl font-serif text-4xl font-bold leading-[1.05] text-[#5f2814] sm:text-5xl">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({
                    length: 5,
                  }).map((_, index) => (
                    <Star
                      key={index}
                      size={17}
                      fill={
                        index < Math.round(rating)
                          ? 'currentColor'
                          : 'none'
                      }
                      className="text-[#d47b25]"
                    />
                  ))}
                </div>

                <span className="text-sm font-bold text-[#6d2e16]">
                  {rating.toFixed(1)}
                </span>

                <span className="text-sm text-[#927665]">
                  ({reviewCount}{' '}
                  {reviewCount === 1
                    ? 'review'
                    : 'reviews'})
                </span>

                <span className="text-[#c8ae96]">
                  •
                </span>

                <span className="text-sm font-semibold text-[#795746]">
                  {product.region ||
                    'Maharashtra'}
                </span>
              </div>

              <div className="my-6 h-px bg-[#ead9c4]" />

              {/* Price */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-extrabold text-[#8f3f1f]">
                      ₹
                      {price.toLocaleString(
                        'en-IN',
                      )}
                    </span>

                    {product.weight && (
                      <span className="pb-1 text-sm font-semibold text-[#927665]">
                        / {product.weight}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs text-[#927665]">
                    Inclusive of applicable taxes.
                  </p>
                </div>

                {!isOutOfStock && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    In Stock
                  </span>
                )}
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-serif text-xl font-bold text-[#5f2814]">
                    Product Highlights
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {highlights.map(
                      (highlight) => (
                        <span
                          key={highlight}
                          className="inline-flex items-center gap-2 rounded-full border border-[#efcda8] bg-[#fffdf9] px-3 py-2 text-xs font-semibold text-[#795746]"
                        >
                          <Check
                            size={12}
                            strokeWidth={3}
                            className="text-[#a64b25]"
                          />

                          {highlight}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Quantity + cart */}
              <div className="mt-8">
                <p className="mb-3 text-sm font-bold text-[#6d2e16]">
                  Quantity
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex h-14 w-full shrink-0 items-center rounded-2xl border border-[#d9bda4] bg-white sm:w-[145px]">
                    <button
                      type="button"
                      onClick={
                        decreaseQuantity
                      }
                      disabled={
                        isOutOfStock ||
                        quantity <= 1
                      }
                      className="flex h-full w-12 items-center justify-center rounded-l-2xl text-[#8f3f1f] transition hover:bg-[#fff0dc] disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={18} />
                    </button>

                    <input
                      type="number"
                      min="1"
                      max={Math.max(
                        stock,
                        1,
                      )}
                      value={quantity}
                      onChange={
                        handleQuantityChange
                      }
                      disabled={
                        isOutOfStock
                      }
                      className="h-full min-w-0 flex-1 border-x border-[#ead9c4] bg-transparent text-center font-bold text-[#6d2e16] outline-none"
                      aria-label="Quantity"
                    />

                    <button
                      type="button"
                      onClick={
                        increaseQuantity
                      }
                      disabled={
                        isOutOfStock ||
                        quantity >= stock
                      }
                      className="flex h-full w-12 items-center justify-center rounded-r-2xl text-[#8f3f1f] transition hover:bg-[#fff0dc] disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Increase quantity"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={
                      handleAddToCart
                    }
                    disabled={
                      isOutOfStock ||
                      adding
                    }
                    className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#8f3f1f] px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#6d2e16] disabled:cursor-not-allowed disabled:bg-[#b8a99d]"
                  >
                    <ShoppingCart size={19} />

                    {adding
                      ? 'Adding...'
                      : isOutOfStock
                        ? 'Out of Stock'
                        : `Add to Cart — ₹${totalPrice.toLocaleString(
                            'en-IN',
                          )}`}
                  </button>
                </div>

                {addedMessage && (
                  <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-emerald-800">
                        {addedMessage}
                      </p>

                      <Link
                        to="/cart"
                        className="shrink-0 text-sm font-bold text-[#8f3f1f] underline underline-offset-2"
                      >
                        View Cart
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery */}
              <div className="mt-5 rounded-3xl border border-[#efcda8] bg-[#fffaf2] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff0dc] text-[#a64b25]">
                    <Truck size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-bold text-[#6d2e16]">
                      Check Delivery
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-[#927665]">
                      Enter your pincode to check
                      delivery availability.
                    </p>

                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={pincode}
                        onChange={(event) => {
                          setPincode(
                            event.target.value.replace(
                              /\D/g,
                              '',
                            ),
                          )
                          setPincodeMessage(
                            '',
                          )
                        }}
                        placeholder="Enter pincode"
                        className="min-w-0 flex-1 rounded-xl border border-[#dcc5ae] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#b6a08e] focus:border-[#a64b25] focus:ring-4 focus:ring-orange-100"
                      />

                      <button
                        type="button"
                        onClick={
                          handlePincodeCheck
                        }
                        className="rounded-xl bg-[#8f3f1f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#6d2e16]"
                      >
                        Check
                      </button>
                    </div>

                    {pincodeMessage && (
                      <p className="mt-3 text-xs font-semibold text-[#795746]">
                        {pincodeMessage}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Free delivery */}
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#fff0dc] px-4 py-3">
                <Truck
                  size={18}
                  className="shrink-0 text-[#a64b25]"
                />

                <p className="text-xs font-bold text-[#8f3f1f] sm:text-sm">
                  Add products worth ₹999 to
                  unlock FREE DELIVERY!
                </p>
              </div>

              {/* Trust cards */}
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#ead9c4]">
                  <ShieldCheck
                    size={21}
                    className="text-[#a64b25]"
                  />

                  <p className="mt-3 text-xs font-bold text-[#6d2e16]">
                    Secure Payment
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-[#927665]">
                    Safe and secure online
                    payments.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#ead9c4]">
                  <Leaf
                    size={21}
                    className="text-[#a64b25]"
                  />

                  <p className="mt-3 text-xs font-bold text-[#6d2e16]">
                    Authentic Flavour
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-[#927665]">
                    Inspired by traditional
                    regional recipes.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#ead9c4]">
                  <Heart
                    size={21}
                    className="text-[#c84b68]"
                    fill="currentColor"
                  />

                  <p className="mt-3 text-xs font-bold text-[#6d2e16]">
                    Quality You Can Trust
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-[#927665]">
                    Carefully sourced
                    ingredients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            LOWER PRODUCT INFORMATION
        ====================================================== */}
        <div className="mt-16 border-t border-[#ead9c4] pt-10">
          <div className="flex flex-wrap gap-8 border-b border-[#ead9c4]">
            <button
              type="button"
              className="border-b-2 border-[#8f3f1f] pb-4 text-sm font-extrabold text-[#8f3f1f]"
            >
              Description
            </button>

            <button
              type="button"
              className="pb-4 text-sm font-bold text-[#927665] transition hover:text-[#8f3f1f]"
            >
              Ingredients
            </button>

            <button
              type="button"
              className="pb-4 text-sm font-bold text-[#927665] transition hover:text-[#8f3f1f]"
            >
              Nutrition Facts
            </button>

            <button
              type="button"
              className="pb-4 text-sm font-bold text-[#927665] transition hover:text-[#8f3f1f]"
            >
              Reviews ({reviewCount})
            </button>
          </div>

          <div className="mt-6 rounded-3xl border border-[#ead9c4] bg-white p-6 sm:p-8">
            <p className="max-w-4xl text-sm leading-7 text-[#795746] sm:text-base">
              {description ||
                `${product.name} brings authentic regional flavour to your table. Explore the product details above and discover more from the Naik Foods collection.`}
            </p>

            {highlights.length > 0 && (
              <div className="mt-7">
                <h3 className="font-serif text-xl font-bold text-[#6d2e16]">
                  Key highlights
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {highlights.map(
                    (highlight) => (
                      <div
                        key={`detail-${highlight}`}
                        className="flex items-start gap-3 rounded-2xl bg-[#fff8ed] p-4"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-[#a64b25]"
                          strokeWidth={3}
                        />

                        <span className="text-sm leading-6 text-[#795746]">
                          {highlight}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Personalized recommendations */}
      {!recommendationsLoading &&
        recommendations.length > 0 && (
          <section className="border-t border-[#ead9c4] bg-[#fff8ed]">
            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
              <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#a64b25]">
                    Curated for you
                  </p>

                  <h2 className="mt-2 font-serif text-3xl font-bold text-[#5f2814]">
                    Recommended For You
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#795746]">
                    Discover products selected from shared category, region, tags and product attributes.
                  </p>
                </div>

                <Link
                  to="/store"
                  className="text-sm font-bold text-[#8f3f1f] underline underline-offset-4"
                >
                  Explore all products
                </Link>
              </div>

              <ProductGrid
                products={recommendations}
                onAddToCart={onAddToCart}
              />
            </div>
          </section>
        )}

      {!recommendationsLoading &&
        recommendationsError && (
          <section className="border-t border-[#ead9c4] bg-[#fff8ed]">
            <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
              <ErrorMessage
                title="Recommendations unavailable"
                message="You can still explore more products from this category."
              />
            </div>
          </section>
        )}

      {/* Category-related products */}
      {!relatedLoading &&
        relatedProducts.length > 0 && (
          <section className="border-t border-[#ead9c4] bg-white">
            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
              <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#a64b25]">
                    You may also like
                  </p>

                  <h2 className="mt-2 font-serif text-3xl font-bold text-[#5f2814]">
                    More from this category
                  </h2>
                </div>

                <Link
                  to="/store"
                  className="text-sm font-bold text-[#8f3f1f] underline underline-offset-4"
                >
                  View all products
                </Link>
              </div>

              <ProductGrid
                products={relatedProducts}
                onAddToCart={onAddToCart}
              />
            </div>
          </section>
        )}
    </main>
  )
}

export default ProductDetails
