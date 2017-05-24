import {isUndefined} from 'lodash'
import React, {Component} from 'react'
import {Button} from 'react-bootstrap'

import Square from './square'

import calenderHeader from '../../constants/calenderHeader'

import {getTodaysDate, isToday} from '../../utils/date'

class StreakView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      habitName: this.props.name,
      squares: this.props.streak,
      startDate: this.props.startDate,
      goalStreak: this.props.goalStreak
    }
    this.markTodayCompleted = this.markTodayCompleted.bind(this)
  }
  componentWillMount() {}
  componentDidMount() {}
  render() {
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
                index={i}
                ref={isToday(square.date) ? 'today' : square.date}
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
              onClick={this.markTodayCompleted}>
              Completed
          </Button>
        </div>
      </div>
    )
  }
  markTodayCompleted() {
    this.refs.today.markCompleted()
  }
}

export default StreakView
