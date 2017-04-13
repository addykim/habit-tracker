import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row} from 'react-bootstrap';
import Habit from './habit';
import Login from './login';


const gridInstance = (
  <Grid>
    <Row>
      <ul
          className="nav-bar">
        <li>Home</li>
        <li>About</li>
      </ul>
    </Row>
    <Row>
      <Habit/>
    </Row>
  </Grid>
);

class App extends Component {
  render() {
    return gridInstance;
  }
}

ReactDOM.render(<App/>, document.getElementById('content'));
