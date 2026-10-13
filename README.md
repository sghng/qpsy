# qpsy

A documentation layer for quantitative psychology. It reads as documentation,
but the content is research knowledge: method families, statistical modeling
practice, research conventions, writing standards, and a paper review
registry.

Site: [qpsy.dev](https://qpsy.dev). Source: this repository.

## Structure

| Path | Content |
| --- | --- |
| `index.md` | homepage, including the agent guide |
| `notation.md` | symbol conventions used across the site |
| `topics/` | curated method families (CDM, IRT, ...) |
| `modeling/` | the statistical modeling workflow |
| `research/` | methodology, pipeline, venues, peer review |
| `writing/` | academic writing conventions |
| `registry/` | one markdown file per reviewed paper |
| `scripts/build-index.mjs` | generates the agent surfaces |
| `.vitepress/` | VitePress config and theme |

## Tooling

Bun only. No npm, no node invocations.

```sh
bun install
bun run dev      # regenerate indexes, serve with live reload
bun run build    # regenerate indexes, build to .vitepress/dist
bun run preview  # serve the production build locally
```

## Agent surfaces

Two files are generated at the site root on every build and must never be
hand-edited (`bun run index` regenerates them):

- `/llms.txt` lists every page with a one-line description.
- `/registry.json` is a flat structured index of the paper registry.

## Adding a registry entry

1. Verify the paper's metadata against Crossref for its DOI.
2. Create `registry/<key>.md`, where `<key>` is `firstauthor-year`, with the
   frontmatter schema in [registry/index.md](/registry/).
3. Write the Model and Likelihood sections, quote the publisher abstract
   verbatim under "Publisher abstract", and stop there. Entries are
   descriptive only. No full text, no excerpts beyond the abstract.
4. Run `bun run index` and commit.

## Deployment

Cloudflare Pages, Git integration from `main`.

- Build command: `bun install && bun run build`
- Build output directory: `.vitepress/dist`
- Environment variable: `SKIP_DEPENDENCY_INSTALL=true` (Pages does not detect
  the text `bun.lock`, so the automatic installer would fall back to npm)
- Optional: pin `BUN_VERSION` to the local `bun -v` to keep build parity

Every push to `main` deploys. Pull requests get preview URLs.

## License

MIT. See [LICENSE](LICENSE).
