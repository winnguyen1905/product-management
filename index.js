// nhung environnement variable from .env into index.js file
require("dotenv").config();

// nhung express
const express = require('express');

// khoi tao App
const app = express();
const port = process.env.PORT;

// database and connect
const database = require("./config/database");
database.connect();

// require route
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

// Set Pugjs
app.set("views", "./views");
app.set('view engine', "pug");

// nhung systemconfig
const systemConfig = require("./config/system");
// App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// khai bao public la thu muc tinh la public
app.use(express.static("public"));

// goi router va truyen paramaster
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});