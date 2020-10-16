# TailwindCSS Grid Areas

A plugin to provide TailwindCSS utilities for grid areas.

## Installation

```
# npm
npm install --save-dev @savvywombat/tailwindcss-grid-areas

# yarn
yarn add --dev @savvywombat/tailwindcss-grid-areas
```

## Usage

Require the plugin into your `tailwindcss.config.js` file:

```javascript
// tailwindcss.config.js
module.exports = {
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas')
  ]
}
```

Now, when adding `gridTemplateColumns` and `gridTemplateRows`, you can name the lines and utilities will be generated:

```javascript
// tailwindcss.config.js
module.exports = {
  theme: {
    gridTemplateColumns: {
      'default-layout': '[left] 1fr [gutter-left] 2rem [content-left] calc(768px - 4rem) [content-right] 2rem [gutter-right] 1fr [right]',
    },
    gridTemplateRows: {
      'default-layout': '[top header-top] 4rem [header-bottom content-top] minmax(1fr, max-content) [content-bottom footer-top] auto [bottom]',
    }
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas')
  ]
}
```

This will generate the following utilities (in addition to the default):

```
col-start-left
col-start-gutter-left
col-start-content-left
col-start-content-right
col-start-gutter-right
col-start-right

col-end-left
col-end-gutter-left
col-end-content-left
col-end-content-right
col-end-gutter-right
col-end-right

row-start-top
row-start-header-top
row-start-header-bottom
row-start-content-top
row-start-content-bottom
row-start-footer-top
row-start-footer-bottom
row-start-bottom

row-end-top
row-end-header-top
row-end-header-bottom
row-end-content-top
row-end-content-bottom
row-end-footer-top
row-end-footer-bottom
row-end-bottom
```

## Responsiveness

These labels do not have any responsive behaviour by themselves. Responsive grid layouts can be defined using `gridTemplateColumns` and `gridTemplateRows`:

```javascript
// tailwindcss.config.js
module.exports = {
  theme: {
    gridTemplateColumns: {
      'default-layout': '[left] 1fr [gutter-left] 2rem [content-left] calc(768px - 4rem) [content-right] 2rem [gutter-right] 1fr [right]',
      'small-layout': '[left gutter-left] 1rem [content-left] 1fr [content-right] 1rem [gutter-right right]',
    },
    gridTemplateRows: {
      'default-layout': '[top header-top] 4rem [header-bottom content-top] minmax(1fr, max-content) [content-bottom footer-top] auto [bottom]',
    }
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas')
  ]
}
```

## Licence

[MIT](https://github.com/SavvyWombat/tailwindcss-grid-areas/blob/main/LICENSE)
