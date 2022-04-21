const _ = require('lodash')
const extractGridAreaNames = require('./util/extractGridAreaNames')

module.exports = function ({ addUtilities, matchUtilities, theme, variants }) {
  const gridAreaNames = extractGridAreaNames(theme('gridTemplateAreas'))

  const templateAreas = _.reduce(
    theme('gridTemplateAreas'),
    (templates, area, name) => {
      return {
        ...templates,
        [`.grid-areas-${name}`]: {
          'grid-template-areas': area
            .map((row) => {
              return `"${row}"`
            })
            .join('\n'),
        },
      }
    },
    {}
  )

  addUtilities([templateAreas], variants('gridTemplateAreas'))

  const namedAreas = gridAreaNames.reduce((areas, name) => {
    return {
      ...areas,
      [`.grid-in-${name}`]: {
        'grid-area': name,
      },
    }
  }, {})

  addUtilities([namedAreas], [])

  const namedLines = gridAreaNames.reduce((lines, name) => {
    return {
      ...lines,
      [`.row-start-${name}`]: {
        'grid-row-start': `${name}-start`,
      },
      [`.row-end-${name}`]: {
        'grid-row-end': `${name}-end`,
      },
      [`.col-start-${name}`]: {
        'grid-column-start': `${name}-start`,
      },
      [`.col-end-${name}`]: {
        'grid-column-end': `${name}-end`,
      },
    }
  }, {})

  addUtilities([namedLines], [])

  // allow arbitrary values
  matchUtilities({
    'grid-areas': (value) => {
      value = `"${value}"`
      value = value.replace(/ *, */g, '" "')
      return {
        'grid-template-areas': `${value}`,
      }
    },
    'grid-in': (value) => {
      return {
        'grid-area': `${value}`,
      }
    },
  })
}
