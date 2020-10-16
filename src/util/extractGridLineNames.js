const _ = require('lodash')

module.exports = function (gridTemplateAreas) {
  return _.uniq(
    _.flatMap(gridTemplateAreas, (row) => {
      return _.flatMap(row, (area) => {
        // extract grid area names from the gridTemplate
        return _.flatMap(area.match(/[^\s]+/g), (match) => {
          if (match !== '.') {
            return [`${match}-start`, `${match}-end`];
          }
          return [];
        })
      })
    })
  )
}
