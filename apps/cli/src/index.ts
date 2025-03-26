import { z } from 'zod'
import arg from 'arg'
import { generateHTML, getTreeFromURL } from '@workspace/common'
import pkg from '../package.json' with { type: 'json' }


const URL = z.string().url()

function isValidURL(url: string) {
  if (!URL.safeParse(url).success) return false
  return /^(https?:\/\/)?(www\.)?arc\.net\/?/.test(url)
}

function help() {
  console.log(`
Usage arcaway-cli <sharable-url> [options]

Options:
  --help     Show this help message
  --json     Output the result in JSON format
  --version  Show the version of the CLI
`)
}

; (async function main() {
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

  if (!isValidURL(url)) {
    console.error('Please provide a valid URL')
    help()
    process.exit(1)
  }

  if (args['--json']) {
    const { nodes, space } = await getTreeFromURL(url)
    console.log(JSON.stringify({ nodes, space }))
    process.exit(0)
  }

  const html = await generateHTML(url)
  console.log(html)
})();


