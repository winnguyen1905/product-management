const productCategory = require("../../models/product-category.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search") 
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");

// [GET] /admin/products-category
    module.exports.index = async (req, res) => {
        // button isActive
        const filterStatus = filterStatusHelper(req.query);

        // query criteria
        let find = {
            // deleted : false
        };

        // search object
        let objectSearch = {};
        console.log(req);
        objectSearch = searchHelper(req.query);
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
        const countProducts = await productCategory.countDocuments(find);
        let objectPagination = {
            limititems : 6,
            currentPage: 1
        };
        objectPagination = paginationHelper(req.query, objectPagination, countProducts);

        //sort criteria
        let sortObject = {};
        if(req.query.sortCriteria) {
            const [sortkey, sortCriteria] = req.query.sortCriteria.split("-");
            sortObject[sortkey] = sortCriteria;
        }

        // Dig into database by model and render pug file
        const records = await productCategory.find(find)
            .sort(
                sortObject
            )
            .limit(objectPagination.limititems)
            .skip(objectPagination.skip);

        const newRecords = createTreeHelper(records, objectPagination.currentPage);

        res.render("admin/pages/product-category/index", {
            pageTitle : "Products Category",
            newRecords : newRecords,
            filterStatus : filterStatus,
            keyword : keyword,
            objectPag : objectPagination,
            listIdChangeStatus : listIdChangeStatus,
        });
    };


// [GET] /admin/product-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const [category] = await productCategory.find({
            _id : req.params.id
        });
        
        const records = await productCategory.find();

        const newRecords = createTreeHelper(records);

        res.render(`admin/pages/product-category/edit`, {
            pageTitle: "Edit Category",
            category: category,
            newRecords: newRecords
        })
    } catch (error) {
        req.flash("error", "Can't find category");
        res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    }
}


// [PATCH] /admin/product-category/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        let categoryEdit = req.body;

        const id = req.params.id;

        let category = await productCategory.find({
            _id: id
        })

        // if send file
        category = {...category, ...categoryEdit};

        await productCategory.updateOne(
            { _id:  id},
            { $set: category }
        )
        req.flash("success", "update category success");
    } catch (error) {
        req.flash("error", "Cannot update category");
        console.error("err");
    }
    res.redirect("back");
};




// [GET] /admin/products-category/create
    module.exports.create = async (req, res) => {

        const records = await productCategory.find();

        const newRecords = createTreeHelper(records);

        res.render("admin/pages/product-category/create", {
            pageTitle: "Add New Product Category",
            items: newRecords
        })
    }




// [POST] /admin/products-category/create
    async function findMaxPosition() {
        const result = await productCategory.findOne().sort('-position').exec();
        return result ? result.position : 0;
    }
    module.exports.createPost = async (req, res) => {
        try {
            // if no send position
            if(!req.body.position) {
                const newPosition = await findMaxPosition() + 1;
                req.body.position = newPosition;
            }
        
            const newProduct = new productCategory(req.body);
            newProduct.save();

            req.flash("success", "create product success");
            res.redirect(`${systemConfig.prefixAdmin}/product-category`);
        } catch (error) {
            console.error(err);
            req.flash("error", "cannot create product");
            res.redirect("back");
        }
    };
 

// [PATCH] /admin/product-category/change-status/:status/:id
    module.exports.changeStatus = async (req, res) => {
        const status = req.params.status;
        const id = req.params.id;
        try {
        // Update the product
            await productCategory.findOneAndUpdate(
                { _id: id },
                { $set: { status: status} }
            );
        
        // Redirect to the product page
            const referer = req.get('Referer');
            req.flash('success', `Update status to ${status} for 1 product`);
            res.redirect("back");
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    // [DELETE] /admin/products/delete-item/:delete-status/:id
    module.exports.deleteItem = async (req, res) => {

        const id = req.params.id;
        const isDelete = req.params.delete_status === "true" ? true : false;
        
        try {
            await productCategory.findOneAndUpdate(
                { _id: id },
                { $set: {
                    deleted : isDelete,
                    changeDeleteStatus: new Date()
                } }
            );
            req.flash('success', `Update status to ${isDelete ? "Delete" : "Restore"} for 1 product`);
            res.redirect("back");
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
            res.redirect("back");
        }
    };



// [PATCH] /admin/products/change-multi
    module.exports.changeMulti = async (req, res) => {
        const stringId = req.body.ids
        const status = req.body.type;
        const objectStatus = {};
        let timeNow = new Date();
        timeNow.setTime(timeNow.getTime());
        let ids = stringId.split(' - ');ids.pop();        
        
        try {
            for(let item of ids) {
                let [id, position] = item.split('.');
                position = parseInt(position);
                await productCategory.findOneAndUpdate(
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
            case "delete":
                objectStatus["deleted"] = true;
                objectStatus["changeDeleteStatus"] = timeNow
                break;
            case "restore":
                objectStatus["deleted"] = false;
                objectStatus["changeDeleteStatus"] = timeNow
                break;
            case 'active':
                objectStatus["status"] = "active";
                break;
            case 'inactive':
                objectStatus["status"] = "inactive";
                break;
            case 'hard-delete':
                try {
                    await productCategory.deleteMany({ _id: { $in: ids } });
                } catch (error) {
                    console.error('Error deleting documents:', err);
                }
                break;
            default:
                break;
        }
        try {
            await productCategory.updateMany(
                { _id: { $in: ids } },
                { $set: objectStatus }
            );
            req.flash('success', `Update status to ${status} for ${ids.length} products`);
            res.redirect("back");
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
            req.flash('error', `Update status to ${status} for ${ids.length} products failed`);
            res.redirect("back");
        }
    }