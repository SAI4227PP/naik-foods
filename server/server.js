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

connectDB()

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})