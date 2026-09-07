import { useEffect, useState } from 'react'

import ProductGrid from '../components/ProductGrid'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import FilterBar from '../components/FilterBar'

import { getProducts } from '../services/api'

const categories = [
  'All',
  'Snacks & Namkeen',
  'Pickles & Condiments',
  'Sweets & Bakery',
  'Dairy & Beverages',
  'Mukhvas & Digestives',
  'Confectionery',
  'Spices & Masalas',
  'Dry/Instant Grocery',
]

const regions = [
  'All',
  'Maharashtra',
  'Vidarbha',
  'Konkan',
]

function Store({ onAddToCart }) {
  const [products, setProducts] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [region, setRegion] = useState('All')
  const [minRating, setMinRating] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [inStock, setInStock] = useState(false)
  const [sort, setSort] = useState('newest')

  async function loadProducts() {
    try {
      setLoading(true)
      setError('')

      const params = {}

      if (search.trim()) {
        params.search = search.trim()
      }

      if (category !== 'All') {
        params.category = category
      }

      if (region !== 'All') {
        params.region = region
      }

      if (minRating) {
        params.minRating = minRating
      }

      if (maxPrice) {
        params.maxPrice = maxPrice
      }

      if (inStock) {
        params.inStock = 'true'
      }

      params.sort = sort

      const response = await getProducts(params)

      setProducts(response.products || [])
    } catch (err) {
      console.error('Failed to load products:', err)

      setError(
        err.message || 'Unable to load products',
      )
    } finally {
      setLoading(false)
    }
  }

  /*
   * Search/filter products through the backend.
   *
   * 300ms debounce prevents an API request
   * for every single character typed.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts()
    }, 300)

    return () => clearTimeout(timer)
  }, [
    search,
    category,
    region,
    minRating,
    maxPrice,
    inStock,
    sort,
  ])

  function clearFilters() {
    setSearch('')
    setCategory('All')
    setRegion('All')
    setMinRating('')
    setMaxPrice('')
    setInStock(false)
    setSort('newest')
  }

  return (
    <main className="min-h-screen bg-[#fff8ed]">

      {/* Header */}
      <section className="border-b border-[#ead9c4] bg-[#fffdf8]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b45f2a]">
            Naik Foods Store
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold text-[#6d2e16] sm:text-5xl">
            Authentic Maharashtra,
            <br />
            delivered to your doorstep.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-[#795746]">
            Explore traditional snacks, pickles, masalas,
            beverages and regional favourites.
          </p>

        </div>
      </section>

      {/* Store */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Search + Filters */}
        <FilterBar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          region={region}
          setRegion={setRegion}
          minRating={minRating}
          setMinRating={setMinRating}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          inStock={inStock}
          setInStock={setInStock}
          sort={sort}
          setSort={setSort}
          categories={categories}
          regions={regions}
          onClear={clearFilters}
        />

        {/* Result count */}
        <div className="my-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-semibold text-[#6d2e16]">
              {loading
                ? 'Loading products...'
                : `${products.length} products found`}
            </p>

            {!loading && (
              <p className="mt-1 text-xs text-[#795746]">
                Authentic products from Naik Foods
              </p>
            )}
          </div>

          {search.trim() && !loading && (
            <p className="text-sm text-[#795746]">
              Search results for{' '}
              <span className="font-bold text-[#6d2e16]">
                "{search.trim()}"
              </span>
            </p>
          )}

        </div>

        {/* Loading */}
        {loading && <Loading />}

        {/* Error */}
        {!loading && error && (
          <ErrorMessage
            title="Unable to load products"
            message={error}
            buttonText="Try Again"
            onRetry={loadProducts}
          />
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          products.length === 0 && (
            <EmptyState
              title={
                search.trim()
                  ? `No products found for "${search.trim()}"`
                  : 'No products found'
              }
              message="Try changing your search or filters to discover more products."
              actionLabel="Clear Filters"
              onAction={clearFilters}
            />
          )}

        {/* Products */}
        {!loading &&
          !error &&
          products.length > 0 && (
            <ProductGrid
              products={products}
              onAddToCart={onAddToCart}
            />
          )}

      </div>
    </main>
  )
}

export default Store