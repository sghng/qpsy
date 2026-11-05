---
description: one-way ANOVA for comparing three or more independent group means — omnibus hypotheses, between- and within-group sums of squares, degrees of freedom, mean squares, the right-tail F test, assumptions and robustness, and computation from summary statistics
---

# One-Way ANOVA

**Canonical reference:** [Maxwell, Delaney, & Kelley (MDK)](/resources#designing-experiments-and-analyzing-data) #ref/mdk

An independent-samples $t$ test compares two group means. When a single factor
has three or more independent groups, testing every pair separately at level $\alpha$ runs
several tests on the same data and inflates the familywise Type I error rate
well above $\alpha$. One-way analysis of variance (ANOVA) instead poses a
single question: are all population means equal? It answers with one omnibus
test that holds the Type I error rate at the nominal level. The test works by
splitting the total variability in the data into a portion attributable to
differences among the group means and a portion attributable to variability
among individuals within groups, and asking whether the first is large
relative to the second.

## Omnibus hypotheses

For $a$ independent groups with population means $\mu_1, \ldots, \mu_a$, the
hypotheses are

$$
H_0\colon \mu_1 = \mu_2 = \cdots = \mu_a, \qquad H_1\colon \text{the means are not all equal.}
$$

The alternative is stated in words because it is not one specific pattern: it
is satisfied when a single mean departs from the rest, when the means split
into subsets, or when all of them differ. The null hypothesis of the omnibus
test is a single restriction on all means at once, which is what keeps the
error rate at $\alpha$ — and also why the test, by itself, cannot say where
among the groups the differences lie.

## Two sources of variability

Let $Y_{ij}$ denote observation $i$ in group $j$, with $n_j$ observations in
group $j$ and $N = \sum_j n_j$ in total. Write $\bar{Y}_j$ for the mean of
group $j$ and $\bar{Y}$ for the grand mean, the mean of all $N$ observations:

$$
\bar{Y} = \frac{\sum_j n_j \bar{Y}_j}{N}.
$$

With equal group sizes the grand mean is the ordinary average of the group
means; with unequal sizes it is weighted toward the larger groups.

Each observation's deviation from the grand mean decomposes exactly into a
between-group part and a within-group part:

$$
Y_{ij} - \bar{Y} = (\bar{Y}_j - \bar{Y}) + (Y_{ij} - \bar{Y}_j),
$$

which pairs the two sources of variability the test compares:

- **Within-group variability**, deviations of individuals from their own group
  mean. It reflects unsystematic sources — individual differences, sampling
  variability, and measurement error — and estimates the variation that is
  present regardless of any systematic difference among the treatments.
- **Between-group variability**, deviations of group means from the grand
  mean. It reflects the same unsystematic sources *plus* any systematic
  treatment effect, so it grows (relative to within-group variability) as the
  population means separate.

The central question of the classic ANOVA is whether the group means are more
variable than would be expected given the variability among individuals
within the groups — that is, whether the ratio of between-group to
within-group variance exceeds what chance alone produces.

## Sums of squares

Squaring and summing the deviations over all observations yields the three
sums of squares:

$$
SS_W = \sum_{j=1}^{a} \sum_{i=1}^{n_j} (Y_{ij} - \bar{Y}_j)^2, \qquad SS_B = \sum_{j=1}^{a} n_j (\bar{Y}_j - \bar{Y})^2, \qquad SS_T = \sum_{j=1}^{a} \sum_{i=1}^{n_j} (Y_{ij} - \bar{Y})^2,
$$

with $SS_W$ pooling the squared deviations within each group and $SS_B$
weighting each squared deviation of a group mean by that group's size — which
is why $SS_B$ is not simply the variance of the group means. The deviations
are not addable observation by observation once squared; additivity is
recovered after summing, and the partition is exact:

$$
SS_T = SS_B + SS_W.
$$

When only $SS_T$ and $SS_B$ are convenient to compute, $SS_W = SS_T - SS_B$
follows from the partition.

## Degrees of freedom and mean squares

Each sum of squares carries its own degrees of freedom, partitioned in the
same way:

$$
df_B = a - 1, \qquad df_W = N - a, \qquad df_T = N - 1, \qquad df_T = df_B + df_W.
$$

A mean square is a variance estimate — the term ANOVA uses for a sum of
squares divided by its degrees of freedom:

$$
MS_B = \frac{SS_B}{df_B}, \qquad MS_W = \frac{SS_W}{df_W}.
$$

Sums of squares and degrees of freedom are additive across the two sources;
mean squares are not. Under the null hypothesis both mean squares estimate
the same within-population variance, so their ratio tends to be near 1. When
the population means differ, $MS_B$ additionally carries the systematic
differences among groups and is inflated, while $MS_W$ continues to estimate
only the within-population variance. The many names these degrees of freedom
carry elsewhere — numerator and denominator df, df_error, model comparison's
$df_F$ and $df_R$ — are aligned in
[Crosswalk of ANOVA Quantities](/topics/anova/crosswalk).

## The F ratio and its distribution

The test statistic is the ratio of the two variance estimates,

$$
F = \frac{MS_B}{MS_W},
$$

which under the null hypothesis follows an $F$ distribution with $df_B = a-1$
and $df_W = N-a$ degrees of freedom. $F$ ratios cannot be negative and their
sampling distributions are right-skewed, centered near 1 when the null is
true; the shape depends on the pair of degrees of freedom, forming a family
of distributions.

The test is one-tailed even though the alternative hypothesis is nondirected.
Any configuration of unequal population means — whatever its direction or
pattern — acts on the ratio by inflating $MS_B$ and therefore pushing $F$
upward. Evidence against the null can only move the statistic into the upper
tail, so the rejection region lies entirely there: reject $H_0$ when $F$
exceeds the critical value $F_{\alpha;\,a-1,\,N-a}$.

## The ANOVA summary table

The computations are conventionally organized in a summary table:

| Source | $SS$ | $df$ | $MS$ | $F$ |
|---|---|---|---|---|
| Between groups | $SS_B$ | $a-1$ | $SS_B / df_B$ | $MS_B / MS_W$ |
| Within groups (error) | $SS_W$ | $N-a$ | $SS_W / df_W$ | |
| Total | $SS_T$ | $N-1$ | | |

The table encodes the structure of the test: $SS$ and $df$ add down to the
total row, each $MS$ is formed within its row, and the single $F$ is the
ratio of the between row's mean square to the within row's. The within-group
row is often labeled *error*, because $MS_W$ estimates the unexplained
variation against which group differences are judged.

## Computation from summary statistics

A one-way ANOVA does not require the raw data. Given the group sizes $n_j$,
sample means $\bar{Y}_j$, and sample variances $s_j^2$ for each group:

$$
\bar{Y} = \frac{\sum_j n_j \bar{Y}_j}{N}, \qquad SS_W = \sum_{j=1}^{a} (n_j - 1) s_j^2, \qquad SS_B = \sum_{j=1}^{a} n_j (\bar{Y}_j - \bar{Y})^2.
$$

The degrees of freedom, mean squares, and $F$ ratio then follow exactly as
above. This route reproduces published analyses from the summary statistics
reported in them and is often the quickest hand computation even when raw
data are available.

## Worked example

Three independent groups of $n_j = 5$ each ($N = 15$) have sample means
$9$, $8$, and $13$, and sample variances $6.0$, $3.5$, and $5.0$.

The grand mean is $\bar{Y} = 5(9 + 8 + 13)/15 = 10$. The sums of squares:

$$
SS_W = 4(6.0) + 4(3.5) + 4(5.0) = 24 + 14 + 20 = 58,
$$
$$
SS_B = 5(9-10)^2 + 5(8-10)^2 + 5(13-10)^2 = 5 + 20 + 45 = 70,
$$

so $SS_T = 70 + 58 = 128$, in agreement with summing all 15 squared
deviations from the grand mean. Degrees of freedom are $a - 1 = 2$,
$N - a = 12$, and $N - 1 = 14$. The mean squares are $MS_B = 70/2 = 35.00$
and $MS_W = 58/12 = 4.83$, giving

$$
F = \frac{35.00}{4.83} = 7.24,
$$

with $p = P(F_{2,12} \geq 7.24) = .00866$. The statistic far exceeds the
$\alpha = .05$ critical value of $3.89$, so the null hypothesis of equal
population means is rejected: the data provide evidence that at least one
population mean differs from the others. Which means differ, and by how much,
is a separate question that the omnibus test does not answer.

## Assumptions and robustness

| Assumption | Statement |
|---|---|
| Independence | Observations are independent within and across groups |
| Normality | The outcome is approximately normal within each population |
| Equal variances | The populations share a common variance $\sigma^2$ |

Equivalently, in error form: independent errors, each with mean zero and
common variance $\sigma^2$, following a normal distribution.

The test is fairly tolerant of the distributional assumptions but not of the
design one:

- **Normality**: moderate violations have little effect on the accuracy of
  the $p$-values; the concern grows with small or unequal group sizes.
- **Equal variances**: with equal group sizes the test is largely robust to
  moderate variance inequality. With unequal sizes and unequal variances, direction matters: a
  larger variance attached to the *smaller* group inflates the Type I error
  rate, while a larger variance attached to the *larger* group makes the
  test conservative. Balance reduces sensitivity to variance inequality but
  does not make every violation harmless.
- **Independence**: violations are the serious case. They distort $MS_W$ —
  the denominator of $F$ — and with it the Type I error rate, usually
  inflating it, and no amount of sample size or balance repairs them.

When unequal group sizes and unequal variances are a genuine concern, the
omnibus-level remedy is **Welch's heteroscedastic ANOVA**, a separate-variance
generalization of the two-group Welch correction that holds the Type I error
rate near its nominal level without assuming equal variances; standard
software provides it. Separate-variance procedures for follow-up comparisons,
analogous in spirit to the
[Welch correction for two groups](/topics/foundations/t-tests), are discussed
with [linear contrasts](/topics/anova/contrasts) and
[multiple comparisons](/topics/anova/multiple-comparisons).

## What the omnibus test establishes — and what it does not

- A rejected omnibus null is evidence that at least one population mean
  differs. It does not locate the difference: any pattern of partially or
  wholly separated means is compatible with the same rejection.
- A non-rejected null is not evidence that the means are equal. The test may
  simply lack the sensitivity to detect the differences present; see
  [statistical power](/topics/foundations/statistical-power).
- Statistical significance is a statement about compatibility with equal
  means, not about magnitude or importance; a large $F$ can reflect a large
  effect, a large sample, low within-group variability, or a combination.
  Measures of explained variance for the ANOVA context are treated under
  [model comparison](/topics/anova/model-comparison) and
  [effect sizes](/topics/foundations/effect-sizes).
- Locating and quantifying differences requires planned
  [linear contrasts](/topics/anova/contrasts) or
  [multiple-comparison procedures](/topics/anova/multiple-comparisons)
  chosen with the familywise error rate in mind.

## Related pages

- [Model comparison](/topics/anova/model-comparison) develops the same $F$
  test as a comparison between a restricted model with one common mean and a
  full model with separate group means.
- [Crosswalk of ANOVA quantities](/topics/anova/crosswalk) aligns the errors,
  sums of squares, and degrees of freedom across naming traditions.
- [Linear contrasts](/topics/anova/contrasts) tests targeted questions about
  specific means or combinations of means.
- [Multiple comparisons](/topics/anova/multiple-comparisons) covers
  familywise error and the correction procedures for families of follow-up
  tests.
- [Power for ANOVA](/topics/anova/power) covers prospective design of
  one-factor studies.
- [t tests](/topics/foundations/t-tests) treat the two-group case;
  [sampling distributions](/topics/foundations/sampling-distributions) and
  [hypothesis testing](/topics/foundations/hypothesis-testing) supply the
  framework the $F$ test builds on.
