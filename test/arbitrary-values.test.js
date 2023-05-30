import path from 'path'
import postcss from 'postcss'
import tailwind from 'tailwindcss'
import gridAreasPlugin from '../src/plugin'

let css = String.raw
let html = String.raw

function run(input, config) {
  let { currentTestName } = expect.getState()

  config = {
    ...{ plugins: [gridAreasPlugin], corePlugins: { preflight: false } },
    ...config,
  }

  return postcss(tailwind(config)).process(input, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  })
}

it('should generate grid-template-areas', () => {
  let config = {
    content: [
      {
        raw: html` <div class="grid-areas-[left]"></div> `,
      },
    ],
  }

  return run('@tailwind utilities', config).then((result) => {
    return expect(result.css).toMatchFormattedCss(css`
      .grid-areas-\[left\] {
        grid-template-areas: 'left';
      }
    `)
  })
})

it('should generate grid-template-areas with multiple columns', () => {
  let config = {
    content: [
      {
        raw: html` <div class="grid-areas-[left_right]"></div> `,
      },
    ],
  }

  return run('@tailwind utilities', config).then((result) => {
    return expect(result.css).toMatchFormattedCss(css`
      .grid-areas-\[left_right\] {
        grid-template-areas: 'left right';
      }
    `)
  })
})

it('should generate grid-template-areas with multiple rows', () => {
  let config = {
    content: [
      {
        raw: html` <div class="grid-areas-[left_right,left_right]"></div> `,
      },
    ],
  }

  return run('@tailwind utilities', config).then((result) => {
    return expect(result.css).toMatchFormattedCss(css`
      .grid-areas-\[left_right\2c left_right\] {
        grid-template-areas: 'left right' 'left right';
      }
    `)
  })
})

it('ignores underscores/spaces around the comma', () => {
  let config = {
    content: [
      {
        raw: html`
          <div class="grid-areas-[left_right,_left_right]"></div>
          <div class="grid-areas-[left_right_,left_right]"></div>
          <div class="grid-areas-[left_right_,_._right]"></div>
        `,
      },
    ],
  }

  return run('@tailwind utilities', config).then((result) => {
    return expect(result.css).toMatchFormattedCss(css`
      .grid-areas-\[left_right\2c _left_right\] {
        grid-template-areas: 'left right' 'left right';
      }

      .grid-areas-\[left_right_\2c _\._right\] {
        grid-template-areas: 'left right' '. right';
      }

      .grid-areas-\[left_right_\2c left_right\] {
        grid-template-areas: 'left right' 'left right';
      }
    `)
  })
})

it('generates grid-area', () => {
  let config = {
    content: [
      {
        raw: html` <div class="grid-in-[left]"></div> `,
      },
    ],
  }

  return run('@tailwind utilities', config).then((result) => {
    return expect(result.css).toMatchFormattedCss(css`
      .grid-in-\[left\] {
        grid-area: left;
      }
    `)
  })
})

it('handles custom properties in arbitrary grid-areas', () => {
  let config = {
    content: [
      {
        raw: html`<div class="grid-areas-[var(--grid-areas)]"></div>`,
      },
    ],
  }

  return run('@tailwind utilities', config).then((result) => {
    return expect(result.css).toMatchFormattedCss(css`
      .grid-areas-\[var\(--grid-areas\)\] {
        grid-template-areas: var(--grid-areas);
      }
    `)
  })
})

it('handles custom properties mixed with regular properties in arbitrary grid-areas', () => {
  let config = {
    content: [
      {
        raw: html`<div class="grid-areas-[top_top,var(--grid-areas)]"></div>`,
      },
    ],
  }

  return run('@tailwind utilities', config).then((result) => {
    return expect(result.css).toMatchFormattedCss(css`
      .grid-areas-\[top_top\2c var\(--grid-areas\)\] {
        grid-template-areas: 'top top' var(--grid-areas);
      }
    `)
  })
})
