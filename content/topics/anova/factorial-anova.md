---
description: factorial ANOVA for the two-way between-subjects design — cell means and factorial notation, main effects, simple effects, and interaction, interaction plots, the three omnibus hypotheses and their contrast representation, cell-means and effects models, restricted-model F tests, the sums-of-squares partition and ANOVA table, assumptions, unequal cell sizes and Type I/II/III sums of squares, and η² and partial η² for omnibus effects
---

# Factorial ANOVA

**Canonical reference:** [Maxwell, Delaney, & Kelley (MDK)](/resources#designing-experiments-and-analyzing-data) #ref/mdk

[One-Way ANOVA](/topics/anova/one-way-anova) compares means across the levels of a
single factor. Many research questions involve two factors at once: does the effect
of one variable persist, strengthen, or reverse across the levels of another? A
factorial design crosses the factors so that every combination of their levels is
observed, and a two-way ANOVA asks three questions about the resulting cell means:
do the levels of the first factor differ, averaging over the second; do the levels
of the second factor differ, averaging over the first; and does the effect of
either factor depend on the level of the other? Each question receives its own
$F$ test, all judged against one shared error term.

This page develops the balanced two-way between-subjects design in full — design
and notation, mean patterns, hypotheses, models, sums of squares, and effect
sizes — and then treats what changes when cell sizes are unequal. Follow-up
analyses that probe a significant interaction or a many-leveled main effect are
treated in [Factorial ANOVA Follow-Ups](/topics/anova/factorial-follow-ups);
designs in which the same participants are measured under several conditions have
a different error structure and are treated in
[Repeated-Measures ANOVA](/topics/anova/repeated-measures-anova).

## Factorial designs and cell means

A **factor** is an independent variable with two or more levels. A **factorial
design** includes more than one factor and observes every combination of their
levels; the two-way design with factors A and B is the simplest case. One
**cell** is one combination of a level of A and a level of B, so a design with
$a$ levels of A and $b$ levels of B has $ab$ cells — a $2\times 2$ design has
two factors and four cells. In the between-subjects version developed here, each
participant is randomly assigned to exactly one cell and contributes one
observation; the design is **balanced** when the cell sizes are equal, $n$ per
cell, for $N = abn$ observations in total.

The running example is a $2\times 2$ experiment on fear responses to a brief
film scene. Factor A is the soundtrack (neutral or suspenseful music), factor B
is a jump scare (absent or present), and the outcome is a fear rating on a
0–100 scale. Five participants are assigned to each cell ($n = 5$, $N = 20$).
Let $Y_{ijk}$ denote the score of participant $i$ ($i = 1, \ldots, n$) in the
cell formed by level $j$ of A ($j = 1, \ldots, a$) and level $k$ of B
($k = 1, \ldots, b$). The observed cell means are:

| | Scare absent | Scare present | Row mean |
|---|---|---|---|
| Neutral music | $\bar Y_{11} = 20$ | $\bar Y_{12} = 40$ | $\bar Y_{1\cdot} = 30$ |
| Suspenseful music | $\bar Y_{21} = 30$ | $\bar Y_{22} = 70$ | $\bar Y_{2\cdot} = 50$ |
| Column mean | $\bar Y_{\cdot 1} = 25$ | $\bar Y_{\cdot 2} = 55$ | $\bar Y = 40$ |

The **marginal means** average over the other factor: the row mean
$\bar Y_{j\cdot}$ is the mean of the $b$ cell means in row $j$, the column mean
$\bar Y_{\cdot k}$ is the mean of the $a$ cell means in column $k$, and the
grand mean $\bar Y$ is the mean of all $N$ scores. Because the design is
balanced, these marginal means are simple averages of cell means — no weighting
by cell size is needed, and the grand mean equals the average of the four cell
means. With unequal cell sizes the two ways of averaging diverge, with
consequences taken up [below](#assumptions-and-unequal-cell-sizes).

Within a cell, the replication index $i$ enumerates *different* participants,
not repeated measurements of the same person: each row of the raw data matrix is
a distinct individual serving in one condition only. That is what makes this a
between-subjects design. When instead each participant contributes a score in
every condition, the scores are correlated across conditions and the analysis
must partition that dependence rather than pool it into error.

## Main effects, simple effects, and interaction

A **main effect** is a comparison of the marginal means of one factor, averaging
over the levels of the other. In the example, the main effect of music is the
suspenseful minus the neutral row mean, $50 - 30 = +20$: fear runs 20 points
higher with suspenseful music, averaging over the scare conditions. The main
effect of the jump scare is $55 - 25 = +30$: fear runs 30 points higher when the
scare is present, averaging over the soundtracks. Each main effect answers its
own marginal question.

A **simple effect** is the effect of one factor at one fixed level of the other.
The simple effect of the scare under neutral music is $40 - 20 = 20$; under
suspenseful music it is $70 - 30 = 40$. The simple effect of music when the
scare is absent is $30 - 20 = 10$; when the scare is present it is
$70 - 40 = 30$. Main effects average these simple effects; whether the average
describes any particular level is exactly what the interaction asks.

The **interaction** is the difference between the simple effects — a difference
in differences. Declaring the orientation explicitly (scare effects,
neutral row first):

$$
(\bar Y_{12} - \bar Y_{11}) - (\bar Y_{22} - \bar Y_{21}) = (40 - 20) - (70 - 30) = 20 - 40 = -20.
$$

The same interaction can be computed from the other direction (music effects,
scare-present first):

$$
(\bar Y_{22} - \bar Y_{12}) - (\bar Y_{21} - \bar Y_{11}) = (70 - 40) - (30 - 20) = 30 - 10 = +20.
$$

The magnitude is the same in both directions, and the interaction is zero in one
direction if and only if it is zero in the other; reversing the order of either
difference flips the sign. An interaction of zero means the simple effects are
equal — the effect of each factor is the same at every level of the other, which
is called an **additive** pattern. A nonzero interaction means the effect of one
factor depends on the level of the other.

Two canonical patterns show that the three questions are logically independent.
An additive pattern with both main effects present:

| | Scare absent | Scare present | Row mean |
|---|---|---|---|
| Neutral music | 20 | 40 | 30 |
| Suspenseful music | 30 | 50 | 40 |
| Column mean | 25 | 45 | 35 (grand) |

Here the scare effect is $20$ in both rows and the music effect is $10$ in both
columns, so the difference in differences is $0$: the main effects ($+10$ music,
$+20$ scare) tell the whole story. A crossover pattern with no main effects:

| | Scare absent | Scare present | Row mean |
|---|---|---|---|
| Neutral music | 20 | 60 | 40 |
| Suspenseful music | 60 | 20 | 40 |
| Column mean | 40 | 40 | 40 (grand) |

Every marginal mean equals 40, so both main effects are exactly zero, yet the
simple effects are large and opposite in sign — the scare effect is $+40$ under
neutral music and $-40$ under suspenseful music, a difference in differences of
$(60-20)-(20-60) = 80$. Marginal means alone can mask this structure entirely:
inspecting cell means or plotting them is how the pattern becomes visible.

These sample patterns are descriptions. Whether an observed difference in
differences reflects anything more than sampling error is a question for the
$F$ tests developed [below](#restricted-models-and-the-three-f-tests).

## Interaction plots

An interaction plot displays the cell means so that the three questions can be
read by eye. The construction procedure:

- Put the outcome on the vertical axis.
- Choose one factor for the horizontal axis — the one with more levels, or the
  one of greater substantive interest.
- Plot the cell means at each level of that factor and connect the points with a
  line for each level of the other factor.
- Use distinct colors or line styles to identify the levels, with a legend.
- Swapping the two factors between the axis and the traces draws the same means
  differently and can expose a relationship more clearly.
- With a third factor, use separate panels (facets) for its levels.

Reading the plot corresponds directly to the algebra. **Parallel** lines mean
the vertical distance between them is constant: the simple effects are equal
everywhere and the interaction is zero, so main effects describe the pattern
completely. **Nonparallel** lines mean the simple effects differ — an
interaction. **Crossing** lines are the extreme case in which a simple effect
reverses sign. Because main effects and interaction are separate questions,
always cross-check the plot against the marginal means rather than reading one
off the other.

Two small tables illustrate the classification. First:

| | Scare absent | Scare present | Row mean |
|---|---|---|---|
| Neutral music | 20 | 20 | 20 |
| Suspenseful music | 40 | 40 | 40 |
| Column mean | 30 | 30 | 30 (grand) |

The lines are horizontal and separated: a music effect of $+20$, no scare
effect, and equal simple effects of zero everywhere — no interaction. Second:

| | Scare absent | Scare present | Row mean |
|---|---|---|---|
| Neutral music | 20 | 40 | 30 |
| Suspenseful music | 50 | 30 | 40 |
| Column mean | 35 | 35 | 35 (grand) |

The lines cross: the scare simple effect is $+20$ under neutral music and $-20$
under suspenseful music (a difference in differences of $40$), the scare main
effect is zero, and the music main effect is $+10$ — an interaction
accompanying a main effect with the other marginal difference averaging out.

Apparent nonparallelism in a sample plot can reflect sampling noise; the
visual impression is a description, and the $F$ test for the interaction decides
whether the departures from parallelism are larger than error explains.

## The three omnibus hypotheses

Write $\mu_{jk}$ for the population mean of cell $(j,k)$, $\mu_{j\cdot}$ for the
population marginal mean of row $j$ (the average of the population cell means in
that row), and $\mu_{\cdot k}$ for the population marginal mean of column $k$.
The three omnibus null hypotheses of the two-way design are:

$$
H_{0A}\colon \mu_{1\cdot} = \mu_{2\cdot} = \cdots = \mu_{a\cdot}, \qquad
H_{0B}\colon \mu_{\cdot 1} = \mu_{\cdot 2} = \cdots = \mu_{\cdot b},
$$

$$
H_{0AB}\colon \mu_{jk} - \mu_{jk'} = \mu_{j'k} - \mu_{j'k'} \quad \text{for all levels } j, j' \text{ of A and } k, k' \text{ of B},
$$

with alternatives stating that the corresponding equality fails. The interaction
null says that every pair of rows has the same pattern of differences across
columns — the simple effects of B are identical at every level of A (equivalently,
the simple effects of A are identical at every level of B). In the $2\times 2$
case the interaction null collapses to a single equation, again with the
orientation declared explicitly:

$$
(\mu_{12} - \mu_{11}) - (\mu_{22} - \mu_{21}) = 0.
$$

Each hypothesis imposes a set of linear restrictions on the cell means and is
tested by one $F$ test; none of them locates *where* the differences lie.

### The 2×2 hypotheses as contrasts

Ordering the four cells as $(1,1)$, $(1,2)$, $(2,1)$, $(2,2)$ — neutral/absent,
neutral/present, suspenseful/absent, suspenseful/present — the three hypotheses
become three contrasts on the four cell means:

| Question | $(1,1)$ | $(1,2)$ | $(2,1)$ | $(2,2)$ | Value on the sample means |
|---|---|---|---|---|---|
| Music | $+\tfrac12$ | $+\tfrac12$ | $-\tfrac12$ | $-\tfrac12$ | $-20$ |
| Jump scare | $+\tfrac12$ | $-\tfrac12$ | $+\tfrac12$ | $-\tfrac12$ | $-30$ |
| Interaction | $+\tfrac12$ | $-\tfrac12$ | $-\tfrac12$ | $+\tfrac12$ | $+10$ |

With these signs the music contrast is oriented neutral minus suspenseful, so
its value $-20$ is the negative of the $+20$ main effect defined above; the
jump-scare contrast at $-30$ likewise reverses the $+30$ main effect; and the
interaction value $+10$ equals $-\tfrac12$ times the scare-direction difference
in differences of $-20$. The orientation and scaling of a contrast are declared
choices: reversing every sign negates the estimate, and multiplying every
coefficient by a constant multiplies the estimate by that constant, but the
restriction and the test are unchanged. With the $\pm\tfrac12$ scaling, each
coefficient sum of squares is 1, the two main-effect contrasts are differences
of marginal means, and the interaction contrast is one-half of the corresponding
difference in differences.

The three coefficient vectors are mutually orthogonal — each pair has a dot
product of zero — and with equal cell sizes they partition the between-cells
variability, exhausting its three degrees of freedom ($ab - 1 = 3$ in a
$2\times 2$): tested with the machinery of
[Linear Contrasts](/topics/anova/contrasts), their sums of squares are exactly
$SS_A = 2000$, $SS_B = 4500$, and $SS_{AB} = 500$, which sum to the
between-cells sum of squares of $7000$. The equal-$n$ condition is what makes
this orthogonality carry over to the sums of squares; the unequal-$n$ case is
discussed [below](#assumptions-and-unequal-cell-sizes).

## The full model and the partition of variability

### The cell-means model

The full model for the two-way design gives every cell its own mean:

$$
Y_{ijk} = \mu_{jk} + \varepsilon_{ijk},
$$

where $\varepsilon_{ijk}$ is the error of participant $i$ in cell $(j,k)$. Least
squares estimates each $\mu_{jk}$ by the corresponding cell mean, so the full
model predicts each participant's score by their own cell mean — a participant
in the neutral/present cell is predicted 40. The full-model error is the
within-cell sum of squares,

$$
E_F = SS_W = \sum_{j=1}^{a}\sum_{k=1}^{b}\sum_{i=1}^{n}\left(Y_{ijk} - \bar Y_{jk}\right)^2,
$$

with residual degrees of freedom $df_F = N - ab$: each of the $ab$ cell means
estimated from $n$ scores costs one degree of freedom per cell. Here $df_F = 20 - 4 = 16$.

### The effects model

To test each effect by model comparison, the cell mean is re-expressed as
removable pieces. The **effects model** decomposes each cell mean into a grand
mean, a row effect, a column effect, and an interaction deviation:

$$
Y_{ijk} = \mu + \alpha_j + \beta_k + (\alpha\beta)_{jk} + \varepsilon_{ijk},
$$

with least-squares estimators

$$
\hat\mu = \bar Y, \qquad
\hat\alpha_j = \bar Y_{j\cdot} - \bar Y, \qquad
\hat\beta_k = \bar Y_{\cdot k} - \bar Y, \qquad
\widehat{(\alpha\beta)}_{jk} = \bar Y_{jk} - \bar Y_{j\cdot} - \bar Y_{\cdot k} + \bar Y.
$$

For the running example the estimates are $\hat\mu = 40$;
$\hat\alpha_1 = -10$ and $\hat\alpha_2 = +10$;
$\hat\beta_1 = -15$ and $\hat\beta_2 = +15$; and interaction deviations of
$+5$, $-5$, $-5$, $+5$ across the four cells in table order. Each cell mean is
exactly the sum of its pieces: $20 = 40 - 10 - 15 + 5$ and
$70 = 40 + 10 + 15 + 5$, for instance. The main-effect estimates are deviations
of marginal means from the grand mean, so they sum to zero across the levels of
their factor; the interaction deviations sum to zero within every row and every
column. Removing a term from the model removes exactly that piece from every
prediction.

### The partition of variability

Treating the $ab$ cells as $ab$ groups recovers the one-way partition of
[One-Way ANOVA](/topics/anova/one-way-anova): the total sum of squares splits
into variability between cell means and variability within cells,

$$
SS_T = SS_{\text{between cells}} + SS_W,
\qquad
SS_{\text{between cells}} = n\sum_{j=1}^{a}\sum_{k=1}^{b}\left(\bar Y_{jk} - \bar Y\right)^2.
$$

In the example, each of the four cells contributes 250 to $SS_W$ (the five
scores in a cell deviate about their own mean with squared deviations summing
to 250), so $SS_W = 4 \times 250 = 1000$; the between-cells term is
$5[(-20)^2 + 0^2 + (-10)^2 + 30^2] = 7000$; and $SS_T = 8000$.

In a balanced design the between-cells term splits further, and exactly, into
one piece per effect:

$$
SS_T = SS_A + SS_B + SS_{AB} + SS_W.
$$

This three-way split is what the balanced design buys: each omnibus question
owns its own sum of squares. The full model's error is the shared denominator of
all three tests, with mean square

$$
MS_W = \frac{E_F}{df_F} = \frac{SS_W}{N - ab} = \frac{1000}{16} = 62.5.
$$

The same $E_F$, $df_F$, and $MS_W$ serve every test on the design — the full
model does not change when the restriction being tested changes
([Crosswalk of ANOVA Quantities](/topics/anova/crosswalk)).

## Restricted models and the three F tests

Each omnibus hypothesis is tested by comparing the full model against the
restricted model that imposes the null. The nested-model $F$ ratio and its
rationale are developed in
[Model Comparison](/topics/anova/model-comparison):

$$
F = \frac{(E_R - E_F)/(df_R - df_F)}{E_F/df_F},
$$

where $E_R$ is the restricted model's error, $df_R$ its residual degrees of
freedom, and $E_R - E_F$ the increase in error the restriction causes. The
numerator is the loss of fit per restriction imposed; the denominator is the
full model's error per degree of freedom.

### The three restrictions

The restriction for a main-effect null removes that factor's term while
retaining every other term, the interaction included. For the music null
($\alpha_1 = \alpha_2 = 0$), the restricted model is
$Y_{ijk} = \mu + \beta_k + (\alpha\beta)_{jk} + \varepsilon_{ijk}$; its
predictions are the cell means with the music effect removed,
$\bar Y_{jk} - \hat\alpha_j$. For the scare null the symmetric model removes
$\beta_k$. For the interaction null, the restricted model is the **additive
model** $Y_{ijk} = \mu + \alpha_j + \beta_k + \varepsilon_{ijk}$, whose
prediction for cell $(j,k)$ is the **additive prediction**

$$
\bar Y_{j\cdot} + \bar Y_{\cdot k} - \bar Y,
$$

the grand mean plus the row and column effects — the prediction that would hold
if the pattern were exactly additive. The **interaction deviation** of a cell is
its cell mean minus this additive prediction,
$\bar Y_{jk} - (\bar Y_{j\cdot} + \bar Y_{\cdot k} - \bar Y)$, which is exactly
$\widehat{(\alpha\beta)}_{jk}$: the part of the cell-mean pattern the main
effects cannot capture. For the running example:

| | Scare absent | Scare present |
|---|---|---|
| Additive prediction, neutral | 15 | 45 |
| Additive prediction, suspenseful | 35 | 65 |
| Interaction deviation, neutral | $+5$ | $-5$ |
| Interaction deviation, suspenseful | $-5$ | $+5$ |

The deviations sum to zero within each row and each column, so the interaction
relocates fear between cells without altering any marginal mean.

The three restricted models applied to the example:

| Restriction | Removed term | Restricted predictions | $E_R$ | $E_R - E_F$ |
|---|---|---|---|---|
| Equal music marginals | $\alpha_j$ | 30, 50; 20, 60 | 3000 | 2000 |
| Equal scare marginals | $\beta_k$ | 35, 25; 45, 55 | 5500 | 4500 |
| Additivity | $(\alpha\beta)_{jk}$ | 15, 45; 35, 65 | 1500 | 500 |

Under the first restriction both row means of the restricted predictions equal
the grand mean 40 — that is what equal music marginals means in a balanced
design — while the column structure and the cell-to-cell patterning are
retained; the second restriction is symmetric on columns; the third removes only
the deviations from additivity, leaving both sets of marginals intact.

### Sums of squares for the three effects

The increase in error equals the corresponding sum of squares, and each has a
computing formula in the estimated effects:

$$
SS_A = bn\sum_{j=1}^{a}\hat\alpha_j^2, \qquad
SS_B = an\sum_{k=1}^{b}\hat\beta_k^2, \qquad
SS_{AB} = n\sum_{j=1}^{a}\sum_{k=1}^{b}\widehat{(\alpha\beta)}_{jk}^2.
$$

The multipliers count observations: each row marginal mean summarizes the $bn$
participants in its row, each column marginal mean the $an$ participants in its
column, and each interaction deviation the $n$ participants in its cell. For the
example, $SS_A = (2)(5)\left[(-10)^2 + (10)^2\right] = 10(200) = 2000$,
$SS_B = (2)(5)\left[(-15)^2 + (15)^2\right] = 10(450) = 4500$, and
$SS_{AB} = 5(25 + 25 + 25 + 25) = 500$, matching the error increases in the
table above exactly.

### Degrees of freedom and the three F tests

Degrees of freedom come from parameter counting, and the parameters being counted
are cell means. The full model estimates $ab = 4$ independent cell means, so
$df_F = N - ab = 16$. Each restricted model estimates one fewer independent
parameter here — three independent mean parameters in each case — so $df_R = 17$
and $df_R - df_F = 1$. In general the restrictions remove $a - 1$ parameters for
the A main effect, $b - 1$ for the B main effect, and $(a-1)(b-1)$ for the
interaction. The three tests are therefore

$$
F_A = \frac{SS_A/(a-1)}{MS_W}, \qquad
F_B = \frac{SS_B/(b-1)}{MS_W}, \qquad
F_{AB} = \frac{SS_{AB}/[(a-1)(b-1)]}{MS_W},
$$

which for the example give

$$
F_A = \frac{2000/1}{62.5} = 32, \qquad
F_B = \frac{4500/1}{62.5} = 72, \qquad
F_{AB} = \frac{500/1}{62.5} = 8.
$$

Each is referred to the $F$ distribution with its own numerator degrees of
freedom and the shared denominator $df_F = N - ab = 16$. At $\alpha = .05$ the
critical value is $F_{.05;\,1,\,16} = 4.4940$, so all three nulls are rejected:
the marginal means of both factors differ, and the simple effects differ from
one another (observed $p$-values $3.57 \times 10^{-5}$, $2.56 \times 10^{-7}$,
and $.0121$). Rejection of the interaction null is evidence of nonadditivity,
not a statement about where the simple effects differ — that is a follow-up
question.

## The ANOVA table

The computations are organized in one summary table. In general form:

| Source | $SS$ | $df$ | $MS$ | $F$ |
|---|---|---|---|---|
| A main effect | $bn\sum_j \hat\alpha_j^2$ | $a-1$ | $SS_A/(a-1)$ | $MS_A/MS_W$ |
| B main effect | $an\sum_k \hat\beta_k^2$ | $b-1$ | $SS_B/(b-1)$ | $MS_B/MS_W$ |
| AB interaction | $n\sum_j\sum_k \widehat{(\alpha\beta)}_{jk}^2$ | $(a-1)(b-1)$ | $SS_{AB}/[(a-1)(b-1)]$ | $MS_{AB}/MS_W$ |
| Within cells (error) | $\sum_j\sum_k\sum_i (Y_{ijk} - \bar Y_{jk})^2$ | $N-ab$ | $SS_W/(N-ab)$ | |
| Total | $\sum_j\sum_k\sum_i (Y_{ijk} - \bar Y)^2$ | $N-1$ | | |

Each mean square is formed within its row — the interaction mean square divides
by $df_{AB} = (a-1)(b-1)$, not by any other row's degrees of freedom — and every
$F$ uses the single pooled $MS_W$. Completed for the running example:

| Source | $SS$ | $df$ | $MS$ | $F$ |
|---|---|---|---|---|
| Music | 2000 | 1 | 2000 | 32 |
| Jump scare | 4500 | 1 | 4500 | 72 |
| Music × jump scare | 500 | 1 | 500 | 8 |
| Within cells (error) | 1000 | 16 | 62.5 | |
| Total | 8000 | 19 | | |

Two arithmetic checks make the table trustworthy before it is interpreted: the
effect and error sums of squares must add to the total ($2000 + 4500 + 500 + 1000 = 8000$),
and the degrees of freedom must add to the total ($1 + 1 + 1 + 16 = 19$). A
table that fails either check contains an arithmetic error somewhere.

A further computational discipline matters as soon as a factor has more than two
levels: marginal means, effect estimates, and additive predictions are then
often non-terminating decimals (averaging three cell means, for instance, can
produce a repeating decimal that no rounding displays exactly). Carry
unrounded values — exact fractions or full machine precision — through every
intermediate step, rounding only the final reported statistics. Rounded
intermediates propagate their rounding error through the summations and shift
the sums of squares away from the additivity the table must satisfy.

## Assumptions and unequal cell sizes

The classic two-way between-subjects $F$ tests rest on three assumptions,
parallel to the one-way case but stated cell-wise:

| Assumption | Statement |
|---|---|
| Independence | Observations are independent within and across cells |
| Normality | The errors are normally distributed within each cell |
| Equal variances | The population error variance is the same in every cell |

The robustness considerations discussed for
[One-Way ANOVA](/topics/anova/one-way-anova) carry over with cells in place of
groups: moderate departures from normality and — especially under balance —
from equal variances have limited effect, while violations of independence are
the serious case because they corrupt the shared denominator $MS_W$.

### Weighted and equally weighted marginal means

Everything above presumes equal cell sizes. With unequal sizes, two different
quantities answer the phrase "row mean". The **weighted** marginal mean averages
participants — it pools everyone in the row, so larger cells count more — while
the **equally weighted** marginal mean averages the cell means, giving each cell
one vote. In a balanced design the two coincide, which is why marginal means
could be computed as simple averages above. They need not coincide otherwise.
Suppose a $2\times 2$ design has cell means of 20 and 40 in *both* rows, but
cell sizes of 8 and 2 in the first row and 2 and 8 in the second:

| | Scare absent | Scare present | Weighted row mean | Equally weighted |
|---|---|---|---|---|
| Neutral music | 20 ($n=8$) | 40 ($n=2$) | $(8{\cdot}20 + 2{\cdot}40)/10 = 24$ | 30 |
| Suspenseful music | 20 ($n=2$) | 40 ($n=8$) | $(2{\cdot}20 + 8{\cdot}40)/10 = 36$ | 30 |

The cell-mean pattern is identical in the two rows, so the equally weighted row
means are both 30; yet the weighted means differ by 12 points, purely because
cell size is associated with the other factor's levels. Neither quantity is
wrong — they estimate different things. The weighted mean describes the
population as the sample is composed; the equally weighted mean describes a
setting in which the factor's levels are equally represented. Which one a main
effect should summarize is a substantive choice, and it is the choice that
separates the sums-of-squares types below.

### Type I, II, and III sums of squares

With unequal cell sizes the main-effect sum of squares is no longer unique,
because the factors' contributions to the cell means are no longer orthogonal.
Software offers three conventions:

- **Type I (sequential)** enters the terms in an order and gives each term what
  it adds over the terms entered before it. The first-entered main effect is
  tested against the sample-size-weighted marginal means (24 versus 36 in the
  illustration above), so the tests depend on the order of entry. This is
  appropriate when there is a substantive reason to test factors in a fixed
  order, which is rare.
- **Type II** tests each main effect adjusted for the other main effect,
  ignoring the interaction. It suits designs where the interaction is assumed
  negligible, and it is the more powerful choice in that setting; it is best
  supported when the cell sizes are at least proportional across the table.
- **Type III** tests each main effect with all other terms, the interaction
  included, in the model; its hypotheses are stated on the equally weighted
  marginal means (30 versus 30 above). It is the usual choice when the model
  retains the interaction and equally weighted marginals are the estimand of
  interest.

In the illustration, the music question changes its answer with the convention —
the sequential test compares 24 with 36 and yields a substantial sum of squares,
while the Type III test compares 30 with 30 and yields a sum of squares of
exactly zero — whereas the scare factor, whose column totals are equal, is
unaffected. When the design is balanced, all three types give identical sums of
squares, which is why the distinction never arose above. Software defaults
differ: Type III is the default in most commercial menu-driven packages, but
base R's `anova()` reports sequential (Type I) tests, and obtaining Type III
tests there requires an explicit request and appropriate contrast coding. What
matters is not the label but which marginal means — weighted or equally
weighted, and adjusted for which terms — the reported test summarizes.

## Effect sizes for omnibus effects

Two proportions summarize the magnitude of each omnibus effect:

$$
\eta^2 = \frac{SS_{\text{effect}}}{SS_T},
\qquad
\eta^2_p = \frac{SS_{\text{effect}}}{SS_{\text{effect}} + SS_W}.
$$

Eta-squared expresses an effect as a proportion of all the variability in the
outcome — every effect plus error. Partial eta-squared expresses it as a
proportion of itself plus the within-cell error that the full model leaves
unexplained; the error term is the same full-model error, and "partial" refers
to removing the other effects' sums of squares from the denominator, not to a
different error estimate. For the running example:

| Effect | $\eta^2$ | $\eta^2_p$ |
|---|---|---|
| Music | $2000/8000 = .250$ | $2000/3000 = .667$ |
| Jump scare | $4500/8000 = .5625$ | $4500/5500 = .818$ |
| Interaction | $500/8000 = .0625$ | $500/1500 = .333$ |

In a balanced design the three values of $\eta^2$ add to the proportion of total
variability explained by the full model with all $ab$ cell means — here
$.250 + .5625 + .0625 = .875$, the between-cells $7000$ over the total $8000$.
Partial $\eta^2$ values need not add to anything in particular; each is scaled
by its own effect-plus-error denominator, and the three above sum to more than
.875. The two measures therefore answer different questions and are not
interchangeable; general properties of proportion-explained measures are treated
in [Effect Sizes](/topics/foundations/effect-sizes).

Partial $\eta^2$ can be recovered directly from a reported $F$ and its degrees
of freedom, since $SS_{\text{effect}}/SS_W = F\,df_1/df_2$:

$$
\eta^2_p = \frac{F\,df_1}{F\,df_1 + df_2},
$$

where $df_1$ is the effect's numerator degrees of freedom and $df_2 = N - ab$.
For the interaction, $F = 8$ with $df_1 = 1$ and $df_2 = 16$ gives
$8/(8 + 16) = .333$, agreeing with the sums-of-squares computation.

## Why use factorial designs

Three motives recur. First, the interaction itself: whether an effect generalizes
across the levels of another factor is a question a one-factor study cannot
pose, and averaging over a second factor that moderates the first can make a
main effect misleading. Second, generalizability: observing an effect across
both levels of a second factor tests that it is not idiosyncratic to one
setting. Third, efficiency: crossing two factors reuses the same participants
for both marginal comparisons. The $2\times 2$ example needs 20 participants yet
supplies 10 observations at every level of both factors; two separate one-way
studies with 10 per level would require 40. This pooling can also yield more
precise main-effect estimates than separate studies of the same size would — a
potential benefit of the design, not an unconditional guarantee.

Interpretation follows the test results. All three omnibus tests belong in the
report regardless of which drives the conclusions. When the interaction is
present, the main-effect averages remain meaningful answers to the marginal
questions — fear is 20 points higher with suspenseful music, averaging over
scare conditions — but they may describe no single condition: the observed
scare effect is 20 points
under neutral music and 40 under suspenseful music, and neither is 30. The
pattern is then interpreted conditionally, through simple effects at fixed
levels of the other factor and, for factors with more than two levels,
comparisons among marginal means. The procedures, their error control, and the
interpretation rules for main effects alongside interactions are the subject of
[Factorial ANOVA Follow-Ups](/topics/anova/factorial-follow-ups).

## Related pages

- [One-Way ANOVA](/topics/anova/one-way-anova) develops the partition, $F$ test,
  assumptions, and robustness for a single factor; treating the cells of a
  factorial design as groups recovers that machinery.
- [Model Comparison](/topics/anova/model-comparison) develops the nested-model
  $F$ ratio that all three factorial tests instantiate.
- [Linear Contrasts](/topics/anova/contrasts) supplies the coefficient,
  scaling, and orthogonality machinery behind the factorial hypothesis vectors.
- [Crosswalk of ANOVA Quantities](/topics/anova/crosswalk) aligns the error,
  sums-of-squares, and degrees-of-freedom names used across traditions.
- [Factorial ANOVA Follow-Ups](/topics/anova/factorial-follow-ups) covers simple
  effects, marginal-mean comparisons, familywise error control, and reporting.
- [Repeated-Measures ANOVA](/topics/anova/repeated-measures-anova) treats
  designs in which each participant is measured under every condition.
- [Effect Sizes](/topics/foundations/effect-sizes) situates proportion-explained
  measures among the general effect-size frameworks.
