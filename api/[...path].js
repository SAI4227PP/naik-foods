import app from '../server/server.js'
import connectDB from '../server/config/db.js'

export default async function handler(req, res) {
  try {
    await connectDB()
    return app(req, res)
  } catch (error) {
    console.error('Vercel API initialization failed:', error)
    return res.status(500).json({
      success: false,
      message: 'API initialization failed',
    })
  }
}
