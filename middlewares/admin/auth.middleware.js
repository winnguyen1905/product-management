const { request } = require("express");
const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

module.exports.requireAuth = async (req, res, next) => {
    const token = req.cookies.token;
    const [user] = await Account.find({token: token}).select("-password");
    if (user && token) {
        const [role] = await Role.find({_id: user.role_id}).select("title permissions");
        res.locals.user = user;
        res.locals.role = role;
        next();
    } else {
        req.flash("error", "You dont have permission to access on this page !");
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
}