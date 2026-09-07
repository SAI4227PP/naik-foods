import { Link } from 'react-router-dom'

const blogPosts = [
  {
    id: 1,
    title: '10 Healthy & Crunchy Snack Products You Must Try',
    date: 'March 3, 2026',
    category: 'Healthy Snacks',
    excerpt:
      'Discover crunchy Maharashtrian-inspired snacks that make everyday snacking more interesting.',
    products: [
      'Karle Chips',
      'Broccoli Chips',
      'Beetroot Chips',
      'Cheeseling',
      'Nachani Rings',
      'Tangy Tomato Rings',
      'Corn Chakali',
      'Baked Crunchy Peanuts',
      'Methi Chakali',
      'Ragi Peri Peri',
    ],
  },
  {
    id: 2,
    title: 'Traditional Flavors from Maharashtra',
    date: 'February 18, 2026',
    category: 'Maharashtrian Food',
    excerpt:
      'Explore the regional flavors and traditional food culture that inspire Naik Foods products.',
    products: [],
  },
  {
    id: 3,
    title: 'The Story Behind Traditional Pickles',
    date: 'February 5, 2026',
    category: 'Pickles',
    excerpt:
      'A look at the traditional pickle flavors that bring homemade-style taste to everyday meals.',
    products: [],
  },
  {
    id: 4,
    title: 'Easy Maharashtrian Snacks for Tea Time',
    date: 'January 22, 2026',
    category: 'Snacks',
    excerpt:
      'Simple snack ideas inspired by the traditional flavors of Maharashtra.',
    products: [],
  },
  {
    id: 5,
    title: 'Why Regional Recipes Matter',
    date: 'January 10, 2026',
    category: 'Food Culture',
    excerpt:
      'Regional recipes carry stories, memories and traditions from one generation to another.',
    products: [],
  },
]

function Blog() {
  return (
    <main className="bg-[#fff8ed]">
      {/* Hero */}
      <section className="border-b border-[#ead9c4] bg-[linear-gradient(135deg,#fff8ed,#f5dfbb)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#9a4b26]">
            Naik Foods Journal
          </p>

          <h1 className="mt-4 font-serif text-4xl font-bold text-[#6d2e16] sm:text-5xl lg:text-6xl">
            Stories, Recipes &amp; Food Culture
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#795746] sm:text-lg">
            Discover traditional Maharashtrian flavors, snack ideas, regional
            food stories and inspiration from Naik Foods.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-[#ead9c4] bg-[#fffdf8] shadow-xl shadow-amber-950/10">
            <div className="grid lg:grid-cols-2">
              <div className="flex min-h-[320px] items-center justify-center bg-[radial-gradient(circle_at_center,#f4d49b,#ead0a7)] p-10">
                <div className="text-center">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9a4b26]">
                    Featured
                  </p>

                  <p className="mt-4 font-serif text-6xl font-bold text-[#6d2e16]">
                    10
                  </p>

                  <p className="mt-2 font-semibold text-[#3d2519]">
                    Crunchy Snack Ideas
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10">
                <span className="rounded-full bg-[#f8ead4] px-3 py-1 text-xs font-bold text-[#9a4b26]">
                  Healthy Snacks
                </span>

                <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-[#6d2e16] sm:text-4xl">
                  10 Healthy &amp; Crunchy Snack Products You Must Try
                </h2>

                <p className="mt-4 text-sm font-medium text-[#9a4b26]">
                  March 3, 2026
                </p>

                <p className="mt-5 leading-8 text-[#795746]">
                  Discover a collection of crunchy snack options including
                  beetroot chips, broccoli chips, cheeseling, corn chakali and
                  other flavorful choices.
                </p>

                <Link
                  to="/store"
                  className="mt-7 inline-flex rounded-full bg-[#6d2e16] px-6 py-3 font-bold text-white transition hover:bg-[#9a4b26]"
                >
                  Shop Featured Snacks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="border-y border-[#ead9c4] bg-[#fffdf8] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9a4b26]">
                Latest Stories
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold text-[#6d2e16] sm:text-4xl">
                From the Naik Foods kitchen
              </h2>
            </div>

            <Link
              to="/store"
              className="font-bold text-[#9a4b26] hover:text-[#6d2e16]"
            >
              Explore Products →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#ead9c4] bg-[#fff8ed] transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-44 items-center justify-center bg-[linear-gradient(135deg,#f5dfbb,#ead0a7)]">
                  <span className="font-serif text-3xl font-bold text-[#6d2e16]">
                    Naik Foods
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-wide text-[#9a4b26]">
                      {post.category}
                    </span>

                    <span className="text-xs text-[#8a7060]">
                      {post.date}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-xl font-bold leading-7 text-[#6d2e16]">
                    {post.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-[#795746]">
                    {post.excerpt}
                  </p>

                  <Link
                    to="/store"
                    className="mt-5 font-bold text-[#9a4b26] transition group-hover:text-[#6d2e16]"
                  >
                    Explore Products →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-[#6d2e16] px-6 py-12 text-center shadow-xl sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#f4d49b]">
            Stay Connected
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
            Get food stories in your inbox
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#f7dfc3]">
            Receive new recipes, product stories and updates from Naik Foods.
          </p>

          <form
            className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="blog-email" className="sr-only">
              Email address
            </label>

            <input
              id="blog-email"
              type="email"
              placeholder="Enter your email address"
              className="min-w-0 flex-1 rounded-full border border-white/20 bg-white px-5 py-3.5 text-[#3d2519] outline-none placeholder:text-[#927e71] focus:ring-2 focus:ring-[#f4d49b]"
            />

            <button
              type="submit"
              className="rounded-full bg-[#fff8ed] px-7 py-3.5 font-bold text-[#6d2e16] transition hover:bg-[#f5dfbb]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Blog