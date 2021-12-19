function formatDate(date) {
  return new Intl.DateTimeFormat().format(new Date(date));
}
export const formatDateTime = (date) => {
  if(!date){
    return null
  }
  return new Intl.DateTimeFormat('en-us', { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric", hour12: true, timeZone: 'Australia/Sydney' }).format(new Date(date))
}

export default formatDate;
