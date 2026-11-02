# qpsy

qpsy is a public, agent-first knowledge vault for quantitative research. It is
intended to give an agent one self-contained reference system for the knowledge
it needs to perform quantitative research effectively. The website is human
readable, but agent infrastructure takes priority over the browsing experience.

Site: [qpsy.dev](https://qpsy.dev). Source: this repository.

## Purpose and scope

qpsy is a project-independent reference and manual, not a lab notebook. It does
not contain the data, procedures, decisions, or status of particular research
projects. Agents working on any project should be able to consult it for methods,
modeling practice, research conventions, writing standards, and paper-level
methodological knowledge.

Coverage should be comprehensive for graduate-level and advanced material.
Foundational and undergraduate material is included selectively when it supports
that body of knowledge; qpsy does not need a page for every elementary topic.
Initial coverage is driven by methods used in the maintainer's research, with
broader contributions from other users expected over time.

## Paper registry

The registry complements abstract-oriented discovery services such as OpenAlex
and Semantic Scholar. Its purpose is to make the methodological core of papers
structured and retrievable: model definitions, likelihoods, central equations,
assumptions, and relationships to other models and papers.

Entries are neutral and evidence-bound rather than evaluative. Metadata is
verified, DOIs provide the retrieval path, and qpsy is not a full-text archive.
The registry supports both direct lookup and deeper synthesis across papers.

## Architecture and methodology

### Markdown is the source of truth

The canonical substrate is a Git-versioned Markdown vault in Obsidian shape:
frontmatter, stable page identities, explicit sources, and `[[wikilinks]]`
connecting related ideas. The repository can be cloned and opened in Obsidian or
mounted directly as an agent reference directory. Quartz, Context7, and search
indexes are consumers of this content, not its source of truth.

### Quartz publishes the vault

Quartz 5 renders the vault as a static website. It is the publishing layer, not
the substrate, and can be replaced without changing the knowledge corpus. The
useful graph is the machine-traversable link structure, not merely its visual
representation.

### Agents have several access paths

- Fetch the website and its clean Markdown and structured indexes.
- Use `/llms.txt` for discovery, `/registry.json` for registry metadata, and
  `/graph.json` for the link graph.
- Clone or fetch raw files from GitHub for local inspection and indexing.
- Query the public content through Context7, which indexes documentation rather
  than only source code and provides another retrieval and distribution path.

Generated indexes are build outputs and must never be hand-edited.

### Retrieval is a separate layer

Web fetching, Context7, local search, and future hybrid or graph-aware retrieval
can coexist without changing the vault. Retrieval should support an agent loop
of searching, reading complete passages, following links, and gathering enough
evidence—not only returning isolated snippets. Retrieval technology should be
evaluated against real qpsy queries before new infrastructure is adopted.

## Repository layout

| Path | Content |
| --- | --- |
| `content/` | the canonical vault: `topics/`, `modeling/`, `research/`, `writing/`, `registry/`, the homepage, and notation |
| `quartz.config.yaml` | publisher configuration (Quartz 5) |
| `.quartz-engine/` | pinned Quartz engine, gitignored, fetched by `bun run bootstrap` |
| `scripts/build-index.mjs` | generates `llms.txt`, `registry.json`, `graph.json` |
| `scripts/bootstrap-quartz.mjs` | fetches the pinned engine and links the project into it |

The publisher is not a fork: the engine is disposable tooling (like
`node_modules`), and only the project files above are committed. Upgrades
happen by bumping the pin in `scripts/bootstrap-quartz.mjs`.

Everything is maintained with Bun; never invoke npm or node directly.

```sh
bun install
bun run bootstrap  # fetch the pinned Quartz engine (once per engine version)
bun run dev        # build and serve with hot reload
bun run build      # full build into public/, then regenerate agent indexes
```

## License

MIT. See [LICENSE](LICENSE).
