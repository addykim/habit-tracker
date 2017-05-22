const url = 'http://localhost:8080/api/'
export function getAllUserHabits(userId) {
  return fetch(url + 'user/' + userId + '/habits')
    .then((response) => response.json())  
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