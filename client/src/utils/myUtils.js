/// yyyy-mm-dd hh:mm:ss
export const getDateTimeString = (date) => {
    return date.toISOString().replace(/T|Z|\.\d{3}/g, ' ').trim()
}

export const addHours = (date, hours) => {
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    return date;
}