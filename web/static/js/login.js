import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
        <form action="/login" method="post">
          <label>Username: </label><input name="username" type="text" />
          <label>Password: </label><input name="password" type="password" />
          <input value="Login" type="submit" />
        </form>
        <b>Register Account</b>
        <form action="/user/register" method="post">
          <label>Name: </label><input name="name" type="text" />
          <label>Email: </label><input name="email" type="text" />
          <label>Password: </label><input name="password" type="password" />
          <input value="Register" type="submit" />
        </form>
      </div>
      );
  }
}

export default Login;
