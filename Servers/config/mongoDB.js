import mongoose from "mongoose";

async function connectToDB() {
  try {
    const connect = mongoose.connect(
      process.env.MONGO_URL
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

export default connectToDB;
