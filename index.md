---
desc: A documentation layer for quantitative psychology
---

# qpsy

qpsy is a documentation layer for quantitative psychology. It reads as ordinary
documentation, but the content is research knowledge: method families,
statistical modeling practice, research conventions, writing standards, and a
registry of reviewed papers.

It exists because generic statistics knowledge is already abundant in model
weights, textbooks, and reference sites. What is missing is the curated layer:
what a method is for, when it fits a design, and what it costs to use. qpsy
holds only that layer.

## Sections

- [Selected Topics](/topics/): method families relevant to quantitative
  psychology research, such as cognitive diagnosis models and item response
  theory.
- [Statistical Modeling](/modeling/): the modeling workflow, from
  specification and likelihood through estimation and fit.
- [Research](/research/): methodology, pipeline, venues, and peer review.
- [Academic Writing](/writing/): style and reporting conventions.
- [Registry](/registry/): structured entries for reviewed papers, descriptive
  only, with the DOI as the retrieval path.

[Notation](/notation) defines the symbols used across all sections.

## For agents

Two machine surfaces are maintained at the site root:

- `llms.txt` lists every page with a one-line description.
- `registry.json` is a flat, structured index of the paper registry: key,
  title, authors, year, venue, DOI, model, topics, and page URL.

To find a method page, fetch `llms.txt` first. To search the registry, fetch
`registry.json` and filter locally. Registry entries never contain full text;
use the DOI to retrieve the paper through your own access path.

qpsy lives at [github.com/sghng/qpsy](https://github.com/sghng/qpsy).
