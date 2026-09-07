import { Link } from 'react-router-dom'
import { ArrowLeft, ShoppingBag } from 'lucide-react'

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
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart()

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Loading />
      </main>
    )
  }

  if (!cartItems.length) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <EmptyState
            icon={<ShoppingBag size={34} />}
            title="Your cart is empty"
            message="Looks like you haven't added anything yet. Explore our authentic Maharashtrian products and find something delicious."
          />

          {error && (
            <div className="mt-5">
              <ErrorMessage message={error} />
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <Link
              to="/store"
              className="inline-flex items-center gap-2 rounded-2xl bg-orange-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-700 hover:shadow-md"
            >
              <ShoppingBag size={17} />
              Start Shopping
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/store"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition hover:text-orange-600"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
                Your Shopping Cart
              </p>

              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-stone-800 sm:text-4xl">
                Cart
              </h1>
            </div>

            <p className="text-sm text-stone-500">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Sync status */}
        {isSyncing && (
          <div className="mb-5 flex items-center gap-2 rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm font-medium text-orange-700">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-orange-200 border-t-orange-600" />
            Updating your cart...
          </div>
        )}

        {/* Free delivery progress */}
        <div className="mb-6">
          <CartProgress
            subtotal={cartSubtotal}
            remainingForFreeDelivery={remainingForFreeDelivery}
          />
        </div>

        {/* Main cart layout */}
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* Cart items */}
          <section className="min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-stone-800">
                Your Items
              </h2>

              <button
                type="button"
                onClick={clearCart}
                disabled={isSyncing}
                className="text-xs font-semibold text-stone-400 transition hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear cart
              </button>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          </section>

          {/* Summary */}
          <CartSummary subtotal={cartSubtotal} />
        </div>
      </div>
    </main>
  )
}

export default Cart