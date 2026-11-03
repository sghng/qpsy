---
description: What parameter estimation is, how estimators are judged (bias, variance, MSE, consistency), and the main estimation methods
---

# Parameter Estimation

Estimation is step 4 of the [modeling workflow](/modeling/): once a model
$p(\mathbf{X} \mid \boldsymbol{\theta})$ is specified and identified, the data
are used to choose a value for $\boldsymbol{\theta}$. Three terms deserve
separation:

- The **estimand** is the unknown quantity of interest, a parameter $\theta$ or
  a function $\tau(\theta)$ of it.
- An **estimator** $W = W(X_1, \dots, X_n)$ is a rule, a function of the random
  sample. It is itself a random variable and has a
  [sampling distribution](/topics/foundations/sampling-distributions).
- An **estimate** is the realized value $W(x_1, \dots, x_n)$ on the observed
  data, a number rather than a random variable.

## Judging an estimator

Because an estimator is random, it is evaluated by the behavior of its
sampling distribution, not by any single estimate.

**Bias and variance.** The bias of $W$ for $\theta$ is
$\operatorname{Bias}_\theta(W) = E_\theta(W) - \theta$; an estimator with
identically zero bias is *unbiased*. The mean squared error combines bias and
variance into one criterion:

$$
\operatorname{MSE}_\theta(W) = E_\theta\!\left[(W - \theta)^2\right]
= \operatorname{Var}_\theta(W) + \operatorname{Bias}_\theta(W)^2 .
$$

Unbiasedness alone does not guarantee a good estimator: a small increase in
bias can buy a larger decrease in variance and improve MSE. The classic
example is the normal variance. With $X_1, \dots, X_n$ iid
$\mathrm{Normal}(\mu, \sigma^2)$, the unbiased sample variance
$S^2 = \frac{1}{n-1}\sum_i (X_i - \bar{X})^2$ and the maximum likelihood
estimator $\hat\sigma^2 = \frac{1}{n}\sum_i (X_i - \bar{X})^2$ satisfy

$$
E(\hat\sigma^2) = \frac{n-1}{n}\sigma^2, \qquad
\operatorname{MSE}(\hat\sigma^2) = \frac{2n-1}{n^2}\sigma^4, \qquad
\operatorname{MSE}(S^2) = \frac{2}{n-1}\sigma^4 .
$$

The MLE is biased but has the smaller MSE at every $n \ge 2$; at $n = 10$ the
values are $0.19\,\sigma^4$ against $0.2222\,\sigma^4$ (verified by
simulation). Biased estimators should be compared, not dismissed.

**Consistency.** A sequence of estimators $W_n$ is consistent for $\theta$ if
it converges in probability to $\theta$ as $n \to \infty$: for every
$\varepsilon > 0$,

$$
\lim_{n \to \infty} P_\theta\!\left(|W_n - \theta| \ge \varepsilon\right) = 0 .
$$

Consistency is a property of the *procedure* as sample size grows, not of one
estimate. A sufficient route: if both $\operatorname{Var}_\theta(W_n) \to 0$
and $\operatorname{Bias}_\theta(W_n) \to 0$, then $W_n$ is consistent (the
MSE decomposition plus Chebyshev's inequality). Inconsistent estimators are
suspect no matter how elegant their derivation.

**Efficiency.** Among unbiased estimators, smaller variance is better. The
Cramér–Rao lower bound sets a floor on what any unbiased estimator can
achieve, expressed through the Fisher information $I(\theta)$ (defined on the
[maximum likelihood](/modeling/maximum-likelihood) page, since the bound and
the information play their largest role there). An unbiased estimator
attaining the bound is *efficient*; asymptotic efficiency compares estimators
by the variance of their limiting distributions.

## The main methods

These are different principles for turning data into an estimate, and they can
yield different answers on the same data.

| Method | Rule | Notes |
| --- | --- | --- |
| Method of moments | Match sample moments to population moments and solve for $\theta$ | Simple, consistent under weak conditions; usually less efficient than ML |
| Least squares | Minimize $\sum_i (y_i - \text{fitted}_i)^2$ | Coincides with the MLE when errors are iid normal with constant variance |
| [Maximum likelihood](/modeling/maximum-likelihood) | Maximize $L(\theta \mid \mathbf{x})$ | The default in latent-variable modeling; consistent and asymptotically efficient under regularity conditions |
| Bayesian estimation | Posterior mean, median, or mode (MAP) | Requires a prior; MAP reduces to ML when the prior is flat |

[EM](/modeling/em-algorithm) is not a separate principle on this list: it is an
*algorithm* for computing ML or MAP estimates when the model contains latent
variables or missing data, and it is the standard computational route to
marginal maximum likelihood in [IRT](/topics/irt) and
[CDM](/topics/cdm).

## After the estimate

A point estimate alone is incomplete reporting. Standard errors, obtained from
the estimator's sampling distribution (often an asymptotic normal
approximation), feed [confidence intervals](/topics/foundations/confidence-intervals);
the fitted model then moves to assessment and comparison in the
[modeling workflow](/modeling/). Choosing an estimator also means choosing its
failure modes: likelihood maximization can be unstable on flat likelihoods,
and every method degrades under misspecification.
