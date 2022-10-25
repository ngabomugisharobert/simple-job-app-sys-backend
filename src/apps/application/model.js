const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phoneNumber: String,
    address: String,
    dob: String,
    cv: String,
    status: {
        type: String,
        default: 'pending'
    },

}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);


module.exports = Application;
