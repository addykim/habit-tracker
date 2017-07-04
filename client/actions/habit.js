import ActionTypes from '../constants/actionTypes'
import firebase from '../constants/firebase'

const url = 'http://localhost:5000/api/'

function getHabitRequestedAction() {
  return { type: ActionTypes.getHabitRequested }
}

function getHabitRejectedAction() {
  return { type: ActionTypes.GetHabitRejected }
}

function getHabitFulfilledAction(habit) {
  return { type: ActionTypes.GetHabitFulfilled, habit }
}

export function getAllUserHabits() {
  return []
}

export function addHabit(habit) {
  // TODO get uid
  console.log(firebase.auth().currentUser)
  let uid = 'abcdef'
  habit.uid = uid
  let newHabitKey = firebase.database().ref().child('habits').push().key

  let updates = {}
  updates['/habits/' + newHabitKey] = habit
  updates['/users/' + uid + '/habits/' + newHabitKey] = true
  
  firebase.database().ref().update(updates)
  habit.id = newHabitKey
  return habit
}