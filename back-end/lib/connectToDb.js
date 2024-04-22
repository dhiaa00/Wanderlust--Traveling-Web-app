import mongoose from "mongoose"

const connectToDb = async (dbStringURL) => {
    try {
        await mongoose.connect(dbStringURL)
        console.log("connectToDb succefully")
    } catch (error) {
        console.log("failed to connect to db",error)
    }
}

export default connectToDb