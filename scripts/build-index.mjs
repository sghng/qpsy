// Generates the qpsy-owned agent surfaces from the content/ vault:
//   public/llms.txt       page index for LLM agents
//   public/registry.json  flat index of the paper registry
//   public/graph.json     link graph (nodes + edges) of the vault
// These are qpsy's stable machine contracts — Quartz's contentIndex.json is a
// renderer artifact and must never be relied upon.
// Zero dependencies. Run with `bun run index`; part of dev/build.
// Runs AFTER the Quartz build (Quartz owns the public/ directory).
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const SITE = 'https://qpsy.dev'
const CONTENT = 'content'

function walk(dir) {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
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

// Quartz slug: path relative to content/, .md dropped. Root index.md is the
// homepage; a folder's index.md emits at the folder URL WITH trailing slash
// (directory-index layout), matching the canonical emitted URLs exactly.
function slugFor(rel) {
  let s = rel.replace(/\.md$/, '')
  if (s === 'index') return '/'
  if (s.endsWith('/index')) return `/${s.slice(0, -'/index'.length)}/`
  return `/${s}`
}

const pages = []
const entries = []
const slugs = new Set()

for (const file of walk(CONTENT)) {
  const rel = relative(CONTENT, file)
  const [fm, body] = parseFrontmatter(readFileSync(file, 'utf8'))
  const url = slugFor(rel)
  slugs.add(url)
  const title = fm.title || (body.match(/^#\s+(.+)$/m) || [])[1] || rel
  pages.push({ url, title, description: fm.description || '', stub: fm.status === 'stub', rel, body })
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

// Link graph: internal markdown links and wikilinks, resolved to slugs.
const bySlug = new Map(pages.map((p) => [p.url, p]))
const edges = []
for (const p of pages) {
  const targets = new Set()
  for (const m of p.body.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const href = m[1]
    if (!/^(https?:|mailto:|#|\/)/.test(href)) continue
    const path = href.split('#')[0].split('?')[0]
    if (!path.startsWith('/')) continue
    const slug = path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`
    if (bySlug.has(slug)) targets.add(slug)
    else if (bySlug.has(path)) targets.add(path)
  }
  for (const m of p.body.matchAll(/\[\[([^\]|#]+)(?:[#|][^\]]*)?\]\]/g)) {
    const name = m[1].trim()
    const match = [...bySlug.values()].find((q) => q.rel === `${name}.md` || q.title === name)
    if (match) targets.add(match.url)
  }
  for (const target of targets) {
    if (target !== p.url) edges.push({ source: p.url, target })
  }
}

const registryPages = pages.filter((p) => p.url.startsWith('/registry/') && p.url !== '/registry')
const normalPages = pages.filter((p) => !p.url.startsWith('/registry/'))

let llms = `# qpsy

> A documentation layer for quantitative psychology: methods, modeling,
> research practice, writing conventions, and a paper review registry.

Base URL: ${SITE}
Machine surfaces: ${SITE}/llms.txt, ${SITE}/registry.json, ${SITE}/graph.json

## Pages

`
for (const p of normalPages) {
  const stub = p.stub ? ' [stub]' : ''
  const desc = p.description ? `: ${p.description}` : ''
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
llms += `\nStructured index: ${SITE}/registry.json\nLink graph: ${SITE}/graph.json\n`

const graph = {
  nodes: pages.map((p) => ({ slug: p.url, title: p.title, description: p.description })),
  edges,
}

// Guard: KaTeX renders parse errors INTO the output (red text) instead of
// failing the build, so a successful build proves nothing about math. Scan
// the emitted HTML and fail loudly on any katex-error span.
{
  const bad = []
  const walkHtml = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue
      const path = join(dir, entry.name)
      if (entry.isDirectory()) walkHtml(path)
      else if (entry.name.endsWith('.html') && readFileSync(path, 'utf8').includes('katex-error')) {
        bad.push(relative('public', path))
      }
    }
  }
  if (existsSync('public')) walkHtml('public')
  if (bad.length > 0) {
    console.error(`math check FAILED: katex-error found in ${bad.length} page(s):`)
    for (const p of bad) console.error(`  ${p}`)
    process.exit(1)
  }
  console.log('math check: no katex-error spans in emitted HTML')
}

mkdirSync('public', { recursive: true })
writeFileSync('public/llms.txt', llms)
writeFileSync('public/registry.json', JSON.stringify(entries, null, 2) + '\n')
writeFileSync('public/graph.json', JSON.stringify(graph, null, 2) + '\n')
console.log(`index: ${normalPages.length} pages, ${entries.length} registry entries, ${edges.length} graph edges`)
