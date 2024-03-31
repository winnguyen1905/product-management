const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const md5 = require("md5");
// [GET] /admin/account
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };
    const records = await Account.find(find).select("-password -token");
    for(let item of records) {
        const [singleRole] = await Role.find({ _id: item.role_id })
        item.role = singleRole.title;
    };
    res.render("admin/pages/account/index", {
        pageTitle : "Account List",
        records : records
    });
 };


// [GET] /admin/account/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    };
    const records = await Role.find(find);
    res.render("admin/pages/account/create", {
        pageTitle: "Add New Account",
        records : records
    })
}


// [POST] /admin/account/create
module.exports.createPost = async (req, res) => {
    try {
        req.body.email = req.body.email.toLowerCase();
        const mail = req.body.email;
        const mailExist = await Account.findOne({
            email : mail,
            deleted: false
        });
        if (mailExist) {
            req.flash("error", `has exist ${mail} !`);
            res.redirect(`back`);
        } else {
            req.body.password = md5(req.body.password);
            const newAccount = new Account(req.body);
            await newAccount.save();
            req.flash("success", "create account success");
            res.redirect(`back`);
        }
    } catch (error) {
        console.error(err);
        req.flash("error", "cannot create account");
        res.redirect(`back`);
    }
};

// [GET] /admin/account/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const [account] = await Account.find({
            _id : req.params.id
        });
        
        const records = await Role.find({});

        res.render(`admin/pages/account/edit`, {
            pageTitle: "Edit Category",
            account: account,
            records: records
        })
    } catch (error) {
        req.flash("error", "Can't find account");
        res.redirect(`${systemConfig.prefixAdmin}/account`);
    }
}

// [PATCH] /admin/account/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        req.body.email = req.body.email.toLowerCase();
        let newAccount = req.body;
        let oldAccount = await Account.find({ _id: req.params.id});
        const mailExist = await Account.findOne({email: req.body.email});
        // has exist ?
        if(mailExist && mailExist._id != req.params.id) {  // $ne: id
            req.flash("error", `has exist ${mail} !`);
        } else {
            // pass
            if(newAccount.password) newAccount.password = md5(newAccount.password);
            else newAccount.password = oldAccount.password;
            oldAccount = {...oldAccount, ...newAccount};
            // save
            const id = req.params.id;
            await Account.updateOne(
                { _id: id},
                { $set: oldAccount }
            )
            req.flash("success", "update Account success");
        }
    } catch (error) {
        req.flash("error", "Cannot update Account");
        console.error("err");
    }
    res.redirect("back");
};
