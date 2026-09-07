import { Link } from 'react-router-dom'
import { ArrowRight, Lock, ShieldCheck, Truck } from 'lucide-react'

const FREE_DELIVERY_THRESHOLD = 999

function CartSummary({
  subtotal = 0,
  itemCount = 0,
}) {
  const safeSubtotal = Math.max(Number(subtotal) || 0, 0)
  const safeItemCount = Math.max(Number(itemCount) || 0, 0)

  const isFreeDelivery =
    safeSubtotal >= FREE_DELIVERY_THRESHOLD

  const deliveryCharge = isFreeDelivery ? 0 : 0
  const total = safeSubtotal + deliveryCharge

  return (
    <aside className="rounded-3xl border border-[#ead9c4] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-[#6d2e16]">
          Order Summary
        </h2>

        <span className="rounded-full bg-[#fff0dc] px-3 py-1 text-xs font-bold text-[#8f3f1f]">
          {safeItemCount}{' '}
          {safeItemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#795746]">
            Subtotal
          </span>

          <span className="font-bold text-[#6d2e16]">
            ₹{safeSubtotal.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-[#795746]">
            <Truck size={15} />

            Delivery
          </span>

          {isFreeDelivery ? (
            <span className="font-bold text-emerald-700">
              FREE
            </span>
          ) : (
            <span className="text-xs font-semibold text-[#927665]">
              Calculated at checkout
            </span>
          )}
        </div>

        <div className="border-t border-[#ead9c4] pt-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-[#6d2e16]">
              Total
            </span>

            <span className="text-2xl font-extrabold text-[#8f3f1f]">
              ₹{total.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Checkout */}
      <button
        type="button"
        disabled
        className="mt-6 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[#b8a99d] px-6 py-4 text-sm font-bold text-white"
        title="Checkout will be enabled when payment integration is connected."
      >
        Proceed to Checkout
        <ArrowRight size={17} />
      </button>

      <p className="mt-3 text-center text-xs leading-5 text-[#927665]">
        Secure checkout will be available once payment
        integration is connected.
      </p>

      {/* Continue shopping */}
      <Link
        to="/store"
        className="mt-3 flex w-full items-center justify-center rounded-full border border-[#d9bda4] px-6 py-3.5 text-sm font-bold text-[#8f3f1f] transition hover:bg-[#fff8ed]"
      >
        Continue Shopping
      </Link>

      {/* Trust information */}
      <div className="mt-6 space-y-3 border-t border-[#ead9c4] pt-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fff0dc] text-[#a64b25]">
            <ShieldCheck size={18} />
          </div>

          <div>
            <p className="text-sm font-bold text-[#6d2e16]">
              Secure payment
            </p>

            <p className="mt-0.5 text-xs leading-5 text-[#927665]">
              Your payment information is protected.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fff0dc] text-[#a64b25]">
            <Lock size={18} />
          </div>

          <div>
            <p className="text-sm font-bold text-[#6d2e16]">
              Safe checkout
            </p>

            <p className="mt-0.5 text-xs leading-5 text-[#927665]">
              We validate product price and availability
              before checkout.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default CartSummary