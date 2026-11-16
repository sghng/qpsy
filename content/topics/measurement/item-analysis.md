---
description: Classical item analysis — proportion-correct difficulty, upper–lower group discrimination, item–rest correlation, item reliability and validity indices, and distractor analysis, with screening conventions and a worked discrimination example
---

# Classical Item Analysis

Classical item analysis evaluates test items after administration using the
observed item scores and total test scores of the examinee sample. It answers
three practical questions: which items are working well, which are defective,
and which should be retained, revised, or removed. It operates entirely on
observed scores within [classical test theory](/topics/measurement/classical-test-theory);
item parameters tied to a latent-trait response model belong to
[item response theory](/topics/irt).

## Item difficulty

The difficulty of item $i$ is the proportion of examinees answering it
correctly,

$$
P_i=\frac{\text{number correct on item } i}{n},
$$

where $n$ is the number of examinees. Despite the label, higher values mean an
*easier* item. This proportion is sometimes called the item *p-value*; it is a
descriptive proportion, not the p-value of a significance test, and the two
must not be confused.

Difficulty heuristics:

- With no guessing and the goal of spreading examinees out, information about
  individual differences is greatest near $P_i=0.5$, and item difficulties
  between about $0.3$ and $0.7$ are conventionally regarded as a productive
  mid-range for norm-referenced use.
- For a selected-response item with $k$ options, a simple guessing model places
  chance performance at $1/k$. A common adjustment sets the target difficulty
  at the midpoint between chance and perfect performance,

$$
P_i^{*}=\frac{1}{2}+\frac{1}{2k},
$$

attributed to Crocker and Algina (1986). This is a midpoint heuristic under a
simple guessing model, not a universal optimum; the difficulty that maximizes
information depends on the item format, the guessing process, and the purpose
of the test, and in practice the useful range is somewhat wider than a single
point.
- When a test is used to select an extreme group and a cutting score has been
  chosen, the most informative items are those answered correctly by about
  half of the examinees whose total scores fall at the cutting score — a
  difficulty conditional on the score region that matters for the decision,
  not an unconditional midpoint.

Screening programs publish their own difficulty conventions. For example, the
National Assessment of Educational Progress flags items with $P_i \le 0.1$ or
$P_i \ge 0.9$. Such thresholds are program conventions for flagging items for
review, not statistical laws.

## Upper–lower group discrimination

The item-discrimination index contrasts performance among high-scoring and
low-scoring examinees:

1. Rank examinees by total test score.
2. Define an upper group (a top fraction, commonly the top 25–30%) and a lower
   group (the same fraction from the bottom); the middle examinees are set
   aside for this computation.
3. For item $i$, compute

$$
d_i=\frac{U_i}{n_{iU}}-\frac{L_i}{n_{iL}},
$$

where $U_i$ and $L_i$ are the numbers of examinees in the upper and lower
groups who answer item $i$ correctly, and $n_{iU}$ and $n_{iL}$ are the sizes
of the two groups.

The index $d_i$ is the difference between two conditional difficulties — item
difficulty among high total scorers minus item difficulty among low total
scorers — a discrete version of difficulty conditional on the total score
(Kelley, 1939). It ranges from $-1$ to $1$.

The fraction defining the extreme groups is a design choice with a known
tradeoff: larger groups stabilize the two proportions but include less extreme
examinees. Two classical rules of thumb choose the fraction to match the shape
of the total-score distribution — about 27% per group when total scores are
approximately normal (Kelley), and about 33% when the distribution has heavier
tails (Cureton, 1957). The choice should be fixed and reported, not varied
post hoc.

### Worked example

With upper and lower groups of $n_{iU}=n_{iL}=32$ examinees each:

| Item | $U_i$ | $L_i$ | $U_i-L_i$ | $d_i$ |
|---|---|---|---|---|
| 1 | 20 | 16 | 4 | $0.125$ |
| 2 | 30 | 10 | 20 | $0.625$ |
| 3 | 32 | 0 | 32 | $1.0$ |
| 4 | 20 | 20 | 0 | $0$ |
| 5 | 0 | 32 | $-32$ | $-1.0$ |

Reading the table: item 3 separates the groups completely ($d=1$); item 2
discriminates strongly; item 1 separates the groups only weakly; item 4 shows
no difference between the groups and carries no information about the total
score; item 5 is answered correctly *more* often by low scorers than by high
scorers, a pattern that warrants inspecting the item — for example, for a
miskeyed answer or a systematically misleading option — before reuse.

### Screening conventions

A widely used screening convention (Ebel and Frisbie, 1991) classifies items
by the discrimination index:

- $d_i \ge 0.4$: satisfactory;
- $d_i < 0.19$: eliminate or rewrite;
- with the corrected (item–rest) point-biserial correlation in place of $d_i$,
  values of $0.3$ or larger are regarded as satisfactory.

These are screening conventions accumulated from testing practice, not
validated universal cutoffs. Both $d_i$ and the item–rest correlation are
sample statistics: with small extreme groups the index is coarse, and
decisions to drop items should rest on multiple administrations or additional
evidence, not on a single threshold crossing.

## Item–total and item–rest correlation

The item–total correlation is the [Pearson correlation](/topics/measurement/correlation)
between scores on item $i$ and total test scores. Because the item is itself
part of the total, the item mechanically correlates with the total (a
part–whole correlation), which inflates the statistic. The standard correction
is the *item–rest* correlation: the correlation between item $i$ and the total
of the remaining items, $T_{-i}$. In general the uncorrected item–total
correlation is the larger of the two, and the item–rest value is the one used
for judging whether an item belongs with the test. For dichotomously scored
items both are point-biserial correlations; formulas, conventions, and the
connection to item discrimination are covered in
[correlations involving binary variables](/topics/measurement/binary-correlations).
When full response data are available, the item–rest correlation, which uses
every examinee rather than two extreme groups, is the usual computational
default; the upper–lower index survives as a coarse manual summary.

## Item reliability and validity indices

Two item-level indices combine an item's correlation with a criterion and its
variability. With $\sigma_i$ the standard deviation of item scores:

- the **item reliability index** is $r_{iT}\,\sigma_i$, where $r_{iT}$ is the
  correlation of item $i$ with the total test score $T$;
- the **item validity index** is $r_{iY}\,\sigma_i$, where $r_{iY}$ is the
  correlation of item $i$ with an external criterion variable $Y$; its role in
  a validation argument is treated in [Validity](/topics/measurement/validity).

The item reliability indices aggregate to a simple identity. Since
$T=\sum_j X_j$,

$$
\sigma_T^{2}=\operatorname{Cov}\!\left(\sum_j X_j,\,T\right)
=\sum_j \operatorname{Cov}(X_j,T)
=\sigma_T\sum_j r_{jT}\,\sigma_j,
$$

so, dividing by $\sigma_T>0$,

$$
\sum_j r_{jT}\,\sigma_j=\sigma_T .
$$

The item reliability indices sum to the total-score **standard deviation**,
not to the variance. The identity shows how each item's covariance with the
total is built up; it is sometimes misstated as a variance sum, which the
derivation rules out.

## Distractor analysis

For selected-response items, difficulty and discrimination summarize only the
correct option. Distractor analysis examines how often each incorrect option
is chosen, typically broken down by score group. The procedure flags option
patterns that item-level statistics hide: an option that no one chooses
contributes nothing; an option attracting high scorers more than low scorers,
or a near-zero discrimination index together with a heavily chosen wrong
option, signals a possible miskeyed or ambiguous item that warrants inspection
before the item is reused.

## Limits of classical indices

Every statistic in this note is descriptive for one administration of one
test to one sample: difficulty, discrimination, and item–rest values depend on
the population tested and on the other items in the test, so they do not
transfer automatically across populations or test forms. When the goal is
item parameters that are comparable across administrations and populations,
or pattern-level diagnostics such as differential item functioning, item-level
latent-trait modeling ([IRT](/topics/irt)) is the appropriate framework.
