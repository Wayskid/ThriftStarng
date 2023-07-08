import express, { json } from "express";
import connectToDB from "./config/mongoDB.js";
import dataImport from "./dataImport.js";
import productsRoute from "./routes/productsRoute.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import dotenv from "dotenv";
import orderRoute from "./routes/orderRoute.js";

dotenv.config();
connectToDB();
const app = express();
app.use(json());

const corsOrigin = {
  origin: ["https://thriftstarng.netlify.app", "http://locahost:3000"],
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  optionSuccessStatus: 204,
  preflightContinue: false,
};
app.use(cors(corsOrigin));

//API
app.use("/api/products", productsRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);

//Data import
app.use("/api/import", dataImport);

//Port
const port = process.env.PORT || 1000;
app.listen(port, console.log("Server is running..."));
