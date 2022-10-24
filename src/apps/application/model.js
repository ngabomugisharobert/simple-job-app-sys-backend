const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phoneNumber: String,
    address: String,
    dob: String,
    coverLetter: String,
    cv: {
        fileType: String,
        file: String
    },
    status: {
        type: String,
        default: 'pending'
    },

}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);


module.exports = Application;
