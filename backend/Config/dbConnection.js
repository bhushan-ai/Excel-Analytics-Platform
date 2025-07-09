import mongoose from "mongoose";

export async function connectToDb() {
  try {
    const mongoDbInstance = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `mongodb Connected ! db host: ${mongoDbInstance.connection.host}`
    );
  } catch (error) {
    console.log("mongodb connection err", error);
  }
}
