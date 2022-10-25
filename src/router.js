const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload');
const router = express.Router();

//use cors
router.use(cors());


router.use(fileUpload());
router.use('/auth', require('./apps/auth/router'));
router.use('/application', require('./apps/application/router'));

module.exports = router;