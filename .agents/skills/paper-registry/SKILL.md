---
name: paper-registry
description: Ingest, register, reconcile, rename, and validate specific papers as individual qpsy registry entries. Use for ingest/add/register-paper requests when the deliverable is one page per paper, with verified metadata, a publisher abstract or extract, Model, and Likelihood. Do not use for integrated concept or topic notes (use concept-synthesis) or for merely citing a paper without maintaining the registry.
---

# Paper Registry

Maintain one descriptive, verified Markdown page per paper. The registry is a
public methodological knowledge base, not a mirror of a personal bibliography.
Keep local page identity, external bibliographic identity, and Zotero lookup
separate.

Follow `AGENTS.md` and load `obsidian-markdown` when authoring entries. Use
this skill for routine requests to ingest, add, or register one or more papers
as individual records. When the deliverable is an integrated concept or topic
note rather than one page per source, use `concept-synthesis` instead. For a
request that needs both paper records and a concept note, complete the registry
pass first and then the synthesis pass; concept notes cite DOIs and link
registry entries rather than duplicating their content.

## Identity model

- **`key` is the qpsy address.** It equals the filename basename under
  `content/registry/` and is used for internal links.
- **DOI is the bibliographic identity.** It is the primary exact-match field
  for external services and Zotero. Compare DOIs after removing `doi:` or DOI
  resolver prefixes, decoding percent escapes, and ignoring case.
- **Registry-specific aliases and redirect preservation are out of scope.**
  Agents use the current machine indexes and bibliographic metadata; old URLs
  do not need registry-specific redirect handling.
- **Better BibTeX keys are excluded.** Do not add `citekey`,
  `zotero_citekey`, `bbt_citekey`, `better_bibtex_key`, or an equivalent field.
  Registry pages and scripts must not depend on a personal citation-key setup.

## Key convention

New keys have this form:

```text
<first-author-surname>-<year>-<short-title>
```

Use lowercase ASCII kebab-case. The short title is a human-selected mnemonic
that produces **2–4 hyphen-separated words**, normally from the paper title or
its established terminology. For example:

```text
joreskog-1994-polychoric-correlations
```

Include surname particles where appropriate, as in `de-la-torre`. Automatic
transliteration is a draft; inspect it and use the scaffolder's
`--author-slug` option when a curated form is needed.

The key is derived from metadata at creation. Avoid unnecessary renames, but
do not add aliases or redirect stubs when a key changes. Prefer a more specific
title mnemonic over an arbitrary numeric suffix when resolving a collision.

## Workflow

### 1. Inspect and reconcile

Check the working tree and preserve unrelated edits. Search the existing
registry by normalized DOI and by title/author/year before creating anything.
An existing page should be improved rather than duplicated.

If the corresponding Zotero item is needed, use the available Zotero search
tools in this order:

1. exact normalized DOI match;
2. normalized title + year + first-author match;
3. broader title search, returning candidates for review.

Normalize title matching by ignoring case, punctuation, and extra whitespace.
Do not silently select a fuzzy or ambiguous match. Topics and model tags aid
discovery but do not establish identity. The public entry does not need to
record the Zotero lookup result.

### 2. Verify bibliographic metadata

Verify `title`, `authors`, `year`, `venue`, and DOI against Crossref before
committing. The scaffolder calls Crossref's `/works/{doi}` endpoint and uses
the returned `issued` year, first author, title, and container title. Treat
that response as verified starting metadata, not as permission to skip
inspection: records can be incomplete, contain markup, or use a different
publication-year convention from the reference being described.

Do not trust a recalled DOI. If Crossref cannot resolve the DOI or lacks a
required field, stop and resolve the bibliographic discrepancy rather than
inventing metadata.

### 3. Scaffold the entry

From the repository root, run:

```sh
bun run registry:new -- <doi> --short-title "<2–4 words>"
```

For example:

```sh
bun run registry:new -- 10.1007/BF02296131 \
  --short-title "polychoric correlations"
```

Use `--author-slug <slug>` only when the automatic surname transliteration
needs correction. The script refuses duplicate normalized DOIs, duplicate
current keys, invalid key shapes, and existing output files.

The generated file intentionally has `status: stub`, empty authoring fields,
and TODO markers. It is a working draft, not a finished registry record. Do
not commit it until all required content is present and verified. Temporary
dummy entries used to test tooling must live outside the canonical registry
or be removed before committing.

### 4. Complete the entry

Required frontmatter fields are:

| Field | Requirement |
| --- | --- |
| `key` | Semantic key equal to the filename basename |
| `title`, `authors`, `year`, `venue`, `doi` | Verified bibliographic metadata |
| `model` | Concise statement of the model or methodological focus |
| `topics` | Non-empty array of lowercase topic tags, matching topic pages where applicable |
| `reviewed` | Real `YYYY-MM-DD` date on which the entry was written or last checked |
| `description` | Useful summary for indexes, popovers, and the properties panel |

The body must contain `Reference`, `Publisher abstract`, `Model`, and
`Likelihood` sections. Follow these content rules:

- Give a DOI link in `Reference`; cite by DOI rather than memory.
- Copy the publisher abstract or officially supplied extract verbatim under
  `Publisher abstract`, inside a blockquote. Label an extract as such. Check
  the publisher source; do not silently convert or trust markup from an API
  response. If the publisher supplies neither an abstract nor an extract,
  state that explicitly and never substitute the paper's introduction or a
  generated summary. Crossref can corroborate publisher wording but is not a
  substitute for publisher inspection.
- Never include full text or an excerpt beyond the abstract or extract.
- Define the model, central equations, symbols, and assumptions. Use `$...$`
  for inline math and fenced `$$` blocks for display math. If equation
  extraction is garbled or glyph identity is uncertain, verify the original
  visually before publishing it; cross-source reconstruction alone is not
  visual verification.
- State the likelihood and relevant estimation structure faithfully to the
  source's estimands and algorithms. Do not infer modern MML, EM, or item
  calibration from a model's later descendants. Distinguish equations given
  in the main text, equations from supplementary material, and reconstructions.
- Keep the default entry focused on Model and Likelihood. Add a standalone
  Derivation section only when requested or when it is central to
  understanding the paper, and label reconstructed algebra explicitly.
- Add only descriptive methodological notes and relationships. No personal
  assessments, verdicts, private paths, or project-specific logistics.
- Link related papers and concepts with their qpsy keys or vault-native
  wikilinks. Never link through a citation key.
- Remove every TODO and `status: stub` only when the entry contains real,
  checked content.

### 5. Validate and integrate

Run the standalone structural check while editing:

```sh
bun run registry:check
```

Before completing the change, also run:

```sh
bun test
bun run build
```

The index/build path runs the same registry validation and regenerates
`llms.txt`, `registry.json`, and `graph.json`. Validation rejects unfinished
stubs and TODO markers as well as structural errors. These are build outputs;
never hand-edit them. `registry.json` exposes current keys, normalized DOIs,
bibliographic metadata, topics, and canonical URLs for agent lookup.

Check the diff for unrelated work, temporary papers, TODOs, generated files,
and accidental citation-key fields. Run `git diff --check`. For entries with
mathematics, inspect the rendered page as well as the successful build.

## Renames

When a key changes, move the file with `git mv`, update `key` to equal the new
basename, update internal references, and rerun validation. Do not add aliases,
redirect stubs, or historical URL checks; preserving human-facing URLs is not a
registry goal.

## Completion standard

A registry change is complete when every entry has a unique semantic key and
normalized DOI, required metadata and body sections are present, bibliographic
facts and abstract wording are verified, Zotero matching is reproducible from
public metadata when needed, no Better BibTeX dependency or temporary fixture
remains, and tests plus the full build pass.
