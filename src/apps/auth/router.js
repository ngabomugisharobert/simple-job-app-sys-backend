const express = require('express')
const User = require('./controller');

const passport = require('passport')



const router = express.Router();

router.post('/signup', User.createUser);
router.post('/signin', User.signin);


// router.post('/verify-token', passport.authenticate("jwt", { session: false }), User.verifyToken);

// router.post('/email-taken', User.emailTaken);

module.exports = router;