import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Filter,
  PackageSearch,
  RefreshCw,
  Search,
  SlidersHorizontal,
} from 'lucide-react'

import ProductGrid from '../components/ProductGrid'
import FilterBar from '../components/FilterBar'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'

import { getProducts } from '../services/api'

const DEBOUNCE_DELAY = 300

function Store({ onAddToCart }) {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)

  const [searchInput, setSearchInput] =
    useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [region, setRegion] = useState('')
  const [minRating, setMinRating] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [inStock, setInStock] = useState(true)
  const [sort, setSort] = useState('newest')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput.trim())
    }, DEBOUNCE_DELAY)

    return () => {
      clearTimeout(timeout)
    }
  }, [searchInput])

  useEffect(() => {
    let mounted = true

    async function loadProducts() {
      try {
        setLoading(true)
        setError('')

        const data = await getProducts({
          search,
          category,
          region,
          minRating,
          maxPrice,
          inStock,
          sort,
        })

        if (!mounted) return

        setProducts(
          Array.isArray(data?.products)
            ? data.products
            : [],
        )

        setTotal(
          Number(
            data?.total ??
              data?.count ??
              data?.products?.length ??
              0,
          ),
        )
      } catch (err) {
        if (!mounted) return

        console.error(
          'Store products loading failed:',
          err,
        )

        setProducts([])
        setTotal(0)

        setError(
          err.message ||
            'Unable to load products. Please try again.',
        )
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      mounted = false
    }
  }, [
    search,
    category,
    region,
    minRating,
    maxPrice,
    inStock,
    sort,
  ])

  const activeFilterCount = useMemo(() => {
    let count = 0

    if (category) count += 1
    if (region) count += 1
    if (minRating) count += 1
    if (maxPrice) count += 1

    return count
  }, [
    category,
    region,
    minRating,
    maxPrice,
  ])

  const clearFilters = () => {
    setSearchInput('')
    setSearch('')
    setCategory('')
    setRegion('')
    setMinRating('')
    setMaxPrice('')
    setInStock(true)
    setSort('newest')
  }

  const hasSearchOrFilters =
    Boolean(searchInput) ||
    Boolean(category) ||
    Boolean(region) ||
    Boolean(minRating) ||
    Boolean(maxPrice)

  return (
    <main className="min-h-screen bg-[#fffaf4]">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="border-b border-[#ead9c4] bg-[#fff8ed]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#927665]">
            <Link
              to="/"
              className="transition hover:text-[#8f3f1f]"
            >
              Home
            </Link>

            <ChevronRight size={14} />

            <span className="font-bold text-[#8f3f1f]">
              Store
            </span>
          </div>

          <div className="mt-7 max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#a64b25]">
              Authentic Maharashtrian Foods
            </p>

            <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-[#5f2814] sm:text-5xl lg:text-6xl">
              Discover the Taste of Maharashtra
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#795746] sm:text-base">
              Explore traditional snacks, pickles,
              sweets, masalas, beverages, mukhwas
              and everyday favourites from Naik Foods.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-3xl">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[#a88f7c]"
              />

              <input
                type="search"
                value={searchInput}
                onChange={(event) =>
                  setSearchInput(event.target.value)
                }
                placeholder="Search snacks, pickles, masalas, noodles..."
                className="h-14 w-full rounded-2xl border border-[#dfc9b2] bg-white pl-13 pr-5 text-sm font-medium text-[#6d2e16] shadow-sm outline-none transition placeholder:text-[#ad9887] focus:border-[#a64b25] focus:ring-4 focus:ring-orange-100"
              />
            </div>
          </div>

          {/* Quick categories */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
            {[
              'Snacks & Namkeen',
              'Pickles & Condiments',
              'Sweets & Bakery',
              'Spices & Masalas',
              'Dry/Instant Grocery',
            ].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setCategory(
                    category === item
                      ? ''
                      : item,
                  )
                }
                className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold transition ${
                  category === item
                    ? 'border-[#8f3f1f] bg-[#8f3f1f] text-white'
                    : 'border-[#dfc9b2] bg-white text-[#795746] hover:border-[#b98561] hover:text-[#8f3f1f]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          STORE CONTENT
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        {/* Top toolbar */}
        <div className="flex flex-col gap-5 border-b border-[#ead9c4] pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-2xl font-bold text-[#5f2814]">
                Shop Products
              </h2>

              {!loading && (
                <span className="rounded-full bg-[#fff0dc] px-3 py-1 text-xs font-extrabold text-[#8f3f1f]">
                  {total} products
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-[#927665]">
              Find your favourite traditional flavours.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile filters */}
            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(
                  (current) => !current,
                )
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#dcc5ae] bg-white px-4 text-sm font-bold text-[#6d2e16] transition hover:bg-[#fff8ed] lg:hidden"
            >
              <SlidersHorizontal size={17} />

              Filters

              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#8f3f1f] px-1.5 text-[10px] text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort */}
            <div className="flex h-11 items-center gap-2 rounded-xl border border-[#dcc5ae] bg-white px-3">
              <span className="hidden text-xs font-semibold text-[#927665] sm:inline">
                Sort:
              </span>

              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value)
                }
                className="bg-transparent text-sm font-bold text-[#6d2e16] outline-none"
              >
                <option value="newest">
                  Newest first
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Highest Rated
                </option>

                <option value="name">
                  Name: A to Z
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div
          className={`${
            mobileFiltersOpen
              ? 'block'
              : 'hidden'
          } mt-6 lg:block`}
        >
          <FilterBar
            search={searchInput}
            setSearch={setSearchInput}
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
            onClear={clearFilters}
          />
        </div>

        {/* Active search */}
        {hasSearchOrFilters && (
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-[#ead9c4] bg-white px-4 py-3">
            <Filter
              size={16}
              className="text-[#a64b25]"
            />

            <span className="text-xs font-bold text-[#795746]">
              Active search:
            </span>

            {search && (
              <span className="rounded-full bg-[#fff0dc] px-3 py-1.5 text-xs font-bold text-[#8f3f1f]">
                “{search}”
              </span>
            )}

            {category && (
              <span className="rounded-full bg-[#fff0dc] px-3 py-1.5 text-xs font-bold text-[#8f3f1f]">
                {category}
              </span>
            )}

            {region && (
              <span className="rounded-full bg-[#fff0dc] px-3 py-1.5 text-xs font-bold text-[#8f3f1f]">
                {region}
              </span>
            )}

            <button
              type="button"
              onClick={clearFilters}
              className="ml-auto text-xs font-bold text-[#8f3f1f] underline underline-offset-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* =====================================================
            PRODUCTS
        ====================================================== */}
        <div className="mt-8">
          {loading ? (
            <Loading count={8} />
          ) : error ? (
            <div className="rounded-3xl border border-[#ead9c4] bg-white p-8">
              <ErrorMessage
                title="Unable to load products"
                message={error}
                buttonText="Try Again"
                onRetry={() => {
                  setError('')
                  setSearchInput(
                    (current) => current,
                  )
                }}
              />
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-3xl border border-[#ead9c4] bg-white py-12">
              <EmptyState
                icon={
                  <PackageSearch size={32} />
                }
                title="No products found"
                message="Try changing your search or removing some filters."
              />

              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 rounded-full bg-[#8f3f1f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#6d2e16]"
                >
                  <RefreshCw size={16} />
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Result heading */}
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#795746]">
                  Showing{' '}
                  <span className="font-bold text-[#6d2e16]">
                    {products.length}
                  </span>{' '}
                  of{' '}
                  <span className="font-bold text-[#6d2e16]">
                    {total}
                  </span>{' '}
                  products
                </p>

                {inStock && (
                  <span className="text-xs font-semibold text-emerald-700">
                    ● Showing products currently in stock
                  </span>
                )}
              </div>

              <ProductGrid
                products={products}
                onAddToCart={onAddToCart}
              />
            </>
          )}
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}
      <section className="border-t border-[#ead9c4] bg-[#fff0dc]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="grid gap-8 rounded-[28px] border border-[#e5c8a8] bg-white p-7 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#a64b25]">
                Build something special
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold text-[#5f2814]">
                Create Your Maharashtra Box
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#795746]">
                Pick a snack, a traditional pickle and
                an everyday favourite to create your own
                regional food box.
              </p>
            </div>

            <Link
              to="/combo"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8f3f1f] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#6d2e16]"
            >
              Build Your Box
              <ChevronRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Store
