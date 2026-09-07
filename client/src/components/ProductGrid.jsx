import ProductCard from './ProductCard'

function ProductGrid({ products, onAddToCart }) {
  if (!products || products.length === 0) {
    return (
      <div className="rounded-2xl border border-[#ead9c4] bg-[#fffdf8] px-6 py-16 text-center">
        <div className="text-5xl">🍱</div>

        <h3 className="mt-4 font-serif text-2xl font-bold text-[#6d2e16]">
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
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </section>
  )
}

export default ProductGrid