import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <form action="/login" method="post">
        Username: <input name="username" type="text" />
        Password: <input name="password" type="password" />
        <input value="Login" type="submit" />
      </form>
      Register Account
      <form action="/user/register" method="post">
        Name: <input name="name" type="text" />
        Email: <input name="email" type="text" />
        Password: <input name="password" type="password" />
        <input value="Register" type="submit" />
      </form>
      );
  }
}

export default Login;
