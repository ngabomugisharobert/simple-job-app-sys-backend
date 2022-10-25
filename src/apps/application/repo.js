const Application = require('./model')
const UUIDGenerator = require('../../utils/UUIDGenerator')
const generateS3URL = require('../../utils/generateS3URL')
const axios = require('axios');
var FormData = require('form-data');
const fs = require('fs');

exports.create = async (firstName, lastName, email, phoneNumber, address, dob, cv) => {
    try {
        const file_id = UUIDGenerator();
        const url = await generateS3URL.generateS3URL(file_id);

        console.log("*******************************", typeof (cv), "!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        let formData = new FormData();
        formData.append('file', cv.cv.name);
        formData.append('extractArchive', 'false');
        console.log("*******************************", formData, "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        //put request to s3 to upload file to s3 bucket and get url back to save in db with axios
        const response = await axios.put(url, cv, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

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
            file_link,
        })
        await newApplication.save()
        return newApplication;
        }
    } catch (error) {
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
