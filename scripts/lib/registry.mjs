// Shared registry parsing, naming, and validation. Bun-only by repository
// convention; Bun.YAML keeps frontmatter handling consistent without adding a
// package dependency.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, join, relative } from 'node:path'

export const REGISTRY_DIR = 'content/registry'
export const REQUIRED_STRING_FIELDS = [
  'key',
  'title',
  'authors',
  'venue',
  'doi',
  'model',
  'reviewed',
  'description',
]
export const REQUIRED_SECTIONS = ['Reference', 'Publisher abstract', 'Model', 'Likelihood']
export const FORBIDDEN_BIBTEX_FIELDS = [
  'citekey',
  'citationkey',
  'zoterocitekey',
  'bbtcitekey',
  'bbtkey',
  'betterbibtexkey',
]

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DOI_PATTERN = /^10\.\d{4,9}\/\S+$/

export function normalizeDoi(value) {
  let doi = String(value ?? '').trim()
  doi = doi.replace(/^doi:\s*/i, '')
  doi = doi.replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '')
  try {
    doi = decodeURIComponent(doi)
  } catch {
    // Leave malformed percent escapes in place so validation rejects them only
    // if they violate the DOI shape; normalization must not hide the input.
  }
  return doi.toLowerCase()
}

export function isValidDoi(value) {
  return DOI_PATTERN.test(normalizeDoi(value))
}

export function slugify(value) {
  const transliterations = {
    'ß': 'ss',
    'ẞ': 'ss',
    'æ': 'ae',
    'Æ': 'ae',
    'œ': 'oe',
    'Œ': 'oe',
    'ø': 'o',
    'Ø': 'o',
    'đ': 'd',
    'Đ': 'd',
    'ł': 'l',
    'Ł': 'l',
    'þ': 'th',
    'Þ': 'th',
  }
  return String(value ?? '')
    .replace(/[ßẞæÆœŒøØđĐłŁþÞ]/g, (letter) => transliterations[letter])
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function isRegistryKey(value) {
  const key = String(value ?? '')
  if (!SLUG_PATTERN.test(key)) return false
  const match = key.match(/^.+-(\d{4})-([a-z0-9]+(?:-[a-z0-9]+)+)$/)
  if (!match) return false
  const titleWords = match[2].split('-')
  return titleWords.length >= 2 && titleWords.length <= 4
}

export function makeRegistryKey({ author, year, shortTitle, authorSlug }) {
  const authorPart = slugify(authorSlug || author)
  const titlePart = slugify(shortTitle)
  const key = `${authorPart}-${String(year)}-${titlePart}`
  if (!authorPart) throw new Error('A non-empty first-author surname or --author-slug is required')
  if (!/^\d{4}$/.test(String(year))) throw new Error('The publication year must have four digits')
  if (!isRegistryKey(key)) {
    throw new Error('The short title must produce 2–4 lowercase ASCII words; use a concise title mnemonic')
  }
  return key
}

// Returns [frontmatter, body], matching the shape used by build-index.mjs.
export function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  if (!match) return [{}, text]
  const frontmatter = Bun.YAML.parse(match[1]) ?? {}
  if (typeof frontmatter !== 'object' || Array.isArray(frontmatter)) {
    throw new Error('frontmatter must be a YAML mapping')
  }
  return [frontmatter, text.slice(match[0].length)]
}

function walkRegistry(dir, root, records) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      walkRegistry(path, root, records)
      continue
    }
    if (!entry.name.endsWith('.md')) continue
    const rel = relative(root, path)
    if (rel === 'index.md') continue
    const record = {
      path,
      rel,
      basename: basename(path, '.md'),
      fm: {},
      body: '',
      parseError: null,
    }
    try {
      const [fm, body] = parseFrontmatter(readFileSync(path, 'utf8'))
      record.fm = fm
      record.body = body
    } catch (error) {
      record.parseError = error instanceof Error ? error.message : String(error)
    }
    records.push(record)
  }
}

export function readRegistryRecords(registryDir = REGISTRY_DIR) {
  if (!existsSync(registryDir)) throw new Error(`Registry directory not found: ${registryDir}`)
  const records = []
  walkRegistry(registryDir, registryDir, records)
  records.sort((a, b) => a.rel.localeCompare(b.rel))
  return records
}

function isRealDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export function validateRegistry(records) {
  const errors = []
  const keys = new Map()
  const dois = new Map()

  for (const record of records) {
    const label = record.rel
    const fm = record.fm
    if (record.parseError) errors.push(`${label}: cannot parse frontmatter: ${record.parseError}`)

    for (const field of Object.keys(fm)) {
      const normalizedField = field.replace(/[-_]/g, '').toLowerCase()
      if (FORBIDDEN_BIBTEX_FIELDS.includes(normalizedField)) {
        errors.push(`${label}: Better BibTeX/citation-key field "${field}" is not part of the registry schema`)
      }
    }

    for (const field of REQUIRED_STRING_FIELDS) {
      if (typeof fm[field] !== 'string' || !fm[field].trim()) {
        errors.push(`${label}: missing or empty registry field "${field}"`)
      }
    }

    if (!/^\d{4}$/.test(String(fm.year ?? ''))) {
      errors.push(`${label}: registry field "year" must be a four-digit year`)
    }

    if (!Array.isArray(fm.topics) || fm.topics.length === 0 || fm.topics.some((topic) => typeof topic !== 'string' || !topic.trim())) {
      errors.push(`${label}: registry field "topics" must be a non-empty array of strings`)
    } else if (fm.topics.some((topic) => topic !== topic.toLowerCase())) {
      errors.push(`${label}: registry field "topics" must contain only lowercase tags`)
    }

    if (fm.status === 'stub') {
      errors.push(`${label}: status "stub" must be removed after the entry is completed and verified`)
    }
    if (/\bTODO\b/.test(record.body)) {
      errors.push(`${label}: unfinished TODO marker remains in the entry body`)
    }

    if (typeof fm.reviewed === 'string' && fm.reviewed && !isRealDate(fm.reviewed)) {
      errors.push(`${label}: registry field "reviewed" must be a real YYYY-MM-DD date`)
    }

    if (typeof fm.key === 'string' && fm.key) {
      if (!isRegistryKey(fm.key)) {
        errors.push(`${label}: key "${fm.key}" must be <first-author>-<year>-<short-title>, lowercase ASCII kebab-case, with a 2–4-word title mnemonic`)
      }
      const keyMatch = fm.key.match(/^.+-(\d{4})-([a-z0-9]+(?:-[a-z0-9]+)+)$/)
      if (keyMatch && keyMatch[1] !== String(fm.year)) {
        errors.push(`${label}: key year "${keyMatch[1]}" must match registry field "year" (${String(fm.year)})`)
      }
      if (fm.key !== record.basename) {
        errors.push(`${label}: key "${fm.key}" must equal filename basename "${record.basename}"`)
      }
      if (keys.has(fm.key)) errors.push(`${label}: key "${fm.key}" is already used by ${keys.get(fm.key)}`)
      else keys.set(fm.key, label)
    }

    if (typeof fm.doi === 'string' && fm.doi.trim()) {
      if (!isValidDoi(fm.doi)) {
        errors.push(`${label}: invalid DOI "${fm.doi}"`)
      } else {
        const doi = normalizeDoi(fm.doi)
        if (dois.has(doi)) errors.push(`${label}: normalized DOI "${doi}" is already used by ${dois.get(doi)}`)
        else dois.set(doi, label)
      }
    }

    const body = record.body.replace(/\r\n/g, '\n')
    for (const section of REQUIRED_SECTIONS) {
      if (!new RegExp(`^## ${section.replace(' ', '\\s')}[ \\t]*$`, 'm').test(body)) {
        errors.push(`${label}: missing required "## ${section}" section`)
      }
    }
  }

  return errors
}
