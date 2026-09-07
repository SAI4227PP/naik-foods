import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import ComboBuilder from '../components/ComboBuilder'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

import { createCombo, getProducts } from '../services/api'
import { useCart } from '../context/CartContext'

const FREE_DELIVERY_THRESHOLD = 999

const sections = [
  {
    key: 'snacks',
    title: 'Pick a Maharashtrian Snack',
    subtitle: 'Choose one crispy or savoury favourite.',
    category: 'Snacks & Namkeen',
  },
  {
    key: 'pickles',
    title: 'Add a Traditional Pickle',
    subtitle: 'Choose one bold and authentic flavour.',
    category: 'Pickles & Condiments',
  },
  {
    key: 'grocery',
    title: 'Complete Your Box',
    subtitle:
      'Choose one masala, mukhwas, grocery or everyday favourite.',
    category: 'Dry/Instant Grocery',
  },
]

const CATEGORY_ALIASES = {
  snacks: [
    'snacks',
    'snack',
    'snacks & namkeen',
    'snacks and namkeen',
    'snacks & namkeen',
  ],

  pickles: [
    'pickles',
    'pickle',
    'pickles & condiments',
    'pickles and condiments',
  ],

  grocery: [
    'grocery',
    'dry/instant grocery',
    'dry & instant grocery',
    'dry and instant grocery',
    'dry/instant groceries',
    'dry & instant groceries',
    'dry and instant groceries',
  ],
}

function normalizeCategory(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\//g, ' ')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
}

function categoryMatches(productCategory, sectionKey) {
  const normalizedProductCategory =
    normalizeCategory(productCategory)

  const aliases =
    CATEGORY_ALIASES[sectionKey] || []

  return aliases.some((alias) => {
    const normalizedAlias =
      normalizeCategory(alias)

    return (
      normalizedProductCategory ===
        normalizedAlias ||
      normalizedProductCategory.includes(
        normalizedAlias,
      ) ||
      normalizedAlias.includes(
        normalizedProductCategory,
      )
    )
  })
}

function Combo() {
  const { addToCart } = useCart()

  const [products, setProducts] = useState([])

  const [selectedItems, setSelectedItems] = useState({
    snacks: [],
    pickles: [],
    grocery: [],
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getProducts({
          inStock: true,
        })

        if (!isMounted) return

        const fetchedProducts = Array.isArray(
          data?.products,
        )
          ? data.products
          : []

        setProducts(fetchedProducts)

        console.log(
          'Combo products loaded:',
          fetchedProducts.length,
        )

        console.log(
          'Combo product categories:',
          [
            ...new Set(
              fetchedProducts.map(
                (product) =>
                  product.category,
              ),
            ),
          ],
        )
      } catch (err) {
        if (!isMounted) return

        console.error(
          'Failed to load combo products:',
          err,
        )

        setError(
          err.message ||
            'Unable to load products. Please try again.',
        )
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      isMounted = false
    }
  }, [])

  const productsBySection = useMemo(() => {
    const result = {
      snacks: [],
      pickles: [],
      grocery: [],
    }

    sections.forEach((section) => {
      result[section.key] = products.filter(
        (product) => {
          const price = Number(
            product?.price || 0,
          )

          const stock = Number(
            product?.stock ?? 0,
          )

          if (price <= 0 || stock <= 0) {
            return false
          }

          return categoryMatches(
            product?.category,
            section.key,
          )
        },
      )
    })

    return result
  }, [products])

  const selectedProducts = useMemo(() => {
    return sections.flatMap(
      (section) =>
        selectedItems[section.key] || [],
    )
  }, [selectedItems])

  const selectedCount = selectedProducts.length

  const total = useMemo(() => {
    return selectedProducts.reduce(
      (sum, product) =>
        sum + Number(product?.price || 0),
      0,
    )
  }, [selectedProducts])

  const remainingForFreeDelivery = Math.max(
    FREE_DELIVERY_THRESHOLD - total,
    0,
  )

  const progress = Math.min(
    Math.max(
      (total / FREE_DELIVERY_THRESHOLD) * 100,
      0,
    ),
    100,
  )

  const allSectionsSelected = sections.every(
    (section) =>
      (selectedItems[section.key] || [])
        .length === 1,
  )

  const toggleProduct = (
    sectionKey,
    product,
  ) => {
    if (!product) return

    setError('')
    setSuccessMessage('')

    setSelectedItems((current) => {
      const currentItems = Array.isArray(
        current[sectionKey],
      )
        ? current[sectionKey]
        : []

      const productId =
        product.id || product._id

      const exists = currentItems.some(
        (item) =>
          (item.id || item._id) ===
          productId,
      )

      if (exists) {
        return {
          ...current,
          [sectionKey]: [],
        }
      }

      return {
        ...current,
        [sectionKey]: [product],
      }
    })
  }

  const clearSelection = () => {
    setSelectedItems({
      snacks: [],
      pickles: [],
      grocery: [],
    })

    setError('')
    setSuccessMessage('')
  }

  const addBoxToCart = async () => {
    if (
      !allSectionsSelected ||
      isAdding
    ) {
      return
    }

    try {
      setIsAdding(true)
      setError('')
      setSuccessMessage('')

      const productIds = selectedProducts
        .map(
          (product) =>
            product.id || product._id,
        )
        .filter(Boolean)

      if (productIds.length !== 3) {
        throw new Error(
          'Please select one product from each section.',
        )
      }

      const data = await createCombo(
        productIds,
      )

      const validatedProducts =
        Array.isArray(data?.products) &&
        data.products.length > 0
          ? data.products
          : selectedProducts

      for (const product of validatedProducts) {
        const added = await addToCart(
          product,
          1,
        )

        if (!added) {
          throw new Error(
            `Unable to add ${product.name || 'a selected product'} to the cart.`,
          )
        }
      }

      setSuccessMessage(
        'Your Maharashtra Box has been added to your cart!',
      )

      setSelectedItems({
        snacks: [],
        pickles: [],
        grocery: [],
      })
    } catch (err) {
      console.error(
        'Failed to add Maharashtra Box:',
        err,
      )

      setError(
        err.message ||
          'Unable to add your Maharashtra Box. Please try again.',
      )
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#fff8ed]">
      {/* Hero */}
      <section className="border-b border-[#ead9c4] bg-[#fff8ed]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-[#e6c9a9] bg-[#fffdf8] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8f3f1f]">
              Build Your Maharashtra Box
            </span>

            <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-[#6d2e16] sm:text-5xl lg:text-6xl">
              Create Your Own
              <span className="block text-[#a64b25]">
                Taste of Maharashtra
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#795746] sm:text-lg">
              Pick one snack, one traditional
              pickle and one everyday
              Maharashtrian favourite to create
              your own personalised box.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-semibold text-[#6d2e16]">
              <span className="rounded-full bg-[#f5e4cf] px-4 py-2">
                3 products
              </span>

              <span className="rounded-full bg-[#f5e4cf] px-4 py-2">
                Personalised box
              </span>

              <span className="rounded-full bg-[#f5e4cf] px-4 py-2">
                Free delivery at ₹999
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Builder */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        {loading ? (
          <Loading count={3} />
        ) : error ? (
          <ErrorMessage
            title="Unable to load the box builder"
            message={error}
            buttonText="Try Again"
            onRetry={() =>
              window.location.reload()
            }
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            {/* Selection */}
            <div>
              <div className="mb-8">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#a64b25]">
                  Step-by-step
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold text-[#6d2e16] sm:text-4xl">
                  Build your box
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#795746]">
                  Choose exactly one product
                  from each section.
                </p>
              </div>

              <ComboBuilder
                sections={sections}
                productsBySection={
                  productsBySection
                }
                selected={selectedItems}
                onToggleProduct={
                  toggleProduct
                }
              />
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-[#ead9c4] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#a64b25]">
                      Your Box
                    </p>

                    <p className="mt-2 font-serif text-3xl font-bold text-[#6d2e16]">
                      ₹
                      {total.toLocaleString(
                        'en-IN',
                      )}
                    </p>
                  </div>

                  <span className="rounded-full bg-[#fff0dc] px-4 py-2 text-sm font-bold text-[#8f3f1f]">
                    {selectedCount} / 3
                    {' selected'}
                  </span>
                </div>

                {/* Progress */}
                <div className="mt-7">
                  <div className="flex items-center justify-between gap-3 text-xs font-semibold text-[#795746]">
                    <span>
                      Free delivery progress
                    </span>

                    <span className="whitespace-nowrap">
                      ₹
                      {Math.min(
                        total,
                        FREE_DELIVERY_THRESHOLD,
                      ).toLocaleString(
                        'en-IN',
                      )}
                      {' / ₹'}
                      {FREE_DELIVERY_THRESHOLD.toLocaleString(
                        'en-IN',
                      )}
                    </span>
                  </div>

                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#f1e2d0]">
                    <div
                      className="h-full rounded-full bg-[#a64b25] transition-all duration-500 ease-out"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  {remainingForFreeDelivery >
                  0 ? (
                    <p className="mt-4 text-sm text-[#795746]">
                      Add{' '}
                      <span className="font-bold text-[#6d2e16]">
                        ₹
                        {remainingForFreeDelivery.toLocaleString(
                          'en-IN',
                        )}
                      </span>{' '}
                      more to unlock{' '}
                      <span className="font-bold text-[#6d2e16]">
                        FREE DELIVERY.
                      </span>
                    </p>
                  ) : (
                    <p className="mt-4 text-sm font-bold text-emerald-700">
                      🎉 Free delivery
                      unlocked!
                    </p>
                  )}
                </div>

                {/* Clear */}
                {selectedCount > 0 && (
                  <button
                    type="button"
                    onClick={clearSelection}
                    disabled={isAdding}
                    className="mt-5 w-full rounded-full border border-[#d9bda4] px-5 py-3 text-sm font-bold text-[#8f3f1f] transition hover:bg-[#fff8ed] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Clear Selection
                  </button>
                )}

                {/* Add */}
                <button
                  type="button"
                  onClick={addBoxToCart}
                  disabled={
                    !allSectionsSelected ||
                    isAdding
                  }
                  className="mt-4 w-full rounded-full bg-[#8f3f1f] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#6d2e16] disabled:cursor-not-allowed disabled:bg-[#b8a99d]"
                >
                  {isAdding
                    ? 'Adding Box...'
                    : allSectionsSelected
                      ? 'Add Box to Cart'
                      : `Select ${
                          3 - selectedCount
                        } More`}
                </button>

                {/* Success */}
                {successMessage && (
                  <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-center text-sm font-semibold text-emerald-800">
                      {successMessage}
                    </p>

                    <div className="mt-3 flex justify-center">
                      <Link
                        to="/cart"
                        className="rounded-full bg-[#8f3f1f] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#6d2e16]"
                      >
                        Go to Cart
                      </Link>
                    </div>
                  </div>
                )}

                <p className="mt-4 text-center text-xs leading-5 text-[#927665]">
                  You can review quantities
                  and remove products from your
                  cart after adding the box.
                </p>
              </div>

              {/* Trust */}
              <div className="mt-5 rounded-3xl border border-[#ead9c4] bg-[#fffdf8] p-5">
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <div>
                    <p className="text-sm font-bold text-[#6d2e16]">
                      Authentic flavours
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#795746]">
                      Discover traditional
                      Maharashtrian favourites.
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#6d2e16]">
                      Flexible cart
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#795746]">
                      Adjust quantities after
                      adding your box.
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#6d2e16]">
                      Secure checkout
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#795746]">
                      Continue to the normal cart
                      checkout flow.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  )
}

export default Combo