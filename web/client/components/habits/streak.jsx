import moment from 'moment'


import React, {Component} from 'react'
import {Button} from 'react-bootstrap'

import Square from './square'

// import * as calenderHeader from '../../../static/data/calHeader.json'
import calenderHeader from '../../constants/calenderHeader'

import {getTodaysDate} from '../../utils/date'

class StreakView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      habitName: this.props.name,
      squares: this.props.streak,
      startDate: this.props.startDate,
      goalStreak: this.props.goalStreak
    }
  }
  componentWillMount() {}
  componentDidMount() {}
  render() {
    let days = this.state.squares
    let weekView = []
    let week = 0, weekWithToday = 0
    let index = 0
    return (
      <div className="habit-progress center-text">
        <h3 className="habit-header">
          {this.state.habitName}
        </h3>
        <div className="habit-streak-view">
          {calenderHeader.map((square, i) => {
            return (
              <Square
                key={i}
                isHeader={true}
                date={square.date}
                completed={false}/>
            )
          })}
          <br/>
          {this.state.squares.map((square, i) => {
            return (
             <Square
                key={i}
                date={square.date}
                isHeader={false}
                isPadding={square.isPadding}
                completed={square.completed}/>
            )
          })}
        </div>
        <div>
          <Button
              className="center-block completed-button"
              type="button"
              onClick={this.markTodayCompleted.bind(this)}>
              Completed
          </Button>
        </div>
      </div>
    )
  }
  markTodayCompleted() {
    let today = getTodaysDate()
    let squares = this.state.squares
    let index = 0
    let notFound = true
    while (notFound) {
      // if (!squares[index].isPadding) {
      if (squares[index].date === today) {
        notFound = false
        squares[index].completed = true
      } else {
        index++
      }
      // }
    }

    let differenceStartToday = Math.floor(Math.abs(moment(squares[0].date).diff(today, 'days')) / 7)
    this.refs.thisweek.markSquareCompleted()
  }
}

export default StreakView
