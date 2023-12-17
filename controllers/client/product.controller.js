const Product = require("../../models/product.model")

// [GET] /products
module.exports.index = async (req, res) => {
    console.log(req);
    const products = await Product.find({
        status: "active"
        // deleted: false
    });
    const newProducts = products.map((item, index) => {
        item.newPrice = (item.price * (100 - item.discountPercentage)/100).toFixed(0);
        return item;
    });
    res.render("client/pages/products/index", {
        pageTitle : "List Products",
        products : newProducts
    });
};