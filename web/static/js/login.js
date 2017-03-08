import React, { Component } from 'react';
import {Button,ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';

class Login extends Component {
  render() {
    return (
      <Form inline>
        <FormGroup controlId="formInlineName">
          <ControlLabel>Name</ControlLabel>
          {' '}
          <FormControl type="text" placeholder="Jane Doe" />
        </FormGroup>
        {' '}
        <FormGroup controlId="formInlineEmail">
          <ControlLabel>Email</ControlLabel>
          {' '}
          <FormControl type="email" placeholder="jane.doe@example.com" />
        </FormGroup>
        {' '}
        <Button type="submit">Login</Button>
      </Form>
      );
  }
}

class Register extends Component {
  render() {
    return (
      <Form inline>
        <FormGroup controlId="formInlineName">
          <ControlLabel>Name</ControlLabel>
          {' '}
          <FormControl type="text" placeholder="Jane Doe" />
        </FormGroup>
        {' '}
        <FormGroup controlId="formInlineEmail">
          <ControlLabel>Email</ControlLabel>
          {' '}
          <FormControl type="email" placeholder="jane.doe@example.com" />
        </FormGroup>
        {' '}
        <Button type="submit">Register</Button>
      </Form>
    );
  }
}

export default Login;
