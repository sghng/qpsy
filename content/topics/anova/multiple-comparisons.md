---
description: Per-comparison, familywise, and false-discovery error rates; planned and post hoc families; Bonferroni, Tukey HSD, Scheffé, Dunnett, Hsu, protected LSD, and Benjamini–Hochberg procedures; simultaneous confidence intervals; omnibus testing; and procedure selection
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

A count of errors answers a different question from the probability of any
error. If $V$ is the number of true null hypotheses falsely rejected, then

$$
E(V) = \sum_{r:\,H_{0r}\text{ is true}} \alpha_r,
$$

where $\alpha_r$ is the per-comparison level for hypothesis $r$. When all $C$
nulls are true and every test uses the same $\alpha_{\mathrm{PC}}$, this
expected number of Type I errors per experiment is $C\alpha_{\mathrm{PC}}$.
Because an experiment with errors contributes one to the familywise event but
may contribute more than one to the error count,

$$
\alpha_{\mathrm{FW}} = P(V \geq 1) \leq E(V).
$$

Bonferroni's choice $\alpha_{\mathrm{PC}}=\alpha_{\mathrm{FW}}/C$ therefore
bounds both the expected error count and the probability of at least one
error. Controlling that probability, rather than merely the per-comparison
rate or expected count, is the default goal of the familywise procedures below;
[false discovery rate](#false-discovery-rate) is a distinct alternative.

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

For a pairwise family, $C$ equals a subset's size only when that subset was
fixed in advance and the remaining pairs are genuinely not tested. Adding
pairs after inspecting the data expands the family to all
$a(a-1)/2$ pairs; dropping uninteresting or nonsignificant pairs after looking
does not shrink it again. In either case, use the full pairwise family or a
procedure such as Tukey's that protects it. Changing $C$ to match only the
tests ultimately reported invalidates the claimed confirmatory error rate.

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

Equal division is not required. Per-comparison levels $\alpha_1,\ldots,\alpha_C$
may be allocated unequally, provided they are fixed before examining the data
and satisfy $\sum_r\alpha_r\leq\alpha_{\mathrm{FW}}$. A larger share for a
priority contrast increases its power, while the remaining contrasts receive
correspondingly less; allocating levels after seeing which results are close
to significant destroys the guarantee.

Software needs the same family definition. A “Bonferroni” menu option may
default to all pairwise comparisons or omit complex contrasts, so its default
$C$ need not be the declared family's $C$. Verify the family and contrast
coefficients rather than treating the procedure label as sufficient.

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

The test–interval duality is general: a simultaneous procedure rejects
$\psi=\psi_0$ exactly when its corresponding interval excludes $\psi_0$.
Intervals go beyond a homogeneity or significance claim by establishing
direction and a range of plausible magnitudes. A procedure that merely reports
that some difference exists does not, by itself, license either claim.

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
$q_{\mathrm{crit}} = 3.958293\ldots$:

- $HSD = q_{\mathrm{crit}}\sqrt{9/6} = 4.85$, and
  $F_{\mathrm{crit,Tukey}} = q_{\mathrm{crit}}^2/2 = 7.83$ (both rounded).
- The pairwise differences are $8$, $6$, $4$, $4$, $2$, $2$; only $8$ and
  $6$ exceed $4.85$ (equivalently, only their $F$ values of $21.33$ and
  $12.00$ exceed $7.83$; the $4$-point differences give $F = 5.33$, the
  $2$-point differences $F = 1.33$).

The first condition is declared different from the third and fourth; the
remaining pairs, including the two $4$-point gaps, are not distinguished.
Those nonsignificant gaps are not evidence of equality — the HSD threshold
is coarse relative to the sample size available.

The example also shows why the size of an estimated difference alone cannot
settle significance. The pairwise $F$ weighs the squared difference against
$MS_W/n$, so the same $4$-point gap would clear the threshold with less
within-group variability or larger samples, and fail it with more variability
or fewer observations. The correction matters as well: the $4$-point gaps give
$F = 5.33$, which exceeds the uncorrected critical value $4.35$ but not
Tukey's $7.83$ (see the critical-value table below). Significance is a joint
property of the difference, the error estimate, the sample size, and the
procedure's critical value — never of the difference alone.

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

The breadth often has a price: for a small declared family, Bonferroni can be
less demanding, and for an all-pairwise family Tukey's specialized procedure
is less demanding. But family breadth alone does not determine the ordering.
Bonferroni's critical value rises with the number of comparisons, whereas
Scheffé's does not, so Scheffé can eventually be less demanding even for a
finite family specified in advance. The direct comparison appears under
[Choosing a procedure](#choosing-a-procedure).

## Dunnett's comparisons with a control

When the only questions are the $a-1$ treatment–control differences,
Dunnett's **many-one** procedure protects exactly that family. It does not
protect comparisons among the treatments; giving up those irrelevant tests is
the source of its greater precision relative to Tukey's all-pairwise family.

The observed contrast $t$ or $F=t^2$ is unchanged. For a two-sided family,
compare $|t|$ with Dunnett's critical $d$, or equivalently compare $F$ with
$d^2$; simultaneous intervals use $\hat\psi\pm d\,SE(\hat\psi)$. Dunnett
tables report $t$-type critical values and index $a$ as the number of groups
**including the control**. A one-sided procedure requires a direction fixed in
advance and the corresponding one-sided critical value and interval.

For the running design ($a=4$, $df_{\mathrm{error}}=20$,
$\alpha_{\mathrm{FW}}=.05$), the two-sided value is $d=2.5404$, so
$d^2=6.454$. This is below both Bonferroni's $6.826$ for three declared
comparisons and Tukey's $7.834$ for all six pairwise comparisons. The
comparison illustrates the specialized family's precision; it does not make
Dunnett valid for treatment–treatment questions.

**Dunnett's T3 is a different procedure.** T3 is an unequal-variance,
all-pairwise method, not the many-one correction described here.

## Hsu's comparisons with the best

The best-treatment question is not an all-pairwise question. Suppose larger
means are better, and for each group define

$$
\delta_i=\mu_i-\max_{j\ne i}\mu_j.
$$

Group $i$ is uniquely best when $\delta_i>0$ and is not best when
$\delta_i<0$. Hsu's method forms simultaneous intervals for these differences
using Dunnett's distribution, but with the unknown “best of the others” taking
the role that a known control plays in Dunnett's procedure.

Each interval has three possible interpretations:

- entirely above zero: group $i$ is confidently identified as best;
- entirely below zero: group $i$ is confidently ruled out as best;
- containing zero: group $i$ remains a candidate for best.

The result may therefore be a **possibly-best subset**, not one winning group.
That subset is a confidence statement about which groups remain plausible, not
a failure to perform the analysis. If smaller means are better, reverse the
comparison direction.

**Unconstrained intervals** use two-sided Dunnett critical values and retain
information about how much better or worse a group may be. **Constrained
intervals** use one-sided values and truncate limits at zero; they are
narrower for selection but do not estimate that magnitude. The table-based
forms assume equal sample sizes and homogeneous variances. Unequal sample
sizes require software-computed critical values; these recipes do not
establish an unequal-variance counterpart.

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
| Dunnett | Three treatment–control comparisons | $6.45$ |
| Tukey | All six pairwise | $7.83$ |
| Bonferroni, $C = 6$ | All six pairwise | $8.57$ |
| Scheffé | Every possible contrast | $9.30$ |

The specialized rows show why the protected family matters. Dunnett is the
least demanding correction for the three treatment–control questions. For the
all-pairwise family Tukey's threshold is smaller than Bonferroni's — Tukey is
the more powerful procedure there — while Bonferroni protecting a small
declared family can be less demanding than Tukey. Scheffé's presence does not
yield a universal ordering: its threshold is constant in $C$, whereas
Bonferroni's rises with $C$. The direct comparison under
[Choosing a procedure](#choosing-a-procedure) shows when each is more
powerful.

The **Šidák adjustment**, $\alpha_{\mathrm{PC}} =
1 - (1 - \alpha_{\mathrm{FW}})^{1/C}$, is slightly less conservative than
Bonferroni. Equality with the familywise level holds for independent tests,
but independence is not necessary for the inequality in every ANOVA
application: Šidák's probability inequality also covers nonorthogonal
two-sided contrasts under the normal model. Thus dependence does not by itself
make the adjustment invalid, although the result is not a distribution-free
rule for arbitrary tests. The power gain over Bonferroni is small.

## Fisher's protected LSD and weaker alternatives

**Fisher's least significant difference (LSD)**, also called the protected
$t$-test, uses two stages:

1. Test the omnibus null at $\alpha_{\mathrm{FW}}$. If it is not rejected,
   stop without testing individual contrasts.
2. If it is rejected, test the individual contrasts at the ordinary
   per-comparison level, traditionally all pairwise comparisons at
   $\alpha_{\mathrm{PC}}=.05$.

The gate protects the procedure when the **complete null** is true: if every
mean is equal, the second stage is reached erroneously only at the omnibus
level. It does not provide the same protection under a **partial null**. For
example, if ten groups have equal means and an eleventh is sufficiently
different to make omnibus rejection nearly certain, the gate no longer
protects the 45 true pairwise nulls among the first ten. Testing all of them
at $.05$ produces a familywise error rate far above $.05$ — approximately $.60$
in the textbook's illustration, with the precise value depending on the design
and dependence among tests.

Protected LSD has a special **three-group exception**: under the usual ANOVA
assumptions, its two-stage form controls the familywise rate for three groups.
Even there, it does not provide appropriate simultaneous confidence intervals,
so the exception is limited to hypothesis testing.

Newman–Keuls and Duncan's multiple-range procedures share LSD's familywise
failure for more than three groups. REGW-Q and REGW-F can control familywise
error but do not establish confident directions or simultaneous intervals.
Software labels also need care: **Tukey-b is not Tukey HSD** and does not carry
the same familywise guarantee. A smaller second-stage critical value is not
evidence of superior familywise power when the procedures do not control the
same error rate.

## False discovery rate

Familywise error control asks for the probability of **any** false rejection.
The **false discovery rate (FDR)** instead asks how large the false fraction of
the reported discoveries tends to be. Let $R$ be the total number of
rejections and $V$ the number that are false. The false discovery proportion
and its expectation are

$$
Q =
\begin{cases}
V/R, & R>0,\\
0, & R=0,
\end{cases}
\qquad
\mathrm{FDR}=E(Q).
$$

Thus $\mathrm{FWER}=P(V\geq1)$ is an event probability, whereas FDR is an
expected proportion. Under the complete null, $Q$ is 1 whenever any rejection
occurs and 0 otherwise, so **FDR and FWER coincide**. More generally,
$Q\leq\mathbf 1\{V\geq1\}$, so FDR cannot exceed FWER for the same procedure.
When some nulls are false, controlling FDR may therefore permit a more
powerful rule while allowing FWER to exceed its target.

For a simple illustration, suppose a rule produces no false rejection 80% of
the time. In the other 20%, suppose one true null is falsely rejected along
with three correct rejections of false nulls. Then

$$
\mathrm{FWER}=.20,
\qquad
\mathrm{FDR}=.80(0)+.20\left(\frac{1}{1+3}\right)=.05.
$$

This is not a loosened familywise guarantee; it is a different error target.

### Benjamini–Hochberg step-up procedure

For $m$ hypotheses, first order the p-values
$p_{(1)}\leq\cdots\leq p_{(m)}$. At target FDR $\alpha$, find

$$
k=\max\left\{i:\ p_{(i)}\leq\frac{i}{m}\alpha\right\}.
$$

If no $i$ qualifies, reject nothing. Otherwise reject the $k$ hypotheses with
the smallest p-values, **including any whose own p-value exceeds its individual
threshold**. The thresholds range from Bonferroni's $\alpha/m$ at the smallest
p-value to $\alpha$ at the largest, but the step-up decision is based on the
largest qualifying rank, not separate decisions at each rank.

For example, with $m=5$ and $\alpha=.05$:

| Rank $i$ | $p_{(i)}$ | $i\alpha/m$ | Qualifies individually? |
| --- | --- | --- | --- |
| 1 | $.001$ | $.010$ | Yes |
| 2 | $.026$ | $.020$ | No |
| 3 | $.029$ | $.030$ | Yes |
| 4 | $.048$ | $.040$ | No |
| 5 | $.167$ | $.050$ | No |

Here $k=3$, so the three smallest p-values are rejected — including $.026$,
despite its exceeding its own $.020$ threshold.

The [original Benjamini–Hochberg result](https://doi.org/10.1111/j.2517-6161.1995.tb02031.x)
proves control for independent test statistics. Later
[dependency results](https://doi.org/10.1214/aos/1013699998) establish control
under positive regression dependence on the true nulls (PRDS) as well. For
arbitrary dependence, the Benjamini–Yekutieli variant replaces $\alpha$ by
$\alpha/H_m$, where $H_m=\sum_{i=1}^{m}1/i$, giving thresholds
$i\alpha/(mH_m)$ and a more conservative procedure.

FDR is often useful for large exploratory families in which some false
rejections can be tolerated provided they remain a small expected fraction of
the discoveries. It is not a substitute when a confirmatory claim requires a
familywise guarantee. BH-adjusted p-values also do not, by themselves, provide
simultaneous confidence intervals or familywise-adjusted p-values.

## Choosing a procedure

First choose the error target. Except for the final FDR row, this table assumes
the equal-variance ANOVA setting and seeks familywise control:

| Question at hand | Procedure |
| --- | --- |
| A small declared finite family | Bonferroni, after comparison with any valid specialized procedure |
| A larger declared finite family including complex contrasts | Compare Bonferroni and Scheffé critical values as below |
| All pairwise comparisons, or pairwise choices made after inspecting the data | Tukey HSD |
| Data-suggested complex contrasts or unrestricted contrast exploration | Scheffé |
| Several comparisons against a single control group | Dunnett's method |
| Identifying the best treatment | Hsu's method |
| Three groups, omnibus-gated tests only, with no simultaneous intervals | Fisher's protected LSD is defensible; not a general familywise procedure |
| Many exploratory hypotheses; control the expected false fraction rather than FWER | Benjamini–Hochberg, subject to its dependence conditions |

When more than one procedure validly protects the declared family, prefer
the one with the smaller critical value. Family validity comes first: this
rule cannot make Bonferroni valid for a family whose membership was selected
because of the observed results, or Tukey valid for complex contrasts. Dunnett
and Hsu provide the specialized many-one and best-selection mechanics above;
the FDR row deliberately leaves the familywise framework rather than competing
as another familywise correction.

A declared subset of pairwise comparisons is another overlap: Tukey remains
valid because it protects the full pairwise superset. Bonferroni can be less
demanding for a sufficiently small subset, but not simply because that subset
is planned. In the running four-group example, Bonferroni is less demanding
for four declared pairwise tests ($7.53 < 7.83$), but Tukey is less demanding
for five ($8.10 > 7.83$). Here too, compare the valid critical values rather
than relying on “planned” or “small” alone.

### Bonferroni versus Scheffé for a finite family

When both are valid candidates for a declared family of $C$ contrasts,
calculate both critical values at the same $\alpha_{\mathrm{FW}}$:

$$
F_{\mathrm{crit,B}}(C)
= F_{\alpha_{\mathrm{FW}}/C;\,1,\,df_{\mathrm{error}}},
\qquad
F_{\mathrm{crit,S}}
= (a-1)F_{\alpha_{\mathrm{FW}};\,a-1,\,df_{\mathrm{error}}}.
$$

If $F_{\mathrm{crit,B}} < F_{\mathrm{crit,S}}$, use Bonferroni; if
$F_{\mathrm{crit,S}} < F_{\mathrm{crit,B}}$, use Scheffé. Equality gives the
same rejection threshold. Both procedures judge the same single-contrast $F$
statistic, so for a fixed contrast and a fixed nonzero alternative, the
smaller critical value gives greater power. It also gives the narrower
simultaneous confidence interval. The observed contrast $F$ does not enter
this choice.

Return to the four-group example with $df_{\mathrm{error}} = 20$ and
$\alpha_{\mathrm{FW}} = .05$. Scheffé's critical value remains $9.30$
regardless of $C$, while Bonferroni's crosses it between seven and eight
comparisons. Three decimals are shown because the $C=8$ gap is small:

| $C$ | $F_{\mathrm{crit,B}}$ | $F_{\mathrm{crit,S}}$ | More powerful |
| --- | --- | --- | --- |
| 7 | $8.975$ | $9.295$ | Bonferroni |
| 8 | $9.333$ | $9.295$ | Scheffé |

Thus, **Scheffé can be more powerful than Bonferroni for a sufficiently large
finite family, even when every contrast was planned**. The crossover is not
universally at $C=8$: it depends on $a$, $df_{\mathrm{error}}$, and
$\alpha_{\mathrm{FW}}$. In this example, families of seven or eight contrasts
necessarily include complex comparisons because four groups yield only six
pairs. For an all-pairwise family, Tukey remains the specialized choice
rather than a reason to switch to Scheffé.

Make the choice from the declared family and design, not by trying both
procedures after seeing the data and reporting whichever one rejects.

## The omnibus test and follow-up procedures

A significant omnibus $F$ is **not a prerequisite** for Bonferroni, Tukey,
Dunnett, or Hsu. These procedures control their designated familywise error
rate on their own; requiring an omnibus rejection first makes them more
conservative than nominal and sacrifices power. The omnibus test answers a
different, global question — whether any mean differences exist — and can be
reported for that purpose rather than used as a gate. Fisher's protected LSD
is the exception because its second stage explicitly depends on the gate.

Scheffé has a different relationship: the omnibus gate is redundant because
the two procedures are exactly coherent. The largest possible contrast
statistic satisfies

$$
F_{\max}=\frac{SS_B}{MS_W}=(a-1)F_{\mathrm{omnibus}}.
$$

Consequently, the omnibus test rejects if and only if at least one contrast
rejects under Scheffé. If the omnibus test does not reject, no Scheffé
significant contrast exists; if it does reject, at least one exists. One
maximizing contrast, up to nonzero rescaling, has coefficients

$$
c_j=n_j(\bar Y_j-\bar Y).
$$

That maximizing contrast may be complex and data-derived, and it need not be
pairwise or substantively interesting. Tukey does not share this coherence:
the omnibus test and the set of Tukey pairwise decisions can disagree in
either direction.

## Unequal sample sizes or unequal variances

As presented, the procedures pool a common $MS_W$, and the Tukey formulas assume
equal $n$. Unequal sample sizes alone require no modification of Bonferroni or
Scheffé—the contrast standard error already accommodates unequal $n_j$—whereas
Tukey needs the Tukey–Kramer variant. Balanced designs reduce sensitivity to
unequal variances but do not make a variance violation harmless.

- **Unequal variances, a declared finite family.** Bonferroni combines with
  any per-comparison test: applying its level across separate-variance
  (Welch-type) contrast tests preserves the union-bound logic. With the
  Welch statistic and contrast-specific $df_\psi$ defined in
  [Linear Contrasts](/topics/anova/contrasts#unequal-variances), a
  simultaneous interval is

  $$
  \hat\psi \pm \sqrt{F_{\alpha_{\mathrm{FW}}/C;\,1,\,df_\psi}}\;
  SE_{\mathrm{Welch}}(\hat\psi), \qquad
  SE_{\mathrm{Welch}}(\hat\psi)=\sqrt{\sum_j c_j^2s_j^2/n_j}.
  $$

  Software can use the fractional Satterthwaite df directly; these are
  approximate rather than exact normal-theory intervals.
- **Unequal variances, every possible contrast.** The Brown–Forsythe
  modification of Scheffé uses the same Welch contrast statistic but critical
  value $F_{\mathrm{crit,S,W}}=(a-1)F_{\alpha;\,a-1,\,df_\psi}$. The interval
  multiplier is $\sqrt{F_{\mathrm{crit,S,W}}}$, paralleling the pooled
  Scheffé form.
- **Unequal variances, all pairwise.** Dunnett's T3 uses the studentized
  **maximum-modulus** distribution; Games–Howell retains a studentized-range
  form but substitutes the separate-variance standard error and pairwise
  Welch df. Both differ from simply applying the pooled Tukey threshold.
  Their approximate accuracy depends on the design and should be judged from
  simulation evidence rather than a universal sample-size rule.
- **Unequal $n$, equal variances.** The Tukey–Kramer modification of the
  pairwise test uses

  $$
  F = \frac{n_i n_j (\bar Y_i - \bar Y_j)^2}{(n_i + n_j)\,MS_W},
  $$

  with denominator $df = N - a$, compared against the Tukey critical value.

## Connections

- [Linear Contrasts](/topics/anova/contrasts) supplies the contrast
  estimates, standard errors, and single-contrast $F$ and $t$ statistics
  that every correction adjusts, along with orthogonality and the partition
  of between-group sums of squares.
- [One-Way ANOVA](/topics/anova/one-way-anova) supplies $MS_W$,
  $df_{\mathrm{error}}$, and the omnibus test's global question; the section
  above explains why that test is not a general gate for follow-up procedures.
- [Model Comparison](/topics/anova/model-comparison) expresses each
  contrast test as a restricted-versus-full model comparison, of which the
  corrections above are error-control overlays.
- [Crosswalk of ANOVA Quantities](/topics/anova/crosswalk) aligns the errors,
  sums of squares, and degrees of freedom across naming traditions and
  tabulates the degrees of freedom used by each of these procedures.
- [ANOVA Power](/topics/anova/power) develops the omnibus-power framework;
  the critical-value comparisons in this note show the corresponding cost of
  multiplicity control.
- [Hypothesis Testing](/topics/foundations/hypothesis-testing) and
  [P-Values](/topics/foundations/p-values) carry the decision language and
  the interpretation of raw and adjusted p-values.
