import moment from 'moment'

const MONTH_NAMES_SHORT = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'

export const DATE_FORMAT = 'YYYY-MM-DD'

export function addDays(date, numDays) {
  // TODO check
  return moment(date).add(numDays, 'days')
}

export function subtractDays(date, numDays) {
  // TODO check
  return moment(date).subtract(numDays, 'days')
}

export function isSaturday(date) {
  return moment(date).isoWeekday() === 6
}

export function formatDate(date) {
  return moment(date).format(DATE_FORMAT)
}

export function getMonth(date) {
  let monthNum = moment(date).month()
  return MONTH_NAMES_SHORT.split('_')[monthNum]
}

export function getDay(date) {
  return moment(date).day()
}

export function getMomentDate(date) {
  return moment(date)
}

export function getTodaysDate() {
  return moment().format(DATE_FORMAT)
}

export function isToday(date) {
  if (date.length === 2) {
    return false
  }
  return formatDate(date) === getTodaysDate()
}
