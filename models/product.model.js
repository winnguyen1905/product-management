const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    brand: String,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: Boolean,
    changeDeleteStatus: Date
});
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;