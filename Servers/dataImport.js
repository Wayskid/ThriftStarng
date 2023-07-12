import express from "express";
import User from "./models/userModel.js";
import users from "./data/users.js";
import Product from "./models/productModel.js";
import products from "./data/products.js";
import asyncHandler from "express-async-handler";

const dataImport = express.Router();

dataImport.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.deleteMany({});
    const userImport = await User.insertMany(users);
    res.send({ userImport });
  })
);

dataImport.post(
  "/product",
  asyncHandler(async (req, res) => {
    await Product.deleteMany({});
    const productImport = await Product.insertMany(products);
    res.send({ productImport });
  })
);

export default dataImport;
