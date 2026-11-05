---
key: chen-2018-general-polytomous-diagnosis
title: Introducing the General Polytomous Diagnosis Modeling Framework
authors: "Chen, Jinsong; de la Torre, Jimmy"
year: 2018
venue: Frontiers in Psychology
doi: 10.3389/fpsyg.2018.01474
model: General polytomous diagnosis model; saturated category-response functions; marginal maximum likelihood via EM
topics: [cdm, polytomous responses, g-dina, q-matrix, marginal maximum likelihood, em]
reviewed: 2026-11-04
description: General polytomous diagnosis modeling through cumulative item splitting, saturated category-response functions, and EM estimation
---

# Introducing the General Polytomous Diagnosis Modeling Framework

## Reference

Chen, J., & de la Torre, J. (2018). Introducing the general polytomous
diagnosis modeling framework. *Frontiers in Psychology*, *9*, Article 1474.
[doi:10.3389/fpsyg.2018.01474](https://doi.org/10.3389/fpsyg.2018.01474)

## Publisher abstract

> Although considerable developments have been added to the cognitive diagnosis modeling literature recently, most have been conducted for dichotomous responses only. This research proposes a general cognitive diagnosis model for polytomous responses—the general polytomous diagnosis model (GPDM), which combines the G-DINA modeling process for dichotomous responses with the item-splitting process for polytomous responses. The polytomous items are specified similar to dichotomous items in the Q-matrix, and the MML estimation is implemented using an EM algorithm. Under the general framework, different saturated forms, and some reduced forms, can be transformed linearly. Model assessment and adjustment under the dichotomous context can be extended to polytomous responses. This simulation study demonstrates the effectiveness of the model when comparing the two response types. The real-data example further illustrates how the proposed model can make a difference in practice.

## Model

The general polytomous diagnosis model (GPDM) combines the G-DINA
response-parametrization process with item splitting for polytomous
responses. Let $X_j\in\{0,1,\dots,C_j-1\}$ be the response to item $j$,
and let the $J\times K$ binary matrix $\mathbf Q$ specify which attributes
each item requires. Under the paper's maximal-information convention,
$q_{jk}=1$ when attribute $k$ is required to score 1 or above on item $j$.
Polytomous items therefore use the same item-level Q-matrix specification
as dichotomous items.

For item $j$, let $G_j=\sum_{k=1}^{K}q_{jk}$ be the number of required
attributes. The full attribute profile reduces to

$$
\boldsymbol\eta_{jh}
=
(\eta_{h1},\dots,\eta_{hG_j})^\top,
\qquad h=1,\dots,H_j=2^{G_j},
$$

which retains only the attributes required by that item. Each reduced
profile corresponds to one latent group for the item.

### Exact and cumulative category probabilities

The exact-category probability is

$$
P_c(\boldsymbol\eta_{jh})
=
\Pr(X_j=c\mid\boldsymbol\eta_{jh}),
\qquad
\sum_{c=0}^{C_j-1}P_c(\boldsymbol\eta_{jh})=1.
$$

The cumulative probability of category $c$ or above is

$$
P_c^*(\boldsymbol\eta_{jh})
=
\Pr(X_j\geq c\mid\boldsymbol\eta_{jh}).
$$

Following the graded-response item-splitting construction, equation (1)
relates the two representations (p. 2):

$$
P_c(\boldsymbol\eta_{jh})
=
P_c^*(\boldsymbol\eta_{jh})
-
P_{c+1}^*(\boldsymbol\eta_{jh}),
$$

with

$$
P_0^*(\boldsymbol\eta_{jh})=1,
\qquad
P_{C_j}^*(\boldsymbol\eta_{jh})=0.
$$

The GPDM is formulated directly in terms of $P_c$, rather than by placing a
particular parametric curve on every $P_c^*$. An item has
$(C_j-1)H_j$ independent category probabilities in its unrestricted form.

An optional monotonicity condition requires cumulative probabilities not to
decrease when more required attributes are mastered:

$$
\boldsymbol\eta_{jh}\geq\boldsymbol\eta_{jh'}
\quad\Longrightarrow\quad
P_c^*(\boldsymbol\eta_{jh})
\geq P_c^*(\boldsymbol\eta_{jh'}).
$$

The paper describes imposing this condition during estimation or checking
it after estimation.

### Saturated category-response functions

Equation (2) gives a saturated G-DINA-type expansion for each exact
category probability (p. 3):

$$
\begin{aligned}
F\left[P_c(\boldsymbol\eta_{jh})\right]
={}&\beta_{jc0}
+\sum_{g=1}^{G_j}\beta_{jcg}\eta_{hg}\\
&+\sum_{g=1}^{G_j-1}\sum_{g'=g+1}^{G_j}
\beta_{jcgg'}\eta_{hg}\eta_{hg'}
+\cdots+
\beta_{jc12\dots G_j}
\prod_{g=1}^{G_j}\eta_{hg}.
\end{aligned}
$$

Here $F$ can be the identity, logit, or log link. The coefficients are the
baseline, main effects, and interactions through the highest-order
interaction for category $c$. Each category therefore has its own
attribute-effect vector. For dichotomous responses, the identity-link form
is G-DINA and the logit-link form is the log-linear cognitive diagnosis
model.

Restrictions on these category-specific coefficients produce reduced
models. For example, the paper's polytomous DINA form retains only the
intercept and full interaction,

$$
P_c(\boldsymbol\eta_{jh})
=
\beta_{jc0}
+
\beta_{jc12\dots G_j}
\prod_{g=1}^{G_j}\eta_{hg},
$$

giving $2(C_j-1)$ parameters per item. Additive forms remove all
interaction terms.

## Likelihood

Let $X_{ijc}=\mathbf 1(X_{ij}=c)$ indicate examinee $i$'s observed category
on item $j$, and let $p(\boldsymbol\alpha_l)$ be the population proportion
of full attribute profile $\boldsymbol\alpha_l$, with

$$
\sum_{l=1}^{L}p(\boldsymbol\alpha_l)=1,
\qquad L=2^K.
$$

Conditional on the attribute profile, item responses are locally
independent. Equation (3) gives the profile-conditional likelihood (p. 3):

$$
L(\mathbf X_i\mid\boldsymbol\alpha_l)
=
\prod_{j=1}^{J}
\prod_{c=0}^{C_j-1}
P_c(\boldsymbol\eta_{jh})^{X_{ijc}},
$$

where $\boldsymbol\eta_{jh}$ is the reduced profile determined by
$\boldsymbol\alpha_l$ and the Q-row for item $j$.

Equation (4) gives the marginal likelihood over the latent profiles:

$$
L(\mathbf X)
=
\prod_{i=1}^{N}
\sum_{l=1}^{L}
L(\mathbf X_i\mid\boldsymbol\alpha_l)
p(\boldsymbol\alpha_l).
$$

Thus the model has the same finite latent-class mixture structure as
dichotomous CDMs, but each item factor is a categorical rather than a
Bernoulli probability.

### EM estimation

The main text presents the marginal likelihood. The closed-form updates in
this subsection come from the Appendix in Supplementary Material. For the
saturated identity-link model, define the posterior expected count for
reduced profile $\boldsymbol\eta_{jh}$ and its expected count in category
$c$:

$$
N_{jh}
=
\sum_{i=1}^{N}
\Pr(\boldsymbol\eta_{jh}\mid\mathbf X_i),
$$

$$
R_{jhc}
=
\sum_{i=1}^{N}
\Pr(\boldsymbol\eta_{jh}\mid\mathbf X_i)X_{ijc}.
$$

The closed-form category-probability update is

$$
\widehat P_c(\boldsymbol\eta_{jh})
=
\frac{R_{jhc}}{N_{jh}}.
$$

Equivalently, the cumulative probabilities are updated by summing these
category proportions from $c$ through $C_j-1$. The profile posterior is
recomputed from the marginal likelihood, and the saturated profile
proportions are updated by their posterior means:

$$
p(\boldsymbol\alpha_l)^{\mathrm{new}}
=
\frac1N
\sum_{i=1}^{N}
\Pr(\boldsymbol\alpha_l\mid\mathbf X_i).
$$

The paper also defines design-matrix transformations from estimated
category probabilities to item-effect coefficients, with weighted least
squares used for reduced forms.

## Notes

- The cumulative splitting follows the graded-response construction of
  [[samejima-1969-graded-response-model|Samejima (1969)]], but GPDM places
  its saturated parametrization directly on exact-category probabilities.
- GPDM differs from
  [[ma-2016-sequential-cognitive-diagnosis|sequential G-DINA]] in how the
  polytomous response is generated. GPDM uses cumulative item splitting;
  sequential G-DINA uses conditional processing functions for successive
  steps.
- For dichotomous items, GPDM reduces to G-DINA under the identity link and
  to the LCDM under the logit link.
