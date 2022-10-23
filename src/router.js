const express = require('express')

const fileUpload = require('express-fileupload');
const router = express.Router();


router.use(fileUpload());
router.use('/auth', require('./apps/auth/router'));
router.use('/application', require('./apps/application/router'));

module.exports = router;