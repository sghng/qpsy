---
description: Samples, populations, center, and variability — the descriptive statistics that inference builds on
---

# Descriptive Statistics

Descriptive statistics summarize and organize observed data; inferential
statistics use those summaries to draw conclusions about a wider world. Every
inferential procedure in this collection rests on the descriptive quantities
defined here.

## Populations, samples, statistics, parameters

A **population** is the full set of individuals or observations of interest; a
**sample** is a subset selected from it, intended to represent it. A numerical
summary computed from a sample is a **statistic**; the corresponding summary
of the population is a **parameter**. Statistics are observable; parameters
are what research questions are usually about, and inference connects the two.

By convention, Roman letters often denote sample statistics ($\bar{X}$, $s$)
and Greek letters population parameters ($\mu$, $\sigma$); sample and
population sizes are commonly $n$ and $N$, respectively. The shared
conventions are collected in [Notation](/notation).

Descriptive statistics answer "what do these data look like?" — summarize,
organize, simplify. Inferential statistics answer "what do these data say
beyond themselves?" — compare groups, estimate parameters, test claims. The
remainder of this page covers the descriptive layer: where a distribution
sits (center), how it spreads (variability), and how to choose between
competing summaries.

## Summation notation

Formulas below use sigma notation, in which

$$
\sum_{i=1}^{n} X_i = X_1 + X_2 + \cdots + X_n
$$

sums the argument $X_i$ over indices $i = 1$ through $n$. The index limits
may be omitted when the sum runs over all observed values. Two distinct
quantities are easily confused and are not equal in general:

$$
\sum X_i^2 \neq \left(\sum X_i\right)^2 .
$$

The left side squares each score and then sums; the right side sums first and
squares once. When summation is combined with other operations, exponents and
multiplications inside the argument are evaluated before the sum is taken.

## Center

### Mean

The arithmetic average. For a population of size $N$,

$$
\mu = \frac{1}{N} \sum_{i=1}^{N} X_i,
$$

and for a sample of size $n$,

$$
\bar{X} = \frac{1}{n} \sum_{i=1}^{n} X_i .
$$

The mean has three properties that matter for everything downstream:

- **Balancing point.** The deviations about the mean sum to zero:
  $\sum (X_i - \bar{X}) = 0$. The mean sits at the center of mass of the data.
- **Least squares.** The mean minimizes the sum of squared deviations: for
  any constant $c$, $\sum (X_i - c)^2$ is smallest at $c = \bar{X}$. Squared
  deviations are the currency of classical statistics, so the mean is the
  natural center — it is the best constant predictor of the data under
  squared-error loss.
- **Sensitivity to extremes.** Because every score contributes, a single
  extreme value can pull the mean far from most of the data. The mean need
  not resemble any observed score.

Under linear transformations the mean follows the data exactly: adding a
constant $c$ to every score shifts the mean by $c$; multiplying every score
by $c$ multiplies the mean by $c$.

### Median

The **median** is the middle value of the ordered data: half the scores lie
at or below it and half at or above. For an odd number of scores it is the
central order statistic; for an even number it is the average of the two
central order statistics. The median depends only on order, so it is
insensitive to the magnitude of extreme values. Relatedly, the median
minimizes the sum of *absolute* deviations, $\sum |X_i - c|$, just as the
mean minimizes the sum of squared deviations — the two centers are optimal
under two different loss functions.

### Mode

The **mode** is the most frequently occurring value. It is the only center
available for nominal (unordered categorical) data and is often reported for
ordinal data as well.

### Shape and the choice of center

In a perfectly symmetric, unimodal distribution the mean, median, and mode
coincide.
In skewed distributions they separate: the mean is pulled toward the long
tail, while the median stays in the middle of the ordered data. **Skewness**
describes tail direction — right-skewed (positive) distributions have a long
right tail, left-skewed (negative) a long left tail; the direction is named
for where the tail lies. **Kurtosis** describes tail heaviness, the
propensity for extreme values. For heavy-tailed or strongly skewed data the
median typically describes a typical score better than the mean; for
symmetric, light-tailed data the mean is usually preferred because of its
least-squares and algebraic properties. Outliers — values far outside the
bulk of the data — warrant inspection in their own right, not silent
deletion.

## Variability

Two distributions can share a center and differ completely in how spread out
their scores are. Variability measures how far scores lie from the center,
and therefore how well a center summarizes the whole.

### Range

The range is the difference between the largest and smallest scores. It is
simple but fragile: it uses only two scores and is driven entirely by
extremes.

### Sum of squared deviations

The building block of the standard measures is the deviation of each score
from the mean, $X_i - \bar{X}$. Deviations cannot simply be averaged, because
they always sum to zero — positive and negative errors cancel by
construction. Squaring removes the sign while penalizing large errors
disproportionately. The **sum of squared deviations** (sum of squares) is

$$
SS = \sum_{i=1}^{n} (X_i - \bar{X})^2 .
$$

$SS$ is total squared error: it grows with the number of scores, so it is
rarely interpreted on its own.

### Variance and standard deviation

The **variance** averages the squared deviations, and the **standard
deviation** (SD) returns to the original units by taking the square root.
Population and sample versions divide by different denominators:

$$
\sigma^2 = \frac{1}{N} \sum_{i=1}^{N} (X_i - \mu)^2
= \frac{SS}{N},
\qquad
s^2 = \frac{1}{n-1} \sum_{i=1}^{n} (X_i - \bar{X})^2
= \frac{SS}{n-1},
$$

$$
\sigma = \sqrt{\sigma^2}, \qquad s = \sqrt{s^2}.
$$

Interpretations: the variance is the average squared distance from the mean;
the standard deviation is the typical distance from the mean, expressed in
the units of $X$. Squared units make the variance hard to read directly but
mathematically convenient; the SD is the interpretable sibling.

An equivalent computational form, useful for hand or one-pass calculation of
the sample variance, is

$$
s^2 = \frac{\sum X_i^2 - \left(\sum X_i\right)^2 / n}{n - 1}.
$$

The population form uses $N$ in the numerator's divisor and divides by $N$,
not $N-1$. The two forms are algebraically identical; with finite-precision
arithmetic the computational form can suffer catastrophic cancellation, so
the definitional form is preferred in software.

Variability responds to linear transformations differently than the mean:
adding a constant to every score leaves the variance and SD unchanged (it
shifts location only), while multiplying every score by a constant $c$
multiplies the SD by $|c|$ and the variance by $c^2$.

### Why $n - 1$: degrees of freedom and unbiasedness

The sample denominator $n - 1$ is a correction, not an approximation. The
deviations $X_i - \bar{X}$ are not $n$ independent pieces of information:
because $\sum (X_i - \bar{X}) = 0$, only $n - 1$ of them are free to vary
once the sample mean is fixed. The last one is determined by the other $n -
1$. This count of freely varying quantities is the **degrees of freedom**.

Dividing by the degrees of freedom rather than by $n$ makes $s^2$ an
**unbiased** estimator of $\sigma^2$: its expected value across repeated
samples equals the population variance. Dividing by $n$ systematically
underestimates $\sigma^2$, because deviations are taken around the estimated
$\bar{X}$ rather than the true $\mu$, and the estimated mean is the value
that *minimizes* the sum of squared deviations. The correction matters most
for small samples and vanishes as $n$ grows.

Two cautions survive this correction. First, unbiasedness applies to the
**variance** $s^2$; the sample SD $s$ is not exactly unbiased, since the
square root of an unbiased estimator is generally biased (downward, mildly).
Second, $n - 1$ degrees of freedom recur throughout classical inference —
the $t$ distribution among them — always for the same reason: a parameter
estimated from the same data consumes one degree of freedom.

## A compact example

For the scores $4, 4, 6, 30$ ($n = 4$):

- Centers: mean $\bar{X} = 44/4 = 11$; median $= (4 + 6)/2 = 5$; mode $= 4$.
  The mean is pulled toward the extreme score; the median is not.
- Deviations from the mean: $-7, -7, -5, 19$, so
  $SS = 49 + 49 + 25 + 361 = 484$.
- Sample variability: $s^2 = 484/3 \approx 161.3$ and
  $s = \sqrt{161.3} \approx 12.7$, both in the original units (squared and
  unsquared). For comparison, the population-form values for these four
  scores would be $\sigma^2 = 484/4 = 121$ and $\sigma = 11$.
- Squared errors about the median instead total $628$, and about the mode
  $680$ — visibly larger than $484$, a concrete instance of the mean's
  least-squares optimality.

## Connections

Summaries computed from a sample vary from sample to sample; that sampling
variability, and the standard error that measures it, is the subject of
[Sampling Distributions](/topics/foundations/sampling-distributions). The
standard deviation serves as the standardizing unit for standardized effect
measures in [Effect Sizes](/topics/foundations/effect-sizes), and the
variance decomposition logic reappears in [analysis of variance](/topics/anova/one-way-anova) and
regression. Descriptive summaries describe the data at hand; saying what
they imply beyond it requires the inferential machinery those notes develop.
