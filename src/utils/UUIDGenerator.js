const { uuid } = require('uuidv4');

const generateUUID = () => {
    return uuid();
}

module.exports = generateUUID;