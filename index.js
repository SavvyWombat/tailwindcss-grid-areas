const _ = require('lodash')
const extractGridAreaNames = require('./src/util/extractGridAreaNames')

module.exports = function ({ addUtilities, target, theme, variants }) {
  if (
    target('gridRowStart') === 'ie11' ||
    target('gridRowEnd') === 'ie11' ||
    target('gridColumnStart') === 'ie11' ||
    target('gridColumnEnd') === 'ie11'
  ) {
    return
  }

  const gridAreaNames = extractGridAreaNames(theme('gridTemplateAreas'))

  const templateAreas = _.reduce(theme('gridTemplateAreas'), (templates, area, name) => {
    return {
      ...templates,
      [`.grid-areas-${name}`]: {
        'grid-template-areas': area.map((row) => { return `"${row}"`}).join('\n'),
      }
    }
  }, {})

  addUtilities([ templateAreas ], variants('gridTemplateAreas'))

  const areas = gridAreaNames.reduce((areas, name) => {
      return {
        ...areas,
        [`.grid-in-${name}`]: {
          'grid-area': name,
        }
      }
  }, {})

  addUtilities([ areas ], [])

  const namedLines = gridAreaNames.reduce((namedLines, name) => {
    return {
      ...namedLines,
      [`.row-start-${name}`]: {
        'grid-row-start': `${name}-start`
      },
      [`.row-end-${name}`]: {
        'grid-row-end': `${name}-end`
      },
      [`.col-start-${name}`]: {
        'grid-column-start': `${name}-start`
      },
      [`.col-end-${name}`]: {
        'grid-column-end': `${name}-end`
      },
    }
  }, {})

  addUtilities([ namedLines ], [])
}
