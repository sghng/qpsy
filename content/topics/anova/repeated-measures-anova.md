---
description: one-way repeated-measures ANOVA for within-subjects designs — correlated scores, condition and participant partitions, the unadjusted omnibus F test, paired-t equivalence, participant-augmented full and restricted models, ordinary and partial eta-squared, standardized mean differences, and reporting
---

# One-Way Repeated-Measures ANOVA

**Canonical reference:** [Maxwell, Delaney, & Kelley (MDK)](/resources#designing-experiments-and-analyzing-data) #ref/mdk

In the independent-groups design of [one-way ANOVA](/topics/anova/one-way-anova),
each condition is administered to a separate group of participants, and condition
differences are judged against the variability among individuals within conditions.
A **within-subjects** or **repeated-measures** design instead assigns every
participant to every condition, so each condition mean is computed from the same
people. Because the same participants recur in every condition, their scores are
correlated — a participant who scores high in one condition tends to score high in
the others — and the analysis has to account for that structure rather than ignore
it.

The central idea is to split what a between-subjects analysis would lump together
as error into two parts: systematic differences among participants' overall
levels, and the remaining inconsistency of condition effects across participants.
The first part is removed from the error term; only the second serves as the
yardstick against which condition differences are judged.

## Within-subjects designs and correlated scores

This page treats a single within-subjects factor. Let $n$ be the number of
participants, $a$ the number of conditions, and $N = na$ the total number of
scores. Write $Y_{ij}$ for the score of participant $i$ in condition $j$, with
$i = 1, \ldots, n$ and $j = 1, \ldots, a$. The data form an $n \times a$ table —
participants in rows, conditions in columns — that resembles a two-way layout but
holds a single score in each cell, the rows being a classification of
participants rather than a second manipulated factor. Unlike a between-subjects
layout, where each row is a different person, the same participant identifiers
recur in every column. Three means attach to the table: the condition mean
$\bar{Y}_{\cdot j}$, the average of column $j$ over the $n$ participants; the
participant mean $\bar{Y}_{i\cdot}$, the average of row $i$ over the $a$
conditions; and the grand mean $\bar{Y}$, the average of all $N$ scores.

The running example is a hypothetical caffeine study. Ten participants
($n = 10$) each took a capsule at 3 p.m. on four nights spaced one week apart,
the capsule containing a placebo ($0$ mg) or $100$, $200$, or $400$ mg of
caffeine ($a = 4$ conditions), and a sleep tracker recorded nightly sleep
duration in hours:

| Participant | 0 mg | 100 mg | 200 mg | 400 mg | $\bar{Y}_{i\cdot}$ |
|---:|---:|---:|---:|---:|---:|
| 1 | 8 | 10 | 7 | 5 | 7.50 |
| 2 | 9 | 9 | 8 | 6 | 8.00 |
| 3 | 7 | 5 | 8 | 4 | 6.00 |
| 4 | 9 | 6 | 5 | 7 | 6.75 |
| 5 | 8 | 7 | 7 | 6 | 7.00 |
| 6 | 5 | 4 | 4 | 3 | 4.00 |
| 7 | 7 | 6 | 5 | 4 | 5.50 |
| 8 | 8 | 8 | 6 | 6 | 7.00 |
| 9 | 9 | 8 | 6 | 5 | 7.00 |
| 10 | 7 | 7 | 4 | 5 | 5.75 |
| Condition mean $\bar{Y}_{\cdot j}$ | 7.70 | 7.00 | 6.00 | 5.10 | 6.45 |

The bottom-right entry is the grand mean. The participant means range from 4.00
to 8.00 hours, and the participants with high overall means tend to sit above
their condition means in every column while those with low overall means sit
below in every column. Stable characteristics of the person push scores in the
same direction across conditions, which is exactly why scores in different
conditions are correlated.

Because each participant supplies a score in every condition, comparisons between
conditions are within-person: every participant acts as their own control, and
systematic between-person differences do not contaminate the comparison. This can
gain precision and [statistical power](/topics/anova/power) and can reduce the
number of participants a study requires. These are potential advantages of the
design, not guarantees; the size of the gain depends on how much stable
between-person variability there is to remove, as the bookkeeping later in this
page makes precise.

## Condition, participant, and residual variability

Total variability splits into three sources: differences among condition means
($SS_A$), differences among participants' overall means ($SS_S$), and the
remaining variability, the departures from the combined condition-plus-participant
pattern ($SS_{A\times S}$). The partition is exact:

$$
SS_T = SS_A + SS_S + SS_{A\times S},
$$

with the caffeine values $115.9 = 38.9 + 48.4 + 28.6$, where

$$
SS_T = \sum_{i=1}^{n}\sum_{j=1}^{a}\left(Y_{ij} - \bar{Y}\right)^2 = 115.9.
$$

**Condition variability.** The condition means deviate from the grand mean by
$+1.25$, $+0.55$, $-0.45$, and $-1.35$, and the sum of their squares is $3.89$.
Each condition mean summarizes $n$ scores, so squared deviations of condition
means are weighted by $n$:

$$
SS_A = n\sum_{j=1}^{a}\left(\bar{Y}_{\cdot j} - \bar{Y}\right)^2 = 10(3.89) = 38.9.
$$

**Participant variability.** The participant mean $\bar{Y}_{i\cdot}$ summarizes a
participant's overall level, and differences among these means are the stable
individual differences the design wants to isolate. $SS_S$ is computed by the
same procedure as $SS_A$ with rows in place of columns:

1. Compute each participant's mean $\bar{Y}_{i\cdot}$.
2. Subtract the grand mean $\bar{Y}$ from each.
3. Square the deviations.
4. Sum the squared deviations over participants; here
   $\sum_{i=1}^{n}(\bar{Y}_{i\cdot} - \bar{Y})^2 = 12.10$.
5. Multiply by $a$, the number of scores behind each participant mean:

$$
SS_S = a\sum_{i=1}^{n}\left(\bar{Y}_{i\cdot} - \bar{Y}\right)^2 = 4(12.10) = 48.4.
$$

As a check, participant 1 alone contributes
$a(\bar{Y}_{1\cdot} - \bar{Y})^2 = 4(7.50 - 6.45)^2 = 4.41$.

**Residual variability.** The remainder follows by subtraction,
$SS_{A\times S} = SS_T - SS_A - SS_S = 115.9 - 38.9 - 48.4 = 28.6$, and can also
be computed directly from the residuals of the additive pattern:

$$
SS_{A\times S} = \sum_{i=1}^{n}\sum_{j=1}^{a}
\left(Y_{ij} - \bar{Y}_{\cdot j} - \bar{Y}_{i\cdot} + \bar{Y}\right)^2 = 28.6.
$$

The residual $Y_{ij} - \bar{Y}_{\cdot j} - \bar{Y}_{i\cdot} + \bar{Y}$ is the part
of a score that neither the condition pattern nor the participant's overall level
predicts. It has two conceptually distinct origins: genuine participant-by-
condition variation — different participants responding differently to the
conditions — and measurement or occasion-specific error. With one score per
participant-condition cell the two cannot be separated; whatever its origin,
every departure from the combined pattern lands in $SS_{A\times S}$.

The connection to the between-subjects partition is a single identity. A
[one-way ANOVA](/topics/anova/one-way-anova) that ignored the pairing would use
as its error the within-condition sum of squares

$$
SS_W = \sum_{i=1}^{n}\sum_{j=1}^{a}\left(Y_{ij} - \bar{Y}_{\cdot j}\right)^2,
$$

which equals $77.0$ for the caffeine data and splits exactly as
$SS_W = SS_S + SS_{A\times S}$, here $77.0 = 48.4 + 28.6$. A between-subjects
analysis therefore leaves the participant source sitting inside its error term;
removing it is what distinguishes the repeated-measures partition.

**What each source responds to.** Adding a constant to one participant's row
shows what the participant source captures. If participant 1 had slept one hour
more in every condition, $SS_S$ would rise from $48.4$ to $60.4$ and $SS_T$ from
$115.9$ to $127.9$, while $SS_A = 38.9$ and $SS_{A\times S} = 28.6$ would not
change at all: every condition mean and the grand mean move by the same $1/n$
hour, which cancels in the condition deviations and in the residual formula. A
participant who generally sleeps longer across all doses is captured by the
participant source — precisely the source this design removes from the error term.

## Why the participant-by-condition denominator

The condition effect is an average of differences: each participant supplies a
difference between conditions, and the analysis averages them. The appropriate
yardstick is the consistency of those differences across participants — a
condition difference is convincing when it is large relative to the variability
of participants' condition differences, which is what $MS_{A\times S}$ estimates.
Variability among participants' overall levels is irrelevant to that question,
and the design removes it.

Profile plots make the point visible. A profile plot puts the conditions on the
horizontal axis, the outcome on the vertical axis, and draws one line per
participant connecting that participant's scores. Consider two datasets with the
same size as small examples, $n = 5$ participants and $a = 4$ conditions, both
with condition means exactly $8$, $7$, $6$, $5$ — hence the same $SS_A = 25$ — and
radically different residuals. In one dataset the five profiles are nearly
parallel: every participant shows close to the same drop between adjacent
conditions, $SS_{A\times S} = 0.21$, and $F(3, 12) = 476.19$. In the other the
profiles crisscross: participants' condition differences point in different
directions, $SS_{A\times S} = 40$, and the very same condition means yield only
$F(3, 12) = 2.50$, $p = .109$. Identical means and identical numerator; the
denominator alone decides what the data support.

The mirror-image sensitivity experiment adds a constant to one condition. If
every participant had slept two hours more in the 400 mg condition only, $SS_A$
would fall from $38.9$ to $14.9$ and $SS_T$ from $115.9$ to $91.9$, while
$SS_S = 48.4$ and $SS_{A\times S} = 28.6$ would remain exactly as they were: each
participant's mean moves by the same $2/a = 0.5$ hour, which cancels from the
participant deviations and from every residual. A uniform shift within one
condition moves only the condition source and the total — it cannot masquerade
as a participant difference or as inconsistency of the condition effects.

## The unadjusted omnibus F test

With population condition means $\mu_1, \ldots, \mu_a$, the omnibus hypotheses
parallel the between-subjects case:

$$
\begin{aligned}
H_0\colon &\mu_1 = \mu_2 = \cdots = \mu_a,\\
H_1\colon &\text{the condition means are not all equal.}
\end{aligned}
$$

Each mean square is a sum of squares divided by its degrees of freedom, and the
test statistic compares the condition mean square to the participant-by-condition
mean square:

$$
F = \frac{MS_A}{MS_{A\times S}} = \frac{SS_A/(a-1)}{SS_{A\times S}/[(a-1)(n-1)]}.
$$

The degrees of freedom partition alongside the sums of squares:

| Source | $df$ | Caffeine |
|---|---|---:|
| Conditions | $a-1$ | 3 |
| Participants | $n-1$ | 9 |
| Error ($A \times S$) | $(a-1)(n-1)$ | 27 |
| Total | $na - 1 = N - 1$ | 39 |

The error degrees of freedom can be read either in product form, $(a-1)(n-1)$,
or as the total df minus the condition and participant df,
$39 - 3 - 9 = 27$. The computations are conventionally organized in a summary
table:

| Source | $SS$ | $df$ | $MS$ | $F$ |
|---|---:|---:|---:|---:|
| Conditions | 38.90 | 3 | 12.97 | 12.24 |
| Participants | 48.40 | 9 | 5.38 | |
| Error ($A \times S$) | 28.60 | 27 | 1.06 | |
| Total | 115.90 | 39 | | |

Sums of squares and degrees of freedom add down the table. The participant row
carries no $F$: the omnibus question concerns conditions, and this partition
supplies no error term against which participant differences would be tested.
The row in this table labeled *error* is the participant-by-condition source; the
names these rows carry across textbooks and software are aligned in the
[crosswalk of ANOVA quantities](/topics/anova/crosswalk).

For the caffeine data,

$$
F = \frac{38.9/3}{28.6/27} = \frac{12.97}{1.06} = 12.24,
$$

which exceeds the $\alpha = .05$ critical value $F_{.05;\,3,\,27} = 2.96$
($p < .001$). Using this unadjusted reference distribution, the null hypothesis
of equal condition means is rejected: the data provide evidence that sleep
duration is not the same across the four caffeine doses. Which doses differ from
which is a question the omnibus test does not answer; locating differences
requires targeted within-person comparisons of the kind developed in
[Repeated-Measures Comparisons](/topics/anova/repeated-measures-comparisons).

### What removing the participant source buys

How much was gained by removing $SS_S$ from the error term? A between-subjects
one-way ANOVA of the same 40 scores would judge the same $MS_A = 12.97$ against
$MS_W = SS_W/(N-a) = 77.0/36 = 2.14$, giving $F_{\mathrm{B}}(3, 36) = 6.06$.
The repeated-measures test judges that numerator against $MS_{A\times S} = 1.06$
and reaches $F_{\mathrm{RM}}(3, 27) = 12.24$ — larger, by a factor of $2.02$.
Because both statistics use the same scores, the comparison is exact
bookkeeping, and it runs in both directions.

When $SS_S = 0$ the two error sums of squares coincide, since
$SS_W = SS_S + SS_{A\times S}$, but the degrees of freedom do not: the
repeated-measures error has $(a-1)(n-1)$ df against the between-subjects
$a(n-1)$, so the same error sum of squares is spread over fewer df and the
repeated-measures error mean square is larger by exactly the factor $a/(a-1)$.
With identical numerators,

$$
F_{\mathrm{RM}} = F_{\mathrm{B}}\cdot\frac{a-1}{a}.
$$

On the crossing-profile dataset above, built with $SS_S = 0$: the
repeated-measures test gives $F(3, 12) = 2.50$ ($p = .109$) while the
between-subjects statistic on the same scores is $F(3, 16) = 3.33$ ($p = .046$)
— smaller by exactly $3/4$. Zero participant variability therefore does not make
the two tests identical: the error sums of squares match while the error degrees
of freedom differ.

In general, whenever $SS_S > 0$ the two statistics stand in the ratio

$$
\frac{F_{\mathrm{RM}}}{F_{\mathrm{B}}}
= \left(1 + \frac{SS_S}{SS_{A\times S}}\right)\frac{a-1}{a},
$$

so $F_{\mathrm{RM}} > F_{\mathrm{B}}$ exactly when $MS_S > MS_{A\times S}$:
writing the ratio as exceeding 1 gives $(a-1)SS_S > SS_{A\times S}$, and dividing
both sides by $(a-1)(n-1)$ turns that into the comparison of the two mean
squares. Removing the participant source from the error pays for the degrees of
freedom it costs precisely when participants' overall levels vary more, per
degree of freedom, than their condition effects are inconsistent. For the
caffeine data $MS_S = 5.38$ far exceeds $MS_{A\times S} = 1.06$, and the
repeated-measures statistic is the larger one.

Two qualifications keep the comparison honest. First, these are degrees-of-
freedom and mean-square identities computed on one set of scores viewed both
ways — not a recommendation. A between-subjects $F$ applied to dependent scores
assumes independent errors the design does not provide, and neither statistic
should be chosen because it happens to be larger. Second, the ratio identities
require nonzero error terms and $SS_A > 0$. If $SS_{A\times S} = 0$, the
repeated-measures error mean square is zero and its $F$ is undefined; the
between-subjects statistic need not be undefined, because $SS_S > 0$ leaves its
error mean square positive. If $SS_A = 0$ and both error terms are nonzero,
both statistics equal zero and coincide.

## Two conditions: equivalence with the paired t test

With $a = 2$ conditions the design collapses to the paired-samples setting. Each
participant contributes one difference score,

$$
D_i = Y_{i2} - Y_{i1},
$$

and the null hypothesis of equal condition means is the null hypothesis that the
population mean difference is zero. The natural statistic is the paired $t$ on
the difference scores, whose mechanics — standard error, $n-1$ degrees of
freedom, two-sided decision — are those of the
[paired-samples $t$ test](/topics/foundations/t-tests). The repeated-measures $F$
with two conditions is the square of that $t$:

$$
F(1,\,n-1) = t_{n-1}^2.
$$

As a compact check, five participants each rated their mood after listening at a
slow and a medium tempo. The medium-minus-slow difference scores are
$2, 1, 2, 2, 3$, with mean $\bar{D} = 2$, variance $s_D^2 = 0.5$, and standard
error $\sqrt{s_D^2/n} = \sqrt{0.5/5} = 0.3162$, giving

$$
t(4) = \frac{2}{0.3162} = 6.32, \qquad t^2 = 40.0.
$$

A repeated-measures ANOVA of the same two conditions gives $F(1, 4) = 40.0$, and
the two procedures return identical p-values ($p = .0032$). The equivalence is
exact; the repeated-measures framework adds nothing until $a \geq 3$.

## Full and restricted models

The test can be restated as a comparison of two nested models, instantiating the
[generic model-comparison machinery](/topics/anova/model-comparison). The full
model gives every condition and every participant its own additive effect:

$$
Y_{ij} = \mu + \alpha_j + \pi_i + \varepsilon_{ij},
$$

where $\mu$ is the grand level, $\alpha_j$ the effect of condition $j$, $\pi_i$
the effect of participant $i$, and $\varepsilon_{ij}$ the error. The restricted
model drops the condition effects — the restriction
$\alpha_1 = \cdots = \alpha_a = 0$ is precisely the omnibus null — but keeps the
participant effects:

$$
Y_{ij} = \mu + \pi_i + \varepsilon_{ij}.
$$

Least-squares estimation gives

$$
\begin{aligned}
\hat\mu &= \bar{Y},\\
\hat\alpha_j &= \bar{Y}_{\cdot j} - \bar{Y},\\
\hat\pi_i &= \bar{Y}_{i\cdot} - \bar{Y},\\
\hat\varepsilon_{ij} &= Y_{ij} - \bar{Y}_{\cdot j} - \bar{Y}_{i\cdot} + \bar{Y},
\end{aligned}
$$

so the fitted values are

$$
\hat{Y}_{ij}^{\,\text{full}} = \bar{Y}_{\cdot j} + \bar{Y}_{i\cdot} - \bar{Y},
\qquad
\hat{Y}_{ij}^{\,\text{restricted}} = \bar{Y}_{i\cdot}.
$$

The full model predicts a score from the condition mean and the participant mean
together, the grand mean subtracted once because both already include it; the
restricted model predicts each participant's scores by that participant's own
mean. The estimates satisfy $\sum_j \hat\alpha_j = 0$ and
$\sum_i \hat\pi_i = 0$, which is why only $a-1$ condition effects and $n-1$
participant effects are free.

As a compact illustration of the arithmetic, suppose a condition mean is $7.5$,
a participant's mean is $5.0$, the grand mean is $6.0$, and the observed score
is $8$. The full-model prediction is $6 + 1.5 + (-1) = 6.5$, equivalently
$7.5 + 5.0 - 6.0$, and the residual is $8 - 6.5 = 1.5$ — the observed score less
both means, with the grand mean added back.

For participant 1 of the caffeine data, $\hat\pi_1 = 7.50 - 6.45 = +1.05$:

| Component | 0 mg | 100 mg | 200 mg | 400 mg |
|---|---:|---:|---:|---:|
| $\hat\mu = \bar{Y}$ | 6.45 | 6.45 | 6.45 | 6.45 |
| $\hat\alpha_j$ | $+1.25$ | $+0.55$ | $-0.45$ | $-1.35$ |
| $\hat\pi_1$ | $+1.05$ | $+1.05$ | $+1.05$ | $+1.05$ |
| Full prediction $\hat{Y}_{1j}$ | 8.75 | 8.05 | 7.05 | 6.15 |

The restricted model predicts $6.45 + 1.05 = 7.50$ hours in every condition for
this participant. Neither model fits exactly, and the residuals — observed minus
predicted — are what the error sums accumulate.

The error sums of squares follow directly. The full model's error is the sum of
squared participant-by-condition residuals, $E_F = SS_{A\times S} = 28.6$. The
restricted model's error is

$$
\begin{aligned}
E_R
&= \sum_{i=1}^{n}\sum_{j=1}^{a}\left(Y_{ij} - \bar{Y}_{i\cdot}\right)^2\\
&= SS_A + SS_{A\times S} = 38.9 + 28.6 = 67.5,
\end{aligned}
$$

so allowing condition effects reduces the error by exactly $SS_A$.

Degrees of freedom are counts of scores minus parameters estimated. The
restricted model estimates $n$ parameters — $\hat\mu$ and the $n-1$ independent
$\hat\pi_i$ — so $df_R = na - n = 40 - 10 = 30$. The full model estimates
$n + a - 1 = 13$ parameters — $\hat\mu$, the $a-1$ independent $\hat\alpha_j$,
and the $n-1$ independent $\hat\pi_i$ — so
$df_F = na - (n + a - 1) = 40 - 13 = 27$. Their difference is $a - 1 = 3$, the
degrees of freedom of the tested restriction. The model-comparison statistic is
then

$$
\begin{aligned}
F
&= \frac{(E_R - E_F)/(df_R - df_F)}{E_F/df_F}\\
&= \frac{(67.5 - 28.6)/3}{28.6/27}\\
&= \frac{38.9/3}{1.06}\\
&= 12.24,
\end{aligned}
$$

identical to the ANOVA-table $F$: the classic partition and the model comparison
are two computations of one test.

## Effect sizes

The omnibus test asks whether the condition means differ, not how large their
differences are. Effect sizes summarize magnitude, but their denominators must
be stated explicitly because participant variability can either remain in the
scaling or be removed from it. General principles are treated in
[Effect Sizes](/topics/foundations/effect-sizes); the formulas here are specific
to the present one-way within-subjects partition.

### Ordinary and partial eta-squared

Two proportions use different denominators:

$$
\eta^2 = \frac{SS_A}{SS_T},
\qquad
\eta_p^2 = \frac{SS_A}{SS_A + SS_{A\times S}}.
$$

Ordinary eta-squared describes the condition sum of squares as a proportion of
the total sum of squares, including both participant and residual variability.
Partial eta-squared instead compares condition variability with condition plus
the participant-by-condition residual. It leaves overall participant
differences out of the denominator, paralleling their removal from the error
term of the repeated-measures test.

For the hypothetical caffeine data,

$$
\eta^2 = \frac{38.9}{115.9} = .3356 \approx .34,
$$

whereas

$$
\eta_p^2 = \frac{38.9}{38.9 + 28.6} = .5763 \approx .58.
$$

Thus $.58$ is not the proportion of total variability associated with condition;
that descriptive proportion is $.34$. Neither measure is altered by a
Greenhouse–Geisser or Huynh–Feldt correction, because those corrections leave
all sums of squares unchanged.

### Standardized mean differences

A standardized condition difference also requires a declared standardizer. One
convention, intended to aid comparison with between-subjects designs, retains
overall participant variability and the participant-by-condition residual:

$$
s = \sqrt{\frac{SS_S + SS_{A\times S}}{a(n-1)}}
= \sqrt{\frac{48.4 + 28.6}{36}}
= 1.4625 \approx 1.46.
$$

Here $SS_S + SS_{A\times S} = 77.0$ is the within-condition sum of squares when
pairing is ignored, and $a(n-1) = 36$ is its degrees of freedom. For the
placebo-minus-400 mg difference, this standardizer gives

$$
d = \frac{\bar{Y}_{\cdot 1} - \bar{Y}_{\cdot 4}}{s}
= \frac{7.7 - 5.1}{1.4625}
= 1.7778 \approx 1.78.
$$

A different convention standardizes by the SD of the pairwise difference scores.
For $D_i=Y_{i1}-Y_{i4}$, the hypothetical data give $\bar{D}=2.6$ and
$s_D=0.6992$, so the difference-score standardized effect defined in
[Effect Sizes](/topics/foundations/effect-sizes) is

$$
d_z = \frac{\bar{D}}{s_D}
= \frac{2.6}{0.6992}
= 3.7185 \approx 3.72.
$$

The values $1.78$ and $3.72$ are not competing calculations of one quantity:
they scale the same mean difference by different standard deviations. Reports
should therefore name the standardizer rather than merely label either value
"Cohen's $d$." Retaining participant variability is intended to facilitate
comparison across designs; it does not make effect sizes from different studies
automatically comparable.

## Reporting the analysis

A report should connect the omnibus inference, its covariance correction, and
the targeted comparisons without treating any one of them as answering the
others' questions. It should identify:

- the one-way repeated-measures design and any correction used;
- the observed $F$, the reference degrees of freedom used for inference
  (corrected when applicable), the p-value, and a named omnibus effect size;
- the follow-up procedure and the family over which it controls error; and
- the directions and raw-unit magnitudes of important differences, with
  simultaneous intervals when familywise inference is used.

For example, the hypothetical caffeine analysis can be summarized by a
Greenhouse–Geisser-corrected $F(2.23, 20.05)=12.24$, $p<.001$,
$\eta_p^2=.58$. In a Bonferroni family containing all six pairwise comparisons,
sleep duration was lower at 200 mg and 400 mg than at placebo, and lower at
400 mg than at 100 mg. The largest observed pairwise difference was placebo
minus 400 mg: 2.60 hours, with a 95% familywise interval of $[1.86, 3.34]$
hours. The three adjacent-dose nulls were not rejected; those nonrejections do
not establish equivalence. The corrections are developed in
[Repeated-Measures Assumptions and Corrections](/topics/anova/repeated-measures-assumptions),
and the full comparison-specific calculations appear in
[Repeated-Measures Comparisons](/topics/anova/repeated-measures-comparisons).

## Scope and downstream topics

This page owns the within-subjects notation, the
$SS_A+SS_S+SS_{A\times S}$ partition, the unadjusted omnibus test, the
participant-augmented model comparison, and repeated-measures omnibus effect
sizes. Three further questions arise, and each has a canonical page:

- **Can the unadjusted reference distribution be trusted?**
  [Repeated-Measures Assumptions and Corrections](/topics/anova/repeated-measures-assumptions)
  explains when it is appropriate and how epsilon corrections change its
  degrees of freedom.
- **Which conditions differ?**
  [Repeated-Measures Comparisons](/topics/anova/repeated-measures-comparisons)
  locates condition differences with pairwise and complex contrast scores and
  comparison-specific error estimates.
- **What do order, carryover, time, and incomplete observations imply for the
  design and its interpretation?**
  [Repeated-Measures Design Considerations](/topics/anova/repeated-measures-design)
  treats these issues alongside the choice between within- and
  between-subjects designs.

The generic contrast and familywise-error machinery used by those applications
remains in [Linear Contrasts](/topics/anova/contrasts) and
[Multiple Comparisons](/topics/anova/multiple-comparisons).

Repeated-measures-specific power and sample-size formulas remain outside the
present scope. Within-person comparison can improve precision and power, but the
design does not guarantee a universal power advantage.

## Related pages

- [Repeated-Measures Assumptions and Corrections](/topics/anova/repeated-measures-assumptions)
  develops sphericity, Mauchly's test, and Greenhouse–Geisser and Huynh–Feldt
  corrections.
- [Repeated-Measures Comparisons](/topics/anova/repeated-measures-comparisons)
  supplies pairwise and complex within-person tests and simultaneous intervals.
- [Repeated-Measures Design Considerations](/topics/anova/repeated-measures-design)
  covers order, counterbalancing, carryover, and longitudinal design limits.
- [One-way ANOVA](/topics/anova/one-way-anova) develops the between-subjects
  counterpart, its $SS_B$/$SS_W$ partition, and the meaning of the omnibus
  question.
- [Model comparison](/topics/anova/model-comparison) owns the generic
  full-versus-restricted $F$ machinery that this page instantiates with
  participant-augmented models.
- [Linear contrasts](/topics/anova/contrasts) covers targeted comparisons of
  means, whether planned in advance or used to localize an omnibus result.
- [t tests](/topics/foundations/t-tests) treats the paired-samples design whose
  two-condition repeated-measures analysis is the squared paired $t$.
- [Crosswalk of ANOVA quantities](/topics/anova/crosswalk) aligns the errors,
  sums of squares, and degrees of freedom across naming traditions.
