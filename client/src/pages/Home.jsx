import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#fff8ed]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_#f4d49b_0,_transparent_32%),linear-gradient(135deg,_#fff8ed,_#f9e7c7)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          
          {/* Left Content */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9a4b26]">
              From Maharashtra, with tradition
            </p>

            <h1 className="mt-5 font-serif text-5xl font-bold leading-tight text-[#6d2e16] sm:text-6xl lg:text-7xl">
              The Heart of
              <span className="block">Authentic Maharashtra</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#795746]">
              Discover authentic Maharashtrian flavours inspired by the
              traditional recipes of Vidarbha and Konkan.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/store"
                className="inline-flex items-center justify-center rounded-full bg-[#6d2e16] px-7 py-3.5 font-bold text-white shadow-lg transition hover:bg-[#9a4b26]"
              >
                Explore Products
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#6d2e16] px-7 py-3.5 font-bold text-[#6d2e16] transition hover:bg-[#6d2e16] hover:text-white"
              >
                Our Story
              </Link>
            </div>

            {/* Trust Points */}
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-[#6d2e16]/15 pt-6">
              <div>
                <p className="text-xl font-bold text-[#6d2e16]">75+</p>
                <p className="mt-1 text-xs text-[#795746] sm:text-sm">
                  Years of Tradition
                </p>
              </div>

              <div>
                <p className="text-xl font-bold text-[#6d2e16]">100%</p>
                <p className="mt-1 text-xs text-[#795746] sm:text-sm">
                  Authentic Taste
                </p>
              </div>

              <div>
                <p className="text-xl font-bold text-[#6d2e16]">199+</p>
                <p className="mt-1 text-xs text-[#795746] sm:text-sm">
                  Food Choices
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="mx-auto flex aspect-square max-w-lg items-center justify-center rounded-full bg-[#f1d5a8] shadow-2xl">
              <div className="flex h-[78%] w-[78%] items-center justify-center rounded-full border-8 border-[#fff8ed] bg-[#e9bd78] shadow-inner">
                <div className="text-center">
                  <div className="text-8xl sm:text-9xl">🍱</div>

                  <p className="mt-5 font-serif text-2xl font-bold text-[#6d2e16]">
                    Aaji's Recipes
                  </p>

                  <p className="mt-2 text-sm text-[#795746]">
                    Traditional taste, made with love
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute left-0 top-10 rounded-2xl bg-white px-4 py-3 shadow-xl sm:left-4">
              <p className="text-xs font-semibold text-[#795746]">
                🌶️ Traditional
              </p>
              <p className="font-bold text-[#6d2e16]">Maharashtrian Flavours</p>
            </div>

            <div className="absolute bottom-10 right-0 rounded-2xl bg-white px-4 py-3 shadow-xl sm:right-4">
              <p className="text-xs font-semibold text-[#795746]">
                ❤️ Made with
              </p>
              <p className="font-bold text-[#6d2e16]">Authenticity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-[#ead8c0] bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1dc] text-2xl">
              🚚
            </div>
            <h3 className="mt-4 font-bold text-[#3d2519]">
              Free Delivery
            </h3>
            <p className="mt-1 text-sm text-[#795746]">
              On orders above ₹999
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1dc] text-2xl">
              🔒
            </div>
            <h3 className="mt-4 font-bold text-[#3d2519]">
              Secure Payment
            </h3>
            <p className="mt-1 text-sm text-[#795746]">
              Safe and secure checkout
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1dc] text-2xl">
              🌾
            </div>
            <h3 className="mt-4 font-bold text-[#3d2519]">
              Authentic Products
            </h3>
            <p className="mt-1 text-sm text-[#795746]">
              Inspired by regional recipes
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1dc] text-2xl">
              💬
            </div>
            <h3 className="mt-4 font-bold text-[#3d2519]">
              Customer Support
            </h3>
            <p className="mt-1 text-sm text-[#795746]">
              We're here to help
            </p>
          </div>

        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#9a4b26]">
              Taste Maharashtra
            </p>

            <h2 className="mt-2 font-serif text-4xl font-bold text-[#6d2e16]">
              Explore Our Categories
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[#795746]">
              From crunchy snacks to traditional pickles, discover flavours
              made for every occasion.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            
            <Link
              to="/store"
              className="group rounded-3xl border border-[#ead8c0] bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-5xl">🥨</div>
              <h3 className="mt-5 font-bold text-[#6d2e16]">
                Snacks & Namkeen
              </h3>
              <p className="mt-2 text-sm text-[#795746]">
                Crispy and delicious traditional snacks
              </p>
            </Link>

            <Link
              to="/store"
              className="group rounded-3xl border border-[#ead8c0] bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-5xl">🥒</div>
              <h3 className="mt-5 font-bold text-[#6d2e16]">
                Pickles & Condiments
              </h3>
              <p className="mt-2 text-sm text-[#795746]">
                Bold flavours from traditional recipes
              </p>
            </Link>

            <Link
              to="/store"
              className="group rounded-3xl border border-[#ead8c0] bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-5xl">🌾</div>
              <h3 className="mt-5 font-bold text-[#6d2e16]">
                Spices & Masalas
              </h3>
              <p className="mt-2 text-sm text-[#795746]">
                Authentic spices for everyday cooking
              </p>
            </Link>

            <Link
              to="/store"
              className="group rounded-3xl border border-[#ead8c0] bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-5xl">🍬</div>
              <h3 className="mt-5 font-bold text-[#6d2e16]">
                Sweets & Bakery
              </h3>
              <p className="mt-2 text-sm text-[#795746]">
                Traditional treats for every occasion
              </p>
            </Link>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#6d2e16] px-6 py-12 text-center shadow-xl sm:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f4d49b]">
            Bring home the tradition
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
            Ready to taste authentic Maharashtra?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[#f8dfc2]">
            Explore our collection of traditional snacks, pickles and
            Maharashtrian favourites.
          </p>

          <Link
            to="/store"
            className="mt-7 inline-flex rounded-full bg-white px-7 py-3.5 font-bold text-[#6d2e16] transition hover:bg-[#fff1dc]"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Home