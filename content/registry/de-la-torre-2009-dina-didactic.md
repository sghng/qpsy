---
key: de-la-torre-2009-dina-didactic
title: "DINA Model and Parameter Estimation: A Didactic"
authors: "de la Torre, Jimmy"
year: 2009
venue: Journal of Educational and Behavioral Statistics
doi: 10.3102/1076998607309474
model: DINA; marginal maximum likelihood via EM
topics: [cdm, dina, marginal maximum likelihood, em]
reviewed: 2026-11-05
description: DINA response probabilities, marginal likelihood, posterior attribute-profile weights, and closed-form EM updates for guessing and slipping
---

# DINA Model and Parameter Estimation: A Didactic

## Reference

de la Torre, J. (2009). DINA model and parameter estimation: A didactic.
*Journal of Educational and Behavioral Statistics*, *34*(1), 115–130.
[doi:10.3102/1076998607309474](https://doi.org/10.3102/1076998607309474)

## Publisher abstract

> Cognitive and skills diagnosis models are psychometric models that have
> immense potential to provide rich information relevant for instruction and
> learning. However, wider applications of these models have been hampered by
> their novelty and the lack of commercially available software that can be
> used to analyze data from this psychometric framework. To address this
> issue, this article focuses on one tractable and interpretable skills
> diagnosis model—the DINA model—and presents it didactically. The article
> also discusses expectation-maximization and Markov chain Monte Carlo
> algorithms in estimating its model parameters. Finally, analyses of
> simulated and real data are presented.

## Model

The deterministic inputs, noisy “and” gate (DINA) model is a binary-response
[[cdm|cognitive diagnosis model]]. Let $X_{ij}\in\{0,1\}$ be the response of
examinee $i=1,\dots,I$ to item $j=1,\dots,J$, and let
$\boldsymbol\alpha_i=(\alpha_{i1},\dots,\alpha_{iK})$ be the examinee’s
binary attribute profile. The known $J\times K$ binary matrix $\mathbf Q$
has entries $q_{jk}$ indicating whether item $j$ requires attribute $k$.

The conjunctive ideal response is

$$
\eta_{ij}=\prod_{k=1}^{K}\alpha_{ik}^{q_{jk}}.
$$

Thus $\eta_{ij}=1$ exactly when examinee $i$ possesses every attribute
required by item $j$; otherwise $\eta_{ij}=0$. Factors with $q_{jk}=0$ do
not restrict the ideal response.

Two item parameters introduce response noise:

$$
s_j=\Pr(X_{ij}=0\mid\eta_{ij}=1),
\qquad
g_j=\Pr(X_{ij}=1\mid\eta_{ij}=0).
$$

The slip parameter $s_j$ is the probability that an examinee with all
required attributes answers incorrectly. The guessing parameter $g_j$ is the
probability of a correct response despite lacking at least one required
attribute; it also accommodates correct strategies not represented by the
specified $\mathbf Q$-row. The correct-response probability is therefore

$$
P_j(\boldsymbol\alpha_i)
=
\Pr(X_{ij}=1\mid\boldsymbol\alpha_i)
=
g_j^{1-\eta_{ij}}(1-s_j)^{\eta_{ij}}.
$$

Responses are assumed conditionally independent given the attribute profile,
and examinees are independently sampled. Each possible binary profile is a
latent class. Enumerate the $L=2^K$ profiles as
$\boldsymbol\alpha_1,\dots,\boldsymbol\alpha_L$, with population proportions
$p_l=p(\boldsymbol\alpha_l)$ satisfying $\sum_{l=1}^{L}p_l=1$.

## Likelihood

Write $P_{jl}=P_j(\boldsymbol\alpha_l)$ and $\eta_{lj}$ for the correct-response
probability and ideal response under profile $\boldsymbol\alpha_l$. The
Bernoulli form of one item response is

$$
\Pr(X_{ij}\mid\boldsymbol\alpha_l)
=
P_{jl}^{X_{ij}}(1-P_{jl})^{1-X_{ij}},
$$

which selects $P_{jl}$ when $X_{ij}=1$ and $1-P_{jl}$ when $X_{ij}=0$.
Conditional independence gives the profile-conditional likelihood of the full
response vector:

$$
L_{il}=L(\mathbf X_i\mid\boldsymbol\alpha_l)
=
\prod_{j=1}^{J}
P_{jl}^{X_{ij}}(1-P_{jl})^{1-X_{ij}}.
$$

A joint ML approach maximizes over the item parameters and every examinee’s
$\boldsymbol\alpha_i$ simultaneously. The paper identifies the resulting
incidental-parameter problem: consistency of the structural item parameters
need not follow as the number of examinees increases.

[[maximum-likelihood|Marginal maximum likelihood]] instead treats the
attribute profile as a random latent variable and sums over its distribution:

$$
L_i=L(\mathbf X_i)
=
\sum_{l=1}^{L}p_lL_{il},
\qquad
\ell(\boldsymbol\beta)
=
\sum_{i=1}^{I}\log L_i,
$$

where $\boldsymbol\beta=(g_1,s_1,\dots,g_J,s_J)$. The profile proportions
are prior weights before observing a person’s responses, or equivalently the
mixing distribution of the latent-class population; they are not Bayesian
priors on $g_j$ or $s_j$. [[em-algorithm|EM]] computes the marginal ML item
estimates through posterior profile probabilities.

## EM derivation: Appendix A1–A11

This section is a self-contained reconstruction of the paper’s appendix, with
intermediate algebra and the responsibility interpretation made explicit. The
appendix differentiates the observed-data log-likelihood directly; the
$Q$-function interpretation at the end clarifies why the resulting updates
are EM updates.

### Parameter indexing and the marginal score

For a generic item parameter, define

$$
\beta_{j0}=g_j,
\qquad
\beta_{j1}=s_j.
$$

Thus $\beta_{j\eta}$ selects one of the two parameters of item $j$; neither
$j$ nor $\eta$ is a differentiation variable. Differentiating the marginal
log-likelihood gives

$$
\frac{\partial\ell}{\partial\beta_{j\eta}}
=
\sum_{i=1}^{I}
\frac{1}{L_i}
\frac{\partial L_i}{\partial\beta_{j\eta}}
=
\sum_{i=1}^{I}
\frac{1}{L_i}
\sum_{l=1}^{L}
p_l\frac{\partial L_{il}}{\partial\beta_{j\eta}}.
\tag{A3}
$$

The sum over $i$ comes from the log of the product over examinees. The sum
over $l$ comes from differentiating the finite profile mixture.

### Isolating item $j$

Because $\beta_{j\eta}$ occurs only in item $j$’s Bernoulli factor, every
factor with $j'\neq j$ is constant under this derivative. The product rule
therefore gives

$$
\frac{\partial L_{il}}{\partial\beta_{j\eta}}
=
\left[
\prod_{j'\neq j}
P_{j'l}^{X_{ij'}}(1-P_{j'l})^{1-X_{ij'}}
\right]
\frac{\partial}{\partial\beta_{j\eta}}
\left[
P_{jl}^{X_{ij}}(1-P_{jl})^{1-X_{ij}}
\right].
\tag{A4}
$$

### Differentiating the Bernoulli factor

Temporarily write

$$
x=X_{ij},
\qquad
p=P_{jl},
\qquad
p'=\frac{\partial P_{jl}}{\partial\beta_{j\eta}}.
$$

The observed $x$ is fixed. Applying the product rule and chain rule to
$p^x(1-p)^{1-x}$ gives

$$
\begin{aligned}
\frac{\partial}{\partial\beta_{j\eta}}
\left[p^x(1-p)^{1-x}\right]
&=
(1-p)^{1-x}xp^{x-1}p'
+p^x(1-x)(1-p)^{1-x-1}(-p')\\
&=
p^x(1-p)^{1-x}p'
\left[\frac{x}{p}-\frac{1-x}{1-p}\right]\\
&=
p^x(1-p)^{1-x}p'
\frac{x-p}{p(1-p)}.
\end{aligned}
\tag{A5}
$$

The minus sign in the second term is the derivative of $1-p$. Restoring all
the other item factors yields

$$
\frac{\partial L_{il}}{\partial\beta_{j\eta}}
=
L_{il}
\frac{\partial P_{jl}}{\partial\beta_{j\eta}}
\frac{X_{ij}-P_{jl}}{P_{jl}(1-P_{jl})}.
\tag{A6}
$$

This is a profile-conditional Bernoulli score. The residual
$X_{ij}-P_{jl}$ compares the observed binary response with its model
expectation, and $P_{jl}(1-P_{jl})$ is the Bernoulli variance.

### Posterior responsibilities and expected counts

Substitute A6 into A3 and group the likelihood factors:

$$
\frac{\partial\ell}{\partial\beta_{j\eta}}
=
\sum_{i=1}^{I}\sum_{l=1}^{L}
\frac{p_lL_{il}}{L_i}
\frac{\partial P_{jl}}{\partial\beta_{j\eta}}
\frac{X_{ij}-P_{jl}}{P_{jl}(1-P_{jl})}.
$$

Bayes’ rule identifies the normalized weight as the posterior profile
probability, or responsibility,

$$
r_{il}
=
p(\boldsymbol\alpha_l\mid\mathbf X_i)
=
\frac{p_lL_{il}}{L_i}
=
\frac{p_lL_{il}}
{\sum_{l'=1}^{L}p_{l'}L_{il'}}.
$$

The posterior arises from the derivative of the log mixture: each
profile-conditional score is weighted by that profile’s share of the total
likelihood. Substitution and interchange of the finite sums give

$$
\frac{\partial\ell}{\partial\beta_{j\eta}}
=
\sum_{l=1}^{L}
\frac{\partial P_{jl}}{\partial\beta_{j\eta}}
\frac{1}{P_{jl}(1-P_{jl})}
\left[
\sum_{i=1}^{I}r_{il}(X_{ij}-P_{jl})
\right].
$$

The terms outside the examinee sum do not depend on $i$. Define the expected
profile count and expected number correct,

$$
I_l=\sum_{i=1}^{I}r_{il},
\qquad
R_{jl}=\sum_{i=1}^{I}r_{il}X_{ij}.
$$

Expanding the residual then gives

$$
\sum_{i=1}^{I}r_{il}(X_{ij}-P_{jl})
=
\sum_{i=1}^{I}r_{il}X_{ij}
-P_{jl}\sum_{i=1}^{I}r_{il}
=
R_{jl}-P_{jl}I_l.
$$

Consequently,

$$
\frac{\partial\ell}{\partial\beta_{j\eta}}
=
\sum_{l=1}^{L}
\frac{\partial P_{jl}}{\partial\beta_{j\eta}}
\frac{1}{P_{jl}(1-P_{jl})}
\left(R_{jl}-P_{jl}I_l\right).
\tag{A7}
$$

Here $I_l$ is a soft count of examinees belonging to profile $l$, and
$R_{jl}$ is the corresponding soft count correct on item $j$. The term
$R_{jl}-P_{jl}I_l$ compares the posterior-weighted number correct with the
number predicted by the model.

### Splitting profiles by ideal response

Partition the profiles into

$$
\mathcal L_j^{(0)}=\{l:\eta_{lj}=0\},
\qquad
\mathcal L_j^{(1)}=\{l:\eta_{lj}=1\}.
$$

For profiles in $\mathcal L_j^{(0)}$, $P_{jl}=g_j$; for profiles in
$\mathcal L_j^{(1)}$, $P_{jl}=1-s_j$. Aggregate the expected counts within
the two groups:

$$
I_j^{(z)}=\sum_{l\in\mathcal L_j^{(z)}}I_l,
\qquad
R_j^{(z)}=\sum_{l\in\mathcal L_j^{(z)}}R_{jl},
\qquad z\in\{0,1\}.
$$

The score separates into two terms:

$$
\begin{aligned}
\frac{\partial\ell}{\partial\beta_{j\eta}}
={}&
\frac{\partial g_j/\partial\beta_{j\eta}}{g_j(1-g_j)}
\left[R_j^{(0)}-g_jI_j^{(0)}\right]\\
&+
\frac{\partial(1-s_j)/\partial\beta_{j\eta}}{(1-s_j)s_j}
\left[R_j^{(1)}-(1-s_j)I_j^{(1)}\right].
\end{aligned}
\tag{A8–A9}
$$

For $\beta_{j0}=g_j$, only the first term remains and
$\partial g_j/\partial g_j=1$. For $\beta_{j1}=s_j$, only the second term
remains and $\partial(1-s_j)/\partial s_j=-1$.

### Closed-form item updates

For the guessing parameter, setting the remaining score term to zero gives

$$
\frac{R_j^{(0)}-g_jI_j^{(0)}}{g_j(1-g_j)}=0
\quad\Longrightarrow\quad
\widehat g_j=\frac{R_j^{(0)}}{I_j^{(0)}}.
\tag{A10}
$$

For the slip parameter,

$$
-\frac{R_j^{(1)}-(1-s_j)I_j^{(1)}}{(1-s_j)s_j}=0
\quad\Longrightarrow\quad
\widehat s_j
=
\frac{I_j^{(1)}-R_j^{(1)}}{I_j^{(1)}}
=
1-\frac{R_j^{(1)}}{I_j^{(1)}}.
\tag{A11}
$$

Thus guessing is estimated by the expected proportion correct among
nonmasters, and slipping by the expected proportion incorrect among masters.
These are soft proportions because profile membership is represented by
posterior probabilities rather than hard classifications.

### Why these are E and M steps

At iteration $t$, the E step evaluates responsibilities using the current
parameters:

$$
r_{il}^{(t)}
=
\frac{p_l^{(t)}L_{il}^{(t)}}
{\sum_{l'=1}^{L}p_{l'}^{(t)}L_{il'}^{(t)}}.
$$

These responsibilities determine $I_l$, $R_{jl}$, and their two-group sums.
The M step holds the responsibilities fixed and applies A10–A11 to every
item, then recomputes the responsibilities at the updated parameters.

Equivalently, the item-parameter part of the expected complete-data
log-likelihood is

$$
Q(\boldsymbol\beta\mid\boldsymbol\beta^{(t)})
=
\sum_{i=1}^{I}\sum_{l=1}^{L}r_{il}^{(t)}
\sum_{j=1}^{J}
\left\{
X_{ij}\log P_{jl}(\boldsymbol\beta)
+(1-X_{ij})\log[1-P_{jl}(\boldsymbol\beta)]
\right\}.
$$

Maximizing this $Q$ function with $r_{il}^{(t)}$ fixed produces the same
closed-form updates. This $Q$-function statement is an EM reconstruction of
the appendix’s observed-score derivation, not an additional equation quoted
from the paper.

## Standard-error approximation

Appendix A2 derives an information approximation from the per-person observed
scores. If

$$
u_i(\boldsymbol\beta)
=
\frac{\partial\log L_i}{\partial\boldsymbol\beta},
$$

the appendix’s calculation leads to the outer-product form

$$
\mathcal I(\widehat{\boldsymbol\beta})
\approx
\sum_{i=1}^{I}
u_i(\widehat{\boldsymbol\beta})
u_i(\widehat{\boldsymbol\beta})^\top,
\qquad
\widehat{\operatorname{Cov}}(\widehat{\boldsymbol\beta})
\approx
\mathcal I(\widehat{\boldsymbol\beta})^{-1}.
$$

The square roots of the diagonal elements are the reported standard errors.
The derivation starts from the expected-information identity and then
approximates the information at the observed data; the resulting
outer-product expression is not the exact pointwise observed Hessian.

## Notes

- The appendix’s basic algorithm holds the profile proportions $p_l$ fixed
  across expectation cycles. The discussion also describes empirical-Bayes
  updating. If the saturated profile proportions are updated by EM, their
  closed-form update is $\widehat p_l=I_l/I$.
- Exact enumeration involves $L=2^K$ profiles, so computational demand grows
  exponentially with the number of attributes. The paper discusses restricting
  the permissible profiles when an attribute hierarchy supplies such
  structure.
- The higher-order DINA alternative models attribute probabilities through a
  continuous general proficiency. Its parametric attribute distribution uses
  $K+1$ intercept and slope parameters rather than the saturated model’s
  $2^K-1$ free proportions; the paper presents MCMC rather than EM for that
  formulation.
- The empirical illustrations are a 100-replicate simulation with 2,000
  examinees, 30 items, and five attributes, and an analysis of 2,144 examinees
  on 15 fraction-subtraction items. They demonstrate the algorithms rather
  than supplying additional model structure.
