import React, { Component } from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup, Modal} from 'react-bootstrap'

import HabitForm from './form'
import StreakView from './streak'

import {getAllUserHabits} from '../../actions/habit'

class Habit extends Component {
  constructor(props) {
    super()
    this.state = {
      habits: []
    }
    this.addNewHabit = this.addNewHabit.bind(this)
    this.deleteHabit = this.deleteHabit.bind(this)
  }
  componentDidMount() {
    // this.props.onGetHabits()
    // getAllUserHabits()
  }
  render() {
    let mapping
    // if (this.state.habits.length === 0) {
      // mapping = (<p>No habits created</p>)
    // } else {
      mapping = this.state.habits.map((habit, index) => {
        return (
          <div className="inline-block vertical-top" key={habit.id}>
            <StreakView
              index={index}
              name={habit.name}
              streak={habit.streak}
              startDate={habit.startDate}
              goalStreak={habit.goalStreak}/>
            <Button
                type="button"
                onClick={this.deleteHabit}>
              Delete
            </Button>
          </div>
        )
      })
    // }
    return (
      <div className="center-block">
        <HabitForm addOnSubmit={this.addNewHabit}/>
        {mapping}
      </div>
    )
  }
  addNewHabit(newHabit) {
    let habits = this.state.habits
    habits.push(newHabit)
    this.setState({
      habits: habits
    })
  }
  deleteHabit() {
    // TODO does not actually do anything
    console.log('Delete habit')
    let habits = this.state.habits
    habits.splice()
    this.setState({
      habits: habits
    })
  }
}

export default Habit
