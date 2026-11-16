---
description: Direct and indirect selection, how restriction changes observed correlations including the missing-middle exception, and Thorndike Case 1–3 and Dobson corrections with their assumptions
---

# Range Restriction and Selection Corrections

The correlation observed in a sample describes the association *within the
range of the variables as sampled*. When a selection mechanism — an
admissions cutoff, a hiring threshold, a volunteer filter — limits that range,
the sample correlation need not estimate the population correlation that
would be observed without selection. A test–criterion study conducted only on
admitted applicants is the canonical case: everyone below the cutoff is
missing, so the predictor's variance, and with it the observed correlation,
is compressed. This note describes how selection changes observed
correlations and when they can be corrected.

Notation: $S_X$ and $S_Y$ are standard deviations in the **unrestricted**
(population) distribution, $s_X$ and $s_Y$ those in the **restricted**
(selected) sample, $r$ is the correlation observed in the restricted sample,
and $R$ the corrected estimate of the unrestricted correlation. The
correction ratio for a variable is $u=S/s$.

## Direct and indirect selection

**Direct selection** operates on one of the two correlated variables itself:
applicants are admitted by test score $X$, and the criterion $Y$ is observed
only for the admitted. Truncation may remove either tail (select the top, or
select the bottom), and the variable truncated may be $X$ or $Y$ — the
corrections below swap roles accordingly.

**Indirect selection** operates on a third variable $Z$ correlated with both
$X$ and $Y$: selecting on a composite admissions index restricts every
variable correlated with it, including test scores and grades that were never
themselves screened. Comparing instruments on a selected sample is the
standard occasion for indirect-selection corrections.

The selection taxonomy continues beyond the cases corrected here (selection
on a measured $Z$ whose unrestricted variance is unknown; on an unmeasured $Z$
with unrestricted $X$ and $Y$ variances known; on an unmeasured $Z$
otherwise). Those scenarios require different information and have no
counterpart formula on this page.

## Restriction does not always attenuate

The familiar effect is real: deleting a tail of one variable typically
weakens the observed correlation. In one illustration built from a population
with $\rho_{xy}=.50$, truncating on $x$ gave $r_{xy}=.33$,
truncating on $y$ gave $r_{xy}=.33$, and indirect restriction through
truncation on $z$ gave $r_{xy}=.41$ — attenuation in that illustration, less
severe under the indirect than the direct patterns.

Attenuation is nevertheless **not a law**. Restriction means *any* loss of
the full range, and truncation is only one pattern. When a selection process
deletes the *middle* of the $x$ range — keeping both tails — the remaining
bivariate distribution shows a *larger* sample correlation than the
unrestricted population: in the missing-middle illustration the observed
correlation rose from $.50$ to $.60$. What restriction does to a correlation
depends on which part of the distribution is removed and how: tail deletion
usually attenuates, middle deletion can inflate. Two practical rules follow.
Never report that restriction "must have lowered" a correlation without
identifying the selection pattern, and do not describe every selection
process as truncation.

## The correction cases

### Case 2 — direct selection, unrestricted variance of the selection variable known

When selection is directly on $X$ and the unrestricted standard deviation
$S_X$ is available (from norming data on the full population, for example),
the correction with $u=S_X/s_X$ is

$$
R = \frac{u\,r}{\sqrt{1 - r^{2} + u^{2}r^{2}}} .
$$

This is the most usable case and the one the other routes feed into.

### Case 1 — direct selection, unrestricted variance of the other variable known

When only $S_Y$ — the unrestricted standard deviation of the *other* variable
— is known (an uncommon situation), the correction with $u_y=S_Y/s_Y$ is

$$
R = \sqrt{1-\frac{1-r^{2}}{u_y^{2}}} = \frac{\sqrt{u_y^{2}+r^{2}-1}}{u_y} .
$$

It follows from invariance of the residual variance under selection,
$S_Y^{2}(1-R^{2}) = s_Y^{2}(1-r^{2})$: if selection on $X$ leaves the
regression of $Y$ on $X$ unchanged, the unexplained variance in the selected
group estimates the same population quantity.

### Scenario 1c — direct selection, no unrestricted variance known

The common practical case is that neither $S_X$ nor $S_Y$ is known, but the
**proportion selected** is. Under the additional assumption that the
selection variable is normally distributed in the population and selection is
single truncation, Dobson's method converts the selection proportion into the
ratio $u=S_X/s_X$, which then substitutes into the Case 2 formula (or, for
indirect selection, into Case 3). See the next section.

### Case 3 — indirect selection on a third variable

When selection operates on $Z$, and $Z$ is measured in the selected sample
with its unrestricted standard deviation $S_Z$ known, all three restricted
sample correlations enter, with $u_z=S_Z/s_z$:

$$
R_{xy} = \frac{r_{xy} + (u_z^{2}-1)\,r_{xz}\,r_{zy}}
{\sqrt{\bigl[1+(u_z^{2}-1)r_{xz}^{2}\bigr]\bigl[1+(u_z^{2}-1)r_{zy}^{2}\bigr]}} ,
$$

where $r_{xy}$, $r_{xz}$, $r_{zy}$ are the correlations in the selected
sample. A Dobson-style variant supplies $u_z$ from the selection proportion
under normal truncation on $Z$.

## Dobson's ratio and the table-reading procedure

Dobson's method assumes a normally distributed selection variable and
one-tail selection. Let $P$ be the proportion of the population selected
(top selection; for bottom selection apply the construction to $-X$), and let

- $C$ = the standard-normal cutoff with proportion $P$ above it,
  $C=\Phi^{-1}(1-P)$,
- $\lambda=\varphi(C)/P$, the ratio of the normal ordinate at the cutoff to
  the selection proportion.

Then

$$
u = \frac{S_X}{s_X} = \frac{1}{\sqrt{1 + C\lambda - \lambda^{2}}} .
$$

**Worked lookup.** For top-10% selection: $C=1.2816$,
$\lambda=1.7550$, and $u=2.4315$. A simulation check — the standard-deviation
ratio of the top 10% of a large normal sample — gives $u=2.4362$, matching
the formula. Values computed from the formula:

| $P$ selected | .05 | .10 | .20 | .30 | .40 | .50 | .60 | .70 |
|---|---|---|---|---|---|---|---|---|
| $u=S_X/s_X$ | 2.6912 | 2.4315 | 2.1386 | 1.9442 | 1.7908 | 1.6589 | 1.5389 | 1.4245 |

A published table of these ratios is historically how the method was used,
but a few entries of the printed table differ slightly from the formula at
small selection proportions, so the reliable practice is to **compute $u$
from the formula** (or software) rather than reproduce table values.

**Procedure.** (1) Establish the selection mechanism: which variable was
screened, which tail, and whether selection was direct or through a third
variable. (2) Determine what unrestricted information exists: $S_X$, $S_Y$,
or only the selection proportion $P$ (or $S_Z$ for indirect selection).
(3) Compute the ratio $u$ directly, or from $P$ via the Dobson construction
when normality is credible. (4) Apply the matching case formula. (5) Report
the corrected value *together with* the observed one, stating which case and
which assumptions produced it.

## Verified examples

All three direct/indirect formulas recover a known population correlation
from simulated selected samples (true $\rho_{xy}=.5$; Case 2 and Case 1 use
top-15% direct selection on $X$; Case 3 uses selection on a third variable
$Z$ with population $r_{xz}=.6$):

| Correction | Restricted-sample inputs | Result |
|---|---|---|
| Case 2 | $r=.2514$, $u=2.2672$ | $R=.5074$ |
| Case 1 | $r=.2514$, $u_y=1.1177$ | $R=.5001$ |
| Case 3 | $r_{xy}=.4331$, $r_{xz}=.3087$, $r_{zy}=.1392$, $u_z=2.2658$ | $R=.4977$ |

## Assumptions

The Thorndike-case corrections are not distribution-free magic; they assume
the restricted and unrestricted data share one regression surface:

- **Linearity** of the regression over the *full* range, not just the
  selected segment — the correction extrapolates the selected-sample
  association to the deleted range.
- **Homoscedasticity** of the residuals around that regression in the
  selected group.
- **Selection invariance**: selection changes which points are observed, not
  the $X$–$Y$ relationship itself. Selection that depends on $Y$ given $X$
  (or on the residuals) breaks this.
- Notably, the case formulas themselves require **no normality assumption**;
  normality enters only through Dobson's construction of $u$ from a selection
  proportion, which additionally presumes one-tail truncation of a normal
  selection variable.

When these fail — curvilinear association, heterogeneous residuals,
middle-deletion patterns, selection on the outcome itself — the corrected
value is not a better estimate of anything; it is the output of a model that
did not generate the data. Corrections are estimates whose uncertainty
reflects the assumptions, and they should inform interpretation alongside,
never in place of, the observed statistics.

## Fair comparison of predictors

Selection creates an apples-to-oranges problem when two instruments are
compared on the same selected sample. Suppose scores on instrument $X$
screened admission, while an alternative instrument $Z$ was administered
only to those admitted, with job performance $Y$ observed for both. Two
distortions follow. First, because $X$ and $Z$ correlate, selection on $X$
indirectly restricts $Z$ as well — the observed $r_{zy}$ needs its own
correction, not just $r_{xy}$. Second, the attenuation of $r_{zy}$ is milder
than that of $r_{xy}$, so comparing the uncorrected coefficients is unfair
to the screening instrument $X$. A fair comparison corrects *both*
associations for the same selection process (Case 3 when $Z$ is measured with
known $S_Z$) before contrasting them.

## Failure modes

- Assuming restriction always attenuates; middle deletion can inflate the
  observed correlation.
- Calling every selection pattern truncation, or applying a truncation-based
  correction (Dobson's) to a non-normal selection variable or to
  middle-deletion data.
- Using the wrong case: Case 2's formula with a $u$ built from the wrong
  variable, or a direct-selection formula when selection was indirect
  through a third variable.
- Trusting printed table values over the formula that generates them.
- Comparing a corrected coefficient for one predictor against an uncorrected
  coefficient for another.
- Treating a corrected value as the observation: corrected correlations are
  model-based estimates and belong in reports next to the observed values,
  with the case and assumptions stated.

## Links

- [Correlation](/topics/measurement/correlation) — the coefficient being
  restricted and corrected.
- [Correlations Involving Binary Variables](/topics/measurement/binary-correlations)
  — binary items are extreme cases of range restriction; the phi ceiling is
  a selection phenomenon.
- [Classical Item Analysis](/topics/measurement/item-analysis) and
  [Reliability](/topics/measurement/reliability) — restriction also affects
  which items and reliability estimates a selected sample can support.
- [Validity](/topics/measurement/validity) — validity evidence for decisions
  made from selected samples.

## References

- Pearson, K. (1903). Mathematical contributions to the theory of evolution.
  XI. On the influence of natural selection on the variability and
  correlation of organs. *Philosophical Transactions of the Royal Society of
  London, Series A*, 200, 1–66.
  [doi:10.1098/rsta.1903.0001](https://doi.org/10.1098/rsta.1903.0001) —
  origin of the selection-correction formula (Case 2).
- Thorndike, R. L. (1949). *Personnel selection: Test and measurement
  techniques*. Wiley — the Case 1/2/3 taxonomy.
- Dobson, P. (1988). The correction of correlation coefficients for
  restriction of range when restriction results from the truncation of a
  normally distributed variable. *British Journal of Mathematical and
  Statistical Psychology*, 41(2), 227–234.
  [doi:10.1111/j.2044-8317.1988.tb00898.x](https://doi.org/10.1111/j.2044-8317.1988.tb00898.x)
  — the ratio table and its normal-truncation assumptions.
