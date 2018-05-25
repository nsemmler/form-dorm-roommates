const faker = require('faker')
module.exports = Array.from({ length: 10 }, () => {
  return faker.helpers.contextualCard()
})
