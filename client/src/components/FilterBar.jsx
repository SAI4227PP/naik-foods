import { Search, SlidersHorizontal, X } from 'lucide-react'

function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
  region,
  setRegion,
  minRating,
  setMinRating,
  maxPrice,
  setMaxPrice,
  inStock,
  setInStock,
  sort,
  setSort,
}) {
  const hasFilters =
    search ||
    category ||
    region ||
    minRating ||
    maxPrice ||
    inStock

  const clearFilters = () => {
    setSearch('')
    setCategory('')
    setRegion('')
    setMinRating('')
    setMaxPrice('')
    setInStock(false)
    setSort('newest')
  }

  return (
    <section className="rounded-3xl border border-orange-100 bg-white p-4 shadow-sm sm:p-5">
      {/* Search */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
          />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search snacks, pickles, masalas..."
            className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 pl-11 pr-4 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="hidden text-sm font-medium text-stone-500 sm:block">
            Sort by
          </span>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm font-medium text-stone-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 sm:w-auto"
          >
            <option value="newest">Newest first</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name: A-Z</option>
          </select>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-stone-100" />

      {/* Filter heading */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <SlidersHorizontal size={17} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-stone-800">
              Refine Products
            </h3>
            <p className="text-xs text-stone-400">
              Find exactly what you're looking for
            </p>
          </div>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-orange-600 transition hover:bg-orange-50"
          >
            <X size={14} />
            Clear all
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {/* Category */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-stone-500">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-3 text-sm text-stone-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
          >
            <option value="">All categories</option>
            <option value="Snacks & Namkeen">Snacks & Namkeen</option>
            <option value="Pickles & Condiments">
              Pickles & Condiments
            </option>
            <option value="Sweets & Bakery">Sweets & Bakery</option>
            <option value="Dairy & Beverages">Dairy & Beverages</option>
            <option value="Mukhvas & Digestives">
              Mukhvas & Digestives
            </option>
            <option value="Confectionery">Confectionery</option>
            <option value="Spices & Masalas">Spices & Masalas</option>
            <option value="Dry/Instant Grocery">
              Dry/Instant Grocery
            </option>
          </select>
        </div>

        {/* Region */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-stone-500">
            Region
          </label>

          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-3 text-sm text-stone-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
          >
            <option value="">All regions</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Vidarbha">Vidarbha</option>
            <option value="Konkan">Konkan</option>
            <option value="Pune">Pune</option>
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-stone-500">
            Rating
          </label>

          <select
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-3 text-sm text-stone-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
          >
            <option value="">Any rating</option>
            <option value="4">4★ & above</option>
            <option value="3">3★ & above</option>
            <option value="2">2★ & above</option>
            <option value="1">1★ & above</option>
          </select>
        </div>

        {/* Max Price */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-stone-500">
            Maximum Price
          </label>

          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-3 text-sm text-stone-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
          >
            <option value="">Any price</option>
            <option value="50">Under ₹50</option>
            <option value="100">Under ₹100</option>
            <option value="200">Under ₹200</option>
            <option value="500">Under ₹500</option>
            <option value="1000">Under ₹1,000</option>
          </select>
        </div>

        {/* Availability */}
        <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold text-stone-500">
            Availability
          </label>

          <button
            type="button"
            onClick={() => setInStock(!inStock)}
            className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 transition ${
              inStock
                ? 'border-orange-300 bg-orange-50 text-orange-700'
                : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300'
            }`}
          >
            <span className="text-sm font-medium">
              Show only in-stock products
            </span>

            <span
              className={`relative h-6 w-11 rounded-full transition ${
                inStock ? 'bg-orange-500' : 'bg-stone-300'
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                  inStock ? 'left-6' : 'left-1'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Active filters */}
      {hasFilters && (
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-stone-100 pt-4">
          <span className="mr-1 text-xs font-semibold text-stone-400">
            Active:
          </span>

          {search && (
            <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700">
              Search: {search}
            </span>
          )}

          {category && (
            <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700">
              {category}
            </span>
          )}

          {region && (
            <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700">
              {region}
            </span>
          )}

          {minRating && (
            <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700">
              {minRating}★+
            </span>
          )}

          {maxPrice && (
            <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700">
              Under ₹{Number(maxPrice).toLocaleString('en-IN')}
            </span>
          )}

          {inStock && (
            <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
              In stock
            </span>
          )}
        </div>
      )}
    </section>
  )
}

export default FilterBar