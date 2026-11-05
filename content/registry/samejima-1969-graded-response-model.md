---
key: samejima-1969-graded-response-model
title: Estimation of Latent Ability Using a Response Pattern of Graded Scores
authors: "Samejima, Fumiko"
year: 1969
venue: Psychometrika
doi: 10.1007/bf03372160
model: Graded-response model; category-bound operating characteristics; likelihood-based person estimation
topics: [irt, polytomous responses, graded response model, maximum likelihood, bayesian estimation]
reviewed: 2026-11-04
description: Samejima's graded-response formulation with category-bound curves, adjacent-difference category probabilities, and latent-trait estimation
---

# Estimation of Latent Ability Using a Response Pattern of Graded Scores

## Reference

Samejima, F. (1969). Estimation of latent ability using a response pattern of
graded scores. *Psychometrika*, *34*(S1), 1–97. Psychometrika Monograph
Supplement, No. 17.
[doi:10.1007/BF03372160](https://doi.org/10.1007/BF03372160)

## Publisher abstract

The publisher presents the following extract from the monograph's
introduction.

> This monograph is a part of a more comprehensive treatment of estimation of latent traits, when the entire response pattern is used.
>
> The fundamental structure of the whole theory comes from the latent trait model, which was initiated by Lazarsfeld as the latent structure analysis [Lazarsfeld, 1959], and also by Lord and others as a theory of mental test scores [Lord, 1952]. Similarities and differences in their mathematical structures and tendencies were discussed by Lazarsfeld [Lazarsfeld, 1960] and the recent book by Lord and Novick with contributions by Birnbaum [Lord & Novick, 1968] provides the dichotomous case of the latent trait model in the context of mental measurement.

## Model

The monograph concerns responses classified into ordered categories of
attainment or intensity. For item $g$, the graded score $x_g$ takes values

$$
x_g\in\{0,1,\dots,m_g\},
$$

and a response pattern across $n$ items is

$$
V=(x_1,x_2,\dots,x_n).
$$

A dichotomous item is the special case $m_g=1$. The latent trait $\theta$
is unidimensional, and item responses are assumed to be locally independent
given $\theta$.

### Category-bound and exact-category probabilities

A graded item can be rescored at each category bound $x_g$ by assigning 0
to responses below the bound and 1 to responses at or above it. The
corresponding category-bound operating characteristic is

$$
P_{x_g}^*(\theta)
=
\Pr(X_g\geq x_g\mid\theta),
\qquad x_g=1,\dots,m_g.
$$

The boundary conventions are

$$
P_{0_g}^*(\theta)=1,
\qquad
P_{(m_g+1)_g}^*(\theta)=0.
$$

Equation (4-4) gives the operating characteristic of the exact graded
response as an adjacent difference (printed p. 20):

$$
\boxed{
P_{x_g}(\theta)
=
P_{x_g}^*(\theta)
-
P_{(x_g+1)_g}^*(\theta),
\qquad x_g=0,\dots,m_g.
}
$$

The category-bound curves for an item share a discrimination parameter
$a_g$ and have ordered difficulty parameters $b_{x_g}$. This common-slope
construction ensures that the cumulative curves remain ordered.

### Normal-ogive and logistic forms

Chapter 5 presents both normal-ogive and logistic category-bound models.
The normal-ogive form is

$$
P_{x_g}^*(\theta)
=
\frac{1}{\sqrt{2\pi}}
\int_{-\infty}^{a_g(\theta-b_{x_g})}
e^{-t^2/2}\,dt,
$$

and the logistic form is

$$
P_{x_g}^*(\theta)
=
\left\{
1+\exp\left[-Da_g(\theta-b_{x_g})\right]
\right\}^{-1},
$$

where $D>0$ is a logistic scaling factor. The category-bound difficulties
satisfy

$$
b_{(x_g+1)_g}>b_{x_g}.
$$

The exact-category probability follows by applying the adjacent-difference
formula to either boundary model. The two extreme categories have monotone
operating characteristics; interior category probabilities need not be
monotone in $\theta$.

## Likelihood

Under local independence, the likelihood of the observed response pattern
is the product of its exact-category probabilities:

$$
L_V(\theta)
=
P_V(\theta)
=
\prod_{g=1}^{n}P_{x_g}(\theta).
$$

For the graded-response model, this becomes

$$
\boxed{
L_V(\theta)
=
\prod_{g=1}^{n}
\left[
P_{x_g}^*(\theta)
-
P_{(x_g+1)_g}^*(\theta)
\right].
}
$$

Equivalently,

$$
\ell_V(\theta)
=
\sum_{g=1}^{n}
\log\left[
P_{x_g}^*(\theta)
-
P_{(x_g+1)_g}^*(\theta)
\right].
$$

The maximum-likelihood estimate $\widehat\theta_V$ maximizes this function
for one examinee's response pattern. The monograph writes the score
contributions through the basic function

$$
A_{x_g}(\theta)
=
\frac{\partial P_{x_g}(\theta)/\partial\theta}
{P_{x_g}(\theta)}
=
\frac{\partial}{\partial\theta}
\log P_{x_g}(\theta),
$$

so the likelihood equation sums these contributions across items. It also
develops conditions under which the normal-ogive and logistic models give a
unique local maximum.

The monograph additionally defines a Bayes modal estimator by maximizing

$$
B_V(\theta)=f(\theta)L_V(\theta),
$$

where $f(\theta)$ is the latent-trait density. The posterior-mean Bayes
estimator, written here as $\mu_V$, is

$$
\mu_V
=
\frac{
\int_{-\infty}^{\infty}
\theta P_V(\theta)f(\theta)\,d\theta
}{
\int_{-\infty}^{\infty}
P_V(\theta)f(\theta)\,d\theta
}.
$$

Numerical integration and grid-search procedures are discussed for these
person-parameter estimators.

## Notes

- The monograph assumes that item parameters are known. Its estimation
  problem is the examinee's $\theta$, not joint calibration of item
  parameters and examinees. It does not present marginal maximum-likelihood
  item calibration or an EM algorithm.
- Chapter 6 defines category, item, and test information from derivatives
  of the category probabilities. In particular, a category contributes
  $\{P_{x_g}'(\theta)\}^2/P_{x_g}(\theta)$ to information.
- The adjacent-difference construction is the response-side foundation used
  by [[chen-2018-general-polytomous-diagnosis|Chen and de la Torre's GPDM]].
  It differs from the conditional processing-function construction used by
  [[ma-2016-sequential-cognitive-diagnosis|Ma and de la Torre's sequential model]].
- Crossref records an erratum published in 1970 under
  [doi:10.1007/BF02290599](https://doi.org/10.1007/BF02290599).
