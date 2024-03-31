const mongoose = require('mongoose');

const slug = require('mongoose-slug-updater')

mongoose.plugin(slug);

const productCategorytSchema = new mongoose.Schema({
    title: String,
    parent_id: {
        type: String,
        default: ""
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    slug: { type: String, slug: ['title'], unique: true},
    changeDeleteStatus: Date,
}, {
    timestamps: true
});

const productCategory = mongoose.model("productCategory", productCategorytSchema, "product-category");

module.exports = productCategory;