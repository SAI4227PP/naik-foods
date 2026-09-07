function EmptyState({
  title = 'No products found',
  message = 'Try changing your search or filters to discover more products.',
  icon = '🍱',
  actionLabel,
  onAction,
}) {
  return (
    <div className="rounded-2xl border border-[#ead9c4] bg-[#fffdf8] px-6 py-16 text-center">
      <div className="text-5xl">{icon}</div>

      <h3 className="mt-4 font-serif text-2xl font-bold text-[#6d2e16]">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#795746]">
        {message}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-xl bg-[#6d2e16] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9a4b26]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState