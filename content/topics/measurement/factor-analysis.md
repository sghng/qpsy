---
description: factor models as the explicit basis for scale-score reliability — the common and congeneric factor models and their assumptions, coefficient omega for the unweighted sum, the scoped relation between alpha and omega, maximal reliability of an optimally weighted composite, and factor analysis of ordinal item responses
---

# Factor Models and Reliability

Internal-consistency coefficients such as coefficient alpha summarize the
covariances among a set of items without committing to what produced them. A
factor model makes that structure explicit: each item score is written as a
weighted combination of one or more latent common factors plus an item-unique
term. Once such a model is specified and fits, the reliability of a sum score
follows exactly rather than as an approximation, and the conditions under which
the classical coefficients agree become visible. This page develops the
common-factor and congeneric models and the reliability coefficients defined on
them; the score decomposition and the families of parallel and tau-equivalent
tests are treated in
[classical test theory](/topics/measurement/classical-test-theory), and the
design-based reliability coefficients in
[reliability](/topics/measurement/reliability).

## Dimensionality is a structural question

How many dimensions a set of items measures is a question about the structure of
their covariance matrix: whether one common factor accounts for the
off-diagonal covariances or several are required. It is answered by positing and
comparing factor models, not by inspecting the size of a reliability
coefficient. Coefficient alpha depends on the number of items and the average
inter-item association, and correlation structures with very different
dimensionality can produce the same alpha; the matrix examples are developed in
[internal consistency](/topics/measurement/internal-consistency). A sizable alpha is therefore
not evidence of unidimensionality. Unidimensionality is instead an assumption
that a factor model can be formulated and checked against, and the coefficients
below are defined only relative to such a model.

## The common factor model

For $J$ observed indicators $X_1, \ldots, X_J$ with means
$\mu_1, \ldots, \mu_J$ and $k$ common factors, the model writes each centered
indicator as

$$
x_j - \mu_j = \lambda_{j1}F_1 + \cdots + \lambda_{jk}F_k + \epsilon_j,
\qquad j = 1, \ldots, J,
$$

or in matrix form, with the $J \times k$ loading matrix
$\boldsymbol{\Lambda}$ collecting the $\lambda_{jk}$,

$$
\mathbf{X} - \boldsymbol{\mu} = \boldsymbol{\Lambda}\mathbf{F}
+ \boldsymbol{\epsilon}.
$$

The model's assumptions are:

- $E(\epsilon_j) = 0$: each unique factor has mean zero.
- $\operatorname{Cov}(\boldsymbol{\epsilon}) =
  \boldsymbol{\Psi} = \operatorname{Diag}(\psi_1^2, \ldots, \psi_J^2)$: the
  unique factors are mutually uncorrelated, each with its own variance
  $\psi_j^2$.
- $E(\mathbf{F}) = \mathbf{0}$ and $\operatorname{Cov}(\mathbf{F}) = \mathbf{I}$:
  the common factors are standardized and, in this form, orthogonal.
- $\mathbf{F}$ and $\boldsymbol{\epsilon}$ are independent: unique factors are
  uncorrelated with common factors.

Together these imply the covariance decomposition

$$
\operatorname{Cov}(\mathbf{X}) = \boldsymbol{\Lambda}\boldsymbol{\Lambda}'
+ \boldsymbol{\Psi}:
$$

every covariance between two indicators is attributed to the common factors,
and every indicator retains its own unique variance. This decomposition follows
from the uncorrelatedness assumptions alone. No distributional assumption — in
particular no multivariate normality — is required for it to hold. Normality
matters for particular estimation methods and fit tests, not for the
decomposition itself (see below).

## The congeneric model for a unidimensional scale

With a single common factor $\theta$, the model for one indicator is

$$
X_j = \mu_j + \lambda_j\theta + e_j, \qquad \operatorname{Var}(e_j) = \psi_j^2,
$$

so that each observed score is a common true component $\lambda_j\theta$ plus a
unique error component $e_j$. Under the model,

$$
\sigma_j^2 = \lambda_j^2 + \psi_j^2, \qquad
\sigma_{jk} = \lambda_j\lambda_k \quad (j \neq k).
$$

Indicators following this one-factor model with freely varying loadings and
unique variances are called **congeneric**: they measure the same common factor
but need not do so with equal strength or equal precision. The classical test
families are nested special cases — equal loadings
$\lambda_1 = \cdots = \lambda_J$ give tau-equivalent indicators, and equal
loadings together with equal unique variances give parallel indicators (see
[classical test theory](/topics/measurement/classical-test-theory)).

## Assumptions for scale application

Applying the congeneric model to a set of scale items assumes:

| Assumption | Statement |
|---|---|
| Linearity | Each indicator is linearly related to the common factor |
| Scale level | Indicators are measured on interval or near-interval scales |
| Untruncated variables | No pronounced floor or ceiling effects truncating the indicator distributions |
| No multicollinearity | Indicators are not linear combinations of one another; collinearity leaves loadings poorly determined |
| Distributional assumptions | Only as required by the estimator and fit tests, not by the covariance decomposition |

The last row is worth emphasis because it is often overstated: multivariate
normality is an assumption of particular estimation methods (maximum
likelihood; see [maximum likelihood](/modeling/maximum-likelihood)) and of the
chi-square tests of fit computed from them. The decomposition of the
covariance matrix into common and unique parts does not require it.

## Coefficient omega: reliability of the unweighted sum

For the unweighted total score $X = \sum_{j=1}^{J} X_j$ (centered), the model
gives $X = \left(\sum_j \lambda_j\right)\theta + \sum_j e_j$: the true
component of the sum has variance $\left(\sum_j \lambda_j\right)^2$ and the
error component has variance $\sum_j \psi_j^2$. The proportion of sum-score
variance attributable to the common factor — which is, under the model, exactly
the reliability of the sum score — is

$$
\omega = \frac{\left(\sum_{j=1}^{J} \lambda_j\right)^2}
{\left(\sum_{j=1}^{J} \lambda_j\right)^2 + \sum_{j=1}^{J} \psi_j^2}
= \frac{1}{1 + \dfrac{\sum_j \psi_j^2}{\left(\sum_j \lambda_j\right)^2}}.
$$

Note the squared *sum* of the loadings in both forms. This coefficient is
commonly written $\omega_{\text{total}}$ to distinguish it from coefficients
that isolate a general factor hierarchically nested under group factors; the
$\omega$ here refers to the total common-factor variance of the one-factor
model.

## Alpha, tau-equivalence, and the ordering of alpha and omega

Coefficient alpha assumes essential tau-equivalence at the item level. Within
the congeneric model with uncorrelated unique factors, essential
tau-equivalence holds if and only if all loadings are equal,
$\lambda_1 = \cdots = \lambda_J$. Two consequences follow:

- **Equal loadings give $\alpha = \omega$.** When the indicators are
  (essentially) tau-equivalent, alpha and omega are the same number.
- **Unequal loadings give $\alpha < \omega$.** Under a correctly specified
  unidimensional congeneric model with uncorrelated unique factors, alpha is a
  lower bound to the reliability of the sum score, with equality exactly under
  equal loadings.

The ordering claim is scoped, and the scope matters in both directions:

1. The bound $\alpha \leq \omega$ holds *relative to a correctly specified
   unidimensional factor structure with uncorrelated errors*. When that
   structure fails — when the scale is multidimensional, or the item errors are
   correlated — alpha can exceed the reliability of the sum score. Alpha is not
   an unconditional lower bound.
2. Neither a large alpha nor a large omega is evidence that the scale is
   unidimensional. Omega presupposes a one-factor model; if that model is wrong,
   omega describes the reliability of a score the scale does not actually
   produce. Dimensionality must be examined structurally, as above.

## Maximal reliability of an optimally weighted composite

The unweighted sum is one way to combine the indicators. For a weighted
composite $\sum_j w_j X_j$, the same decomposition gives true variance
$\left(\sum_j w_j\lambda_j\right)^2$ and error variance
$\sum_j w_j^2\psi_j^2$, so its reliability under the model is

$$
\rho(\mathbf{w}) = \frac{\left(\sum_j w_j\lambda_j\right)^2}
{\left(\sum_j w_j\lambda_j\right)^2 + \sum_j w_j^2\psi_j^2}.
$$

This expression is maximized over the weights when $w_j$ is proportional to
$\lambda_j / \psi_j^2$: each indicator is weighted by its loading relative to
its unique variance, so stronger and cleaner indicators receive more weight.
Substituting the optimal weights yields the **maximal reliability**

$$
\rho_{\max} = \frac{1}{1 + \left[\sum_{j=1}^{J}
\frac{\lambda_j^2}{\psi_j^2}\right]^{-1}}.
$$

Maximal reliability is the reliability of a *different score* — the optimally
weighted composite — not a second coefficient describing the unweighted sum. It
answers the question of how reliable a composite of these indicators could be
made by weighting, and it is the relevant quantity when the reported score is a
loading-weighted composite rather than the raw sum.

## Ordering and equality conditions

Under a correctly specified congeneric model with uncorrelated unique factors,
the three coefficients order as

$$
\rho_{\max} \;\geq\; \omega \;\geq\; \alpha.
$$

The equality conditions are not all the same:

- Equal loadings imply $\alpha = \omega$.
- Equal loadings **and** equal unique variances are sufficient for all three
  coefficients to coincide.
- Equal loadings alone do not force $\rho_{\max}$ down to $\omega$: with
  unequal unique variances, optimally weighted scoring is still more reliable
  than the unweighted sum, so $\rho_{\max}$ remains strictly larger. Claims
  that the three coincide whenever loadings are equal are incorrect.

### A worked example

Take four indicators with equal loadings $\lambda_j = 1$ and unique variances
$\psi_j^2 = .10, .20, .30, .40$. Then
$\left(\sum_j \lambda_j\right)^2 = 16$ and $\sum_j \psi_j^2 = 1$, so

$$
\omega = \frac{16}{16 + 1} = \frac{16}{17} \approx .9412.
$$

Because the loadings are equal, alpha is identical to omega: each item variance
is $1 + \psi_j^2$, the total variance is $17$, and the raw-alpha computation
gives $\alpha = \frac{4}{3}\cdot\frac{17 - 5}{17} = \frac{16}{17}$. But

$$
\sum_j \frac{\lambda_j^2}{\psi_j^2} = 10 + 5 + \frac{10}{3} + \frac{5}{2}
= \frac{125}{6},
\qquad
\rho_{\max} = \frac{125/6}{1 + 125/6} = \frac{125}{131} \approx .9542.
$$

So $\alpha = \omega \approx .9412$ while $\rho_{\max} \approx .9542$: equal
loadings make alpha and omega agree, but the unequal unique variances still
leave room for optimal weighting — which here up-weights the most precise
indicator ($\psi^2 = .10$) and down-weights the least ($\psi^2 = .40$) — to
improve on the unweighted sum.

## Which coefficient describes which score

- If the score reported is the **unweighted item sum** and a unidimensional
  factor model is defensible for the items, its model-based reliability is
  $\omega$; alpha describes the same score only under equal loadings, and as a
  lower bound otherwise.
- If the score reported is a **weighted composite** of the indicators, its
  reliability is $\rho(\mathbf{w})$ for its actual weights — the maximal
  reliability $\rho_{\max}$ when the weights are optimal. Reporting
  $\rho_{\max}$ alongside an unweighted sum conflates two different scores.
- Composites formed from subscale parts rather than individual items are
  treated in
  [reliability of composite scores](/topics/measurement/composite-scores),
  where the Horst formula generalizes $\rho(\mathbf{w})$ to parts with
  separately estimated reliabilities.

## Ordinal item responses

Scale items with a small number of ordered categories are coarse ordinal
observations, and the linear factor model above assumes interval-level
indicators. The standard recourse is to fit the factor model not to Pearson
covariances but to **polychoric correlations** (tetrachoric for dichotomous
items), which posit a latent continuous response pair discretized by
thresholds; the tetrachoric model and its assumptions are treated in
[correlations involving binary variables](/topics/measurement/binary-correlations),
and the estimation machinery for polychoric matrices in
[two-step polychoric estimation](/registry/joreskog-1994-polychoric-correlations).
Two cautions carry over: the latent-normality assumption is load-bearing, and
pairwise polychoric matrices can fail to be positive definite, which estimation
methods for ordinal factor analysis must accommodate.

## Failure modes

- **Interpreting omega without the model.** $\omega$ is defined relative to a
  one-factor model; if the structure is multidimensional or the errors are
  correlated, $\omega$ computed from that model does not describe the sum score
  actually used.
- **Treating $\alpha \leq \omega$ as unconditional.** The ordering holds under
  a correct unidimensional specification with uncorrelated errors;
  multidimensionality and correlated errors can push alpha above the sum
  score's reliability.
- **Reading alpha as a dimensionality check.** Alpha confounds test length
  with homogeneity of inter-item associations; structures of different
  dimensionality can share one alpha value.
- **Estimand confusion.** $\rho_{\max}$ is the reliability of an optimally
  weighted composite, not an improved coefficient for the unweighted sum;
  reporting it for a raw sum overstates that score's reliability.
- **Equality overstatement.** Asserting that alpha, omega, and maximal
  reliability coincide whenever loadings are equal; equal unique variances are
  also needed for all three to coincide (and even then this is a sufficient
  condition).
- **Applying the linear model to truncated or coarsely categorical responses**
  without the ordinal treatment above.

## Related pages

- [Classical test theory](/topics/measurement/classical-test-theory) supplies
  the $X = T + E$ decomposition, the reliability definition as a variance
  ratio, and the parallel, tau-equivalent, and essentially tau-equivalent
  families.
- [Reliability](/topics/measurement/reliability) treats replication designs,
  error sources, and design-based reliability coefficients.
- [Internal consistency and coefficient alpha](/topics/measurement/internal-consistency)
  treats alpha's forms and assumptions and the alpha-versus-dimensionality
  matrix lessons.
- [Reliability of composite scores](/topics/measurement/composite-scores)
  develops the Horst formula for composites of parts with separately estimated
  reliabilities, and stratified alpha.
- [Reliability of change scores](/topics/measurement/change-scores) analyzes
  the reliability of differences of two measurements.
- [Correlations involving binary variables](/topics/measurement/binary-correlations)
  treats tetrachoric correlations and their assumptions, the entry point for
  the ordinal-response link.
