import ProductCard from './ProductCard'

function ProductGrid({ products, onAddToCart }) {
  if (!products || products.length === 0) {
    return (
      <div className="rounded-3xl border border-[#ead9c4] bg-white px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#fff1dc] text-4xl">
          🍱
        </div>

        <h3 className="mt-5 font-serif text-2xl font-bold text-[#6d2e16]">
          No products found
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#795746]">
          Try changing your search, category, region, or price filters
          to discover more products.
        </p>
      </div>
    )
  }

  return (
    <section
      aria-label="Product collection"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id || product._id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </section>
  )
}

export default ProductGrid