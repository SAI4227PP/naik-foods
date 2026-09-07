import { Check, Truck } from 'lucide-react'

const FREE_DELIVERY_THRESHOLD = 999

function CartProgress({ subtotal = 0 }) {
  const safeSubtotal = Math.max(Number(subtotal) || 0, 0)

  const remaining = Math.max(
    FREE_DELIVERY_THRESHOLD - safeSubtotal,
    0,
  )

  const progress = Math.min(
    Math.max(
      (safeSubtotal / FREE_DELIVERY_THRESHOLD) * 100,
      0,
    ),
    100,
  )

  const unlocked =
    safeSubtotal >= FREE_DELIVERY_THRESHOLD

  return (
    <div className="rounded-3xl border border-[#ead9c4] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
            unlocked
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-[#fff0dc] text-[#a64b25]'
          }`}
        >
          {unlocked ? (
            <Check size={21} strokeWidth={3} />
          ) : (
            <Truck size={21} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold text-[#6d2e16]">
              {unlocked
                ? 'Free delivery unlocked!'
                : 'Free delivery progress'}
            </p>

            <p className="text-xs font-semibold text-[#927665]">
              ₹
              {Math.min(
                safeSubtotal,
                FREE_DELIVERY_THRESHOLD,
              ).toLocaleString('en-IN')}{' '}
              / ₹
              {FREE_DELIVERY_THRESHOLD.toLocaleString(
                'en-IN',
              )}
            </p>
          </div>

          <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#f1e2d0]">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                unlocked
                  ? 'bg-emerald-500'
                  : 'bg-[#a64b25]'
              }`}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {unlocked ? (
            <p className="mt-3 text-sm font-semibold text-emerald-700">
              🎉 Your order qualifies for free delivery.
            </p>
          ) : (
            <p className="mt-3 text-sm leading-6 text-[#795746]">
              Add{' '}
              <span className="font-bold text-[#6d2e16]">
                ₹
                {remaining.toLocaleString('en-IN')}
              </span>{' '}
              more to unlock{' '}
              <span className="font-bold text-[#6d2e16]">
                FREE DELIVERY
              </span>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartProgress