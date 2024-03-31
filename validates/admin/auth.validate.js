module.exports.loginPost = (req, res, next) => {
    if(!req.body.email) {
        req.flash("error", "dcmm email ?");
        res.redirect("back");
        return;
    }
    if(!req.body.password) {
        req.flash("error", "dcmm password ?");
        res.redirect("back");
        return;
    }
    next();
}