---
description: The conditional tail-probability definition of the p-value, point versus tail probabilities, common misinterpretations, and transparent reporting under analytic flexibility
---

# P-Values

A p-value distills a hypothesis test into a single number: how surprising the
data are, measured as a probability under the null hypothesis.

## Definition

Let $T$ be a test statistic whose null distribution is known when $H_0$ holds,
and let $t_{\text{obs}}$ be its observed value. The p-value is

$$
p = P\big(T \text{ at least as extreme as } t_{\text{obs}} \;\big|\; H_0\big).
$$

In words: the probability of obtaining a result as extreme as, or more extreme
than, the one observed **if the null hypothesis is true**. Three features of
the definition carry the whole interpretation:

- It is a **conditional probability about data**, with the null fixed — not a
  probability about the null hypothesis itself. Because conditioning is not
  symmetric, $P(\text{data} \mid H_0)$ need not resemble $P(H_0 \mid \text{data})$;
  see [Probability](/topics/foundations/probability).
- "As or more extreme" makes it a **tail probability**. Every outcome at least
  as far from the null expectation as the observed one contributes.
- It assumes the full null model — parameter values, distributional form,
  sampling design — not just the point statement $H_0$.

## Point probabilities are not p-values

The probability of observing *exactly* the obtained result is not the p-value.
For a **continuous** test statistic (such as $z$ or $t$), the probability of
any exact value is zero, so only tail regions are meaningful. For a **discrete**
statistic (such as a count), exact values have positive probability, but the
evidential question remains "how often would a result show *at least* this
much evidence against $H_0$," not "how likely is this exact count." The
[Sign Test](/topics/foundations/sign-test) works through both aspects.

## One-sided and two-sided p-values

Which outcomes count as "extreme" depends on the alternative chosen in advance
(see [Hypothesis Testing](/topics/foundations/hypothesis-testing)):

- With a directed alternative, one tail defines extremeness.
- With a nondirected alternative, both tails count. When the null distribution
  is symmetric about its center, a common two-sided p-value is twice the
  smaller one-sided probability, capped at $1$ for discrete statistics. When
  the distribution is not symmetric, the two-sided p-value can instead be the
  sum of the probabilities of all outcomes at least as extreme as the observed
  one under a suitable distance measure. Doubling the smaller tail remains a
  common convention, but it need not match that probability-ordering sum.

Doubling is justified by symmetry of the *sampling distribution under the
null*, never by any symmetry of the raw measurements.

## p versus $\alpha$

The significance level $\alpha$ is a decision cutoff fixed **before** data
collection; the p-value is a property of the **observed** data computed after.
The rule $p \leq \alpha \Rightarrow \text{reject } H_0$ compares the two. A p
just above $\alpha$ and one just below are evidentially almost identical, so
reporting the exact p-value (e.g. $p = .054$, not $p > .05$) preserves
information that a reject/fail-to-reject label destroys.

## Common misinterpretations

The following readings are all incorrect, however natural they feel:

1. **"The probability that $H_0$ is true."** The p-value conditions *on* $H_0$;
   it never assigns probability to $H_0$. Assigning $H_0$ a probability
   requires prior probabilities and a fully specified alternative — the
   machinery of Bayesian inference, which the p-value is not.
2. **"The probability that the data are due to chance alone."** This appears to
   restate the definition but changes the conditioning event, collapsing
   $P(\text{data} \mid H_0)$ into $P(H_0 \mid \text{data})$; see item 1.
3. **"The probability of replicating the result."** Replicability depends on
   the true effect size, sampling variability, and the power of the
   replication, none of which a p-value measures. Under some conditions
   significant results replicate at rates well above chance and well below
   $1 - \alpha$; that is an empirical regularity, not a definition.
4. **"A significant result is important or meaningful."** With a large enough
   sample, a trivial effect yields a small p-value. Statistical significance
   addresses compatibility with the null; practical importance is the domain
   of [Effect Sizes](/topics/foundations/effect-sizes) and confidence
   intervals.

Statements 1 and 2 fail on the same formal ground: the reversal of a
conditional probability.

## Analytic flexibility and exploratory results

The definition above presumes an analysis procedure whose null distribution
accounts for every analytic choice. Undisclosed or data-dependent choices that
are not accounted for change the meaning of a p-value:

- **Undisclosed flexibility inflates false positives.** When researchers can
  stop data collection at will, choose among dependent variables, add
  covariates, or select subsamples after peeking at results, the probability of
  obtaining $p < .05$ under a true null rises far above the nominal $.05$ —
  simulations show it can exceed $50\%$ (Simmons, Nelson, & Simonsohn, 2011).
  A p-value is only as interpretable as the analysis plan that produced it.
- **Exploratory analysis is legitimate but must be labeled.** Searching data
  for patterns and generating hypotheses is valuable science; presenting
  results found by exploration *as if* they had been predicted in advance
  (retrofitted hypotheses) destroys the calibration of the test. Honest
  reporting distinguishes confirmatory tests, which follow a pre-specified
  plan, from exploratory findings, which are candidates for confirmation in new
  data (Fife & Rodgers, 2022).
- **Transparent reporting protects the reader.** Report exact p-values, all
  measured outcomes and analyses (not only significant ones), any deviations
  from the plan, and evidence about magnitude alongside the test —
  [Effect Sizes](/topics/foundations/effect-sizes),
  [Confidence Intervals](/topics/foundations/confidence-intervals), and the
  design's sensitivity via [Statistical Power](/topics/foundations/statistical-power).

## References

Simmons, J. P., Nelson, L. D., & Simonsohn, U. (2011). False-positive
psychology: Undisclosed flexibility in data collection and analysis allows
presenting anything as significant. *Psychological Science*, 22(11),
1359-1366. [doi:10.1177/0956797611417632](https://doi.org/10.1177/0956797611417632)

Fife, D. A., & Rodgers, J. L. (2022). Understanding the exploratory/confirmatory
data analysis continuum: Moving beyond the "replication crisis". *American
Psychologist*, 77(3), 453-466.
[doi:10.1037/amp0000886](https://doi.org/10.1037/amp0000886)
