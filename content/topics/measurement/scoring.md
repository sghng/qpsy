---
description: How responses become scores — dichotomous and partial-credit rules, eight multiple-mark scoring algorithms, Likert reverse coding, Q-sort scoring levels, and the algebraic constraints of ipsative forced-choice scoring
---

# Item and Scale Scoring

Scoring is the rule that maps raw responses to numbers. It is a design
decision made before data collection, not an afterthought applied afterwards:
the scoring rule interacts with the [item
format](/topics/measurement/item-development), determines which behavior is
rewarded, and changes the distributional properties of the resulting scores.
A useful separation is between *optimal-performance* items, scored against a
key (selected-response and constructed-response formats), and
*typical-performance* items, scored from self-descriptions (Likert, forced
choice, and sorting formats).

## Selected-response items with a single keyed option

For an item with one keyed option among $k$ alternatives, the simplest rule is
dichotomous scoring: $S = 1$ for the keyed response and $S = 0$ otherwise.
Dichotomous scoring rewards partial knowledge poorly, because a respondent who
narrows the choice to two options receives nothing. Formula scoring subtracts a
penalty from wrong marks so that random responding has expected score zero.
With $R$ right answers, $W$ wrong answers, and $k$ options per item,

$$
S = R - \frac{W}{k-1} .
$$

Under uniform random marking of all $n$ items, $E(R) = n/k$ and
$E(W) = n(k-1)/k$, so $E(S) = n/k - n/k = 0$: the correction removes the
expected gain from blind guessing at the cost of penalizing educated guessing.
Partial-credit rules occupy the middle ground, awarding points for partially
correct work; constructed responses may be scored by trained human raters or
by automated scoring systems, which shifts the scoring problem to rater
agreement and [rater consistency](/topics/measurement/rater-agreement).

## Multiple-mark items

Multiple-mark items (also called multiple-answer or pick-N items) present
$k$ options of which $c$ are keyed as correct, and instruct the respondent to
mark every option judged correct. Because a response can be partially right,
the scoring rule is a genuine choice. The notation below describes one
response:

- $k$: number of options in the item; $c$: number of keyed options;
  $d = k - c$: number of distractors.
- $m_c$: keyed options marked; $m_d$: distractors marked;
  $m = m_c + m_d$: options marked in total.
- Treating each option as a judged-true-or-false statement, $a = m_c + (d - m_d)$
  options are judged correctly and $e = m_d + (c - m_c)$ incorrectly, with
  $a + e = k$.

Eight algorithm families are in common use (systematized by Domnich et al.,
2015, which is also the source of the attributions below):

1. **All-or-nothing.** $S = 1$ if $e = 0$ — every keyed option marked and no
   distractor marked — and $S = 0$ otherwise. The dichotomous rule: no credit
   for partial knowledge, but almost no chance reward for blind guessing.
2. **Correct-minus-incorrect.** $S = (a - e)/k$. Judges every option and
   penalizes errors; widely regarded as severe, since the penalty applies
   regardless of how many distractors or keyed options were missed.
3. **Proportion correct.** $S = a/k$. No penalty; treats the item as a bank of
   true-false statements and yields the most lenient scores.
4. **Proportion correct minus marked-distractor proportion.**
   $S = m_c/c - m_d/d$. Scales marks by the number of keyed options and
   distractors available, subtracting the distractor proportion from the
   keyed-option proportion.
5. **Chance-penalty rule.** $S = a/k - \binom{k}{e}/2^{k}$, where the
   subtracted term is the probability of exactly $e$ misjudgments if each
   option were judged by flipping a fair coin. Rules 2, 3, and 5 all score the
   item as a set of independent true-false judgments.
6. **Balanced rule** (Tarasowa and Auer). Credit $m_c/c$ for marked keyed
   options, with a penalty applied only when the respondent over-marks:

   $$
   S =
   \begin{cases}
   0, & m_c = 0,\\[4pt]
   \dfrac{m_c}{c}, & m_c > 0 \text{ and } m \le c,\\[8pt]
   \dfrac{m_c}{c} - \dfrac{(m - c)/k}{1 - c/k}, & m_c > 0 \text{ and } m > c.
   \end{cases}
   $$

7. **Ripkey rule.** $S = m_c/c$ if the number of options marked does not
   exceed the number of keyed options ($m \le c$), and $S = 0$ otherwise: a
   proportion-of-possible-points score, denied entirely to respondents who
   mark more options than the key contains.
8. **Half-credit rule (PS50, Bauer et al.).** $S = 1$ if all keyed options are
   marked and no distractor is marked; $S = 0.5$ if at least half but not all
   of the keyed options are marked ($c/2 \le m_c < c$); $S = 0$ otherwise.

The rules differ in difficulty (all-or-nothing is harshest, proportion-correct
most lenient), in sensitivity to guessing, and in whether they treat the item
as one decision or as $k$ true-false decisions. The choice is empirically
consequential: in one in-field study scoring a health-knowledge survey eight
ways, the partial rules showed better internal consistency and relative
efficiency than the dichotomous rule, the Ripkey and balanced rules performed
best overall, and a penalizing rule changed which subgroup differences were
detected and the size of pre/post intervention effects (Domnich et al., 2015).
Those rankings are findings for one survey, not a universal ordering; the
scoring rule should be chosen for the construct, the population, and the
intended comparison during instrument design, alongside the
[reliability](/topics/measurement/reliability) consequences of the choice.

## Reverse coding

Typical-performance scales routinely mix positively and negatively keyed
items to control acquiescence. Before responses are summed, reverse-keyed
items must be recoded so that all items point in the same substantive
direction. On a scale with $K$ ordered response categories scored $1, \dots, K$,
the recoding for a reverse-keyed item is an interchange of the category
scores,

$$
S' = K + 1 - S,
$$

so on a five-point scale the raw responses $1, 2, 3, 4, 5$ become
$5, 4, 3, 2, 1$. A scoring pipeline that fails to reverse one item attenuates
the subscale total and can flip the sign of the item's correlation with the
rest of the scale; the same reverse-keyed consistency is also a
[careless-responding diagnostic](/topics/measurement/response-bias). Reverse
coding applies wherever directionality matters, including inside Q-sort
subscale scores below.

## Q-sort scoring

A Q-sort asks a respondent to distribute a set of $n$ statements into ordered
piles, typically forcing a roughly symmetric distribution. Three scoring
levels are available, and they answer different questions:

- **Item level.** Each statement is scored separately across respondents:
  inter-item correlations among statements, or correlations between a single
  statement and an external variable as [predictive-validity
  evidence](/topics/measurement/validity).
- **Subscale level.** Sets of theoretically related statements (commonly 5–10)
  are combined rationally; each respondent's subscale score is the sum of the
  pile values assigned to those statements, with inverse indicators reverse
  coded first.
- **Criterion sort.** Experts use the same statement set to describe a
  hypothetical prototypical person (for example, a maximally secure person).
  With several experts their sorts are averaged item by item, producing a
  criterion sort of $n$ statement means. A respondent's score on the construct
  is the similarity between the respondent's own sort and the criterion sort,
  usually a Pearson correlation, sometimes computed after Fisher's
  $z$ transformation to improve the comparability of correlations (see
  [correlation inference](/topics/measurement/correlation)).

The levels are complementary: item-level analysis describes statements,
subscale scores describe respondents on predefined dimensions, and criterion
similarity scores describe respondents against an expert prototype.

## Ipsative forced-choice scoring

In a forced-choice format the respondent must allocate a fixed total across
statements within each block, usually by choosing between statements keyed to
different scales. Consider $J$ blocks, each pairing an item from scale $X$
with an item from scale $Y$, with each block worth one point. Writing $X_j$
and $Y_j$ for the points block $j$ contributes to the two scales,

$$
X_j + Y_j = 1 \qquad \text{for every block } j
$$

and summing over blocks,

$$
X_1 + \cdots + X_J + Y_1 + \cdots + Y_J = J .
$$

The total is the same constant $J$ for every respondent. Scores of this kind
are called *ipsative*: they carry information about the relative standing of
the scales *within* a person, and none about overall level *across* persons.
The constraint propagates into every covariance computed from the scores.

**External covariances are forced to cancel.** Let $W$ be any external
variable. Since $X = J - Y$ and $J$ is a constant (so its covariance with
anything is zero),

$$
\operatorname{Cov}(X, W)
= \operatorname{Cov}(J - Y, W)
= -\operatorname{Cov}(Y, W),
$$

hence $\operatorname{Cov}(X, W) + \operatorname{Cov}(Y, W) = 0$. If one scale
correlates positively with an external criterion, the other necessarily
correlates negatively with it, whatever the substantive relationships: a
criterion-related validity study on ipsative scores can produce sign-forced,
counterintuitive conclusions.

**Within-set covariances are forced negative.** With three scales $X$, $Y$,
and $Z$ in each block, the same argument applied to $X = J - Y - Z$ gives

$$
\operatorname{Var}(X) + \operatorname{Cov}(X, Y) + \operatorname{Cov}(X, Z) = 0 .
$$

Because $\operatorname{Var}(X) > 0$, at least one of the covariances with the
other scales must be negative.

**The covariance matrix is singular.** The two-scale and three-scale
identities generalize: every row and every column of the variance-covariance
matrix of ipsative subscale scores sums to zero. The matrix has the constant
vector in its null space, is of deficient rank, and must contain both
positive and negative entries by construction. Running a standard [factor
analysis](/topics/measurement/factor-analysis) on such a matrix is
problematic for exactly these structural reasons, and the ipsative constraint
also complicates evaluating the [reliability](/topics/measurement/reliability)
and [validity](/topics/measurement/validity) of the subscales, since the usual
error model does not apply to scores whose totals are fixed by the format.

These consequences are design facts, not empirical findings: they follow from
the fixed block total alone. Forced-choice formats do reduce some
[normative comparison pressures](/topics/measurement/response-bias), but the
resulting scores should be interpreted as relative preferences within the
block set, and not as normative standings on the constituent scales.

## References

- Domnich, A., Panatto, D., Arata, L., Bevilacqua, I., Apprato, L., Gasparini,
  R., & Amicizia, D. (2015). Impact of different scoring algorithms applied to
  multiple-mark survey items on outcome assessment: An in-field study on
  health-related knowledge. *Journal of Preventive Medicine and Hygiene*,
  56(4), E162–E171.
  [PMC4753817](https://pmc.ncbi.nlm.nih.gov/articles/PMC4753817/)
