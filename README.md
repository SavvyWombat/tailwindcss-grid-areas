# TailwindCSS Grid Areas

[![Latest Version on NPM](https://img.shields.io/npm/v/@savvywombat/tailwindcss-grid-areas)](https://www.npmjs.com/package/@savvywombat/tailwindcss-areas)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/SavvyWombat/tailwindcss-grid-areas/blob/main/LICENSE)
[![Build](https://img.shields.io/github/workflow/status/SavvyWombat/tailwindcss-grid-areas/Test?label=build)](https://github.com/SavvyWombat/tailwindcss-grid-areas/actions)
[![Code Coverage](https://codecov.io/gh/SavvyWombat/tailwindcss-grid-areas/branch/main/graph/badge.svg)](https://codecov.io/gh/SavvyWombat/tailwindcss-grid-areas)

A plugin to provide TailwindCSS utilities for grid areas.

The latest release of this plugin (version 1.1 onwards) will work with TailwindCSS versions 1 and 2.

## Installation

```
# npm
npm install --save-dev @savvywombat/tailwindcss-grid-areas

# yarn
yarn add --dev @savvywombat/tailwindcss-grid-areas
```

## Usage

Require the plugin into your `tailwindcss.config.js` file, and define your template areas:

```javascript
// tailwindcss.config.js
module.exports = {
  theme: {
    gridTemplateAreas: {
      'layout': [
        'header header header',
        '. main .',
        'footer footer footer',
      ],
    },
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas')
  ]
}
```

This will generate the following utilities (in addition to the default):

```
grid-areas-layout

grid-in-header
grid-in-main
grid-in-footer

col-start-header
col-start-main
col-start-footer
col-end-header
col-end-main
col-end-footer

row-start-header
row-start-main
row-start-footer
row-end-header
row-end-main
row-end-footer
```

## Controlling column widths and row heights

Just as with CSS, `gridTemplateAreas` works with the core `gridTemplateColumns` and `gridTemplateRows` plugins to allow you to control the heights and widths of the grid cells:

```javascript
// tailwindcss.config.js
module.exports = {
  theme: {
    gridTemplateAreas: {
      'layout': [
        'header header header',
        'nav main .',
        'footer footer footer',
      ],
    },
    gridTemplateColumns: {
      'layout': '24rem 1fr 2rem',
    },
    gridTemplateRows: {
      'layout': '4rem 1fr auto',
    },
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas')
  ],
  variants: {
    gridTemplateAreas: ['responsive']
  }
}
```

```html
<body class="grid grid-areas-layout grid-cols-layout grid-rows-layout h-full">
    <header class="grid-in-header"></header>
    <nav class="grid-in-nav"></nav>
    <main class="grid-in-main"></main>
    <footer class="grid-in-footer"></footer>
</body>
```

## Variants

```javascript
// tailwindcss.config.js
module.exports = {
  theme: {
    gridTemplateAreas: {
      'wide': [
        'header header header',
        '. main .',
        'footer footer footer',
      ],
      'slim': [
        'header',
        'main',
        'footer',
      ],
    },
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas')
  ],
  variants: {
    gridTemplateAreas: ['responsive']
  }
}
```

Configuring variants for `gridTemplateAreas` will generate variants for the `grid-areas-*` utility.

This allows you to modify the grid topology for responsive layouts:

```html
<div class="grid grid-areas-slim md:grid-areas-wide"></div>
```

The other utilities will not generate variants, since it is better to modify the template areas instead since the column/row start/end lines will adapt to suit.

## Licence

[MIT](https://github.com/SavvyWombat/tailwindcss-grid-areas/blob/main/LICENSE)
