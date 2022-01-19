/// yyyy-mm-dd hh:mm:ss
const getDateTimeString = (date) => {
    return date.toISOString().replace(/T|Z|\.\d{3}/g, ' ').trim()
}

module.exports = {
    getDateTimeString
}