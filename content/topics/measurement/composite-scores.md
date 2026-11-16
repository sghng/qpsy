---
description: reliability of composite scores built from weighted parts — total error variance and the Horst formula, the required inputs including a supplied total variance, why applying Cronbach's alpha to subscale scores can mislead, a worked example, and stratified alpha for scales that are not unidimensional
---

# Reliability of Composite Scores

Many instruments report a score formed from parts: subscale totals combined
with chosen weights, as when a questionnaire's several subscales — some
containing reverse-keyed items recoded before scoring (see
[item and scale scoring](/topics/measurement/scoring)) — are summed into an
overall index. This page treats the reliability of such weighted composites.

For $m$ part scores $X_1, \ldots, X_m$ with weights $W_1, \ldots, W_m$, the
composite is

$$
X = \sum_{i=1}^{m} W_i X_i,
$$

with the unweighted composite (all $W_i = 1$) as the usual special case. The
parts typically measure related but distinct constructs and differ in
reliability, so two questions arise: what is the reliability of the weighted
sum, and can the usual internal-consistency machinery — in particular
coefficient alpha — be applied directly to it?

## Required quantities

Computing the reliability of a composite from its parts requires:

- the part variances $\sigma_{X_i}^2$ (sample: $S_{X_i}^2$),
- the part reliabilities $\rho_{ii'}$ (sample: $r_{ii'}$),
- the **total variance of the composite** $\sigma_X^2$ (sample: $S_X^2$), and
- the assumption that the measurement errors of the parts are uncorrelated.

The total variance must be supplied or computed from the full composite: it
contains the covariances among the parts, which the part variances and part
reliabilities do not determine. A table of part variances and reliabilities
alone cannot reconstruct the composite's variance.

## Error variance and the Horst reliability

Write each part in classical form, $X_i = T_i + E_i$. The composite's error is
$E = \sum_i W_i E_i$, and under uncorrelated part errors its variance is

$$
\sigma_E^2 = \sum_{i=1}^{m} W_i^2\, \sigma_{X_i}^2\,(1 - \rho_{ii'}).
$$

Each part contributes its error variance $\sigma_{X_i}^2(1 - \rho_{ii'})$
scaled by the *square* of its weight — doubling a part's weight quadruples
that part's error contribution. The reliability of the composite is one minus
the error share of total variance, giving the formula due to Horst (1936):

$$
\rho_{XX'} = 1 - \frac{\sum_{i=1}^{m} W_i^2\, \sigma_{X_i}^2\,(1 - \rho_{ii'})}{\sigma_X^2},
\qquad
r_{XX'} = 1 - \frac{\sum_{i=1}^{m} W_i^2\, S_{X_i}^2\,(1 - r_{ii'})}{S_X^2},
$$

with the population form on the left and its sample analogue on the right. All
that the formula asks of the covariance structure among parts is summarized in
the single supplied total variance.

## A worked example

A composite of three parts A, B, C uses weights $5$, $3$, and $1$; the part
variances are $3$, $4$, and $5$; the part reliabilities are $.40$, $.50$, and
$.70$; and the variance of the weighted composite is $S_X^2 = 198.84$.

| Part | Weight $W_i$ | Variance $S_{X_i}^2$ | Reliability $r_{ii'}$ |
|---|---|---|---|
| A | 5 | 3 | .40 |
| B | 3 | 4 | .50 |
| C | 1 | 5 | .70 |

The total error variance of the composite is

$$
5^2(3)(1 - .40) + 3^2(4)(1 - .50) + 1^2(5)(1 - .70)
= 45.00 + 18.00 + 1.50 = 64.50,
$$

and the reliability estimate is

$$
r_{XX'} = 1 - \frac{64.50}{198.84} = .6756 \approx .68.
$$

The example also shows why the total variance must be supplied rather than
derived. The weighted part variances sum to
$\sum_i W_i^2 S_{X_i}^2 = 75 + 36 + 5 = 116$, while the composite variance is
$198.84$; the remaining $198.84 - 116 = 82.84$ is contributed by the
covariances among the weighted parts, which are never shown in the table and
cannot be recovered from it.

## Why alpha applied to the parts can mislead

A tempting shortcut is to compute Cronbach's alpha treating the $m$ weighted
part scores as the "items" — for $m = 3$,

$$
\frac{3}{2}\cdot\frac{S_X^2 - \sum_i W_i^2 S_{X_i}^2}{S_X^2}
$$

in general $\frac{m}{m-1}\cdot\frac{S_X^2 - \sum_i W_i^2 S_{X_i}^2}{S_X^2}$.
This inherits alpha's assumption at the part level: the weighted subscale
scores must be essentially tau-equivalent (see
[classical test theory](/topics/measurement/classical-test-theory)). Parts
that measure different constructs with different reliabilities make that
assumption implausible, and the coefficient then answers a question about a
structure the composite does not have.

On the worked example the two routes disagree:

$$
\frac{3}{2}\cdot\frac{198.84 - 116}{198.84} \approx .625
\qquad\text{versus}\qquad
1 - \frac{64.50}{198.84} \approx .676.
$$

Alpha-on-parts understates the composite reliability here because it treats
the reliable variance linking the parts as if only a single common true score
could account for it. The Horst formula, which requires only the part
reliabilities and the total variance, is the appropriate quantity; alpha's
assumptions and limits are treated in
[internal consistency](/topics/measurement/internal-consistency).

## Stratified alpha

When the scale is clearly not unidimensional and the reported score is the
unweighted sum of $m$ subscale (stratum) scores, the Horst formula with unit
weights and each part reliability estimated by alpha *within* stratum $j$
becomes **stratified alpha**:

$$
\alpha_{\text{strat}} = 1 - \frac{\sum_{j=1}^{m} \sigma_j^2(1 - \alpha_j)}{\sigma_x^2},
$$

where $\sigma_j^2$ is the variance of subscale score $j$, $\alpha_j$ the alpha
computed within subscale $j$, and $\sigma_x^2$ the total-score variance.
Substituting $W_j = 1$ and $r_{jj'} = \alpha_j$ into the Horst formula gives
this expression exactly, so stratified alpha is the equal-weight special case
of Horst with alpha-estimated part reliabilities. The rationale for the
construction: items within a subscale are far more plausibly tau-equivalent
than items drawn from different subscales, so alpha is used where its
assumption is tenable — inside each stratum — and the composite formula
carries the combination across strata. The coefficient is due to Cronbach,
Schönemann, and McKie (1965), "Alpha Coefficients for Stratified-Parallel
Tests," *Educational and Psychological Measurement*, 25(2), 291–312
([doi:10.1177/001316446502500201](https://doi.org/10.1177/001316446502500201)).

## Interpretation for scales that are not unidimensional

Composite reliability — Horst's or stratified alpha's — makes no claim that a
single latent variable underlies the total score. It quantifies the proportion
of total-score variance carried by the reliable parts in combination. Whether
the total is interpretable as more than a summation convention is a question
about the scale's structure, not a number this formula returns: the
model-based alternative, coefficient omega, is defined only relative to a
one-factor model and its assumptions (see
[factor models and reliability](/topics/measurement/factor-analysis)), and the
relation between alpha and dimensionality is treated in [internal
consistency](/topics/measurement/internal-consistency). When the weights are
chosen to maximize reliability rather than fixed a priori, the resulting
score's reliability is the maximal reliability treated in the factor-models
note.

## Failure modes

- **Omitting the total variance.** Part variances and part reliabilities do
  not determine the composite variance; the inter-part covariances (or the
  composite variance itself) must be supplied.
- **Applying alpha to the part scores.** Alpha-on-parts assumes essential
  tau-equivalence across subscales, which different constructs with different
  reliabilities do not satisfy; on identical inputs it returns a different
  number than the composite's reliability.
- **Assuming uncorrelated part errors.** Method factors shared by subscales
  (common item wording, rater, or occasion) correlate the parts' errors and
  break the error-variance identity.
- **Forgetting that weights enter squared.** A part weighted twice as heavily
  contributes four times its share of error variance; heavily weighting a
  noisy part degrades the composite faster than its reliability alone
  suggests.
- **Reading a composite reliability as a unidimensionality claim.** The
  formulas quantify the reliability of a total built from parts, not the
  presence of a single common factor.

## Related pages

- [Reliability](/topics/measurement/reliability) treats replication designs
  and the choice of error sources.
- [Internal consistency and coefficient alpha](/topics/measurement/internal-consistency)
  treats alpha's forms, assumptions, and relation to dimensionality, including
  why alpha is computed within strata for stratified alpha.
- [Classical test theory](/topics/measurement/classical-test-theory) supplies
  the decomposition and the tau-equivalence families whose failure grounds the
  alpha-on-parts critique.
- [Factor models and reliability](/topics/measurement/factor-analysis) treats
  coefficient omega and maximal reliability — the model-based counterparts
  when the structure is, or is assumed to be, unidimensional, and the
  reliability of optimally weighted composites at the item level.
- [Reliability of change scores](/topics/measurement/change-scores) analyzes
  the two-part composite with weights $+1$ and $-1$: the difference score.
