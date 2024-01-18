import escapeClassName from 'tailwindcss/lib/util/escapeClassName'
import plugin from '../src/plugin'
import { expect, test } from '@jest/globals'

function get(object, path, defaultValue) {
  let localePath = path
  if (typeof path === 'string') {
    localePath = path.split('.').map((key) => {
      const numKey = Number(key)
      return Number.isNaN(numKey) ? key : numKey
    })
  }

  let result = object

  for (const key of localePath) {
    if (!result) {
      return defaultValue
    }

    result = result[key]
  }

  return result ?? defaultValue
}

test('returns default utilities', () => {
  const addedUtilities = []

  const config = {}

  const getConfigValue = (path, defaultValue) => get(config, path, defaultValue)
  const pluginApi = {
    config: getConfigValue,
    e: escapeClassName,
    theme: (path, defaultValue) => getConfigValue(`theme.${path}`, defaultValue),
    variants: (path, defaultValue) => {
      if (Array.isArray(config.variants)) {
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

  expect(addedUtilities).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        utilities: expect.arrayContaining([
          expect.objectContaining({
            '.grid-areas-none': {
              'grid-template-areas': 'none',
            },
            '.grid-areas-inherit': {
              'grid-template-areas': 'inherit',
            },
            '.grid-areas-initial': {
              'grid-template-areas': 'initial',
            },
            '.grid-areas-revert': {
              'grid-template-areas': 'revert',
            },
            '.grid-areas-revert-layer': {
              'grid-template-areas': 'revert-layer',
            },
            '.grid-areas-unset': {
              'grid-template-areas': 'unset',
            },
          }),
        ]),
      }),

      expect.objectContaining({
        utilities: expect.arrayContaining([
          expect.objectContaining({
            '.grid-in-auto': {
              'grid-area': 'auto',
            },
            '.grid-in-inherit': {
              'grid-area': 'inherit',
            },
            '.grid-in-initial': {
              'grid-area': 'initial',
            },
            '.grid-in-revert': {
              'grid-area': 'revert',
            },
            '.grid-in-revert-layer': {
              'grid-area': 'revert-layer',
            },
            '.grid-in-unset': {
              'grid-area': 'unset',
            },
          }),
        ]),
      }),
    ])
  )
})

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

  const getConfigValue = (path, defaultValue) => get(config, path, defaultValue)
  const pluginApi = {
    config: getConfigValue,
    e: escapeClassName,
    theme: (path, defaultValue) => getConfigValue(`theme.${path}`, defaultValue),
    variants: (path, defaultValue) => {
      if (Array.isArray(config.variants)) {
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

  expect(addedUtilities).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        utilities: expect.arrayContaining([
          expect.objectContaining({
            '.grid-areas-layout': {
              'grid-template-areas': '"first ."\n"second second"',
            },
          }),
        ]),
        variants: ['responsive'],
      }),

      expect.objectContaining({
        utilities: expect.arrayContaining([
          expect.objectContaining({
            '.grid-in-first': {
              'grid-area': 'first',
            },
            '.grid-in-second': {
              'grid-area': 'second',
            },
          }),
        ]),
        variants: [],
      }),

      expect.objectContaining({
        utilities: expect.arrayContaining([
          expect.objectContaining({
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
          }),
        ]),
        variants: [],
      }),
    ])
  )
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

  const getConfigValue = (path, defaultValue) => get(config, path, defaultValue)
  const pluginApi = {
    config: getConfigValue,
    e: escapeClassName,
    theme: (path, defaultValue) => getConfigValue(`theme.${path}`, defaultValue),
    variants: (path, defaultValue) => {
      if (Array.isArray(config.variants)) {
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

  expect(addedUtilities).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        utilities: expect.arrayContaining([
          expect.objectContaining({
            '.grid-areas-default': {
              'grid-template-areas': '"first ."\n"second second"',
            },
            '.grid-areas-slim': {
              'grid-template-areas': '"first"\n"second"',
            },
          }),
        ]),
        variants: ['responsive'],
      }),

      expect.objectContaining({
        utilities: expect.arrayContaining([
          expect.objectContaining({
            '.grid-in-first': {
              'grid-area': 'first',
            },
            '.grid-in-second': {
              'grid-area': 'second',
            },
          }),
        ]),
        variants: [],
      }),

      expect.objectContaining({
        utilities: expect.arrayContaining([
          expect.objectContaining({
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
          }),
        ]),
        variants: [],
      }),
    ])
  )
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

  const getConfigValue = (path, defaultValue) => get(config, path, defaultValue)
  const pluginApi = {
    config: getConfigValue,
    e: escapeClassName,
    theme: (path, defaultValue) => getConfigValue(`theme.${path}`, defaultValue),
    variants: (path, defaultValue) => {
      if (Array.isArray(config.variants)) {
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

  expect(addedUtilities).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        utilities: expect.arrayContaining([
          expect.objectContaining({
            '.grid-areas-layout': {
              'grid-template-areas': '"first ."\n"second second"\n"third third"',
            },
          }),
        ]),
        variants: ['responsive'],
      }),

      expect.objectContaining({
        utilities: expect.arrayContaining([
          expect.objectContaining({
            '.grid-in-first': {
              'grid-area': 'first',
            },
            '.grid-in-second': {
              'grid-area': 'second',
            },
            '.grid-in-third': {
              'grid-area': 'third',
            },
          }),
        ]),
        variants: [],
      }),

      expect.objectContaining({
        utilities: expect.arrayContaining([
          expect.objectContaining({
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
          }),
        ]),
        variants: [],
      }),
    ])
  )
})
