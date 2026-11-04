---
name: material-ingestion
description: Ingest source materials of any format into durable, linked qpsy concept notes. Use when synthesizing a collection of external materials, designing note boundaries from sources, or coordinating parallel readers and writers. Do not use for a routine single-paper registry entry, a summary that will not become repository content, or unsourced writing from scratch.
---

# Material Ingestion

Turn source materials into durable knowledge, not a transcript or a set of
per-document summaries. Preserve evidence and provenance during ingestion,
then organize the public notes around concepts and their relationships.

The methodology is format-independent. Materials arrive in whatever form the
user supplies — files, books, articles, web pages, or mixed collections — and
no particular source type, directory layout, or extraction toolchain is
assumed. Choose extraction mechanics per job; the workflow below governs
evidence handling and synthesis regardless of format.

Follow the repository conventions in `AGENTS.md` and load `obsidian-markdown`
when authoring Obsidian-shaped content.

## Principles

- **Concepts outrank source order.** A single source, however it is
  structured, is evidence, not automatically a note boundary.
- **Synthesis is not transcription.** Explain ideas in original prose. Do not
  republish source content.
- **One concept has one canonical home.** Other notes link to it rather than
  duplicating its definition or procedure.
- **Sources inform; they do not govern by authority.** Check ambiguous,
  simplified, or apparently incorrect claims before propagating them.
- **Numbers are validated in code.** When values are involved — worked
  examples, derived statistics, arithmetic quoted from notes, or numbers
  constructed for a new example — run the math in Python or R. Mental
  arithmetic and recalled constants are drafts, not checks.
- **Provenance survives summarization.** Keep source references and locations
  in working notes until all factual and mathematical checks pass.
- **Public notes stay project-independent.** Remove logistics, local paths,
  anecdotes, and personal commentary that only make sense in the source's
  original context.

## Workflow

### 1. Inventory and scope

Inspect the supplied materials and existing repository before extracting
content. Check the working tree and read the relevant conventions.

Classify each input as:

- primary material;
- companion material (solutions, notes, appendices) that clarifies primary
  material;
- supplementary readings or reference material;
- duplicate renderings of the same content.

Record the requested scope and exclusions. Do not assume that every supplied
item deserves a public note. Identify existing pages that could become the
canonical home for incoming material.

### 2. Extract without losing structure

Use a temporary workspace for converted files and intermediate briefs. Leave
originals unchanged and ask before installing missing software.

Adapt the mechanics to the material at hand:

1. Extract content into a workable text form, preserving explicit
   source-location markers wherever the format provides them.
2. Prefer the richest available representation: editable or structured
   sources can retain content (equations, annotations, embedded data) that
   flattened renderings lose.
3. Read companion material alongside the corresponding primary material.
4. Use visual inspection for passages whose content does not survive text
   extraction.

Text extraction is an index, not proof of completeness. Equations, diagrams,
tables, and text embedded in images may be absent or garbled. Flag such
passages for visual verification instead of silently filling gaps from memory.

Maintain a shared extraction ledger marking each item complete, partial,
empty, duplicated, or conflicting. This prevents every reader from
rediscovering the same extraction failures.

### 3. Commission independent source readings

For a multi-source collection, assign primary ownership of disjoint source
bundles to subagents. Readers may consult neighboring bundles for context, but
must identify those claims as secondary; the synthesis step names the
authoritative brief for each concept. Give every reader the same output
contract and require a working brief, not polished repository prose.

Preflight whether each reader can ingest images. Assign image-dependent
evidence (figures, scanned or handwritten material, visually dense layouts)
to the `visual` subagent or another vision-capable reader. Text-only readers
must leave those items explicitly open for visual handoff. OCR can help locate
content, but it is not visual verification and must not be reported as such.

Each source brief must contain:

- an exhaustive concept inventory with source locations, covering procedures
  and conventions (including table- and diagram-reading conventions) as well
  as concepts and formulas, and marking passages the source emphasizes with
  dedicated space or repetition;
- definitions, equations, assumptions, procedures, and example lessons;
- missing, garbled, or visually dependent passages requiring verification;
- ambiguities, internal inconsistencies, and possible source errors;
- candidate concept-note boundaries and relationships to other topics;
- a clear separation between source-supported claims and reader inferences.

Use a shared evidence vocabulary: `[source]` for content present in the
material, `[supplement]` for accompanying notes or commentary, `[recomputed]`
for arithmetic derived from source data, and `[inference]` for reader
knowledge or reconstruction. Attach source locations to all four categories;
supplementary material still requires verification.

For a small job, one reader may produce the brief and note map, and the
conference may become a checklist self-review. Scale the coordination down,
not the verification requirements. Do not let multiple writers own the same
destination file. Do not begin full drafting while coverage and terminology
remain unreconciled.

### 4. Hold a synthesis conference

Compare the briefs as a group. Look for duplicated concepts, inconsistent
notation, missing prerequisites, contradictory claims, and competing note
boundaries. Send targeted follow-up questions to the original readers when
their source context is needed.

Create a note map before drafting. For every proposed note, record:

- its stable title and filename;
- the concepts it owns and the concepts explicitly left to other notes;
- source locations supporting it;
- prerequisite and downstream links;
- unresolved claims requiring targeted reading.

The note map must also trace coverage in the other direction: every substantive
item in each reader's inventory — concepts, procedures, and table or diagram
conventions — is assigned to a destination note and section, or explicitly
excluded with a recorded reason. "Accounted for" in a brief means the content
was extracted, not that it survived synthesis. Exclude items individually, not
by category: skipping repetitive worked examples, for example, does not
exclude the procedure those examples teach.

Maintain one consolidated verification queue. Every missing-content flag,
ambiguity, and open question from every brief must be either resolved or
carried into that queue with its source location; none may disappear silently
between the brief and the note map.

Merge fragments that would only repeat a prerequisite. Split notes when
independently useful concepts require different assumptions or interpretations.
The result should form a useful knowledge graph even if the source order is
forgotten.

### 5. Verify targeted passages

Return to the original materials for every equation, visually dense passage,
unexpected claim, and disagreement between readers. Use companion solutions or
worked answers to check procedures, not as a substitute for definitions or
assumptions. Recompute every worked numeric answer before reuse, including
answers in companion notes or handwritten keys. Validate the math by executing
it in Python or R — a scratch script or REPL session is enough — and keep the
script or transcript with the working notes; record source errors rather than
propagating them or silently correcting them inside a quotation.

When extraction garbles an equation but leaves a worked numeric example
legible, recompute that example under candidate readings. Agreement or
mismatch can diagnose missing radical signs, exponents, or fraction bars and
focus the visual check. Treat this as diagnostic evidence, not as a substitute
for inspecting the original equation; record the extraction failure and verify
the original before reusing the formula.

When the materials are unclear or wrong, consult an authoritative primary
source. Verify paper metadata and DOIs before citing them. Keep a distinction
between faithfully reporting a source's simplification and writing the more
precise claim needed in a durable reference. Do not hide unresolved uncertainty.

### 6. Draft against the note map

Assign writers disjoint files and give them the reconciled note map, relevant
source briefs, and verified excerpts. Writers may refine prose but must not
independently change the shared scope or notation.

Each note should contain only the structure needed for its concept, typically:

- a direct definition and purpose;
- core equations with every symbol introduced;
- assumptions and scope conditions;
- interpretation, procedure, or a compact worked example;
- common confusions and failure modes;
- links to prerequisites, alternatives, and downstream methods;
- references for source-specific or contested claims.

Every page needs frontmatter `description`. Use neutral voice, consistent
notation, and stable links. Remove `status: stub` only when the page contains
real, checked content. Prefer one substantive example over a sequence of
similar exercises.

### 7. Integrate and validate

Update section indexes and navigation so the notes are discoverable. Check
internal links, mathematical rendering, and cross-note terminology. Public
notes must not depend on temporary files or private source paths.

Run a concept-survival audit: trace substantive rows from each brief's
inventory — prioritizing passages the source gave dedicated space to — into
their assigned note sections, and confirm each appears there or has a recorded
exclusion. Coverage against the source inventory means this trace, not merely
that every source item was read. When the request or the materials include an
explicit checklist of objectives or required coverage, its items can also
serve as a final acceptance test of the notes.

Use an independent reviewer for high-impact collections when possible. Ask the
reviewer to check both fidelity to the sources and whether the synthesis omits
necessary qualifications.

Finally:

- run the repository's index and build commands;
- inspect the diff for unrelated changes and generated artifacts;
- run `git diff --check`;
- spot-check rendered mathematical and visually derived content;
- confirm that no unresolved placeholder or unsupported assertion remains.

## Completion standard

The ingestion is complete when each in-scope concept has one canonical home,
source-specific claims are traceable and verified, links form useful paths
across notes, and the repository builds successfully. A concept or procedure
extracted in a brief but absent from every note is an unrecorded exclusion;
resolve it or record why it was dropped. A polished prose style does not
compensate for missing equations, unexamined figures, or unresolved
contradictions.
