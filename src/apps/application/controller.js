const Application = require('./repo')
const Response = require('../../utils/Responses')
const capitalizeFirstLetter = require('../../utils/capitalizer')
const generateS3URL = require('../../utils/generateS3URL')



exports.create = async (req, res) => {
    console.log("^^^^^^^^^^^^^^", req, "@@@@@@@@@@")
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            dob,
        } = req.body;
        const cv = req.files

        await Application.create(capitalizeFirstLetter(firstName), capitalizeFirstLetter(lastName), email, phoneNumber, address, dob, cv)
            .then(results => {
                Response.Success(res, 200, "created successfully", results);
            })
            .catch(err => {
                console.log(err);
                Response.InternalServerError(res, "We are having issues! please try again soon");
            });

    } catch (error) {
        console.log(error);
        Response.InternalServerError(res, "We are having issues! please try again soon");
    }

}

//get all applications
exports.getAll = async (req, res) => {
    try {
        await Application.getAll()
            .then(results => {
                Response.Success(res, 200, "success", results);
            })
            .catch(err => {
                console.log(err);
                Response.InternalServerError(res, "We are having issues! please try again soon");
            });

    } catch (error) {
        console.log(error);
        Response.InternalServerError(res, "We are having issues! please try again soon");
    }

}

//get application by id
exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        await Application.getById(id)
            .then(results => {
                Response.Success(res, 200, "success", results);
            })
            .catch(err => {
                console.log(err);
                Response.InternalServerError(res, "We are having issues! please try again soon");
            });

    } catch (error) {
        console.log(error);
        Response.InternalServerError(res, "We are having issues! please try again soon");
    }

}

//update status
exports.updateStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        await Application.updateStatus(id, status)
            .then(results => {
                Response.Success(res, 200, "success", results);
            })
            .catch(err => {
                console.log(err);
                Response.InternalServerError(res, "We are having issues! please try again soon");
            });

    } catch (error) {
        console.log(error);
        Response.InternalServerError(res, "We are having issues! please try again soon");
    }

}

exports.addFile = async (req, res) => {
    try {
        const applicationId = req.params.appId;
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            dob,
            cv,
            coverLetter
        } = req.body;
        const file = req.files.file[0].path

        Application.addFile(firstName, lastname, email, phoneNumber, address, dob, cv, coverLetter)
            .then(results => {
                Response.Success(res, 200, "updated successfully", results);
            })
            .catch(err => {
                console.log(err);
                Response.InternalServerError(res, "We are having issues! please try again soon");
            });

    } catch (error) {
        console.log(error);
        Response.InternalServerError(res, "We are having issues! please try again soon");
    }

}

exports.uploadFile = async (req, res) => {
    try {
        // file has been uploaded
        const file = req.file
        console.log(file)
        Response.Success(res, 200, "file uplaoded successfully", file);


    } catch (error) {
        console.log(error);
        Response.InternalServerError(res, "We are having issues! please try again soon");
    }
}

exports.generateS3URL = async (req, res) => {
    try {
        const url = await generateS3URL.generateS3URL("eecf5035-74e1-4519-8ea5-e73d5a9dde362")
        const file = req.body.document;
        // do a put request to the url and file
        // save // 
        const file_link = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${file}`
        Response.Success(res, 200, "success", url);


    } catch (error) {
        console.log(error);
        Response.InternalServerError(res, "We are having issues! please try again soon");
    }

}