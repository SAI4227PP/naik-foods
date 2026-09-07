# Naik Foods — E-commerce Experience Improvement

Full-stack MERN internship project that turns an analysis of the Naik Foods shopping journey into a working e-commerce prototype. The work focuses on clearer product discovery, stronger product information, a conversion-oriented cart, and a reusable client/server architecture.

> This is an assessment prototype. It is not affiliated with or an official replacement for the Naik Foods website.

## Project objective

The objective was not to duplicate an existing store. It was to review a real shopping experience, identify practical opportunities, and implement selected improvements that make it easier for customers to find, understand, and purchase products.

The project considers the experience from both customer and engineering perspectives:

- Product discovery: search, filters, sorting, and category-based browsing
- Purchase confidence: product images, pricing, ratings, availability, delivery information, and related products
- Conversion: persistent cart state and a free-delivery progress goal
- Basket exploration: a custom **Build Your Maharashtra Box** flow
- Maintainability: reusable React components, an API service layer, REST endpoints, MongoDB models, and server middleware

## Key product decisions

### 1. Improve discovery

The Store page moves beyond a simple grid. Customers can search remotely and refine the result set by category, region, rating, price, availability, and order. This supports both intent-led shopping (for example, searching for a specific snack) and browsing.

### 2. Make free delivery actionable

Rather than presenting the ₹999 free-delivery threshold as static text, the cart displays progress toward it and the amount still required. This turns a delivery rule into a clear shopping goal.

### 3. Encourage multi-category purchases

**Build Your Maharashtra Box** guides customers to choose products from complementary groups—such as a snack, pickle, and everyday favourite—then calculates the combined selection and adds it to the cart.

### 4. Organise product information around a purchase decision

The product page places the gallery, rating, price, weight, stock state, highlights, quantity controls, delivery check, trust messaging, specifications, and related products in a clear sequence.

### 5. Treat imported data as untrusted

The product importer does not blindly save page text. It attempts structured extraction, rejects suspicious prices and invalid records, normalizes image URLs, cleans tags, retains source URLs, and reports import outcomes.

## Features delivered

### Customer-facing experience

- Responsive navigation, footer, home, store, product, cart, combo, about, blog, and contact pages
- API-backed product catalogue with loading, empty, and error states
- Debounced search and filters for category, region, rating, price, and in-stock status
- Product sorting by newest, price, rating, and name
- Product gallery, highlights, rating, review count, specifications, availability, and related products
- Quantity controls and add-to-cart actions
- Persistent cart with add, edit, remove, clear, subtotal, and delivery-progress behaviours
- Custom Maharashtra Box builder with selection validation and dynamic total

### Engineering implementation

- Reusable React UI components and `CartContext` state management
- Dedicated frontend API client in `client/src/services/api.js`
- Express API with products, cart, recommendations, combo, and health endpoints
- MongoDB persistence via Mongoose
- CORS configuration, not-found middleware, and centralized API error responses
- Product-seeding/import script with extraction and validation helpers

## Architecture

```text
React + Vite client
        |
        | HTTP / JSON
        v
Node.js + Express API
        |
        | Mongoose
        v
MongoDB
```

```text
client/
  src/
    components/     Reusable store, cart, and feedback UI
    context/        Persistent cart state and actions
    pages/          Route-level screens
    services/       API client
server/
  config/           MongoDB connection
  controllers/      Product, cart, combo, and recommendation logic
  middleware/       Not-found and error handlers
  models/           Product and Cart schemas
  routes/           REST endpoint definitions
  seed/             Product import script
```

## Technology stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, Vite, React Router, Tailwind CSS, Lucide React |
| Backend | Node.js, Express, CORS, dotenv |
| Database | MongoDB, Mongoose |
| Data import | Axios, Cheerio |
| Tooling | npm, ESLint, nodemon, Git |

## API reference

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | API health check |
| `GET` | `/api/products` | List products with discovery filters |
| `GET` | `/api/products/:id` | Get one product |
| `GET` | `/api/cart/:cartId` | Get a cart |
| `POST` | `/api/cart/:cartId/items` | Add an item |
| `PUT` | `/api/cart/:cartId/items/:productId` | Change quantity |
| `DELETE` | `/api/cart/:cartId/items/:productId` | Remove an item |
| `DELETE` | `/api/cart/:cartId` | Clear a cart |
| `GET` | `/api/recommendations?cartProductIds=id1,id2` | Get recommendations |
| `POST` | `/api/combo` | Create/validate a Maharashtra Box selection |

`GET /api/products` accepts `search`, `category`, `region`, `minRating`, `maxPrice`, `inStock`, and `sort` query parameters. Supported server-side sort values are `newest`, `price-low`, `price-high`, `rating`, and `name`.

## Local setup

### Prerequisites

- Node.js 18 or later
- npm
- A MongoDB database connection string

### 1. Configure environment variables

Create `server/.env` (do not commit it):

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Create `client/.env` only if the API is not running at the local default:

```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Install packages

```bash
cd server
npm install

cd ../client
npm install
```

### 3. Run the application

In one terminal:

```bash
cd server
npm run dev
```

In a second terminal:

```bash
cd client
npm run dev
```

The client runs at `http://localhost:5173` by default and the API at `http://localhost:5000`.

### 4. Import product data (optional)

```bash
cd server
npm run seed
```

The import script uses `axios` and `cheerio`. If they are not yet present in `server/package.json`, install and save them before running the seed command:

```bash
npm install axios cheerio
```

## Validation and testing

Suggested manual checks:

- Search, filter, sort, and clear filters on the Store page
- Open a product, change quantity, and add it to the cart
- Update quantities, remove items, clear the cart, and verify delivery progress
- Build a Maharashtra Box and add it to the cart
- Confirm loading, empty, and error states with the API unavailable or a no-result search
- Check navigation and layouts on desktop, tablet, and mobile widths

Run the client linter with:

```bash
cd client
npm run lint
```

## Known implementation notes

- The Store UI currently sends `price_asc` and `price_desc` for two sort options, while the server expects `price-low` and `price-high`. The rating, name, and newest options match; aligning these two values is a small follow-up fix.
- The project contains a functional prototype flow, not checkout, authentication, payment, order, or inventory systems.
- Never commit `.env` files, database credentials, or `node_modules`. The client and server `.gitignore` files are provided for this purpose.

## Future improvements

- Authentication, saved addresses, order history, and order tracking
- Payment integration and server-authoritative checkout pricing
- Wishlist, coupons, gift cards, subscriptions, and festival bundles
- Verified reviews, richer recommendations, and search analytics
- Inventory and order-management dashboards
- Rate limiting, input sanitization, authorization, HTTPS, observability, and automated tests

## Assignment outcome

This submission demonstrates a complete path from experience analysis to a testable implementation:

```text
Existing shopping journey
        -> identified customer and technical opportunities
        -> prioritised product decisions
        -> responsive React experience + REST API + MongoDB models
        -> reusable foundation for future commerce features
```

The delivered prototype prioritizes discovery, conversion, purchase confidence, and maintainability while keeping future commerce requirements clearly separated from completed work.
