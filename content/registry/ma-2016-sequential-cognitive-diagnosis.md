---
key: ma-2016-sequential-cognitive-diagnosis
title: A sequential cognitive diagnosis model for polytomous responses
authors: "Ma, Wenchao; de la Torre, Jimmy"
year: 2016
venue: British Journal of Mathematical and Statistical Psychology
doi: 10.1111/bmsp.12070
model: Sequential G-DINA; category-level Q-matrix; marginal maximum likelihood via EM
topics: [cdm, polytomous responses, sequential g-dina, q-matrix, marginal maximum likelihood, em]
reviewed: 2026-11-04
description: Sequential category attainment with a category-level Q-matrix, processing functions, and EM estimation for polytomous cognitive diagnosis
---

# A Sequential Cognitive Diagnosis Model for Polytomous Responses

## Reference

Ma, W., & de la Torre, J. (2016). A sequential cognitive diagnosis model for
polytomous responses. *British Journal of Mathematical and Statistical
Psychology*, *69*(3), 253–275.
[doi:10.1111/bmsp.12070](https://doi.org/10.1111/bmsp.12070)

## Publisher abstract

> This paper proposes a general polytomous cognitive diagnosis model for a special type of graded responses, where item categories are attained in a sequential manner, and associated with some attributes explicitly. To relate categories to attributes, a category-level Q-matrix is used. When the attribute and category association is specified *a priori*, the proposed model has the flexibility to allow different cognitive processes (e.g., conjunctive, disjunctive) to be modelled at different categories within a single item. This model can be extended for items where categories cannot be explicitly linked to attributes, and for items with unordered categories. The feasibility of the proposed model is examined using simulated data. The proposed model is illustrated using the data from the Trends in International Mathematics and Science Study 2007 assessment.

## Model

The sequential [[cdm|cognitive diagnosis model]] applies to items whose
categories are attained in order. Item $j$ has $H_j+1$ categories,
$0,1,\dots,H_j$. An examinee in category $h$ has completed steps
$1,\dots,h$ but has not completed step $h+1$. Category 0 denotes failure
on the first step, and category $H_j$ denotes completion of every step.

Let $\boldsymbol\alpha_c=(\alpha_{c1},\dots,\alpha_{cK})$ be one of the
$2^K$ binary attribute profiles. The processing function for category $h$
is the conditional probability of completing that step given completion of
the preceding step:

$$
S_j(h\mid\boldsymbol\alpha_c)
=
\Pr(\text{complete step }h\mid\text{step }h-1\text{ completed},
\boldsymbol\alpha_c).
$$

The boundary conventions are

$$
S_j(0\mid\boldsymbol\alpha_c)=1,
\qquad
S_j(H_j+1\mid\boldsymbol\alpha_c)=0.
$$

Equation (1) of the paper gives the resulting category-response function
(p. 256):

$$
\Pr(X_j=h\mid\boldsymbol\alpha_c)
=
\left[1-S_j(h+1\mid\boldsymbol\alpha_c)\right]
\prod_{x=0}^{h}S_j(x\mid\boldsymbol\alpha_c),
\qquad h=0,\dots,H_j.
$$

Thus category $h$ combines success on the first $h$ processing steps with
failure on step $h+1$. The terminal convention makes the last category the
product of all step-success probabilities. These probabilities sum to one
over $h=0,\dots,H_j$.

### Category-level Q-matrix

The $Q_C$-matrix specifies attribute requirements at the category level. It
has $\sum_{j=1}^{J}H_j$ rows and $K$ columns, with $H_j$ rows contributed by
item $j$. A row indicates which attributes are required to complete the
corresponding processing step, given that all preceding steps were
completed. Category 0 requires no attribute. When every item is
dichotomous, $Q_C$ reduces to the traditional item-level Q-matrix.

The restricted $Q_C$ uses only the attributes assigned to each category's
own processing step. This specification supports different cognitive
processes at different steps of the same item. The unrestricted $Q_C$
assigns every attribute required by the item to every category and is used
when the attribute–category association is not specified in advance. The
resulting models are called RS-GDINA and US-GDINA, respectively.

### Saturated processing function

The paper applies the G-DINA structure to each processing function (eq. 2,
p. 257). Suppose category $h$ of item $j$ requires $K_{jh}$ attributes and
let $\boldsymbol\alpha_l^{jh}$ denote the corresponding reduced attribute
profile. Under the identity link,

$$
\begin{aligned}
S_j(h\mid\boldsymbol\alpha_l^{jh})
={}&\phi_{jh0}
+\sum_{k=1}^{K_{jh}}\phi_{jhk}\alpha_{lk}\\
&+\sum_{k=1}^{K_{jh}-1}\sum_{k'=k+1}^{K_{jh}}
\phi_{jhkk'}\alpha_{lk}\alpha_{lk'}
+\cdots+
\phi_{jh12\dots K_{jh}}
\prod_{k=1}^{K_{jh}}\alpha_{lk}.
\end{aligned}
$$

The terms are the intercept, main effects, and interactions through the
highest-order interaction. A category with $K_{jh}$ required attributes has
$2^{K_{jh}}$ free processing-function parameters in this saturated form.
Log and logit links are also available. Constraints on the coefficients
produce DINA, DINO, additive, log-linear, and reduced-RUM processing
functions.

## Likelihood

Conditional on an examinee's attribute profile, item responses are locally
independent. With $X_{ij}$ denoting examinee $i$'s category on item $j$,
the profile-conditional likelihood can be written as

$$
L(\mathbf X_i\mid\boldsymbol\alpha_c)
=
\prod_{j=1}^{J}
\prod_{h=0}^{H_j}
\Pr(X_j=h\mid\boldsymbol\alpha_c)^{\mathbf 1(X_{ij}=h)}.
$$

Let $p(\boldsymbol\alpha_c)$ be the population proportion of profile
$\boldsymbol\alpha_c$. The marginal likelihood for one examinee is

$$
L(\mathbf X_i)
=
\sum_{c=1}^{2^K}
p(\boldsymbol\alpha_c)
L(\mathbf X_i\mid\boldsymbol\alpha_c),
$$

and the full log-likelihood sums $\log L(\mathbf X_i)$ over independently
sampled examinees. This profile-level expression makes the latent-class
mixture explicit; the paper presents the corresponding itemwise EM
calculations on pp. 258–259.

The E step forms posterior profile probabilities and expected category
counts. At the full-profile level, the corresponding posterior can be
written as

$$
\Pr(\boldsymbol\alpha_c\mid\mathbf X_i)
=
\frac{p(\boldsymbol\alpha_c)L(\mathbf X_i\mid\boldsymbol\alpha_c)}
{\sum_{c'=1}^{2^K}p(\boldsymbol\alpha_{c'})
L(\mathbf X_i\mid\boldsymbol\alpha_{c'})}.
$$

The paper works with item-specific reduced profiles and their collapsed
latent groups. For such a reduced profile $\boldsymbol\alpha_l^{j}$ and
category $h$, it writes the expected count as

$$
\bar r_{ljh}
=
\sum_{i=1}^{N}
\mathbf 1(X_{ij}=h)
\Pr(\boldsymbol\alpha_l^{j}\mid\mathbf X_i).
$$

The M step maximizes the expected complete-data item objective

$$
\ell_j
=
\sum_{l=1}^{2^{K_j}}
\sum_{h=0}^{H_j}
\bar r_{ljh}
\log \widehat P(X_j=h\mid\boldsymbol\alpha_l^{j})
$$

with respect to the processing-function coefficients. The paper describes
Nelder–Mead optimization and a quasi-Newton alternative. The saturated
profile proportions are updated by their posterior means:

$$
p(\boldsymbol\alpha_c)^{\mathrm{new}}
=
\frac1N\sum_{i=1}^{N}
\Pr(\boldsymbol\alpha_c\mid\mathbf X_i).
$$

For US-GDINA, the expected category proportions have closed-form updates:

$$
\widehat P(X_j=h\mid\boldsymbol\alpha_l^{j})
=
\frac{
\sum_{i=1}^{N}\mathbf 1(X_{ij}=h)
\Pr(\boldsymbol\alpha_l^{j}\mid\mathbf X_i)
}{
\sum_{i=1}^{N}\Pr(\boldsymbol\alpha_l^{j}\mid\mathbf X_i)
}.
$$

The category-response equation then recovers the processing functions,
and the saturated coefficient vector follows through the corresponding
design matrix.

## Notes

- The processing-function definition follows the sequential-response
  construction associated with Samejima (1995), rather than the adjacent
  difference of cumulative probabilities used in Samejima's 1969
  graded-response model.
- For dichotomous items, sequential G-DINA reduces to G-DINA. The paper
  also establishes equivalences between US-GDINA and a nominal-response
  diagnostic formulation through the category-response functions.
- RS-GDINA and US-GDINA differ in their $Q_C$ construction and generally in
  parameter count. The former uses category-specific attribute assignment;
  the latter assigns every item attribute to every category.
