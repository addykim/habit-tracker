export function getAllUserHabits(userId) {
  return fetch('http://localhost:8080/api/user/' + userId + '/habits')
}
