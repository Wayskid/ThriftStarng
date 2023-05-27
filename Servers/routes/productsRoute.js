import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const productsRoute = express.Router();

//Get All Products
productsRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const keyword = req.query.s
      ? {
          name: {
            $regex: req.query.s,
            $options: "i",
          },
        }
      : {};

    const products = await Product.find({
      ...keyword,
    });
    res.json(products);
  })
);
// //Get All Products
// productsRoute.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     const keyword =
//       req.query.s || req.query.c
//         ? {
//             $or: [
//               ({
//                 name: {
//                   $regex: req.query.s,
//                   $options: "i",
//                 },
//               },
//               {
//                 category: {
//                   $regex: req.query.c,
//                   $options: "i",
//                 },
//               }),
//             ],
//           }
//         : {};

//     const products = await Product.find({
//       ...keyword,
//     }).sort({ [req.query.sort]: req.query.order });
//     res.json(products);
//   })
// );

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
