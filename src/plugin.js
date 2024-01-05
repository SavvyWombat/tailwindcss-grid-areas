const { reduce } = require('./util/lodash-fns')
const extractGridAreaNames = require('./util/extractGridAreaNames')

module.exports = function ({ addUtilities, matchUtilities, theme, variants }) {
  const gridAreaNames = extractGridAreaNames(theme('gridTemplateAreas'))

  const templateAreas = reduce(
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

  const specialTemplateAreas = {
    '.grid-areas-none': { 'grid-template-areas': 'none' },
    '.grid-areas-inherit': { 'grid-template-areas': 'inherit' },
    '.grid-areas-initial': { 'grid-template-areas': 'initial' },
    '.grid-areas-revert': { 'grid-template-areas': 'revert' },
    '.grid-areas-revert-layer': { 'grid-template-areas': 'revert-layer' },
    '.grid-areas-unset': { 'grid-template-areas': 'unset' },
  }

  addUtilities([templateAreas, specialTemplateAreas], variants('gridTemplateAreas'))

  const namedAreas = gridAreaNames.reduce((areas, name) => {
    return {
      ...areas,
      [`.grid-in-${name}`]: {
        'grid-area': name,
      },
    }
  }, {})

  const specialNamedAreas = {
    '.grid-in-auto': { 'grid-area': 'auto' },
    '.grid-in-inherit': { 'grid-area': 'inherit' },
    '.grid-in-initial': { 'grid-area': 'initial' },
    '.grid-in-revert': { 'grid-area': 'revert' },
    '.grid-in-revert-layer': { 'grid-area': 'revert-layer' },
    '.grid-in-unset': { 'grid-area': 'unset' },
  }

  addUtilities([namedAreas, specialNamedAreas], [])

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
      value = value
        .split(/ *, */)
        .map((row) => (row.match(/var\(.*\)/g) ? row : `"${row}"`))
        .join(' ')
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
