---
description: t tests for comparing means — one-sample, independent-samples, and paired designs, with pooled and Welch standard errors, degrees of freedom, assumptions, and reporting
---

# t Tests

The $z$ test for a mean requires the population standard deviation $\sigma$ to
standardize the sample mean. In practice $\sigma$ is almost never known; it
must be estimated from the sample by $s$. Estimating the standard error
introduces extra uncertainty, and the $t$ distribution accounts for it.

## The t statistic and its family of distributions

Every $t$ statistic has the skeleton

$$
t = \frac{\text{sample estimate} - \text{null value}}{\text{estimated standard error}},
$$

which measures how many standard errors the estimate lies from the value
specified under the null hypothesis. For the mean-based tests below under
their normal-model assumptions, this ratio follows a $t$ distribution under
the null: symmetric and bell-shaped like the standard normal, but with heavier
tails whose weight depends on the degrees of freedom $df$. With small samples, $s$ is an unstable estimate—a single
observation can move it sharply in either direction—so heavier tails protect
against underestimating the standard error. As
$df$ grows, $s$ estimates $\sigma$ more precisely and the $t$ distribution
approaches the standard normal.

The three tests below differ only in what the estimate and its standard error
are.

## Choosing the test from the design

| Research design | Sample estimate | Null value | Test | $df$ |
|---|---|---|---|---|
| Sample mean vs. a reference value | $\bar{X}$ | $\mu_0$ | One-sample $t$ | $n - 1$ |
| Two measurements per unit, or matched pairs | $\bar{D}$ (mean difference) | $0$ | Paired $t$ | $n - 1$ (pairs) |
| Two unrelated groups | $\bar{X}_1 - \bar{X}_2$ | $0$ | Independent $t$ | $n_1 + n_2 - 2$ (pooled) |

Here $n$ is the number of observations (or number of pairs for the paired
test), and $\bar{X}_1, \bar{X}_2$ are the two group means.

## One-sample t test

$$
t = \frac{\bar{X} - \mu_0}{s / \sqrt{n}}, \qquad df = n - 1,
$$

where $\bar{X}$ is the sample mean, $\mu_0$ the hypothesized population mean,
$s$ the sample standard deviation, and $s/\sqrt{n}$ the estimated standard
error of the mean.

## Independent-samples t test

Two groups are independent when each unit contributes one observation to one
group and knowing one group's scores gives no information about particular
scores in the other.

### Pooled (Student) version

If the two populations have the same variance (*homogeneity of variances*), a
weighted average of the sample variances estimates it better than either
alone:

$$
s_p^2 = \frac{(n_1 - 1)s_1^2 + (n_2 - 1)s_2^2}{n_1 + n_2 - 2},
$$

with $s_1^2, s_2^2$ the group sample variances. The standard error of the mean
difference and the test statistic are

$$
SE_{pooled} = \sqrt{s_p^2 \left( \frac{1}{n_1} + \frac{1}{n_2} \right)}, \qquad t = \frac{\bar{X}_1 - \bar{X}_2}{SE_{pooled}}, \qquad df = n_1 + n_2 - 2.
$$

### Welch's version

When population variances may differ, pooling is inappropriate — especially
when the larger variance attaches to the larger group, which inflates
$s_p^2$ and the standard error with it. Welch's test estimates each group's
variance separately:

$$
SE_{Welch} = \sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}},
$$

and adjusts the degrees of freedom with the Satterthwaite approximation:

$$
df = \frac{\left( \dfrac{s_1^2}{n_1} + \dfrac{s_2^2}{n_2} \right)^2} {\dfrac{1}{n_1 - 1}\left( \dfrac{s_1^2}{n_1} \right)^2 + \dfrac{1}{n_2 - 1}\left( \dfrac{s_2^2}{n_2} \right)^2},
$$

which is fractional and is best computed by software. When $n_1 = n_2$ the two
standard errors coincide even under unequal variances, because the pooled
variance is then the unweighted mean of $s_1^2$ and $s_2^2$.

The choice between the versions is not neutral in practice. In one comparison
with $n_1 = 5$, $s_1^2 = 4$, $n_2 = 15$, $s_2^2 = 36$, and a mean difference of
$5$, the pooled test gives $t = 5/2.78 = 1.80$ with $df = 18$ (not
significant), while Welch's gives $t = 5/1.79 = 2.79$ with $df \approx 17.9$
(significant): the pooled test pays for its inflated standard error with a
loss of power. Welch's test is therefore a reasonable default. Its degrees of
freedom and critical values cost almost nothing when the variances are in fact
equal — the power loss is negligible — while it remains valid when they are
not.

## Paired-samples t test

Observations are paired when the same units are measured under both
conditions, measured at two times, or deliberately matched between conditions.
Pairing is analyzed through **difference scores**. The subtraction direction
must be fixed before the hypotheses are stated, because it determines the sign
of every difference and of the mean difference $\bar{D}$. Writing $D_i = X_{2i}
- X_{1i}$ for unit $i$ with scores $X_{1i}, X_{2i}$ in conditions 1 and 2, and
$\mu_D$ for the population mean of the differences, the paired test is a
one-sample $t$ test on the differences:

$$
t = \frac{\bar{D} - \mu_D}{s_D / \sqrt{n}} \quad \xrightarrow{\mu_D = 0} \quad t = \frac{\bar{D}}{s_D / \sqrt{n}}, \qquad df = n - 1,
$$

where $s_D$ is the standard deviation of the difference scores and $n$ is the
number of pairs. Because stable individual differences cancel inside each
$D_i$, the standard error of $\bar{D}$ can be much smaller than that of an
independent-samples comparison of the same conditions — though the gain
depends on how strongly the paired measurements correlate, and is not
guaranteed.

## Assumptions by design

| Assumption | Paired $t$ | Independent $t$ |
|---|---|---|
| Independence | Pairs are independent of other pairs | Observations are independent within and across groups |
| Distributional shape | Population of difference scores is approximately normal | Outcome is approximately normal within each population |
| Outliers | Sensitive to outliers in the difference scores | Sensitive to outliers within either group |
| Variances | No homogeneity-of-variance assumption | Pooled version assumes equal population variances |

The normality assumptions concern the population of difference scores (paired)
or each group's outcome distribution (independent), and both tests are
outlier-sensitive because $s$ or $s_D$ is not robust.

## Confidence intervals and effect sizes

A two-sided confidence interval for the estimated quantity follows the same
form throughout: estimate $\pm t^* \times SE$, where $t^*$ is the two-tailed
critical value at the chosen confidence level for the relevant $df$
(interpretation on the
[Confidence Intervals](/topics/foundations/confidence-intervals) page). For an
independent-samples difference the interval estimates $\mu_1 - \mu_2$; an
interval containing $0$ represents values compatible with no population
difference. For a paired design the interval estimates $\mu_D$.

Standardized effect sizes for these comparisons use design-specific
denominators: the sample standard deviation for a one-sample contrast, the
pooled standard deviation $s_p = \sqrt{s_p^2}$ for independent samples, and
$s_D$ for paired designs. The
[Effect Sizes](/topics/foundations/effect-sizes) page develops Cohen's $d$ and
its interpretation.

## Reporting

A result should be reported with the statistic, its degrees of freedom, the
$p$-value, the confidence interval, and the effect size, in a sentence that
states the direction and magnitude of the difference. Schematic templates:

- **Paired:** scores changed by $\bar{D}$ on average, 95% CI $[\text{lower},
  \text{upper}]$, $t(df) = \ldots$, $p = \ldots$, $d = \ldots$
- **Independent:** group 1 scored an average of $\ldots$ points higher than
  group 2, 95% CI $[\text{lower}, \text{upper}]$, $t(df) = \ldots$,
  $p = \ldots$, $d = \ldots$

The [hypothesis-testing](/topics/foundations/hypothesis-testing) and
[p-values](/topics/foundations/p-values) pages cover the decision procedure
and tail-probability interpretation that these reports build on; the
[statistical power](/topics/foundations/statistical-power) page covers how
design choices such as pairing and sample size affect a test's sensitivity.
