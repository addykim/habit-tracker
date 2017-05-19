import React, {Component} from 'react'

import {addDays, formatDate, subtractDays, isSaturday} from '../../utils/date'
// add padding before and after streak for A E S T H E T I C calendar view
// squares should be an array of square objects
function padSquares(squares, startDate) {
  startDate = moment(startDate)
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
  let endDayOfWeek = moment(endDate).day()
  if (endDayOfWeek < 6) {
    let paddingAfter = []
    let paddingDate = addDays(endDate, 1)
    for (let i = endDayOfWeek; i < 6; i++) {
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


class Square extends Component {
  constructor(props) {
    super(props)
    let isPadding = this.props.isPadding
    if (isPadding === undefined) {
      isPadding = false
    }
    this.state = {
      date: this.props.date,
      isHeader: this.props.isHeader,
      isPadding: isPadding,
      completed: this.props.completed,
      isSaturday: isSaturday(this.props.date)
    }
    this.markCompleted = this.markCompleted.bind(this)
  }
  render() {
    let dayDate;
    if (this.state.isHeader) {
      dayDate = this.state.date
    } else {
      dayDate = formatDate(this.state.date).substring(this.state.date.length-2)
    }
    return <span className={this.getClass()}>{dayDate}</span>
  }
  markCompleted() {
    this.setState({completed: true})
  }
  getClass() {
    let classNames = ['square']
    if (this.state.completed)
      classNames.push('completed')
    else if (this.state.isHeader)
      classNames.push('header')
    else if (this.state.isPadding)
      classNames.push('disabled')
    // TODO today
    // if (isToday(this.props.index)) {
      // classNames.push('today')
    // }
    return classNames.join(' ')
  }
}

export default Square
