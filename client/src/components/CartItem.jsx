import { Link } from 'react-router-dom'

function CartItem({
  item,
  isSyncing,
  onRemove,
  onUpdateQuantity,
}) {
  const itemTotal =
    item.price * item.quantity

  const canIncrease =
    item.quantity < item.stock

  return (
    <article className="rounded-2xl border border-[#ead9c4] bg-[#fffdf8] p-4 shadow-sm sm:p-5">
      <div className="flex gap-4">
        {/* Image */}
        <Link
          to={`/product/${item.id}`}
          className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f8e6c5] sm:h-36 sm:w-36"
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-contain p-3"
            />
          ) : (
            <div className="text-center">
              <div className="font-serif text-2xl font-bold text-[#6d2e16]">
                Naik
              </div>

              <div className="text-xs font-semibold text-[#9a4b26]">
                Foods
              </div>
            </div>
          )}
        </Link>

        {/* Product Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link
                to={`/product/${item.id}`}
              >
                <h2 className="font-serif text-xl font-bold text-[#3d2519] transition hover:text-[#9a4b26]">
                  {item.name}
                </h2>
              </Link>

              {item.weight && (
                <p className="mt-1 text-sm text-[#795746]">
                  {item.weight}
                </p>
              )}
            </div>

            {/* Remove */}
            <button
              type="button"
              onClick={() =>
                onRemove(item.id)
              }
              disabled={isSyncing}
              aria-label={`Remove ${item.name}`}
              className="rounded-full p-2 text-xl text-[#8b7565] transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ×
            </button>
          </div>

          {/* Quantity + Price */}
          <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            {/* Quantity */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() =>
                  onUpdateQuantity(
                    item.id,
                    item.quantity - 1,
                  )
                }
                disabled={
                  item.quantity <= 1 ||
                  isSyncing
                }
                className="flex h-9 w-9 items-center justify-center rounded-l-lg border border-[#d9c5ae] bg-[#fff8ed] text-lg font-bold text-[#6d2e16] disabled:cursor-not-allowed disabled:opacity-40"
              >
                −
              </button>

              <span className="flex h-9 min-w-12 items-center justify-center border-y border-[#d9c5ae] bg-white px-3 text-sm font-bold text-[#3d2519]">
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  onUpdateQuantity(
                    item.id,
                    item.quantity + 1,
                  )
                }
                disabled={
                  !canIncrease ||
                  isSyncing
                }
                className="flex h-9 w-9 items-center justify-center rounded-r-lg border border-[#d9c5ae] bg-[#fff8ed] text-lg font-bold text-[#6d2e16] disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>
            </div>

            {/* Price */}
            <div className="text-left sm:text-right">
              <p className="text-xs text-[#8b7565]">
                ₹{item.price} ×{' '}
                {item.quantity}
              </p>

              <p className="mt-1 text-xl font-bold text-[#6d2e16]">
                ₹{itemTotal}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CartItem