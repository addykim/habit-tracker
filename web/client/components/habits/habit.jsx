import React, { Component } from 'react';
import {ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap'

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
  }
  componentWillMount(){}
  componentDidMount() {
    // this.props.onGetHabits()
    // TODO change hardcoded value
    getAllUserHabits(3)
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

// function mapDispatchToProps(dispatch) {
//   return { onGetHabits: () => getAllUserHabits() }
// }

export default Habit
