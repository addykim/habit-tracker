import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

class Habit extends Component {
  render() {
    return (
      <div>
        <b>Create a habit</b>
        <form action="/habit" method="post">
          <p>I want to do <input name="name" type="text" /> for <input name="goal_streak" type="number"/> of days.</p>
          <input value="Create" type="submit" />
        </form>

        <form action="/habit/3" method="post"> 
          <input value="I did it" type="submit" />
        </form>
        <Button bsSize="large" bsStyle="primary">I did it!</Button>
      </div>
    );
  }
}

export default Habit;
