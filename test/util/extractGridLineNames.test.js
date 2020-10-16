import extractGridLineNames from '../../src/util/extractGridLineNames'

test('passing nothing gives you an empty list', () => {
  expect(extractGridLineNames()).toEqual([])
})

test('passing an empty object gives you an empty list', () => {
  expect(extractGridLineNames({})).toEqual([])
})

test('passing an empty definition gives you an empty list', () => {
  const gridTemplateAreas = {
    layout: []
  }

  expect(extractGridLineNames({})).toEqual([])
})

test('single grid area', () => {
  const gridTemplateAreas = {
    layout: ['abc']
  }

  expect(extractGridLineNames(gridTemplateAreas)).toEqual([
    'abc-start',
    'abc-end',
  ])
})

test('deduplicates names', () => {
  const gridTemplateAreas = {
    layout: ['abc abc']
  }

  expect(extractGridLineNames(gridTemplateAreas)).toEqual([
    'abc-start',
    'abc-end',
  ])
})

test('multiple areas', () => {
  const gridTemplateAreas = {
    layout: ['abc def']
  }

  expect(extractGridLineNames(gridTemplateAreas)).toEqual([
    'abc-start',
    'abc-end',
    'def-start',
    'def-end',
  ])
})

test('multiple rows', () => {
  const gridTemplateAreas = {
    layout: ['abc', 'def']
  }

  expect(extractGridLineNames(gridTemplateAreas)).toEqual([
    'abc-start',
    'abc-end',
    'def-start',
    'def-end',
  ])
})

test('excludes . (empty cell)', () => {
  const gridTemplateAreas = {
    layout: ['abc abc', 'def .']
  }

  expect(extractGridLineNames(gridTemplateAreas)).toEqual([
    'abc-start',
    'abc-end',
    'def-start',
    'def-end',
  ])
})
