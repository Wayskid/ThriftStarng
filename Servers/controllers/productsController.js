import Products from "../models/productModel.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Get new arrives
export const getNewProducts = async (req, res) => {
  try {
    const products = await Products.find({}).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Get sales products
export const getSalesProducts = async (req, res) => {
  try {
    const products = await Products.find({ discount: 10 });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Get one product
export const getOneProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Products.findById(productId);
    if (!product) throw new Error("Sorry, we cannot find this product");
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//Search products
export const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const products = await Products.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
