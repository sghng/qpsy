---
desc: Analysis of variance through sums of squares, model comparison, contrasts, multiple comparisons, and power
---

# Analysis of Variance

Analysis of variance (ANOVA) compares models for group means by partitioning
variability or, equivalently, by comparing the errors of restricted and full
models. These notes develop that shared logic and then follow specific research
questions into contrasts, multiplicity control, and design planning.

## Core framework

- [One-Way ANOVA](/topics/anova/one-way-anova): the omnibus test, sums-of-squares
  and degrees-of-freedom partitions, the $F$ statistic, and assumptions.
- [Model Comparison](/topics/anova/model-comparison): full and restricted models,
  squared-error fit, the nested-model $F$ test, and proportional error measures.
- [Power for Omnibus ANOVA](/topics/anova/power): Cohen's $f$, the noncentral $F$
  distribution, and prospective power calculation.

## Follow-up comparisons

- [Linear Contrasts](/topics/anova/contrasts): pairwise and complex comparisons,
  confidence intervals, effect sizes, orthogonality, and unequal-variance tests.
- [Multiple Comparisons](/topics/anova/multiple-comparisons): familywise error,
  Bonferroni, Tukey HSD, Scheffé, and procedure selection.

A useful path is to begin with the omnibus partition in One-Way ANOVA, then read
Model Comparison for the more general restricted-versus-full perspective.
Linear Contrasts answers targeted questions left open by the omnibus test, and
Multiple Comparisons explains how their selection and number change error
control. The power page returns to design planning before data are collected.

The foundational pages on
[hypothesis testing](/topics/foundations/hypothesis-testing),
[p-values](/topics/foundations/p-values),
[confidence intervals](/topics/foundations/confidence-intervals),
[effect sizes](/topics/foundations/effect-sizes), and
[statistical power](/topics/foundations/statistical-power) supply the shared
inference concepts used throughout this collection.
