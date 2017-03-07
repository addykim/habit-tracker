import React, { Component } from 'react';
import Habit from './habit';
import Login from './login';

class App extends Component {
  render() {
    return (
      <div>
        <Login/>
        <Habit/>
      </div>
    );
  }
}

export default App;
