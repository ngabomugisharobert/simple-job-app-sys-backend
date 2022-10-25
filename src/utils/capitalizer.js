const capitalizeFirstLetter = (string) => {
    if (string.length > 0) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }
    else
        return string;
}
module.exports = capitalizeFirstLetter;