import postcss from 'postcss'
import tailwind from 'tailwindcss'

export let map = JSON.stringify({
  version: 3,
  file: null,
  sources: [],
  names: [],
  mappings: '',
})

export function run(input, config, plugin = tailwind) {
  let { currentTestName, testPath } = expect.getState()
  let path = `${testPath}?test=${Buffer.from(currentTestName).toString('base64')}`

  return postcss(plugin(config)).process(input, {
    from: path,
    to: path,
  })
}
