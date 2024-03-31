const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

const controller = require("../../controllers/admin/product-category.controller");

const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');

const validate = require('../../validates/admin/product-category.validate');

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.delete("/delete-item/:delete_status/:id", controller.deleteItem);

router.patch("/change-multi", controller.changeMulti);

router.get("/create", controller.create);

router.get("/edit/:id", controller.edit);

router.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.uploadCloud,
    validate.createPost,
    controller.createPost
);


router.patch(
    "/edit/:id",
    upload.single('thumbnail'),
    uploadCloud.uploadCloud,
    validate.createPost,
    controller.editPatch
);

router.post(
    '/upload',
    upload.single('file'),
    uploadCloud.uploadImageCloud
);

module.exports = router;