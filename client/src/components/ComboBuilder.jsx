import { Check, Package } from 'lucide-react'

import EmptyState from './EmptyState'

function ComboBuilder({
  sections = [],
  productsBySection = {},
  selected = {},
  onToggleProduct,
}) {
  const safeSections = Array.isArray(sections) ? sections : []
  const safeSelected = selected || {}
  const safeProductsBySection = productsBySection || {}

  return (
    <div className="space-y-6">
      {safeSections.map((section, index) => {
        const products = Array.isArray(
          safeProductsBySection[section.key],
        )
          ? safeProductsBySection[section.key]
          : []

        const selectedItems = Array.isArray(
          safeSelected[section.key],
        )
          ? safeSelected[section.key]
          : []

        const selectedProductId =
          selectedItems.length > 0
            ? selectedItems[0]?.id ||
              selectedItems[0]?._id
            : null

        return (
          <section
            key={section.key}
            className="rounded-3xl border border-[#ead9c4] bg-white p-5 shadow-sm sm:p-6"
          >
            {/* Section heading */}
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#fff0dc] text-[#a64b25]">
                <span className="text-sm font-extrabold">
                  {index + 1}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-serif text-xl font-bold text-[#6d2e16]">
                    {section.title}
                  </h3>

                  {selectedProductId && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                      <Check size={11} strokeWidth={3} />
                      Selected
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm leading-6 text-[#795746]">
                  {section.subtitle}
                </p>
              </div>
            </div>

            {/* Products */}
            {products.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => {
                  const productId =
                    product.id || product._id

                  const isSelected =
                    selectedProductId === productId

                  const price = Number(product.price || 0)

                  return (
                    <button
                      key={productId}
                      type="button"
                      onClick={() =>
                        onToggleProduct?.(
                          section.key,
                          product,
                        )
                      }
                      className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-100 ${
                        isSelected
                          ? 'border-[#a64b25] bg-[#fff8ed] shadow-md'
                          : 'border-[#ead9c4] bg-white hover:-translate-y-0.5 hover:border-[#d9b18f] hover:shadow-md'
                      }`}
                    >
                      {/* Selection indicator */}
                      <div
                        className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full transition ${
                          isSelected
                            ? 'bg-[#8f3f1f] text-white'
                            : 'border border-[#ead9c4] bg-white/95 text-transparent shadow-sm'
                        }`}
                      >
                        <Check
                          size={16}
                          strokeWidth={3}
                        />
                      </div>

                      {/* Product image */}
                      <div className="h-44 overflow-hidden bg-[#fff8ed]">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[#d9b18f]">
                            <Package size={36} />
                          </div>
                        )}
                      </div>

                      {/* Product information */}
                      <div className="p-4">
                        <h4 className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-[#6d2e16]">
                          {product.name}
                        </h4>

                        {product.weight && (
                          <p className="mt-1 text-xs text-[#927665]">
                            {product.weight}
                          </p>
                        )}

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-lg font-extrabold text-[#a64b25]">
                            ₹
                            {price.toLocaleString(
                              'en-IN',
                            )}
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              isSelected
                                ? 'bg-[#8f3f1f] text-white'
                                : 'bg-[#fff0dc] text-[#8f3f1f]'
                            }`}
                          >
                            {isSelected
                              ? 'Selected'
                              : 'Choose'}
                          </span>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : (
              <EmptyState
                icon={<Package size={28} />}
                title={`No ${section.title
                  .replace(/^Pick a /, '')
                  .replace(/^Add a /, '')
                  .toLowerCase()} available`}
                message="Try another category or check again later."
              />
            )}
          </section>
        )
      })}
    </div>
  )
}

export default ComboBuilder