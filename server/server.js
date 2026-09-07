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

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Naik Foods API is running',
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
// Vercel uses the serverless handler in /api/[...path].js instead.
if (process.env.VERCEL !== '1') {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })
    })
    .catch((error) => {
      console.error(`Server startup failed: ${error.message}`)
      process.exit(1)
    })
}

export default app
