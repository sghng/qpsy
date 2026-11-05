---
description: ANOVA as a comparison of full and restricted models — prediction error, least squares, residual degrees of freedom, the nested-model F ratio, and the distinction between proportional increase and proportional reduction in error
---

# Model Comparison

**Canonical reference:** [Maxwell, Delaney, & Kelley (MDK)](/resources#designing-experiments-and-analyzing-data) #ref/mdk

The classic treatment of one-way ANOVA describes a ratio of between-group to
within-group variability. The same test statistic arises from a different
starting point: put the null and alternative hypotheses into two statistical
models and ask whether the more constrained model sacrifices too much accuracy.
Both perspectives yield the identical $F$ statistic and conclusions. The model
comparison perspective explains *why* the ratio has its form, and the same
error-versus-complexity logic extends to other Gaussian linear models, from
adding a predictor in regression to testing an interaction.

This page develops the framework for the one-factor independent-groups design;
the classic decomposition, assumptions, and summary table are treated in
[One-Way ANOVA](/topics/anova/one-way-anova).

## Models as prediction rules

A statistical model is a simplified representation of how observable data are
generated. It has three components: parameters that must be estimated, a
predicted value $\hat Y_{ij}$ for each observation, and unexplained variability.
For each participant the observed score decomposes as

$$
Y_{ij} = \hat Y_{ij} + e_{ij},
$$

where $Y_{ij}$ is the observed score, $\hat Y_{ij}$ is the model's prediction,
and $e_{ij} = Y_{ij} - \hat Y_{ij}$ is the residual, or error. A model's fit —
its **adequacy** — is measured by its total squared error:

$$
E = \sum_{j=1}^{a}\sum_{i=1}^{n_j} \left(Y_{ij} - \hat Y_{ij}\right)^2,
$$

with $a$ groups and $n_j$ observations in group $j$. Squaring keeps positive
and negative residuals from canceling and penalizes large misses more than
small ones.

Different models assign different predictions to the same person. A model that
ignores group membership must issue one prediction for everyone; a model that
uses the group can issue a different prediction per group. Whichever model
predicts closer to the observed scores has the smaller error.

## Least-squares predictions

Which single number should a model predict? **Least squares** chooses the
parameter values that minimize the total squared error $E$, so the best
prediction depends on the model's constraints:

- If the model must give one prediction for everyone, least squares chooses the
  grand mean $\bar Y$.
- If the model may give each group its own prediction, least squares chooses
  the group means $\bar Y_j$.

The grand mean and group means are therefore the least-squares estimates under
their respective models.

## Full and restricted models

In the model comparison framework the two hypotheses become two models for
$Y_{ij}$, the score for observation $i$ in group $j$:

- **Full model** (the alternative, $H_1$):
  $$Y_{ij} = \mu_j + \varepsilon_{ij},$$
  unconstrained — each population has its own mean. Least squares estimates
  each $\mu_j$ by the corresponding group mean $\bar Y_j$.
- **Restricted model** (the null, $H_0$):
  $$Y_{ij} = \mu + \varepsilon_{ij}, \qquad \mu_1 = \mu_2 = \cdots = \mu_a,$$
  the full model plus an equality restriction, leaving one common population
  mean. Least squares estimates $\mu$ by the grand mean $\bar Y$.

The restricted model is **nested** in the full model: it is the full model with
the parameters tied together. Two consequences follow. First, the full model
does not assert that every pair of means differs — it merely declines to impose
the equality restriction; testing $H_0$ asks whether imposing it costs too much
accuracy. Second, dropping a constraint can never make the least-squares fit
worse, so the restricted model's error is always at least the full model's.

Substituting each model's least-squares predictions gives its error:

$$
E_F = \sum_{j=1}^{a}\sum_{i=1}^{n_j} \left(Y_{ij} - \bar Y_j\right)^2, \qquad E_R = \sum_{j=1}^{a}\sum_{i=1}^{n_j} \left(Y_{ij} - \bar Y\right)^2,
$$

the full-model error $E_F$ (deviations from group means) and the
restricted-model error $E_R$ (deviations from the grand mean), with
$E_R \geq E_F$ always. The quantity $E_R - E_F$ is the **increase in error**
caused by the restriction.

## Adequacy, simplicity, and residual degrees of freedom

Adequacy alone cannot choose between the models, because the full model always
fits at least as well — it wins even when the extra parameters capture nothing
but noise. A good model balances two desidera: it should fit the data well
(adequacy) and should not be overly complex (simplicity).

Simplicity is indexed by counting parameters and translating the count into
**residual degrees of freedom**:

$$
df = N - \#\{\text{estimated mean parameters}\},
$$

where $N = \sum_j n_j$ is the total sample size. The full model estimates $a$
means, so $df_F = N - a$; the restricted model estimates one mean, so
$df_R = N - 1$. Because residual $df$ equals $N$ minus the number of estimated
parameters, *more* residual degrees of freedom means *fewer* parameters — a
simpler model. The restriction $df_R - df_F = a - 1$ counts the parameters the
restriction removes.

## The nested-model F statistic

Raw error differences favor the full model; parameter counts favor the
restricted model. The $F$ ratio puts both on common ground by scaling each
error quantity by its degrees of freedom:

$$
F = \frac{\left(E_R - E_F\right)/\left(df_R - df_F\right)}{E_F/df_F}.
$$

The numerator is the increase in error **per additional parameter** the full
model estimates (equivalently, per residual degree of freedom lost); the
denominator is the full-model error per residual degree of freedom. The
comparison is then a rate:

- If the full model fits better only because it has more parameters, the error
  increase per df should roughly match the baseline error per df, and
  $F \approx 1$.
- If imposing the restriction causes a genuinely large loss of fit, the
  numerator exceeds the denominator and $F > 1$.

Large values of $F$ are evidence against the restriction. Rejection is
evidence that the common-mean model sacrificed too much accuracy — **not** proof
that every pair of means differs, and the omnibus test does not locate which
means differ. Locating differences requires the follow-on machinery of
[Linear Contrasts](/topics/anova/contrasts) and
[Multiple Comparisons](/topics/anova/multiple-comparisons).

### Crosswalk to classic ANOVA

Every quantity in the ratio has a classic name, which is why the two
perspectives produce the same statistic:

| Model-comparison quantity | Classic ANOVA quantity |
|---|---|
| $E_F$ | $SS_W$ (within-groups sum of squares) |
| $E_R$ | $SS_T$ (total sum of squares) |
| $E_R - E_F$ | $SS_B$ (between-groups sum of squares) |
| $df_F = N - a$ | $df_W$ |
| $df_R - df_F = a - 1$ | $df_B$ |
| $(E_R - E_F)/(df_R - df_F)$ | $MS_B$ |
| $E_F / df_F$ | $MS_W$ |

The nested-model $F$ is thus exactly the classic $F = MS_B/MS_W$, whose
derivation, assumptions, and summary-table conventions appear in
[One-Way ANOVA](/topics/anova/one-way-anova). The names for the degrees of
freedom themselves — numerator and denominator, error, residual — and the
df used by each follow-up procedure are collected in
[Crosswalk of ANOVA Quantities](/topics/anova/crosswalk).

## Proportional error measures: PIE versus PRE

Adequacy is often summarized as a proportion. Two denominators are in use, and
they measure different things:

$$
PIE = \frac{E_R - E_F}{E_F}, \qquad PRE = \frac{E_R - E_F}{E_R}.
$$

**Proportional increase in error** (PIE) expresses the restriction's cost as a
multiple of the full model's error; it can exceed 1 — an error increase of
121% is a PIE of 1.21. **Proportional reduction in error** (PRE) expresses the
full model's advantage as a fraction of the restricted model's error; for
nested least-squares models it lies between 0 and 1, and in one-way ANOVA it
equals the sample $\eta^2$ and $R^2$ (see
[Effect Sizes](/topics/foundations/effect-sizes)). The two are related
exactly, by $PRE = PIE/(1 + PIE)$, but they are **not interchangeable**: a
statement like "the restriction increased error by 121%" (PIE) and "the full
model explains 54.7% of the variance" (PRE/$\eta^2$) are different claims with
different denominators. Percent-increase language belongs to PIE;
proportion-explained language belongs to PRE.

## Worked example

Three independent groups of $n_j = 5$ each have means $9$, $8$, and $13$, with
grand mean $\bar Y = 10$ (the design and data appear in
[One-Way ANOVA](/topics/anova/one-way-anova)). Under the full model each score
is predicted by its group mean; the group squared errors are $24$, $14$, and
$20$, so $E_F = 58$. Under the restricted model every score is predicted by
$10$; the group squared errors are $29$, $34$, and $65$, so $E_R = 128$. The
restriction increases error by $E_R - E_F = 70$ while removing $a - 1 = 2$
parameters ($df_R = 14$, $df_F = 12$):

$$
PIE = \frac{70}{58} = 1.2069, \qquad PRE = \eta^2 = \frac{70}{128} = 0.5469, \qquad F = \frac{70/2}{58/12} = \frac{35}{4.83} = 7.24.
$$

The $F$ of 7.24 is the identical omnibus statistic computed from the classic
summary table; its degrees of freedom are $(a-1, N-a) = (2, 12)$. In this
balanced one-way example, the sample analogue of Cohen's $f^2$ used for power
analysis equals $SS_B/SS_W$, which is exactly PIE here — connecting this page to
[Power for Omnibus ANOVA](/topics/anova/power), where the population analogue
$f$ and its role in prospective power are developed.
