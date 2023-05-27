import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const productsRoute = express.Router();

// //Get All Products
productsRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    if (req.query.s) {
      const products = await Product.find({
        $or: [
          {
            name: {
              $regex: req.query.s,
              $options: "i",
            },
          },
        ],
      }).sort({ [req.query.sort]: req.query.order });
      res.json(products);
    } else if (req.query.c) {
      const products = await Product.find({
        $or: [
          {
            category: {
              $regex: req.query.c,
              $options: "i",
            },
          },
        ],
      }).sort({ [req.query.sort]: req.query.order });
      res.json(products);
    } else if (req.query.c && req.query.s) {
      const products = await Product.find({
        $or: [
          {
            name: {
              $regex: req.query.s,
              $options: "i",
            },
          },
          {
            category: {
              $regex: req.query.c,
              $options: "i",
            },
          },
        ],
      });
      res.json(products);
    } else {
      const products = await Product.find({}).sort({ [req.query.sort]: req.query.order });
      res.json(products);
    }
  })
);

//Get One Product
productsRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

export default productsRoute;
