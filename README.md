# Naik Foods — E-commerce Experience Improvement

A full-stack MERN-style internship prototype created after analysing the Naik Foods e-commerce shopping journey. The project focuses on **product discovery, purchase confidence, conversion-oriented cart behaviour, guided cross-category shopping, recommendations, and maintainable architecture**.

> **Assessment prototype:** This project is not affiliated with or an official replacement for the Naik Foods website.

## Overview

The assignment started with a review of the public Naik Foods shopping experience from both customer and developer perspectives. The prototype then turns selected findings into working features rather than only a visual redesign.

### Core journey

```text
Discover → Search / Filter → Evaluate Product → Add to Cart
                     ↓
             Recommendations
                     ↓
              Build a Better Basket
```

## Features

### Customer experience

- Responsive Home, Store, Product Details, Cart, Maharashtra Box, About, Blog and Contact pages
- API-backed product catalogue
- Search with a 300 ms debounced query effect
- Category, region, rating, price and stock filters
- Product sorting by newest, price, rating and name
- Product gallery, pricing, weight, rating, availability and highlights
- Pincode-format delivery interaction
- Persistent server-backed cart
- Quantity update, remove and clear-cart actions
- Dynamic **₹999 free-delivery progress**
- **Build Your Maharashtra Box** guided shopping flow
- **Recommended For You** contextual product recommendations
- Loading, empty and error states

### Engineering

- Reusable React components
- `CartContext` for cart state/actions
- Central frontend API service
- Express REST API
- MongoDB/Mongoose persistence
- Deterministic server-side recommendation engine
- Product import/seeding pipeline using Axios + Cheerio
- Structured-data extraction and product-data validation
- Image URL normalization
- Centralized backend error/not-found middleware

## Key Product Decisions

| Problem | Decision | Status |
|---|---|---|
| Catalogue discovery | Server-backed search, filters and sorting | ✅ Implemented |
| Passive ₹999 threshold | Dynamic cart progress | ✅ Implemented |
| Single-category browsing | Maharashtra Box | ✅ Implemented |
| Follow-on discovery | Deterministic recommendations | ✅ Implemented |
| Product confidence | Purchase-oriented Product Details | ✅ Implemented |
| Unreliable imported content | Structured extraction + validation | ✅ Implemented |
| Behavioural personalization | User-history/ML recommendations | 🔄 Future |
| Complete commerce | Payment, checkout, inventory, orders | 🔄 Future |

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite, React Router 7, Tailwind CSS 4, Lucide React |
| Backend | Node.js, Express 5, CORS, dotenv |
| Database | MongoDB, Mongoose 9 |
| Data import | Axios, Cheerio |
| Tooling | npm, ESLint, Nodemon, Git |

## Project Structure

```text
naik-foods/
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── data/
│       ├── pages/
│       └── services/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   └── utils/
│
├── docs/
│   ├── screenshots/
│   ├── analysis.md
│   └── architecture.md
│
├── README.md
└── .gitignore
```

## Documentation

| Document | Purpose |
|---|---|
| [`docs/analysis.md`](./docs/analysis.md) | Business, product and customer-experience analysis — what was observed and what should be improved |
| [`docs/architecture.md`](./docs/architecture.md) | Technical architecture — how the prototype is structured and how the major flows work |

The documentation intentionally separates **product thinking** from **engineering implementation**.

## Prerequisites

- Node.js 18+
- npm
- MongoDB / MongoDB Atlas connection string

## Installation

Clone the repository and install dependencies separately for the client and server:

```bash
git clone https://github.com/SAI4227PP/naik-foods.git
cd naik-foods

cd server
npm install

cd ../client
npm install
```

## Environment Variables

### Backend — `server/.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

### Frontend — `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Do not commit real database credentials or secrets. For deployment, configure environment variables in the hosting platform rather than hard-coding them in source files.

## Running Locally

### Terminal 1 — Backend

```bash
cd server
npm run dev
```

API:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

### Terminal 2 — Frontend

```bash
cd client
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Seed Database

The importer retrieves product URLs from the public Store and extracts validated product data.

```bash
cd server
npm run seed
```

The seed pipeline uses Axios and Cheerio and includes extraction fallbacks, price validation, image normalization, tag cleanup and invalid-record handling.

## Build

```bash
cd client
npm run build
```

Preview the production build locally with:

```bash
npm run preview
```

## API

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/products` | Product list + filters |
| `GET` | `/api/products/:id` | Product details |
| `GET` | `/api/cart/:cartId` | Read cart |
| `POST` | `/api/cart/:cartId/items` | Add cart item |
| `PUT` | `/api/cart/:cartId/items/:productId` | Update quantity |
| `DELETE` | `/api/cart/:cartId/items/:productId` | Remove item |
| `DELETE` | `/api/cart/:cartId` | Clear cart |
| `GET` | `/api/recommendations?cartProductIds=id1,id2` | Recommendations |
| `POST` | `/api/combo` | Validate/create Maharashtra Box selection |

### Product query parameters

`GET /api/products` supports:

```text
search
category
region
minRating
maxPrice
inStock
sort
```

Sort values:

```text
newest
price-low
price-high
rating
name
```

## Architecture at a Glance

```text
React + Vite
    │
    │ HTTP / JSON
    ▼
Node.js + Express
    │
    │ Mongoose
    ▼
MongoDB
```

Feature flow:

```text
Store ───────────────► Products API
Product Details ─────► Product API
Recommendations ─────► Recommendation API
Cart ─────────────────► Cart API
Maharashtra Box ──────► Combo API
```

See [`docs/architecture.md`](./docs/architecture.md) for the complete technical explanation.

## Screenshots

Final submission screenshots should be placed in [`docs/screenshots/`](./docs/screenshots/):

- Existing Store baseline
- Improved Store
- Product Details
- Recommended For You
- Smart Cart
- Build Your Maharashtra Box
- Mobile responsive view

> Screenshots should be captured from the final working build. No performance or conversion improvement should be inferred from screenshots alone.

## Validation / Testing

Run the client linter:

```bash
cd client
npm run lint
```

Recommended manual checks:

- Search and clear Store filters
- Change sorting and category/region filters
- Open a product and change quantity
- Add/update/remove/clear cart items
- Verify ₹999 delivery progress
- Load recommendations from Product Details
- Build and validate a Maharashtra Box
- Test no-result, loading and API-error states
- Test desktop, tablet and mobile widths

## Deployment

Recommended deployment shape:

```text
Frontend hosting
      │
      │ HTTPS / JSON
      ▼
Express backend
      │
      ▼
MongoDB Atlas
```

### Live links

- 🌐 **Frontend:** `ADD_DEPLOYED_FRONTEND_URL`
- ⚙️ **Backend:** `ADD_DEPLOYED_BACKEND_URL`
- 💻 **Repository:** https://github.com/SAI4227PP/naik-foods

Replace the deployment placeholders before final submission.

## Scope & Limitations

This is a working internship-task prototype, not a complete production commerce system.

Not implemented:

- Authentication / authorization
- Production checkout and payment verification
- Order management and tracking
- Inventory administration
- Behavioural/ML recommendation personalization
- Real delivery-provider pincode verification

Production hardening would also require stronger request validation, rate limiting, security headers, observability, automated tests, HTTPS, secret management and operational monitoring.

No conversion, revenue, traffic or performance uplift is claimed because the prototype has not been evaluated with production analytics.

## Future Improvements

- Authentication, saved addresses and order history
- Payment integration and server-authoritative checkout
- Wishlist, coupons, gift cards and subscriptions
- Verified reviews with photos and helpful votes
- Behavioural recommendation personalization
- Inventory and order-management dashboards
- Regional/festival SEO landing pages
- Search analytics and experimentation
- Automated tests and observability

## Assignment Outcome

The project demonstrates a complete path from **website analysis → product decisions → working full-stack implementation**.

The main focus is practical: reduce discovery friction, improve purchase confidence, make the free-delivery incentive actionable, encourage cross-category shopping, and establish a maintainable foundation for future commerce capabilities.
