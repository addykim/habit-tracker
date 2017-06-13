import ActionTypes from '../constants/actionTypes'

function loginRequestedAction() {
  return { type: ActionTypes.loginRequested }
}

function loginRejectedAction() {
  return { type: ActionTypes.loginRejected }
}

function loginSuccessfulAction(user) {
  return { type: ActionTypes.loginSuccessful, user }
}

function logoutRequestedAction() {
  return { type: ActionTypes.logoutRequested }
}

function logoutRejectedAction() {
  return { type: ActionTypes.logoutRejected }
}

function logoutSuccessfulAction() {
  return { type: ActionTypes.logoutSuccessful }
}