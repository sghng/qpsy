---
key: joreskog-1994-polychoric-correlations
title: On the Estimation of Polychoric Correlations and their Asymptotic Covariance Matrix
authors: Jöreskog, Karl G.
year: 1994
venue: Psychometrika
doi: 10.1007/BF02296131
model: Polychoric correlation, two-step
topics: [ordinal data, correlation structure, sem]
reviewed: 2026-10-13
description: Two-step polychoric estimation with the asymptotic covariance matrix SEM weight matrices consume
---

# Polychoric Correlation, Two-Step Estimation

## Reference

Jöreskog, K. G. (1994). On the estimation of polychoric correlations and
their asymptotic covariance matrix. *Psychometrika*, 59(3), 381-389.
[doi:10.1007/BF02296131](https://doi.org/10.1007/BF02296131)

## Publisher abstract

> A general theory for parametric inference in contingency tables is outlined.
> Estimation of polychoric correlations is seen as a special case of this
> theory. The asymptotic covariance matrix of the estimated polychoric
> correlations is derived for the case when the thresholds are estimated from
> the univariate marginals and the polychoric correlations are estimated from
> the bivariate marginals for given thresholds. Computational aspects are also
> discussed.

## Model

Two ordinal observations $X_1 \in \{1, \dots, r\}$ and
$X_2 \in \{1, \dots, s\}$ arise from a latent bivariate normal pair
$(\xi_1, \xi_2)$ with zero means, unit variances, and correlation $\rho$.
Threshold vectors $\boldsymbol{\tau}_1$ and $\boldsymbol{\tau}_2$ discretize
the latent continuum into the observed categories, with
$\tau_{1,0} = -\infty$ and $\tau_{1,r} = +\infty$, and likewise for
$\boldsymbol{\tau}_2$. The tetrachoric correlation is the $r = s = 2$ special
case.

## Likelihood

Cell probabilities are rectangular regions of the bivariate normal CDF
$\Phi_2(\cdot, \cdot\,; \rho)$:

$$
\pi_{ab} = \Phi_2(\tau_{1,a}, \tau_{2,b}; \rho)
- \Phi_2(\tau_{1,a-1}, \tau_{2,b}; \rho)
- \Phi_2(\tau_{1,a}, \tau_{2,b-1}; \rho)
+ \Phi_2(\tau_{1,a-1}, \tau_{2,b-1}; \rho)
$$

For observed cell counts $n_{ab}$ from $N = \sum_{a,b} n_{ab}$ persons, the
likelihood is multinomial over the $r \times s$ table:

$$
L(\boldsymbol{\tau}, \rho) \propto
\prod_{a=1}^{r} \prod_{b=1}^{s} \pi_{ab}(\boldsymbol{\tau}, \rho)^{n_{ab}},
\qquad
\ell = \sum_{a,b} n_{ab} \log \pi_{ab} + \text{const.}
$$

Estimation is two-step. Thresholds come from the univariate marginals by the
normal quantile transform of cumulative proportions; $\rho$ then follows by
maximizing the bivariate likelihood at fixed thresholds.

## Notes

- The paper's contribution is the asymptotic covariance matrix of
  $\hat{\rho}$ under this two-step scheme, including the correction for
  estimated thresholds. That matrix is what weighted least squares SEM
  consumes when ordinal indicators are analyzed through polychoric
  correlations, the WLSMV route in lavaan and Mplus.
- The load-bearing assumption is bivariate normality of the latent pair;
  thresholds and $\rho$ inherit its failures.
- Pairwise estimation over many variable pairs yields a correlation matrix
  that need not be positive definite; SEM weight matrices handle this, but
  report it when it occurs.
