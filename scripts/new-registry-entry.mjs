#!/usr/bin/env bun
// Scaffold one DOI-based registry entry from Crossref metadata. The generated
// page is deliberately a stub: an agent must verify the record and write the
// methodological content before removing `status: stub`.
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  REGISTRY_DIR,
  isValidDoi,
  makeRegistryKey,
  normalizeDoi,
  readRegistryRecords,
} from './lib/registry.mjs'

const USAGE = `Usage:
  bun run registry:new -- <doi> --short-title "<2–4 words>" [--author-slug <slug>]

Example:
  bun run registry:new -- 10.1007/BF02296131 --short-title "polychoric correlations"

Crossref supplies the bibliographic metadata and first-author/year prefix.
Use --author-slug only to override the automatic surname transliteration.`

function parseArgs(argv) {
  const options = { doi: null, shortTitle: null, authorSlug: null }
  const positional = []
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--help' || arg === '-h') options.help = true
    else if (arg === '--short-title') options.shortTitle = argv[++i]
    else if (arg === '--author-slug') options.authorSlug = argv[++i]
    else if (arg.startsWith('--')) throw new Error(`Unknown option: ${arg}`)
    else positional.push(arg)
  }
  if (positional.length > 1) throw new Error('Provide exactly one DOI')
  options.doi = positional[0] ?? null
  return options
}

export async function fetchCrossrefWork(doi, fetchImpl = fetch) {
  const normalized = normalizeDoi(doi)
  if (!isValidDoi(normalized)) throw new Error(`Invalid DOI: ${doi}`)
  const response = await fetchImpl(`https://api.crossref.org/works/${encodeURIComponent(normalized)}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'qpsy-registry/1.0 (https://qpsy.dev)',
    },
    signal: AbortSignal.timeout(20_000),
  })
  if (!response.ok) throw new Error(`Crossref could not resolve ${normalized} (HTTP ${response.status})`)
  const payload = await response.json()
  const work = payload?.message
  if (!work || typeof work !== 'object') throw new Error(`Crossref returned no work record for ${normalized}`)
  if (normalizeDoi(work.DOI) !== normalized) {
    throw new Error(`Crossref DOI mismatch: requested ${normalized}, received ${work.DOI ?? '(missing DOI)'}`)
  }
  return work
}

export function bibliographicMetadata(work) {
  const title = work.title?.[0]?.trim()
  const year = work.issued?.['date-parts']?.[0]?.[0]
  const venue = work['container-title']?.[0]?.trim()
  const authorRecords = Array.isArray(work.author) ? work.author : []
  const authors = authorRecords
    .map((author) => {
      if (author.family) return [author.family, author.given].filter(Boolean).join(', ')
      return author.literal || author.name || ''
    })
    .filter(Boolean)
  const firstAuthor = authorRecords[0]
  const firstAuthorFamily = firstAuthor?.family || firstAuthor?.literal || firstAuthor?.name

  if (!title) throw new Error('Crossref record has no title')
  if (!/^\d{4}$/.test(String(year))) throw new Error('Crossref record has no four-digit issued year')
  if (!venue) throw new Error('Crossref record has no container title; add and verify the venue manually')
  if (authors.length === 0 || !firstAuthorFamily) {
    throw new Error('Crossref record has no usable author; add and verify authorship manually')
  }

  return {
    title,
    authors: authors.join('; '),
    firstAuthorFamily,
    year,
    venue,
    doi: normalizeDoi(work.DOI),
  }
}

function frontmatterSource(frontmatter) {
  const scalar = (value) => (typeof value === 'string' && /[\r\n]/.test(value)
    ? JSON.stringify(value)
    : Bun.YAML.stringify(value))
  return Object.entries(frontmatter)
    .map(([field, value]) => Array.isArray(value)
      ? `${field}: [${value.map(scalar).join(', ')}]`
      : `${field}: ${scalar(value)}`)
    .join('\n')
}

function entrySource(metadata, key, reviewed) {
  const frontmatter = {
    key,
    title: metadata.title,
    authors: metadata.authors,
    year: metadata.year,
    venue: metadata.venue,
    doi: metadata.doi,
    model: '',
    topics: [],
    reviewed,
    description: '',
    status: 'stub',
  }
  return `---
${frontmatterSource(frontmatter)}
---

# ${metadata.title}

## Reference

${metadata.authors} (${metadata.year}). ${metadata.title}. *${metadata.venue}*.
[doi:${metadata.doi}](https://doi.org/${metadata.doi})

## Publisher abstract

TODO: Copy the publisher abstract verbatim inside a blockquote. Check the
publisher source rather than trusting markup or wording in an API response.

## Model

TODO: Define the model, central equations, symbols, and assumptions.

## Likelihood

TODO: State the likelihood and explain the estimation structure relevant to
this paper.

## Notes

TODO: Add descriptive methodological relationships and limitations. Remove all
TODO markers and status: stub only after the entry is complete and verified.
`
}

export async function createRegistryEntry({
  doi,
  shortTitle,
  authorSlug,
  registryDir = REGISTRY_DIR,
  fetchImpl = fetch,
  today = new Date(),
}) {
  const normalized = normalizeDoi(doi)
  if (!isValidDoi(normalized)) throw new Error(`Invalid DOI: ${doi}`)
  if (!shortTitle?.trim()) throw new Error('--short-title is required')

  const existing = readRegistryRecords(registryDir)
  const doiOwner = existing.find((record) => normalizeDoi(record.fm.doi) === normalized)
  if (doiOwner) throw new Error(`DOI ${normalized} is already registered in ${doiOwner.rel}`)

  const work = await fetchCrossrefWork(normalized, fetchImpl)
  const metadata = bibliographicMetadata(work)
  const key = makeRegistryKey({
    author: metadata.firstAuthorFamily,
    authorSlug,
    year: metadata.year,
    shortTitle,
  })

  const claimed = existing.find((record) => record.fm.key === key)
  if (claimed) throw new Error(`Registry key ${key} is already used by ${claimed.rel}`)

  const reviewed = today.toISOString().slice(0, 10)
  const path = join(registryDir, `${key}.md`)
  mkdirSync(registryDir, { recursive: true })
  writeFileSync(path, entrySource(metadata, key, reviewed), { encoding: 'utf8', flag: 'wx' })
  return { key, path, metadata }
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  if (options.help) {
    console.log(USAGE)
    return
  }
  if (!options.doi || !options.shortTitle) throw new Error(USAGE)
  const result = await createRegistryEntry(options)
  console.log(`Created ${result.path}`)
  console.log(`Key: ${result.key}`)
  console.log('Complete and verify the stub, then run `bun run registry:check`.')
}

if (import.meta.main) {
  main().catch((error) => {
    console.error(`registry:new: ${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 1
  })
}
