const Role = require("../../models/role.model");
// [GET] /admin/role
module.exports.index = async (req, res) => {
    let find = {};
    const records = await Role.find(find);
    res.render("admin/pages/role/index", {
        pageTitle : "Role",
        records : records
    });
 };


 // [GET] /admin/role/create
 module.exports.create = async (req, res) => {
    const records = await Role.find({});
    res.render("admin/pages/role/create", {
        pageTitle: "Add New Role",
        records : records
    })
}

// [POST] /admin/role/create
module.exports.createPost = async (req, res) => {
    try {
        const newRole = new Role(req.body);
        console.log(req);

        await newRole.save();
        console.log(newRole);
        req.flash("success", "create new Role success");
        res.redirect("back");
    } catch (error) {
        console.error(err);
        req.flash("error", "cannot create new Role");
        res.redirect("back");
    }
};



// [GET] /admin/role/permissions
module.exports.permissions = async (req, res) => {
    let find = {};
    const records = await Role.find(find);
    res.render("admin/pages/role/permissions", {
        pageTitle : "Permissions",
        records : records
    });
};

// [PATCH] /admin/role/permissions
module.exports.permissionsPatch = async (req, res) => {
    let permissions = JSON.parse(req.body.permissions);
    try {
        for(const item of permissions) {
            await Role.findOneAndUpdate(
                { _id: item.id },
                { permissions : [...item.permissions] }
            )
        }        
        req.flash("success", "update Role success");
        res.redirect("back");
    } catch (error) {
        req.flash("error", "update Role faile");
        res.redirect("back");
    }
 };
