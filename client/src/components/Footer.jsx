import { Link } from 'react-router-dom'

function Footer() {
  const categories = [
    'Snacks & Namkeen',
    'Pickles & Condiments',
    'Sweets & Bakery',
    'Dairy & Beverages',
    'Mukhvas & Digestives',
    'Confectionery',
    'Spices & Masalas',
    'Dry/Instant Grocery',
  ]

  return (
    <footer className="border-t border-[#ead9c4] bg-[#3d2519] text-[#fff8ed]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-serif text-3xl font-bold text-[#f9d9a6] transition hover:text-white"
            >
              Naik Foods
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-[#ead9c4]">
              Authentic Maharashtrian flavours from Vidarbha &amp; Konkan,
              bringing traditional taste from our kitchen to yours.
            </p>

            <div className="mt-5 inline-flex rounded-full border border-[#f9d9a6]/20 bg-[#4b2e20] px-3 py-1.5">
              <p className="text-xs font-semibold text-[#f9d9a6]">
                Aaji&apos;s Recipes • Traditional Taste
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#f9d9a6]">
              Quick Links
            </h2>

            <ul className="mt-5 space-y-3">
              {[
                ['Home', '/'],
                ['Store', '/store'],
                ['Build Your Box', '/combo'],
                ['About Us', '/about'],
                ['Blog', '/blog'],
                ['Contact', '/contact'],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-[#ead9c4] transition hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#f9d9a6]">
              Categories
            </h2>

            <ul className="mt-5 grid grid-cols-1 gap-3">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    to="/store"
                    className="text-sm text-[#ead9c4] transition hover:text-white"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#f9d9a6]">
              Visit Us
            </h2>

            <div className="mt-5 space-y-5 text-sm text-[#ead9c4]">
              <div>
                <p className="font-semibold text-white">Store</p>
                <p className="mt-1 leading-6">
                  Shukrawar Peth,
                  <br />
                  Pune, Maharashtra 411002
                </p>
              </div>

              <div>
                <p className="font-semibold text-white">Phone</p>
                <a
                  href="tel:+919730046247"
                  className="mt-1 inline-block transition hover:text-white"
                >
                  +91 97300 46247
                </a>
              </div>

              <div>
                <p className="font-semibold text-white">Store Hours</p>
                <p className="mt-1">9 AM – 10 PM Daily</p>
              </div>
            </div>

            <Link
              to="/contact"
              className="mt-6 inline-flex rounded-full border border-[#f9d9a6]/30 px-4 py-2 text-xs font-bold text-[#f9d9a6] transition hover:bg-[#f9d9a6] hover:text-[#3d2519]"
            >
              Contact Us →
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-[#f9d9a6]/20 bg-[#4b2e20] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4d49b]">
                Stay in the loop
              </span>

              <h2 className="mt-2 font-serif text-2xl font-bold text-[#f9d9a6]">
                Stay connected with Naik Foods
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#ead9c4]">
                Get traditional recipes, product updates and special offers.
              </p>
            </div>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <label
                htmlFor="footer-email"
                className="sr-only"
              >
                Email address
              </label>

              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-1 rounded-full border border-[#f9d9a6]/30 bg-[#fffdf8] px-5 py-3 text-sm text-[#3d2519] outline-none placeholder:text-[#8b6d5c] focus:border-[#f9d9a6] focus:ring-2 focus:ring-[#f9d9a6]/30"
              />

              <button
                type="submit"
                className="rounded-full bg-[#f9d9a6] px-6 py-3 text-sm font-bold text-[#6d2e16] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f9d9a6]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-[#ead9c4]/15 pt-6 text-xs text-[#cdb9a9] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Naik Foods. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              to="/privacy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-white"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer