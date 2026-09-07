import { Link } from 'react-router-dom'

function Home() {
  const categories = [
    {
      emoji: '🥨',
      title: 'Snacks & Namkeen',
      description: 'Crispy and delicious traditional snacks',
    },
    {
      emoji: '🥒',
      title: 'Pickles & Condiments',
      description: 'Bold flavours from traditional recipes',
    },
    {
      emoji: '🌶️',
      title: 'Spices & Masalas',
      description: 'Authentic spices for everyday cooking',
    },
    {
      emoji: '🍬',
      title: 'Sweets & Bakery',
      description: 'Traditional treats for every occasion',
    },
  ]

  const features = [
    {
      emoji: '🚚',
      title: 'Free Delivery',
      description: 'On orders above ₹999',
    },
    {
      emoji: '🔒',
      title: 'Secure Payment',
      description: 'Safe and secure checkout',
    },
    {
      emoji: '🌾',
      title: 'Authentic Products',
      description: 'Inspired by regional recipes',
    },
    {
      emoji: '💬',
      title: 'Customer Support',
      description: "We're here to help",
    },
  ]

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#fff8ed]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#ead8c0] bg-[radial-gradient(circle_at_85%_15%,_#f4d49b_0,_transparent_28%),linear-gradient(135deg,_#fff8ed,_#f9e7c7)] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#f4d49b]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-[#9a4b26]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#9a4b26]/15 bg-white/70 px-4 py-2 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#9a4b26]" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a4b26]">
                From Maharashtra, with tradition
              </span>
            </div>

            <h1 className="mt-6 font-serif text-5xl font-bold leading-[1.05] tracking-tight text-[#6d2e16] sm:text-6xl lg:text-7xl">
              The Heart of
              <span className="block text-[#9a4b26]">
                Authentic Maharashtra
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#795746] sm:text-lg sm:leading-8">
              Discover authentic Maharashtrian flavours inspired by the
              traditional recipes of Vidarbha and Konkan.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/store"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#6d2e16] px-7 py-3.5 font-bold text-white shadow-lg shadow-[#6d2e16]/15 transition hover:-translate-y-0.5 hover:bg-[#9a4b26] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d2e16]"
              >
                Explore Products
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                to="/combo"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#6d2e16] bg-white/40 px-7 py-3.5 font-bold text-[#6d2e16] transition hover:-translate-y-0.5 hover:bg-[#6d2e16] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d2e16]"
              >
                🧺 Build Your Box
              </Link>
            </div>

            {/* Trust stats */}
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-[#6d2e16]/15 pt-6 sm:gap-6">
              <div>
                <p className="font-serif text-2xl font-bold text-[#6d2e16] sm:text-3xl">
                  75+
                </p>
                <p className="mt-1 text-xs leading-5 text-[#795746] sm:text-sm">
                  Years of Tradition
                </p>
              </div>

              <div className="border-l border-[#6d2e16]/10 pl-3 sm:pl-6">
                <p className="font-serif text-2xl font-bold text-[#6d2e16] sm:text-3xl">
                  100%
                </p>
                <p className="mt-1 text-xs leading-5 text-[#795746] sm:text-sm">
                  Authentic Taste
                </p>
              </div>

              <div className="border-l border-[#6d2e16]/10 pl-3 sm:pl-6">
                <p className="font-serif text-2xl font-bold text-[#6d2e16] sm:text-3xl">
                  115+
                </p>
                <p className="mt-1 text-xs leading-5 text-[#795746] sm:text-sm">
                  Products to Explore
                </p>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-xl">
            <div className="absolute inset-8 rounded-full bg-[#9a4b26]/10 blur-3xl" />

            <div className="relative mx-auto flex aspect-square items-center justify-center rounded-full border border-white/60 bg-[#f1d5a8]/80 p-5 shadow-2xl backdrop-blur sm:p-7">
              <div className="flex h-full w-full items-center justify-center rounded-full border-[10px] border-[#fff8ed] bg-gradient-to-br from-[#f1c982] to-[#e9bd78] shadow-inner">
                <div className="text-center">
                  <div className="text-7xl drop-shadow-md sm:text-9xl">
                    🍱
                  </div>

                  <p className="mt-4 font-serif text-2xl font-bold text-[#6d2e16] sm:text-3xl">
                    Aaji&apos;s Recipes
                  </p>

                  <p className="mx-auto mt-2 max-w-[220px] text-sm leading-6 text-[#795746]">
                    Traditional taste, made with love
                  </p>

                  <div className="mx-auto mt-5 h-px w-16 bg-[#6d2e16]/20" />

                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-[#9a4b26]">
                    Vidarbha • Konkan
                  </p>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -left-1 top-8 rounded-2xl border border-[#ead9c4] bg-white/95 px-4 py-3 shadow-xl backdrop-blur sm:-left-4 sm:top-12">
              <p className="text-xs font-semibold text-[#795746]">
                🌶️ Traditional
              </p>
              <p className="mt-0.5 text-sm font-bold text-[#6d2e16]">
                Maharashtrian Flavours
              </p>
            </div>

            <div className="absolute -right-1 bottom-8 rounded-2xl border border-[#ead9c4] bg-white/95 px-4 py-3 shadow-xl backdrop-blur sm:-right-4 sm:bottom-12">
              <p className="text-xs font-semibold text-[#795746]">
                ❤️ Made with
              </p>
              <p className="mt-0.5 text-sm font-bold text-[#6d2e16]">
                Authenticity
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-[#ead8c0] bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl p-5 text-center transition hover:bg-[#fff8ed]"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1dc] text-2xl transition group-hover:scale-105 group-hover:bg-[#f4dfbd]">
                {feature.emoji}
              </div>

              <h3 className="mt-4 font-bold text-[#3d2519]">
                {feature.title}
              </h3>

              <p className="mt-1 text-sm text-[#795746]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9a4b26]">
              Taste Maharashtra
            </p>

            <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight text-[#6d2e16] sm:text-5xl">
              Explore Our Categories
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#795746]">
              From crunchy snacks to traditional pickles, discover flavours
              made for every occasion.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.title}
                to="/store"
                className="group relative overflow-hidden rounded-3xl border border-[#ead8c0] bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#d8bd99] hover:shadow-xl"
              >
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-[#fff1dc] transition group-hover:scale-125" />

                <div className="relative">
                  <div className="text-5xl transition duration-300 group-hover:scale-110">
                    {category.emoji}
                  </div>

                  <h3 className="mt-5 font-bold text-[#6d2e16]">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#795746]">
                    {category.description}
                  </p>

                  <span className="mt-5 inline-flex text-xs font-bold text-[#9a4b26] opacity-0 transition group-hover:opacity-100">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Build Your Box CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#6d2e16] px-6 py-12 text-center shadow-2xl sm:px-12 sm:py-14">
          <div className="absolute -left-16 -top-20 h-48 w-48 rounded-full bg-[#f4d49b]/10 blur-2xl" />
          <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-[#f4d49b]/10 blur-2xl" />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4d49b]">
              Bring home the tradition
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
              Ready to taste authentic Maharashtra?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#f8dfc2]">
              Explore traditional snacks, pickles, spices and Maharashtrian
              favourites — or create your own Maharashtra Box.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/store"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 font-bold text-[#6d2e16] transition hover:-translate-y-0.5 hover:bg-[#fff1dc]"
              >
                Shop Now →
              </Link>

              <Link
                to="/combo"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                🧺 Build Your Box
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home