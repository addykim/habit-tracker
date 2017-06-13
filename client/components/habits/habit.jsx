import React, { Component } from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup, Modal} from 'react-bootstrap'

import HabitForm from './form'
import StreakView from './streak'

import {getAllUserHabits} from '../../actions/habit'

class Habit extends Component {
  constructor(props) {
    super()
    this.state = {
      habits: [],
      show: false
    }
    this.addNewHabit = this.addNewHabit.bind(this)
    this.deleteHabit = this.deleteHabit.bind(this)
  }
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
        {mapping}
        <Button onClick={() => {console.log('show modal');this.setState({ show: true})}}>+</Button>
        <Modal
            show={this.state.show}
            onHide={this.hideModal.bind(this)}
            dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <HabitForm addOnSubmit={this.addNewHabit}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
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
  hideModal() {
    console.log('hide modal')
    this.setState({show: false});
  }
}

// function mapDispatchToProps(dispatch) {
//   return { onGetHabits: () => getAllUserHabits() }
// }

export default Habit
