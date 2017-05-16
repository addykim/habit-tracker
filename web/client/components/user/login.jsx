import React, { Component } from 'react'
import {Button,ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  // TODO validate
  render() {
    if (this.state.visible) {
      return (
        <Form inline>
          <FormGroup controlId="formInlineName">
            <ControlLabel>Username</ControlLabel>
            {' '}
            <FormControl type="username" />
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlinePassword">
            <ControlLabel>Password</ControlLabel>
            {' '}
            <FormControl type="password" />
          </FormGroup>
          {' '}
          <Button type="submit">Login</Button>
        </Form>
        )
    }
    return <span><a href="">Logged in as {this.state.username}</a></span>
  }
}
