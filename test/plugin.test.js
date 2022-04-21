import _ from 'lodash'
import escapeClassName from 'tailwindcss/lib/util/escapeClassName'
import plugin from '../src/plugin'

test('returns all utilities for grid areas', () => {
  const addedUtilities = []

  const config = {
    theme: {
      gridTemplateAreas: {
        layout: ['first .', 'second second'],
      },
    },
    variants: {
      gridTemplateAreas: ['responsive'],
    },
  }

  const getConfigValue = (path, defaultValue) => _.get(config, path, defaultValue)
  const pluginApi = {
    config: getConfigValue,
    e: escapeClassName,
    theme: (path, defaultValue) => getConfigValue(`theme.${path}`, defaultValue),
    variants: (path, defaultValue) => {
      if (_.isArray(config.variants)) {
        return config.variants
      }

      return getConfigValue(`variants.${path}`, defaultValue)
    },
    addUtilities(utilities, variants) {
      addedUtilities.push({
        utilities,
        variants,
      })
    },
    matchUtilities() {},
  }

  plugin(pluginApi)

  expect(addedUtilities).toEqual([
    {
      utilities: [
        {
          '.grid-areas-layout': {
            'grid-template-areas': '"first ."\n"second second"',
          },
        },
      ],
      variants: ['responsive'],
    },
    {
      utilities: [
        {
          '.grid-in-first': {
            'grid-area': 'first',
          },
          '.grid-in-second': {
            'grid-area': 'second',
          },
        },
      ],
      variants: [],
    },
    {
      utilities: [
        {
          '.row-start-first': {
            'grid-row-start': 'first-start',
          },
          '.row-end-first': {
            'grid-row-end': 'first-end',
          },
          '.col-start-first': {
            'grid-column-start': 'first-start',
          },
          '.col-end-first': {
            'grid-column-end': 'first-end',
          },
          '.row-start-second': {
            'grid-row-start': 'second-start',
          },
          '.row-end-second': {
            'grid-row-end': 'second-end',
          },
          '.col-start-second': {
            'grid-column-start': 'second-start',
          },
          '.col-end-second': {
            'grid-column-end': 'second-end',
          },
        },
      ],
      variants: [],
    },
  ])
})

test('works for multiple grid templates', () => {
  const addedUtilities = []

  const config = {
    theme: {
      gridTemplateAreas: {
        default: ['first .', 'second second'],
        slim: ['first', 'second'],
      },
    },
    variants: {
      gridTemplateAreas: ['responsive'],
    },
  }

  const getConfigValue = (path, defaultValue) => _.get(config, path, defaultValue)
  const pluginApi = {
    config: getConfigValue,
    e: escapeClassName,
    theme: (path, defaultValue) => getConfigValue(`theme.${path}`, defaultValue),
    variants: (path, defaultValue) => {
      if (_.isArray(config.variants)) {
        return config.variants
      }

      return getConfigValue(`variants.${path}`, defaultValue)
    },
    addUtilities(utilities, variants) {
      addedUtilities.push({
        utilities,
        variants,
      })
    },
    matchUtilities() {},
  }

  plugin(pluginApi)

  expect(addedUtilities).toEqual([
    {
      utilities: [
        {
          '.grid-areas-default': {
            'grid-template-areas': '"first ."\n"second second"',
          },
          '.grid-areas-slim': {
            'grid-template-areas': '"first"\n"second"',
          },
        },
      ],
      variants: ['responsive'],
    },
    {
      utilities: [
        {
          '.grid-in-first': {
            'grid-area': 'first',
          },
          '.grid-in-second': {
            'grid-area': 'second',
          },
        },
      ],
      variants: [],
    },
    {
      utilities: [
        {
          '.row-start-first': {
            'grid-row-start': 'first-start',
          },
          '.row-end-first': {
            'grid-row-end': 'first-end',
          },
          '.col-start-first': {
            'grid-column-start': 'first-start',
          },
          '.col-end-first': {
            'grid-column-end': 'first-end',
          },
          '.row-start-second': {
            'grid-row-start': 'second-start',
          },
          '.row-end-second': {
            'grid-row-end': 'second-end',
          },
          '.col-start-second': {
            'grid-column-start': 'second-start',
          },
          '.col-end-second': {
            'grid-column-end': 'second-end',
          },
        },
      ],
      variants: [],
    },
  ])
})

test('works for more than two rows', () => {
  const addedUtilities = []

  const config = {
    theme: {
      gridTemplateAreas: {
        layout: ['first .', 'second second', 'third third'],
      },
    },
    variants: {
      gridTemplateAreas: ['responsive'],
    },
  }

  const getConfigValue = (path, defaultValue) => _.get(config, path, defaultValue)
  const pluginApi = {
    config: getConfigValue,
    e: escapeClassName,
    theme: (path, defaultValue) => getConfigValue(`theme.${path}`, defaultValue),
    variants: (path, defaultValue) => {
      if (_.isArray(config.variants)) {
        return config.variants
      }

      return getConfigValue(`variants.${path}`, defaultValue)
    },
    addUtilities(utilities, variants) {
      addedUtilities.push({
        utilities,
        variants,
      })
    },
    matchUtilities() {},
  }

  plugin(pluginApi)

  expect(addedUtilities).toEqual([
    {
      utilities: [
        {
          '.grid-areas-layout': {
            'grid-template-areas': '"first ."\n"second second"\n"third third"',
          },
        },
      ],
      variants: ['responsive'],
    },
    {
      utilities: [
        {
          '.grid-in-first': {
            'grid-area': 'first',
          },
          '.grid-in-second': {
            'grid-area': 'second',
          },
          '.grid-in-third': {
            'grid-area': 'third',
          },
        },
      ],
      variants: [],
    },
    {
      utilities: [
        {
          '.row-start-first': {
            'grid-row-start': 'first-start',
          },
          '.row-end-first': {
            'grid-row-end': 'first-end',
          },
          '.col-start-first': {
            'grid-column-start': 'first-start',
          },
          '.col-end-first': {
            'grid-column-end': 'first-end',
          },
          '.row-start-second': {
            'grid-row-start': 'second-start',
          },
          '.row-end-second': {
            'grid-row-end': 'second-end',
          },
          '.col-start-second': {
            'grid-column-start': 'second-start',
          },
          '.col-end-second': {
            'grid-column-end': 'second-end',
          },
          '.row-start-third': {
            'grid-row-start': 'third-start',
          },
          '.row-end-third': {
            'grid-row-end': 'third-end',
          },
          '.col-start-third': {
            'grid-column-start': 'third-start',
          },
          '.col-end-third': {
            'grid-column-end': 'third-end',
          },
        },
      ],
      variants: [],
    },
  ])
})
