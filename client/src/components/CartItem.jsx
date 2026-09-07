import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const productId = item.id || item._id

  const price = Number(item.price || 0)
  const quantity = Number(item.quantity || 1)
  const stock = Number(item.stock ?? 999)
  const itemTotal = price * quantity

  const decrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(productId, quantity - 1)
    }
  }

  const increase = () => {
    if (quantity < stock) {
      onUpdateQuantity(productId, quantity + 1)
    }
  }

  return (
    <article className="group rounded-3xl border border-stone-200 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:shadow-md sm:p-5">
      <div className="flex gap-4">
        {/* Product image */}
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-orange-50 sm:h-28 sm:w-28">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-orange-300">
              <ShoppingBag size={30} />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-sm font-bold leading-5 text-stone-800 sm:text-base">
                {item.name}
              </h3>

              {item.weight && (
                <p className="mt-1 text-xs text-stone-400">
                  {item.weight}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => onRemove(productId)}
              className="shrink-0 rounded-xl p-2 text-stone-400 transition hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-4 focus:ring-red-100"
              aria-label={`Remove ${item.name}`}
              title="Remove item"
            >
              <Trash2 size={17} />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            {/* Quantity */}
            <div className="flex items-center rounded-xl border border-stone-200 bg-stone-50">
              <button
                type="button"
                onClick={decrease}
                disabled={quantity <= 1}
                className="flex h-9 w-9 items-center justify-center rounded-l-xl text-stone-600 transition hover:bg-white hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="Decrease quantity"
              >
                <Minus size={15} />
              </button>

              <span className="flex h-9 min-w-9 items-center justify-center border-x border-stone-200 bg-white px-2 text-sm font-bold text-stone-800">
                {quantity}
              </span>

              <button
                type="button"
                onClick={increase}
                disabled={quantity >= stock}
                className="flex h-9 w-9 items-center justify-center rounded-r-xl text-stone-600 transition hover:bg-white hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="Increase quantity"
              >
                <Plus size={15} />
              </button>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-base font-extrabold text-orange-600">
                ₹{itemTotal.toLocaleString('en-IN')}
              </p>

              {quantity > 1 && (
                <p className="text-xs text-stone-400">
                  ₹{price.toLocaleString('en-IN')} each
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CartItem