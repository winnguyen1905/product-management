// [GET] /admin/products

//import model form model & schema file
const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {

    // FiltersStatus of button
    let filters = [
        {
            name: "All",
            status: "",
            class: ""
        },
        {
            name: "Active",
            status: "active",
            class: ""
        },
        {
            name: "Inactive",
            status: "inactive",
            class: ""
        }
    ]

    // button isActive
    if(req.query.status) {
        const index = filters.findIndex( item => item.status == req.query.status);
        filters[index].class = "active";
    } else {
        const index = filters.findIndex( item => item.status == "");
        filters[index].class = "active";
    }

    // query criteria
    let find = {
        deleted : false
    };

    // add parameter into query criteria 
    if(req.query.status)
        find.status = req.query.status;

    // Dig into database by model and render pug file
    const products = await Product.find(find);
    res.render("admin/pages/products/index", {
        pageTitle : "Product Admin",
        products : products,
        filter : filters
    });
};