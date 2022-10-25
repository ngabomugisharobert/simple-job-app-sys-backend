const Application = require('./model')
const UUIDGenerator = require('../../utils/UUIDGenerator')
const generateS3URL = require('../../utils/generateS3URL')
const axios = require('axios');
var FormData = require('form-data');
const fs = require('fs');
const fetch = require("node-fetch");

exports.create = async (firstName, lastName, email, phoneNumber, address, dob, cv) => {
    try {
        const file_id = UUIDGenerator() + '.pdf';
        const url = await generateS3URL.generateS3URL(file_id);
        let formData = new FormData();
        formData.append('file', cv.cv.data);
        console.log(formData, "formdata");

        const response = await fetch(url, { method: 'PUT', body: formData });
        console.log(
            `\nResponse returned by signed URL: ${await response.text()}\n`
        );

        const file_link = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${file_id}`

        // check response status
        if (response.status === 200) {
        const newApplication = new Application({
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            dob,
            cv: file_link,
        })
        await newApplication.save()
        return newApplication;
        }
    } catch (error) {
        console.log("error", error);
        throw error;
    }
};

// get all applications
exports.getAll = async () => {
    try {
        return await Application.find().sort({ firstName: 1 });
    } catch (error) {
        throw error;
    }
}

// get application by id
exports.getById = async (id) => {
    try {
        return await Application.findById(id);
    } catch (error) {
        throw error;
    }
}


//update status
exports.updateStatus = async (id, status) => {
    try {
        return await Application.findOneAndUpdate({ "_id": id }, { status }, { new: true });
    } catch (error) {
        throw error;
    }
}
