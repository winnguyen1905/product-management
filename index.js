require("dotenv").config();
const express = require('express');
const app = express();

const port = process.env.PORT;
// require route
const route = require("./routes/client/index.route");

// Set PugS
app.set("views", "./views");
app.set('view engine', "pug");

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});