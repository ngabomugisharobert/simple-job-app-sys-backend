const express = require('express');
const bodyParser = require('body-parser')
const db = require('./config/db');
const cors = require("cors");
const parentDirectory = __dirname;
const path = require("path");
const fileUpload = require("express-fileupload");
const router = require('./router.js')
const app = express()
app.use(cors());
db();

const user = require('./apps/auth/model')
const application = require('./apps/application/model')

app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(fileUpload());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     // res.header("Access-Control-Allow-Headers",
//     //     "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// app.use('/static', express.static(path.join(parentDirectory, "/build/static")));
// app.use(fileUpload());
// app.use('/public', express.static(path.join(parentDirectory, "/build/")));
// app.get("/*", function (req, res) {
//     res.header("Cache-Control", "no-cache, no-store, must-revalidate");
//     // res.sendFile(path.join(parentDirectory, "/build/index.html"));

// });

app.use('/api/v1', router);


const PORT = process.env.PORT || 9000

app.listen(PORT, console.log(`Listening on ${PORT}`))
