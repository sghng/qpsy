---
desc: Power of the omnibus one-way ANOVA F test — Cohen's f, the noncentral F distribution and noncentrality parameter, degrees of freedom, and the two-step critical-value computation with a prospective worked example
---

# Power for Omnibus ANOVA

Power is the probability of rejecting the null hypothesis when it is false. For
the omnibus one-way ANOVA test of $H_0: \mu_1 = \cdots = \mu_a$, power analysis
answers a design question: if the population means are spread by a particular
amount, how often would a study of a given size detect that spread? The generic
concept of power, its determinants, and its use in planning are covered in
[Statistical Power](/topics/foundations/statistical-power); this page develops
the ANOVA-specific machinery.

## Central and noncentral F

The omnibus statistic $F = MS_B/MS_W$ (equivalently, the nested-model ratio of
[Model Comparison](/topics/anova/model-comparison)) is referenced against the
**central $F$ distribution** when $H_0$ is true. When $H_0$ is false, the
statistic instead follows a **noncentral $F$ distribution**, which places more
probability at larger values. Its departure from the central distribution is
governed by a **noncentrality parameter** $\lambda \geq 0$, not merely by a
location shift:

- $\lambda = 0$ recovers the central $F$.
- Larger $\lambda$ shifts the distribution farther from the null distribution,
  increasing the probability that $F$ lands in the rejection region.

The noncentrality parameter reflects both the magnitude of the mean differences
and the sample size — the same pattern as generic power, where larger effects
and larger samples increase power while greater within-group variability
decreases it.

## Cohen's f

Power requires a specification of how far the null is false. For fixed-effects
one-way ANOVA the omnibus standardized effect size is **Cohen's $f$**:

$$f = \frac{\sigma_m}{\sigma_\varepsilon},$$

where $\sigma_m$ is the standard deviation of the population means,

$$\sigma_m = \sqrt{\frac{\sum_{j=1}^{a}\left(\mu_j - \mu\right)^2}{a}},$$

with $\mu$ the average of the $a$ population means, and $\sigma_\varepsilon$ is
the common within-group population standard deviation. Cohen's $f$ is a
*statistic-free, lowercase* quantity distinct from the uppercase $F$ test
statistic: $f$ describes a population, while $F$ is computed from samples and
compared against the central $F$ distribution under the null. Its sample
analogue connects to the error-based measures in
[Model Comparison](/topics/anova/model-comparison).

Conventional benchmarks label $f \approx .10$ small, $.25$ medium, and $.40$
large. These are context-dependent conventions, not universal thresholds: what
counts as a meaningful spread among means depends on the outcome's scale and
the research setting, and a value labeled "medium" in one literature may be
routine or implausible in another.

## Noncentrality parameter and degrees of freedom

For the equal-$n$ one-way design, the noncentrality parameter is

$$\lambda = N f^2,$$

with $N$ the total sample size. Because $f$ already combines the spread of the
population means with the within-group standard deviation, $\lambda$ folds
together effect magnitude and sample size: greater spread of the means and larger
samples both move more of the noncentral $F$ distribution into the rejection
region. The displayed form applies when group sizes are equal;
with unequal allocation the noncentrality is computed by software from the
individual $n_j$, and the equal-$n$ version should not be assumed.

The test's degrees of freedom are unchanged from the omnibus test: numerator
$df_1 = a - 1$ and denominator $df_2 = N - a$ (the model-comparison quantities
$df_R - df_F$ and $df_F$).

## The two-step computation

Power for the omnibus $F$ test is computed by evaluating the same rejection
region under two distributions:

1. **Find the rejection region under $H_0$.** Using the central
   $F(df_1, df_2)$ distribution and significance level $\alpha$, find the
   critical value $F_{\text{crit}}$; reject when $F \geq F_{\text{crit}}$.
2. **Evaluate that region under the alternative.** With the specified effect,
   the statistic follows the noncentral $F$ distribution with noncentrality
   $\lambda$ and the same degrees of freedom. Power is the probability of
   observing $F \geq F_{\text{crit}}$ under that shifted distribution:

$$\text{Power} = P\left(F'_{df_1, df_2}(\lambda) \geq F_{\text{crit}}\right).$$

A cumulative-distribution calculator returns the area to the *left* of
$F_{\text{crit}}$, so power is obtained as one minus that area. In practice,
software performs both steps at once from the effect size (or $\lambda$), the
number of groups, and $\alpha$.

## Worked prospective example

Suppose a three-group study is being planned, prior research suggests
population means of $40$, $50$, and $60$, the within-group population standard
deviation is $\sigma_\varepsilon = 20$, and the plan is $n = 10$ per group
($N = 30$) with $\alpha = .05$.

The average of the population means is $\mu = 50$, so

$$\sigma_m = \sqrt{\frac{(40-50)^2 + (50-50)^2 + (60-50)^2}{3}}
= \sqrt{\frac{200}{3}} = 8.16497,$$

$$f = \frac{8.16497}{20} = 0.408248, \qquad
\lambda = N f^2 = 30 \times 0.408248^2 = 5.$$

With $df_1 = a - 1 = 2$ and $df_2 = N - a = 27$, the central $F(2, 27)$
distribution gives $F_{\text{crit}} = 3.35413$. The power is the noncentral-$F$
tail area:

$$\text{Power} = P\left(F'_{2,27}(\lambda = 5) \geq 3.35413\right) = 0.457992
\approx .458.$$

A study of this size would detect the specified configuration of means fewer
than half of the time. Note that $f = 0.408$ sits at the conventional "large"
benchmark while power remains below .5 — a reminder that the benchmarks
describe the effect in population terms and carry no guarantee about detection;
with three groups and modest per-group samples, even a large-ish spread is easy
to miss. Raising power requires a larger $N$ (through $\lambda = Nf^2$), a
design that reduces $\sigma_\varepsilon$, or a larger true effect.

## Prospective use

This computation is **prospective power analysis**: performed before any data
are collected, using hypothetical but plausible values for the population means
and error standard deviation drawn from prior research or theory. Its purpose
is design planning — choosing $N$ large enough that the study has a reasonable
chance of detecting the smallest spread of means worth noticing — as discussed
in [Statistical Power](/topics/foundations/statistical-power). Because the
answer depends entirely on the assumed $f$, reporting which alternative was
assumed is part of the analysis, not an optional detail. Detecting where the
differences lie after a significant omnibus test is a separate problem
([Linear Contrasts](/topics/anova/contrasts),
[Multiple Comparisons](/topics/anova/multiple-comparisons)), with its own power
considerations.
