import mongoose from 'mongoose'

let connectionPromise

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not configured')
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO_URI)
  }

  try {
    const connection = await connectionPromise
    console.log(`MongoDB connected: ${connection.connection.host}`)
    return connection.connection
  } catch (error) {
    connectionPromise = null
    console.error(`MongoDB connection error: ${error.message}`)
    throw error
  }
}

export default connectDB
