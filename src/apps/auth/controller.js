const User = require("./repo");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Mailer = require('../../utils/mail/mail')
const passportConfig = require("../../config/passport")
const Response = require("../../utils/Responses")



exports.createUser = async (req, res) => {

    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
        } = req.body;

        const checkEmail = await User.getUserByEmail(email);
        if (checkEmail)
            return Response.validationError(res, "Email already exists");

        const password = Math.floor(100000 + Math.random() * 900000);

        const hashedPassword = await bcrypt.hash(password.toString(), 10);
        const userData = User.create(firstName, lastName, email, hashedPassword, phoneNumber);
        const data = {
            _id: userData._id,
            firstName,
            lastName,
            email,
            phoneNumber,
        }
        const token = jwt.sign({
            user: data
        }, passportConfig.secret);
        // set up the mail server
        const newMail = new Mailer({ to: email, subject: "Simple Job Application System: Password", header: null, messageBody: "Hello " + firstName + " " + lastName + " your password for SJA system is: " + password, messageHeader: "Password" })
        newMail.sendMail()
        return Response.Success(res, 200, "user signed up successfully", {
            user: data,
            password,
            token: token
        });

    } catch (err) {
        console.log(err);
        Response.InternalServerError(res, "We are having issues! please try again soon")
    }
};


exports.signin = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        console.log(req.body);
        const userData = await User.getUserByEmail(email?.toLowerCase());
        if (!userData)
            return Response.notFoundError(res, "User not found");
        if (!await bcrypt.compare(password, userData.password))
            return Response.authorizationError(res, "wrong password");

        const data = {
            _id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
        }

        const results = data;
        const token = jwt.sign({
            user: data
        }, passportConfig.secret);

        return Response.Success(res, 200, "user signed in successfully", {
            user: results,
            token: token
        });

    } catch (error) {
        console.log(error)
        return Response.InternalServerError(res, "We are having issues! please try again soon")
    }
}