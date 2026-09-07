function Loading({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-[360px] animate-pulse rounded-2xl border border-[#ead9c4] bg-white"
        />
      ))}
    </div>
  )
}

export default Loading