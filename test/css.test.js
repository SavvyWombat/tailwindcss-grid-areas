import { run } from './util/run'

test('original utilities are still available', () => {
  let config = {
    content: [
      {
        raw: `
          <div class="grid grid-cols-[120px_1fr]"></div>
          <div class="grid grid-cols-2"></div>
          <div class="grid grid-cols-[120px_120px_120px]"></div>
          <div class="grid grid-cols-[minmax(100px,120px)_1fr]"></div>
          <div class="grid grid-cols-[1fr_120px]"></div>
          <div class="grid grid-cols-3"></div>
          <div class="grid grid-cols-base"></div>
          <div class="grid grid-areas-mobile-order-list">
            <div class="grid-in-left"></div>
          </div>
        `,
      },
    ],
    theme: {
      extend: {
        gridTemplateAreas: {
          'mobile-order-list': ['left right', 'left2 right2', 'notes notes'],
        },
        gridTemplateColumns: {
          base: '240px 1fr',
        },
      },
    },
    corePlugins: { preflight: false },
    plugins: [require('../src/plugin')],
  }

  let input = `
    @tailwind utilities;
  `

  return run(input, config).then((result) => {
    expect(result.css).toMatchFormattedCss(`
      .grid {
        display: grid;
      }
      
      .grid-cols-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      
      .grid-cols-3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      
      .grid-cols-\\[120px_120px_120px\\] {
          grid-template-columns: 120px 120px 120px;
      }
      
      .grid-cols-\\[120px_1fr\\] {
          grid-template-columns: 120px 1fr;
      }
      
      .grid-cols-\\[1fr_120px\\] {
          grid-template-columns: 1fr 120px;
      }
      
      .grid-cols-\\[minmax\\(100px\\2c 120px\\)_1fr\\] {
          grid-template-columns: minmax(100px,120px) 1fr;
      }
      
      .grid-cols-base {
        grid-template-columns: 240px 1fr;
      }
      
      .grid-areas-mobile-order-list {
        grid-template-areas: 'left right' 'left2 right2' 'notes notes';
      }
      
      .grid-in-left {
        grid-area: left;
      }
    `)
  })
})
