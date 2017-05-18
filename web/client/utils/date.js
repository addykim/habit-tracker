import moment from 'moment'

export const DATE_FORMAT = 'YYYY-MM-DD'

export function addDays(date, numDays) {
  // TODO check
  return moment(date).add(days, 'days')
}

export function subtractDays(date, numDays) {
  // TODO check
  return moment(date).subtract(numDays, 'days')
}

export function isSaturday(date) {
  return moment(date).isoWeekday() === 6
}

export function formatDate(date) {
  return date.format(DATE_FORMAT)
}

export function getTodaysDate() {
  return moment().format(DATE_FORMAT)
}

export function isToday(date) {
  if (date.length === 2) {
    return false
  }
  return moment(date).format(DATE_FORMAT) === getTodaysDate()
}
