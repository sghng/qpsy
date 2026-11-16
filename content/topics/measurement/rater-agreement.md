---
description: Chance-corrected rater agreement for categorical classifications (Cohen's kappa and weighted kappa) and intraclass correlation coefficients for quantitative ratings, with ANOVA mean-square estimators for the Shrout-Fleiss reliability designs
---

# Rater Agreement and Intraclass Correlation

When the same targets are rated by two or more raters, the amount of agreement
can be summarized directly or after correcting for the agreement expected by
chance alone. The appropriate coefficient family depends on the rating scale:
**kappa** coefficients apply to categorical classifications, while **intraclass
correlation coefficients** apply to quantitative scores whose rater labels are
exchangeable. This page develops both. Internal-consistency reliability of
multi-item instruments is a different design, treated in
[Internal Consistency and Coefficient Alpha](/topics/measurement/internal-consistency);
the true-score variance framework behind those coefficients is in
[Classical Test Theory](/topics/measurement/classical-test-theory).

## Observed and chance-corrected agreement

For two raters classifying the same $n$ targets into the same categories, the
**observed agreement** $p_o$ is the proportion of targets placed in the same
category by both raters. Raw agreement is easy to interpret but is inflated by
chance: two raters who both classify most targets into one common category
will agree frequently even if they share no judgment. A chance-corrected
coefficient compares observed agreement with the agreement expected under a
chance model, $p_e$, computed from the raters' marginal distributions as if
the two classifications were statistically independent.

Cohen's kappa (Cohen, 1960) is the standard chance-corrected coefficient for
two categorical raters:

$$
\kappa = \frac{p_o - p_e}{1 - p_e}
$$

where $p_o = \sum_i p_{ii}$ is the sum of the diagonal proportions of the
agreement table and $p_e = \sum_i p_{i \cdot} p_{\cdot i}$ is the sum of the
products of the row and column proportions for each category.

### Worked example

Two raters classify 94 people as having ever smoked a cigarette or not. A
questionnaire and an interview produce the following cross-classification:

|                    | Interview: yes | Interview: no | Total |
|--------------------|---------------:|--------------:|------:|
| Questionnaire: yes |             61 |             2 |    63 |
| Questionnaire: no  |              6 |            25 |    31 |
| Total              |             67 |            27 |    94 |

The observed and expected agreements are

$$
p_o = \frac{61 + 25}{94} = \frac{86}{94} = 0.915
$$

$$
p_e = \frac{63 \times 67 + 31 \times 27}{94^2} = \frac{5058}{8836} = 0.572
$$

$$
\kappa = \frac{0.915 - 0.572}{1 - 0.572} = \frac{0.343}{0.428} = 0.801
$$

Observed agreement is very high (91.5%), but because both raters classify
most people into the same category, more than half of that agreement (57.2%)
would be expected by chance. Chance correction leaves $\kappa = 0.801$.

### Range and the fixed-margin lower bound

Three reference points follow directly from the formula:

- $\kappa = 1$ exactly when $p_o = 1$ (perfect agreement);
- $\kappa = 0$ exactly when $p_o = p_e$ (agreement no better than chance);
- $\kappa < 0$ when agreement falls below the chance expectation, which is
  possible and signals systematic disagreement rather than mere noise.

The lower limit of $\kappa$ is often stated as $-p_e / (1 - p_e)$, the value
reached if $p_o$ could fall to zero. That algebraic limit is generally not
attainable, because the row and column margins of a real table constrain how
small the diagonal total can be. With fixed margins the tight lower bound is
$(p_{o,\min} - p_e)/(1 - p_e)$, where $p_{o,\min}$ is the smallest diagonal
total consistent with the margins — for a $2 \times 2$ table,
$\bigl[\max(0, r_1 - c_2) + \max(0, r_2 - c_1)\bigr]/n$ in count terms. In the
smoking example the algebraic bound is $-1.339$, below $-1$ and therefore
impossible, while the margin-consistent minimum is $p_{o,\min} = 36/94$ and
$\kappa_{\min} = -0.443$. Two consequences follow: the attainable range of
$\kappa$ depends on the marginal distributions, not only on $p_e$, and
extremely negative values require nearly balanced margins.

Because $p_e$ is determined by the margins, the same observed agreement rate
yields different $\kappa$ values under different category prevalences. Highly
skewed margins force $p_e$ up and shrink the correction factor $1 - p_e$, so
$\kappa$ can be modest despite high raw agreement; this dependence is a
property of the coefficient, not evidence that the raters disagree.

### Verbal interpretation bands

A widely reproduced table from Landis and Koch (1977) labels ranges of
$\kappa$: Poor ($<0$), Slight ($0.00$–$0.20$), Fair ($0.21$–$0.40$), Moderate
($0.41$–$0.60$), Substantial ($0.61$–$0.80$), and Almost Perfect
($0.81$–$1.00$). The authors explicitly describe these divisions as
arbitrary: they are convenient verbal benchmarks, not validated cutoffs, and
the same caution applies to them as to verbal bands for standardized effect
sizes in [Effect Sizes](/topics/foundations/effect-sizes). The worked value
$\kappa = 0.801$ illustrates the fragility of such bands — it sits at the
boundary between Substantial and Almost Perfect and falls between the printed
band edges. Reporting the coefficient itself, with its design context,
matters more than the band label.

## Weighted kappa

Dichotomous and nominal classifications treat every disagreement as equally
serious. When categories are ordered — severity ratings, letter grades,
Likert responses — a disagreement by one category is usually less consequential
than a disagreement by several. The weighted kappa coefficient (Cohen, 1968)
assigns nonnegative disagreement weights $w_{ij}$, conventionally zero on the
diagonal and increasing with the severity of disagreement:

$$
\kappa_w = 1 - \frac{\sum_{i,j} w_{ij}\, p_{ij}}{\sum_{i,j} w_{ij}\, p_{e,ij}}
$$

where $p_{ij}$ and $p_{e,ij}$ are the observed and chance-expected proportions
of cell $(i,j)$. With identity weights ($w_{ij} = 0$ on the diagonal, equal
positive weights off it), $\kappa_w$ reduces to $\kappa$. Common schemes for
$c$ ordered categories include linear weights $w_{ij} \propto |i - j|$ and
quadratic weights $w_{ij} \propto (i - j)^2$, each rescaled so the largest
possible disagreement receives weight 1. The choice of weights is a
substantive judgment about how serious each kind of disagreement is, and the
value of $\kappa_w$ can change materially with the scheme; the weighting used
must be reported along with the coefficient.

## Why ordinary correlation is the wrong starting point

For quantitative ratings, an apparent shortcut is to compute the Pearson
correlation between the two raters' columns. This fails structurally when the
raters are **exchangeable** — when the assignment of a rating to "rater 1"
rather than "rater 2" carries no information, as with the two members of a
twin pair or partners of a couple. Pearson correlation is a statistic of
labeled columns: it pairs each rater-1 score with a specific rater-2 score.
When members are exchangeable, no such pairing is canonical.

The consequence is concrete. For five pairs whose scores rise together
monotonically, the correlation between the two columns is $r = 1.00$ under one
assignment of members to columns; exchanging the members within three of the
five pairs — the same data, differently arranged — gives $r = 0.80$. A
summary that changes under a relabeling the design says is meaningless cannot
measure agreement. Neither the correlation from one arbitrary ordering nor
the average of the correlations across all possible orderings yields the
symmetric coefficient that the design calls for.

## Fisher's symmetric-pair form

The resolution is to use a statistic that treats the two scores within each
pair symmetrically. For $N$ pairs $(x_{n1}, x_{n2})$ with exchangeable
occasions, Fisher proposed pooling both scores into a single mean and
variance,

$$
\bar{x} = \frac{1}{2N} \sum_{n=1}^{N} \left( x_{n1} + x_{n2} \right)
$$

$$
s^2 = \frac{1}{2N} \left[ \sum_{n=1}^{N} \left( x_{n1} - \bar{x} \right)^2 + \sum_{n=1}^{N} \left( x_{n2} - \bar{x} \right)^2 \right]
$$

and forming the intraclass correlation

$$
r_{\mathrm{ICC}} = \frac{1}{N s^2} \sum_{n=1}^{N} \left( x_{n1} - \bar{x} \right) \left( x_{n2} - \bar{x} \right)
$$

Both members of every pair are pooled for $\bar{x}$, both deviations of every
pair are pooled for $s^2$, and the cross-product uses the pooled mean, so the
statistic is unchanged when the two columns are exchanged. Later
modifications replace the divisor $N$ in the denominator of $r_{\mathrm{ICC}}$
by $N - 1$, or the divisor $2N$ in $s^2$ by $2N - 1$; these are denominator
conventions, and the choice affects the estimate. The analysis-of-variance
formulation next makes those conventions explicit through mean squares with
stated degrees of freedom.

## Analysis-of-variance models and mean squares

Write $x_{ij}$ for the rating of target $i$ ($i = 1, \dots, n$) by judge $j$
($j = 1, \dots, k$), with $\bar{x}_{i \cdot}$ the mean for target $i$,
$\bar{x}_{\cdot j}$ the mean for judge $j$, and $\bar{x}$ the grand mean. Two
additive models cover the standard designs:

$$
x_{ij} = \mu + a_i + w_{ij}
$$

$$
x_{ij} = \mu + a_i + b_j + (ab)_{ij} + e_{ij}
$$

The one-way model has a target effect $a_i$ and a residual $w_{ij}$ that
absorbs everything else. The two-way model adds a judge effect $b_j$ and a
target-by-judge interaction $(ab)_{ij}$; when the two members of a pair are
indistinguishable, as in the twin design, the interaction and error terms
cannot be separated and merge into a single residual $w_{ij}$.

Estimation proceeds from the mean squares of the two-way decomposition:

| Mean square | Definition | Degrees of freedom |
|---|---|---|
| $BMS$ (between targets) | $k \sum_i (\bar{x}_{i \cdot} - \bar{x})^2$ | $n - 1$ |
| $JMS$ (between judges) | $n \sum_j (\bar{x}_{\cdot j} - \bar{x})^2$ | $k - 1$ |
| $WMS$ (within targets) | $\sum_i \sum_j (x_{ij} - \bar{x}_{i \cdot})^2$ | $n (k - 1)$ |
| $EMS$ (residual) | $\sum_i \sum_j (x_{ij} - \bar{x}_{i \cdot} - \bar{x}_{\cdot j} + \bar{x})^2$ | $(n - 1)(k - 1)$ |

$WMS$ is the residual mean square of the one-way model; $EMS$ is the residual
of the two-way model. The two are related by pooling: adding the
between-judge and residual sums of squares and dividing by the combined
degrees of freedom, $n(k-1)$, recovers $WMS$. Variance-component versions of the models write
the total single-rating variance as

$$
\sigma^2_{\text{total}} = \sigma^2_a + \sigma^2_b + \sigma^2_w
$$

where $\sigma^2_a$ is target variance, $\sigma^2_b$ judge variance, and
$\sigma^2_w$ the merged interaction-plus-error variance. The intraclass
correlation is the share of total variance attributable to targets, and the
denominator of that share is what differs across designs. The mean squares
are the same machinery as in [One-Way ANOVA](/topics/anova/one-way-anova),
applied to a variance-component rather than a hypothesis-testing goal.

## The Shrout–Fleiss reliability designs

Which variance components belong in the ICC denominator depends on how judges
were assigned and on what the coefficient should generalize over. Shrout and
Fleiss (1979) distinguish three designs, each defining a different estimand:

1. **Case 1 — different random judges per target.** Each target is rated by a
   different set of $k$ judges sampled from a judge population. Judge variance
   cannot be separated from error and is absorbed into the residual; a single
   rating's reliability is
   $\rho = \sigma^2_a / (\sigma^2_a + \sigma^2_w)$.
2. **Case 2 — the same random judges for all targets.** One sample of $k$
   judges rates every target, and conclusions generalize to the judge
   population. The estimand includes judge variance:
   $\rho = \sigma^2_a / (\sigma^2_a + \sigma^2_b + \sigma^2_w)$. Because
   differences between judge means count against agreement, this is an
   **absolute agreement** coefficient.
3. **Case 3 — the same fixed judges for all targets.** The same $k$ judges
   rate every target and conclusions are limited to those judges, so judge
   means are not a source of generalization error. The **consistency**
   estimand excludes judge variance:
   $\rho = \sigma^2_a / (\sigma^2_a + \sigma^2_w)$.

Absolute agreement asks whether two judges assign the same value; consistency
asks whether they order targets the same way, tolerating additive offsets
between judges. A pair of judges with identical rank orders but different
means show perfect consistency and less-than-perfect absolute agreement. The
distinction is not cosmetic — it changes the coefficient, as the worked
example below shows.

Matching mean squares to estimands yields the single-rater estimators:

$$
\mathrm{ICC}(1,1) = \frac{BMS - WMS}{BMS + (k - 1)\, WMS}
$$

$$
\mathrm{ICC}(2,1) = \frac{BMS - EMS}{BMS + (k - 1)\, EMS + \frac{k}{n} \left( JMS - EMS \right)}
$$

$$
\mathrm{ICC}(3,1) = \frac{BMS - EMS}{BMS + (k - 1)\, EMS}
$$

The second argument indexes the measurement being summarized: $(\cdot, 1)$ is
the reliability of a **single** rating, while $(\cdot, k)$ is the reliability
of the **mean of $k$** ratings, obtained from the corresponding single-rater
coefficient $r_1$ by the Spearman–Brown step-up
$k r_1 / (1 + (k - 1) r_1)$. In mean-square form,

$$
\mathrm{ICC}(1,k) = \frac{BMS - WMS}{BMS}, \qquad
\mathrm{ICC}(2,k) = \frac{BMS - EMS}{BMS + \frac{1}{n} \left( JMS - EMS \right)}
$$

$$
\mathrm{ICC}(3,k) = \frac{BMS - EMS}{BMS}
$$

Averaging over $k$ judges removes judge-mean offsets from the residual noise
only when the mean is the score actually used, which is why the $(\cdot, k)$
forms matter for designs that score targets by judge means.

## Worked ANOVA example

Six targets are each rated by the same four judges:

| Target | Judge 1 | Judge 2 | Judge 3 | Judge 4 |
|---|---:|---:|---:|---:|
| 1 | 9 | 2 | 5 | 8 |
| 2 | 6 | 1 | 3 | 2 |
| 3 | 8 | 4 | 6 | 8 |
| 4 | 7 | 1 | 2 | 6 |
| 5 | 10 | 5 | 6 | 9 |
| 6 | 6 | 2 | 4 | 7 |

The mean squares are $BMS = 11.2417$, $JMS = 32.4861$, $WMS = 6.2639$, and
$EMS = 1.0194$. Substituting into the estimators above (computed from
unrounded mean squares):

| Coefficient | Value |
|---|---:|
| $\mathrm{ICC}(1,1)$ | $0.16574$ |
| $\mathrm{ICC}(2,1)$ | $0.28976$ |
| $\mathrm{ICC}(3,1)$ | $0.71484$ |

The same data yield $\mathrm{ICC}$ values of $.17$, $.29$, and $.71$ under
the three designs. Two features of the table explain the spread. Judges
differ markedly in their mean ratings — visible in the column means and in
$JMS$ being nearly three times $BMS$ — so judge variance is a large share of
total variance. Absolute agreement (Case 2) counts that variance against
reliability and lands low; consistency (Case 3) sets it aside, leaving
target variance against a much smaller residual, and lands high. Case 1,
which pools judge and residual variance into $WMS$ because each target
nominally has its own judges, is lowest of the three in these data. No single
number is "the"
ICC of these data: the design, the generalization target, and the
absolute-versus-consistency choice define which coefficient is being
estimated, and that choice must be reported with the value.

## Assumptions and failure modes

The coefficients carry model assumptions that failures often trace back to:

- **Exchangeability.** The symmetric ICC forms assume the assignment of
  ratings to positions within a pair carries no information. If one position
  is systematically different (first-born twin, self-report versus informant),
  the pair members are not exchangeable and the design is a labeled two-group
  problem, not an ICC problem.
- **ANOVA model idealizations.** The mean-square estimators assume additive
  independent effects and equal residual variances across targets and judges;
  interval estimates further treat the effects as approximately normal.
  Judge-by-target interactions large enough to dominate the residual make any
  single-variance-ratio summary misleading.
- **Kappa's margin dependence.** $\kappa$ corrects for chance using the
  observed margins, so its value depends on category prevalence, and its
  attainable range shrinks as margins become skewed (see the fixed-margin
  bound above). Comparisons of $\kappa$ across studies with different
  prevalences are not comparisons of the same quantity.
- **Arbitrary interpretation bands.** The Landis–Koch labels are descriptive
  conventions, not validated thresholds, and values near band edges are
  indistinguishable in practice.
- **Weight sensitivity.** $\kappa_w$ depends on the weight scheme; two
  analysts can report different values from the same table.
- **Design mismatch.** Reporting a consistency ICC when absolute agreement is
  the substantive question (or vice versa), or a single-rater ICC when scores
  are judge means, understates or overstates reliability by construction —
  in the worked example, by a factor exceeding four.

Related but distinct phenomena belong elsewhere: systematic rater tendencies
such as halo are treated as response bias in
[Response Bias and Careless Responding](/topics/measurement/response-bias),
and the correlation machinery underlying the Pearson comparison is in
[Correlation](/topics/measurement/correlation).

## References

Cohen, J. (1960). A coefficient of agreement for nominal scales. *Educational
and Psychological Measurement*, 20(1), 37-46.
[doi:10.1177/001316446002000104](https://doi.org/10.1177/001316446002000104)

Cohen, J. (1968). Weighted kappa: Nominal scale agreement provision for
scaled disagreement or partial credit. *Psychological Bulletin*, 70(4),
213-220. [doi:10.1037/h0026256](https://doi.org/10.1037/h0026256)

Landis, J. R., & Koch, G. G. (1977). The measurement of observer agreement
for categorical data. *Biometrics*, 33(1), 159-174.
[doi:10.2307/2529310](https://doi.org/10.2307/2529310)

Shrout, P. E., & Fleiss, J. L. (1979). Intraclass correlations: Uses in
assessing rater reliability. *Psychological Bulletin*, 86(2), 420-428.
[doi:10.1037/0033-2909.86.2.420](https://doi.org/10.1037/0033-2909.86.2.420)
