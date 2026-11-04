---
name: paper-registry
description: Create, reconcile, rename, and validate qpsy paper-registry entries using verified bibliographic metadata, semantic author-year-title keys, DOI-based identity, and neutral methodological summaries. Use when registering a paper, finding its registry entry or corresponding Zotero item, changing registry identity, or repairing registry validation. Do not use for multi-source concept-note synthesis (use material-ingestion) or for merely citing a paper without maintaining the registry.
---

# Paper Registry

Maintain one descriptive, verified Markdown page per paper. The registry is a
public methodological knowledge base, not a mirror of a personal bibliography.
Keep local page identity, external bibliographic identity, and Zotero lookup
separate.

Follow `AGENTS.md` and load `obsidian-markdown` when authoring entries. For a
collection of sources being synthesized into concept notes rather than routine
one-page-per-paper records, use `material-ingestion` as well.

## Identity model

- **`key` is the qpsy address.** It equals the filename basename under
  `content/registry/` and is used for internal links.
- **DOI is the bibliographic identity.** It is the primary exact-match field
  for external services and Zotero. Compare DOIs after removing `doi:` or DOI
  resolver prefixes, decoding percent escapes, and ignoring case.
- **`aliases` contains former qpsy keys only.** Write each as
  `./former-key`, which Quartz resolves relative to the entry and therefore
  redirects the old `/registry/former-key` address. A bare alias would
  incorrectly redirect from the site root. Do not put Zotero item keys,
  citation keys, or alternate titles in this field.
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

The key is derived from metadata only at creation. Freeze it afterward: do not
rename automatically after a metadata correction, and never reuse a published
key for a different paper. Prefer a more specific title mnemonic over an
arbitrary numeric suffix when resolving a collision.

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
current or aliased keys, invalid key shapes, and existing output files.

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
| `aliases` | Optional array of former qpsy keys only, each written `./former-key` |

The body must contain `Reference`, `Publisher abstract`, `Model`, and
`Likelihood` sections. Follow these content rules:

- Give a DOI link in `Reference`; cite by DOI rather than memory.
- Copy the publisher abstract verbatim under `Publisher abstract`, inside a
  blockquote. Check the publisher source; do not silently convert or trust
  markup from an API response.
- Never include full text or an excerpt beyond the abstract.
- Define the model, central equations, symbols, and assumptions. Use `$...$`
  for inline math and fenced `$$` blocks for display math.
- State the likelihood and relevant estimation structure. Clearly distinguish
  reconstruction from equations explicitly given in the paper.
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
normalized former-key aliases without the `./` prefix, bibliographic metadata,
topics, and canonical URLs for agent lookup.

Check the diff for unrelated work, temporary papers, TODOs, generated files,
and accidental citation-key fields. Run `git diff --check`. For entries with
mathematics, inspect the rendered page as well as the successful build.

## Exceptional renames

Avoid renaming a published entry. If a rename is unavoidable:

1. Move the file with `git mv` so history is retained.
2. Update `key` to equal the new basename.
3. Add the former qpsy key as `./former-key` in `aliases`; retain all earlier
   aliases.
4. Update internal references to the new key.
5. Confirm that Quartz emits the old-address redirect and that registry
   validation finds no key/alias collisions.

An alias is a permanent reservation. Never transfer it to another paper.

## Completion standard

A registry change is complete when every entry has a unique semantic key and
normalized DOI, required metadata and body sections are present, bibliographic
facts and abstract wording are verified, Zotero matching is reproducible from
public metadata when needed, no Better BibTeX dependency or temporary fixture
remains, and tests plus the full build pass.
