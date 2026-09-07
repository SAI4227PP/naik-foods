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
  categories,
  regions,
  onClear,
}) {
  return (
    <div className="rounded-3xl border border-[#ead9c4] bg-[#fffdf8] p-5 shadow-sm sm:p-6">
      {/* Search */}
      <div>
        <label
          htmlFor="store-search"
          className="mb-2 block text-sm font-bold text-[#6d2e16]"
        >
          Search Products
        </label>

        <div className="relative">
          <span
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#927665]"
            aria-hidden="true"
          >
            🔎
          </span>

          <input
            id="store-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search snacks, pickles, masalas..."
            autoComplete="off"
            className="w-full rounded-xl border border-[#dcc8ae] bg-white py-3 pl-11 pr-4 text-sm text-[#3d2519] outline-none transition placeholder:text-[#a58b7a] focus:border-[#9a4b26] focus:ring-2 focus:ring-[#9a4b26]/15"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-[#795746] transition hover:bg-[#f5e4cf] hover:text-[#6d2e16]"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {/* Category */}
        <div>
          <label
            htmlFor="store-category"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#795746]"
          >
            Category
          </label>

          <select
            id="store-category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            className="w-full rounded-xl border border-[#dcc8ae] bg-white px-3 py-3 text-sm text-[#3d2519] outline-none focus:border-[#9a4b26] focus:ring-2 focus:ring-[#9a4b26]/15"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Region */}
        <div>
          <label
            htmlFor="store-region"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#795746]"
          >
            Region
          </label>

          <select
            id="store-region"
            value={region}
            onChange={(event) =>
              setRegion(event.target.value)
            }
            className="w-full rounded-xl border border-[#dcc8ae] bg-white px-3 py-3 text-sm text-[#3d2519] outline-none focus:border-[#9a4b26] focus:ring-2 focus:ring-[#9a4b26]/15"
          >
            {regions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label
            htmlFor="store-rating"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#795746]"
          >
            Minimum Rating
          </label>

          <select
            id="store-rating"
            value={minRating}
            onChange={(event) =>
              setMinRating(event.target.value)
            }
            className="w-full rounded-xl border border-[#dcc8ae] bg-white px-3 py-3 text-sm text-[#3d2519] outline-none focus:border-[#9a4b26] focus:ring-2 focus:ring-[#9a4b26]/15"
          >
            <option value="">Any Rating</option>
            <option value="4">4★ & above</option>
            <option value="3">3★ & above</option>
            <option value="2">2★ & above</option>
            <option value="1">1★ & above</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="store-price"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#795746]"
          >
            Max Price
          </label>

          <select
            id="store-price"
            value={maxPrice}
            onChange={(event) =>
              setMaxPrice(event.target.value)
            }
            className="w-full rounded-xl border border-[#dcc8ae] bg-white px-3 py-3 text-sm text-[#3d2519] outline-none focus:border-[#9a4b26] focus:ring-2 focus:ring-[#9a4b26]/15"
          >
            <option value="">Any Price</option>
            <option value="50">Under ₹50</option>
            <option value="100">Under ₹100</option>
            <option value="200">Under ₹200</option>
            <option value="500">Under ₹500</option>
            <option value="1000">Under ₹1000</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label
            htmlFor="store-sort"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#795746]"
          >
            Sort By
          </label>

          <select
            id="store-sort"
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
            className="w-full rounded-xl border border-[#dcc8ae] bg-white px-3 py-3 text-sm text-[#3d2519] outline-none focus:border-[#9a4b26] focus:ring-2 focus:ring-[#9a4b26]/15"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">
              Price: Low to High
            </option>
            <option value="price-high">
              Price: High to Low
            </option>
            <option value="rating">
              Highest Rated
            </option>
            <option value="name">Name: A-Z</option>
          </select>
        </div>

        {/* Stock */}
        <div className="flex items-end">
          <label className="flex min-h-[46px] w-full cursor-pointer items-center gap-3 rounded-xl border border-[#dcc8ae] bg-white px-4 py-3">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(event) =>
                setInStock(event.target.checked)
              }
              className="size-4 accent-[#8f3f1f]"
            />

            <span className="text-sm font-semibold text-[#6d2e16]">
              In stock only
            </span>
          </label>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="mt-5 flex flex-col gap-3 border-t border-[#ead9c4] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-[#927665]">
          Search by product name, category, region or product tags.
        </p>

        <button
          type="button"
          onClick={onClear}
          className="rounded-full border border-[#cfae91] bg-white px-5 py-2.5 text-sm font-bold text-[#8f3f1f] transition hover:bg-[#fff4e7]"
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default FilterBar