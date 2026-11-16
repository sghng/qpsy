---
description: reliability of change scores — true and error decomposition of the difference D = Y − X, variance identities under uncorrelated measurement errors, the general and equal-variance reliability formulas, the positivity condition, and worked examples in which two reliable measurements yield an unreliable difference
---

# Reliability of Change Scores

A change score (difference score) is the difference between two measurements of
the same person, $D = Y - X$: a post-test minus a pre-test, a second occasion
minus a first, one measure minus another. Whatever uses the difference is put
to, the difference is itself a score, and it has its own reliability — its own
ratio of true variance to observed variance. That reliability is not implied by
the reliabilities of the components: two highly reliable measurements can
produce a difference that is mostly measurement error. This page derives the
reliability of the difference within
[classical test theory](/topics/measurement/classical-test-theory), which
supplies the decomposition and the notation: $\rho_{XX'}$ and $\rho_{YY'}$ are
the reliabilities of $X$ and $Y$, and $\rho_{XY}$ their observed-score
correlation.

## Decomposition of the difference

Write each measurement in classical true-plus-error form,

$$
X = T_X + E_X, \qquad Y = T_Y + E_Y.
$$

The difference then decomposes in the same way,

$$
D = Y - X = T_D + E_D, \qquad T_D = T_Y - T_X, \qquad E_D = E_Y - E_X:
$$

the true difference is the difference of the true scores, and the error of the
difference is the difference of the errors.

## Variance identities

The variance of the difference score follows directly:

$$
\sigma_D^2 = \sigma_Y^2 + \sigma_X^2 - 2\,\sigma_Y\sigma_X\rho_{XY}.
$$

The error variance uses the assumption that the two occasions' errors are
uncorrelated, $\sigma_{E_XE_Y} = 0$, so the cross-error term drops:

$$
\sigma_{E_D}^2 = \sigma_{E_X}^2 + \sigma_{E_Y}^2
= \sigma_X^2(1 - \rho_{XX'}) + \sigma_Y^2(1 - \rho_{YY'}),
$$

where each error variance is expressed through the reliability identity
$\sigma_E^2 = \sigma_X^2(1 - \rho_{XX'})$ from
[classical test theory](/topics/measurement/classical-test-theory). The same
assumptions also make the observed covariance equal the true-score covariance,
$\sigma_{XY} = \sigma_{T_XT_Y} = \sigma_Y\sigma_X\rho_{XY}$, which gives the
true-score variance of the difference:

$$
\sigma_{T_D}^2 = \sigma_{T_Y}^2 + \sigma_{T_X}^2 - 2\,\sigma_{T_YT_X}
= \sigma_Y^2\rho_{YY'} + \sigma_X^2\rho_{XX'} - 2\,\sigma_Y\sigma_X\rho_{XY}.
$$

## Reliability of the difference

The reliability of the change score is the ratio of true to observed variance
of $D$, in either the population symbols or the variance identities above:

$$
\rho_{DD'} = \frac{\sigma_{T_D}^2}{\sigma_D^2}
= \frac{\sigma_Y^2\rho_{YY'} + \sigma_X^2\rho_{XX'}
- 2\,\sigma_Y\sigma_X\rho_{XY}}
{\sigma_Y^2 + \sigma_X^2 - 2\,\sigma_Y\sigma_X\rho_{XY}}.
$$

The observed-score correlation $\rho_{XY}$ enters both numerator and
denominator: a higher correlation removes true variance from the difference
(measurements that move together cannot differ much systematically) and also
shrinks the observed variance of the difference. The first effect dominates,
so reliability falls as the observed correlation rises.

When the two measurements have equal variances, $\sigma_X = \sigma_Y$, the
variances cancel and the formula reduces to a function of the three
coefficients alone:

$$
\rho_{DD'} = \frac{\rho_{YY'} + \rho_{XX'} - 2\rho_{XY}}{2(1 - \rho_{XY})}
= \frac{\tfrac{1}{2}(\rho_{YY'} + \rho_{XX'}) - \rho_{XY}}{1 - \rho_{XY}}.
$$

## The positivity condition

In the equal-variance form, the denominator $2(1 - \rho_{XY})$ is positive
whenever the measurements are not perfectly correlated, so the sign of
$\rho_{DD'}$ is the sign of the numerator. The reliability of the difference
is therefore positive **only when the average of the two reliabilities exceeds
the observed correlation between the measurements**:

$$
\rho_{DD'} > 0
\quad\Longleftrightarrow\quad
\tfrac{1}{2}(\rho_{XX'} + \rho_{YY'}) > \rho_{XY}.
$$

With unequal variances the same logic applies to the general numerator: a
weighted combination of the component reliabilities must exceed the
observed-covariance term for the difference to have any reliable variance at
all. Holding the component reliabilities fixed, the reliability of the
difference decreases as the observed correlation between the measurements
rises — reliable differences require measurements that are reliable but not
too highly correlated with each other.

## Worked examples

Take two measurements with equal variances and equal reliabilities
$\rho_{XX'} = \rho_{YY'} = .80$.

**A reliable difference.** If the observed correlation is $\rho_{XY} = .56$,
the equal-variance formula gives

$$
\rho_{DD'} = \frac{.80 + .80 - 2(.56)}{2(1 - .56)}
= \frac{.48}{.88} = \frac{6}{11} \approx .5455.
$$

Two measurements each .80 reliable yield a difference only about .55 reliable
— already a substantial loss.

**A perfectly unreliable difference.** If the observed correlation rises to
$\rho_{XY} = .80$, equal to the component reliabilities,

$$
\rho_{DD'} = \frac{.80 + .80 - 2(.80)}{2(1 - .80)} = \frac{0}{.40} = 0.
$$

The difference score now has *no* reliable variance: every bit of observed
variability in $D$ is measurement error, even though each component is .80
reliable. This is the reliable-components/nonreliable-difference lesson in its
starkest form — component reliabilities alone say nothing about the
reliability of their difference; the observed inter-measurement correlation
completes the determination.

## Assumptions

- Each measurement satisfies the classical decomposition $X = T_X + E_X$ with
  the standard assumptions: expected error zero, errors uncorrelated with true
  scores on either measure.
- **The errors of the two measurements are uncorrelated**,
  $\sigma_{E_XE_Y} = 0$. This is the load-bearing assumption: it removes the
  cross-error term from $\sigma_{E_D}^2$ and is what makes the observed
  covariance equal the true-score covariance.
- The component reliabilities $\rho_{XX'}$, $\rho_{YY'}$ and the observed
  correlation $\rho_{XY}$ are known or estimated, at population level or from
  the same sample in which the change scores are computed.

## Failure modes

- **Inferring difference reliability from component reliabilities.** Two
  reliable measurements can yield an unreliable difference; the observed
  correlation $\rho_{XY}$ must enter any statement about the reliability of
  $D$.
- **Correlated errors across occasions.** Method effects, memory, or repeated
  use of the same instrument can correlate the two occasions' errors. The
  identities above then fail on both sides at once — the error variance of the
  difference is misstated and the observed covariance no longer equals the
  true-score covariance — so the computed $\rho_{DD'}$ answers a model that
  does not hold.
- **Treating a low change-score reliability as a defect of the design alone.**
  The unreliability of differences is an algebraic consequence of high
  inter-measurement correlation relative to component reliability; it is a
  property of the scores, not a verdict on any particular application.
- **Confusing the reliability of $D$ with the statistical significance of mean
  change.** A group mean can differ reliably across occasions while individual
  difference scores are dominated by error; the two questions concern
  different variances.

The derivation characterizes the scores; it does not by itself prescribe
whether change scores should be used in a given substantive setting, which
depends on the inferences and design at hand rather than on the identities
above.

## Related pages

- [Classical test theory](/topics/measurement/classical-test-theory) supplies
  the decomposition, the reliability-as-variance-ratio definition, and the
  error-variance identity used here.
- [Reliability](/topics/measurement/reliability) treats the estimation and
  interpretation of the component reliabilities
  $\rho_{XX'}$ and $\rho_{YY'}$.
- [Reliability of composite scores](/topics/measurement/composite-scores)
  treats the general weighted composite, of which the difference score is the
  two-part case with weights $+1$ and $-1$.
