import React, { Component } from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import '../less/streak.less';
import moment from 'moment';

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
        <Button type="submit" onClick={this.determineStreak()}>Submit</Button>
      </Form>
      <StreakView name="Programming" goalStreak="31"/>
      </div>
    );
  }
}

class StreakView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habitName: this.props.name,
      squares: Array(Number.parseInt(this.props.goalStreak)).fill(false),
      goalStreak: this.props.goalStreak
    };
    this.determineStreakView();
  }
  // calculate number of squares to place before
  determineStreakView() {
    let now = moment();
    console.log(now.weekday());
    if (now.weekday() !== 0) {
      console.log("Not sunday");
    }
  }
  render() {
    let index = -1
    return (
      <div className="streak-view">
        <h3>{this.state.habitName}</h3>
        {this.state.squares.map(function (completed, index) {
          // TODO this section is temporarily drawing out squares as such
          index++
          return <StreakSquare key={index} index={index} completed={completed}/>;
        })}
      </div>
    );
  }
}

class StreakSquare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: this.props.completed
    };
  }
  markCompleted() {
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
  // <button onClick={() => this.markCompleted()}></button>   
}

export default Habit;
