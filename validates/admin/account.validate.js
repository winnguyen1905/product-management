module.exports.createPost = (req, res, next) => {
    if(!req.body.fullName) {
        req.flash("error", "Error user name !");
        res.redirect("back");
        return;
    }
    if(!req.body.email) {
        req.flash("error", "Error mail !");
        res.redirect("back");
        return;
    }
    if(!req.body.password) {
        req.flash("error", "Error password !");
        res.redirect("back");
        return;
    }
    if(!req.body.phone) {
        req.flash("error", "Error phone !");
        res.redirect("back");
        return;
    }
    next();
}


module.exports.editPatch = (req, res, next) => {
    if(!req.body.fullName) {
        req.flash("error", "Error user name !");
        res.redirect("back");
        return;
    }
    if(!req.body.email) {
        req.flash("error", "Error mail !");
        res.redirect("back");
        return;
    }
    if(!req.body.phone) { 
        req.flash("error", "Error phone !");
        res.redirect("back");
        return; 
    }
    next();
}