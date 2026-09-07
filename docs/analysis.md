# Naik Foods — E-commerce Experience Analysis

**Assessment:** Bits and Volts Private Limited — Full Stack MERN Intern Task  
**Website studied:** https://www.naikfoods.co.in/in  
**Analysis date:** 7 September 2026  
**Prototype repository:** https://github.com/SAI4227PP/naik-foods

> This document focuses on the **business, product and customer-experience analysis**. The technical implementation is documented separately in [`architecture.md`](./architecture.md).

---

## 1. Executive Summary

Naik Foods has a differentiated regional proposition centred on authentic Maharashtrian food, with messaging connected to Vidarbha and Konkan. The public shopping experience already provides a broad catalogue, categories, search/filtering, product pages, reviews, delivery messaging and trust content.

The strongest opportunities are to make the existing catalogue easier to discover, evaluate and combine into a basket. The prototype therefore focuses on improved catalogue discovery, a purchase-oriented product page, a dynamic free-delivery cart, a guided **Build Your Maharashtra Box** journey, contextual recommendations, and catalogue-data safeguards.

No claim is made that these changes have increased conversion, revenue, traffic or performance; those outcomes require real production measurement.

---

## 2. Website Studied

### Public website

- Homepage: https://www.naikfoods.co.in/in
- Store: https://www.naikfoods.co.in/in/store

### Observed experience

The homepage communicates free delivery for orders of at least **₹999**, support, returns, Maharashtrian/Vidarbha/Konkan positioning, categories, product collections, testimonials, social content and newsletter content.

The Store provides category navigation, search, sorting, filters, pagination and product cards with price, weight and purchase controls.

During the 7 September 2026 review, the Store displayed **12 of 115 products** and two visible products showed a price of **₹0**. Homepage category counts also total more than the Store's displayed product total, making the counting rule unclear.

These observations describe the rendered public pages and do not assume the underlying production technology or database design.

---

## 3. Analysis Methodology

The review followed a realistic customer journey:

**Landing page → catalogue discovery → search/filtering → product evaluation → cart → delivery incentive**

### Customer perspective

- Clarity of brand proposition
- Product discovery speed
- Purchase confidence
- Price, availability and delivery clarity
- Cart guidance
- Trust, discovery and retention opportunities

### Developer perspective

- Product-data structure and validation
- Reusable component opportunities
- Server-side validation
- Maintainable search, cart and recommendation flows
- Security, performance and observability risks

---

## 4. Key Findings

| Area | Finding | Customer / Business Impact | Priority |
|---|---|---|---|
| Product discovery | Catalogue browsing can be made more intent-led. | Faster discovery and less browsing friction. | High |
| Delivery incentive | ₹999 free delivery is visible but mostly static. | The benefit is not translated into a clear basket goal. | High |
| Product prices | Two Store cards displayed ₹0. | Can reduce trust or create pricing ambiguity. | High |
| Category clarity | Homepage category counts exceed the displayed Store total; labels also vary. | Customers may not understand the catalogue structure. | Medium |
| Product data | Extraction can capture unrelated page content or confuse ₹999 with a product price. | Incorrect data can affect product cards, details and cart logic. | High |
| Product information | Core details exist, but structured food-specific information can be richer. | More purchase confidence. | Medium |
| Recommendations | A deterministic recommendation foundation can connect a viewed product to relevant follow-on products. | Supports cross-sell and deeper exploration. | Medium |
| Reliability | An intermittent homepage error was seen in earlier testing but not reproduced in the latest review. | Monitor reliability rather than treating it as a permanent defect. | Medium |

---

## 5. Key Opportunities

| Opportunity | Problem | Recommended Direction | Prototype Status |
|---|---|---|---|
| Guided discovery | Broad catalogue can require repeated browsing. | Search, filters and curated collections. | ✅ Implemented |
| Actionable free delivery | ₹999 threshold is passive. | Dynamic subtotal/progress/remaining amount. | ✅ Implemented |
| Cross-category shopping | Customers may remain inside one category. | Build a Maharashtrian box. | ✅ Implemented |
| Contextual cross-sell | Shoppers need relevant next products. | Deterministic recommendation engine. | ✅ Implemented |
| Product confidence | Food details can be easier to compare. | Structured product presentation and verified food fields. | ✅ Implemented / data expansion recommended |
| Catalogue integrity | Imported text can contain unrelated content. | Structured extraction + validation + provenance. | ✅ Implemented |
| Regional storytelling | Strong regional identity can drive navigation. | Vidarbha, Konkan, Aaji's Recipes, breakfast and festival collections. | 💡 Recommended |
| Retention | Returning-customer features are outside prototype scope. | Accounts, wishlist, addresses and order tracking. | 💡 Recommended |

---

## 6. Detailed Problems & Recommendations

### 6.1 Product discovery and regional navigation

**Problem:** Customers need efficient ways to move beyond a general product grid.

**Recommendation:** Add entry points such as Vidarbha Specials, Konkan Flavours, Aaji's Recipes, Maharashtrian Breakfast, Millet Collection and Festival Specials.

**Prototype:** API-backed search, category, region, rating, price, stock and sorting filters are implemented. Editorial collections remain future scope.

### 6.2 Free-delivery threshold

**Problem:** The ₹999 minimum is communicated, but the customer does not get a live indication of how close the basket is to that threshold.

**Recommendation:** Show a goal such as **₹720 / ₹999 — Add ₹279 more to unlock free delivery.**

**Prototype:** Smart Cart calculates progress and remaining amount from the ₹999 threshold. No conversion uplift is claimed.

### 6.3 Category/count presentation

**Problem:** Homepage category counts exceed the Store total and category wording is not fully consistent.

**Recommendation:** Define a canonical taxonomy and one counting rule. If products can belong to multiple categories, make that explicit.

**Prototype:** Maharashtra Box accepts supported category aliases such as `Dry/Instant Grocery` and `Dry & Instant Grocery`.

### 6.4 Product data quality and invalid prices

**Problem:** Raw page extraction can mix product text with navigation/footer/policy content. A diagnostic previously produced a misleading value equivalent to `Product Details | ₹99924 | 180g`.

**Recommendation:** Prefer structured product data such as JSON-LD, validate critical fields, preserve source provenance and reject suspicious records.

**Prototype:** Importer logic includes structured-data preference/fallbacks, price validation, suspicious-record rejection, image normalization, Cloudinary URL recovery, fallback images, tag cleanup and invalid-record skipping. Product queries require active products with positive prices.

### 6.5 Product details and purchase confidence

**Problem:** Food information is easier to trust when important attributes are structured and scannable.

**Recommendation:** Where authoritative data exists, expose ingredients, allergens, nutrition, storage, shelf life, origin/region, dietary attributes and delivery ETA.

**Prototype:** Product Details is organized around gallery, identity, price, weight, stock, highlights, quantity, delivery interaction, trust information, specifications and recommendations.

### 6.6 Trust, reviews and reliability

**Problem:** Commerce trust depends on consistent policies, useful reviews and graceful failure handling.

**Recommendation:** Maintain policy/contact information from one source of truth, add monitoring, and consider verified purchase, rating distribution, photos, helpful votes and review filters.

**Prototype:** Reusable loading/error/empty states and centralized Express error handling are implemented. Production monitoring and richer reviews remain future scope.

---

## 7. Implemented Improvements

### Improved Store and Search & Filters

Server-backed search, category/region/rating/price/stock filters, sorting, active-filter state, loading/error/empty states and responsive product presentation.

### Product Details

Product gallery, rating/review count, region, price, weight, stock, highlights, quantity controls, add-to-cart, pincode interaction, trust messaging, specifications, recommendations and related products.

### Smart Cart

Persistent cart with quantity changes, removal, clear, subtotal and dynamic ₹999 free-delivery progress.

### Build Your Maharashtra Box

Guided selection of one snack, one pickle and one grocery/everyday favourite, followed by validation and cart additions.

### Recommendations

Deterministic server-side scoring based on shared category, region, tags, price proximity, rating and review activity. Product Details displays up to four recommendations separately from category-related products.

### Data Cleaning and Reusable Architecture

Reusable UI components, CartContext state management, API service layer, importer validation and centralized backend error handling.

---

## 8. Before vs After

| Area | Existing Public Experience | Prototype Improvement |
|---|---|---|
| Product discovery | Search, filters and sorting are available. | Server-backed discovery with responsive result handling. |
| Free delivery | ₹999 threshold is communicated. | Live basket progress and remaining amount. |
| Cross-category purchase | No guided combination was identified in the reviewed journey. | Build Your Maharashtra Box. |
| Recommendations | No contextual recommendation flow was identified. | Deterministic Recommended For You section. |
| Product information | Core product information is available. | More structured purchase-oriented hierarchy. |
| Imported catalogue data | Raw extraction can mix unrelated content. | Structured extraction and validation. |

---

## 9. Product / Business Impact

The prototype is based on four measurable hypotheses:

1. **Reduce discovery friction** — validate through search-to-product-click rate, refinement rate and time to first product click.
2. **Make the delivery threshold actionable** — validate through average order value, percentage of orders reaching ₹999 and cart-to-checkout rate.
3. **Increase cross-category exploration** — validate through recommendation CTR, recommendation add-to-cart rate, multi-category order rate and box completion rate.
4. **Improve purchase confidence** — validate through product-page-to-cart rate, support questions and returns attributable to information gaps.

> These are measurement plans and hypotheses, not measured outcomes from this prototype.

---

## 10. Future Improvements

| Improvement | Customer Value | Business Value | Priority |
|---|---|---|---|
| Structured food details | Better-informed purchase | Fewer information gaps | High |
| Canonical category taxonomy | Clearer browsing | Better catalogue reporting | High |
| Pagination and query limits | Faster discovery at scale | Better catalogue usability | High |
| Recommendation personalization | More relevant discovery | Better cross-sell potential | Medium |
| Verified reviews and photos | Stronger trust | Richer social proof | Medium |
| Auth, wishlist, addresses, order tracking | Returning-customer convenience | Retention | Medium |
| Payment, coupons and inventory | Complete commerce journey | Transaction enablement | High |
| SEO regional/festival landing pages | Better discovery | Qualified traffic | Medium |
| Abandoned-cart/email campaigns | Helpful re-engagement | Retention | Medium |

---

## 11. Limitations

- The prototype is not the production Naik Foods platform.
- Checkout and payment processing are not implemented.
- Pincode validation is format-based rather than connected to a real coverage provider.
- Recommendations are deterministic and not based on individual behavioural history.
- Production pagination and query-limit testing remain follow-up work.
- No traffic, conversion, revenue or performance uplift has been measured.
- Food-specific authoritative information must come from verified product data before production use.
- The live website's underlying implementation stack was not assumed from rendered pages.

---

## 12. Conclusion

Naik Foods already has a strong regional-food identity and a functional e-commerce foundation. The most practical opportunities are to make discovery more directed, turn delivery messaging into an actionable basket goal, strengthen product decision support and create deliberate cross-category exploration.

The prototype converts those observations into a working full-stack experience rather than a visual-only redesign. It demonstrates search/filtering, product-detail improvements, Smart Cart progress, Maharashtra Box building, deterministic recommendations and catalogue-data safeguards.

The next production step is not simply more UI: it is measurement, authoritative product data, checkout/inventory, stronger personalization, accessibility/performance testing and operational monitoring.
