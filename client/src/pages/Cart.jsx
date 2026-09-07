import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

import Loading from '../components/Loading'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import CartItem from '../components/CartItem'
import CartProgress from '../components/CartProgress'
import CartSummary from '../components/CartSummary'

function Cart() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    remainingForFreeDelivery,
    isLoading,
    isSyncing,
    error,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart()

  /*
   * Initial cart loading
   */
  if (isLoading) {
    return (
      <main className="min-h-[70vh] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-[#ead9c4] bg-[#fffdf8] px-6 py-20 text-center shadow-sm">
            <Loading
              type="cart"
              count={1}
            />

            <h1 className="mt-6 font-serif text-3xl font-bold text-[#3d2519]">
              Loading your cart...
            </h1>

            <p className="mt-2 text-[#795746]">
              Syncing your cart with our
              server.
            </p>
          </div>
        </div>
      </main>
    )
  }

  /*
   * Empty cart
   */
  if (cartItems.length === 0) {
    return (
      <main className="min-h-[70vh] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <EmptyState
            icon="🧺"
            title="Your cart is empty"
            message="Looks like you haven't added any authentic Maharashtrian favourites yet. Explore our collection and build your box."
          />

          {error && (
            <div className="mx-auto mt-5 max-w-lg">
              <ErrorMessage
                title="Cart error"
                message={error}
                buttonText="Try Again"
              />
            </div>
          )}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/store"
              className="rounded-full bg-[#6d2e16] px-7 py-3 text-center font-bold text-white transition hover:bg-[#9a4b26]"
            >
              Explore Store
            </Link>

            <Link
              to="/combo"
              className="rounded-full border border-[#6d2e16] px-7 py-3 text-center font-bold text-[#6d2e16] transition hover:bg-[#fff1dc]"
            >
              Build Your Box
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9a4b26]">
            Your Selection
          </p>

          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-4xl font-bold text-[#3d2519]">
                Shopping Cart
              </h1>

              <p className="mt-2 text-[#795746]">
                {cartCount}{' '}
                {cartCount === 1
                  ? 'item'
                  : 'items'}{' '}
                selected
              </p>
            </div>

            <button
              type="button"
              onClick={clearCart}
              disabled={isSyncing}
              className="self-start rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
            >
              {isSyncing
                ? 'Updating...'
                : 'Clear Cart'}
            </button>
          </div>
        </div>

        {/* Sync message */}
        {isSyncing && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#ead9c4] bg-[#fffdf8] px-4 py-3 text-sm font-semibold text-[#6d2e16]">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#ead9c4] border-t-[#6d2e16]" />

            Updating your cart...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6">
            <ErrorMessage
              title="Cart update failed"
              message={error}
              buttonText="Try Again"
            />
          </div>
        )}

        {/* Free Delivery */}
        <CartProgress
          cartSubtotal={cartSubtotal}
          remainingForFreeDelivery={
            remainingForFreeDelivery
          }
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Cart Items */}
          <section>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  isSyncing={isSyncing}
                  onRemove={removeFromCart}
                  onUpdateQuantity={
                    updateQuantity
                  }
                />
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                to="/store"
                className="inline-flex items-center gap-2 font-bold text-[#6d2e16] hover:text-[#9a4b26]"
              >
                ← Continue Shopping
              </Link>
            </div>
          </section>

          {/* Order Summary */}
          <CartSummary
            cartCount={cartCount}
            cartSubtotal={cartSubtotal}
          />
        </div>
      </div>
    </main>
  )
}

export default Cart