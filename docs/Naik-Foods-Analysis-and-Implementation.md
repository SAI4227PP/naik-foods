# Naik Foods — E-commerce Experience Analysis & Full-Stack Prototype

**Submission:** Bits and Volts Pvt. Ltd.  
**Scope:** Full Stack MERN Intern Task — 2-day analysis and implementation exercise  
**Assessment note:** This report distinguishes the public Naik Foods website from the accompanying prototype. The public website's technology stack was not assumed to be MERN.

## Submission Snapshot

| Item | Status |
|---|---|
| Website analysis | ✅ Completed |
| User + developer perspective | ✅ Covered |
| Working full-stack prototype | ✅ Implemented |
| Search, filters & sorting | ✅ Implemented |
| Product details experience | ✅ Implemented |
| Smart cart & ₹999 progress | ✅ Implemented |
| Build Your Maharashtra Box | ✅ Implemented |
| Recommendation flow | ✅ Implemented |
| Data validation / cleaning | ✅ Implemented |
| Deployment | 🔗 Add final URL |
| GitHub repository | 🔗 Add final URL |
| Screenshots / demo | 📸 Capture before submission |

## 1. Executive Summary

Naik Foods has a clear regional proposition: authentic Maharashtrian food, particularly flavours associated with Vidarbha and Konkan. The principal opportunity is to turn this identity into a more guided shopping journey: help customers find relevant products faster, understand product information with confidence, and receive useful prompts at the point of purchase.

The prototype implements selected, high-value improvements rather than attempting to reproduce the production site: a filterable store, a purchase-oriented product page, a persistent cart with delivery progress, and a three-product **Build Your Maharashtra Box** flow. It also includes data-import safeguards because source-page extraction was shown to be unreliable without validation. No conversion, revenue, performance or traffic uplift has been measured.

## 2. Assignment Objective

Study `https://www.naikfoods.co.in/in` from customer and developer perspectives; identify what can be improved, is missing, may work better or can be optimized; propose practical ideas to improve the experience and attract customers; and implement a focused subset in a full-stack prototype.

## 3. Website Studied

- Public website: `https://www.naikfoods.co.in/in`
- Public Store page: `https://www.naikfoods.co.in/in/store`
- Local prototype reviewed: React/Vite client, Node.js/Express REST API, MongoDB/Mongoose models.

Live-page observations were re-checked on 7 September 2026. The homepage still presents “Free Delivery — Minimum order ₹999”, “24/7 Support”, “Easy Returns — Within 30 Days”, regional messaging, category links, products, testimonials and newsletter content. The Store page showed 12 of 115 products and listed Aaswad Mitha Paan and Shahi Mukhwas at ₹0. These are observations of the rendered public pages, not assertions about their database or underlying platform.

## 4. Analysis Methodology

### 4.1 User Perspective

The review followed a customer path: landing-page proposition → category/store discovery → search and filters → product evaluation → cart and delivery incentive. It also considered mobile responsiveness, feedback states, trust cues and the clarity of policies.

### 4.2 Developer Perspective

The prototype was inspected for routes, controllers, schemas, query logic, client integration, shared components and import validation. Live HTML was checked for visible content only; no inference was made about the production site's stack.

## 5. Key Findings

| Area | Finding | Impact | Priority |
|---|---|---|---|
| Product discovery | Store search and category browsing exist, but discovery can be more intent-led and filterable. | Customers may take longer to find a suitable product. | High |
| Delivery incentive | The ₹999 threshold is visible but static on the public site. | The customer cannot see how close the cart is to the benefit. | High |
| Product prices | Two live Store cards displayed ₹0. | A customer can misread an invalid price as a genuine offer. | High |
| Category clarity | Homepage category counts total more than the displayed Store total; labels also vary (for example, Dry/Instant vs Dry & Instant Grocery). | It is unclear whether counts are unique products or overlapping assignments. | Medium |
| Product data | A prior extraction diagnostic parsed “Product Details | ₹99924 | 180g”. | Unvalidated scraping can create misleading catalogue records. | High |
| Product information | Core information exists, but richer food-specific information is not consistently evident. | Lower purchase confidence for dietary or storage-sensitive shoppers. | Medium |
| Recommendations | A recommendation API scores eligible products from the item being viewed. | Supports customer-facing cross-category discovery. | Medium |
| Reliability | An intermittent public-homepage error was observed in earlier testing but was not reproduced in this check. | Reliability should be monitored rather than treated as a permanent defect. | Medium |

## Key Opportunities at a Glance

| Opportunity | Problem Addressed | Prototype Status | Expected Benefit |
|---|---|---|---|
| Search, filters & sorting | Catalogue discovery friction | Implemented | Faster product discovery |
| Smart Cart | Passive ₹999 delivery threshold | Implemented | Clearer incentive and potential basket growth |
| Product Details | Scattered purchase information | Implemented | Better decision confidence |
| Maharashtra Box | Limited cross-category discovery | Implemented | Guided bundling and cross-sell |
| Recommendations | Limited relevant follow-on discovery | Implemented | More relevant product exploration |
| Food-information fields | Missing structured details | Recommended | Improved trust and informed choices |

## 6. Detailed Findings & Recommendations

### 6.1 Product discovery and regional navigation

#### Problem

Customers need efficient ways to move beyond a general catalogue.

#### Evidence / Observation

The public Store page provides categories, a search input, sorting, filters and pagination. The brand already communicates Vidarbha and Konkan provenance, but regional and occasion-based discovery is not prominent in the observed Store journey.

#### Impact

Browsing customers may not discover complementary products or understand the regional story behind the catalogue.

#### Recommendation

Add curated, clearly labelled entry points such as Vidarbha Specials, Konkan Flavours, Aaji's Recipes, Maharashtrian Breakfast, Millet Collection and Festival Specials. These are recommendations, not implemented public-site features.

#### Implementation Status

**Implemented in prototype:** server-filtered Store queries by search, category, region, rating, price, stock and sort. **Recommended:** editorial regional and festival landing pages.

### 6.2 Free-delivery threshold

#### Problem

The public site states “Minimum order ₹999”, but a static policy does not reveal the remaining spend in context.

#### Evidence / Observation

The ₹999 message remains visible on the public homepage and Store page.

#### Impact

Customers may not connect the policy to a practical next action while building a cart.

#### Recommendation

Show subtotal, progress and the remaining value—for example, “₹720 / ₹999” and “Add ₹279 more to unlock FREE DELIVERY.”

#### Implementation Status

**Implemented in prototype:** CartProgress calculates progress and the API returns `remainingForFreeDelivery` using a threshold of ₹999. It is designed to clarify the incentive and may encourage a larger basket; no conversion effect has been measured.

### 6.3 Category/count presentation

#### Problem

The meaning of category counts is not self-evident.

#### Evidence / Observation

The checked homepage displayed category counts of 105, 14, 25, 15, 6, 5, 9 and 20, while the Store displayed 115 products. Labels include “Dry/Instant Grocery” on the live site and “Dry & Instant Grocery” in prototype aliases.

#### Impact

Customers may not know whether counts are unique products, category memberships or promotional totals.

#### Recommendation

Define the counting rule in the interface, use a canonical taxonomy and preserve aliases only at integration boundaries.

#### Implementation Status

**Partly implemented:** the Maharashtra Box accepts both `Dry/Instant Grocery` and `Dry & Instant Grocery` aliases. Store filtering itself uses exact category values, so full catalogue-taxonomy normalization remains recommended.

### 6.4 Product data quality and invalid prices

#### Problem

Raw page text can mix product, navigation and policy content; ₹999 can also be mistaken for a price.

#### Evidence / Observation

The earlier diagnostic result “Product Details | ₹99924 | 180g” demonstrated the parsing risk. The current live Store page still displayed ₹0 for Aaswad Mitha Paan and Shahi Mukhwas.

#### Impact

Bad names, images, tags or prices reduce trust and can enter downstream UI and cart flows.

#### Recommendation

Prefer product JSON-LD when available, validate fields, retain source provenance and reject suspicious records before publishing them.

#### Implementation Status

**Implemented in prototype importer:** structured-data preference/fallbacks, controlled price parsing, rejection of `999`, `99924`, non-positive or implausibly high prices, Next.js image URL handling, Cloudinary URL recovery, fallback images, tag cleanup and invalid-record skipping. The Product listing and cart queries also require `price > 0`; this protects the prototype and does not claim to repair the source website.

### 6.5 Product detail content and information

#### Problem

Some source content observed during earlier testing included unrelated navigation text in product information; food details can also be easier to compare.

#### Evidence / Observation

The Cream Roll source page was previously observed with navigation/category words such as Home, About, Shop, Blogs, Contact and Store in product-related content. This was not treated as universal. The public product journey shows core name, price, weight, rating/reviews and delivery controls, but ingredients, allergens, nutrition, storage, shelf life, origin, dietary information and delivery ETA would make decisions clearer.

#### Impact

Polluted or sparse product data can lower confidence and cause support questions.

#### Recommendation

Clean imported text and introduce structured food-information fields.

#### Implementation Status

**Implemented:** tag cleaning in the importer and a structured prototype detail layout. **Recommended:** authoritative ingredients, allergen, nutrition, storage, shelf-life, origin, dietary and ETA data.

### 6.6 Trust, reviews and reliability

#### Problem

Commerce trust depends on consistent policies, review quality and graceful failure recovery.

#### Evidence / Observation

The current checked pages consistently showed 24/7 support, 30-day returns and a 9 AM–10 PM store listing; earlier inconsistencies were therefore not recorded as a current defect. An intermittent “Something went wrong” homepage state was observed in prior testing but was not reproduced during this review.

#### Impact

Conflicting information or unhandled failures can weaken confidence.

#### Recommendation

Maintain policy/contact data in one source of truth; add monitoring and recovery boundaries. Future review enhancements: verified purchase status, rating distribution, photos, helpful votes, filtering and sorting.

#### Implementation Status

**Observed but not implemented:** public-site policy consistency and intermittent reliability. **Implemented in prototype:** reusable loading, error and empty states; Express not-found and error middleware.

## 7. Implemented Improvements

### Improved Store and Search & Filters

**Problem Addressed:** catalogue discovery friction.  
**Solution:** responsive Store page with active filters, product count, loading/error/empty states and responsive grid.  
**Technical Implementation:** `GET /api/products` applies `search`, `category`, `region`, `minRating`, `maxPrice`, `inStock` and `sort` to a MongoDB query; the React client uses a 300 ms debounced search input, then requests results when the effective query or filters change. Supported server sorts are `newest`, `price-low`, `price-high`, `rating` and `name`.
**User Benefit:** narrower, more relevant results.  
**Product/Business Rationale:** reduces discovery friction.  
**Accuracy note:** the search-input debounce has timeout cleanup, and the price sort values align with the API. Pagination is still a production follow-up because the endpoint returns all matched products.

### Product Details

**Problem Addressed:** purchase information can be hard to scan.  
**Solution:** breadcrumb; gallery, thumbnails and image navigation; category, name, rating/review count, region, price, weight and stock; highlights; quantity controls; cart action; pincode input; free-delivery/trust copy; specifications and related products.  
**Technical Implementation:** a React route retrieves a product through `GET /api/products/:id`, obtains category-related products from catalogue queries and renders deterministic recommendations from `GET /api/recommendations`. The pincode interaction validates a six-digit format and tells customers availability is confirmed at checkout; it is not a real delivery-coverage integration.
**User Benefit:** clearer information hierarchy before adding to cart.  
**Product/Business Rationale:** supports purchase confidence.

### Smart Cart

**Problem Addressed:** the delivery threshold was passive.  
**Solution:** persistent cart with add, quantity update, remove, clear, count, subtotal and dynamic ₹999 progress.  
**Technical Implementation:** `CartContext` stores a persistent cart identifier and synchronizes through cart endpoints. The server reloads product data from MongoDB, verifies active/positive-price and stock conditions, recalculates totals and returns the remaining amount.  
**User Benefit:** transparent cart status and delivery incentive.  
**Product/Business Rationale:** designed to make a potential basket-value increase understandable; not measured.

### Build Your Maharashtra Box

**Problem Addressed:** a shopper may see only one category.  
**Solution:** `/combo` guides one snack, one pickle and one grocery/everyday favourite, then shows total and delivery progress before adding the validated products individually to the cart.  
**Technical Implementation:** `POST /api/combo` requires three unique, active, positive-price, in-stock products and validates snack/pickle/grocery membership with supported category aliases.  
**User Benefit:** guided cross-category discovery and clear selection feedback.  
**Product/Business Rationale:** potential cross-sell mechanism; no revenue effect is claimed.

### Recommendations

**Problem Addressed:** relevant follow-on products need a basis.  
**Solution:** a user-facing, deterministic recommendation flow.
**Technical Implementation:** `GET /api/recommendations` excludes cart items and scores eligible products by shared category, region, tags, price proximity, rating and review count (maximum six). Product Details requests the endpoint for the viewed product and renders up to four results with ProductGrid.
**User Benefit:** Product Details now displays a distinct “Recommended For You” section and keeps category-related products in a separate “More from this category” section.
**Product/Business Rationale:** provides a transparent starting point for cross-sell and complementary discovery.
**Status:** **implemented:** the product page requests recommendations for the viewed product, excludes that product defensively and renders up to four results through the reusable ProductGrid. The current score is deterministic rather than a behavioural/personalized model.

### Reusable Components, Data Cleaning, Backend and Resilient States

**Problem Addressed:** repeated UI logic and untrusted imported data create maintenance risk.  
**Solution:** shared Navbar, Footer, ProductCard, ProductGrid, FilterBar, CartItem, CartProgress, CartSummary, ComboBuilder, RecommendationCard/Section, Loading, ErrorMessage and EmptyState components; import validation; REST controllers and centralized error handling.  
**Technical Implementation:** React components and CartContext separate presentation/state; Express routes/controllers and Mongoose models separate API/data concerns.  
**User Benefit:** consistent feedback instead of blank states.  
**Product/Business Rationale:** improves maintainability, reuse and scalability.

## 8. Before vs After

| Area | Existing Experience | Improved Implementation |
|---|---|---|
| Product discovery | Basic browsing/search, categories, sorting and filters observed on the public Store. | API-backed prototype search, category/region/rating/price/stock filters, active filters and states. |
| Cart | Static awareness of ₹999 free delivery. | Dynamic progress and remaining amount. |
| Bundling | No guided custom combination was identified. | Build Your Maharashtra Box with validation and cart add. |
| Recommendations | No recommendation flow was identified. | Deterministic “Recommended For You” results alongside distinct category-related products. |
| Product data | Raw extraction could absorb unrelated page content. | Structured extraction preference, validation and cleaning. |
| Product details | Source information could be less structured or polluted on some pages. | Purchase-oriented layout with gallery, stock, quantity, trust and specifications. |

## 9. Technical Architecture

```text
Browser
  ↓
React Frontend (Vite, React Router, CartContext)
  ↓ HTTP / JSON
REST API
  ↓
Node.js + Express
  ↓
MongoDB + Mongoose
```

```text
Store ───────────► Products API
Product Details ─► Product API + Recommendation API
Cart ────────────► Cart API
Maharashtra Box ─► Combo API
```

## 10. Application Flows

### Product Search Flow

```text
User → Store filters/search → GET /api/products → MongoDB filter/sort → filtered products → UI state/grid
```

### Cart Flow

```text
Product → CartContext → Cart API → MongoDB Cart/Product validation → updated cart → Free Delivery Progress
```

### Maharashtra Box Flow

```text
Snack → Pickle → Grocery → POST /api/combo validation/total → free-delivery state → individual cart additions
```

## 11. Data Model

### Product (actual schema)

`name`, `slug`, `description`, `price`, `weight`, `category`, `region`, `image`, `rating`, `reviewCount`, `stock`, `tags`, `isActive`, `createdAt`, `updatedAt`.

The importer carries a `sourceUrl` value during extraction, but it is **not defined in the reviewed Product Mongoose schema**; it should not be represented as a persisted model field without a schema change.

### Cart (actual schema)

`cartId`, `items`, `subtotal`, `freeDeliveryThreshold`, `deliveryCharge`, `total`, `createdAt`, `updatedAt`.

Each cart item stores `product` (Product ObjectId), `name`, `price`, `image`, `weight` and `quantity`. Item subdocuments do not have their own `_id`.

## 12. API Design

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Health response |
| `GET` | `/api/products` | Filtered/sorted active products with positive price |
| `GET` | `/api/products/:id` | One active product |
| `GET` | `/api/cart/:cartId` | Retrieve or create cart |
| `POST` | `/api/cart/:cartId/items` | Add a product with quantity |
| `PUT` | `/api/cart/:cartId/items/:productId` | Update quantity |
| `DELETE` | `/api/cart/:cartId/items/:productId` | Remove item |
| `DELETE` | `/api/cart/:cartId` | Clear cart |
| `GET` | `/api/recommendations?cartProductIds=id1,id2` | Return scored recommendation candidates |
| `POST` | `/api/combo` | Validate a three-product Maharashtra Box |

## 13. UI/UX Design Decisions

The prototype prioritizes hierarchy—product identity and price before quantity and cart action—then supports trust with ratings, stock and delivery context. Consistent spacing, alignment and reusable cards keep grids readable; responsive Tailwind layouts move multi-column pages into narrower mobile-friendly arrangements. Visible CTAs, active filters, cart progress and selection counts expose state. Loading, error and empty components keep asynchronous states explicit rather than presenting a blank page.

## 14. Performance & Technical Considerations

### Implemented

- Server-side filtering/sorting instead of downloading the whole prototype catalogue and filtering only in the browser.
- Positive-price and active-product guards in catalogue, recommendation and cart queries.
- Importer validation and image URL normalization.
- Reusable UI states and centralized Express error middleware.

### Recommended for Production

- Add pagination/limits, appropriate indexes and search/filter testing for real catalogue sizes; the current endpoint returns all matched products.
- Use caching, image optimization, automated tests, accessibility audits, error boundaries and observability.
- Measure Core Web Vitals and conversion funnels before making performance claims.

## 15. Security Considerations

### Current Implementation

- Cart operations validate cart/session IDs, MongoDB ObjectIds and positive integer quantities.
- Product price, name, image and weight are re-read from MongoDB instead of trusted from the client.
- Cart additions and updates verify active status, positive price and stock.
- CORS is configured for `CLIENT_URL`; JSON parsing, not-found and error middleware are present.

### Recommended for Production

- Authentication/authorization, rate limiting, request validation/sanitization, HTTPS, secure cookies or token handling, logging/monitoring and dependency/security reviews.
- Server-authoritative checkout pricing, payment verification, inventory reservation and idempotency controls.

## 16. Future Improvements

| Improvement | Customer Value | Business Value | Effort | Priority |
|---|---|---|---|---|
| Structured food details | Safer, informed purchase | Fewer support questions | Medium | High |
| Canonical category taxonomy | Clearer browsing | Better catalogue reporting | Medium | High |
| Pagination and search/filter testing | Faster, reliable discovery at scale | Better catalogue usability | Medium | High |
| Recommendation personalization | More relevant discovery | Better cross-sell potential | High | Medium |
| Verified reviews and photos | Stronger trust | Richer social proof | High | Medium |
| Auth, wishlist, addresses, orders/tracking | Returning-customer convenience | Retention | High | Medium |
| Payment, coupons, inventory | Complete commerce journey | Transaction enablement | High | High |
| SEO regional/festival pages and blog links | Better discovery from search/social | Qualified traffic | Medium | Medium |
| Abandoned-cart/email campaigns | Helpful reminders | Re-engagement | Medium | Medium |

## 17. Screenshots & Supporting Evidence

No repository screenshots were found, so none are fabricated. Capture these after running the prototype and before final submission:

- [SCREENSHOT: Existing Naik Foods Store]
- [SCREENSHOT: Improved Store]
- [SCREENSHOT: Improved Product Details]
- [SCREENSHOT: Recommended For You]
- [SCREENSHOT: Smart Cart]
- [SCREENSHOT: Build Your Maharashtra Box]
- [SCREENSHOT: Mobile Responsive View]

Supporting live evidence used in this report: public homepage/service strip and category section; public Store search/filter UI, “Showing 12 of 115” text and the two ₹0 cards. Supporting implementation evidence: route/controller/model/component files in this repository.

## 18. Deployment

Frontend:  
[ADD DEPLOYED FRONTEND URL]

Backend:  
[ADD DEPLOYED BACKEND URL]

GitHub:  
[ADD GITHUB REPOSITORY URL]

## 19. Conclusion

Naik Foods has a differentiated regional-food proposition and a visible commerce foundation. The prototype translates the most actionable findings into a maintainable full-stack implementation: more directed discovery, a purchase-oriented detail page, a transparent delivery-progress cart, cross-category box building, deterministic recommendations and safer imported catalogue data. The remaining work—checkout, accounts, authoritative food information, production hardening, measurement and deeper recommendation personalization—is intentionally documented as future scope rather than overstated as complete.
