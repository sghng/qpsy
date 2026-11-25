---
description: Analysis of variance through one-way and factorial designs, model comparison, repeated measures, contrasts, multiple comparisons, and power
---

# Analysis of Variance

**Canonical reference:** [Maxwell, Delaney, & Kelley (MDK)](/resources#designing-experiments-and-analyzing-data) #ref/mdk

Analysis of variance (ANOVA) compares models for group means by partitioning
variability or, equivalently, by comparing the errors of restricted and full
models. These notes develop that shared logic and then follow specific research
questions into contrasts, multiplicity control, and design planning.

## Core framework

- [One-Way ANOVA](/topics/anova/one-way-anova): the omnibus test, sums-of-squares
  and degrees-of-freedom partitions, the $F$ statistic, and assumptions.
- [Factorial ANOVA](/topics/anova/factorial-anova): main effects and interactions,
  balanced two-way models, unequal cell sizes, and omnibus effect sizes.
- [One-Way Repeated-Measures ANOVA](/topics/anova/repeated-measures-anova):
  participant and condition partitions, the participant-by-condition error term,
  the unadjusted omnibus test, participant-augmented model comparison, and
  repeated-measures effect sizes.
- [Repeated-Measures Assumptions and Corrections](/topics/anova/repeated-measures-assumptions):
  difference-score variances, sphericity, compound symmetry, Mauchly's test,
  and Greenhouse–Geisser and Huynh–Feldt corrections.
- [Repeated-Measures Design Considerations](/topics/anova/repeated-measures-design):
  order effects, counterbalancing, carryover, longitudinal measurements, and
  within-versus-between-subjects design selection.
- [Model Comparison](/topics/anova/model-comparison): full and restricted models,
  squared-error fit, the nested-model $F$ test, and proportional error measures.
- [Crosswalk of ANOVA Quantities](/topics/anova/crosswalk): one table aligning
  errors, sums of squares, and degrees of freedom across naming traditions, and
  where the degrees of freedom enter each test and correction procedure.
- [Power for Omnibus ANOVA](/topics/anova/power): Cohen's $f$, the noncentral $F$
  distribution, and prospective power calculation.

## Follow-up comparisons

- [Linear Contrasts](/topics/anova/contrasts): pairwise and complex comparisons,
  confidence intervals, effect sizes, orthogonality, and unequal-variance tests.
- [Multiple Comparisons](/topics/anova/multiple-comparisons): familywise error
  and FDR, Bonferroni, Tukey HSD, Scheffé, Dunnett, Hsu, protected LSD,
  simultaneous intervals, omnibus testing, and procedure selection.
- [Factorial ANOVA Follow-Up Tests](/topics/anova/factorial-follow-ups):
  simple effects, interaction probing, marginal-mean contrasts, and error-control
  families for factorial designs.
- [Repeated-Measures Comparisons](/topics/anova/repeated-measures-comparisons):
  participant-specific contrast scores, separate-error paired tests, and
  Bonferroni simultaneous intervals for within-subjects designs.

A useful path is to begin with the omnibus partition in One-Way ANOVA, then read
Model Comparison for the more general restricted-versus-full perspective.
Factorial ANOVA extends that framework to main effects and interactions, while
Repeated-Measures ANOVA changes the error structure to account for correlated
scores from the same participants. Its assumptions page explains when the
unadjusted reference distribution needs correction, and its design page treats
the order and carryover questions created by repeated administration. Linear
Contrasts answers targeted questions left open by an omnibus test; Multiple
Comparisons, Factorial ANOVA Follow-Up Tests, and Repeated-Measures Comparisons
explain how question selection, error structure, and family definition change
follow-up inference. The power page returns to design planning before data are
collected.

The foundational pages on
[hypothesis testing](/topics/foundations/hypothesis-testing),
[p-values](/topics/foundations/p-values),
[confidence intervals](/topics/foundations/confidence-intervals),
[effect sizes](/topics/foundations/effect-sizes), and
[statistical power](/topics/foundations/statistical-power) supply the shared
inference concepts used throughout this collection.
