import React, {Component} from 'react'

// add padding before and after streak for A E S T H E T I C calendar view
// squares should be an array of square objects
function padSquares(squares, startDate) {
  startDate = moment(startDate)
  let days
  let paddingBefore = []
  let startDayOfWeek = startDate.day()
  if (startDayOfWeek !== 0) {
    let paddingDate = moment(startDate).subtract(startDayOfWeek, 'days')
    for (let i = 0; i < startDayOfWeek; i++) {
      paddingBefore.push({
        date: paddingDate.format(DATE_FORMAT),
        completed: false,
        isPadding: true
      })
      paddingDate = moment(paddingDate).add(1, 'days')
    }
    days = paddingBefore.concat(squares)
  } else {
    days = squares
  }

  let endDate = squares[squares.length-1].date
  let endDayOfWeek = moment(endDate).day()
  if (endDayOfWeek < 6) {
    let paddingAfter = []
    let paddingDate = moment(endDate).add(1, 'days')
    for (let i = endDayOfWeek; i < 6; i++) {
      paddingAfter.push({
        date: paddingDate.format(DATE_FORMAT),
        completed: false,
        isPadding: true
      })
      paddingDate = moment(paddingDate).add(1, 'days')
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
      completed: this.props.completed
    }
    this.markCompleted = this.markCompleted.bind(this)
  }
  render() {
    let dayDate;
    if (this.state.isHeader) {
      dayDate = this.state.date
    } else {
      dayDate = moment(this.state.date).format(DATE_FORMAT).substring(this.state.date.length-2)
    }
    return (
      <span className={this.getClass()}>{dayDate}</span>);
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
