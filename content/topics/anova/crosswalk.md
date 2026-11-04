---
description: Crosswalk of ANOVA quantities across traditions — full- and restricted-model errors, within/between/total sums of squares, and numerator, denominator, error, and residual degrees of freedom — and where the degrees of freedom enter the omnibus test, contrasts, and the Bonferroni, Tukey, and Scheffé procedures
---

# Crosswalk of ANOVA Quantities

Every test in this collection is built from the same small set of quantities, but
each tradition leaves a different name behind. The model-comparison tradition
speaks of full and restricted models and their errors; the classic ANOVA
partition speaks of between-, within-, and total-group sums of squares; the
machinery of the $F$ distribution speaks of numerator and denominator degrees
of freedom; regression output speaks of model and residual sums of squares and
degrees of freedom. The quantities themselves are the same. This page aligns
them in one place and then shows where the degrees of freedom enter each
procedure — the omnibus test, a single contrast, and the Bonferroni, Tukey,
and Scheffé corrections.

Throughout, the setting is the one-factor independent-groups design with $a$
groups and $N$ total observations; the quantities are developed in
[One-Way ANOVA](/topics/anova/one-way-anova) and
[Model Comparison](/topics/anova/model-comparison).

## Errors and sums of squares

Two models generate every quantity. The **full model** gives each group its
own mean, so its predictions are the group means $\bar Y_j$; the **restricted
model** imposes the null hypothesis on those means — under the omnibus null
one common mean, so its prediction is the grand mean $\bar Y$. Each model's
error is its total squared prediction miss, and because the restricted model
is the full model with parameters tied together, its error can only be larger:

$$
E_F = \sum_{j=1}^{a}\sum_{i=1}^{n_j}\left(Y_{ij} - \bar Y_j\right)^2, \qquad
E_R = \sum_{j=1}^{a}\sum_{i=1}^{n_j}\left(Y_{ij} - \bar Y\right)^2, \qquad
E_R \geq E_F.
$$

The increase in error has a closed form in the classic quantities, and the
partition is exact:

$$
E_R - E_F = SS_B = \sum_{j=1}^{a} n_j\left(\bar Y_j - \bar Y\right)^2, \qquad
SS_T = SS_B + SS_W.
$$

| Quantity | Model comparison | Classic ANOVA | Regression / software |
|---|---|---|---|
| Error of the full model | $E_F$ | $SS_W$, within-groups sum of squares | residual sum of squares |
| Error of the restricted model (omnibus $H_0$) | $E_R$ | $SS_T$, total sum of squares | total sum of squares |
| Increase in error under the restriction | $E_R - E_F$ | $SS_B$, between-groups sum of squares | regression (explained) sum of squares |
| Error increase for one contrast | $E_R - E_F$ under $\psi = 0$ | contrast sum of squares $SS_\psi$ | — |

A single contrast changes the restriction, not the full model: $E_F = SS_W$
is identical for every comparison on a design, while $E_R$ — and therefore
$E_R - E_F = SS_\psi$ — depends on the coefficients
([Linear Contrasts](/topics/anova/contrasts)).

Dividing each error quantity by its degrees of freedom (below) gives the mean
squares:

| Mean square | Model comparison | Classic ANOVA | Formula |
|---|---|---|---|
| Effect mean square | $(E_R - E_F)/(df_R - df_F)$ | $MS_B$ | $SS_B/(a-1)$ |
| Error mean square | $E_F/df_F$ | $MS_W$, also written $MS_E$ | $SS_W/(N-a)$ |

and the test statistic is the same ratio in both languages:

$$
F = \frac{(E_R - E_F)/(df_R - df_F)}{E_F/df_F} = \frac{MS_B}{MS_W}.
$$

## The degrees of freedom

Residual degrees of freedom count observations minus estimated mean
parameters, $df = N - \#\{\text{parameters}\}$, so *more* residual degrees of
freedom means a *simpler* model
([Model Comparison](/topics/anova/model-comparison)). The full model
estimates $a$ means, so $df_F = N - a$; the omnibus restricted model estimates
one mean, so $df_R = N - 1$; a single linear restriction removes exactly one
parameter, so a contrast's restricted model has $df_R = N - (a-1)$.

| Degrees of freedom | Value | Classic ANOVA | Model comparison | $F$-distribution name | Common aliases |
|---|---|---|---|---|---|
| of the effect (numerator) | $a - 1$ | $df_B$ | $df_R - df_F$ | $df_1$, numerator df | df_num, df_hyp, df_model |
| of the error (denominator) | $N - a$ | $df_W$ | $df_F$ | $df_2$, denominator df | df_error, df_res, df_den, df_within |
| total | $N - 1$ | $df_T$ | $df_R$ | — | df_total |
| of one contrast (numerator) | $1$ | a single-df comparison | $df_R - df_F$ under one restriction | numerator df of $t$ or $F(1,\cdot)$ | — |

Four relationships organize the table:

- **Partition.** $df_T = df_B + df_W$ is the same statement as
  $(df_R - df_F) + df_F = df_R$: the degrees of freedom lost to the
  restriction plus those left to the full model recover the restricted
  model's total.
- **What each counts.** The numerator df counts the *restrictions* — the
  parameters the hypothesis removes (all $a$ means tied together removes
  $a - 1$; one contrast removes $1$). The denominator df is the residual df
  of the full model, a property of the *design* alone.
- **Sharing.** Because the full model is fixed by the design, every
  comparison run on it shares the same $MS_W$ and the same
  $df_{\mathrm{error}} = N - a$ — including groups whose means the comparison
  does not involve.
- **The pair indexes the $F$ family.** The ordered pair $(df_1, df_2)$,
  numerator first, selects the member of the family of $F$ distributions;
  software reports the statistic as $F(df_1, df_2)$.

A check ties the rows together: with $a = 2$ groups the omnibus restriction
and the single pairwise contrast coincide, and the two numerator-df rows
agree, $(a-1, N-a) = (1, N-2)$ — the omnibus test *is* the two-group contrast.

## Where the df enter each procedure

The statistic and its degrees of freedom are fixed by the design (denominator)
and the hypothesis (numerator). Multiplicity corrections change neither: they
change only the critical value against which the statistic is judged.

| Procedure | Statistic | Numerator | Denominator | Critical value |
|---|---|---|---|---|
| Omnibus $F$ | $MS_B/MS_W$ | $a - 1$ | $N - a$ | $F_{\alpha;\,a-1,\,N-a}$ |
| Single contrast | $SS_\psi/MS_W$, or $t$ | $1$ | $N - a$ | $F_{\alpha;\,1,\,N-a} = \left(t^*_{\,1-\alpha/2,\,N-a}\right)^2$ |
| Bonferroni, family of $C$ | same contrast statistic | $1$ | $N - a$ | $F_{\alpha/C;\,1,\,N-a}$ |
| Tukey HSD | $q = (\bar Y_{\max} - \bar Y_{\min})/\sqrt{MS_W/n}$ | — ($a$ is a range parameter, not a df) | $N - a$ | $q_{\alpha;\,a,\,N-a}$ |
| Scheffé | contrast $F$ | reuses the omnibus pair | $(a - 1,\, N - a)$ | $(a-1)\,F_{\alpha;\,a-1,\,N-a}$ |
| Separate-variance contrast | $\hat\psi^2 \big/ \sum_j c_j^2 s_j^2/n_j$ | $1$ | Satterthwaite df: fractional, contrast-specific | software |
| Power (noncentral $F$) | $F$ against $F_{\mathrm{crit}}$ | $a - 1$ | $N - a$ | plus noncentrality $\lambda = Nf^2$ |

Three consequences of the table:

- **No correction consumes new degrees of freedom.** Bonferroni divides
  $\alpha$, not the df. Tukey replaces the $F$ reference distribution with the
  studentized range, still indexed by $df_{\mathrm{error}} = N - a$, with $a$
  entering as the number of means in the family. Scheffé multiplies the
  omnibus critical value by $df_B = a - 1$. In each case the statistic and its
  df pair are exactly those of the uncorrected contrast
  ([Multiple Comparisons](/topics/anova/multiple-comparisons)).
- **Unequal variances change the denominator df only.** When variances are not
  pooled, the Satterthwaite approximation yields a fractional, contrast-specific
  denominator df; the numerator remains $1$.
- **Power uses the same pair.** Prospective power evaluates the same rejection
  region under the noncentral $F$ with the same $(a-1,\,N-a)$ degrees of
  freedom ([Power for Omnibus ANOVA](/topics/anova/power)).

The pattern extends to factorial designs unchanged in form: each effect — a
main effect, an interaction — carries its own numerator df (for an
interaction, $(a-1)(b-1)$) counting its restrictions, while all effects are
judged against the one pooled error term with its single denominator df.

## The shared worked example

The running example used across these pages — $a = 3$ groups of $n = 5$
($N = 15$), means $9$, $8$, $13$ — fills in every cell of the crosswalk
([One-Way ANOVA](/topics/anova/one-way-anova),
[Linear Contrasts](/topics/anova/contrasts)):

| Quantity | Model comparison | Classic ANOVA | Value | df |
|---|---|---|---|---|
| Full-model error | $E_F$ | $SS_W$ | $58$ | $12$ |
| Restricted-model error (omnibus) | $E_R$ | $SS_T$ | $128$ | $14$ |
| Error increase (omnibus) | $E_R - E_F$ | $SS_B$ | $70$ | $2$ |
| Effect mean square | $(E_R - E_F)/2$ | $MS_B$ | $35.00$ | — |
| Error mean square | $E_F/12$ | $MS_W$ | $4.83$ | — |
| Omnibus statistic | error-increase rate | $F = MS_B/MS_W$ | $7.24$ | $(2,\,12)$ |
| Restricted-model error, contrast $(\tfrac12,\tfrac12,-1)$ | $E_R$ | — | $125.5$ | $13$ |
| Error increase, that contrast | $E_R - E_F$ | $SS_\psi$ | $67.5$ | $1$ |
| Contrast statistic | $\frac{67.5/1}{4.83}$ | $SS_\psi/MS_W$ | $13.97$ | $(1,\,12)$ |
| Bonferroni critical value, $C = 2$ | — | $F_{.025;\,1,\,12}$ | $6.55$ | same $(1,\,12)$ |

Every row describes the same 15 observations. What changes from row to row is
the restriction — the hypothesis being tested — and with it the numerator df
and the error increase; the full-model error and its degrees of freedom, the
denominator of every test, never change.

## Related pages

- [One-Way ANOVA](/topics/anova/one-way-anova): the classic partition,
  mean squares, and summary table.
- [Model Comparison](/topics/anova/model-comparison): full and restricted
  models, the nested-model $F$, and proportional error measures.
- [Linear Contrasts](/topics/anova/contrasts): single-df restrictions,
  $SS_\psi$, and the $t$–$F$ duality.
- [Multiple Comparisons](/topics/anova/multiple-comparisons): the Bonferroni,
  Tukey, and Scheffé procedures whose critical values appear above.
- [Power for Omnibus ANOVA](/topics/anova/power): the noncentral $F$ with the
  same degrees-of-freedom pair.
