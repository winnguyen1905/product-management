const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

const controller = require("../../controllers/admin/dashboard.controller");

router.get("/", controller.dashboard);

module.exports = router;