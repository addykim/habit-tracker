const DATE_FORMAT = 'YYYY-MM-DD'

import moment from 'moment'

export function isToday(date) {
  if (date.length === 2)
    return false
  return moment(date).format(DATE_FORMAT) === getTodaysDate()
}

export function getTodaysDate() {
  return moment().format(DATE_FORMAT)
}