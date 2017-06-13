const ActionTypes = {
  LoginRequested: 'LOGIN_REQUESTED',
  LoginSuccessful: 'LOGIN_SUCCESSFUL',
  LoginRejected: 'LOGIN_REJECTED',
  
  LogoutRequested: 'LOGOUT_REQUESTED',
  LogoutRejected: 'LOGOUT_REJECTED',
  LogoutSuccessful: 'LOGOUT_SUCCESSFUL',

  GetHabitRequested: 'GET_HABIT_REQUESTED',
  GetHabitRejected: 'GET_HABIT_REJECTED',
  GetHabitFulfilled: 'GET_HABIT_FULFILLED',

  CreateHabitRequested: 'CREATE_HABIT_REQUESTED',
  CreateHabitRejected: 'CREATE_HABIT_REJECTED',
  CreateHabitFulfilled: 'CREATE_HABIT_FULFILLED'
}

export default ActionTypes
