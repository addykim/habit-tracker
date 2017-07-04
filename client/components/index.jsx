import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Habit from './habits/habit'
import LoginGoogle from './user/loginGoogle'

import '../less/streak.less'

const App = () => (
  <Router>
    <div>
      <ul
          className="nav-bar">
      </ul>
      <LoginGoogle/>
      <Route exact path="/" component={Habit}/>
    </div>
  </Router>
)

ReactDOM.render(<App/>, document.getElementById('content'))
