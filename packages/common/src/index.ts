import { z } from 'zod'
import { fromURL } from 'cheerio'

const NextData = z.object({
  props: z.object({
    pageProps: z.object({
      data: z.object({
        space: z.object({
          id: z.string(),
          title: z.string(),
          customInfo: z.object({
            emoji_v2: z.string().optional(),
            emoji: z.string().optional()
          })
        }),
        items: z.array(z.object({
          id: z.string(),
          parentID: z.string().nullish(),
          title: z.string().nullish(),
          data: z.object({
            tab: z.object({
              savedTitle: z.string(),
              savedURL: z.string().url()
            }).nullish()
          }).nullish()
        }))
      })
    })
  })
})

type NextData = z.infer<typeof NextData>

interface TreeNode {
  id: string
  title: string
  url?: string
  children: TreeNode[]
}

async function parseRawData(url: string) {
  const $ = await fromURL(url)
  const jsonString = JSON.parse($('#__NEXT_DATA__').text())
  return NextData.parse(jsonString)
}

export function buildTree(items: NextData['props']['pageProps']['data']['items'], spaceTitle: string) {
  const nodes = new Map<string, TreeNode>()

  for (const item of items) {
    const { id, parentID } = item
    const url = item.data?.tab?.savedURL
    const title = item.title ?? item.data?.tab?.savedTitle

    if (!title) continue

    let node = nodes.get(id)
    if (!node) {
      node = { id, title, children: [] }
      nodes.set(id, node)
    } else {
      node.title = title
    }

    if (url) {
      node.url = url
    }

    if (parentID) {
      let parent = nodes.get(parentID)
      if (!parent) {
        const parentTitle = items.find(i => i.id === parentID)?.title ?? spaceTitle
        parent = {
          id: parentID,
          title: parentTitle,
          children: []
        }
        nodes.set(parentID, parent)
      }

      parent.children.push(node)
    }
  }

  return nodes
}

export async function getTreeFromURL(url: string) {
  const data = await parseRawData(url)
  const { items, space } = data.props.pageProps.data

  const tree = buildTree(items, space.title)
  const nodes: TreeNode[] = []

  for (const [id, node] of tree.entries()) {
    const item = items.find(i => i.id === id)
    if (!item) continue

    const isRoot = !item.parentID
    if (isRoot) {
      nodes.push(node)
    }
  }

  return { nodes, space }
}

export function buildBookmarkHTML(tree: TreeNode[]): string {
  // The wrapper for the current level is an unordered list
  let htmlOutput = '<DL><p>\n';

  for (const node of tree) {
    if (node.url) {
      // This is a Link Node
      htmlOutput += `<DT><A HREF="${node.url}" ADD_DATE="${Date.now()}">${node.title}</A></DT>\n`;
    } else {
      // This is a Folder Node
      htmlOutput += `<DT><h3>${node.title}</h3>\n`;
      if (node.children && node.children.length > 0) {
        // Recursively build child HTML
        htmlOutput += buildBookmarkHTML(node.children);
      }
      htmlOutput += '</DT>\n';
    }
  }

  htmlOutput += '</DL><p>\n';
  return htmlOutput;
}

const TEMPLATE = `
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file. It will be read and overwritten by the browser -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>{{title}}</TITLE>
<h1>{{title}}</h1>

{{content}}
</HTML>


`

export async function generateHTML(url: string) {
  const { nodes, space } = await getTreeFromURL(url)
  const html = buildBookmarkHTML(nodes)

  return TEMPLATE.replaceAll('{{title}}', space.title).replace('{{content}}', html)
}


