import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
// import {Grid, Row} from 'react-bootstrap'
import Habit from './habits/habit'
import Login from './user/login'
//import Register from './user/register'

import '../less/streak.less'

// const Home = () => (
  // <Grid>
    // <Row>
      // <Habit/>
    // </Row>
  // </Grid>
// )

const App = () => (
  <Router>
    <div>
      <ul
          className="nav-bar">
      </ul>
      <Login/>
      <Route exact path="/" component={Habit}/>
    </div>
  </Router>
)  

//<Route exact path="/register" component={Register}/>


ReactDOM.render(<App/>, document.getElementById('content'));
