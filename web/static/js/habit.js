import React, { Component } from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import '../less/streak.less';
import moment from 'moment';
import dummysquares from '../data/squares';

const DATE_FORMAT = "YYYY-MM-D"

class Habit extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  determineStreak(streak) {
    let now = moment();
    // .weekday();
    let endDate = moment().add(streak, 'd');
  }
  render() {
    let habit = dummysquares;
    return (
      <div>
      <Form inline>
        <FormGroup controlId="formInlineName">
          <ControlLabel>I want to do </ControlLabel>
          {' '}
          <FormControl type="text" placeholder="habit" />
        </FormGroup>
        {' '}
        <FormGroup controlId="formInlineEmail">
          <ControlLabel>for </ControlLabel>
          {' '}
          <FormControl type="number" placeholder="21" />
        </FormGroup>
        {' '}
        days
        <Button
            type="submit"
            onClick={this.determineStreak()}>Submit</Button>
      </Form>
      <StreakView
          name={habit.name}
          streak={habit.streak}
          startDate={habit.start_date}
          goalStreak={habit.goal_streak}/>
      </div>
    );
  }
}

class StreakView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habitName: this.props.name,
      // squares: Array(Number.parseInt(this.props.goalStreak)).fill(false),
      squares: this.props.streak,
      startDate: this.props.startDate,
      goalStreak: this.props.goalStreak
    };
    this.determineStreakView();
  }
  // calculate number of squares to place before
  // TODO hold off on this section until completing today is done
  determineStreakView() {
    let now = moment();
    console.log(now.weekday());
    if (now.weekday() !== 0) {
      console.log("Not sunday");
    }
  }
  markTodayCompleted() {
    // TODO get today's square
    let now = moment().format(DATE_FORMAT);
    // FIXME this is getting called at an imporper time
    // console.log("Marking tody as completed")
    this.state.squares.forEach(function(square) {
      if (square.date === now) {
        // TODO call mark created
      }
    })
  }
  render() {
    let index = -1
    return (
      <div className="streak-view">
        <h3>{this.state.habitName}</h3>
        {this.state.squares.map(function (square, index) {
          index++;
          return <StreakSquare key={square.date} date={square.date} index={index} completed={square.completed}/>;
        })}
        <Button onClick={this.markTodayCompleted()}>Completed</Button>
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
    console.log('Marking ' + date + ' as completed');
    this.setState({
      completed: true
    });
  }
  getClass() {
    // TODO this section is temporary in how it will handle the behavior
    if (this.props.index == moment().date())
      return "square today"
    if (this.state.completed) {
      return "square completed";
    }
    return "square";
  }
  render() {
    return (
      <span className={this.getClass()}>{this.props.index}</span>);
  }   
}

export default Habit;
