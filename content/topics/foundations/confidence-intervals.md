---
description: Interval estimates for population parameters — how confidence intervals are built, what their coverage level means, and how they relate to two-sided tests
---

# Confidence Intervals

A point estimate summarizes a parameter with a single number computed from the
sample, such as the sample mean $\bar{X}$ for a population mean $\mu$. Because
the estimate varies from sample to sample, a point estimate alone conveys
nothing about its own precision. An interval estimate surrounds the point
estimate with a margin of error, producing a range of values that are
compatible with the data.

## General form

Many confidence intervals for mean-like parameters have the same structure:

$$
CI = \text{estimate} \pm (\text{critical value}) \times SE
$$

where $SE$ is the standard error of the estimate — the estimated standard
deviation of its [sampling distribution](/topics/foundations/sampling-distributions).
The critical value is chosen so that the interval has a specified coverage
level: it is the value that cuts off the extreme tail areas of the sampling
distribution, obtained from the standard normal distribution or from a
$t$ distribution when the standard error is estimated from the sample (as in
the [t Tests](/topics/foundations/t-tests) page).

The interval is usually written as $[\text{lower bound}, \text{upper bound}]$.

## Example: mean hours slept

A sample of $n = 16$ students has mean $\bar{X} = 7.5$ hours slept with
sample standard deviation $s = 1.0$. The estimated standard error is

$$
s_{\bar{X}} = \frac{s}{\sqrt{n}} = \frac{1.0}{\sqrt{16}} = 0.25.
$$

With $df = n - 1 = 15$, the two-tailed critical value for 95% confidence is
$t^* = 2.131$, so

$$
7.5 \pm 2.131(0.25) = 7.5 \pm 0.53,
$$

giving a 95% confidence interval of $[6.97, 8.03]$ hours.

## What the confidence level means

The 95% refers to the **long-run success rate of the method**, not to any
single computed interval. If samples were repeatedly drawn and an interval
computed from each in the same way, about 95% of those intervals would contain
the true population mean.

It does **not** mean that there is a 95% probability that $\mu$ lies inside a
particular realized interval. Once the sample is observed and the interval
computed, $\mu$ is fixed: it either lies in that interval or it does not. The
randomness is in the interval-construction procedure, not in the parameter.

## Interpreting an observed interval

A computed interval admits the following reading: it is the set of parameter
values that are consistent with the observed data, given the chosen confidence
level. Values inside the interval are plausible; values far outside it are
incompatible with the data in a well-defined sense. This interpretation is
estimation-flavored rather than decision-flavored, and it is usually more
informative than a bare significance statement because it shows the magnitude
of uncertainty around the estimate, not just whether a threshold was crossed.

## Precision

The width of a confidence interval is twice the margin of error:

$$
\text{width} = 2 \times (\text{critical value}) \times SE.
$$

Because $SE$ shrinks with the square root of the sample size, larger samples
produce narrower intervals at a fixed confidence level — more data means less
uncertainty about the parameter. Raising the confidence level widens the
interval by enlarging the critical value, so confidence and precision trade
against each other for a fixed sample.

## Duality with two-sided hypothesis tests

A two-sided confidence interval with coverage $1 - \alpha$ contains exactly
the null values that a **two-sided** test at level $\alpha$ would fail to
reject, for the same data and standard error. If the interval contains the
hypothesized value, the two-sided test does not reject; if the interval
excludes it, the test rejects.

In the example above, the null value $\mu_0 = 7$ hours lies inside $[6.97,
8.03]$, matching the two-sided test outcome $t = (7.5 - 7)/0.25 = 2.00$, which
falls short of the critical value $2.131$ at $\alpha = .05$.

This correspondence holds only between a two-sided test and a two-sided
interval. A one-sided test at level $\alpha$ does not correspond to the
ordinary two-sided $1 - \alpha$ interval. The null values it would fail to
reject form a one-sided bound with coverage $1 - \alpha$ — equivalently, the
relevant endpoint of a two-sided $1 - 2\alpha$ interval constructed from the
same standard error. Interval and test should be aligned in direction when the
duality is used.

## Related concepts

- The standard error and its behavior come from
  [sampling distributions](/topics/foundations/sampling-distributions).
- Intervals for mean differences built with $t$ critical values appear on the
  [t Tests](/topics/foundations/t-tests) page.
- Interval width and the size of an effect jointly determine the
  [power](/topics/foundations/statistical-power) of the matching test.
