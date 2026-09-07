
# Naik Foods — Technical Architecture

**Project:** Naik Foods E-commerce Experience Improvement  
**Repository:** https://github.com/SAI4227PP/naik-foods  
**Architecture scope:** Prototype implementation

> This document explains **how the prototype is built**. Product/business reasoning is documented separately in [`analysis.md`](./analysis.md).

---

## 1. System Overview

The prototype uses a conventional MERN-style full-stack architecture:

```text
┌─────────────────────────────────────────────┐
│                 React Client                │
│ React 19 + Vite + React Router + Tailwind  │
│                                             │
│ Pages → Reusable Components → API Service  │
│                    │                        │
│              CartContext                    │
└────────────────────┼────────────────────────┘
                     │ HTTP / JSON
                     ▼
┌─────────────────────────────────────────────┐
│             Node.js + Express API           │
│                                             │
│ Routes → Controllers → Models / Services   │
│             │             │                 │
│       Validation       Recommendation      │
└─────────────┼─────────────┼─────────────────┘
              │             │
              └──────┬──────┘
                     ▼
              ┌─────────────┐
              │   MongoDB   │
              │  Mongoose   │
              └─────────────┘
```

The frontend communicates with the backend through REST-style JSON endpoints. MongoDB stores product and cart data through Mongoose models.

---

## 2. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 19 | Component-based UI |
| Build tool | Vite | Development server and production build |
| Routing | React Router 7 | Client-side route management |
| Styling | Tailwind CSS 4 | Responsive UI styling |
| Icons | Lucide React | UI iconography |
| Backend | Node.js + Express 5 | REST API and server logic |
| Database | MongoDB + Mongoose 9 | Persistence and schema modelling |
| Configuration | dotenv | Environment variables |
| HTTP/CORS | Fetch + CORS | API communication and browser access |
| Importer | Axios + Cheerio | Source-page retrieval and HTML parsing |
| Development | Nodemon, ESLint, npm | Local development and code quality |

The dependency versions are defined in `client/package.json` and `server/package.json`.

---

## 3. Architecture Diagram

### Request flow

```text
User
 │
 ▼
React Route
 │
 ▼
Page Component
 │
 ├──────────────► Reusable UI Components
 │
 ▼
client/src/services/api.js
 │
 │ HTTP / JSON
 ▼
Express Route
 │
 ▼
Controller
 │
 ├────────► Validation / business logic
 │
 ▼
Mongoose Model
 │
 ▼
MongoDB
```

### Feature mapping

```text
Store ───────────────► GET /api/products
Product Details ─────► GET /api/products/:id
Recommendations ────► GET /api/recommendations
Cart ────────────────► /api/cart/:cartId/...
Maharashtra Box ─────► POST /api/combo
Health ──────────────► GET /api/health
```

---

## 4. Frontend Architecture

The client is organized around route-level pages and reusable components.

```text
client/src/
├── App.jsx
├── main.jsx
├── index.css
├── assets/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── FilterBar.jsx
│   ├── CartItem.jsx
│   ├── CartProgress.jsx
│   ├── CartSummary.jsx
│   ├── ComboBuilder.jsx
│   ├── Loading.jsx
│   ├── ErrorMessage.jsx
│   └── EmptyState.jsx
├── context/
│   └── CartContext.jsx
├── data/
│   └── fallbackProducts.js
├── pages/
│   ├── Home.jsx
│   ├── Store.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   ├── Combo.jsx
│   ├── About.jsx
│   ├── Blog.jsx
│   └── Contact.jsx
└── services/
    └── api.js
```

The repository also currently contains placeholder component files for future recommendation/search extraction. The active recommendation presentation is currently handled through the existing ProductGrid/ProductCard path rather than those placeholder files.

### Route structure

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Brand entry and discovery |
| `/store` | Store | Catalogue discovery |
| `/product/:productId` | ProductDetails | Product evaluation and purchase |
| `/cart` | Cart | Basket management |
| `/combo` | Combo | Maharashtra Box builder |
| `/about` | About | Brand information |
| `/blog` | Blog | Content entry point |
| `/contact` | Contact | Contact information |

### State management

`CartContext` owns cart state and exposes cart ID, items, count, subtotal/total, remaining free-delivery amount, loading/syncing state, errors and cart actions.

The browser stores a generated cart ID so the cart can be recovered across page refreshes. Server responses remain authoritative for cart totals.

---

## 5. Backend Architecture

```text
server/
├── server.js
├── config/
│   └── db.js
├── controllers/
│   ├── productController.js
│   ├── cartController.js
│   ├── recommendationController.js
│   └── comboController.js
├── middleware/
│   ├── errorMiddleware.js
│   └── notFoundMiddleware.js
├── models/
│   ├── Product.js
│   └── Cart.js
├── routes/
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   ├── recommendationRoutes.js
│   └── comboRoutes.js
├── seed/
│   └── products.js
└── utils/
    ├── recommendationEngine.js
    └── validation.js
```

The server initializes environment variables, connects to MongoDB, enables JSON/CORS handling, registers feature routes, exposes a health endpoint, and finishes with not-found/error middleware.

---

## 6. Database Design

### Product

```text
Product
├── name
├── slug (unique)
├── description
├── price
├── weight
├── category
├── region
├── image
├── rating
├── reviewCount
├── stock
├── tags[]
├── isActive
└── timestamps
```

Indexes are used on frequently queried catalogue fields such as `slug`, `category`, `region` and `isActive`.

### Cart

```text
Cart
├── cartId
├── items[]
│   ├── product
│   └── quantity
└── timestamps
```

Cart totals are calculated from current product data rather than trusted client-side prices.

---

## 7. API Design

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/products` | Product listing + filters |
| `GET` | `/api/products/:id` | Product details |
| `GET` | `/api/cart/:cartId` | Read cart |
| `POST` | `/api/cart/:cartId/items` | Add item |
| `PUT` | `/api/cart/:cartId/items/:productId` | Update quantity |
| `DELETE` | `/api/cart/:cartId/items/:productId` | Remove item |
| `DELETE` | `/api/cart/:cartId` | Clear cart |
| `GET` | `/api/recommendations?cartProductIds=id1,id2` | Recommendations |
| `POST` | `/api/combo` | Validate/create combo selection |

### Product query parameters

`GET /api/products` supports `search`, `category`, `region`, `minRating`, `maxPrice`, `inStock` and `sort`.

Supported server-side sort values include `newest`, `price-low`, `price-high`, `rating` and `name`.

---

## 8. Application Flows

### Store search/filter flow

```text
User enters search / changes filter
          │
          ▼
Store state changes
          │
          ▼
300 ms debounce
          │
          ▼
getProducts(query parameters)
          │
          ▼
GET /api/products
          │
          ▼
Controller builds Mongo query
          │
          ▼
Products returned
          │
          ▼
ProductGrid renders results
```

The current Store debounces the complete product-query effect, so search and filter/sort changes share the same 300 ms delay.

### Product-to-cart flow

```text
Product Details
      │
      ▼
Quantity validation
      │
      ▼
CartContext.addToCart()
      │
      ▼
POST /api/cart/:cartId/items
      │
      ▼
Server validates product + stock
      │
      ▼
Cart recalculated
      │
      ▼
Updated cart returned
      │
      ▼
CartContext updates UI
```

### Cart flow

```text
Browser cart ID
      │
      ▼
GET cart
      │
      ▼
MongoDB cart + current product data
      │
      ▼
Subtotal / delivery progress
      │
      ▼
Cart UI
```

---

## 9. Recommendation System

The prototype uses a deterministic, server-side recommendation engine rather than behavioural ML.

### Inputs

For each candidate product, the engine compares category, region, shared tags, price proximity, rating and review activity.

### Scoring model

```text
Same category       +40
Same region         +20
Each shared tag     +10
Price within 20%    +15
Price within 40%     +8
Rating >= 4          +5
Reviews >= 10        +3
```

The server excludes source/cart products, considers active products with positive prices and stock, ranks candidates by score/rating/review activity and returns a maximum of six recommendations from the engine.

Product Details requests recommendations for the viewed product and the UI can display up to four results. Category-related products remain a separate discovery section.

### Production evolution

A production system could add click/add-to-cart signals, purchase history, user segments, collaborative filtering, embedding/vector retrieval, A/B testing and recommendation analytics.

---

## 10. Cart Architecture

The cart uses a browser-generated UUID as the cart identifier and persists cart state on the server.

### Authoritative pricing rule

The client does **not** own authoritative product pricing. The backend loads product records and calculates the cart subtotal from current product data.

### Free-delivery progress

```text
FREE_DELIVERY_THRESHOLD = ₹999

remaining = max(999 - subtotal, 0)
progress  = min((subtotal / 999) × 100, 100)
```

This supports messages such as:

> Add ₹279 more to unlock free delivery.

### Cart operations

- Add product
- Increase/decrease quantity
- Direct quantity update
- Remove product
- Clear cart
- Recalculate subtotal
- Calculate delivery-progress state

---

## 11. Maharashtra Box Flow

The Maharashtra Box is a guided cross-category shopping flow.

```text
Load in-stock catalogue
        │
        ▼
Group products into supported categories
        │
        ├── Snack
        ├── Pickle
        └── Grocery / everyday favourite
        │
        ▼
User selects products
        │
        ▼
Client validates selection
        │
        ▼
POST /api/combo
        │
        ▼
Server validates product IDs / availability
        │
        ▼
Validated combo returned
        │
        ▼
Products added individually to cart
```

Category aliases are normalized so naming differences such as `Dry/Instant Grocery` and `Dry & Instant Grocery` do not unnecessarily break the selection flow.

---

## 12. Data Import & Validation

The seed script retrieves product URLs from the live Store and extracts product data with Axios and Cheerio.

### Extraction priorities

```text
JSON-LD / structured product data
          │
          ▼
Product-specific DOM extraction
          │
          ▼
OpenGraph / title fallbacks
          │
          ▼
Validation + normalization
          │
          ▼
MongoDB
```

### Validation safeguards

- Clean whitespace and encoded text
- Identify the actual product heading rather than blindly using the first `h1`
- Parse prices from rupee values
- Reject suspicious values such as site-wide delivery thresholds being mistaken for product prices
- Normalize image URLs, including Next.js optimized URLs
- Prefer Cloudinary originals when available
- Extract rating/review metadata from structured product data
- Extract product weight
- Clean navigation labels from tags
- Preserve source URLs
- Skip invalid product records

The importer treats source HTML as **untrusted input**, not as a guaranteed clean database export.

---

## 13. Error Handling

### Frontend

Reusable components cover loading, API errors, empty search/catalogue states, product-not-found states and cart synchronization errors.

Store and Product Details also guard against stale async responses updating unmounted components.

### Backend

Centralized middleware handles unknown routes and API errors with consistent JSON responses. Controllers pass unexpected errors to centralized middleware rather than duplicating response handling.

---

## 14. Security

The prototype includes baseline safeguards but is not a production-secured commerce system.

### Implemented / considered

- Server-authoritative product pricing for cart calculations
- Product ID validation before database lookup
- Stock checks before cart mutation
- Active-product checks
- Positive-price checks for catalogue/recommendation results
- Environment-variable based MongoDB configuration
- CORS configuration
- Centralized error handling without normal stack-trace exposure

### Production requirements

- Authentication and authorization
- Rate limiting
- Strong request-schema validation
- Input sanitization where appropriate
- HTTPS
- Secure cookies/tokens if authentication is added
- Payment-provider verification
- Audit logging
- Secret management
- Security headers
- Automated security testing

---

## 15. Performance Considerations

### Current implementation

- Debounced Store query effect at 300 ms
- Server-side catalogue filtering/sorting
- Product image URL normalization
- Reusable ProductCard/ProductGrid components
- Conditional loading and error states
- Database indexes on frequently filtered fields
- Recommendation candidate limit before scoring

### Production improvements

- Pagination or cursor-based catalogue queries
- Search indexes / dedicated search service
- Image transformations and responsive image sizing
- Lazy loading and priority loading for above-the-fold media
- API caching where safe
- CDN delivery
- Query profiling and database monitoring
- Frontend bundle analysis
- Automated performance budgets

No numerical performance improvement is claimed without benchmarking.

---

## 16. Deployment Architecture

Recommended deployment shape:

```text
                Internet
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
   Static Frontend      Express API
   Netlify / similar    Render / similar
          │                 │
          │                 ▼
          │              MongoDB Atlas
          │
          └────── HTTPS / JSON ──────►
```

### Environment variables

Backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, replace local values with deployed service URLs and keep secrets outside source control.

### Deployment checklist

- Build frontend with `npm run build`
- Configure `VITE_API_URL`
- Configure backend `MONGO_URI` and allowed frontend origin
- Run the backend with `npm start`
- Verify `/api/health`
- Seed the production database only with approved product data
- Test product loading, cart operations, recommendations and combo flow after deployment
