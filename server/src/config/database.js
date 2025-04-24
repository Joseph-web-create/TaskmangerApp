import mongoose, { Mongoose } from "mongoose";
const mongoUri = process.env.MONGODB_URL;

if (!mongoUri) {
  throw new Error("MONGO_URI enviroment variable is not defined");
}
let connection = {};

const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("database already connected");
      return;
    }

    const db = await mongoose.connect(mongoUri, {
      dbName: "TaskManager",
      serverSelectionTimeoutMS: 45000,
      socketTimeoutMS: 5000,
    });

    connection.isConnected = db.connections[0].readyState === 1;

    if (connection.isConnected) {
      console.log("Database connected successfully");

      mongoose.connection.on("disconnected", () => {
        console.log("Database diconnected");
        connection.isConnected = false;
      });

      mongoose.connection.on("error", (error) => {
        console.log("Database connection error", error);
      });

      process.on("SIGINT", async () => {
        await mongoose.connection.close();
        console.log("Database has been disconnected through termination");
        process.exit(0);
      });
    }
  } catch (error) {
    console.log("Database connection error", error);
    connection.isConnected = false;
    throw new error("false to connect to database");
  }
};

export default connectToDb;
