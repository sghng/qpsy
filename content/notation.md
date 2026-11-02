---
description: Symbols and conventions used across qpsy
---

# Notation

These conventions hold across qpsy pages unless a page states otherwise.
Deviations are local and declared.

## Indices

| Symbol | Meaning |
| --- | --- |
| $i = 1, \dots, N$ | persons, respondents |
| $j = 1, \dots, J$ | items; variables in regression contexts |
| $k = 1, \dots, K$ | attributes or latent dimensions |
| $a, b$ | response categories, cells of a contingency table |
| $t = 1, \dots, T$ | time points, occasions |

## Data

| Symbol | Meaning |
| --- | --- |
| $X_{ij}$ | response of person $i$ to item $j$ |
| $\mathbf{X}$ | the response matrix, persons by items |
| $Y$ | an outcome variable; $y_i$ its realization for person $i$ |
| $\mathbf{Z}$ | covariates, predictors |

## Latent variables and parameters

| Symbol | Meaning |
| --- | --- |
| $\theta_i$ | a scalar latent trait, ability |
| $\boldsymbol{\theta}$ | the parameter vector of a model |
| $\alpha_{ik}$ | attribute mastery, 1 if person $i$ masters attribute $k$ |
| $\boldsymbol{\alpha}_i$ | the attribute profile of person $i$ |
| $\varepsilon$ | residual, noise term |
| $\beta, \gamma$ | regression coefficients |
| $\sigma^2, \tau^2$ | variance components |
| $\rho$ | correlation |

Bold lowercase letters are vectors, bold uppercase letters are matrices.

## Models and inference

| Symbol | Meaning |
| --- | --- |
| $p(\mathbf{X} \mid \boldsymbol{\theta})$ | the likelihood |
| $\ell(\boldsymbol{\theta})$ | the log-likelihood |
| $L(\boldsymbol{\theta})$ | often the likelihood; pages declare which |
| $\pi_{ab}$ | a cell probability, contingency or categorical |
| $\Phi(\cdot), \Phi_2(\cdot, \cdot\,; \rho)$ | standard normal CDF; bivariate with correlation $\rho$ |
| $I(\boldsymbol{\theta})$ | Fisher information |
| $s_j, g_j$ | slip and guess parameters in cognitive diagnosis |

## Distributions

$\mathrm{Binomial}$, $\mathrm{Multinomial}$, $\mathrm{Normal}$,
$\mathrm{Bernoulli}$, and $\mathrm{Dirichlet}$ are written by name with
parameters in parentheses, for example
$\theta \sim \mathrm{Normal}(0, 1)$.
