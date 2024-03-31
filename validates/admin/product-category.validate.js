module.exports.createPost = (req, res, next) => {
    if(!req.body.title) {
        req.flash("error", "Error happen !");
        res.redirect("back");
        return;
    }
    next();
}