import express from "express";
import {
  getAllProducts,
  getOneProduct,
  searchProducts,
} from "../controllers/productsController.js";

const productsRoute = express.Router();

//Get All Products
productsRoute.get("/", getAllProducts);

//Get One Product
productsRoute.get("/:productId", getOneProduct);

//Search Product
productsRoute.get("/q/search", searchProducts);

export default productsRoute;
