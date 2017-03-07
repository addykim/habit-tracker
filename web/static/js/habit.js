import React, { Component } from 'react';

class Habit extends Component {
  render() {
    return (
      <div>
        <b>Create a habit</b>
        <form action="/habit" method="post">
          I want to do <input name="name" type="text" /> for <input name="goal_streak" type="number"/> of days.
          <input value="Create" type="submit" />
        </form>
      </div>
      <form action="/habit/3" method="post"> 
        <input value="I did it" type="submit" />
      </form>
    );
  }
}

export default Habit;
