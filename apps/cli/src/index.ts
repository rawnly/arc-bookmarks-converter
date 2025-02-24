import arg from 'arg'
import { generateHTML, getTreeFromURL } from '@workspace/common'
import pkg from '../package.json' with { type: 'json' }

const args = arg({
  '--help': Boolean,
  '--json': Boolean,
  '--version': Boolean
})

const url = args._[0]

if (args['--version']) {
  console.log(pkg.version)
  process.exit(0)
}

if (!url || args['--help']) {
  help()
  process.exit(0)
}

if (args['--json']) {
  const { nodes, space } = await getTreeFromURL(url)
  console.log(JSON.stringify({ nodes, space }))
  process.exit(0)
}

const html = await generateHTML(url)
console.log(html)


function help() {
  console.log(`
Usage arcaway-cli <sharable-url> [options]

Options:
  --help     Show this help message
  --json     Output the result in JSON format
  --version  Show the version of the CLI
`)
}
