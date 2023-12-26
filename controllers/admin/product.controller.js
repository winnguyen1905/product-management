const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search") 
const paginationHelper = require("../../helpers/pagination");



// [GET] /admin/products
    module.exports.index = async (req, res) => {
        req.flash('info', 'Welcome');
        // button isActive
        const filterStatus = filterStatusHelper(req.query);

        // query criteria
        let find = {
            // deleted : false
        };
        // search object
        const objectSearch = searchHelper(req.query);
        find = {...find, ...objectSearch};
        // variables
        const keyword = req.query.keyword; 

        // add parameter into query criteria 
        if(req.query.status){
            find.status = req.query.status;
        }
        // checkbox
        let listIdChangeStatus = "";
        if(req.query.list_id_change_status) listIdChangeStatus = req.query.list_id_change_status;
        // pagination
        const countProducts = await Product.countDocuments(find);
        let objectPagination = {
            limititems : 4,
            currentPage: 1
        };
        objectPagination = paginationHelper(req.query, objectPagination, countProducts);
        // Dig into database by model and render pug file
        const products = await Product.find(find)
            .sort({
                position : "asc"
            })
            .limit(objectPagination.limititems)
            .skip(objectPagination.skip);
        
        res.render("admin/pages/products/index", {
            pageTitle : "Product Admin",
            products : products,
            filterStatus : filterStatus,
            keyword : keyword,
            objectPag : objectPagination,
            listIdChangeStatus : listIdChangeStatus
        });
    };





// [PATCH] /admin/products/change-status/:status/:id
    module.exports.changeStatus = async (req, res) => {
        const status = req.params.status;
        const id = req.params.id;
        
        try {
        // Update the product
            await Product.findOneAndUpdate(
                { _id: id },
                { $set: { status: status} }
            );
        
        // Redirect to the product page
            const referer = req.get('Referer');
            res.redirect("back");
            // res.redirect("back");
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }






// [PATCH] /admin/products/change-multi
    module.exports.changeMulti = async (req, res) => {
        const stringId = req.body.ids
        const status = req.body.type;
        const objectStatus = {};
        let timeNow = new Date();
        timeNow.setTime(timeNow.getTime());
        let ids = stringId.split(' - ');ids.pop();

        console.log(ids);
        
        
        try {
            for(let item of ids) {
                let [id, position] = item.split('.');
                position = parseInt(position);
                await Product.findOneAndUpdate(
                    { _id: id },
                    { $set: { position: position} }
                );
                ids.splice(ids.indexOf(item), 1, item.substring(0, item.indexOf('.')));
            };
        } catch (error) {
            console.error(error);
            res.redirect("back");
        }

        
        switch (status) {
            case "deleted":
                objectStatus["deleted"] = true;
                objectStatus["changeDeleteStatus"] = timeNow
                break;
            case "delete":
                objectStatus["deleted"] = false;
                objectStatus["changeDeleteStatus"] = timeNow
                break;
            case 'active':
                objectStatus["status"] = "active";
                break;
            case 'inactive':
                objectStatus["status"] = "inactive";
                break;
            default:
                break;
        }
        try {
            await Product.updateMany(
                { _id: { $in: ids } },
                { $set: objectStatus }
            );
            const referer = req.get('Referer');
            res.redirect("back");
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
            res.redirect("back");
        }
    }




// [DELETE] /admin/products/delete-item/:delete-status/:id
    module.exports.deleteItem = async (req, res) => {
        const id = req.params.id;
        const isDelete = req.params.delete_status === "true" ? true : false;
        try {
            await Product.findOneAndUpdate(
                { _id: id },
                { $set: {
                    deleted : isDelete,
                    changeDeleteStatus: new Date()
                } }
            );
            
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
            res.redirect("back");
        }
        const referer = req.get('Referer');
        res.redirect("back");
    };
