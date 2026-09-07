const FREE_DELIVERY_THRESHOLD = 999

function CartProgress({
  cartSubtotal,
  remainingForFreeDelivery,
}) {
  const deliveryProgress = Math.min(
    (cartSubtotal /
      FREE_DELIVERY_THRESHOLD) *
      100,
    100,
  )

  const qualifiesForFreeDelivery =
    cartSubtotal >=
    FREE_DELIVERY_THRESHOLD

  return (
    <section className="mb-8 rounded-2xl border border-[#ead9c4] bg-[#fffdf8] p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {qualifiesForFreeDelivery ? (
            <p className="font-bold text-[#287447]">
              🎉 You unlocked FREE DELIVERY!
            </p>
          ) : (
            <p className="font-bold text-[#6d2e16]">
              Add ₹{remainingForFreeDelivery}{' '}
              more to unlock FREE DELIVERY
            </p>
          )}

          <p className="mt-1 text-sm text-[#795746]">
            Free delivery on orders above ₹999
          </p>
        </div>

        <span className="font-bold text-[#6d2e16]">
          ₹{cartSubtotal} / ₹
          {FREE_DELIVERY_THRESHOLD}
        </span>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#ead9c4]">
        <div
          className="h-full rounded-full bg-[#6d2e16] transition-all duration-500"
          style={{
            width: `${deliveryProgress}%`,
          }}
        />
      </div>
    </section>
  )
}

export default CartProgress