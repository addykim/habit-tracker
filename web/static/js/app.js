import React, {Component} from 'react';
import {Grid, Row} from 'react-bootstrap';
import Habit from './habit';
import Login from './login';

const gridInstance = (
  <Grid>
    <Row>
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

export default App;
