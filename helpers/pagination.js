module.exports = (query, objectPagination, countProducts) => {
const Product = require("../models/product.model");
    if(query.page)  objectPagination.currentPage = parseInt(query.page);
    objectPagination.skip = (objectPagination.currentPage-1)*objectPagination.limititems;
    objectPagination.totalPage = Math.ceil(countProducts/objectPagination.limititems);
    return objectPagination;
}