---
description: Null and alternative hypotheses, significance level and critical regions, a reusable four-step testing procedure, and Type I/II error rates
---

# Hypothesis Testing

Hypothesis testing is a framework for evaluating how compatible an observed
result is with a specified null hypothesis. It formalizes a question that
arises constantly in quantitative research: is a pattern in the data more
plausible as a genuine signal or as ordinary sampling noise?

## Hypotheses

A test compares two competing statements about a population parameter, such as
a proportion $\pi$ or a mean $\mu$.

- The **null hypothesis** $H_0$ specifies a default state of affairs — typically
  "no effect" or "no difference" — that fixes the parameter at a value used for
  all subsequent probability calculations, e.g. $H_0: \pi = .5$.
- The **alternative hypothesis** $H_1$ contradicts the null and is what a
  significant result is taken as evidence for, e.g. $H_1: \pi \neq .5$.

The hypotheses are stated before data collection, in terms of population
parameters rather than sample statistics.

### Directional and nondirectional alternatives

- A **nondirected** (two-tailed) alternative such as $H_1: \pi \neq .5$ does not
  specify a direction; extreme results in either tail count against the null.
- A **directed** (one-tailed) alternative such as $H_1: \pi > .5$ names a
  direction in advance and concentrates the whole rejection region in one tail.

The choice between them must be made *a priori*, on substantive grounds.
Choosing a one-tailed test after observing the direction of the result inflates
the Type I error rate: whichever direction the data show then receives a
full-$\alpha$ one-tailed test, giving two $\alpha$-sized chances to reject. See [P-Values](/topics/foundations/p-values) for how
each choice defines a different tail probability.

## Significance level and critical regions

The **significance level** $\alpha$ is a cutoff for compatibility chosen before
data collection; conventional values are $.05$, $.01$, and $.001$. It defines
the **critical region** (rejection region): a set of extreme outcomes whose
total probability under the null is at most $\alpha$, together with the
**critical value** that marks where the region begins. Formally, with test statistic $X$ and critical
value $x_{\text{crit}}$, the region is chosen so that

$$P(X \geq x_{\text{crit}} \mid H_0) \leq \alpha$$

in a one-tailed test. Two equivalent decision routes follow: compute the
p-value and reject when $p \leq \alpha$ (the **p-value approach**), or reject
when the observed statistic falls in the critical region (the **critical-value
approach**). They always agree.

For **discrete** test statistics, no cutoff may achieve exactly $\alpha$, so
the first cutoff whose tail probability does not exceed $\alpha$ is used. The
actual level is then at or below the nominal $\alpha$, often strictly below
it. The [Sign Test](/topics/foundations/sign-test) shows the construction
in full; continuous statistics such as $z$ and $t$ admit cutoffs at exactly
$\alpha$.

## A four-step procedure

The same sequence of steps underlies every test in this collection, from exact
binomial tests to $t$ tests:

1. **State the hypotheses.** Define $H_0$ and $H_1$ in terms of a population
   parameter, and decide whether the test is one- or two-tailed.
2. **Set the criteria for a decision.** Choose $\alpha$ before seeing the data;
   if using the critical-value route, determine the critical region implied by
   $\alpha$ under $H_0$.
3. **Compute the test statistic and p-value.** Reduce the data to a statistic
   whose null distribution is known, and evaluate how extreme the observed
   value is under that distribution.
4. **Make a decision and interpret it.** Reject $H_0$ when $p \leq \alpha$ (or
   when the statistic falls in the critical region); otherwise fail to reject.

## Decision language

The vocabulary of step 4 is load-bearing:

- A nonsignificant result is "**fail to reject** $H_0$", never "accept $H_0$".
  The test evaluates evidence against the null, not evidence for it.
- Failing to reject does **not** establish that the null is true. A test with
  small sample size may fail to detect effects that exist; see
  [Statistical Power](/topics/foundations/statistical-power).
- Rejecting $H_0$ does not prove $H_1$ in any logical sense; it flags the data
  as improbable under the null model.

## Decisions versus reality: Type I and Type II errors

Every test outcome can be classified against the unobservable state of nature.
Writing $\alpha$ for the Type I error rate and $\beta$ for the Type II error
rate:

|                     | $H_0$ true                    | $H_0$ false                          |
| ------------------- | ----------------------------- | ------------------------------------ |
| Fail to reject $H_0$| Correct decision ($1 - \alpha$)| Type II error ($\beta$)             |
| Reject $H_0$        | Type I error ($\alpha$)       | Correct decision (power $= 1-\beta$) |

Each entry is a conditional probability of a decision given reality:

$$\alpha = P(\text{reject } H_0 \mid H_0 \text{ true}), \qquad \beta = P(\text{fail to reject } H_0 \mid H_0 \text{ false}).$$

Two consequences matter in practice:

- $H_0$ can be false in many ways — any parameter value other than the null
  qualifies. The probabilities in the "$H_0$ false" column therefore depend on
  *which* alternative is actually true; $\beta$ and power are not single
  numbers until an alternative is specified. Computing them is the business of
  [Statistical Power](/topics/foundations/statistical-power).
- Whether a *particular* study's decision was an error can never be known from
  that study alone, because the state of nature is unknown. Error rates are
  long-run properties of the procedure, not diagnosable properties of one
  outcome.

## Error trade-offs

At a fixed sample size, $\alpha$ and $\beta$ trade against each other:
shrinking $\alpha$ (demanding stronger evidence before rejection) enlarges
$\beta$ (missing real effects), and vice versa. Reducing both simultaneously
requires more or better data — a larger sample, a stronger design, or a less
variable measurement. Power analysis, covered under
[Statistical Power](/topics/foundations/statistical-power), is the prospective
tool for choosing sample size so that $\beta$ is acceptably small for an effect
worth detecting.

## Illustration

A coin is tossed $n = 10$ times and lands heads $8$ times. Is this evidence of
bias towards heads? Under $H_0: \pi = .5$ the number of heads is
$X \sim \mathrm{Binomial}(10, .5)$, and the observed tail probability is

$$p = P(X \geq 8 \mid \pi = .5) = \frac{45 + 10 + 1}{1024} = \frac{56}{1024} \approx .0547.$$

With $\alpha = .05$ set in advance, $p > \alpha$, so $H_0$ is not rejected:
these data do not constitute sufficient evidence of bias towards heads. Because
the binomial is discrete, the critical region begins at $x_{\text{crit}} = 9$,
where $P(X \geq 9) \approx .0108 \leq .05$; the test's actual level is about
$.011$, well below the nominal $.05$. The conclusion does not show the coin is
fair — only that ten tosses with eight heads are not, by this criterion,
unusual enough to convict it. The paired-data counterpart of this computation
is the [Sign Test](/topics/foundations/sign-test).

## Connections

- [P-Values](/topics/foundations/p-values) develops the tail-probability
  definition, its misreadings, and the reporting standards that keep the
  procedure honest.
- [Probability](/topics/foundations/probability), especially the asymmetry of
  conditional probability $P(A \mid B) \neq P(B \mid A)$, underlies the correct
  reading of $\alpha$ and of p-values.
- [Sampling Distributions](/topics/foundations/sampling-distributions) supplies
  the null distributions for statistics such as $z$ and $t$.
- The four-step procedure is instantiated for paired binary data in the
  [Sign Test](/topics/foundations/sign-test) and for means in
  [t Tests](/topics/foundations/t-tests).
