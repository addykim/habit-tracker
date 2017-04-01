import React, { Component } from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap'
import '../less/streak.less'
import moment from 'moment'

var dummy_id = 6

const DATE_FORMAT = 'YYYY-MM-D'

function isToday(date) {
  return moment(date).format(DATE_FORMAT) === getTodaysDate()
}

function getTodaysDate() {
  return moment().format(DATE_FORMAT)
}

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
      );
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
    let habitName = this.state.habitName
    let goalStreak = this.state.goalStreak
    let todaysDate = getTodaysDate()
    event.preventDefault()
    // TODO change id
    dummy_id++
    let newHabit = {
      id: dummy_id,
      name: habitName,
      goalStreak: goalStreak,
      startDate: todaysDate,
      streak: []
    };
    let date = moment(todaysDate).format(DATE_FORMAT);
    for (let index = 0; index < goalStreak; index++) {
      let square = {
        completed: false,
        date: date
      }
      date = moment(date).add(1, 'days').format(DATE_FORMAT)
      newHabit.streak.push(square)
    }
    this.props.addOnSubmit(newHabit)
    // TODO send to API

    // clear form
    this.setState(HABIT_FORM_DEFAULTS)
  }
}

class StreakView extends Component {
  constructor(props) {
    super(props);
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
    // if first day of streak does not start on sunday
    // add padding
    let days
    let paddingBefore = []
    let startDayOfWeek = moment(this.state.startDate).day()
    if (startDayOfWeek !== 0) {
      console.log('inserting padding')
      let firstDayOfPadding = moment(this.state.startDate).subtract(startDayOfWeek, 'day')
      // console.log(firstDayOfPadding)
      // TODO add padding
      days = paddingBefore.concat(this.state.squares)
    } else {
      console.log('no padding')
      days = this.state.squares
    }

    let weekView = []
    let week = 0
    days.forEach(function(day) {
      if (weekView[week] === undefined || weekView[week] ===  null) {
        weekView[week] = []
      } else {
        weekView[week].push(day)
      }
      
      if (weekView[week].length === 7) {
        week++
      }
    })
    let index = -1
    return (
      <div className="habit-progress center-text">
        <h3
            className="habit-header">
            {this.state.habitName}</h3>
        <div className="habit-streak-view">
          {weekView.map(function (row, index) {
            index++
            return (<StreakViewRow
              key={index}
              squares={row}/>)
          })}
        </div>
        <div>
          <Button
              className="center-block completed-button"
              type="button"
              onClick={this.markTodayCompleted.bind(this)}>
              Completed</Button>
        </div>
      </div>
    );
  }
  // calculate number of squares to place before
  // TODO hold off on this section until completing today is done
  // determineStreakView() {
    // let now = moment();
    // console.log(now.weekday());
    // if (now.weekday() !== 0) {
      // console.log("Not sunday");
    // }
  // }
  markTodayCompleted() {
    let now = getTodaysDate()
    let squares = this.state.squares
    let index = 0
    let notFound = true
    while (notFound) {
      if (squares[index].date === now) {
        notFound = false
      } else {
        index++
      }
    }
    this.refs.todaySquare.markCompleted()
  }
}

class StreakViewRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: this.props.squares
    }
  }
  render () {
    let index = -1
    return (
      <div className="square-row">
        {this.state.squares.map(function (square, index) {
          index++
          let ref
          if (isToday(square.date)) {
            ref = "todaySquare"
          } else {
            ref = square.date
          }
          return (
            <StreakSquare
                key={square.date}
                ref={ref}
                date={square.date}
                index={index}
                completed={square.completed}/>
            );
        })}
      </div>)
  }
}

class StreakSquare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: this.props.date,
      completed: this.props.completed
    }
  }
  render() {
    let dayDate = this.state.date.substring(this.state.date.length-2)
    return (
      <span className={this.getClass()}>{dayDate}</span>);
  }
  markCompleted() {
    this.setState({
      completed: true
    });
  }
  getClass() {
    if (this.state.completed) {
      return "square completed"
    }
    if (this.props.index == moment().date())
      return "square today"
    return "square"
  }
}

export default Habit;
