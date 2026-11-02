# qpsy agent notes

qpsy is a public documentation site for quantitative psychology. Agents
developing this repository follow the rules below. Everything here is
maintained with bun; never invoke npm or node directly.

## Layout

See README.md for the table. The site source is the repository root;
`README.md` and this file are excluded from the site via `srcExclude`.

## Generated files

`public/llms.txt` and `public/registry.json` are build outputs, gitignored.
Never hand-edit them. `bun scripts/build-index.mjs` (alias `bun run index`)
regenerates both from the markdown sources and runs as part of dev, build,
and preview.

## Registry invariants

One markdown file per paper under `registry/`, filename equal to `key`.

- Metadata (`title`, `authors`, `year`, `venue`, `doi`) is verified against
  Crossref before committing. Do not trust recalled DOIs.
- Entries are descriptive only. No personal assessment, no verdicts.
- The publisher abstract is quoted verbatim, inside a blockquote, under the
  heading "Publisher abstract", with the DOI link in the Reference section.
- Never include full text or any excerpt beyond the abstract.
- Every entry carries Model and Likelihood sections; these two characterize
  the model. Math uses `$...$` and `$$...$$` (MathJax).
- `topics` values are lowercase tags matching topic pages where applicable.

## Page conventions

- Frontmatter `desc` is maintained on every page; it feeds `llms.txt`.
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

Conventional commits. Push to `main` triggers the Cloudflare Pages build
(bun install plus bun run build, output `.vitepress/dist`).
