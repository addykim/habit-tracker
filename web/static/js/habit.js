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
  render() {
    let squares = [], num = 0;
    while (num++ <= 10) squares.push(num);
    return (
      <table>
        {squares.map(function (i) {
          return <StreakSquare/>;
        })}
      </table>
    );
  }
}

class StreakSquare extends Component {
  render() {
    let completed = true;
    if (completed) {
      return (<span className="square">X</span>);
    }
    return (<span> </span>);
  }
}

export default Habit;
