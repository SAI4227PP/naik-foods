import { useState } from 'react'

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="bg-[#fff8ed]">
      {/* Hero */}
      <section className="border-b border-[#ead9c4] bg-[linear-gradient(135deg,#fff8ed,#f5dfbb)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#9a4b26]">
            Get in Touch
          </p>

          <h1 className="mt-4 font-serif text-4xl font-bold text-[#6d2e16] sm:text-5xl lg:text-6xl">
            We&apos;d Love to Hear From You
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#795746] sm:text-lg">
            Have a question about our products, orders, or traditional
            Maharashtrian foods? Reach out to the Naik Foods team.
          </p>
        </div>
      </section>

      {/* Contact + Form */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact information */}
          <div className="rounded-3xl border border-[#ead9c4] bg-[#fffdf8] p-7 shadow-lg shadow-amber-950/10 sm:p-9">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9a4b26]">
              Contact Information
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-[#6d2e16]">
              Let&apos;s connect
            </h2>

            <div className="mt-8 space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f8ead4] text-[#6d2e16]">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z" />
                    <circle cx="12" cy="9" r="2.3" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-bold text-[#3d2519]">Visit Us</h3>

                  <p className="mt-1 text-sm leading-6 text-[#795746]">
                    Seva Mitra Mandal Chauk,
                    <br />
                    Near Fadget Police Chowki,
                    <br />
                    Shukrawar Peth,
                    <br />
                    Pune, Maharashtra 411002
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f8ead4] text-[#6d2e16]">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M6.5 3.5h3l1.5 4-2 1.5a14 14 0 0 0 6 6l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C11.1 19.5 4.5 12.9 4.5 4.5c0-1.1.9-2 2-2Z" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-bold text-[#3d2519]">Phone</h3>

                  <a
                    href="tel:+919730046247"
                    className="mt-1 inline-block text-sm text-[#9a4b26] hover:text-[#6d2e16]"
                  >
                    +91 97300 46247
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f8ead4] text-[#6d2e16]">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-bold text-[#3d2519]">Email</h3>

                  <a
                    href="mailto:naikfoods001@gmail.com"
                    className="mt-1 inline-block break-all text-sm text-[#9a4b26] hover:text-[#6d2e16]"
                  >
                    naikfoods001@gmail.com
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f8ead4] text-[#6d2e16]">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 7v5l3.5 2" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-bold text-[#3d2519]">
                    Store Hours
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#795746]">
                    Monday – Saturday
                    <br />
                    9:00 AM – 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-8 rounded-2xl bg-[#f8ead4] p-5">
              <p className="text-sm leading-6 text-[#604839]">
                For order-related support, please include your order number
                when contacting us so our team can assist you faster.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-3xl border border-[#ead9c4] bg-[#fffdf8] p-7 shadow-lg shadow-amber-950/10 sm:p-9">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9a4b26]">
              Send a Message
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-[#6d2e16]">
              How can we help?
            </h2>

            {submitted ? (
              <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6">
                <h3 className="font-serif text-2xl font-bold text-green-800">
                  Message received
                </h3>

                <p className="mt-2 text-sm leading-6 text-green-700">
                  Thank you for contacting Naik Foods. Your message has been
                  captured successfully.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-5 rounded-full bg-[#6d2e16] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#9a4b26]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="text-sm font-bold text-[#3d2519]"
                    >
                      Name
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="mt-2 w-full rounded-xl border border-[#dcc8ae] bg-[#fff8ed] px-4 py-3 text-sm text-[#3d2519] outline-none transition focus:border-[#9a4b26] focus:ring-2 focus:ring-[#9a4b26]/15"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="text-sm font-bold text-[#3d2519]"
                    >
                      Email
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-xl border border-[#dcc8ae] bg-[#fff8ed] px-4 py-3 text-sm text-[#3d2519] outline-none transition focus:border-[#9a4b26] focus:ring-2 focus:ring-[#9a4b26]/15"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="text-sm font-bold text-[#3d2519]"
                  >
                    Subject
                  </label>

                  <select
                    id="contact-subject"
                    name="subject"
                    defaultValue=""
                    required
                    className="mt-2 w-full rounded-xl border border-[#dcc8ae] bg-[#fff8ed] px-4 py-3 text-sm text-[#3d2519] outline-none transition focus:border-[#9a4b26] focus:ring-2 focus:ring-[#9a4b26]/15"
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    <option value="order">Order Support</option>
                    <option value="product">Product Question</option>
                    <option value="delivery">Delivery</option>
                    <option value="return">Return / Refund</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-bold text-[#3d2519]"
                  >
                    Message
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows="6"
                    placeholder="Tell us how we can help..."
                    className="mt-2 w-full resize-none rounded-xl border border-[#dcc8ae] bg-[#fff8ed] px-4 py-3 text-sm leading-6 text-[#3d2519] outline-none transition focus:border-[#9a4b26] focus:ring-2 focus:ring-[#9a4b26]/15"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#6d2e16] px-6 py-3.5 font-bold text-white shadow-md transition hover:bg-[#9a4b26]"
                >
                  Send Message
                </button>

                <p className="text-center text-xs leading-5 text-[#8a7060]">
                  This demo form currently validates on the client. Connect it
                  to the backend when the contact API is implemented.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact