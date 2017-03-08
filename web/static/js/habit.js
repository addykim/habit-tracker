import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

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

export default Habit;
