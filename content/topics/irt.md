---
status: stub
description: Latent trait models for item responses, from 2PL to polytomous families
---

# Item Response Theory

Item response theory (IRT) models the probability of an item response as a
function of a latent trait and item parameters. It is the workhorse of
measurement in psychology: scale construction, item banking, and
cross-group comparability all rest on it.

## Purpose and fit

IRT suits settings where the items are exchangeable probes of one trait and
person and item parameters both matter. When only the sum score matters and
items are few, [classical test theory](/topics/measurement/classical-test-theory)
and [classical item analysis](/topics/measurement/item-analysis) are often
sufficient.

## Core models

- 1PL/Rasch: item difficulty only.
- 2PL: difficulty plus discrimination.
- 3PL: adds a lower asymptote for guessing.
- GRM and GPCM: polytomous responses, ordered categories.
- Mixture and multidimensional extensions when one trait is not enough.

## Estimation

[Marginal maximum likelihood](/modeling/maximum-likelihood), usually
computed with [EM](/modeling/em-algorithm), is the default. Bayesian
estimation wins when
item parameters are weakly identified by the data at hand, small $N$, few
items, or extreme difficulties.

## Diagnostics

Item fit, local independence violations, differential item functioning, and
information functions in place of reliability coefficients.

## Registry

Registry entries tagged `IRT` list the papers reviewed for this topic.
