const express = require('express');
const app = express();
const port = 3000;

// require route
const route = require("./routes/client/index.route");

// Set PugS
app.set("views", "./views");
app.set('view engine', "pug");

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});