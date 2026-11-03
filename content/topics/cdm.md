---
status: stub
description: Attribute-level measurement with the Q-matrix and DINA family models
---

# Cognitive Diagnosis Models

Cognitive diagnosis models (CDMs) measure fine-grained attributes rather than
a single overall trait. They answer a different question than an IRT scale:
not how much ability a person has, but which skills they have mastered.

## Purpose and fit

CDMs suit diagnostic settings where feedback at the attribute level is the
deliverable: remediation, licensing, placement. They require items that map
to attributes, and they pay for that with a heavier specification burden.

## The Q-matrix

The $J \times K$ binary matrix $\mathbf{Q}$ declares which attributes each
item requires. It is an input, not an estimate, and misspecification of
$\mathbf{Q}$ propagates directly into classification.

## Model families

- DINA: conjunctive, all required attributes must be mastered; slip $s_j$ and
  guess $g_j$ per item.
- DINO: disjunctive, any single required attribute suffices.
- G-DINA: general framework nesting DINA, DINO, and additive models.
- LCDM: log-linear constraint form, useful for theory-driven specification.

## Estimation

[Marginal maximum likelihood](/modeling/maximum-likelihood) with
[EM](/modeling/em-algorithm) is standard. The latent classes are the
$2^K$ attribute profiles; model complexity grows exponentially in $K$.

## Failure modes

- $\mathbf{Q}$ misspecification, the dominant practical error.
- Attribute alignment between items and the construct theory.
- Overfitting with sparse attribute profiles at small $N$.

## Registry

Registry entries tagged `CDM` list the papers reviewed for this topic.
