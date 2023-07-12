import express from "express";
import {
  getAllProducts,
  getOneProduct,
  searchProducts,
  getNewProducts,
  getSalesProducts,
} from "../controllers/productsController.js";

const productsRoute = express.Router();

//Get All Products
productsRoute.get("/", getAllProducts);

//Get New Products
productsRoute.get("/new", getNewProducts);

//Get Sales Products
productsRoute.get("/sales", getSalesProducts);

//Get One Product
productsRoute.get("/:productId", getOneProduct);

//Search Product
productsRoute.get("/q/search", searchProducts);

export default productsRoute;
