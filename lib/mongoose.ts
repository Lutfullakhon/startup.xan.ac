import mongoose, { ConnectOptions } from 'mongoose'

let isConnected = false

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGODB_URL) {
    console.error('❌ MONGODB_URL is missing')
    return
  }

  if (isConnected) {
    console.log('✅ Already connected to MongoDB')
    return
  }

  try {
    const options: ConnectOptions = {
      dbName: process.env.MONGODB_DB,
      autoCreate: true,
    }

    await mongoose.connect(process.env.MONGODB_URL, options)
    isConnected = true
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
  }
}
