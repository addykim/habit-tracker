import ActionTypes from '../constants/actionTypes'

const url = 'http://localhost:8080/api/'

function getHabitRequestedAction() {
  return { type: ActionTypes.getHabitRequested }
}

function getHabitRejectedAction() {
  return { type: ActionTypes.GetHabitRejected }
}

function getHabitFulfilledAction(habit) {
  return { type: ActionTypes.GetHabitFulfilled, habit }
}

export function getAllUserHabits(userId) {
  // return dispatch => {
    // dispatch(getHabitRequestedAction())
  return fetch(url + 'user/' + userId + '/habits')
    .then((response) => {
      // dispatch(getHabitFulfilledAction())
      return response.json()
    })
    .catch((error) => {
      console.error(error)
      // dispatch(getHabitRejectedAction)
    })
  // }
}

export function addHabit(habit) {
  console.log(habit)
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(habit)
  })
}