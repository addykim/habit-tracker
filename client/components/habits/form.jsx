import React, {Component} from 'react'
import {Button} from 'react-bootstrap'

import {addDays, formatDate, getTodaysDate} from '../../utils/date'
import {padSquares} from '../../utils/squares'

import {addHabit} from '../../actions/habit'

var dummy_id = 6

const HABIT_FORM_DEFAULTS = {
  habitName: '',
  goalStreak: '',
  validInput: false
}

class HabitForm extends Component {
  constructor(props) {
    super(props)
    this.props.addOnSubmit
    this.state = HABIT_FORM_DEFAULTS
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  render() {
    return (
      <form
          className="habit-form center-text"
          onSubmit={this.handleSubmit}>
        <p>I want to do</p>
        <input
            id="habit-name-input"
            className="center-text"
            type="text"
            name="habitName"
            value={this.state.habitName}
            onChange={this.handleChange}
            placeholder="programming"/>
        <p>for</p>
        <input
            id="days-input"
            className="center-text"
            type="number"
            name="goalStreak"
            value={this.state.goalStreak}
            onChange={this.handleChange}
            placeholder="30"/>
        <p>days</p>
        <Button
            type="submit"
            disabled={!this.state.validInput}>
            Submit</Button>
      </form>
      )
  }
  handleChange(event) {
    const target = event.target
    const name = target.name
    const value = target.value
    this.setState({
      [name]: value
    })
    // input validation
    if (name === "habitName") {
      if (value.length === 0 || !value.trim()) {
        this.setState({validInput:false})
      } else {
        this.setState({validInput:true})
      }
    } else if (name === "goalStreak") {
      if (!Number.isNaN(value) && value > 1) {
        this.setState({validInput: true})
      } else {
        this.setState({validInput: false})
      }
    }
  }
  handleSubmit(event) {
    event.preventDefault()
    let habitName = this.state.habitName
    let goalStreak = this.state.goalStreak
    let todaysDate = getTodaysDate()
    let newHabit = {
      name: habitName,
      goalStreak: goalStreak,
      startDate: todaysDate,
      streak: []
    }
    let date = getTodaysDate()
    for (let index = 0; index < goalStreak; index++) {
      let square = {
        completed: false,
        date: formatDate(date),
        isPadding: false
      }
      date = addDays(date, 1)
      newHabit.streak.push(square)
    }
    newHabit.streak = padSquares(newHabit.streak, newHabit.startDate)
    this.props.addOnSubmit(newHabit)
    addHabit(newHabit)

    // clear form
    this.setState(HABIT_FORM_DEFAULTS)
  }
}

export default HabitForm
