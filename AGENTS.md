# qpsy agent notes

qpsy is a public documentation site for quantitative psychology. Agents
developing this repository follow the rules below. Everything here is
maintained with bun; never invoke npm or node directly. This includes
dependency management and running tools: use `bun install`, `bun add`,
`bun run <script>`, and `bunx <tool>` (or `bun <file>`) — never `npm`,
`npx`, or `node`. Quartz's upstream documentation is npm-flavored; always
translate its commands to the bun equivalents.

## Layout

The repository root is a Quartz *project*; see README.md for the table.

- `content/` is the canonical vault (Obsidian-shaped Markdown).
- `quartz.config.yaml` is the committed publisher configuration; plugin
  versions are pinned in `scripts/bootstrap-quartz.mjs` (npm-sourced,
  prebuilt).
- `.quartz-engine/` is the pinned Quartz engine, gitignored build tooling
  fetched by `bun run bootstrap` (`scripts/bootstrap-quartz.mjs`). Never
  edit or commit it; upgrades happen by bumping the pin in that script.
- Builds run from inside `.quartz-engine/` with the project files
  symlinked in; the package.json scripts handle this.
- `README.md` and this file live outside `content/` and are not published.

## Generated files

Everything in `public/` is a build output, gitignored. Never hand-edit it.
`bun scripts/build-index.mjs` (alias `bun run index`) regenerates the
qpsy-owned machine surfaces — `llms.txt`, `registry.json`, and `graph.json`
— from `content/` and runs as part of dev and build. Quartz's own
`contentIndex.json` is a renderer artifact; agents and tooling must depend
only on the qpsy-owned surfaces.

## Registry invariants

One markdown file per paper under `registry/`, filename equal to `key`.

- Metadata (`title`, `authors`, `year`, `venue`, `doi`) is verified against
  Crossref before committing. Do not trust recalled DOIs.
- Entries are descriptive only. No personal assessment, no verdicts.
- The publisher abstract is quoted verbatim, inside a blockquote, under the
  heading "Publisher abstract", with the DOI link in the Reference section.
- Never include full text or any excerpt beyond the abstract.
- Every entry carries Model and Likelihood sections; these two characterize
  the model. Math uses `$...$` and `$$...$$` (rendered by KaTeX via Quartz).
- `topics` values are lowercase tags matching topic pages where applicable.

## Page conventions

- Frontmatter `description` is maintained on every page; it feeds `llms.txt`,
  popovers, and the properties panel (Obsidian convention).
- Internal links: wikilinks (`[[page]]`) are the vault-native form; absolute
  Markdown links (`/topics/foundations/probability`) also resolve. Folder
  pages link with a trailing slash (`/topics/anova/`).
- A page carries `status: stub` in frontmatter until its content is real.
  Remove the marker when the page is filled in.
- Volatile pages (venue comparisons, process descriptions) carry a visible
  "Last verified" date line and get re-verified, not trusted, on reuse.
- Neutral voice, no first person. Cite papers by DOI, not by memory.

## Skill reflection and improvement

During every task—not only ingestion or content consolidation—evaluate where
current workflows, instructions, and skills are insufficient, unclear, or
otherwise not good enough. Look for recurring friction, missing safeguards,
and avoidable rework, distinguishing transferable lessons from one-off issues.

When a lesson could improve a skill, propose the concrete revision and its
rationale to the user. If no skill covers a recurring need, propose a new one.
Do not treat current skills as finished or rewrite them without user review.
Do not manufacture proposals for one-off issues or let reflection displace the
requested work.

## Commits and deploys

Conventional commits. Deployment is config-file driven; never change Worker
settings in the Cloudflare dashboard — `wrangler.jsonc` is the source of
truth (assets-only Worker `qpsy`, output `public/`, custom domain qpsy.dev).

- Push to `main` triggers Cloudflare Workers Builds (the repo's git
  integration), which runs the `build.command` from `wrangler.jsonc`
  (`bun install && bun run build`) and deploys.
- Local deploy: `bun run deploy` (after `bunx wrangler login`).
