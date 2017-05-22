import {addDays, formatDate, getDay, getMomentDate, subtractDays} from './date'

// add padding before and after streak for A E S T H E T I C calendar view
// squares should be an array of square objects
export function padSquares(squares, startDate) {
  startDate = getMomentDate(startDate)
  let days
  let paddingBefore = []
  let startDayOfWeek = startDate.day()
  if (startDayOfWeek !== 0) {
    let paddingDate = subtractDays(startDate, startDayOfWeek)
    for (let i = 0; i < startDayOfWeek; i++) {
      paddingBefore.push({
        date: formatDate(paddingDate),
        completed: false,
        isPadding: true
      })
      paddingDate = addDays(paddingDate, 1)
    }
    days = paddingBefore.concat(squares)
  } else {
    days = squares
  }

  let endDate = squares[squares.length-1].date
  let endDayOfWeek = getDay(endDate)
  if (endDayOfWeek < 6) {
    let paddingAfter = []
    let paddingDate = addDays(endDate, 1)
    for (let i = endDayOfWeek; i < 6; i++) {
      console.log(formatDate(paddingDate))
      paddingAfter.push({
        date: formatDate(paddingDate),
        completed: false,
        isPadding: true
      })
      paddingDate = addDays(paddingDate, 1)
    }
    days = days.concat(paddingAfter)
  }
  return days
}
