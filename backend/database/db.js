import mongoose from "mongoose"

export const dbConnection = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MONGO DB CONNECTED: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error(`MONGO DB ERROR: ${error.message}`)
    }
}