---
description: Classical test theory — the observed, true, and error score model, its assumptions and derived identities, parallel through congeneric test families, the standard error of measurement, and the correction for attenuation
---

# Classical Test Theory

Classical test theory (CTT) is a score-level model of measurement error. Every
observed score is decomposed into a true score and an error score, and the
quantities the theory works with — reliability, the standard error of
measurement, the correction for attenuation — are all derived from that
decomposition. The applied companion pages develop
[reliability designs](/topics/measurement/reliability) and
[internal-consistency coefficients](/topics/measurement/internal-consistency);
this page states the model itself.

## The score decomposition

For a fixed test form administered to a person,

$$
X = T + E,
$$

where $X$ is the observed score, $T$ the true score, and $E$ the error score.
The true score is a latent quantity: the expected observed score across
independent repetitions of the same measurement procedure applied to the same
person,

$$
T = \mathbb{E}[X],
$$

so that $E = X - T$ contains everything about the occasion that departs from
that expectation. A true score is defined relative to a particular test form
and a particular population of examinees; it is a property of scores on that
test, not a direct measurement of the underlying construct. Whether the true
score tracks the construct the test claims to measure is a question of
[validity](/topics/measurement/validity), not of the error model.

## Assumptions

The classical model rests on five assumptions, stated for one or two
measurements:

1. $X = T + E$: the observed score is the sum of the true score and the error
   score.
2. $\mathbb{E}[X] = T$: the expected observed score equals the true score.
3. $\rho_{ET} = 0$: error scores and true scores are uncorrelated within a
   test.
4. $\rho_{E_1 E_2} = 0$: error scores from two different tests are
   uncorrelated.
5. $\rho_{E_1 T_2} = 0$: the error score of one test is uncorrelated with the
   true score of another test.

Assumptions 3–5 say that error behaves like noise: it carries no information
about true standing anywhere in the system.

## Derived identities

Assumption 2 gives $\mathbb{E}[E] = 0$, and assumption 3 gives
$\sigma_{ET} = 0$. The observed-score variance therefore decomposes into true
and error parts:

$$
\sigma_X^2 = \sigma_T^2 + \sigma_E^2.
$$

Because $\operatorname{cov}(X, T) = \operatorname{cov}(T + E, T) =
\sigma_T^2$, the correlation between observed and true scores — the
**reliability index** $\rho_{XT}$ — satisfies

$$
\rho_{XT}^2 = \frac{\sigma_T^2}{\sigma_X^2} = 1 - \frac{\sigma_E^2}{\sigma_X^2}.
$$

The squared observed–true correlation is thus the proportion of observed-score
variance attributable to true differences, and this ratio is the population
**reliability coefficient** (see [reliability](/topics/measurement/reliability)).
Across two tests, assumption 4 makes observed covariances equal true-score
covariances, $\sigma_{X_1 X_2} = \sigma_{T_1 T_2}$ — the identity that
[change scores](/topics/measurement/change-scores) build on.

## Test families: parallel to congeneric

Reliability formulas differ in how much they assume about the relationship
between two measurements. Let $X_1$ and $X_2$ each satisfy the five
assumptions above. The standard families impose successively weaker
restrictions on their true scores:

| Family | Definition | Free to differ |
| --- | --- | --- |
| Parallel | $T_1 = T_2$ and $\sigma_{E_1}^2 = \sigma_{E_2}^2$ | nothing relevant: same observed means, variances, reliabilities |
| Tau-equivalent | $T_1 = T_2$ | error variances, hence observed variances and reliabilities |
| Essentially tau-equivalent | $T_1 = T_2 + c$ for a constant $c$ | error variances and the constant offset in observed means |
| Congeneric | $T_1 = a + b\,T_2$ with $b \ne 0$ | everything linear rescaling allows, including scale units |

The families are nested: parallel measures are tau-equivalent, tau-equivalent
measures are essentially tau-equivalent, and essentially tau-equivalent
measures are congeneric. The one-factor model
$X_j = \mu_j + \lambda_j \theta + e_j$ realizes the congeneric family, with
the loading $\lambda_j$ carrying the scale relationship; that model and the
reliability coefficients built on it are treated in [factor models and
reliability](/topics/measurement/factor-analysis).

These are restrictions on the true-score variables themselves. Restatements
such as "the two tests have the same true-score variance" are strictly weaker
and do not define the families: two different true-score variables can share
a variance, and adding a constant to a true score leaves its variance
unchanged. The definitions above, not their variance consequences, are what
the formulas require.

## Results under parallelism

If $X$ and $X'$ are parallel forms, three further identities hold.

**Reliability equals the correlation between parallel forms.**

$$
\rho_{XT}^2 = \rho_{XX'},
$$

which is what makes reliability estimable at all: the correlation between two
parallel administrations of the same construct estimates the proportion of
true-score variance, without requiring access to $T$ itself. The
[reliability page](/topics/measurement/reliability) examines how close real
designs come to this ideal.

**True-score variance equals the observed covariance between parallel forms.**

$$
\sigma_T^2 = \sigma_{XX'}.
$$

**Error variance and the standard error of measurement.**

$$
\sigma_E^2 = \sigma_X^2\left(1 - \rho_{XX'}\right),
\qquad
\sigma_E = \sigma_X \sqrt{1 - \rho_{XX'}}.
$$

The square root $\sigma_E$ is the **standard error of measurement** (SEM). It
is expressed in the raw units of the score and describes the typical
departure of an observed score from its true score over independent
replications of the measurement. The formula versions above assume the error
variance is the same for every examinee; in practice the standard error of
measurement varies with true standing, and the single $\sigma_E$ is an
average over the population.

**Sums of parallel components.** If $X = \sum_{j=1}^{N} Y_j$ where the $Y_j$
are parallel measures with common true score $T_Y$ and common error variance,
the true parts add deterministically:

$$
\sigma_{T_X}^2 = N^2 \sigma_{T_Y}^2.
$$

True signal accumulates in proportion to $N^2$ while error accumulates in
proportion to $N$ only, which is why lengthening a test raises reliability —
an effect quantified by the [Spearman–Brown
formula](/topics/measurement/reliability).

## Correction for attenuation

Observed correlations are dampened by the unreliability of both measures.
Under the classical assumptions, the correlation between the true scores of
two instruments can be recovered from the observed correlation:

$$
\rho_{T_X T_Z} = \frac{\rho_{XZ}}{\sqrt{\rho_{XX'} \rho_{ZZ'}}}.
$$

The correction removes the attenuation caused by random error in $X$ and in
$Z$; it requires defensible reliability coefficients for both measures and
uncorrelated errors within and across the two instruments. Corrected values
inherit and magnify the sampling error of every input: in a sample, the right
side can exceed $\pm 1$, which signals estimation noise rather than a
population possibility. The correction is a modeling statement, not a free
upgrade of a weak correlation; compare the selection-based corrections in
[range restriction](/topics/measurement/range-restriction).

## Relation to item response theory

CTT is sometimes summarized as making "no latent variable assumption." That
summary is not accurate: the true score $T$ is latent and unobservable. The
accurate contrast concerns the level of modeling. CTT models a single score
per person — one true score and one error for a fixed test form — and imposes
no structure on individual item responses. [Item response
theory](/topics/irt) instead writes each response as a function of a latent
trait $\theta$ and item parameters, so that item difficulty, discrimination,
and information become properties of items rather than of the sample that
happened to be measured (see [classical item
analysis](/topics/measurement/item-analysis) for the sample-dependent
classical analogues). CTT asks less of the data and answers score-level
questions — the reliability of a fixed form, the standard error of a total
score — while IRT pays for item-level structure with stronger data
requirements.

## Failure modes

- **Correlated errors.** Carry-over between administrations, shared method
  variance, and rater effects violate assumptions 4 and 5. Correlated error
  behaves like signal and inflates reliability coefficients; consistency
  across raters is better handled with the designs in [rater agreement and
  intraclass correlation](/topics/measurement/rater-agreement).
- **Form- and population-relativity.** True score, reliability, and SEM are
  defined for a given form in a given population. A coefficient borrowed from
  another sample or another instrument describes that context, not the scores
  at hand.
- **Constant-SEM simplification.** Conditional standard errors typically vary
  across the score scale; the single SEM hides that variation.
- **Fragile corrections.** The attenuation correction divides by uncertain
  quantities and can leave the correlation parameter space in samples.
- **Estimation noise.** The identities are population statements. Small
  samples produce estimates that violate them — negative reliability
  estimates occur, as a split-half example in [internal
  consistency](/topics/measurement/internal-consistency) shows.

## Where the model is applied

The decomposition above is the engine behind every coefficient in this
collection: [reliability designs](/topics/measurement/reliability) estimate
$\sigma_T^2/\sigma_X^2$ from real designs, [factor models and
reliability](/topics/measurement/factor-analysis) relax tau-equivalence to
congeneric structure, [change scores](/topics/measurement/change-scores)
propagate the error model through differences, and [composite
scores](/topics/measurement/composite-scores) extend it to weighted sums of
unequally reliable parts.
