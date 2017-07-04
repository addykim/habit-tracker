import ActionTypes from '../constants/actionTypes'
import firebase from '../constants/firebase'

const provider = new firebase.auth.GoogleAuthProvider()

export function loginGoogleAuth() {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log(result)
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken
    // The signed-in user info.
    console.log(result.user)
    return result.user
    // ...
  }).catch(function(error) {
    console.error(error)
    // Handle Errors here.
    var errorCode = error.code
    var errorMessage = error.message
    // The email of the user's account used.
    var email = error.email
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential
    // ...
  })
}

export function logoutGoogleAuth() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  })
}

export function getCurrentUser() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      return user
    } else {
      // No user is signed in.
      return null
    }
  })
}

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