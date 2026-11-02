---
description: An exact binomial test for paired data that uses only the direction of change, with exact tail probabilities and conservative discrete critical regions
---

# Sign Test

The sign test is an exact hypothesis test for **paired data** that discards
the magnitude of each pair's change and retains only its **direction**. It is
the simplest member of the location-test family and a clean setting for exact
inference, because under the null hypothesis the test statistic follows a
binomial distribution with success probability one-half.

## From differences to signs

For each pair $(Y_{i1}, Y_{i2})$, compute the difference and record its sign:

$$D_i = Y_{i2} - Y_{i1}, \qquad
S_i = \begin{cases} +1 & D_i > 0 \\ -1 & D_i < 0 \end{cases}$$

The test statistic $X$ is the count of one chosen sign — say the number of
positive differences. If the null hypothesis of no systematic change is true,
positive and negative differences are equally likely, so

$$X \sim \mathrm{Binomial}(N, \tfrac{1}{2}),$$

where $N$ is the number of pairs with a nonzero difference. Every probability
in the test is an exact binomial tail probability; no normal approximation is
involved.

## The binomial model

For $X \sim \mathrm{Binomial}(N, \pi)$, the probability mass function is

$$P(X = k) = \binom{N}{k} \pi^k (1-\pi)^{N-k}, \qquad k = 0, 1, \dots, N,$$

with mean $N\pi$ and variance $N\pi(1-\pi)$; under the sign-test null these
reduce to $N/2$ and $N/4$. Tail probabilities are obtained by summing the
masses of the relevant counts — directly, from a binomial table, or with
standard software.

## Assumptions

In standard usage the test requires:

- **Paired, independent observations.** Each pair contributes one sign, and
  the pairs are independent of one another; the signs then behave like
  independent binary trials.
- **Meaningful direction.** The measurements must be at least ordinal, so that
  "larger" and "smaller" are defined within each pair. No distributional shape
  assumption about the differences is needed — the raw data may be skewed,
  heavy-tailed, or otherwise nonnormal, since only their signs enter.
- **Ties are excluded.** Pairs with $D_i = 0$ carry no directional information
  and are dropped, reducing $N$ accordingly.

Because only signs are used, the test does not assume symmetry of the outcome
distribution; the binomial null at $\pi = \tfrac{1}{2}$ concerns the signs, not
the raw measurements.

## Procedure

The test follows the shared four-step framework of
[Hypothesis Testing](/topics/foundations/hypothesis-testing):

1. **Hypotheses.** With $\pi = P(D_i > 0)$, the null is $H_0: \pi = \tfrac{1}{2}$
   ("no systematic change"). A directed alternative is $H_1: \pi > \tfrac{1}{2}$
   (or $<$); a nondirected alternative is $H_1: \pi \neq \tfrac{1}{2}$. The
   direction, if any, must be chosen before inspecting the data.
2. **Criteria.** Fix $\alpha$ in advance. Because the binomial is discrete,
   available cutoffs may not achieve exactly $\alpha$; choose the first cutoff
   whose tail probability does not exceed it. The actual level is then at or
   below the nominal $\alpha$, often strictly below it.
3. **Statistic and p-value.** Count the signs and evaluate the corresponding
   binomial tail under $\pi = \tfrac{1}{2}$.
4. **Decision and interpretation.** Reject $H_0$ when $p \leq \alpha$;
   otherwise fail to reject — which does not establish that there is no effect.

## One-sided and two-sided tests

- **One-sided:** $p = P(X \geq x_{\text{obs}})$ for an upper-tailed
  alternative, using the $\mathrm{Binomial}(N, \tfrac{1}{2})$ distribution.
- **Two-sided:** the $\mathrm{Binomial}(N, \tfrac{1}{2})$ distribution is
  symmetric about $N/2$. A common exact two-sided p-value is twice the smaller
  one-sided probability, capped at $1$ for central observations. Rejection
  regions are likewise placed in both tails with probability at most
  $\alpha/2$ each. Doubling is valid here by symmetry of the null distribution
  of $X$ — not by any symmetry of the original measurements. (For a general
  success probability $\pi \neq \tfrac{1}{2}$ the distribution is asymmetric
  and doubling is only a convention; the general caveats in
  [P-Values](/topics/foundations/p-values) apply.)

## Worked example: a pre–post intervention

Ten students complete a short intervention, and anxiety scores are measured
before and after. Eight students improve and two worsen. Coding a "success"
as an improvement gives $x_{\text{obs}} = 8$, so the relevant one-sided tail
for evidence of improvement is the upper tail.

Under $H_0: \pi = \tfrac{1}{2}$, $X \sim \mathrm{Binomial}(10, \tfrac{1}{2})$.
The point probability of the observed count is

$$P(X = 8) = \binom{10}{8}\Big(\tfrac{1}{2}\Big)^{10} = \frac{45}{1024} \approx .0439,$$

but the evidence lies in the tail:

$$p_{\text{one-sided}} = P(X \geq 8) = \frac{45 + 10 + 1}{1024} = \frac{56}{1024} \approx .0547,
\qquad p_{\text{two-sided}} = 2 \times .0547 = .1094.$$

At $\alpha = .05$ the two-sided critical region is $X \leq 1$ or $X \geq 9$,
since $P(X \geq 9) = 11/1024 \approx .0108 \leq .025$ while
$P(X \geq 8) \approx .0547$ is too large; the actual level is
$22/1024 \approx .0215 < .05$, illustrating the conservative discreteness of
the test. With $x_{\text{obs}} = 8$ outside the region and $p = .1094 > .05$,
the null is not rejected: the data do not provide sufficient evidence of an
intervention effect on anxiety. This is not evidence that the intervention
does nothing — with ten pairs, the test has limited sensitivity; see
[Statistical Power](/topics/foundations/statistical-power).

## Strengths and limitations

The sign test asks very little of the data: no normality, no scale beyond
ordinality, exact probabilities at any sample size. The price is power. By
discarding magnitudes it ignores much of the information in the differences, so
for measurements on an interval scale a paired $t$ test on the differences
(see [t Tests](/topics/foundations/t-tests)) is typically more sensitive when
its assumptions hold, and the sign test is most useful with small samples,
skewed differences, or data that support only ordinal conclusions.

## Connections

- [Hypothesis Testing](/topics/foundations/hypothesis-testing): the four-step
  procedure, critical regions, and decision language the test instantiates.
- [P-Values](/topics/foundations/p-values): tail versus point probabilities and
  the symmetry rule used for the two-sided calculation.
- [Probability](/topics/foundations/probability): the binomial count as a sum
  of independent Bernoulli trials.
- [t Tests](/topics/foundations/t-tests): the magnitude-using counterparts for
  paired and independent comparisons of means.
