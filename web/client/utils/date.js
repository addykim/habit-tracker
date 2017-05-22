import moment from 'moment'

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
