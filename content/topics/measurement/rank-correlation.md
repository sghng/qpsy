---
description: Rank correlation — Spearman's rho with average ranks and the no-tie shortcut with its tie caveat, and Kendall's tau from concordant and discordant pairs, with permutation-based inference
---

# Rank Correlation

Rank correlation coefficients measure **monotonic** association: whether one
variable tends to rise as the other rises, without requiring the relationship
to be linear or the scales to be interval. Replacing scores by ranks discards
information about spacing but buys insensitivity to outliers, applicability to
ordinal measurements, and freedom from distributional assumptions. Spearman's
$\rho$ and Kendall's $\tau$ are the two standard members of this
nonparametric family; they summarize different features of the ranked data and
need not agree exactly in finite samples.

## Spearman's rho

Spearman's $\rho$ is computed by a ranking procedure:

1. Rank the $X$ values from smallest to largest, $1$ to $n$, assigning equal
   (average) ranks to tied values.
2. Rank the $Y$ values the same way.
3. Let $d_i$ be the difference between the two ranks for case $i$, and
   compute the shortcut formula

$$
\rho = 1-\frac{6\sum_{i=1}^{n} d_i^{2}}{n\left(n^{2}-1\right)} .
$$

With no ties, this shortcut is numerically identical to the
[Pearson correlation](/topics/measurement/correlation) computed on the two
rank vectors — Spearman's $\rho$ is Pearson's $r$ applied to ranks, which is
why it measures monotone association.

**Tie caveat.** The identity with Pearson-on-ranks is exact only without ties.
When ties are present and average ranks are used, the shortcut formula and the
Pearson correlation of the rank vectors are no longer exactly equal, and the
Pearson-on-ranks value (or a tie-corrected variant of the shortcut) is the
computation to use.

### Worked example

In a thirteen-case air-traffic example, the two variables are ranked, with one
tie: two cases share the value $75$ on $Y$ and each receives the average rank
$5.5$. The rank differences give $\sum d_i^2 = 39.5$, so the shortcut yields

$$
\rho = 1-\frac{6(39.5)}{13(13^{2}-1)}=1-\frac{237}{2184}=0.8914835 .
$$

Computing the Pearson correlation directly on the average ranks instead gives
$0.8913351$. Both values round to $\rho = 0.89$, but they are not exactly
equal: the tie is what separates them, illustrating the caveat above. The
procedure — rank, average the tied ranks, difference, square, sum — is the
transferable content; the shortcut is a convenience for the no-tie case.

## Kendall's tau

Kendall's $\tau$ measures the similarity of the two orderings by comparing
every pair of cases. For $n$ cases, a pair
$\bigl((x_i,y_i),(x_j,y_j)\bigr)$ is

- **concordant** if $x_i > x_j$ and $y_i > y_j$, or $x_i < x_j$ and
  $y_i < y_j$ — the two variables order the pair the same way;
- **discordant** if they order the pair oppositely.

With $C$ the number of concordant pairs and $D$ the number of discordant
pairs,

$$
\tau = \frac{C-D}{\tfrac{1}{2}n(n-1)} ,
$$

the excess of same-ordered over oppositely-ordered pairs as a fraction of all
$\binom{n}{2}$ pairs. The coefficient lies in $[-1, 1]$, with $1$ for complete
agreement of the orderings and $-1$ for complete disagreement. The statistic
makes no assumptions about the distributions of $X$ or $Y$.

This version counts every pair in the denominator, so pairs tied on either
variable — which are neither concordant nor discordant — pull $|\tau|$ toward
zero. Tie-adjusted variants such as $\tau_b$ rescale the denominator to
account for tied pairs and should be used when ties are substantial; the
choice of variant should be reported.

### Worked example

Take the first four cases of the thirteen-case example,
$(35, 105)$, $(45, 75)$, $(69, 85)$, $(182, 208)$, giving six pairs:

| Pair | Ordering | Classification |
|---|---|---|
| 1 vs 2 | $x_1 < x_2$, $y_1 > y_2$ | discordant |
| 1 vs 3 | $x_1 < x_3$, $y_1 > y_3$ | discordant |
| 1 vs 4 | $x_1 < x_4$, $y_1 < y_4$ | concordant |
| 2 vs 3 | $x_2 < x_3$, $y_2 < y_3$ | concordant |
| 2 vs 4 | $x_2 < x_4$, $y_2 < y_4$ | concordant |
| 3 vs 4 | $x_3 < x_4$, $y_3 < y_4$ | concordant |

Four pairs are concordant and two discordant, so

$$
\tau=\frac{4-2}{\tfrac{1}{2}(4)(3)}=\frac{2}{6}=\frac{1}{3}.
$$

The same numerator/denominator bookkeeping scales to any $n$; the pairwise
classification is the entire computation.

## Inference by permutation

Under the null hypothesis of no association, every pairing of the $X$ and $Y$
values is equally likely. This suggests an exact, assumption-free test: permute
one variable's values against the other, recompute $\tau$ (or $\rho$) for each
permutation, and locate the observed statistic in the resulting null
distribution — the p-value is the proportion of permuted statistics at least
as extreme as the one observed. All $\binom{n}{2}$-pair structure is preserved
under permutation; only the pairing is reshuffled. Enumeration is feasible for
small $n$, and random permutation serves as an adequate approximation for
larger samples. The logic is the general permutation-test instance of
[hypothesis testing](/topics/foundations/hypothesis-testing): build the null
distribution from the hypothesis itself rather than from a distributional
assumption such as bivariate normality.

## Choosing between the coefficients

Spearman's $\rho$, being Pearson on ranks, is sensitive to the *magnitude* of
rank discrepancies and behaves like a correlation coefficient on a bounded
scale. Kendall's $\tau$ is built from pair signs, which makes it more robust,
natural for ordinal data, and easier to reason about exactly (each pair
contributes $\pm 1$ or 0), at the cost of a smaller numerical scale — a given
strength of association produces a smaller $|\tau|$ than $|\rho|$. Both answer
the monotone-association question; when they disagree noticeably, the
disagreement itself is diagnostic, usually of a few highly influential rank
discrepancies.

## Related notes

- [Correlation](/topics/measurement/correlation) — covariance, the
  linear-association measure Spearman's $\rho$ generalizes, and inference.
- [Correlations involving binary variables](/topics/measurement/binary-correlations)
  — association when one or both variables are dichotomous.
- [Classical item analysis](/topics/measurement/item-analysis) — where
  correlation-based item statistics are applied.
