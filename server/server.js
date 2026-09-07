import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import recommendationRoutes from './routes/recommendationRoutes.js'
import comboRoutes from './routes/comboRoutes.js'

import notFoundMiddleware from './middleware/notFoundMiddleware.js'
import errorMiddleware from './middleware/errorMiddleware.js'

dotenv.config()

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'https://naikclient.vercel.app',
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

app.use(express.json())

// Vercel runs this Express app as a serverless function, so there is no
// startup phase where the database connection can be established once.
// Connect before handling database-backed routes and reuse the cached
// Mongoose connection across warm serverless invocations.
app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (error) {
    next(error)
  }
})

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Naik Foods API and MongoDB are connected',
    database: 'connected',
  })
})

app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/recommendations', recommendationRoutes)
app.use('/api/combo', comboRoutes)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000

// Keep the normal Express server for local development.
// Vercel handles the exported Express app as a serverless function.
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

export default app
