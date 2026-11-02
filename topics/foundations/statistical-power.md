---
desc: Statistical power under a specified alternative, its determinants, and its role in study planning
---

# Statistical Power

Power is the probability that a test rejects the null hypothesis when the
null is false. More precisely, because a false null can be false in many
ways, power is defined **relative to a specified alternative**:

$$\text{Power} = 1 - \beta = P(\text{reject } H_0 \mid H_1 \text{ with a specific effect}).$$

Here $\beta$ is the probability of a Type II error — failing to detect an
effect that exists. The conditional definitions of $\alpha$ and $\beta$ and
the decision-versus-truth framework live in
[Hypothesis Testing](/topics/foundations/hypothesis-testing); power is the
complement of $\beta$.

## Specifying the alternative

"There is an effect" is not enough to compute power: the rejection probability
depends on *which* true state of the world is assumed. A specific effect size
— a particular true mean, or a standardized $d$ — picks out one alternative
distribution, and power is an area under that distribution. Effect sizes
therefore do double duty: they summarize magnitude
([Effect Sizes](/topics/foundations/effect-sizes)) and parameterize
alternatives for power analysis. Because different assumed effects yield
different powers, **there is no single power for a study**; a power statement
is always "power to detect an effect of size $\delta$ under stated design
conditions."

## Computing power: the two-step method

For a location test with a known or assumed standard error, power reduces to
moving between two sampling distributions — the null distribution centered at
$\mu_0$ and the alternative centered at the assumed true value $\mu_{\text{real}}$:

1. **Find the rejection region under the null.** From $\alpha$ and the tail
   direction, obtain the critical value $z_{\text{crit}}$, convert it to the
   scale of the sample mean,

$$\bar{X}_{\text{crit}} = \mu_0 + z_{\text{crit}} \, \sigma_{\bar{X}},$$

and reject when $\bar{X}$ falls in the designated tail beyond that boundary.

2. **Evaluate that region under the alternative.** Re-standardize the same
   boundary using the alternative mean,

$$z = \frac{\bar{X}_{\text{crit}} - \mu_{\text{real}}}{\sigma_{\bar{X}}},$$

and take the corresponding tail area under the alternative distribution. That
area is the power; its complement is $\beta$.

The intermediate conversion is the subtle step: a $z$ score is relative to a
specific distribution's mean and spread, so the critical value must be
translated into raw units under the null and then re-standardized under the
alternative.

**Worked example.** Suppose $\mu_0 = 75$, $\sigma = 16$, $n = 100$, so
$\sigma_{\bar{X}} = 16/\sqrt{100} = 1.6$. For a lower-tailed test with
$\alpha = .05$, $z_{\text{crit}} = -1.645$ and
$\bar{X}_{\text{crit}} = 75 - 1.645 \times 1.6 = 72.37$. If the true mean is
$\mu_{\text{real}} = 72$, then
$z = (72.37 - 72)/1.6 \approx 0.23$, giving

$$\text{power} = P(Z \leq 0.23) \approx 0.59.$$

A true 3-point shortfall would be detected only about 59% of the time with
this design; $\beta \approx 0.41$. Small assumed effects give dramatically
lower power: with $n = 25$, detecting a half-point shift ($\sigma = 10$,
two-tailed, $\alpha = .05$) yields power near $0.06$ — barely above the Type I
error rate.

## What determines power

Each determinant acts by changing the overlap between the null and
alternative sampling distributions:

| Factor | Effect on power | Mechanism |
|---|---|---|
| Effect magnitude | increases as the effect grows | greater separation of the two distributions |
| Sample size $n$ | increases with $n$ | smaller standard error, less overlap |
| Variability $\sigma$ | increases as $\sigma$ shrinks | smaller standard error, less overlap |
| Significance level $\alpha$ | increases as $\alpha$ grows | a more lenient rejection region |
| Tails | one-tailed exceeds two-tailed | all of $\alpha$ concentrates in the hypothesized tail |

The one-tailed advantage is **conditional**: it holds only when the true
effect is in the hypothesized direction; a true effect in the opposite
direction is then *harder* to detect than with a two-tailed test. A larger
$\alpha$ mechanically raises power, but inflating $\alpha$ merely to obtain
power is not acceptable practice — it purchases sensitivity at the cost of
the Type I error rate the researcher set out to control.

Design choices also matter. For **paired** measurements, power rises with the
correlation between members of a pair: positively correlated pairs have
smaller $s_D$ and hence a smaller standard error, so the same raw effect is
easier to detect. For **independent-samples** tests, the Welch variant guards
against variance heterogeneity that can depress or distort the pooled test's
actual power; when variances are equal the two have nearly identical power
([t Tests](/topics/foundations/t-tests)).

## Power in study planning

Because power grows with $n$ and depends on the design, the standard use of
power analysis is **prospective**: before data collection, fix $\alpha$, the
tails, the design, and the smallest effect worth detecting, then solve for the
sample size that achieves acceptable power (conventionally at least about
$0.80$), or report the power attainable at feasible sample sizes. Retrospective
"observed power" computed from the obtained effect is generally
uninformative. Power analysis is also the practical way to demonstrate control
of Type II error rates, since $\beta$ — unlike $\alpha$ — cannot be fixed by
convention and depends on all of the factors above.
