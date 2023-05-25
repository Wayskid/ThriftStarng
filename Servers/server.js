import express, { json } from "express";
import connectToDB from "./config/mongoDB.js";
import dataImport from "./dataImport.js";
import productsRoute from "./routes/productsRoute.js";
import { errorHandler, notFound } from "./middleware/error.js";
import cors from "cors";
import usersRoute from "./routes/usersRoute.js";
import dotenv from "dotenv";
import orderRoute from "./routes/orderRoute.js";

dotenv.config();
connectToDB();
const app = express();
app.use(json());

const corsOrigin = {
  origin: "https://thriftstarng.netlify.app",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOrigin));

//API
app.use("/api/import", dataImport);
app.use("/api/products", productsRoute);
app.use("/api/users", usersRoute);
app.use("/api/orders", orderRoute);

//Error Handler
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 1000;

app.listen(port, console.log("Server is running..."));
