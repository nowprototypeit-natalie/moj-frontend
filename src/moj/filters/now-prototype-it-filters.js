const { addFilter } = require('nowprototypeit').views
const getAllFilters = require('./all')

const allFilters = getAllFilters()

Object.keys(allFilters).forEach(name => {
  addFilter(name, allFilters[name])
})
