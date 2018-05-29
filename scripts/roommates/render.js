const data = require('./data')
const templates = require('./templates')

function showAll (container) {
  const cards = data.map(roommate => templates.card(roommate)).join('')
  container.innerHTML = cards
}

function showNewForm (container) {
  container.innerHTML = templates.newRoommate()
}

module.exports = {
  showAll, showNewForm
}
