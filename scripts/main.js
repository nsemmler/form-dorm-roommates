const roommates = require('./roommates/render')

const roommatesContainer = document.querySelector('#roommates')
roommates.showAll(roommatesContainer)

const newRoommateButton = document.querySelector('#new-roommate-button')
newRoommateButton.addEventListener('click', () => {
  const sidebar = document.querySelector('#sidebar')
  roommates.showNewForm(sidebar)
})
