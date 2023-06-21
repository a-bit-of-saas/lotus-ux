import { dirname, join } from 'path'
import plugin from 'tailwindcss/plugin'

const packages = [
  'avatar',
  'button',
  'checkbox',
  'input',
  'label',
  'text-field',
]
const defaults = [
  packages.map((pkg) => `./node_modules/@lotus-ux/${pkg}/**/*.js`),
  packages.map(
    (pkg) =>
      `./node_modules/lotus-ux/node_modules/@lotus-ux/${pkg}/dist/index.js`
  ),
].flat()

const lotus = plugin(function ({ addUtilities, config }) {
  const content = config().content

  const pkgs = packages
    .map((pkg) => {
      try {
        return join(
          dirname(
            require.resolve(`@lotus-ux/${pkg}`, {
              paths: [require.main?.filename || ''],
            })
          ),
          '**/*.js'
        )
      } catch {
        return null
      }
    })
    .filter(Boolean)
    .concat(defaults) as string[]

  if (Array.isArray(content)) {
    content.push(...pkgs)
  } else {
    content.files.push(...pkgs)
  }

  const newUtilities = {
    '@keyframes uppydown': {
      '0%': {
        opacity: '0',
        transform: 'translateY(0)',
      },
      '25%': {
        opacity: '1',
        transform: 'translateY(-6px)',
      },
      '75%': {
        opacity: '1',
        transform: 'translateY(-6px)',
      },
      '100%': {
        opacity: '0',
        transform: 'translateY(0)',
      },
    },
  }

  addUtilities(newUtilities)
})

export default lotus
