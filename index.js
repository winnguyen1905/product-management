// nhung environnement variable from .env into index.js file
require('dotenv').config();

// nhung express
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

// khoi tao App
const app = express();
const port = process.env.PORT;

// body-parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// database and connect
const database = require("./config/database");
database.connect();

// flash connected
app.use(cookieParser('DCMM'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// require route
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

// Set Pugjs
app.set("views", `${__dirname}/views`);
app.set('view engine', "pug");

// nhung systemconfig
const systemConfig = require("./config/system");

// App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// khai bao public la thu muc tinh la public
app.use(express.static(`${__dirname}/public`));

// method override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// goi router va truyen paramaster
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});