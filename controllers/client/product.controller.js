const Product = require("../../models/product.model")

// [GET] /products
module.exports.index = async (req, res) => {
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


// [GET] /products/detail/:slug
module.exports.detail = async (req, res) => {
    try {

        const [product] = await Product.find({
            slug: req.params.slug
        })
        res.render("client/pages/products/detail", {
            pageTitle : "Product Detail",
            product : product
        });

    } catch (error) {

        res.redirect(`/products`);

    }
}