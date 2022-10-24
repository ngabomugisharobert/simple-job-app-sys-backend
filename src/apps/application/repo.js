const Application = require('./model')

exports.create = async (firstName, lastName, email, phoneNumber, address, dob, cv) => {
    try {
        const newApplication = new Application({
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            dob,
            cv
        })
        await newApplication.save()
        return newApplication;
    } catch (error) {
        throw error;
    }
};

// get all applications
exports.getAll = async () => {
    try {
        return await Application.find().sort('firstName');
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
