---
description: assumptions behind the unadjusted one-way repeated-measures F test — independence between participants, normality of within-participant comparison errors, and sphericity — with the difference-score interpretation of the pooled error term, Mauchly's test, and the Greenhouse–Geisser and Huynh–Feldt degrees-of-freedom corrections
---

# Repeated-Measures Assumptions and Corrections

**Canonical reference:** [Maxwell, Delaney, & Kelley (MDK)](/resources#designing-experiments-and-analyzing-data) #ref/mdk

The omnibus $F$ statistic of the
[one-way repeated-measures ANOVA](/topics/anova/repeated-measures-anova) is
referred to an $F$ distribution with $a - 1$ and $(a-1)(n-1)$ degrees of
freedom, where $a$ is the number of conditions and $n$ the number of
participants. That reference distribution describes how the statistic behaves
only under a set of normal-theory assumptions about the population from which
the participants come. Three assumptions are involved. The first two concern
independence and the distribution of the errors. The third, sphericity, is the
one specific to the repeated-measures design: it concerns the variability of
difference scores and arises once each participant is measured in more than
two conditions. This page states the three, shows through difference scores
why sphericity is exactly what the pooled error term requires, describes the
test of the assumption and its limits, and presents the degrees-of-freedom
corrections that adjust the omnibus reference distribution when sphericity is
doubtful.

Throughout, the example is the hypothetical caffeine study of the parent page:
$n = 10$ participants each take a capsule containing $0$, $100$, $200$, or
$400$ mg of caffeine ($a = 4$ conditions), and sleep duration is recorded in
hours.

## Independence and normality

**Independence between participants.** Different participants provide
independent sets of scores: the $a$ scores of one participant are independent
of the scores of every other participant.

**Normality.** The analysis retains the normal-theory assumption about the
population errors. Because the error term is built from within-participant
comparisons, the distributions that matter are those of the comparison errors:
the difference scores between pairs of conditions — and, more generally, any
contrast of one participant's scores across conditions — are assumed to be
normally distributed in the population. This is the distributional requirement
of the [paired-samples $t$ test](/topics/foundations/t-tests), extended to more
than two conditions.

**Sphericity.** The population variances of all pairwise difference scores are
equal. The assumption concerns the variability of difference scores, and most
of this page is devoted to it.

**Not assumed: independence within a participant.** The scores that one
participant supplies in different conditions need not be independent. They are
expected to be related — a participant who sleeps long in one condition tends
to sleep long in the others — and the design depends on that relationship
rather than being compromised by it. In the additive model of the parent page,

$$
Y_{ij} = \mu + \alpha_j + \pi_i + \varepsilon_{ij},
$$

$Y_{ij}$ is the score of participant $i$ ($i = 1, \ldots, n$) in condition $j$
($j = 1, \ldots, a$), $\mu$ is the grand level, $\alpha_j$ the effect of
condition $j$, $\pi_i$ the effect of participant $i$, and $\varepsilon_{ij}$
the error. The participant effect $\pi_i$ is a participant's stable overall
level, and it is what makes one participant's scores related across
conditions. Separating that level from the error is the point of the design.

## Difference scores and the pooled error term

Every comparison between conditions in a repeated-measures design is, for each
participant, a comparison of that participant's own scores. For a pair of
conditions $j$ and $k$, define the pairwise difference score of participant $i$
as

$$
D_{i(jk)} = Y_{ij} - Y_{ik}.
$$

Substituting the additive model shows why difference scores are the natural
currency of the design:

$$
D_{i(jk)} = Y_{ij} - Y_{ik} = (\alpha_j - \alpha_k) + (\varepsilon_{ij} - \varepsilon_{ik}).
$$

Both $\mu$ and the participant effect $\pi_i$ cancel, so a participant's
difference equals the difference between the two condition effects plus a
within-participant error. Under additivity, the expected condition difference is
the same for every participant, so the expected participant profiles — one line
per participant drawn across the conditions — are parallel. Observed profiles
can depart from that pattern through within-participant error. The mean square
$MS_{A\times S} = SS_{A\times S}/[(a-1)(n-1)]$ formed from the
participant-by-condition sum of squares $SS_{A\times S}$ measures those
departures from parallelism.

A single participant makes the bookkeeping concrete. Participant 1 slept $8$
hours after 0 mg (the placebo capsule) and $5$ hours after 400 mg, an observed
difference of $D_{1(14)} = 8 - 5 = 3$ hours. The additive model predicts
$\hat\alpha_1 - \hat\alpha_4 = \bar{Y}_{\cdot 1} - \bar{Y}_{\cdot 4} = 7.7 - 5.1 = 2.6$
hours, where $\hat\alpha_j = \bar{Y}_{\cdot j} - \bar{Y}$ is the estimated
condition effect, $\bar{Y}_{\cdot j}$ is the mean of the $n$ scores in
condition $j$, and $\bar{Y}$ is the grand mean of all $na$ scores. The gap
between the observed difference of $3$ hours and the
additive difference of $2.6$ hours reflects within-participant error.
Participant 1's overall level plays no part in the comparison, because it
cancels inside the difference.

The same two comparisons show how much the consistency of a change can differ
from comparison to comparison:

- **0 mg versus 400 mg.** The ten differences are $3, 3, 3, 2, 2, 2, 3, 2, 4, 2$
  hours: every participant sleeps between $2$ and $4$ hours less after 400 mg,
  and the profiles are nearly parallel. The mean difference is $2.6$ hours and
  the variance of the differences is $4.4/9 = 0.49$.
- **100 mg versus 200 mg.** The ten differences are $3, 1, -3, 1, 0, 0, 1, 2, 2, 3$
  hours: their signs and magnitudes vary across participants, so the profiles
  cross. The mean difference is $1.0$ hour and the variance of the differences
  is $28.0/9 = 3.11$.

This is what $SS_{A\times S}$ represents: how much participants' changes across
conditions differ from person to person. Nearly parallel profiles give small
residuals and crossing profiles large ones, and the variances of the difference
scores agree with what the profiles show.

### The error term as an average of difference variances

The link between the pooled error term and the difference-score variances is
exact, and it holds for every comparison at once. Let
$s^2_{D_{jk}}$ be the sample variance (divisor $n - 1$) of the $n$ difference
scores between conditions $j$ and $k$. For a complete data set, in which every
participant is observed in every condition, the error mean square is exactly
half the average of the $a(a-1)/2$ pairwise difference-score variances:

$$
MS_{A\times S}
= \frac{1}{2}\cdot\frac{\sum_{j<k} s^2_{D_{jk}}}{a(a-1)/2},
$$

where the sum runs over all unordered pairs of conditions. The six caffeine
comparisons give:

| Comparison ($j$ minus $k$) | $\bar{D}_{jk}$ | $SS_{D_{jk}}$ | $s^2_{D_{jk}}$ |
|---|---:|---:|---:|
| 0 mg minus 100 mg | 0.70 | 16.1 | 1.79 |
| 0 mg minus 200 mg | 1.70 | 18.1 | 2.01 |
| 0 mg minus 400 mg | 2.60 | 4.4 | 0.49 |
| 100 mg minus 200 mg | 1.00 | 28.0 | 3.11 |
| 100 mg minus 400 mg | 1.90 | 22.9 | 2.54 |
| 200 mg minus 400 mg | 0.90 | 24.9 | 2.77 |

Here $\bar{D}_{jk}$ is the mean of the $n$ difference scores for the pair and
$SS_{D_{jk}} = (n-1)\,s^2_{D_{jk}}$ their sum of squared deviations from that
mean. Substituting the variances,

$$
MS_{A\times S}
= \frac{1}{2}\cdot\frac{1.79 + 2.01 + 0.49 + 3.11 + 2.54 + 2.77}{6}
= \frac{1}{2}(2.12)
= 1.06,
$$

the same value as $28.6/27$ in the ANOVA table of the parent page. An
equivalent form of the identity is $\sum_{j<k} SS_{D_{jk}} = a\,SS_{A\times S}$:

$$
16.1 + 18.1 + 4.4 + 28.0 + 22.9 + 24.9 = 114.4 = 4 \times 28.6.
$$

The identity is algebraic bookkeeping, not an assumption: it holds for any
complete data set, however unequal the six variances are. Its consequence for
inference is what matters. $MS_{A\times S}$ is one number formed from every
pairwise difference, and the omnibus $F$ uses it as the error for every
comparison among the conditions simultaneously. The unadjusted test therefore
proceeds as if a single difference-score variance applied to every pair of
conditions. Under sphericity that is so: every pair has the same population
difference variance, written $\sigma^2_D$ below, and $MS_{A\times S}$ estimates
$\sigma^2_D/2$.

## Sphericity and compound symmetry

**Sphericity** is the assumption that the population variances of all pairwise
difference scores are equal. Writing $Y_j$ for the random variable that gives
a participant's score in condition $j$,

$$
\operatorname{Var}(Y_j - Y_k) = \sigma^2_D \qquad \text{for every pair of conditions } j \neq k,
$$

where $\sigma^2_D$ is one common value. For three conditions this reads
$\operatorname{Var}(Y_1 - Y_2) = \operatorname{Var}(Y_1 - Y_3) = \operatorname{Var}(Y_2 - Y_3)$;
for $a$ conditions, $a(a-1)/2$ difference variances must coincide. The
assumption concerns population variances. Sample difference variances are
never expected to be exactly equal, and the spread from $0.49$ to $3.11$ in the
caffeine table is by itself neither a violation nor a confirmation.

**Two conditions.** With $a = 2$ there is only one pairwise difference, hence
only one difference variance, and nothing for sphericity to equate. The
assumption places no restriction on the two-condition design: the
[paired-samples $t$ test](/topics/foundations/t-tests) requires independence
between pairs and normality of the difference scores, but nothing about
sphericity. The assumption becomes a separate issue only once $a \geq 3$.

**Equal variances of the original scores are not enough.** The variance of a
difference depends on the covariance as well:

$$
\operatorname{Var}(Y_j - Y_k) = \sigma^2_j + \sigma^2_k - 2\sigma_{jk},
$$

where $\sigma^2_j$ is the population variance of the scores in condition $j$
and $\sigma_{jk}$ the population covariance between conditions $j$ and $k$.
Even if every condition has the same variance, the difference variances are
equal only if all the covariances are equal as well. As a constructed
illustration, take three conditions that each have variance $1$, with
correlations $.8$, $.2$, and $.5$ between the three pairs of conditions. The
difference variances are then

$$
2(1 - .8) = 0.4, \qquad 2(1 - .2) = 1.6, \qquad 2(1 - .5) = 1.0,
$$

so identical original-score variances coexist with unequal difference
variances: no sphericity.

**Why violations matter.** When the population difference variances are
unequal, no single number can serve as the error for every comparison, and
$MS_{A\times S}$ is no longer a fixed multiple of one variance. The $F$
statistic then need not follow the $F$ distribution with $a - 1$ and
$(a-1)(n-1)$ degrees of freedom when the null hypothesis is true. The
unadjusted test can be anticonservative: across repeated samples from a
population whose condition means are all equal, it can reject the null
hypothesis more often than the nominal significance level. Its p-values can be
too small in this long-run sense, which is the same thing as an inflated
[Type I error](/topics/foundations/hypothesis-testing) rate. The statement
describes the behavior of the procedure over many samples; it is not a
guarantee about any one data set, and it does not mean that a corrected
p-value must exceed the uncorrected one every time. The remedy is to adjust the
reference distribution, by correcting its degrees of freedom, rather than the
statistic.

**Compound symmetry** is a condition on the covariance matrix of the original
scores: all variances equal and all covariances equal. For three conditions
the matrix is

$$
\begin{pmatrix}
\sigma^2 & \rho\sigma^2 & \rho\sigma^2 \\
\rho\sigma^2 & \sigma^2 & \rho\sigma^2 \\
\rho\sigma^2 & \rho\sigma^2 & \sigma^2
\end{pmatrix},
$$

where $\sigma^2$ is the common variance of the scores and $\rho$ the common
correlation between any two conditions. Under compound symmetry every
difference has variance $\sigma^2 + \sigma^2 - 2\rho\sigma^2 = 2\sigma^2(1 - \rho)$,
the same for every pair, so compound symmetry implies sphericity. The converse
is false: sphericity constrains only the combinations
$\sigma^2_j + \sigma^2_k - 2\sigma_{jk}$, not each variance and each covariance
separately, so a population can satisfy sphericity without being compound
symmetric. Compound symmetry is thus sufficient but not necessary — a more
restrictive condition than sphericity, easier to state and harder to meet.

## Mauchly's test without a preliminary-test gate

Mauchly's test is the standard test of the sphericity assumption. Its null
hypothesis is that sphericity holds in the population. The test statistic,
$W$, is converted into a chi-square statistic whose reference distribution and
degrees of freedom are reported by the software.

A significant result provides evidence against sphericity. A nonsignificant
result does not establish that sphericity holds; it only means that the sample
did not detect a departure. For the caffeine data, the software output is

$$
W = .35, \qquad \chi^2(5) = 8.19, \qquad p = .15,
$$

where the chi-square value is the small-sample-corrected form of the
statistic. The test is not significant, even though the sample difference
variances range from $0.49$ to $3.11$.

Two limitations explain why a nonsignificant Mauchly result carries little
weight:

- **Small samples provide little power.** With $n = 10$ participants the test
  has little chance of detecting even a substantial departure from sphericity,
  so nonrejection is the likely outcome whether or not the assumption holds.
- **Nonnormality can affect the test.** Departures from normality can distort
  the test itself, so its p-value is not automatically dependable when the
  normality assumption is doubtful.

For these reasons MDK recommends against using Mauchly's test as a preliminary
decision rule. A correction does not have to wait for a significant result: it
may be applied whether or not Mauchly's test is significant.

## Greenhouse–Geisser and Huynh–Feldt corrections

Both corrections keep the observed statistic and change the reference
distribution. Each rests on a population quantity $\epsilon$ that indexes how
far the covariance structure departs from sphericity and satisfies

$$
\frac{1}{a-1} \leq \epsilon \leq 1.
$$

The population $\epsilon$ equals $1$ when sphericity holds; smaller values
indicate larger departures, down to the lower bound $1/(a-1)$, which is $1/3$
for $a = 4$. The Greenhouse–Geisser and Huynh–Feldt procedures estimate
$\epsilon$ from the data by different estimators and multiply both degrees of
freedom by the estimate:

$$
df_1^* = \hat{\epsilon}\,(a-1), \qquad df_2^* = \hat{\epsilon}\,(a-1)(n-1),
$$

where $\hat{\epsilon}$ is the generic estimate: $\hat{\epsilon}_{\mathrm{GG}}$
denotes the Greenhouse–Geisser estimate and $\tilde{\epsilon}$ the
Huynh–Feldt estimate, with each procedure substituting its own estimate into
the formulas. Here $df_1$ and $df_2$ are the numerator and denominator degrees
of freedom of the unadjusted test, and the asterisk marks the corrected values.
**The observed $F$ value stays the same.** Condition means, sums of squares,
mean squares, and the statistic $F = MS_A/MS_{A\times S}$ — the condition mean
square $MS_A$ divided by the error mean square — are all untouched. Only the
p-value changes, because it is now read from the $F$ distribution with the
corrected degrees of freedom.

Two properties of the corrected degrees of freedom deserve emphasis. First,
they are generally fractional, and they enter the $F$ distribution as they
are. Second, they are a device for adjusting the reference distribution. They
are not a new count of the model's residual parameters, which remains
$(a-1)(n-1)$, and they do not alter any sum of squares or mean square.

### Greenhouse–Geisser for the caffeine data

The Greenhouse–Geisser estimate is
$\hat{\epsilon}_{\mathrm{GG}} = .743$ ($0.7426$ before rounding), well inside
the interval from $1/3$ to $1$. Multiplying the unadjusted degrees of freedom
by the unrounded estimate gives

$$
df_1^* = 0.7426 \times 3 = 2.23, \qquad
df_2^* = 0.7426 \times 3 \times 9 = 0.7426 \times 27 = 20.05.
$$

The corrected result is reported as $F(2.23,\,20.05) = 12.24$, $p < .001$. The
null hypothesis of equal population means is still rejected: the data still
provide evidence that population mean sleep duration is not the same across
the four caffeine doses. Only the reference distribution changed. Its $.05$
critical value rises from $2.96$ to $3.38$, and the p-value — although still
below $.001$ — is larger than the unadjusted one. The further the estimate of
$\epsilon$ departs from $1$, the smaller the corrected degrees of freedom and
the more severe the correction.

Compute the corrected degrees of freedom from the unrounded estimate.
Rounding $\hat{\epsilon}_{\mathrm{GG}}$ to $.743$ first makes the second
product $.743 \times 27 = 20.06$, not $20.05$.

### Huynh–Feldt

The Huynh–Feldt procedure uses a different estimator, which for the caffeine
data gives $\tilde{\epsilon} = .9981$, which rounds to $1.00$. A larger
estimate leaves more degrees of freedom, hence a lower critical value and a
smaller p-value. When its estimate is larger, as here, the Huynh–Feldt
correction is therefore the less conservative of the two, and a value this
close to $1$ leaves the degrees of freedom near the unadjusted $3$ and $27$.
The Huynh–Feldt estimate can exceed $1$, in which case it is capped at $1$;
for the caffeine data the estimate falls below $1$, so no cap was applied. With
small samples the two estimates can disagree considerably, as they do here —
$.743$ against $.998$ at $n = 10$. MDK recommends the Greenhouse–Geisser
correction.

## Scope: follow-up comparisons and design limitations

The epsilon corrections belong to the omnibus univariate $F$ test. Follow-up
comparisons among the conditions need not inherit the pooled error term and
its sphericity requirement. A comparison between two conditions can instead be
tested with its own difference scores: the $n$ pairwise differences are
subjected to a [paired-samples $t$ test](/topics/foundations/t-tests) on
$n - 1$ degrees of freedom, so each comparison's error is estimated from that
comparison's difference variance alone, with no pooling across comparisons and
no epsilon correction. These separate-error procedures, and the multiplicity
control they require, are treated in
[Repeated-Measures Comparisons](/topics/anova/repeated-measures-comparisons).

The univariate test has further limitations that a degrees-of-freedom
correction does not address. The traditional analysis generally requires
complete repeated observations for every included participant, and sphericity
can be implausible in practice, particularly when the within-subjects factor
is time. Multivariate analysis of variance and linear mixed-effects models are
alternative analyses with different assumptions and capabilities rather than
universal replacements. Counterbalancing the order of conditions addresses the
confounding of condition with position; it does not guarantee sphericity.
These matters are treated in
[Repeated-Measures Design Considerations](/topics/anova/repeated-measures-design).

## Related pages

- [One-Way Repeated-Measures ANOVA](/topics/anova/repeated-measures-anova) owns
  the notation, the partition of variability, the unadjusted omnibus $F$, and
  the additive model whose assumptions this page states.
- [Repeated-Measures Comparisons](/topics/anova/repeated-measures-comparisons)
  covers pairwise and complex comparisons that use a separate error term for
  each comparison.
- [Repeated-Measures Design Considerations](/topics/anova/repeated-measures-design)
  covers order effects, counterbalancing, carryover, repeated measurements
  over time, and the limitations of the traditional analysis.
- [t tests](/topics/foundations/t-tests) treats the paired-samples test to
  which the two-condition repeated-measures analysis reduces.
- [Hypothesis Testing](/topics/foundations/hypothesis-testing) defines the
  significance level and Type I error.
