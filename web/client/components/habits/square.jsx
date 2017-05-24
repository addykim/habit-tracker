import React, {Component} from 'react'
import {isNull} from 'lodash'

import {addDays, formatDate, getMonth, isSaturday, subtractDays} from '../../utils/date'

import {padSquares} from '../../utils/squares'

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
    let dayDate, month
    if (this.state.isHeader) {
      dayDate = this.state.date
    } else {
      dayDate = formatDate(this.state.date).substring(this.state.date.length-2)
    }
    if (dayDate === '01' || this.props.index === 0) {
      month = getMonth(this.state.date)
      // month = 'Jun'
    } else {
      month = null
    }
    return (
      <span>
        <span className={this.getClass()}>
          {month}
          {!isNull(month) && <br/>}
          {dayDate}
        </span>
        {this.props.index !== 0 && this.props.index % 7 === 6 && <br/>}
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
    // if (isToday(this.props.index)) {
      // classNames.push('today')
    // }
    return classNames.join(' ')
  }
}

export default Square
