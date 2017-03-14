import React, { Component } from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import '../less/streak.less';
import moment from 'moment';
import dummysquares from '../data/squares';

const DATE_FORMAT = "YYYY-MM-D"

function isToday(date) {
  return date === getTodaysDate();
}

function getTodaysDate() {
  return moment().format(DATE_FORMAT);
}

class Habit extends Component {
  constructor(props) {
    super();
    this.state = {
      habits: dummysquares
    };
    this.addNewHabit = this.addNewHabit.bind(this);
  }
  addNewHabit(newHabit) {
    let habits = this.state.habits;
    habits.push(newHabit);
    this.setState({
      habits: habits
    })
  }
  render() {
    return (
      <div
          className="center-block">
        <HabitForm
            addOnSubmit={this.addNewHabit}/>
        {this.state.habits.map(function(habit) {
          return (
            <StreakView
                key={habit.id}
                name={habit.name}
                streak={habit.streak}
                startDate={habit.startDate}
                goalStreak={habit.goalStreak}/>
          );
        })}
      </div>
    );
  }
}

const HABIT_FORM_DEFAULTS = {
  habitName: '',
  goalStreak: '',
  validInput: false
}

class HabitForm extends Component {
  constructor(props) {
    super(props);
    this.props.addOnSubmit;
    this.state = HABIT_FORM_DEFAULTS;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    })
    //input validation
    if (name === "goalStreak") {
      if (!Number.isNaN(value) && value > 1) {
        this.setState({
          validInput: true
        })
      } else {
        this.setState({
          validInput: false
        })
      }
    }
  }
  handleSubmit(event) {
    let habitName = this.state.habitName;
    let goalStreak = this.state.goalStreak;
    let todaysDate = getTodaysDate();
    event.preventDefault();
    // TODO change id
    let newHabit = {
      id: 3,
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
      newHabit.streak.push(square);
    }
    this.props.addOnSubmit(newHabit);
    // TODO send to API

    // clear form
    this.setState(HABIT_FORM_DEFAULTS);
  }
  render() {
    return (
      // action="scripturl" method="get|post"
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
}

class StreakView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habitName: this.props.name,
      squares: this.props.streak,
      startDate: this.props.startDate,
      goalStreak: this.props.goalStreak
    };
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
    let now = getTodaysDate();
    let squares = this.state.squares;
    let index = 0;
    let notFound = true;
    while (notFound) {
      if (squares[index].date === now) {
        notFound = false;
      } else {
        index++;
      }
    }
    this.refs.todaySquare.markCompleted();
  }
  render() {
    let index = -1
    return (
      <div className="habit-progress center-text">
        <h3
            className="habit-header">
            {this.state.habitName}</h3>
        <div className="habit-streak-view">
          {this.state.squares.map(function (square, index) {
            index++;
            let ref;
            if (isToday(square.date)) {
              ref = "todaySquare";
            } else {
              ref = square.date;
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
}

class StreakSquare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      completed: this.props.completed
    };
  }
  markCompleted() {
    this.setState({
      completed: true
    });
  }
  getClass() {
    if (this.state.completed) {
      return "square completed";
    }
    if (this.props.index == moment().date())
      return "square today"
    return "square";
  }
  render() {
    return (
      <span className={this.getClass()}>{this.props.index}</span>);
  }   
}

export default Habit;
