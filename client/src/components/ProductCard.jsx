import { Link } from 'react-router-dom'

function ProductCard({ product, onAddToCart }) {
  const productId = product.id || product._id

  const stock = Number(product.stock ?? 0)
  const rating = Number(product.rating ?? 0)
  const reviewCount = Number(product.reviewCount ?? 0)
  const price = Number(product.price ?? 0)

  const isOutOfStock = stock <= 0
  const isLowStock = stock > 0 && stock <= 5

  const handleAddToCart = (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (isOutOfStock) {
      return
    }

    onAddToCart?.({
      ...product,
      id: productId,
    })
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#ead9c4] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#d8bd99] hover:shadow-xl">
      {/* Product Image */}
      <Link
        to={`/product/${productId}`}
        aria-label={`View ${product.name}`}
        className="block"
      >
        <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#fff7e9] p-5 sm:h-68">
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#f4dfbd]/50 transition duration-500 group-hover:scale-125" />

          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="relative z-10 h-full w-full object-contain drop-shadow-sm transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="relative z-10 flex h-44 w-44 items-center justify-center rounded-full bg-[#f4dfbd] shadow-inner">
              <div className="text-center">
                <p className="font-serif text-3xl font-bold text-[#6d2e16]">
                  Naik
                </p>

                <p className="text-sm font-semibold text-[#9a4b26]">
                  Foods
                </p>
              </div>
            </div>
          )}

          {/* Category */}
          {product.category && (
            <span className="absolute left-3 top-3 z-20 max-w-[75%] truncate rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#6d2e16] shadow-sm backdrop-blur">
              {product.category}
            </span>
          )}

          {/* Stock status */}
          {isOutOfStock && (
            <span className="absolute right-3 top-3 z-20 rounded-full bg-[#6d2e16] px-3 py-1.5 text-[11px] font-bold text-white shadow-sm">
              Out of Stock
            </span>
          )}

          {isLowStock && (
            <span className="absolute right-3 top-3 z-20 rounded-full bg-[#fff1dc] px-3 py-1.5 text-[11px] font-bold text-[#9a4b26] shadow-sm">
              Only {stock} left
            </span>
          )}

          {/* View product hint */}
          <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 translate-y-2 rounded-full bg-[#6d2e16]/90 px-3 py-1.5 text-[11px] font-bold text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View Product →
          </div>
        </div>
      </Link>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-5">
        <Link
          to={`/product/${productId}`}
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a4b26]"
        >
          <h2 className="line-clamp-2 min-h-[3.5rem] font-serif text-xl font-bold leading-7 text-[#6d2e16] transition group-hover:text-[#9a4b26]">
            {product.name}
          </h2>
        </Link>

        {/* Rating */}
        <div className="mt-3 flex min-h-[24px] items-center gap-2">
          {rating > 0 ? (
            <>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#fff1dc] px-2.5 py-1 text-xs font-bold text-[#6d2e16]">
                <span>★</span>
                {rating.toFixed(1)}
              </span>

              <span className="text-xs text-[#795746]">
                {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
              </span>
            </>
          ) : (
            <span className="text-xs text-[#9a8171]">
              No reviews yet
            </span>
          )}
        </div>

        {/* Weight */}
        <div className="mt-3 min-h-[24px]">
          {product.weight ? (
            <span className="inline-flex rounded-full bg-[#faf3e8] px-2.5 py-1 text-xs font-semibold text-[#795746]">
              {product.weight}
            </span>
          ) : (
            <span className="text-xs text-transparent">
              Product weight
            </span>
          )}
        </div>

        {/* Bottom */}
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-xs font-medium text-[#9a8171]">
              Price
            </p>

            <p className="mt-0.5 text-2xl font-extrabold tracking-tight text-[#6d2e16]">
              ₹{price}
            </p>
          </div>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#6d2e16] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#9a4b26] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d2e16] disabled:cursor-not-allowed disabled:bg-[#c8b8aa] disabled:text-[#fffaf5] disabled:shadow-none"
          >
            {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard