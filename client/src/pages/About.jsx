import { Link } from 'react-router-dom'

function About() {
  return (
    <main className="bg-[#fff8ed]">
      {/* Hero */}
      <section className="border-b border-[#ead9c4] bg-[linear-gradient(135deg,#fff8ed,#f5dfbb)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#9a4b26]">
            Our Story
          </p>

          <h1 className="mt-4 font-serif text-4xl font-bold text-[#6d2e16] sm:text-5xl lg:text-6xl">
            From Our Aaji&apos;s Kitchen to Your Home
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#795746] sm:text-lg">
            Naik Foods brings the authentic flavors of Maharashtra to your
            kitchen, inspired by traditional recipes and regional food
            traditions from Vidarbha and Konkan.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9a4b26]">
              A Legacy of Taste
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-[#6d2e16] sm:text-4xl">
              Tradition that continues
            </h2>

            <div className="mt-6 space-y-4 text-base leading-8 text-[#604839]">
              <p>
                Naik Foods is inspired by a long family connection with
                traditional Maharashtrian food and recipes passed through
                generations.
              </p>

              <p>
                Our focus is on preserving the taste and character of regional
                delicacies while making them convenient for today&apos;s
                customers.
              </p>

              <p>
                From traditional pickles and snacks to masalas and instant
                foods, every product represents a connection to Maharashtra&apos;s
                food culture.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-amber-800/15 bg-[#fffdf8] p-8 shadow-xl shadow-amber-950/10 sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#f8ead4] p-6">
                <p className="font-serif text-3xl font-bold text-[#6d2e16]">
                  1938
                </p>
                <p className="mt-2 text-sm leading-6 text-[#795746]">
                  Beginning of the family&apos;s food legacy
                </p>
              </div>

              <div className="rounded-2xl bg-[#f8ead4] p-6">
                <p className="font-serif text-3xl font-bold text-[#6d2e16]">
                  75+
                </p>
                <p className="mt-2 text-sm leading-6 text-[#795746]">
                  Years of family food tradition
                </p>
              </div>

              <div className="rounded-2xl bg-[#f8ead4] p-6">
                <p className="font-serif text-3xl font-bold text-[#6d2e16]">
                  Vidarbha
                </p>
                <p className="mt-2 text-sm leading-6 text-[#795746]">
                  Regional inspiration
                </p>
              </div>

              <div className="rounded-2xl bg-[#f8ead4] p-6">
                <p className="font-serif text-3xl font-bold text-[#6d2e16]">
                  Konkan
                </p>
                <p className="mt-2 text-sm leading-6 text-[#795746]">
                  Traditional coastal flavors
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-[#ead9c4] bg-[#fffdf8] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9a4b26]">
              What We Believe
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-[#6d2e16] sm:text-4xl">
              Our Values
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Authenticity',
                text: 'Preserving traditional flavors and recipes.',
              },
              {
                title: 'Reliability',
                text: 'Creating a dependable experience for customers.',
              },
              {
                title: 'Community',
                text: 'Supporting the people and traditions behind regional food.',
              },
              {
                title: 'Regional Pride',
                text: 'Celebrating the diverse food culture of Maharashtra.',
              },
            ].map((value) => (
              <article
                key={value.title}
                className="rounded-2xl border border-[#ead9c4] bg-[#fff8ed] p-6"
              >
                <h3 className="font-serif text-xl font-bold text-[#6d2e16]">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#795746]">
                  {value.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-[#6d2e16] px-6 py-12 text-center shadow-xl sm:px-10">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Taste the traditions of Maharashtra
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#f7dfc3]">
            Explore snacks, pickles, masalas and other traditional products.
          </p>

          <Link
            to="/store"
            className="mt-7 inline-flex rounded-full bg-[#fff8ed] px-7 py-3.5 font-bold text-[#6d2e16] transition hover:bg-[#f5dfbb]"
          >
            Explore Products
          </Link>
        </div>
      </section>
    </main>
  )
}

export default About