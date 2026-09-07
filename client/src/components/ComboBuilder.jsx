import EmptyState from './EmptyState'

function ComboBuilder({
  sections,
  productsBySection,
  selected,
  onToggleProduct,
}) {
  const isSelected = (sectionKey, product) => {
    const selectedProducts = selected?.[sectionKey] || []

    const productId = product.id || product._id

    return selectedProducts.some(
      (item) => (item.id || item._id) === productId,
    )
  }

  return (
    <div className="space-y-8">
      {sections.map((section, index) => {
        const products = productsBySection?.[section.key] || []
        const selectedProducts = selected?.[section.key] || []

        return (
          <section
            key={section.key}
            className="rounded-3xl border border-[#ead9c4] bg-white p-5 shadow-sm sm:p-7"
          >
            {/* Section header */}
            <div className="flex flex-col gap-4 border-b border-[#f0e3d5] pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#8f3f1f] font-serif text-lg font-bold text-white">
                  {index + 1}
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#6d2e16]">
                    {section.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#795746]">
                    {section.subtitle}
                  </p>
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${
                  selectedProducts.length > 0
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-[#fff0dc] text-[#8f3f1f]'
                }`}
              >
                {selectedProducts.length > 0
                  ? 'Selected'
                  : 'Choose 1'}
              </span>
            </div>

            {/* Products */}
            {products.length === 0 ? (
              <div className="mt-5">
                <EmptyState
                  title="No products available"
                  message="There are currently no available products in this section."
                  icon="📦"
                />
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => {
                  const productId = product.id || product._id
                  const selectedProduct = isSelected(
                    section.key,
                    product,
                  )

                  return (
                    <button
                      key={productId}
                      type="button"
                      onClick={() =>
                        onToggleProduct(section.key, product)
                      }
                      aria-pressed={selectedProduct}
                      className={`group relative overflow-hidden rounded-2xl border text-left transition ${
                        selectedProduct
                          ? 'border-[#8f3f1f] bg-[#fff4e7] shadow-md ring-2 ring-[#8f3f1f]/20'
                          : 'border-[#ead9c4] bg-[#fffdf8] hover:-translate-y-0.5 hover:border-[#c99a73] hover:shadow-md'
                      }`}
                    >
                      {/* Selected indicator */}
                      {selectedProduct && (
                        <div className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#8f3f1f] text-sm font-bold text-white shadow-sm">
                          ✓
                        </div>
                      )}

                      {/* Image */}
                      <div className="flex h-44 items-center justify-center overflow-hidden bg-[#f8ead9]">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#f5e4cf]">
                            <span className="font-serif text-3xl font-bold text-[#8f3f1f]">
                              Naik Foods
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h4 className="font-semibold leading-5 text-[#6d2e16]">
                              {product.name}
                            </h4>

                            {product.weight && (
                              <p className="mt-1 text-xs text-[#927665]">
                                {product.weight}
                              </p>
                            )}
                          </div>

                          <p className="shrink-0 font-bold text-[#8f3f1f]">
                            ₹{Number(product.price || 0)}
                          </p>
                        </div>

                        {/* Rating */}
                        {Number(product.rating || 0) > 0 && (
                          <div className="mt-3 flex items-center gap-1 text-xs">
                            <span className="text-amber-500">★</span>

                            <span className="font-semibold text-[#6d2e16]">
                              {Number(product.rating).toFixed(1)}
                            </span>

                            {Number(product.reviewCount || 0) > 0 && (
                              <span className="text-[#927665]">
                                ({product.reviewCount})
                              </span>
                            )}
                          </div>
                        )}

                        {/* Selection state */}
                        <div
                          className={`mt-4 rounded-full px-4 py-2 text-center text-xs font-bold transition ${
                            selectedProduct
                              ? 'bg-[#8f3f1f] text-white'
                              : 'bg-[#f5e4cf] text-[#8f3f1f] group-hover:bg-[#ead5bd]'
                          }`}
                        >
                          {selectedProduct
                            ? 'Selected'
                            : 'Select Product'}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}

export default ComboBuilder