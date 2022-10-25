const capitalizeFirstLetter = (string) => {
    const temp = string + '';
    if (temp.length > 0) {
        return temp.charAt(0).toUpperCase() + temp.slice(1);
    }
    else
        return temp;
}
module.exports = capitalizeFirstLetter;