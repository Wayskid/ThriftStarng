import { Schema, model } from "mongoose";

const productsSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "ThriftStarng Product",
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stockCount: {
      type: Number,
      required: true,
      default: 1,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Products = model("Products", productsSchema);

export default Products;
