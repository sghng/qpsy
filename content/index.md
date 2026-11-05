---
description: An agent-first knowledge vault for quantitative psychology
---

# qpsy

> [!important] Built for agents, not for reading
> qpsy is created for AI agents. The product is the Markdown vault and the
> machine interfaces and MCPs that index it for agents to read; this
> rendered website is only a byproduct. The pages can be read as educational
> material, but that is not what they are designed for, and nothing here is
> optimized for human study. To learn from this material, give it to an
> agent and let it teach you interactively.

qpsy holds curated research knowledge for quantitative psychology: method
families, statistical modeling practice, research conventions, writing
standards, and a registry of reviewed papers. Generic statistics knowledge
is already abundant in model weights, textbooks, and reference sites; qpsy
holds only the curated layer — what a method is for, when it fits a design,
and what it costs to use.

## Copyright and retrieval quality

For copyright reasons, qpsy does not reproduce the full text of any paper or
book. It provides curated notes, bibliographic references, and DOI links for
retrieval through your own access path. The [Resources](/resources) page lists the
canonical textbooks and reference works used in the vault.

Retrieval from qpsy alone is limited by the vault's coverage and by the passages
a retriever returns; relevant context in the primary sources may be missed. For
maximum accuracy, comprehensiveness, and utility, we recommend this personal
retrieval-augmented generation (RAG) setup:

1. **Connect your agent to qpsy.** Use the
   [Context7 MCP](https://context7.com/installation) with `/sghng/qpsy`.
2. **Connect your agent to Zotero.** Set up
   [Zotero MCP](https://stevenyuyy.com/zotero-mcp/) for your own Zotero library.
3. **Make the primary sources searchable.** Add your own full-text PDFs of the
   [canonical resources](/resources) and papers to Zotero, then enable Zotero
   MCP's semantic search.

Instruct your agent to consult the actual resources whenever it needs detail
that is not available in qpsy. The vault supplies the curated map; your Zotero
library supplies the primary text without that text being republished here.

*Zotero MCP capabilities last verified: November 4, 2026.*

## Using qpsy

The intended way in: give qpsy.dev to an agent or chatbot and let it show
you how to use the site. Copy a prompt below, paste it into any chatbot or
agent, and study interactively:

```text
How do I use qpsy.dev?
Based on qpsy.dev, teach me about ANOVA.
Based on qpsy.dev, when should I use a Welch t-test?
```

Three routes, from simplest to most involved:

1. **Point an agent at the site.** Share `qpsy.dev`, or any page URL, with
   an agent or chatbot and tell it to use the vault as the basis for
   learning quantitative psychology. The machine surfaces below tell the
   agent how to read everything else.
2. **Connect the Context7 MCP.** The vault is indexed by
   [Context7](https://context7.com) as `/sghng/qpsy`. Follow the
   [Context7 setup instructions](https://context7.com/installation) to add
   the MCP server to an agent or IDE, mention **qpsy** in the conversation,
   and study interactively from there.
3. **Clone the vault.** `git clone https://github.com/sghng/qpsy`, then
   open the `content/` folder in Obsidian to browse it locally, or hand the
   local vault to an agent.

## Chat with the vault

The chat bubble on every page answers questions from the vault's indexed
content. A visitor without an agent at hand can query qpsy directly there.

## For agents

Three machine surfaces are maintained at the site root:

- `llms.txt` lists every page with a one-line description.
- `registry.json` is a flat, structured index of the paper registry: key,
  title, authors, year, venue, DOI, model, topics, and page URL.
- `graph.json` is the link graph of the vault (nodes with slugs and
  descriptions, edges from internal links).

To find a method page, fetch `llms.txt` first. To search the registry, fetch
`registry.json` and filter locally. To traverse related material, use
`graph.json`. Registry entries never contain full text;
use the DOI to retrieve the paper through your own access path.

The vault is also indexed by Context7 (`/sghng/qpsy`) for agents connected
to that MCP.

## Sections

- [Selected Topics](/topics/): method families relevant to quantitative
  psychology research, such as cognitive diagnosis models and item response
  theory.
- [Statistical Modeling](/modeling/): the modeling workflow, from
  specification and likelihood through estimation and fit.
- [Research](/research/): methodology, pipeline, venues, and peer review.
- [Academic Writing](/writing/): style and reporting conventions.
- [Resources](/resources): canonical textbooks and reference works, with source
  tags and external retrieval links.
- [Registry](/registry/): structured entries for reviewed papers, descriptive
  only, with the DOI as the retrieval path.

[Notation](/notation) defines the symbols used across all sections.

qpsy lives at [github.com/sghng/qpsy](https://github.com/sghng/qpsy).
