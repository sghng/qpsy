// Generates the agent surfaces for the qpsy site:
//   public/llms.txt      page index for LLM agents
//   public/registry.json flat index of the paper registry
// Zero dependencies. Run with `bun run index`; part of dev/build/preview.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const SITE = 'https://qpsy.dev'
const SKIP_DIRS = new Set(['node_modules', '.vitepress', 'public', 'scripts', 'dist'])
const SKIP_FILES = new Set(['README.md', 'AGENTS.md'])

function walk(dir) {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) continue
    const path = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walk(path))
    else if (entry.name.endsWith('.md')) files.push(path)
  }
  return files
}

// Minimal flat frontmatter parser: `key: value` and `key: [a, b]` lines only.
function parseFrontmatter(text) {
  if (!text.startsWith('---\n')) return [{}, text]
  const end = text.indexOf('\n---\n', 3)
  if (end === -1) return [{}, text]
  const fm = {}
  for (const line of text.slice(4, end).split('\n')) {
    const m = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/)
    if (!m) continue
    let value = m[2].trim()
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else if (/^["'].*["']$/.test(value)) {
      value = value.slice(1, -1)
    }
    fm[m[1]] = value
  }
  return [fm, text.slice(end + 5)]
}

const pages = []
const entries = []

for (const file of walk('.')) {
  const rel = relative('.', file)
  if (SKIP_FILES.has(rel)) continue
  const [fm, body] = parseFrontmatter(readFileSync(file, 'utf8'))
  const url = '/' + rel.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1')
  const title = fm.title || (body.match(/^#\s+(.+)$/m) || [])[1] || rel
  pages.push({ url, title, desc: fm.desc || '', stub: fm.status === 'stub', rel })
  if (rel.startsWith('registry/') && rel !== 'registry/index.md') {
    for (const field of ['key', 'title', 'authors', 'year', 'venue', 'doi', 'model', 'reviewed']) {
      if (!fm[field]) console.warn(`[warn] ${rel}: missing registry field "${field}"`)
    }
    entries.push({
      key: fm.key,
      title: fm.title,
      authors: fm.authors,
      year: fm.year ? Number(fm.year) : null,
      venue: fm.venue,
      doi: fm.doi,
      model: fm.model,
      topics: Array.isArray(fm.topics) ? fm.topics : [],
      reviewed: fm.reviewed,
      url,
    })
  }
}

pages.sort((a, b) => a.url.localeCompare(b.url))
entries.sort((a, b) => String(a.key).localeCompare(String(b.key)))

const registryPages = pages.filter((p) => p.url.startsWith('/registry/') && p.url !== '/registry/')
const normalPages = pages.filter((p) => !p.url.startsWith('/registry/'))

let llms = `# qpsy

> A documentation layer for quantitative psychology: methods, modeling,
> research practice, writing conventions, and a paper review registry.

Base URL: ${SITE}
Machine surfaces: ${SITE}/llms.txt and ${SITE}/registry.json

## Pages

`
for (const p of normalPages) {
  const stub = p.stub ? ' [stub]' : ''
  const desc = p.desc ? `: ${p.desc}` : ''
  llms += `- [${p.title}](${SITE}${p.url === '/' ? '' : p.url})${stub}${desc}\n`
}

llms += `
## Registry

Each entry page describes the model and the likelihood function, quotes the
publisher abstract verbatim with attribution, and links the DOI. Entries are
descriptive only and never contain full text.

`
for (const e of entries) {
  llms += `- [${e.key}: ${e.title}](${SITE}${e.url}): ${e.authors} (${e.year}), ${e.venue}. Model: ${e.model}. doi:${e.doi}\n`
}
llms += `\nStructured index: ${SITE}/registry.json\n`

mkdirSync('public', { recursive: true })
writeFileSync('public/llms.txt', llms)
writeFileSync('public/registry.json', JSON.stringify(entries, null, 2) + '\n')
console.log(`index: ${normalPages.length} pages, ${entries.length} registry entries`)
