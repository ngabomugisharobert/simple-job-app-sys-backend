const user = require("./model")


exports.create = async (firstName, lastName, email, password) => {
    try {
        const User = new user({
            firstName,
            lastName,
            email: email?.toLowerCase(),
            password,

        });
        return await User.save();

    } catch (err) {
        throw err;
    }
};


exports.getUserByEmail = async (email) => {
    console.log(user.findOne({ email: email }));
    try {
        return await user.findOne({
            "email": email
        });
    } catch (error) {
        throw error;
    }
}


exports.getUserById = async (id) => {
    try {
        return await user.findById(id);
    } catch (error) {
        throw error;
    }
}