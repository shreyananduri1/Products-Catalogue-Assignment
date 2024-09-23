const express = require("express");
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const router = express.Router();

router.route("/").get(getAllProducts);

router.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct);

router.route("/create").post(createProduct);

module.exports = router;
