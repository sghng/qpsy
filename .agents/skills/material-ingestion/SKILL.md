---
name: material-ingestion
description: Ingest slides, lecture notes, papers, and other source materials into durable, linked qpsy concept notes. Use when synthesizing a collection of external materials, designing note boundaries from sources, or coordinating parallel readers and writers. Do not use for a routine single-paper registry entry, a summary that will not become repository content, or unsourced writing from scratch.
---

# Material Ingestion

Turn source materials into durable knowledge, not a transcript or a set of
lecture summaries. Preserve evidence and provenance during ingestion, then
organize the public notes around concepts and their relationships.

Follow the repository conventions in `AGENTS.md` and load `obsidian-markdown`
when authoring Obsidian-shaped content.

## Principles

- **Concepts outrank source order.** A lecture, chapter, or file is evidence,
  not automatically a note boundary.
- **Synthesis is not transcription.** Explain ideas in original prose. Do not
  republish slide decks, textbook passages, or other source content.
- **One concept has one canonical home.** Other notes link to it rather than
  duplicating its definition or procedure.
- **Sources inform; they do not govern by authority.** Check ambiguous,
  simplified, or apparently incorrect claims before propagating them.
- **Provenance survives summarization.** Keep source and page or slide
  references in working notes until all factual and mathematical checks pass.
- **Public notes stay project-independent.** Remove course logistics, local
  paths, classroom anecdotes, assessment details, and personal commentary.

## Workflow

### 1. Inventory and scope

Inspect the source directory and existing repository before extracting content.
Check the working tree and read the relevant conventions.

Classify each input as:

- primary material;
- exercises, solutions, or speaker notes that clarify primary material;
- supplementary readings or reference tables;
- duplicate renderings of the same content.

Record the requested scope and exclusions. Do not assume that every supplied
file deserves a public note. Identify existing pages that could become the
canonical home for incoming material.

### 2. Extract without losing structure

Use a temporary workspace for converted files and intermediate briefs. Leave
originals unchanged and ask before installing missing software.

For slides and PDFs:

1. Convert editable slides to PDF when a reliable converter is available.
2. Extract layout-preserving text with explicit page or slide markers.
3. For PowerPoint sources, also extract text and equations directly from the
   slide XML, including Office Math Markup Language (OMML), before resorting to
   OCR. PDF conversion and plain text extraction can lose equations that remain
   intact in the editable source.
4. Extract speaker notes from the original slide package; PDF conversion does
   not preserve them.
5. Read exercises and solutions alongside the corresponding lecture.
6. Render pages as images for targeted visual inspection.

Text extraction is an index, not proof of completeness. Equations, diagrams,
tables, and text embedded in images may be absent or garbled. Flag such pages
for visual verification instead of silently filling gaps from memory.

Maintain a shared extraction ledger marking each file complete, partial, empty,
duplicated, or conflicting. This prevents every reader from rediscovering the
same extraction failures.

### 3. Commission independent source readings

For a multi-file collection, assign primary ownership of disjoint source
bundles to subagents. Readers may consult neighboring bundles for context, but
must identify those claims as secondary; the synthesis step names the
authoritative brief for each concept. Give every reader the same output
contract and require a working brief, not polished repository prose.

Preflight whether each reader can ingest images. Assign rendered slides,
handwritten solutions, and other image-dependent evidence to the `visual`
subagent or another vision-capable reader. Text-only readers must leave those
items explicitly open for visual handoff. OCR can help locate content, but it is
not visual verification and must not be reported as such.

Each source brief must contain:

- an exhaustive concept inventory with page or slide references;
- definitions, equations, assumptions, procedures, and example lessons;
- missing, garbled, or visually dependent passages requiring verification;
- ambiguities, internal inconsistencies, and possible source errors;
- candidate concept-note boundaries and relationships to other topics;
- a clear separation between source-supported claims and reader inferences.

Use a shared evidence vocabulary: `[slide]` for visible source content,
`[notes]` for speaker notes, `[recomputed]` for arithmetic derived from source
data, and `[inference]` for reader knowledge or reconstruction. Attach source
locations to all four categories; speaker notes still require verification.

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
- source pages supporting it;
- prerequisite and downstream links;
- unresolved claims requiring targeted reading.

Maintain one consolidated verification queue. Every missing-content flag,
ambiguity, and open question from every brief must be either resolved or
carried into that queue with its source location; none may disappear silently
between the brief and the note map.

Merge fragments that would only repeat a prerequisite. Split notes when
independently useful concepts require different assumptions or interpretations.
The result should form a useful knowledge graph even if the source order is
forgotten.

### 5. Verify targeted passages

Return to the original materials for every equation, visually dense slide,
unexpected claim, and disagreement between readers. Use practice solutions to
check procedures, not as a substitute for definitions or assumptions.
Recompute every worked numeric answer before reuse, including answers in
speaker notes and handwritten keys; record source errors rather than
propagating them or silently correcting them inside a quotation.

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

Every page needs frontmatter `desc`. Use neutral voice, consistent notation,
and stable links. Remove `status: stub` only when the page contains real,
checked content. Prefer one substantive example over a sequence of classroom
exercises.

### 7. Integrate and validate

Update section indexes and navigation so the notes are discoverable. Check
internal links, mathematical rendering, cross-note terminology, and coverage
against the source inventory. Public notes must not depend on temporary files
or private source paths.

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
across notes, and the repository builds successfully. A polished prose style
does not compensate for missing equations, unexamined figures, or unresolved
contradictions.
