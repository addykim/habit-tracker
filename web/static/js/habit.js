import React, { Component } from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import '../less/streak.less';
import moment from 'moment';

class Habit extends Component {
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
        <Button type="submit">Submit</Button>
      </Form>
      <StreakView/>
      </div>
    );
  }
}

class StreakView extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  render() {
    let squares = [true, false, true, false, true, false, true, true, true, false, false, false, false];
    return (
      <div className="streak-view">
        {squares.map(function (completed, index) {
          return <StreakSquare key={index} completed={completed}/>;
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
    if (this.state.completed) {
      return "square completed";
    }
    return "square";
  }
  render() {
    return (
      <div>
        <span className={this.getClass()}>{this.props.index}</span>
        <button onClick={() => this.markCompleted()}></button>
      </div>);
  }
}

export default Habit;
