---
desc: Effect size measures on original and standardized scales, with design-specific Cohen's d formulas
---

# Effect Sizes

Statistical significance says whether an effect is detectable above sampling
noise; it does not say how large the effect is. A trivial difference can be
highly significant in a large sample, and an important one can be
non-significant in a small one. **Effect size measures** quantify the
magnitude of an effect and should be reported alongside test results.

## Original and standardized scales

- **Unstandardized** measures stay in the original units: a mean difference in
  points, minutes, or items. These are the most interpretable when the units
  are meaningful on their own.
- **Standardized** measures express the effect in a common, dimensionless
  unit — typically standard-deviation units — which allows comparison across
  measures, studies, and constructs whose raw scales differ.

Standardization trades interpretability for comparability; if the original
units carry meaning, an unstandardized effect is often the better summary.

## Cohen's d

Cohen's $d$ expresses a mean difference in standard-deviation units. Sample
size is not a factor in its formula, although the estimate's precision still
depends on sample size. Its **denominator depends on the design**, and stating
which standardizer was used is part of reporting:

| Design | Formula | Denominator |
|---|---|---|
| One sample, $\sigma$ known | $d = \dfrac{\bar{X} - \mu_0}{\sigma}$ | population SD |
| One sample, $\sigma$ estimated | $d = \dfrac{\bar{X} - \mu_0}{s}$ | sample SD |
| Independent samples | $d = \dfrac{\bar{X}_1 - \bar{X}_2}{s_p}$ | pooled SD $s_p$ |
| Paired samples | $d = \dfrac{\bar{D}}{s_D}$ | SD of the difference scores |

Here $\bar{X}$ is a sample mean, $\mu_0$ the reference value, $s$ the sample
standard deviation of the scores, $s_p$ the pooled within-group standard
deviation, $\bar{D}$ the mean of the within-pair difference scores, and $s_D$
their standard deviation.

Two denominator conventions deserve explicit comment:

- For **paired** designs, one common form, often called $d_z$, divides by
  $s_D$, the standard deviation of the difference scores. Alternatives that
  divide by the SD of the raw scores (or their average) answer a different
  question and yield different values, especially when pairs are strongly
  correlated, so the standardizer must always be identified.
- For **independent** designs, $s_p$ pools within-group variability; the
  pooled and Welch versions of the test share this standardizer even though
  they differ in the standard error. Test formulas, pooled-variance
  computation, and design selection are covered in
  [t Tests](/topics/foundations/t-tests).

The sign of $d$ encodes direction relative to the stated subtraction order and
is interpretable only when that order is defined in advance.

**Worked example.** In a sleep study with reference value $\mu_0 = 7$ hours,
a sample of $n = 16$ graduate students yields $\bar{X} = 7.5$ hours with
$s = 1.0$ hour. The standardized effect is $d = (7.5 - 7)/1.0 = 0.5$: the
group mean sits half a standard deviation above the reference value. Note that
the test based on the same data need not be significant ($t = 2.00$, $p = .064$
with 15 degrees of freedom) — significance and magnitude are separate
questions.

## Interpreting benchmarks

Conventional reference points attribute $|d| \approx 0.2$ to small, $0.5$ to
medium, and $0.8$ to large effects. These benchmarks are **context-dependent
conventions, not universal constants**: what counts as a practically important
effect differs by field, by outcome, and by the costs and benefits attached to
the intervention. Benchmarks should anchor interpretation, not replace it, and
they were developed for broadly normal, continuous outcomes in the behavioral
sciences — extrapolating them to other settings warrants caution.

## What effect sizes do and do not provide

An effect size is a point summary of magnitude. It carries **no information
about precision**: the same $d$ can arise from a precise large-study estimate
or a noisy small-study one. Precision belongs to interval estimation
([Confidence Intervals](/topics/foundations/confidence-intervals)), and a
complete report pairs the effect with an interval for it.

Effect sizes also play a structural role in power: a specific effect size is
what defines a specific alternative hypothesis, and power is computed against
that alternative. See [Statistical Power](/topics/foundations/statistical-power).
The hypothesis-testing context for the tests themselves is in
[Hypothesis Testing](/topics/foundations/hypothesis-testing).
