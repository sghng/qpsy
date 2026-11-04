---
description: Structured entries for reviewed papers
---

# Registry

The registry records papers reviewed for research, one page per paper.
Entries are descriptive only: the model, the likelihood function, and the
publisher abstract quoted verbatim with attribution. Entries never contain
full text; the DOI is the retrieval path.

<RegistryTable />

## Schema

| Field | Meaning |
| --- | --- |
| `key` | stable qpsy identifier, `firstauthor-year-short-title`, equal to the filename basename |
| `title`, `authors`, `year`, `venue` | bibliographic fields |
| `doi` | canonical external identity and retrieval path; metadata verified against Crossref |
| `model` | short model name, what the paper characterizes |
| `topics` | non-empty lowercase tags linking the entry to topic pages |
| `reviewed` | date the entry was written or last checked |
| `description` | summary used by indexes, popovers, and the properties panel |

Entry pages carry the model description and the likelihood function, the two
things that basically characterize a model, plus the publisher abstract.

## Naming and external lookup

New keys use lowercase ASCII kebab-case in the form
`firstauthor-year-short-title`. The short title is a curated 2–4-word
mnemonic, as in `joreskog-1994-polychoric-correlations`. Avoid unnecessary
renames, but the registry does not maintain aliases or redirects for old URLs;
agents should use the current machine indexes.

Better BibTeX and other personal citation keys are not registry fields. To
find a corresponding Zotero item, match the normalized DOI first, then title,
year, and first author. Broader title matches require review rather than
silent selection.

## Adding an entry

1. Search for an existing normalized DOI or bibliographic match.
2. Scaffold the entry from Crossref with a curated title mnemonic:

   ```sh
   bun run registry:new -- <doi> --short-title "<2–4 words>"
   ```

3. Inspect the Crossref metadata, complete every required field, and replace
   all TODO markers with verified content. Quote the publisher abstract
   verbatim under "Publisher abstract"; remove `status: stub` only when the
   entry is complete.
4. Run `bun run registry:check` for structural validation, then `bun test`
   and `bun run build`. The build regenerates `registry.json`, `llms.txt`,
   and `graph.json`; never hand-edit those outputs.

The full authoring and reconciliation workflow is in
`.agents/skills/paper-registry/SKILL.md`.
