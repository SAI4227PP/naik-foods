const FREE_DELIVERY_THRESHOLD = 999

function CartSummary({
  cartCount,
  cartSubtotal,
}) {
  const qualifiesForFreeDelivery =
    cartSubtotal >=
    FREE_DELIVERY_THRESHOLD

  const estimatedDelivery =
    cartCount > 0
      ? '3–5 business days'
      : ''

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-3xl border border-[#ead9c4] bg-[#fffdf8] p-6 shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-[#3d2519]">
          Order Summary
        </h2>

        <div className="mt-6 space-y-4 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-[#795746]">
              Items ({cartCount})
            </span>

            <span className="font-semibold text-[#3d2519]">
              ₹{cartSubtotal}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-[#795746]">
              Delivery
            </span>

            <span className="font-semibold text-[#287447]">
              {qualifiesForFreeDelivery
                ? 'FREE'
                : 'Calculated at checkout'}
            </span>
          </div>

          <div className="border-t border-[#ead9c4] pt-4">
            <div className="flex justify-between gap-4">
              <span className="font-bold text-[#3d2519]">
                Total
              </span>

              <span className="text-2xl font-bold text-[#6d2e16]">
                ₹{cartSubtotal}
              </span>
            </div>
          </div>
        </div>

        {/* Checkout placeholder */}
        <div className="mt-6 rounded-2xl border border-dashed border-[#d9c5ae] bg-[#fff8ed] p-4 text-center">
          <p className="font-bold text-[#6d2e16]">
            Checkout coming next
          </p>

          <p className="mt-1 text-xs leading-5 text-[#795746]">
            Your cart is ready. We'll connect
            the checkout and payment flow after
            the Smart Cart is fully tested.
          </p>
        </div>

        {/* Trust */}
        <div className="mt-6 space-y-3 border-t border-[#ead9c4] pt-5">
          <div className="flex gap-3">
            <span>🔒</span>

            <div>
              <p className="text-sm font-bold text-[#3d2519]">
                Secure Cart
              </p>

              <p className="text-xs text-[#795746]">
                Product prices and stock are
                validated by the server.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span>🚚</span>

            <div>
              <p className="text-sm font-bold text-[#3d2519]">
                Free Delivery
              </p>

              <p className="text-xs text-[#795746]">
                Free delivery above ₹999.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span>📦</span>

            <div>
              <p className="text-sm font-bold text-[#3d2519]">
                Estimated Delivery
              </p>

              <p className="text-xs text-[#795746]">
                {estimatedDelivery}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Message */}
      <div className="mt-4 rounded-2xl bg-[#6d2e16] p-5 text-white">
        <p className="font-serif text-lg font-bold">
          Taste Maharashtra at home.
        </p>

        <p className="mt-1 text-sm leading-6 text-white/80">
          Authentic regional delicacies
          carefully selected for your table.
        </p>
      </div>
    </aside>
  )
}

export default CartSummary