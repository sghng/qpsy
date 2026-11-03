---
description: How statistics vary across repeated samples, the standard error of the mean, and the central limit theorem
---

# Sampling Distributions

A sampling distribution is the distribution of a statistic over all possible
random samples of a fixed size drawn from a population. It is the bridge
between probability and inference: hypothesis tests and confidence intervals
obtain their probabilities from sampling distributions, not from raw data.

## Three distinct distributions

Three distributions are easily conflated and serve different purposes:

1. **Population distribution**: the distribution of the variable itself, with
   population mean $\mu$ and population standard deviation $\sigma$. It is
   usually unobserved.
2. **One-sample distribution**: the distribution of the $n$ observed values in
   a single sample, summarized by the sample mean $\bar{X}$ and sample
   standard deviation $s$. One sample yields one value of the statistic.
3. **Sampling distribution of the statistic**: the distribution of the
   statistic's values across all possible samples of size $n$. Its spread
   describes *sampling variability* — how much the statistic would fluctuate
   from sample to sample.

Every statistic has a sampling distribution, not just the mean. The sampling
distribution of the mean is the workhorse of inference for location.

## Mean and standard error of the sample mean

For random samples of size $n$ from a population with mean $\mu$ and variance
$\sigma^2$:

$$
E(\bar{X}) = \mu, \qquad \mathrm{Var}(\bar{X}) = \frac{\sigma^2}{n}, \qquad \sigma_{\bar{X}} = \frac{\sigma}{\sqrt{n}}
$$

where $E(\bar{X})$ is the mean of the sampling distribution of $\bar{X}$ and
$\sigma_{\bar{X}}$ is its standard deviation. Two facts deserve emphasis:

- Because $E(\bar{X}) = \mu$ exactly, $\bar{X}$ is an **unbiased estimator**
  of $\mu$: the sample means across repeated sampling center on the
  population mean, whatever the population's shape.
- The standard deviation of the sampling distribution of the mean has a
  special name: the **standard error of the mean** (SEM),

$$
\sigma_{\bar{X}} = \frac{\sigma}{\sqrt n}.
$$

It shrinks with the square root of the sample size: quadrupling $n$ halves the
standard error. This is why the sampling distribution of the mean is visibly
thinner than the population distribution — sample means cluster more tightly
around $\mu$ than individual scores do.

## Standard deviation versus standard error

The two quantities answer different questions:

- The **standard deviation** $\sigma$ (or its estimate $s$) describes the
  spread of *individual scores* around the mean.
- The **standard error** $\sigma/\sqrt n$ describes the spread of *sample
  means* around $\mu$ — the typical distance between a sample mean and the
  population mean.

Confusing them is consequential: dividing by $\sqrt n$ when describing
individual variability understates spread, and omitting it when describing the
precision of a mean overstates uncertainty. The distinction recurs throughout
inference; see [Confidence Intervals](/topics/foundations/confidence-intervals)
for its role in interval width and [t Tests](/topics/foundations/t-tests) for
the estimated version $s/\sqrt n$.

## The central limit theorem

The **central limit theorem (CLT)** governs the *shape* of the sampling
distribution of the mean. For any population with mean $\mu$ and standard
deviation $\sigma$, the distribution of sample means for sample size $n$ has
mean $\mu$ and standard deviation $\sigma/\sqrt n$, and it **approaches a
normal distribution as $n$ becomes large**. Two routes to near-normality:

- If the population itself is normal, the sampling distribution of the mean
  is exactly normal for every $n$.
- For non-normal populations, the sampling distribution becomes approximately
  normal as $n$ grows.

Approximate normality is sufficient for normal-curve probability calculations,
and "sufficiently large" has **no universal threshold**. Rules of thumb such
as $n \geq 30$ are rough guides, not properties of the theorem; how quickly
the sampling distribution approaches normality depends on how non-normal the
population is (heavy skew and extreme outliers demand larger $n$). The CLT is
what licenses normal-based inference for means even when raw data look nothing
like a bell curve.

## Application: the known-sigma z statistic

When $\sigma$ is known and the sampling distribution of the mean is (at least
approximately) normal, a sample mean can be standardized against its null
sampling distribution:

$$
z = \frac{\bar{X} - \mu_0}{\sigma_{\bar{X}}} = \frac{\bar{X} - \mu_0}{\sigma / \sqrt n},
$$

where $\mu_0$ is the hypothesized population mean. The denominator is the
standard error, not the sample standard deviation — the statistic measures how
many standard errors the observed mean sits from the null value. The resulting
$z$ follows the standard normal distribution, so tail areas give p-values and
critical values give rejection regions; see
[Hypothesis Testing](/topics/foundations/hypothesis-testing) and
[P-Values](/topics/foundations/p-values) for the decision framework.

**Worked example.** A reading test is known to have $\mu_0 = 75$ and
$\sigma = 16$ nationally. A random sample of $n = 100$ seniors yields
$\bar{X} = 72$. The standard error is $\sigma_{\bar{X}} = 16/\sqrt{100} = 1.6$,
so $z = (72 - 75)/1.6 \approx -1.88$. The lower-tail area is about $0.03$,
which answers the inferential question through the sampling distribution of
the mean alone.

**Reading the standard normal table.** A z table converts between a $z$ score
and an area under the standard normal curve, in two common layouts: body tables
give the area to the *left* of $z$, tail tables the area *beyond* $z$. In a body
table, locate the row for the first decimals of $z$ and the column for the next
decimal: $z = 1.88$ is row $1.8$, column $.08$, with left-tail area $.9699$, so
the upper tail is $1 - .9699 = .0301$. Negative $z$ uses symmetry: the area to
the left of $-1.88$ equals the area to the right of $1.88$, again about $.03$.
The reverse lookup yields critical values: a lower-tailed $\alpha = .05$
rejection region starts at the $z$ whose left-tail area is $.05$ ($z = -1.645$),
and a two-tailed $\alpha = .05$ region uses the values cutting off $.025$ in
each tail ($z = \pm 1.96$).

The known-$\sigma$ case is primarily pedagogical: in practice $\sigma$ is
unknown and the standard error must be estimated, which leads to the
$t$ distribution ([t Tests](/topics/foundations/t-tests)).
