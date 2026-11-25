---
description: Follow-up tests after a two-way ANOVA — routing from omnibus results to simple effects or marginal-mean contrasts, simple-effect sums of squares, degrees of freedom, and F tests against the pooled within-cell error, Bonferroni-adjusted simple-effect families, pairwise and complex follow-ups for factors with more than two levels, ordinal and disordinal interactions, and reporting of omnibus and simple effects
---

# Factorial ANOVA Follow-Up Tests

**Canonical reference:** [Maxwell, Delaney, & Kelley (MDK)](/resources#designing-experiments-and-analyzing-data) #ref/mdk

The three omnibus tests of a factorial design answer averaged questions: whether
the marginal means of each factor differ, and whether the effect of one factor
depends on the level of the other. None of them locates a difference. A
significant interaction says the simple effects of at least one factor are
unequal, but not where the inequality lies; a significant main effect of a
factor with more than two levels says its marginal means differ somewhere, but
not which ones. Follow-up tests supply the location. This page develops the two
follow-up families for the balanced between-subjects two-way design — simple
effects for probing an interaction, and contrasts on marginal means for pursuing
a main effect — together with the error control and reporting conventions that
accompany them.

Throughout, factor A has $a$ levels indexed by $j$ and factor B has $b$ levels
indexed by $k$, with $n$ observations in each of the $ab$ cells and $N=abn$
observations in total. $Y_{ijk}$ is observation $i$ in cell $(j,k)$, $\bar Y_{jk}$
is that cell's mean, $\bar Y_{j\cdot}$ and $\bar Y_{\cdot k}$ are the row and
column marginal means, and $\bar Y$ is the grand mean. Every test
below uses $MS_W$, the pooled within-cell mean square of the omnibus full model,
on $N-ab$ error degrees of freedom. The design, the omnibus hypotheses and
models, the variability partition, the effect sizes, and the unequal-cell-size
material are developed in
[Factorial ANOVA](/topics/anova/factorial-anova); the general contrast machinery
specialized here is in [Linear Contrasts](/topics/anova/contrasts).

The running example is a $2\times 2$ between-subjects design crossing music
(neutral, suspenseful) with a jump scare (absent, present), $n=5$ observations
per cell and $N=20$ in total:

| | Jump scare absent | Jump scare present | Marginal $\bar Y_{j\cdot}$ |
|---|---|---|---|
| Neutral music | $20$ | $40$ | $30$ |
| Suspenseful music | $30$ | $70$ | $50$ |
| Marginal $\bar Y_{\cdot k}$ | $25$ | $55$ | $40$ |

The omnibus analysis, constructed in
[Factorial ANOVA](/topics/anova/factorial-anova), gives:

| Source | SS | df | MS | $F$ | $p$ |
|---|---|---|---|---|---|
| Music (A) | $2000$ | $1$ | $2000$ | $32$ | $<.001$ |
| Jump scare (B) | $4500$ | $1$ | $4500$ | $72$ | $<.001$ |
| A $\times$ B | $500$ | $1$ | $500$ | $8$ | $.012$ |
| Within cells | $1000$ | $16$ | $62.5$ | | |
| Total | $8000$ | $19$ | | | |

so $MS_W=62.5$ on $N-ab=16$ degrees of freedom.

## Choosing the follow-up question

The appropriate follow-up follows from the pattern of omnibus results:

- **Significant interaction — simple effects.** When the factors interact, the
  effect of each factor is conditional on the level of the other, so the
  follow-up holds the other factor fixed and compares cell means within one of
  its levels.
- **No interaction, significant main effect with three or more levels —
  comparisons among that factor's marginal means.** The omnibus $F$ says the
  marginal means are not all equal; contrasts locate which ones differ.
- **No interaction, significant main effect with two levels — no further
  follow-up.** With two levels the omnibus $F$ already compares the two
  marginal means, so the main effect *is* the comparison (see
  [Contrasts on marginal means](#contrasts-on-marginal-means-without-an-interaction)).

A significant interaction does not say where the nonadditivity lies. Different
simple-effect patterns — an effect at only one level of the other factor,
traces that spread apart without crossing, or a disordinal crossover — can all
produce the same significant $F$, because the omnibus interaction spends its
$(a-1)(b-1)$ numerator degrees of freedom across every direction of
nonadditivity at once.
Probing with simple effects is what converts that aggregate rejection into
statements about particular levels. Whether follow-up testing should be
contingent on omnibus significance at all is a general gating question
addressed in [Multiple Comparisons](/topics/anova/multiple-comparisons); the
routing here takes the omnibus stage as completed.

The two stages also use different significance criteria, and their p-values are
not interchangeable. The omnibus tests are each conducted at a per-test level
$\alpha$ (in the running example $\alpha=.05$, with critical value
$F_{.05}(1,16)=4.494$), while follow-up tests are conducted at a
Bonferroni-adjusted per-test level within a declared family. The interaction's
$p=.012$ is evaluated against the omnibus $\alpha$, not against the adjusted
simple-effect criterion of $.025$ developed below.

## Simple effects

The **simple effect** of factor A at level $k$ of factor B is the effect of A
among the cell means of column $k$: the null hypothesis is
$\mu_{1k}=\cdots=\mu_{ak}$, and in a $2\times 2$ design the test compares
exactly two cell means. The simple effect of B at level $j$ of A is defined
symmetrically within row $j$. Where a main effect averages over the other
factor, a simple effect holds it fixed — the variation being averaged over is
exactly what the interaction tests.

The sum of squares for the simple effect of A at level $k$ is

$$
SS_{A\mid k}=n\sum_{j=1}^{a}\left(\bar Y_{jk}-\bar Y_{\cdot k}\right)^2,
\qquad
SS_{B\mid j}=n\sum_{k=1}^{b}\left(\bar Y_{jk}-\bar Y_{j\cdot}\right)^2,
$$

where $SS_{A\mid k}$ (read "A given $k$") and $SS_{B\mid j}$ denote the two
simple-effect sums of squares. The deviations are taken from the *within-level*
marginal mean $\bar Y_{\cdot k}$ — the average of the cell means being compared,
which is what the simple-effect null predicts for each of them — not from the
grand mean. The numerator degrees of freedom are $a-1$ and $b-1$, one fewer
than the number of cell means compared, and the error term is the pooled
$MS_W$ of the omnibus full model:

$$
F_{A\mid k}=\frac{SS_{A\mid k}/(a-1)}{MS_W},
$$

referred to the $F$ distribution with $a-1$ and $N-ab$ degrees of freedom
(and symmetrically for $B$). In restricted-model terms, each simple-effect
test compares the omnibus full model with a restriction that ties together the
cell means within one level of the other factor: the full model and its error
never change, only the restriction does — the df bookkeeping pattern tabulated
in [Crosswalk of ANOVA Quantities](/topics/anova/crosswalk). As with a single
contrast, every cell's within-cell variability contributes to $MS_W$, including
cells outside the tested level.

For the running example, the simple effect of music when the jump scare is
absent uses the column mean $\bar Y_{\cdot 1}=25$:

$$
SS_{A\mid 1}=5\left[(20-25)^2+(30-25)^2\right]=250,
\qquad
F_{A\mid 1}=\frac{250/1}{62.5}=4.00.
$$

The four simple effects are:

| Simple effect | Cell means compared | SS | $F(1,16)$ | $p$ | Decision at $\alpha=.025$ |
|---|---|---|---|---|---|
| Music, scare absent | $20$ vs $30$ | $250$ | $4.00$ | $.063$ | retained |
| Music, scare present | $40$ vs $70$ | $2250$ | $36.00$ | $<.001$ | rejected |
| Jump scare, neutral | $20$ vs $40$ | $1000$ | $16.00$ | $.001$ | rejected |
| Jump scare, suspenseful | $30$ vs $70$ | $4000$ | $64.00$ | $<.001$ | rejected |

where the decision criterion is the family-adjusted level derived in the next
section. The results locate the interaction. The music effect is
conditional: when the jump scare is absent, the $10$-point difference in cell
means provides insufficient evidence of a population difference at the adjusted
level; when it is present, fear is higher under the suspenseful music
($70$ vs $40$). The jump-scare effect, by contrast, is present within both
music conditions, and larger under the suspenseful one ($40$ points vs $20$ points).
The two music simple effects — $10$ and $30$ points — are exactly the kind
of inequality the significant interaction detects; the simple-effect tests show
which comparison carries it.

In a balanced design, the simple-effect sums of squares of one factor
decompose into that factor's main effect plus the interaction:

$$
\sum_{k=1}^{b}SS_{A\mid k}=SS_A+SS_{AB},
\qquad
\sum_{j=1}^{a}SS_{B\mid j}=SS_B+SS_{AB}.
$$

For the running example,

$$
SS_{A\mid 1}+SS_{A\mid 2}=250+2250=2500=SS_A+SS_{AB},
$$

$$
SS_{B\mid 1}+SS_{B\mid 2}=1000+4000=5000=SS_B+SS_{AB}.
$$

The identity serves as an arithmetic check on a hand-worked table — the same
additivity habit as the omnibus partition — and makes the bookkeeping visible:
the simple effects of a factor across all levels of the other factor jointly
carry exactly that factor's main-effect and interaction variability, so unequal
simple effects are where $SS_{AB}$ lives.

## Error control for simple-effect families

Testing several simple effects multiplies the opportunities for a Type I error,
so each family is tested under a correction. The convention of this page's
canonical reference defines one family per factor: the $b$ simple effects of A
(one per level of B) form one family, and the $a$ simple effects of B form
another. Bonferroni within each family tests each simple effect at

$$
\alpha_{\mathrm{PC}}=\frac{\alpha_{\mathrm{FW}}}{b}
\quad\text{(simple effects of A)},
\qquad
\alpha_{\mathrm{PC}}=\frac{\alpha_{\mathrm{FW}}}{a}
\quad\text{(simple effects of B)},
$$

so the divisor is the number of tests in the family, which equals the number of
levels of the *other* factor. In the running example $a=b=2$, so each family
has two tests and a familywise level of $\alpha_{\mathrm{FW}}=.05$ gives
$\alpha_{\mathrm{PC}}=.05/2=.025$ per test — the criterion used in the table
above, equivalently the critical value $F_{.025}(1,16)=6.115$ in place of the
unadjusted $4.494$. The Bonferroni mechanics, and the comparison with other
procedures, are covered in
[Multiple Comparisons](/topics/anova/multiple-comparisons); what factorial
follow-ups add is the family definition.

That definition is a declared choice, not a universal rule. Per-factor families
are the recommendation of the canonical reference, not the only defensible
grouping: all $a+b$ simple effects could be pooled into a single family
(dividing by $a+b$), or the error rate could be allocated differently across
families and stages. What the correction requires is that the family be defined
independently of which results look interesting and that the divisor match the
family's full size, regardless of how many tests are ultimately reported — the
same planned-versus-post-hoc discipline described in
[Multiple Comparisons](/topics/anova/multiple-comparisons).

## When the tested factor has more than two levels

With $a\ge 3$ levels of the tested factor, a simple effect is itself an omnibus
test: it carries $a-1$ numerator degrees of freedom ($2$ for a three-level
factor), and rejecting it says that at least one of the $a$ population cell
means in that level of the other factor differs from the rest — not which one.
The rejection localizes the effect to one level of the other factor, but
locating it among the compared means requires further comparisons: pairwise or
complex contrasts among the cell means within that level, each of the form

$$
SS_\psi=\frac{\hat\psi^2}{\sum_j c_j^2/n},
$$

where $\hat\psi=\sum_j c_j\bar Y_{jk}$ is the contrast among the cell means of
column $k$ and each compared mean rests on $n$ observations. Each contrast is
tested against the same pooled $MS_W$ with $1$ and $N-ab$ degrees of freedom.
The general machinery — coefficient choice and scaling, confidence intervals,
unequal-$n$ and unequal-variance forms — is in
[Linear Contrasts](/topics/anova/contrasts), and the multiplicity control for
these within-level comparisons follows the same family rules as any other set
of contrasts ([Multiple Comparisons](/topics/anova/multiple-comparisons)).
Everything above applies symmetrically to simple effects of B with $b\ge 3$
levels.

## Interpreting main effects when an interaction is present

All three omnibus tests are reported whether or not the interaction is
significant — the main-effect $F$s remain part of the summary of the design.
What changes with a significant interaction is interpretation: a main effect
averages over the other factor, and when the averaged simple effects are
unequal, the average may not describe any level of it. How much of a problem
that is depends on the pattern:

- A **disordinal** (crossing) interaction has traces that cross within the
  observed range of the other factor, so the simple effects of the traced
  factor differ in *sign*. The main effect averages oppositely signed effects
  and can describe neither level — a null main effect can accompany two strong
  simple effects in opposite directions.
- An **ordinal** (noncrossing) interaction has traces that do not cross within
  the observed range, so the simple effects share direction. The direction of
  the main effect then remains consistent with every simple effect, and the
  main effect may continue to support a directional statement — but its
  magnitude is still an average of heterogeneous simple effects.

The running example is ordinal. The jump-scare simple effects are $20$ points
under the neutral music and $40$ points under the suspenseful one — same
direction, different sizes — so the $30$-point main effect ($25$ vs $55$) is the
average of a $20$-point and a $40$-point effect and matches neither condition
exactly. Ordinal interactions therefore soften rather than remove the caution:
main-effect *direction* may be interpretable, while main-effect *magnitude*
conceals the heterogeneity that made the interaction significant.

Two qualifications keep the classification honest. First, crossing is evaluated
over the observed range of the other factor; traces that fail to cross within
that range may cross outside it. Second, whether traces cross depends on the
response measurement scale, since a monotone transformation such as a logarithm
or reciprocal can convert a noncrossing pattern into a crossing one. Ordinal
versus disordinal is thus a description of the plotted data on its scale and
range, not an invariant property of the effects. The practical rule is a matter
of degree rather than a blanket prohibition or a blanket permission: with a
significant disordinal interaction, interpretation belongs to the simple
effects; with a significant ordinal interaction, main-effect statements remain
reportable to the extent that the heterogeneity among the simple effects is
acknowledged alongside them.

## Contrasts on marginal means without an interaction

When the interaction is absent and a significant main effect has three or more
levels, the follow-up compares that factor's marginal means with the standard
contrast machinery:

$$
\hat\psi_A=\sum_{j=1}^{a} c_j\,\bar Y_{j\cdot},
\qquad
\sum_{j=1}^{a} c_j=0,
$$

and symmetrically $\hat\psi_B=\sum_{k=1}^{b} c_k\,\bar Y_{\cdot k}$. The
bookkeeping that changes from a one-way contrast is the sample size: a marginal
mean no longer rests on $n$ observations. In a balanced design each row
marginal mean averages the $bn$ observations of its $b$ cells, and each column
marginal mean averages $an$ observations, so these products enter the sums of
squares:

$$
SS_{\psi_A}=\frac{\hat\psi_A^2}{\sum_j c_j^2/(bn)},
\qquad
SS_{\psi_B}=\frac{\hat\psi_B^2}{\sum_k c_k^2/(an)}.
$$

Each contrast is tested as $F=SS_\psi/MS_W$ with $1$ and $N-ab$ degrees of
freedom — the same pooled error and denominator df as every other follow-up on
the design.

In the running example, the two-level marginal contrast for suspenseful versus
neutral music, $c=(-1,1)$, gives $\hat\psi_A=-30+50=20$ with $bn=5\cdot 2=10$
observations per marginal mean, so

$$
SS_{\psi_A}=\frac{20^2}{\left(1^2+1^2\right)/10}=\frac{400}{.2}=2000=SS_A,
\qquad
F=\frac{2000}{62.5}=32,
$$

exactly the omnibus main-effect sum of squares and $F$. With two levels, the
one possible marginal contrast *is* the main-effect test, which is why a
significant two-level main effect needs no further follow-up. For factors with
more than two levels, Tukey's procedure fits an all-pairwise family of marginal
comparisons and Bonferroni fits a small set of targeted comparisons declared in
advance; the mechanics and the choice between them are in
[Multiple Comparisons](/topics/anova/multiple-comparisons).

These marginal comparisons presuppose an absent or negligible interaction: with
a significant interaction, marginal means average heterogeneous simple effects,
and a contrast on them answers a question that may not describe any level of
the other factor — the routing above assigns that case to simple effects
instead. With unequal cell sizes, an additional question arises first, namely
whether marginal means should be sample-size-weighted or equally weighted,
and the corresponding main-effect tests come in Type I, II, and III variants;
that material is covered in
[Factorial ANOVA](/topics/anova/factorial-anova).

## Reporting

A complete report pairs the omnibus stage with the follow-up stage. The omnibus
tests are reported first — each main effect and the interaction with its $F$,
degrees of freedom, $p$-value, and an effect size, the convention of the
canonical reference being to pair each omnibus $F$ with partial $\eta^2$
(defined, with $\eta^2$, in
[Factorial ANOVA](/topics/anova/factorial-anova)). For the running example:

> A two-way between-subjects ANOVA showed significant main effects of
> music, $F(1,16)=32.00$, $p<.001$, $\eta_p^2=.67$, and jump scare,
> $F(1,16)=72.00$, $p<.001$, $\eta_p^2=.82$. The music $\times$ jump-scare
> interaction was also significant, $F(1,16)=8.00$, $p=.012$, $\eta_p^2=.33$,
> indicating that the effect of music depended on whether a jump scare was
> present.

The follow-up report states the family and the adjusted criterion before any
simple-effect result, then reports each simple effect with its cell means,
$F$, degrees of freedom, $p$-value, and an interpretation conditional on the
level of the other factor:

> Simple effects of music were tested within each jump-scare condition
> with a per-family Bonferroni adjustment of $\alpha=.05/2=.025$ per test.
> Music means differed when a jump scare was present, $F(1,16)=36.00$,
> $p<.001$ (suspenseful $70$, neutral $40$), but there was insufficient
> evidence of a difference when the jump scare was absent, $F(1,16)=4.00$,
> $p=.063$ (suspenseful $30$, neutral $20$). Simple effects of jump scare,
> tested within each music condition at the same adjusted level, showed higher fear
> with a jump scare under the neutral music, $F(1,16)=16.00$, $p=.001$
> ($40$ vs $20$), and under the suspenseful music, $F(1,16)=64.00$,
> $p<.001$ ($70$ vs $30$).

The closing interpretation follows the conditional logic of the design rather
than the marginal averages: the effect of the music depends on the
presence of a jump scare, and the jump scare increases fear within both
music conditions, more strongly under the suspenseful one.

## Related pages

- [Factorial ANOVA](/topics/anova/factorial-anova): the two-way design, the
  omnibus models and $F$ tests, $\eta^2$ and partial $\eta^2$, and unequal cell
  sizes including the Type I/II/III variants.
- [Linear Contrasts](/topics/anova/contrasts): the general contrast machinery —
  coefficients, $SS_\psi$, intervals, and unequal-$n$ forms — specialized here
  for cell means and marginal means.
- [Multiple Comparisons](/topics/anova/multiple-comparisons): the Bonferroni and
  Tukey procedures, family definition and planned-versus-post-hoc discipline,
  and the role of omnibus gating.
- [Crosswalk of ANOVA Quantities](/topics/anova/crosswalk): the naming and
  degrees-of-freedom bookkeeping shared by every test on this page.
