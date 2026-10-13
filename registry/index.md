---
desc: Structured entries for reviewed papers
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
| `key` | short stable identifier, `firstauthor-year` |
| `title`, `authors`, `year`, `venue` | bibliographic fields |
| `doi` | the retrieval path; metadata verified against Crossref |
| `model` | short model name, what the paper characterizes |
| `topics` | tags linking the entry to topic pages |
| `reviewed` | date the entry was written or last checked |

Entry pages carry the model description and the likelihood function, the two
things that basically characterize a model, plus the publisher abstract.

## Adding an entry

1. Verify metadata against Crossref for the DOI.
2. Create `registry/<key>.md` with the frontmatter schema above.
3. Write Model and Likelihood sections; quote the abstract verbatim under
   "Publisher abstract".
4. Run `bun run index`; the table, `registry.json`, and `llms.txt` regenerate.
