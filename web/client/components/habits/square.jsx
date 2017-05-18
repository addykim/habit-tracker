import React, {Component} from 'react'

// TODO remove moment
import moment from 'moment'

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
    // let paddingDate = moment(startDate).subtract(startDayOfWeek, 'days')
    for (let i = 0; i < startDayOfWeek; i++) {
      paddingBefore.push({
        // date: paddingDate.format(DATE_FORMAT),
        date: formatDate(paddingDate),
        completed: false,
        isPadding: true
      })
      paddingDate = addDays(paddingDate, 1)
      // paddingDate = moment(paddingDate).add(1, 'days')
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
    // let paddingDate = moment(endDate).add(1, 'days')
    for (let i = endDayOfWeek; i < 6; i++) {
      paddingAfter.push({
        // date: paddingDate.format(DATE_FORMAT),
        date: formatDate(paddingDate),
        completed: false,
        isPadding: true
      })
      paddingDate = addDays(paddingDate, 1)
      // paddingDate = moment(paddingDate).add(1, 'days')
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
      let DATE_FORMAT = 'YYYY-MM-DD'
      dayDate = moment(this.state.date).format(DATE_FORMAT).substring(this.state.date.length-2)
    }
    return (
      <span
          className={this.getClass()}>
          {dayDate}
          {this.state.isSaturday?<br/>:null}
      </span>
    )
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
    // if (this.props.index == moment().date())
      // classNames.push('today')
    return classNames.join(' ')
  }
}

export default Square
