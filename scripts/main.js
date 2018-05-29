const roommates = require('./roommates/render')
const data = require('./roommates/data')

////////////////////////////////////////////////////////////////////////////////
//////////// CRUD BEHAVIOR - CREATE, READ, UPDATE, DELETE //////////////////////
////////////////////////////////////////////////////////////////////////////////

// READ Roommates (Show all)
////////////////////////////////////////////////////////////////////////////////
const roommatesContainer = document.querySelector('#roommates')
roommates.showAll(roommatesContainer)

// CREATE Roommate
////////////////////////////////////////////////////////////////////////////////
const newRoommateButton = document.querySelector('#new-roommate-button')
newRoommateButton.addEventListener('click', (event) => {
  event.preventDefault() // event is the MouseEvent clicking on the new roommate button

  const sidebar = document.querySelector('#sidebar')
  roommates.showNewForm(sidebar)

  // Select <form> that appears once you click the New Roommate button & add "submit" event listener
  const form = document.querySelector('#new-roommate-form form')
  form.addEventListener('submit', (event) => {
    event.preventDefault() // prevent default behavior when form submitted (don't actually submit it)

    // const username = document.querySelector('#username').value
    // OR...
    // const username = event.target.username.value // need to add name="username" param to HTML <input>

    // assign the values of every <form> input to variables
    const { username, avatar, faction, street, suite, city, inputZip } = event.target

    data.push({ // push new roommate values from the <form> into data.js
      username: username.value,
      avatar: avatar.value,
      faction: faction.value,
      address: {
        street: street.value,
        suite: suite.value,
        city: city.value,
        zipcode: inputZip.value
      }
    }) // this changes the value of data in memory - not in data.js - refreshing wipes all changes

    roommates.hideForm(sidebar)
    roommates.showAll(roommatesContainer) // after pushing new info to data.js, re-display all roommates
  })
})

// DELETE Roommate
////////////////////////////////////////////////////////////////////////////////
function deleteRoommate (event) {
  const index = event.target.getAttribute('data-id')
  data.splice(index, 1)
  roommates.showAll(roommatesContainer)

  // have to call the below code again to re-add an event listener for every delete button
  const deleteBtns = Array.from(document.querySelectorAll('.roommate-remove'))
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', deleteRoommate)
  })
}

// Below: initially creates event listener for every delete button
const deleteBtns = Array.from(document.querySelectorAll('.roommate-remove'))
deleteBtns.forEach(btn => {
  btn.addEventListener('click', deleteRoommate) // delete roommate
})


// UPDATE Roommate
////////////////////////////////////////////////////////////////////////////////
function updateRoommate (event) {
  const index = event.target.getAttribute('data-id')

  const sidebar = document.querySelector('#sidebar')
  roommates.showUpdateForm(sidebar)

  document.querySelector('#username').value = data[index].username
  document.querySelector('#avatar').value = data[index].avatar
  document.querySelector('#faction').value = data[index].faction
  document.querySelector('#street').value = data[index].address.street
  document.querySelector('#suite').value = data[index].address.suite
  document.querySelector('#city').value = data[index].address.city
  document.querySelector('#inputZip').value = data[index].address.zipcode

  const form = document.querySelector('#new-roommate-form form')
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const { username, avatar, faction, street, suite, city, inputZip } = event.target

    data[index] = {
      username: username.value,
      avatar: avatar.value,
      faction: faction.value,
      address: {
        street: street.value,
        suite: suite.value,
        city: city.value,
        zipcode: inputZip.value
      }
    }

    roommates.hideForm(sidebar) // hide sidebar when submit edits
    roommates.showAll(roommatesContainer) // show all Roommates

    const updateBtns = Array.from(document.querySelectorAll('.roommate-edit'))
    updateBtns.forEach(btn => {
      btn.addEventListener('click', updateRoommate)
    })
  })
}

const updateBtns = Array.from(document.querySelectorAll('.roommate-edit'))
updateBtns.forEach(btn => {
  btn.addEventListener('click', updateRoommate)
})
