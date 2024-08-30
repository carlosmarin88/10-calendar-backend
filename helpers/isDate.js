
const moment = require('moment');

const isDate = (value, rest) => {

    //console.log(value);
    //console.log(rest);
    if(!value) {
        return false;
    }

    const date = moment(value);
    return date.isValid();
}


module.exports = {
    isDate
}