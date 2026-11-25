---
description: Repeated-measures comparisons — contrast scores that turn each pairwise or complex within-subjects comparison into one value per participant, separate-error paired t tests, and Bonferroni familywise tests with simultaneous confidence intervals
---

# Repeated-Measures Comparisons

**Canonical reference:** [Maxwell, Delaney, & Kelley (MDK)](/resources#designing-experiments-and-analyzing-data) #ref/mdk

The omnibus test of
[One-Way Repeated-Measures ANOVA](/topics/anova/repeated-measures-anova) asks
whether the population means of the conditions are all equal. A rejection
establishes only that they are not: it does not say which conditions differ, by
how much, or in which direction. Substantive questions are usually narrower —
whether one condition differs from another, or whether a control condition
differs from the average of several treatments — and each is answered by a
specific comparison.

Between-subjects designs test a comparison against a single pooled
within-group mean square, the setting of
[Linear Contrasts](/topics/anova/contrasts). A within-subjects design cannot
use that yardstick: its within-condition variability still contains the stable
differences among participants that the design is meant to remove. The error
for a comparison must come instead from the variability of that comparison
across participants. This page develops the resulting procedure. Every
comparison, pairwise or complex, is reduced to one score per participant and
tested with a one-sample $t$ test on those scores, and a set of comparisons is
held to a familywise error rate with the Bonferroni procedure.

The running example is the hypothetical caffeine study of the parent page. Ten
participants ($n = 10$) each took a capsule containing $0$ mg (placebo), $100$
mg, $200$ mg, or $400$ mg of caffeine ($a = 4$ conditions), and nightly sleep
duration was recorded in hours. The $40$ scores are tabulated on the parent
page. The condition means, averaged over the $n$ participants and written
$\bar{Y}_{\cdot j}$ for condition $j$, are $7.70$, $7.00$, $6.00$, and $5.10$
hours for placebo, $100$ mg, $200$ mg, and $400$ mg, and the omnibus test
rejects the null hypothesis that they are equal. Which doses differ is the
question the comparisons below answer.

## From the omnibus test to specific comparisons

Let $\mu_1, \ldots, \mu_a$ be the population condition means. The omnibus null
hypothesis, $\mu_1 = \mu_2 = \cdots = \mu_a$, bundles every pattern of
differences into one hypothesis, so its rejection locates none of them. A
**[pairwise comparison](/topics/anova/contrasts#pairwise-and-complex-comparisons)** tests one difference between conditions $j$ and $k$,
$H_0\colon \mu_j = \mu_k$. A **[complex comparison](/topics/anova/contrasts#pairwise-and-complex-comparisons)** tests a statement that
involves more than two means, such as
$H_0\colon \mu_1 = (\mu_2 + \mu_3 + \mu_4)/3$, placebo against the average of
the three active doses. Each returns an estimate, a test, and an interval for
exactly the quantity it defines.

Such comparisons do not depend on a preliminary omnibus rejection. A
significant omnibus $F$ is not a prerequisite for the Bonferroni procedure,
whose familywise guarantee holds on its own; imposing the omnibus test as a
gate only makes the follow-up tests more conservative
([the omnibus test and follow-up procedures](/topics/anova/multiple-comparisons#the-omnibus-test-and-follow-up-procedures)).
Two separate decisions do matter, and the rest of the page takes them in turn:
which error term each comparison is tested against, and how the set of
comparisons is protected against multiplicity.

## A pooled error term or a separate one

The omnibus statistic is the ratio $F = MS_A/MS_{A\times S}$ of the condition
mean square $MS_A$ to the participant-by-condition mean square
$MS_{A\times S}$, both defined on the parent page. The denominator measures how
inconsistently the conditions differ from one participant to the next, and it is
a single number for the whole design: in a complete balanced data set it equals
half the average of the variances of all $a(a-1)/2$ pairwise difference scores
([Repeated-Measures Assumptions and Corrections](/topics/anova/repeated-measures-assumptions)).

If that same $MS_{A\times S}$ served as the error for every comparison, each
comparison would be judged against the one average. The yardstick fits a
particular comparison only if its difference scores vary as much as the average
does, and it fits all of them at once only if the difference scores of every
comparison have the same population variance. That condition is **sphericity**
— the assumption the unadjusted omnibus $F$ itself relies on. The caffeine data
show that it is not a technicality. The placebo-minus-400 mg differences have
variance $0.49$ and the 100-mg-minus-200 mg differences have variance $3.11$.
The pooled error mean square is $1.06$, corresponding to a pooled difference
variance of $2(1.06) = 2.12$ on the same scale. That pooled value exceeds $0.49$
but falls below $3.11$. Reused for every pair, the pooled term would therefore
overstate the error for some comparisons and understate it for others.

When sphericity is doubtful, each comparison can instead be tested against its
own error term, the variability of its own scores across participants. What
that choice does and does not assume deserves precision:

- **Dropped: the pooling assumption.** The test of one comparison no longer
  depends on the variances of the other comparisons.
- **Kept: independence and normality.** The participants' scores for the
  comparison must be independent of one another, and the population of those
  scores must follow a normal distribution. Dependence among the conditions
  within a participant is not assumed away; it is expected, and the
  comparison's own score absorbs it.
- **Kept: multiplicity.** Several comparisons on the same participants still
  accumulate Type I error across the set, and a separate error term does
  nothing about that.
- **Cost: degrees of freedom.** A separate error term has $n - 1$ degrees of
  freedom, here $9$ against the $27$ of the pooled term, so at the same tail
  probability, or the same familywise level, its critical values are higher
  than those of a pooled analysis. Interval widths do not follow from the
  degrees of freedom alone. Each half-width is a critical value multiplied by
  a standard error, and the separate and pooled standard errors are different
  estimates that can differ substantially; a small comparison-specific
  variance can more than offset the larger critical value, so a
  separate-error interval need not be the wider one.

## Contrast scores

A comparison is specified by coefficients $c_1, \ldots, c_a$ with
$\sum_{j=1}^{a} c_j = 0$, as in
[Linear Contrasts](/topics/anova/contrasts#contrast-coefficients):
$(1, 0, 0, -1)$ picks out placebo against 400 mg, and
$(1, -\tfrac13, -\tfrac13, -\tfrac13)$ sets placebo against the average of the
three active doses. The zero-sum restriction is what makes the combination a
comparison of means rather than a measure of their overall level. The
population quantity is the contrast $\psi = \sum_{j=1}^{a} c_j\,\mu_j$, and the
null hypothesis is $H_0\colon \psi = 0$.

Between-subjects and within-subjects analyses estimate $\psi$ in exactly the
same way, as a combination of the condition means. They differ in the standard
error. A within-subjects analysis applies the coefficients to each
participant's own scores, giving the **contrast score**

$$
L_i = \sum_{j=1}^{a} c_j\,Y_{ij},
$$

where $Y_{ij}$ is the score of participant $i$ ($i = 1, \ldots, n$) in
condition $j$ ($j = 1, \ldots, a$). Because the coefficients sum to zero, a
constant that is specific to the participant cancels: adding the same amount to
all $a$ of a participant's scores leaves $L_i$ unchanged. Each contrast score
therefore reflects only how that participant differs across conditions, and the
participant's overall level never needs to be estimated or removed.

The $n$ contrast scores are the data for the test. Their mean,

$$
\bar{L} = \frac{1}{n}\sum_{i=1}^{n} L_i = \sum_{j=1}^{a} c_j\,\bar{Y}_{\cdot j},
$$

is the same estimate $\hat\psi$ that a between-subjects analysis would report.
Their sample standard deviation,

$$
s_L = \sqrt{\frac{1}{n-1}\sum_{i=1}^{n}\left(L_i - \bar{L}\right)^2},
$$

is the comparison's own error term: the extent to which the comparison varies
from participant to participant. The standard error of $\bar{L}$ is
$s_L/\sqrt{n}$, and the test is the
[one-sample $t$ test](/topics/foundations/t-tests#one-sample-t-test) applied to
the contrast scores, with $n - 1$ degrees of freedom ($df$):

$$
t = \frac{\bar{L}}{s_L/\sqrt{n}}, \qquad df = n - 1,
$$

or, written as an $F$ test with $1$ and $n - 1$ degrees of freedom,

$$
F = \frac{\bar{L}^2}{s_L^2/n} = t^2, \qquad df = (1,\,n-1).
$$

The reference distribution is exact when the $n$ contrast scores are
independent draws from a normal distribution with mean $\psi$ and common
variance $\sigma_L^2$. No condition is placed on the variances of other
contrasts, which is why the test needs no sphericity.

### Stating the orientation and the scale

Two conventions must be fixed before the numbers can be read.

**Orientation.** The sign of $\bar{L}$ depends on which condition is subtracted
from which. Every difference on this page is written with the lower dose first:
placebo minus 400 mg means $Y_{i1} - Y_{i4}$, so a positive value indicates more
sleep at the lower dose. Reversing every coefficient reverses the signs of
$\bar{L}$, $t$, and both interval limits and leaves $|t|$, the $p$-value, and
the width of the interval unchanged.

**Scale.** The coefficients are normalized so that the positive ones sum to $1$
and the negative ones to $-1$
([Choosing a scaling](/topics/anova/contrasts#choosing-a-scaling)). The mean
contrast score is then a difference between two means, in hours of sleep, and
so are the intervals below. This is why each active dose carries a coefficient
of $-\tfrac13$ in the comparison against their average.

### Pairwise comparisons as the special case

A pairwise comparison assigns $1$ to one condition, $-1$ to another, and $0$ to
the rest. The contrast score is a difference score,

$$
D_i = Y_{ij} - Y_{ik},
$$

with mean $\bar{D} = \bar{Y}_{\cdot j} - \bar{Y}_{\cdot k}$ and standard
deviation $s_D$, and the test is the
[paired-samples $t$ test](/topics/foundations/t-tests#paired-samples-t-test):
$t = \bar{D}/(s_D/\sqrt{n})$ on $n - 1$ degrees of freedom. With only two
conditions there is a single contrast and nothing to pool, so no question about
equal variances across contrasts can arise
([Repeated-Measures Assumptions and Corrections](/topics/anova/repeated-measures-assumptions));
the two-condition repeated-measures $F$ of the parent page is this $t$ squared.

## Worked test: placebo versus 400 mg

Does sleep duration differ between placebo and 400 mg? The table forms the ten
difference scores from the data on the parent page and subtracts their mean,
$\bar{D} = 2.6$, to show where the variance comes from.

| Participant $i$ | Placebo $Y_{i1}$ | 400 mg $Y_{i4}$ | $D_i$ | $D_i - \bar{D}$ | $(D_i - \bar{D})^2$ |
|---:|---:|---:|---:|---:|---:|
| 1 | 8 | 5 | 3 | $0.4$ | $0.16$ |
| 2 | 9 | 6 | 3 | $0.4$ | $0.16$ |
| 3 | 7 | 4 | 3 | $0.4$ | $0.16$ |
| 4 | 9 | 7 | 2 | $-0.6$ | $0.36$ |
| 5 | 8 | 6 | 2 | $-0.6$ | $0.36$ |
| 6 | 5 | 3 | 2 | $-0.6$ | $0.36$ |
| 7 | 7 | 4 | 3 | $0.4$ | $0.16$ |
| 8 | 8 | 6 | 2 | $-0.6$ | $0.36$ |
| 9 | 9 | 5 | 4 | $1.4$ | $1.96$ |
| 10 | 7 | 5 | 2 | $-0.6$ | $0.36$ |
| Sum | 77 | 51 | 26 | $0$ | $4.40$ |

Every participant slept longer after placebo than after 400 mg, by between $2$
and $4$ hours. The mean difference equals the difference between the condition
means:

$$
\bar{D} = \frac{26}{10} = 2.6 = 7.70 - 5.10.
$$

Grouping the squared deviations by size,

$$
\sum_{i=1}^{10}\left(D_i - \bar{D}\right)^2 = 4(0.16) + 5(0.36) + 1.96 = 4.40.
$$

Dividing by $n - 1 = 9$ gives the variance of the difference scores, and its
square root the standard deviation:

$$
s_D^2 = \frac{4.40}{9} = .489, \qquad s_D = \sqrt{.489} = .699.
$$

The standard error of the mean difference, $SE$, is $s_D$ divided by
$\sqrt{n}$:

$$
SE = \frac{s_D}{\sqrt{10}} = \sqrt{\frac{.489}{10}} = .221.
$$

The test statistic is the mean difference in standard-error units:

$$
t = \frac{2.6}{.221} = 11.76, \qquad df = 9, \qquad p < .001,
$$

with a two-sided $p$-value. In $F$ form the same test is
$F(1, 9) = \bar{D}^2/(s_D^2/n) = 138.27$, the square of the unrounded $t$. The
mean difference lies almost twelve standard errors from zero. The variance
$s_D^2 = .489$ is the smallest of the six pairwise difference-score variances:
participants agree closely on how much less they sleep after 400 mg than after
placebo, and it is that agreement, as much as the size of the difference, that
the statistic registers.

So far this is one test assessed on its own. Asking which doses differ means
testing all six pairs, and that requires an error rate for the set.

## Bonferroni control over a declared family

With $a = 4$ conditions there are $C = a(a-1)/2 = 6$ pairwise comparisons, and
testing all of them on the same participants gives six opportunities for a
false rejection. The **family** is the set of comparisons over which the error
rate is controlled; here it is declared as all six pairs. At a familywise error
rate of $\alpha_{\mathrm{FW}} = .05$, the Bonferroni procedure tests every
member of the family at the per-comparison level

$$
\alpha_{\mathrm{PC}} = \frac{\alpha_{\mathrm{FW}}}{C} = \frac{.05}{6} = .0083.
$$

The union bound that justifies the adjustment and its validity whatever the
dependence among the tests are developed under
[The Bonferroni procedure](/topics/anova/multiple-comparisons#the-bonferroni-procedure),
and apply in a within-subjects design. The requirement to define the family
before examining results is treated under
[Planned and post hoc comparisons](/topics/anova/multiple-comparisons#planned-and-post-hoc-comparisons).
Two mechanics carry the adjustment into this setting, and both come from the
$t$ test on contrast scores.

**Decision rule.** A comparison is declared different when its unadjusted
two-sided $p$-value falls below $.0083$, equivalently when $|t|$ exceeds the
two-sided critical value $t_{\mathrm{crit}}$. That is the number for which a
$t$ variable on $n - 1 = 9$ degrees of freedom leaves probability
$\alpha_{\mathrm{PC}}/2$ in each tail beyond it,

$$
P\left(|t| > t_{\mathrm{crit}}\right) = \alpha_{\mathrm{PC}},
\qquad
t_{\mathrm{crit}} = t_{1 - \alpha_{\mathrm{PC}}/2,\; n-1} = 3.364.
$$

**Simultaneous intervals.** The interval for $\psi$ replaces the ordinary
critical value with the same $t_{\mathrm{crit}}$:

$$
\bar{L} \pm t_{\mathrm{crit}}\,\frac{s_L}{\sqrt{n}}.
$$

Each interval on its own covers its parameter with probability
$1 - \alpha_{\mathrm{PC}}$, so it misses with probability at most
$\alpha_{\mathrm{PC}}$; the probability that at least one of the $C$ intervals
misses is therefore at most $C\,\alpha_{\mathrm{PC}} = \alpha_{\mathrm{FW}}$.
All six intervals cover their six parameters simultaneously with probability at
least $1 - \alpha_{\mathrm{FW}} = .95$. The bound is conservative, because it
adds miss probabilities without credit for the overlap among tests that share
participants, so the simultaneous coverage is at least $.95$ and often more. An
interval excludes zero exactly when the corresponding test rejects, so
decisions can be read from the intervals alone
([Simultaneous confidence intervals](/topics/anova/multiple-comparisons#simultaneous-confidence-intervals)).

For placebo versus 400 mg the interval is

$$
2.6 \pm 3.364\,(.221) = 2.6 \pm .74 = [1.86,\ 3.34],
$$

with both limits in hours. Together with the other five comparisons, and with
at least $95\%$ confidence for the set, mean sleep duration after placebo
exceeds the mean after 400 mg by between $1.86$ and $3.34$ hours. The interval
adds what the decision withholds — the range of magnitudes compatible with the
data, in the outcome's own units.

## All six pairwise comparisons

| Comparison | $\bar{D}$ (hours) | $SE$ | $t(9)$ | Unadjusted $p$ | Bonferroni 95% CI (hours) | Different? |
|---|---:|---:|---:|---:|---|---|
| Placebo − 100 mg | 0.70 | .423 | 1.66 | .132 | $[-0.72,\ 2.12]$ | No |
| Placebo − 200 mg | 1.70 | .448 | 3.79 | .004 | $[0.19,\ 3.21]$ | Yes |
| Placebo − 400 mg | 2.60 | .221 | 11.76 | $< .001$ | $[1.86,\ 3.34]$ | Yes |
| 100 mg − 200 mg | 1.00 | .558 | 1.79 | .107 | $[-0.88,\ 2.88]$ | No |
| 100 mg − 400 mg | 1.90 | .504 | 3.77 | .004 | $[0.20,\ 3.60]$ | Yes |
| 200 mg − 400 mg | 0.90 | .526 | 1.71 | .121 | $[-0.87,\ 2.67]$ | No |

All entries are computed from unrounded values and rounded for display. Three
conventions govern how the table is read.

- Each mean difference is the first-listed dose minus the second, so every row
  compares sleep at the lower dose with sleep at the higher dose.
- Each row carries its own standard error $SE$, computed from that pair's ten
  difference scores; $t(9)$ is the mean difference divided by its standard
  error.
- The $p$-values are unadjusted. Each is the two-sided $p$-value of one
  comparison against the $t$ distribution on $9$ degrees of freedom, and none
  is compared with $.05$. A comparison is declared different only when its
  unadjusted $p$-value is below $\alpha_{\mathrm{PC}} = .0083$, equivalently
  when its Bonferroni interval excludes zero; the intervals share the critical
  value $3.364$ and cover all six differences simultaneously with probability at
  least $.95$.

What the table establishes:

- **Three differences.** Sleep duration was shorter after 200 mg than after
  placebo, shorter after 400 mg than after placebo, and shorter after 400 mg
  than after 100 mg.
- **Three pairs not distinguished.** The three adjacent pairs — placebo against
  100 mg, 100 mg against 200 mg, and 200 mg against 400 mg — are not declared
  different. This is imprecision, not evidence of equivalence. Their intervals
  include zero, but they also include differences of $2.12$, $2.88$, and
  $2.67$ hours in the direction of shorter sleep at the higher dose: with ten
  participants the study cannot reliably separate adjacent doses, and a
  sizeable difference between neighboring doses remains compatible with the
  data.
- **Size alone does not decide.** The placebo-minus-200 mg difference of
  $1.70$ hours is declared and the 100-mg-minus-200 mg difference of $1.00$
  hour is not, because their standard errors are $.448$ and $.558$: the same
  threshold applies to every row, and the variability of each pair's own
  difference scores separates them.
- **The adjustment changes thresholds, not these verdicts.** No unadjusted
  $p$-value lies between $.0083$ and $.05$, so the same three pairs would be
  declared at the unadjusted $.05$ level; the Bonferroni intervals are wider
  than ordinary $95\%$ intervals would be.

Taken together, the condition means fall as the dose rises, every pair two or
more steps apart in the ordered dose levels is declared different, and no
adjacent pair is distinguished.

## A complex comparison: placebo against the average active dose

Pairwise comparisons are not the only questions the design can answer. Whether
sleep after placebo differs from sleep after caffeine *on average across the
three doses* is a **complex comparison**, since it involves all four means. Its
coefficients, $(1, -\tfrac13, -\tfrac13, -\tfrac13)$, sum to zero, and each
participant's contrast score sets that participant's placebo night against the
average of their three active nights:

$$
L_i = Y_{i1} - \frac{Y_{i2} + Y_{i3} + Y_{i4}}{3}.
$$

Participant 1, with scores of $8$, $10$, $7$, and $5$ hours, contributes

$$
L_1 = 8 - \frac{10 + 7 + 5}{3} = 0.67.
$$

The ten contrast scores in participant order are $0.67$, $1.33$, $1.33$,
$3.00$, $1.33$, $1.33$, $2.00$, $1.33$, $2.67$, and $1.67$; every participant
slept longer after placebo than after their own average active dose. The test
is the same one-sample $t$ test. The mean contrast score is again the
difference between the condition means that the coefficients define, and the
standard error is $s_L/\sqrt{n}$:

$$
\bar{L} = 7.70 - \frac{7.00 + 6.00 + 5.10}{3} = 1.67,
$$

$$
s_L = .70, \qquad SE = \frac{s_L}{\sqrt{10}} = .222,
$$

$$
t = \frac{\bar{L}}{SE} = 7.50, \qquad df = 9, \qquad p < .001,
$$

with a two-sided $p$-value. The displayed quantities are rounded; the standard
error and the statistic are computed from unrounded values.

No separate standard-error formula is needed. Whatever the pattern of
dependence among a participant's four scores, it is carried inside that
participant's single contrast score, and $s_L$ measures how much those scores
vary.

The result supports one statement: averaged over the three doses, participants
slept $1.67$ hours longer after placebo than after caffeine, and the placebo
mean differs from the average active-dose mean. The evidence is strong but
narrow. It does not show that every active dose differs from placebo. An
average can be carried by one or two of its components while another
contributes nothing, and the pairwise table cannot rule that out: the 100 mg
mean is not distinguished from placebo, whereas the 200 mg and 400 mg means are.
The individual doses are answered by their own comparisons; the complex
comparison answers only the question its coefficients pose
([What a single contrast establishes](/topics/anova/contrasts#what-a-single-contrast-establishes)).

The complex comparison is also a seventh test of the same data. If it was
planned alongside the six pairwise tests, the family has $C = 7$ members, and
every one of them must be judged at $\alpha_{\mathrm{PC}} = .05/7 = .0071$,
with critical value about $3.46$ instead of $3.364$. In this example no verdict
would change — the complex contrast, at $p < .001$, would be declared along
with the three pairs — but all seven intervals would widen. The family has to
match the questions actually investigated
([Planned and post hoc comparisons](/topics/anova/multiple-comparisons#planned-and-post-hoc-comparisons)):
testing seven comparisons while correcting for six understates the error rate.

## Reporting and boundaries

A follow-up analysis is reported so that every decision can be reconstructed.
For each comparison, give:

- the orientation — which condition is subtracted from which;
- the estimate in the outcome's units;
- the test statistic with its degrees of freedom, as $t(9)$ or equivalently
  $F(1, 9)$;
- the $p$-value convention — whether values are unadjusted and judged against
  $\alpha_{\mathrm{PC}}$ or already adjusted — and the family size $C$ behind
  the level;
- the simultaneous interval with its familywise confidence level.

One comparison then reads: sleep duration was $2.60$ hours longer after
placebo than after 400 mg, $t(9) = 11.76$, unadjusted $p < .001$, with a
Bonferroni adjustment for a family of six pairwise comparisons
($\alpha_{\mathrm{PC}} = .0083$) and a 95% familywise interval of $[1.86,\ 3.34]$
hours.

Three boundaries keep this page in place.

- **Effect sizes** for the omnibus effect and for the standardized difference
  between two conditions, together with the integrated report of the whole
  analysis, belong to
  [One-Way Repeated-Measures ANOVA](/topics/anova/repeated-measures-anova).
- **Assumptions and corrections** for the omnibus test — independence,
  normality, sphericity, and the Greenhouse–Geisser and Huynh–Feldt epsilon
  corrections — belong to
  [Repeated-Measures Assumptions and Corrections](/topics/anova/repeated-measures-assumptions).
  The epsilon corrections change the reference distribution of the omnibus $F$;
  they have no counterpart in the tests on this page. A separate-error $t$ test
  keeps its $n - 1$ degrees of freedom whatever the sphericity of the data,
  because its error term comes from the one contrast being tested. A report can
  therefore pair a corrected omnibus test with follow-up $t$ tests on
  uncorrected degrees of freedom without inconsistency.
- **Design.** Order effects, counterbalancing, and carryover determine whether
  a difference between condition means can be attributed to the conditions
  themselves; the tests on this page establish mean differences, not causes
  ([Repeated-Measures Design Considerations](/topics/anova/repeated-measures-design)).

## Related pages

- [One-Way Repeated-Measures ANOVA](/topics/anova/repeated-measures-anova)
  supplies the design, the caffeine data, the omnibus test that the
  comparisons localize, and the omnibus effect sizes and reporting conventions.
- [Repeated-Measures Assumptions and Corrections](/topics/anova/repeated-measures-assumptions)
  defines independence, normality, and sphericity, and the epsilon corrections
  to the omnibus reference distribution.
- [Linear Contrasts](/topics/anova/contrasts) develops the generic
  between-subjects machinery — coefficients, scaling, $F$ and $t$ forms, and
  intervals — that this page re-instantiates with contrast scores.
- [Multiple Comparisons](/topics/anova/multiple-comparisons) owns
  per-comparison and familywise error rates, the Bonferroni procedure, and
  simultaneous intervals.
- [t Tests](/topics/foundations/t-tests) develops the paired-samples test that
  a pairwise comparison becomes.
- [Repeated-Measures Design Considerations](/topics/anova/repeated-measures-design)
  treats order, counterbalancing, and carryover.
