---
description: Internal consistency and coefficient alpha — one-administration reliability estimation and its limits, alpha in its raw, covariance, averaged, and standardized forms, essential tau-equivalence and the scope of alpha's bias, Flanagan and Guttman lambda-4 split-half estimation with the all-split identity, Kuder–Richardson formulas, and why alpha is not evidence of unidimensionality
---

# Internal Consistency and Coefficient Alpha

Internal-consistency coefficients estimate reliability from **one
administration of one form**: consistency is assessed among the items or
item subsets of the test itself rather than across occasions, forms, or
raters. The economy is real — no second administration, no alternate forms,
no retest interval to argue about — and so is the restriction. This page
develops the one-administration family: coefficient alpha in its several
forms, split-half estimation, and the Kuder–Richardson formulas for
dichotomous items. How these coefficients sit among the reliability designs —
what each design's replications include and exclude, speeded tests,
population and range dependence, standard errors, and reporting — is treated
in [Reliability](/topics/measurement/reliability).

## The estimand and its limits

Conceptually, the design treats the observed agreement between different
parts of one test as a stand-in for agreement between forms: the estimand is
the reliability associated with form-to-form variation — generalizing from
the particular items administered to the domain of similar items they were
drawn from. Everything outside that facet is invisible. A single
administration cannot see occasion error or rater error at all, so an
internally consistent scale may still be unstable over time or across
scorers; the design question of which error facets matter for a given
interpretation is taken up in [Reliability](/topics/measurement/reliability).

The machinery also rests on strong assumptions about how the items relate.
Split-half estimation, adjusted to full length by the Spearman–Brown
formula, assumes the two half-tests are parallel; coefficient alpha assumes
essential tau-equivalence at the item level. The test families behind those
assumptions — parallel through congeneric — are set out in [classical test
theory](/topics/measurement/classical-test-theory). And for tests designed
to reflect rate of work, internal-consistency estimates are likely to be
inflated, particularly by the odd–even method; the speeded-test warning and
its design implications are treated in [Reliability](/topics/measurement/reliability).

## Coefficient alpha

For a test of $J$ items with total score $X$, item variances $\sigma_j^2$,
and item covariances $\sigma_{jk}$, coefficient alpha
([Cronbach, 1951](https://doi.org/10.1007/BF02310555)) can be written in
equivalent raw, covariance, and averaged forms:

$$
\alpha = \frac{J}{J-1}\cdot\frac{\sigma_X^2 - \sum_{j=1}^{J}\sigma_j^2}{\sigma_X^2},
\qquad
\alpha = \frac{J}{J-1}\cdot\frac{\sum_{j \ne k}\sigma_{jk}}{\sigma_X^2},
$$

$$
\alpha = \frac{J^2\,\bar\sigma_{jk}}{\sigma_X^2}
= \frac{J\,\bar\sigma_{jk}}{\bar\sigma_j^2 + (J-1)\,\bar\sigma_{jk}},
\qquad
\alpha = \frac{J\,\bar r}{1 + (J-1)\,\bar r},
\qquad
\bar r = \frac{\bar\sigma_{jk}}{\bar\sigma_j^2},
$$

where $\bar\sigma_{jk}$ is the average covariance between distinct item pairs
and $\bar\sigma_j^2$ the average item variance. The averaged forms follow
because $\sigma_X^2 = J\bar\sigma_j^2 + J(J-1)\bar\sigma_{jk}$. The final form
is the Spearman–Brown formula applied to the average inter-item association:
when all item variances are equal, $\bar r$ is the average inter-item
correlation (the standardized-alpha case).

## Assumptions and the scope of bias

Alpha estimates the reliability of the unweighted sum under essential
tau-equivalence at the item level: item true scores equal up to additive
constants, errors uncorrelated (see the test families in [classical test
theory](/topics/measurement/classical-test-theory)). When the violation is
unequal loadings on a single factor with uncorrelated errors, alpha
understates the reliability of the sum. When errors correlate — shared
method variance, adjacent items, double administration — alpha can overstate
the reliability of the intended score. Alpha is a lower bound only under its
own model, not in general; congeneric coefficients that remove the
equal-loading premise are treated in [factor models and
reliability](/topics/measurement/factor-analysis).

## Split-half estimation

Split the items into two half-scores $X_1$ and $X_2$ with variances
$\sigma_1^2, \sigma_2^2$, standard deviations $\sigma_1, \sigma_2$, and
correlation $r_{12}$. The Flanagan split-half coefficient is

$$
r_{xx'} = \frac{4\,r_{12}\,\sigma_1\sigma_2}{\sigma_1^2 + \sigma_2^2 + 2\,r_{12}\,\sigma_1\sigma_2},
$$

in which the numerator contains four times the covariance between the halves
and the denominator is the total-score variance. The coefficient is
Guttman's $\lambda_4$ and estimates reliability when the two halves are
essentially tau-equivalent. Its weakness is that it depends on the particular
split: different divisions of the same items into halves give different
coefficients, and no single split is canonical. The halves should be
comparable in content and statistical characteristics — a split that puts
different content or different difficulty levels on the two sides estimates
the reliability of a different pairing than the one the total score
realizes. An odd–even split can approximate comparable halves when item order
mixes content and difficulty, but it does not guarantee content balance.

### Worked example: five examinees, six binary items

Five examinees produce the following item responses:

| Person | Item 1 | Item 2 | Item 3 | Item 4 | Item 5 | Item 6 |
| --- | --- | --- | --- | --- | --- | --- |
| A | 1 | 1 | 1 | 0 | 1 | 0 |
| B | 0 | 1 | 1 | 0 | 1 | 0 |
| C | 0 | 0 | 1 | 1 | 0 | 0 |
| D | 0 | 0 | 0 | 1 | 0 | 1 |
| E | 1 | 1 | 1 | 1 | 1 | 1 |

The procedure, using population formulas (variances and covariances divided
by the number of examinees):

1. Score the two halves of a chosen split, for example items 1–3 versus
   items 4–6, by summing each examinee's responses within each half.
2. Compute the variance of each half-score vector and the covariance between
   them.
3. Enter the results in the Flanagan formula.
4. Repeat for every other split into two three-item halves — there are ten
   distinct ones for six items.

From the aggregate quantities — total-score variance $\sigma_X^2 = 2.24$ and
item-variance sum $\sum_j \sigma_j^2 = 1.36$ — alpha is

$$
\alpha = \frac{6}{5}\cdot\frac{2.24 - 1.36}{2.24} = 0.4714.
$$

The ten split-half estimates range from $-0.357$ to $0.929$, and their mean
is exactly $0.4714$: alpha equals the average of the Flanagan coefficients
over all splits into equal halves, which is why it supersedes any single
split (Cronbach, 1951). The example also shows how unstable split-half
estimates are in small samples — one split here yields a negative value,
below the zero bound of the population quantity.

## Kuder–Richardson formulas

For dichotomous items, the item variance is $\sigma_j^2 = p_j q_j$ with
$p_j$ the proportion correct and $q_j = 1 - p_j$, and alpha reduces to
KR-20:

$$
\alpha = \frac{J}{J-1}\left(1 - \frac{\sum_{j=1}^{J} p_j q_j}{\sigma_X^2}\right).
$$

If all items share a common difficulty, $\bar p$ and $\bar q = 1 - \bar p$
denoting the averages, the sum simplifies to $J\bar p\bar q$ and yields
KR-21:

$$
\alpha = \frac{J}{J-1}\left(1 - \frac{J\,\bar p\,\bar q}{\sigma_X^2}\right).
$$

Because $\sum_j p_j q_j = J\bar p\bar q - J\,\operatorname{var}(p) \le
J\bar p\bar q$, with equality only when every item has the same difficulty,
KR-21 never exceeds KR-20. KR-21 presumes equal difficulties, which real
tests rarely satisfy, so it typically understates reliability.

## Alpha is not evidence of unidimensionality

Alpha is a function of test length and the average inter-item association —
nothing else enters the Spearman–Brown form. Four correlation matrices of
standardized (unit-variance) items make the consequences visible:

| Inter-item structure | Items | Mean $r$ | Alpha |
| --- | --- | --- | --- |
| All correlations $.50$ | 6 | $.50$ | $6/7 \approx .86$ |
| $.80$ within two blocks, $.30$ between | 6 | $.50$ | $6/7 \approx .86$ |
| $.60$ within two blocks, $.30$ between | 6 | $.42$ | $126/155 \approx .81$ |
| All correlations $.30$ | 10 | $.30$ | $30/37 \approx .81$ |

Two lessons follow. First, the two-block matrix with $.80$ correlations
within blocks and $.30$ between them is two-dimensional — two tight clusters
of items — yet it yields exactly the same alpha as the unidimensional
all-$.50$ matrix, because the average inter-item correlation is the same
$.50$. A coefficient computed from average association cannot see structure
that averages out. Second, the ten-item all-$.30$ matrix matches the
$126/155$ of the $.60$-block matrix: test length compensates for weak
homogeneity. The two coefficients agree at two decimals, not exactly, but the
lesson stands: an acceptable alpha is consistent with a long, weakly related
item set just as with a shorter, clustered one.

High alpha therefore supports score precision, not dimensional homogeneity.
Whether one dimension underlies the items is a modeling question, addressed
with [factor models](/topics/measurement/factor-analysis); when a scale is
decidedly multidimensional — subtests each internally coherent but weakly
related, as in the two-block structure above — reliability for the composite
is better handled with the tools in [composite
scores](/topics/measurement/composite-scores).

## Adding items does not always raise alpha

Lengthening a test raises reliability only when the additions are as strongly
connected to the construct as the existing items. Add a seventh item to the
six-item all-$.50$ matrix that correlates $.10$ with every current item: the
mean inter-item correlation falls from $.50$ to $27/70 \approx .39$, and

$$
\alpha = \frac{7 \times 27/70}{1 + 6 \times 27/70} = \frac{189}{232} \approx .81,
$$

below the six-item value $6/7 \approx .86$. Spearman–Brown gains presuppose
additions parallel to the existing components; enough weak items dilute the
average association and drag alpha down. The prophecy formula itself — how
many parallel items a target reliability requires — is worked in
[Reliability](/topics/measurement/reliability).

## Failure modes

- **Design mismatch.** A single-administration coefficient cannot detect
  occasion or rater error; a stable-looking scale may still be unstable over
  time or across raters (see [Reliability](/topics/measurement/reliability)).
- **Assumption violations.** Essential tau-equivalence failure biases alpha
  — downward under a single-factor structure, upward under correlated
  errors — as scoped above.
- **Speeded tests.** For tests designed to reflect rate of work,
  internal-consistency estimates, particularly odd–even ones, are likely to
  be inflated (see [Reliability](/topics/measurement/reliability)).
- **Split arbitrariness.** A single split is one draw from many; the worked
  example shows estimates ranging from negative to $.929$ on the same data,
  and averaging over all splits is precisely what alpha does.
- **Long heterogeneous scales.** Length inflates alpha while the construct
  grows mixed; precision of a sum is not homogeneity of content.
- **Reading alpha as dimensionality evidence.** The matrix lesson above:
  structures of different dimensionality share one alpha value, so alpha
  cannot adjudicate unidimensionality.
- **KR-21 convenience.** Its equal-difficulty assumption rarely holds, and
  it never exceeds KR-20, so it typically understates reliability.

## Related pages

- [Reliability](/topics/measurement/reliability): the estimation designs and
  their error facets, the Spearman–Brown prophecy, standard errors of
  measurement, and reporting requirements.
- [Classical Test Theory](/topics/measurement/classical-test-theory): the
  score decomposition and the parallel-through-congeneric families whose
  failure grounds alpha's bias scope.
- [Factor Models and Reliability](/topics/measurement/factor-analysis):
  dimensionality as a structural question, and the congeneric coefficients
  — omega and maximal reliability — that remove the equal-loading premise.
- [Reliability of Composite Scores](/topics/measurement/composite-scores):
  stratified alpha and composite reliability for scales that are not
  unidimensional.
