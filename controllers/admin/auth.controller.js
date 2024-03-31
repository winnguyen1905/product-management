const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const md5 = require("md5");
const systemConfig = require("../../config/system");
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
    const existRole = await Account.findOne({ token: req.cookies.token})
    if(existRole) {
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    } else res.render("admin/pages/auth/login");
};


// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
    try {

        req.body.deleted = false;
        req.body.password = md5(req.body.password);
        const existEmail = await Account.findOne({ email: req.body.email, deleted: false});
        const existAccount = await Account.findOne( req.body );

        if(existAccount) {
            if(existAccount.status === 'active') {
                req.flash('success', 'Login Successfully');
                res.cookie("token", existAccount.token);
                res.cookie("userName", existAccount.fullName);
                res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
            } else {
                req.flash('error', 'Your account was banned !');
                res.redirect("back");
            }
        } else {
            if(existEmail) {
                req.flash('error', 'Password error !');
                res.redirect("back");
            } else {
                req.flash('error', 'Account Not exist !');
                res.redirect("back");
            }
        }
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error happen');
        res.redirect("back");
    }
};


// [GET] /admin/auth/logout
module.exports.logout = (req, res) => {
    res.clearCookie("userName");
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};