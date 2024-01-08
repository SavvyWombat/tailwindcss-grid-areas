function reduce(collection, iteratee, initialVal) {
  if (!collection) return []
  return Object.keys(collection).reduce(
    (carry, current, index, array) =>
      item(
        carry,
        !Array.isArray(collection) ? collection[current] : current,
        !Array.isArray(collection) ? current : array,
          index
      ),
    initialVal
  )
}

function baseFlatten(array, depth) {
  const result = []
  if (!array) {
    return result
  }

  for (const value of array) {
    if (depth && Array.isArray(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1)
      } else {
        result.push(...value)
      }
    } else {
      result[result.length] = value
    }
  }
  return result
}

function flatMap(arr, mapper) {
  if (!arr) return []
  return baseFlatten(
    Object.keys(arr).map((value, index) => mapper(arr[value], !Array.isArray(arr) ? value : index)),
    1
  )
}

function uniq(arr) {
  return [...new Set(arr)]
}

module.exports = { reduce, flatMap, uniq }
