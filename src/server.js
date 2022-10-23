const express = require('express');
var bodyParser = require('body-parser')
const db = require('./config/db');
const cors = require("cors");
const parentDirectory = __dirname;
const path = require("path");
const fileUpload = require("express-fileupload");
const router = require('./router.js')
const app = express()
db();
const user = require('./apps/auth/model')
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json())
app.use(cors({ origin: "*" }));
// app.use('/static', express.static(path.join(parentDirectory, "/build/static")));
// app.use(fileUpload());
// app.use('/public', express.static(path.join(parentDirectory, "/build/")));
// app.get("/*", function (req, res) {
//     res.header("Cache-Control", "no-cache, no-store, must-revalidate");
//     res.sendFile(path.join(parentDirectory, "/build/index.html"));
// });

app.use('/api/v1', router);


const PORT = process.env.PORT || 9000

app.listen(PORT, console.log(`Listening on ${PORT}`))