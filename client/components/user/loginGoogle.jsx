import {isNull, isUndefined} from 'lodash'
import React, { Component } from 'react'
import {getCurrentUser, loginGoogleAuth} from '../../actions/authentication'

export default class LoginGoogle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getCurrentUser()
    }
    this.attemptGoogleLogin = this.attemptGoogleLogin.bind(this)
  }
  attemptGoogleLogin() {
    // login requested
    console.log("attempting google login")

    // loginGoogleAuth().then(googleUser => {
    //   console.log('login success')
    //   this.setState({user: googleUser})
    // }).catch(error => {
    //   console.log('login fail')
    //   console.error(error)
    // })
    this.setState({user: loginGoogleAuth()})
  }
  render() {
    if (isNull(this.state.user) || isUndefined(this.state.user)) {
      return (
        <button
            onClick={this.attemptGoogleLogin}>
          Sign in with Google
        </button>
      )
    }
    console.log(this.state.user)
    return <span>Logged in as {this.state.user.displayName}</span>
  }
}
