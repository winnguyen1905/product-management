module.exports.index = async (req, res) => {
    res.render("admin/pages/products/index", {
        pageTitle : "Product Admin"
    });
};