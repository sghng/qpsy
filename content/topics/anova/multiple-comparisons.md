---
description: Per-comparison and familywise error rates, planned and post hoc families, the Bonferroni, Tukey HSD, and Scheffé procedures, simultaneous confidence intervals, and choosing among correction methods
---

# Multiple Comparisons

Testing several comparisons in one study multiplies the opportunities for a
Type I error: each contrast evaluated at $\alpha = .05$ is a fresh
$.05$-probability chance of rejecting a true null. Multiple-comparison
procedures control the error rate for a *collection* of tests rather than for
each test in isolation. The collection is built from the comparisons defined
in [Linear Contrasts](/topics/anova/contrasts), and the procedures below
presuppose the equal-variance, independent-groups setting of
[One-Way ANOVA](/topics/anova/one-way-anova).

## Per-comparison and familywise error

Two error rates must be distinguished.

- The **per-comparison error rate** $\alpha_{\mathrm{PC}}$ is the probability
  of falsely rejecting one particular true null hypothesis.
- The **familywise error rate** $\alpha_{\mathrm{FW}}$ is the probability of
  making at least one Type I error among the comparisons in a declared
  family. When the family comprises every comparison in a one-factor
  experiment, the same quantity is called the **experimentwise error rate**,
  and the two labels coincide.

Keeping each individual test at $.05$ does not keep the family at $.05$. For
$C$ tests each conducted at $\alpha_{\mathrm{PC}}$, the probability of at
least one false rejection is

$$
\alpha_{\mathrm{FW}} = 1 - (1 - \alpha_{\mathrm{PC}})^C,
$$

which is *exact when the tests are independent*. Three independent tests at
$.05$ give $1 - .95^3 = .1426$, nearly three times the nominal level.
Comparisons within one ANOVA are typically dependent — they share the data
and the pooled $MS_W$ — so this independence formula is not an exact calculation
of their familywise rate. The qualitative conclusion stands: uncorrected testing
inflates that rate above the per-comparison level.

The scope of the problem grows quickly with the number of groups. With $a$
group means there are

$$
C = \frac{a(a-1)}{2}
$$

possible pairwise comparisons — six for four groups, forty-five for ten.

## Planned and post hoc comparisons

A **planned comparison** is selected before the data are examined; a **post
hoc comparison** is selected after examining some or all of the data. The
distinction matters because selection itself creates error pressure: testing
whichever pair of means differs most, after looking, is a search over the
whole pairwise family and carries more than the nominal per-comparison risk,
even though only one test is reported.

What a correction must protect is therefore a *defined family*:

- Bonferroni requires a finite family defined independently of which results
  happen to look interesting — small and planned is the typical case, but a
  post hoc family such as all pairwise comparisons also qualifies. It cannot
  discipline a family whose membership is chosen because those particular
  results look interesting.
- Tukey's procedure takes the family to be *all* pairwise comparisons,
  whether they were planned or chosen after inspection, which is what makes
  it immune to pairwise data snooping.
- Scheffé's procedure protects the family of *every possible contrast*,
  which covers complex comparisons suggested by the observed means.

## The Bonferroni procedure

Across a declared family of $C$ comparisons, test each at

$$
\alpha_{\mathrm{PC}} = \frac{\alpha_{\mathrm{FW}}}{C},
$$

for example $.05/3 = .0167$ for a family of three. The guarantee that
$\alpha_{\mathrm{FW}} \le C \cdot \alpha_{\mathrm{PC}} = .05$ follows from
the union bound — the probability that at least one of several events occurs
never exceeds the sum of their probabilities — so the correction is valid
for any defined finite family and requires no independence among the tests.

Three equivalent decision routes:

1. Compare each unadjusted p-value to $\alpha_{\mathrm{FW}}/C$.
2. Compare each observed $F$ to the Bonferroni critical value
   $F_{\mathrm{crit,B}} = F_{\alpha_{\mathrm{FW}}/C;\,1,\,df_{\mathrm{error}}}$,
   which depends only on the family size and the error degrees of freedom.
   A contrast has numerator df 1, so $\sqrt{F_{\mathrm{crit,B}}}$ is the
   corresponding two-tailed $t$ critical value.
3. Compare the **Bonferroni-adjusted p-value** $p_{\mathrm{adj}} =
   \min(Cp,\,1)$ to the familywise $\alpha_{\mathrm{FW}}$.

Route 3 shows why adjusted p-values must be computed from unrounded
p-values: an observed $F = 13.97$ on $(1, 12)$ df has $p = .00284$, so
$p_{\mathrm{adj}} = 2 \times .00284 = .0057$; doubling the rounded $.0028$
would yield $.0056$, a pure rounding artifact.

### Worked example

A three-group study compares two active treatments with a control
($n = 5$ per group; means $9$, $8$, $13$; $MS_W = 58/12 = 4.83$; see
[One-Way ANOVA](/topics/anova/one-way-anova)). Two comparisons are declared
in advance — active A versus active B, coefficients $(1, -1, 0)$, and the
average of the actives versus control, coefficients $(1/2, 1/2, -1)$ — so
$\alpha_{\mathrm{PC}} = .05/2 = .025$ and
$F_{\mathrm{crit,B}}(1, 12) = 6.55$.

| Comparison | $\hat\psi$ | $F$ | $p$ | $p_{\mathrm{adj}}$ | Decision |
| --- | --- | --- | --- | --- | --- |
| A vs. B | $1$ | $.52$ | $.486$ | $.972$ | Fail to reject |
| Average of actives vs. control | $-4.5$ | $13.97$ | $.00284$ | $.0057$ | Reject |

Interpretation keeps standard limits: the significant complex contrast says
the *average* of the active treatments differs from control, not that each
active treatment individually does; and the nonsignificant pairwise test
does not show the two active treatments are equivalent.

### Simultaneous confidence intervals

Ordinary $95\%$ intervals, taken as a set, do not provide $95\%$ coverage —
and a Bonferroni decision can disagree with an ordinary interval that
straddles zero. **Bonferroni simultaneous intervals** replace the ordinary
critical value with the Bonferroni one:

$$
\hat\psi \pm \sqrt{F_{\mathrm{crit,B}}}\; SE(\hat\psi), \qquad SE(\hat\psi) = \sqrt{MS_W \sum_j c_j^2 / n_j},
$$

with $SE(\hat\psi)$ as in [Linear Contrasts](/topics/anova/contrasts). For
the complex contrast above, $SE = 1.204$ and the margin is
$\sqrt{6.55} \times 1.204 = 3.08$, giving the simultaneous interval
$[-7.58, -1.42]$ against the ordinary $[-7.124, -1.876]$. The simultaneous
interval is wider by construction and still excludes zero, consistent with
the adjusted decision; coverage over the whole family is *at least* the
nominal level.

## Tukey's HSD and the studentized range

When the questions are all pairwise — planned or post hoc — Tukey's
**honestly significant difference (HSD)** controls $\alpha_{\mathrm{FW}}$
over the entire collection of $a(a-1)/2$ differences.

The logic begins with the largest observed difference
$\bar Y_{\max} - \bar Y_{\min}$. Even when all population means are equal,
sampling variability makes some observed difference largest, so the maximum
must be judged against a distribution that reflects the search over all
pairs. The **studentized range statistic**

$$
q = \frac{\bar Y_{\max} - \bar Y_{\min}}{\sqrt{MS_W / n}}
$$

has that distribution; for equal $n$ it is just the largest pairwise $F$
rescaled, since $q = \sqrt{2F}$. Critical values of $q$ are tabled by
$\alpha_{\mathrm{FW}}$, the number of groups $a$, and $df_{\mathrm{error}}$.

For equal sample sizes, a pairwise test uses

$$
F = \frac{n(\bar Y_i - \bar Y_j)^2}{2\,MS_W}, \qquad F_{\mathrm{crit,Tukey}} = \frac{q_{\mathrm{crit}}^2}{2},
$$

rejecting when $F$ exceeds the Tukey critical value. Equivalently, the
margin of the simultaneous pairwise interval,

$$
HSD = q_{\mathrm{crit}} \sqrt{\frac{MS_W}{n}},
$$

is the **minimum significant difference**: a pairwise difference is
significant exactly when its absolute value exceeds the HSD.

### Worked example

Four conditions with means $20$, $16$, $14$, $12$, $n = 6$ per group,
$MS_W = 9$, $df_{\mathrm{error}} = 20$. With
$q_{\mathrm{crit}} = 3.96$:

- $HSD = 3.96\sqrt{9/6} = 4.85$, and $F_{\mathrm{crit,Tukey}} =
  3.96^2/2 = 7.84$.
- The pairwise differences are $8$, $6$, $4$, $4$, $2$, $2$; only $8$ and
  $6$ exceed $4.85$ (equivalently, only their $F$ values of $21.33$ and
  $12.00$ exceed $7.84$; the $4$-point differences give $F = 5.33$, the
  $2$-point differences $F = 1.33$).

The first condition is declared different from the third and fourth; the
remaining pairs, including the two $4$-point gaps, are not distinguished.
Those nonsignificant gaps are not evidence of equality — the HSD threshold
is coarse relative to the sample size available.

## The Scheffé procedure

Scheffé's method applies when the interesting contrast may be *any*
contrast among the means, including a complex one suggested by the observed
pattern — the setting where Bonferroni has no well-defined family and
Tukey's pairwise family is too narrow. The test statistic is the ordinary
contrast $F$ from [Linear Contrasts](/topics/anova/contrasts); only the
critical value changes:

$$
F_{\mathrm{crit,S}} = (a-1)\,F_{\alpha;\,a-1,\,N-a},
$$

that is, the omnibus critical $F$ multiplied by $a - 1$. The *same*
threshold applies to every contrast, however it was constructed, and the
familywise level holds across all possible contrasts simultaneously.

In the four-condition example, $F_{\mathrm{crit}}(.05; 3, 20) = 3.10$, so
$F_{\mathrm{crit,S}} = 3(3.10) = 9.30$. Suppose the means suggest comparing
the average of the last three conditions with the first:
$c = (-1, 1/3, 1/3, 1/3)$, so $\hat\psi = 14 - 20 = -6$ and
$SE^2 = MS_W \sum_j c_j^2/n = 9(4/3)/6 = 2$, giving $F = 36/2 = 18.00$.
Since $18.00 > 9.30$, the data-suggested contrast is rejected. The same
threshold would retain the pairwise $F = 5.33$ and reject the pairwise
$F = 12.00$.

The breadth has a price: the Scheffé threshold is more demanding than a
procedure that protects only a narrower family, so when the family is
genuinely narrow, a narrower correction has more power. Scheffé is the
price of complete freedom to interrogate the means after seeing them.

## Error control and power

Holding the data and the test fixed, a smaller per-comparison level means a
more extreme statistic is required to reject, wider simultaneous intervals,
and lower power against any real nonzero contrast. The critical values
themselves show the trade. For $a = 4$, $df_{\mathrm{error}} = 20$,
$\alpha_{\mathrm{FW}} = .05$:

| Procedure | Family protected | Critical $F$ |
| --- | --- | --- |
| Uncorrected test | One comparison | $4.35$ |
| Bonferroni, $C = 3$ | Three declared comparisons | $6.83$ |
| Tukey | All six pairwise | $7.84$ |
| Bonferroni, $C = 6$ | All six pairwise | $8.57$ |

Two lessons follow. Protecting the family actually being tested is cheaper
than protecting a larger one. And for the all-pairwise family Tukey's
threshold is smaller than Bonferroni's — Tukey is the more powerful
procedure there — while Bonferroni protecting a small declared family can be
less demanding than Tukey.

The **Šidák adjustment**, $\alpha_{\mathrm{PC}} =
1 - (1 - \alpha_{\mathrm{FW}})^{1/C}$, is a marginally less conservative
alternative derived from the independence argument. The power gain is small
for small families, and the independence it assumes rarely holds for
comparisons sharing $MS_W$.

## Choosing a procedure

Assuming equal sample sizes and equal variances:

| Question at hand | Procedure |
| --- | --- |
| A small set of comparisons specified in advance (or any defined finite family) | Bonferroni |
| All pairwise comparisons | Tukey HSD |
| Any contrast suggested by the data, including complex ones | Scheffé |
| Several comparisons against a single control group | Dunnett's method |
| Identifying the best treatment | Hsu's method |

When more than one procedure validly protects the declared family, prefer
the one with the smaller critical value. The last two rows name specialized
procedures for many-to-one and best-selection problems; their mechanics are
outside the scope of this note.

## Unequal sample sizes or unequal variances

As presented, the procedures pool a common $MS_W$, and the Tukey formulas assume
equal $n$. Unequal sample sizes alone require no modification of Bonferroni or
Scheffé—the contrast standard error already accommodates unequal $n_j$—whereas
Tukey needs the Tukey–Kramer variant. Balanced designs reduce sensitivity to
unequal variances but do not make a variance violation harmless.

- **Unequal variances.** Bonferroni combines with any per-comparison test:
  applying the Bonferroni level across a defined family of
  separate-variance (Welch-type) contrast tests preserves the correction's
  logic, with contrast-specific denominator degrees of freedom and
  approximate results. For pairwise work, software-implemented procedures
  such as Dunnett's T3 and Games–Howell provide approximate tests with
  contrast-specific denominator degrees of freedom; their accuracy depends
  on sample sizes and should be judged from reported simulation evidence
  rather than a universal rule of thumb.
- **Unequal $n$, equal variances.** The Tukey–Kramer modification of the
  pairwise test uses

  $$F = \frac{n_i n_j (\bar Y_i - \bar Y_j)^2}{(n_i + n_j)\,MS_W},$$

  with denominator $df = N - a$, compared against the Tukey critical value.

## Connections

- [Linear Contrasts](/topics/anova/contrasts) supplies the contrast
  estimates, standard errors, and single-contrast $F$ and $t$ statistics
  that every correction adjusts, along with orthogonality and the partition
  of between-group sums of squares.
- [One-Way ANOVA](/topics/anova/one-way-anova) supplies $MS_W$,
  $df_{\mathrm{error}}$, and the omnibus test whose rejection motivates —
  but never localizes — follow-up comparisons.
- [Model Comparison](/topics/anova/model-comparison) expresses each
  contrast test as a restricted-versus-full model comparison, of which the
  corrections above are error-control overlays.
- [ANOVA Power](/topics/anova/power) develops the omnibus-power framework;
  the critical-value comparisons in this note show the corresponding cost of
  multiplicity control.
- [Hypothesis Testing](/topics/foundations/hypothesis-testing) and
  [P-Values](/topics/foundations/p-values) carry the decision language and
  the interpretation of raw and adjusted p-values.
