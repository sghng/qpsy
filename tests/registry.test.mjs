import { afterEach, describe, expect, test } from 'bun:test'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  isRegistryKey,
  isValidDoi,
  makeRegistryKey,
  normalizeDoi,
  parseFrontmatter,
  readRegistryRecords,
  slugify,
  validateRegistry,
} from '../scripts/lib/registry.mjs'
import { findResidualWikilinks } from '../scripts/lib/render-checks.mjs'
import {
  bibliographicMetadata,
  createRegistryEntry,
  fetchCrossrefWork,
} from '../scripts/new-registry-entry.mjs'

const BODY = `
# Dummy paper

## Reference

Reference text.

## Publisher abstract

> Abstract text.

## Model

Model text.

## Likelihood

Likelihood text.
`

function validRecord(overrides = {}) {
  const key = overrides.key ?? 'joreskog-1994-polychoric-correlations'
  return {
    rel: `${key}.md`,
    basename: key,
    fm: {
      key,
      title: 'On the Estimation of Polychoric Correlations and their Asymptotic Covariance Matrix',
      authors: 'Jöreskog, Karl G.',
      year: 1994,
      venue: 'Psychometrika',
      doi: '10.1007/BF02296131',
      model: 'Polychoric correlation, two-step',
      topics: ['ordinal data', 'correlation structure', 'sem'],
      reviewed: '2026-10-13',
      description: 'Two-step polychoric estimation',
      ...overrides.fm,
    },
    body: BODY,
    parseError: null,
    ...overrides.record,
  }
}

const temporaryDirectories = []
afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true })
})

describe('DOI normalization', () => {
  test('normalizes resolver URLs, prefixes, escaping, and case', () => {
    expect(normalizeDoi(' https://doi.org/10.1007/BF02296131 ')).toBe('10.1007/bf02296131')
    expect(normalizeDoi('doi:10.1234/ABC')).toBe('10.1234/abc')
    expect(normalizeDoi('10.1234%2FABC')).toBe('10.1234/abc')
    expect(isValidDoi('10.1007/BF02296131')).toBe(true)
    expect(isValidDoi('not-a-doi')).toBe(false)
  })
})

describe('registry keys', () => {
  test('creates semantic keys with curated ASCII slugs', () => {
    expect(slugify('Jöreskog')).toBe('joreskog')
    expect(slugify('De la Torre')).toBe('de-la-torre')
    expect(makeRegistryKey({ author: 'Jöreskog', year: 1994, shortTitle: 'Polychoric correlations' }))
      .toBe('joreskog-1994-polychoric-correlations')
    expect(makeRegistryKey({ author: 'Ignored', authorSlug: 'custom-name', year: 2020, shortTitle: 'Latent growth model' }))
      .toBe('custom-name-2020-latent-growth-model')
  })

  test('accepts only the agreed key shape and 2–4-word mnemonic', () => {
    expect(isRegistryKey('joreskog-1994-polychoric-correlations')).toBe(true)
    expect(isRegistryKey('joreskog-1994')).toBe(false)
    expect(isRegistryKey('joreskog-1994-polychoric')).toBe(false)
    expect(isRegistryKey('Joreskog-1994-polychoric-correlations')).toBe(false)
    expect(isRegistryKey('joreskog-1994-one-two-three-four-five')).toBe(false)
    expect(() => makeRegistryKey({ author: 'Jöreskog', year: 1994, shortTitle: 'Polychoric' })).toThrow('2–4')
  })
})

describe('frontmatter parsing', () => {
  test('round-trips quoted YAML and inline arrays', () => {
    const source = '---\ntitle: "A: \\"quoted\\" title"\ntopics: [ordinal data, SEM]\nyear: 1994\n---\n# Body\n'
    const [fm, body] = parseFrontmatter(source)
    expect(fm.title).toBe('A: "quoted" title')
    expect(fm.topics).toEqual(['ordinal data', 'SEM'])
    expect(fm.year).toBe(1994)
    expect(body).toBe('# Body\n')
  })
})

describe('registry validation', () => {
  test('accepts a complete entry', () => {
    expect(validateRegistry([validRecord()])).toEqual([])
  })

  test('rejects invalid keys and filename mismatches', () => {
    const errors = validateRegistry([
      validRecord({ fm: { key: 'Joreskog-1994' }, record: { basename: 'different-file' } }),
    ])
    expect(errors.some((error) => error.includes('must be <first-author>-<year>-<short-title>'))).toBe(true)
    expect(errors.some((error) => error.includes('must equal filename basename'))).toBe(true)
  })

  test('rejects every missing required string field', () => {
    for (const field of ['key', 'title', 'authors', 'venue', 'doi', 'model', 'reviewed', 'description']) {
      const errors = validateRegistry([validRecord({ fm: { [field]: '' } })])
      expect(errors.some((error) => error.includes(`registry field "${field}"`))).toBe(true)
    }
  })

  test('rejects a key year that disagrees with the bibliographic year', () => {
    const errors = validateRegistry([validRecord({ fm: { year: 1995 } })])
    expect(errors.some((error) => error.includes('key year "1994"'))).toBe(true)
  })

  test('rejects malformed years, dates, and topics', () => {
    const errors = validateRegistry([
      validRecord({ fm: { year: '94', reviewed: '2026-02-30', topics: [] } }),
    ])
    expect(errors.some((error) => error.includes('four-digit year'))).toBe(true)
    expect(errors.some((error) => error.includes('real YYYY-MM-DD date'))).toBe(true)
    expect(errors.some((error) => error.includes('non-empty array'))).toBe(true)
  })

  test('rejects uppercase topic tags', () => {
    const errors = validateRegistry([validRecord({ fm: { topics: ['ordinal data', 'SEM'] } })])
    expect(errors.some((error) => error.includes('only lowercase tags'))).toBe(true)
  })

  test('rejects unfinished stubs and TODO markers even with complete metadata', () => {
    const stubErrors = validateRegistry([validRecord({ fm: { status: 'stub' } })])
    expect(stubErrors.some((error) => error.includes('status "stub"'))).toBe(true)
    const todoErrors = validateRegistry([validRecord({ record: { body: `${BODY}\nTODO: verify this.\n` } })])
    expect(todoErrors.some((error) => error.includes('TODO marker'))).toBe(true)
  })

  test('rejects duplicate normalized DOIs', () => {
    const second = validRecord({
      key: 'another-2020-dummy-model',
      fm: { doi: 'https://doi.org/10.1007/bf02296131' },
    })
    const errors = validateRegistry([validRecord(), second])
    expect(errors.some((error) => error.includes('normalized DOI'))).toBe(true)
  })

  test('rejects duplicate current keys', () => {
    const second = validRecord({
      fm: { doi: '10.1234/another' },
      record: { rel: 'duplicate.md' },
    })
    const errors = validateRegistry([validRecord(), second])
    expect(errors.some((error) => error.includes('already used'))).toBe(true)
  })

  test('rejects Better BibTeX and citation-key fields', () => {
    for (const field of ['citekey', 'citation_key', 'zotero_citekey', 'bbt_citekey', 'better_bibtex_key', 'betterBibtexKey']) {
      const errors = validateRegistry([validRecord({ fm: { [field]: 'internalKey2020' } })])
      expect(errors.some((error) => error.includes('Better BibTeX/citation-key'))).toBe(true)
    }
  })

  test('requires the four registry body sections', () => {
    const errors = validateRegistry([validRecord({ record: { body: '# No sections\n' } })])
    for (const section of ['Reference', 'Publisher abstract', 'Model', 'Likelihood']) {
      expect(errors.some((error) => error.includes(`## ${section}`))).toBe(true)
    }
  })
})

describe('Crossref entry scaffolding', () => {
  const joreskogWork = {
    DOI: '10.1007/bf02296131',
    title: ['On the Estimation of Polychoric Correlations and their Asymptotic Covariance Matrix'],
    author: [{ given: 'Karl G.', family: 'Jöreskog' }],
    issued: { 'date-parts': [[1994, 9]] },
    'container-title': ['Psychometrika'],
  }
  const dummyWork = {
    DOI: '10.1234/dummy.dina',
    title: ['A Dummy Cognitive Diagnosis Model'],
    author: [{ given: 'Dana', family: 'De la Torre' }],
    issued: { 'date-parts': [[2009]] },
    'container-title': ['Dummy Journal'],
  }

  test('fetches a work and rejects a DOI mismatch', async () => {
    const fetchImpl = async () => ({ ok: true, status: 200, json: async () => ({ message: joreskogWork }) })
    expect(await fetchCrossrefWork('https://doi.org/10.1007/BF02296131', fetchImpl)).toEqual(joreskogWork)
    const wrongFetch = async () => ({ ok: true, status: 200, json: async () => ({ message: dummyWork }) })
    await expect(fetchCrossrefWork('10.1007/BF02296131', wrongFetch)).rejects.toThrow('DOI mismatch')
  })

  test('reports Crossref HTTP failures', async () => {
    const fetchImpl = async () => ({ ok: false, status: 404, json: async () => ({}) })
    await expect(fetchCrossrefWork('10.1007/BF02296131', fetchImpl)).rejects.toThrow('HTTP 404')
  })

  test('rejects incomplete Crossref bibliographic metadata', () => {
    const cases = [
      [{ ...joreskogWork, title: [] }, 'no title'],
      [{ ...joreskogWork, issued: { 'date-parts': [[]] } }, 'no four-digit issued year'],
      [{ ...joreskogWork, 'container-title': [] }, 'no container title'],
      [{ ...joreskogWork, author: [] }, 'no usable author'],
    ]
    for (const [work, message] of cases) {
      expect(() => bibliographicMetadata(work)).toThrow(message)
    }
  })

  test('extracts bibliographic metadata without a citation key', () => {
    const metadata = bibliographicMetadata(joreskogWork)
    expect(metadata).toEqual({
      title: joreskogWork.title[0],
      authors: 'Jöreskog, Karl G.',
      firstAuthorFamily: 'Jöreskog',
      year: 1994,
      venue: 'Psychometrika',
      doi: '10.1007/bf02296131',
    })
    expect(metadata).not.toHaveProperty('zotero_citekey')
  })

  test('creates two temporary dummy entries, then removes them', async () => {
    const registryDir = mkdtempSync(join(tmpdir(), 'qpsy-registry-'))
    temporaryDirectories.push(registryDir)
    const works = [joreskogWork, dummyWork]
    const fetchImpl = async () => ({ ok: true, status: 200, json: async () => ({ message: works.shift() }) })

    const first = await createRegistryEntry({
      doi: '10.1007/BF02296131',
      shortTitle: 'polychoric correlations',
      registryDir,
      fetchImpl,
      today: new Date('2026-11-04T12:00:00Z'),
    })
    const second = await createRegistryEntry({
      doi: '10.1234/dummy.dina',
      shortTitle: 'dummy diagnosis model',
      registryDir,
      fetchImpl,
      today: new Date('2026-11-04T12:00:00Z'),
    })

    expect(first.key).toBe('joreskog-1994-polychoric-correlations')
    expect(second.key).toBe('de-la-torre-2009-dummy-diagnosis-model')
    const records = readRegistryRecords(registryDir)
    expect(records).toHaveLength(2)
    expect(records[0].fm.status).toBe('stub')
    expect(records[0].fm.reviewed).toBe('2026-11-04')
    expect(records[0].fm).not.toHaveProperty('zotero_citekey')
    expect(records[0].fm).not.toHaveProperty('aliases')
    const source = readFileSync(first.path, 'utf8')
    expect(source).toStartWith('---\nkey: joreskog-1994-polychoric-correlations\ntitle:')
    expect(source).toContain('\ntopics: []\n')
    expect(source).toContain('## Publisher abstract')
  })

  test('refuses to register the same normalized DOI twice', async () => {
    const registryDir = mkdtempSync(join(tmpdir(), 'qpsy-registry-'))
    temporaryDirectories.push(registryDir)
    const fetchImpl = async () => ({ ok: true, status: 200, json: async () => ({ message: joreskogWork }) })
    await createRegistryEntry({
      doi: joreskogWork.DOI,
      shortTitle: 'polychoric correlations',
      registryDir,
      fetchImpl,
    })
    await expect(createRegistryEntry({
      doi: 'https://doi.org/10.1007/BF02296131',
      shortTitle: 'duplicate polychoric paper',
      registryDir,
      fetchImpl,
    })).rejects.toThrow('already registered')
  })

  test('never overwrites an existing target file, even with invalid frontmatter', async () => {
    const registryDir = mkdtempSync(join(tmpdir(), 'qpsy-registry-'))
    temporaryDirectories.push(registryDir)
    const path = join(registryDir, 'joreskog-1994-polychoric-correlations.md')
    const original = 'not: [valid YAML\n'
    writeFileSync(path, original, 'utf8')
    const fetchImpl = async () => ({ ok: true, status: 200, json: async () => ({ message: joreskogWork }) })

    await expect(createRegistryEntry({
      doi: joreskogWork.DOI,
      shortTitle: 'polychoric correlations',
      registryDir,
      fetchImpl,
    })).rejects.toThrow()
    expect(readFileSync(path, 'utf8')).toBe(original)
  })
})

describe('rendered wikilink checks', () => {
  test('rejects unresolved opening and closing delimiters in visible HTML', () => {
    const opening = findResidualWikilinks('<p>[[unresolved-opening-delimiter</p>')
    expect(opening).toHaveLength(1)
    expect(opening[0]).toContain('[[')

    const closing = findResidualWikilinks('<p>alias with a split closing delimiter]]</p>')
    expect(closing).toHaveLength(1)
    expect(closing[0]).toContain(']]')
  })

  test('allows documented wikilink syntax inside code and pre blocks', () => {
    const html = `
      <p>Resolved prose.</p>
      <pre><code>[[documented-wikilink|Example]]</code></pre>
      <p><code>[[inline-example]]</code></p>
      <script>const example = '[[script-example]]'</script>
      <style>.example::before { content: '[[style-example]]' }</style>
    `
    expect(findResidualWikilinks(html)).toEqual([])
  })
})
