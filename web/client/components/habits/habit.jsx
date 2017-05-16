import React, { Component } from 'react';
import {ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap'

import HabitForm from './form'
import StreakView from './streak'

import * as calenderHeader from '../../../static/data/calHeader.json'
// const calenderHeader = []

// import '../less/streak.less'

var dummy_id = 6

class Habit extends Component {
  constructor(props) {
    super()
    this.state = {
      habits: []
    }
    this.addNewHabit = this.addNewHabit.bind(this)
  }
  componentWillMount(){}
  componentDidMount() {
    fetch('http://localhost:8080/api/user/3/habits')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({habits: responseJson})
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    let mapping;
    if (this.state.habits.length === 0) {
      mapping = (<p>No habits created</p>)
    } else {
      mapping = this.state.habits.map(habit => {
        return (
        <StreakView
          key={habit.id}
          name={habit.name}
          streak={habit.streak}
          startDate={habit.startDate}
          goalStreak={habit.goalStreak}/>)
      })
    }

    return (
      <div className="center-block">
        <HabitForm addOnSubmit={this.addNewHabit}/>
        {mapping}
      </div>
    );
  }
  addNewHabit(newHabit) {
    let habits = this.state.habits
    habits.push(newHabit)
    this.setState({
      habits: habits
    })
  }
}

export default Habit
