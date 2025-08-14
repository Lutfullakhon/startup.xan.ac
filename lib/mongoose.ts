import mongoose, { ConnectOptions } from 'mongoose'

let isConnected = false

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGODB_URL) {
    return
  }

  if (isConnected) {
    return
  }

  try {
    const options: ConnectOptions = {
      dbName: process.env.MONGODB_DB,
      autoCreate: true,
    }

    await mongoose.connect(process.env.MONGODB_URL, options)
    isConnected = true
  } catch (error) { }
}
