import { Link } from 'react-router-dom'

function ProductCard({ product, onAddToCart }) {
  const productId = product.id || product._id

  const isOutOfStock = !product.stock || product.stock <= 0

  const handleAddToCart = () => {
    if (isOutOfStock) return

    onAddToCart?.({
      ...product,
      id: productId,
    })
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#ead9c4] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Product Image */}
      <Link to={`/product/${productId}`}>
        <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#fff1dc] p-6">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-44 w-44 items-center justify-center rounded-full bg-[#f4dfbd]">
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
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#6d2e16] shadow-sm">
            {product.category}
          </span>

          {/* Stock */}
          {isOutOfStock && (
            <span className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
              Out of Stock
            </span>
          )}
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-5">
        <Link to={`/product/${productId}`}>
          <h2 className="line-clamp-2 min-h-[3.5rem] font-serif text-xl font-bold text-[#6d2e16] transition hover:text-[#9a4b26]">
            {product.name}
          </h2>
        </Link>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-full bg-[#fff1dc] px-2.5 py-1 text-xs font-bold text-[#6d2e16]">
            ★ {product.rating || 0}
          </span>

          <span className="text-xs text-[#795746]">
            {product.reviewCount || 0} reviews
          </span>
        </div>

        {/* Weight */}
        {product.weight && (
          <p className="mt-3 text-sm text-[#795746]">
            {product.weight}
          </p>
        )}

        {/* Price + Button */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-2xl font-extrabold text-[#6d2e16]">
              ₹{product.price}
            </p>
          </div>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className="rounded-xl bg-[#6d2e16] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#9a4b26] disabled:cursor-not-allowed disabled:bg-[#bca894]"
          >
            {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard