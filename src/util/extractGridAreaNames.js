const { uniq, flatMap } = require('./lodash-fns')

module.exports = function (gridTemplateAreas) {
  return uniq(
    flatMap(gridTemplateAreas, (row) => {
      return flatMap(row, (area) => {
        // extract grid area names from the gridTemplate
        return flatMap(area.match(/[^\s]+/g), (match) => {
          if (match !== '.') {
            return match
          }
          return []
        })
      })
    })
  )
}
