const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: String,
  image: String,
  countInStock: Number,
  createdAt: Date,
});

const ProductModel = mongoose.model("Products", productSchema);

module.exports = ProductModel;