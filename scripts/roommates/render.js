const data = require('./data')
const templates = require('./templates')

function showAll (container) {
  const cards = data.map((roommate, index) => templates.card(roommate, index)).join('') // index standard in map
  container.innerHTML = cards
}

function showNewForm (container) {
  container.innerHTML = templates.newRoommate()
}

function showUpdateForm (container) {
  container.innerHTML = templates.updateRoommate()
}

function hideForm (container) {
  container.innerHTML = ''
}

module.exports = {
  showAll, showNewForm, showUpdateForm, hideForm
}
