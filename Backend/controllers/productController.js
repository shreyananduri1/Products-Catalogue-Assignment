const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  if (products == '') {
    res.status(404);
    throw new Error("No products available");
    return;
  }
  res.status(200).send({message: "success", data: products});
});

const getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("product not found");
    return;
  } else {
    res.status(200).json({ message: "success", data: product});
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    productCode,
    productName,
    color,
    stock,
    description,
    category,
    seller,
    company,
    createdDate,
    thumbnailURL,
  } = req.body;
  if (!productCode || !productName) {
    res.status(400);
    throw new Error("Fields are mandatory.");
  }
  const newProduct = await Product.create({
    productCode,
    productName,
    color,
    stock,
    description,
    category,
    seller,
    company,
    createdDate,
    thumbnailURL,
  });
  res.status(200).send({ message: "Product created", data: newProduct });
});

const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const {
    productCode,
    productName,
    color,
    stock,
    description,
    category,
    seller,
    company,
    createdDate,
    thumbnailURL,
  } = req.body;
  const productToUpdate = await Product.findById(id);
  if(!productToUpdate){
    res.status(404);
    throw new Error("Invalid Request. Product not found.");
  }
  const updatedProduct = await Product.findByIdAndUpdate(id,{
    productCode,
    productName,
    color,
    stock,
    description,
    category,
    seller,
    company,
    createdDate,
    thumbnailURL,
  }, {new:true});

  res.status(200).send({ message: `product updated`, data: updatedProduct});
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const productToDelete = await Product.findById(id);
  if(!productToDelete){
    res.status(404);
    throw new Error("Product not found.");
  }
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.status(200).send({ message: `success`, data: deletedProduct });
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
