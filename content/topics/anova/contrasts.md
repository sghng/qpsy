---
description: Linear contrasts of group means — coefficient choice and normalization, the restricted-model view, sums of squares, F and t tests, confidence intervals, unequal sample sizes, separate-variance forms, standardized effect sizes, and orthogonal contrasts
---

# Linear Contrasts

A significant omnibus $F$ test says the group means are not all equal, but it does
not say where the differences lie. Most research questions are more specific than
the omnibus hypothesis: does one treatment differ from another, or does the average
of two treatments differ from a control? A **contrast** expresses any such question
as a statement about a weighted combination of group means and provides a single
test, interval, and effect size for it. This page develops the machinery for one
contrast at a time; testing several contrasts raises the risk of false positives,
which is the subject of [Multiple Comparisons](/topics/anova/multiple-comparisons).

Throughout, $Y_{ij}$ is observation $i$ in group $j$ of $a$ groups, $n_j$ is the
sample size in group $j$, $N=\sum_j n_j$, $\bar Y_j$ is the group mean, and
$MS_W$ is the mean square within groups from the
[one-way analysis](/topics/anova/one-way-anova).

## Pairwise and complex comparisons

An **individual comparison** tests one hypothesis about the group means. Two kinds
cover most questions:

- A **pairwise comparison** involves two means, $H_0:\mu_1=\mu_2$, or equivalently
  $\mu_1-\mu_2=0$.
- A **complex comparison** involves more than two means, for example
  $H_0:\tfrac{1}{2}(\mu_1+\mu_2)=\mu_3$, which asks whether the average of groups 1
  and 2 equals the mean of group 3.

Both are questions the omnibus test cannot answer: the omnibus null
$\mu_1=\cdots=\mu_a$ aggregates all differences into one test, so rejecting it does
not locate any particular difference. Retaining it does not rule out a specific
difference either: the omnibus spends its $a-1$ numerator degrees of freedom across
every direction of mean difference, so it can miss a difference concentrated along
one comparison that a focused contrast would detect. Planned contrasts therefore
need not be contingent on a significant omnibus result; they test the hypotheses
the study was designed to ask.

## Contrast coefficients

A **contrast** is a linear combination of population means whose coefficients sum
to zero:

$$
\psi=\sum_{j=1}^{a} c_j\,\mu_j, \qquad \sum_{j=1}^{a} c_j=0.
$$

The zero-sum condition is what makes $\psi$ a *comparison*: it guarantees that a
constant added to every mean leaves $\psi$ unchanged, so $\psi$ reflects differences
among the means rather than their overall level. The null hypothesis for any
contrast is $H_0:\psi=0$.

With four groups, representative questions and their coefficients are:

| Question about the means | Coefficients $(c_1,c_2,c_3,c_4)$ |
|---|---|
| Group 2 vs. group 4 | $(0,\,1,\,0,\,-1)$ |
| Average of groups 1 and 3 vs. group 4 | $(\tfrac{1}{2},\,0,\,\tfrac{1}{2},\,-1)$ |
| Average of groups 1 and 2 vs. average of groups 3 and 4 | $(\tfrac{1}{2},\,\tfrac{1}{2},\,-\tfrac{1}{2},\,-\tfrac{1}{2})$ |

### Choosing a scaling

The coefficients of a contrast are determined by the question only up to a constant
multiple: $(\tfrac12,\tfrac12,-1)$ and $(2,2,-4)$ state the same null hypothesis.
The scaling is not arbitrary in practice, because it sets the units of every
interpreted quantity. A useful convention normalizes the coefficients so that the
positive ones sum to $1$ and the negative ones sum to $-1$; $\hat\psi$ is then an
average difference of means. Multiplying all coefficients by $4$ multiplies the
estimate, the standard error, and the confidence-interval endpoints by $4$, while
the sum of squares, the test statistic, and the decision are unchanged. The
standardized-effect formula below assumes the normalized scaling; other scalings
require a corresponding adjustment, so normalization should precede interpretation.

## Estimating a contrast

The contrast is estimated by replacing population means with sample means:

$$
\hat\psi=\sum_{j=1}^{a} c_j\,\bar Y_j,
$$

with standard error, under the equal-variance assumption,

$$
SE(\hat\psi)=\sqrt{MS_W\sum_{j=1}^{a}\frac{c_j^2}{n_j}}.
$$

A running example uses three groups with $n_j=5$: two active treatments with means
$9$ and $8$, and a control with mean $13$, with $MS_W=58/12=4.833$ and $SS_B=70$.
For the comparison of the average active-treatment mean to the control mean,

$$
c=\left(\tfrac12,\tfrac12,-1\right),\qquad \hat\psi=\tfrac12(9)+\tfrac12(8)-13=-4.5,
$$

so the average of the two active-treatment means is estimated to fall $4.5$ points
below the control mean. For the pairwise comparison of the two active treatments,
$c=(1,-1,0)$ gives $\hat\psi=9-8=1$.

## The restricted-model view

The same test can be derived as a comparison between two models, a perspective
developed generally in [Model Comparison](/topics/anova/model-comparison). The
**full model** allows each group its own population mean, $Y_{ij}=\mu_j+\varepsilon_{ij}$,
and its error is the within-group sum of squares, $E_F=SS_W$. The **restricted
model** imposes $H_0:\psi=0$ on those means. Its predictions are the fitted values
that minimize the total squared error subject to $\sum_j c_j\mu_j=0$:

- For a pairwise comparison, the two compared groups share their pooled mean
  $\,(n_1\bar Y_1+n_2\bar Y_2)/(n_1+n_2)$ ($8.5$ for means $9$ and $8$ with equal
  $n$), and every other group keeps its own mean.
- For a complex comparison, every group with a nonzero coefficient shifts. In the
  example the constrained predictions are $10.5$, $9.5$, and $10$, which satisfy
  $\tfrac12(10.5)+\tfrac12(9.5)=10$ but reproduce none of the raw group means.

The increase in squared error measures how badly the restriction fits:
$E_R-E_F=125.5-58=67.5$ in the example. Counting parameters gives the degrees of
freedom: the full model estimates $a$ means, so $df_F=N-a$, and one linear
restriction removes exactly one parameter, so $df_R=N-(a-1)$ and the numerator of
the test always has

$$
df_R-df_F=\left[N-(a-1)\right]-(N-a)=1
$$

degree of freedom. A single-df restriction is what allows the same comparison to be
framed as either an $F$ test or a $t$ test.

## Testing a contrast

The error increase has a closed form that avoids fitting the restricted model:

$$
SS_\psi=E_R-E_F=\frac{\hat\psi^2}{\sum_j c_j^2/n_j},\qquad F=\frac{SS_\psi}{MS_W}=\frac{\hat\psi^2}{MS_W\sum_j c_j^2/n_j},
$$

with $1$ and $N-a$ degrees of freedom, and equivalently

$$
t=\frac{\hat\psi}{SE(\hat\psi)}, \qquad F=t^2.
$$

With only two groups, a pairwise contrast reduces to the pooled independent-samples
$t$ test ([t Tests](/topics/foundations/t-tests)). With more groups, the same form
uses $MS_W$ pooled across all groups; the contrast machinery also accommodates any
weighting of the means.

In the running example, $\sum_j c_j^2/n_j=\tfrac14/5+\tfrac14/5+1/5=.3$, so

$$
SS_\psi=\frac{(-4.5)^2}{.3}=67.5,\qquad F=\frac{67.5}{58/12}=13.97,\qquad t=\frac{-4.5}{1.204}=-3.737.
$$

The $F$ of $13.97$ exceeds the critical value $F_{.05}(1,12)=4.75$: the data provide evidence
that the average of the two active-treatment means differs from the control mean.
The pairwise contrast between the two active treatments gives
$SS_\psi=1/(2/5)=2.5$ and $F=2.5/4.833=0.52$, which does not exceed the critical
value.

## Confidence intervals

A $95\%$ confidence interval for $\psi$ follows the estimate-plus-minus-margin
pattern ([Confidence Intervals](/topics/foundations/confidence-intervals)):

$$
\hat\psi \pm t^*_{.975,\,N-a}\,SE(\hat\psi) \;=\; \hat\psi \pm \sqrt{F_{.05}(1,N-a)}\;SE(\hat\psi),
$$

where the two-tailed $t$ critical value and the square root of the $F$ critical
value coincide. For the complex contrast,

$$
-4.5\pm 2.179(1.204)=[-7.124,\,-1.876],
$$

an interval of average active-treatment means $1.9$ to $7.1$ points below the
control mean. The interval contains zero exactly when the test retains $H_0$, but
the interval adds what the decision alone hides: for the retained pairwise
contrast, $\hat\psi\pm 2.179(1.390)=[-2.03,\,4.03]$ — a difference as large as
$4$ points favoring the first treatment, or $2$ points favoring the second,
remains compatible with the data. The retained null is therefore a statement of
imprecision, not evidence that the two treatments are equivalent.

## Unequal sample sizes

The formulas already accommodate unequal $n_j$ through the
$\sum_j c_j^2/n_j$ term: the same contrast estimated from differently sized groups
has a different standard error and therefore a different test statistic. With
$c=(\tfrac12,\tfrac12,-1)$ and group sizes $5$, $10$, and $5$,

$$
\sum_j\frac{c_j^2}{n_j}=\frac{.25}{5}+\frac{.25}{10}+\frac{1}{5}=.275,
$$

smaller than the equal-$n$ value $.3$. Adding observations to any group with a
nonzero coefficient can only shrink the standard error, and the shrinkage is
largest for groups with large $|c_j|$. What can raise it is *reallocating* a fixed
total sample size toward groups with small coefficients and away from groups with
large ones. The coefficient *pattern* should still follow the substantive question —
matching group sizes to the comparison of interest is a design decision, not a
computational one.

## Unequal variances

$MS_W$ pools within-group variance across **all** groups, including groups whose
means are not involved in the contrast. This makes individual contrasts more
sensitive to unequal variances than the omnibus test, and equal sample sizes give
less protection here than they do for the omnibus: a group outside the comparison
can distort the standard error in either direction. If an excluded group's variance
is much smaller than those involved, pooling underestimates the standard error and
inflates the Type I error rate; if it is much larger, pooling overestimates the
standard error and costs power.

When population variances may differ, each group's variance can be used separately,
generalizing Welch's approach ([t Tests](/topics/foundations/t-tests)):

$$
F=\frac{\hat\psi^2}{\sum_j c_j^2\,s_j^2/n_j},
$$

with approximate (Satterthwaite) denominator degrees of freedom best obtained from
software. Only groups with nonzero coefficients contribute, so groups excluded from
the comparison no longer contaminate the standard error.

## Effect sizes

**Standardized difference.** With normalized coefficients, the contrast can be
expressed in within-group standard deviation units:

$$
d=\frac{\hat\psi}{\sqrt{MS_W}}.
$$

For the complex contrast, $d=-4.5/\sqrt{4.833}=-2.05$: the average active-treatment
mean falls about two within-group standard deviations below the control mean. The
normalization requirement is substantive — under the $(2,2,-4)$ scaling the same
data would give $d=-8.2$, which no longer measures an average mean difference.

**Association strength.** Two proportions locate the contrast in the overall
variance decomposition:

$$
R^2_{\text{alerting}}=\frac{SS_\psi}{SS_B}, \qquad R^2_{\text{effect size}}=\frac{SS_\psi}{SS_T}.
$$

The alerting proportion measures how much of the *between-group* variability the
contrast captures; the effect-size proportion uses the *total* variability, adding
within-group variability to the denominator. For the example,
$R^2_{\text{alerting}}=67.5/70=.964$ while
$R^2_{\text{effect size}}=67.5/128=.527$: nearly all of the systematic group
variation rides on this one contrast, yet it accounts for only about half of the
total variation because half of the total is within-group variation. The two
numbers answer different questions and can diverge widely, so the denominator, not
the numerator, deserves attention when comparing them. See
[Effect Sizes](/topics/foundations/effect-sizes) for the general framework.

## Orthogonality

With $a$ group means there are at most $a-1$ **linearly independent** contrasts —
the zero-sum condition discards one dimension — so any larger set contains
redundancy. Linear independence is not the same as orthogonality: the contrasts
$\mu_1-\mu_2$ and $\mu_1-\mu_3$ are independent yet share $\mu_1$, so both change
when $\mu_1$ changes.

Two contrasts are **orthogonal** when they carry nonoverlapping information about
the mean differences. The check multiplies the two coefficient vectors element by
element within each group and sums:

$$
\sum_j c_{1j}c_{2j}=0 \quad\text{(equal } n_j\text{)}, \qquad \sum_j \frac{c_{1j}c_{2j}}{n_j}=0 \quad\text{(unequal } n_j\text{)}.
$$

In the running example the pairwise and complex contrasts are orthogonal:
$1(\tfrac12)+(-1)(\tfrac12)+0(-1)=0$. Under equal sample sizes, the sums of
squares of a set of $a-1$ mutually orthogonal contrasts partition $SS_B$ —
here $2.5+67.5=70=SS_B$ — so orthogonal contrasts decompose the omnibus test into
independent single-df pieces, each spending its own degree of freedom on a separate
question. This economy is the appeal of orthogonal contrasts. It is not a
requirement for analysis: substantive questions frequently imply nonorthogonal
contrasts, and a research question should be tested with the coefficients it
implies rather than bent toward orthogonality.

## What a single contrast establishes

A rejected contrast supports exactly the comparison its coefficients define — no
more. Three limits matter in practice:

- **Rejecting a complex contrast does not localize the difference.** Concluding
  that the average of the two active-treatment means differs from the control does
  not establish that each active treatment individually differs from the control;
  the average could conceal one null treatment and one strong one. Testing the
  individual comparisons requires their own contrasts.
- **A retained null is not evidence of equality.** The pairwise contrast was
  retained with a confidence interval spanning $[-2.03, 4.03]$; imprecision, not
  equivalence, is the honest reading.
- **Each test carries its own error rate.** The formulas on this page describe a
  single comparison tested once. When several contrasts are tested, the chance of
  at least one false positive grows, and procedures such as Bonferroni, Tukey, and
  Scheffé trade power for that control — see
  [Multiple Comparisons](/topics/anova/multiple-comparisons).
