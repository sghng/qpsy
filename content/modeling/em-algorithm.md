---
description: The expectation–maximization algorithm for ML and MAP estimation with latent variables or missing data — E and M steps, monotonicity, convergence behavior, and a Gaussian-mixture example
---

# The EM Algorithm

The expectation–maximization (EM) algorithm computes
[maximum likelihood](/modeling/maximum-likelihood) (or MAP) estimates when
the model involves **latent variables or missing data**. The observed-data
likelihood requires summing or integrating over what is unobserved and is
often intractable to maximize directly, while the *complete-data* likelihood
— the one that would apply if the latent quantities were known — is easy. EM
trades the hard maximization for a sequence of easy ones.

Page-local notation: $\mathbf{Y}$ is the observed data, $\mathbf{U}$ the
unobserved latent or missing data, and $\theta$ the parameter (scalar or
vector). The observed-data likelihood is

$$
L(\theta \mid \mathbf{y}) = p(\mathbf{y} \mid \theta)
= \int p(\mathbf{y}, \mathbf{u} \mid \theta)\, d\mathbf{u},
$$

with a sum replacing the integral for discrete $\mathbf{U}$.

## The two steps

Starting from an initial value $\theta^{(0)}$, alternate:

**E step.** Compute the expected complete-data log-likelihood, taking the
expectation over the latent data given the observed data and the *current*
parameters:

$$
Q(\theta \mid \theta^{(t)})
= E_{\mathbf{U} \mid \mathbf{y},\, \theta^{(t)}}
\!\left[\log p(\mathbf{y}, \mathbf{U} \mid \theta)\right].
$$

**M step.** Maximize that expectation and update:

$$
\theta^{(t+1)} = \arg\max_{\theta} Q(\theta \mid \theta^{(t)}).
$$

Iterate until the parameters or the log-likelihood barely change. In the
common case where the complete-data model is an exponential family, the E
step reduces to computing the expected *sufficient statistics* and the M step
often has a closed form. For MAP estimation, add the log prior to $Q$ in the
M step; everything else is unchanged.

## Why the likelihood never decreases

Write $k(\mathbf{u} \mid \theta, \mathbf{y}) = p(\mathbf{y}, \mathbf{u} \mid \theta) / p(\mathbf{y} \mid \theta)$
for the conditional density of the latent data. Then
$\log L(\theta \mid \mathbf{y}) = \log p(\mathbf{y}, \mathbf{u} \mid \theta) - \log k(\mathbf{u} \mid \theta, \mathbf{y})$,
and taking expectations under $k(\cdot \mid \theta^{(t)}, \mathbf{y})$ gives

$$
\ell(\theta) = Q(\theta \mid \theta^{(t)}) + H(\theta \mid \theta^{(t)}),
\qquad
H(\theta \mid \theta^{(t)}) = -E\!\left[\log k(\mathbf{U} \mid \theta, \mathbf{y}) \,\middle|\, \theta^{(t)}, \mathbf{y}\right].
$$

By Gibbs' inequality (a consequence of Jensen's inequality),
$H(\theta \mid \theta^{(t)}) \ge H(\theta^{(t)} \mid \theta^{(t)})$.
Any $\theta$ that improves $Q$ beyond its value at $\theta^{(t)}$ therefore
improves $\ell$ by at least as much, and the M step chooses exactly such a
$\theta$. Every EM iteration satisfies

$$
L(\theta^{(t+1)} \mid \mathbf{y}) \ge L(\theta^{(t)} \mid \mathbf{y}),
$$

with equality only when the maximized $Q$ no longer changes.

## What EM converges to — and what it does not

Monotone likelihood increase is *not* a guarantee of finding the MLE. The
precise picture:

- Under regularity conditions the sequence converges to a **stationary
  point** of the observed-data likelihood — usually a local maximum, but
  saddle points are possible. The original 1977 convergence analysis was
  flawed; the corrected analysis is due to Wu (1983).
- **Global maxima are not guaranteed.** Multimodal likelihoods mean the
  solution depends on $\theta^{(0)}$; random or informed multiple starts are
  standard practice.
- **Singular solutions exist in some families.** In a normal mixture the
  likelihood is unbounded: a component centered on a single observation with
  variance shrinking to zero drives it to infinity. EM can walk toward such
  degenerate solutions, so mixture fits need constraints or inspection.
- **Convergence is linear and can be slow**, especially when the missing
  information is large. The monotone, derivative-free steps are the benefit;
  speed is the cost. General-purpose optimizers on the observed-data
  likelihood are the alternative when derivatives are available.

## Worked example: a two-component Gaussian mixture

Observations $x_1, \dots, x_n$ come from a mixture of two normals with weight
$\pi$ on component 1. The latent $u_i \in \{1, 2\}$ indicates which component
generated $x_i$; knowing the $u_i$ would reduce estimation to two independent
normal-theory problems. The E step computes each point's *responsibility* for
component 1,

$$
r_{i1} = \frac{\pi\, \phi(x_i; \mu_1, \sigma_1)}
{\pi\, \phi(x_i; \mu_1, \sigma_1) + (1 - \pi)\, \phi(x_i; \mu_2, \sigma_2)},
\qquad r_{i2} = 1 - r_{i1},
$$

where $\phi(\cdot; \mu, \sigma)$ is the normal density, and the M step is a
responsibility-weighted refit with $N_k = \sum_i r_{ik}$:

$$
\pi = \frac{N_1}{n}, \qquad
\mu_k = \frac{\sum_i r_{ik} x_i}{N_k}, \qquad
\sigma_k^2 = \frac{\sum_i r_{ik} (x_i - \mu_k)^2}{N_k}.
$$

A simulated sample ($n = 200$, true $\pi = 0.4$, $\mu = (0, 4)$,
$\sigma = (1, 1)$, seed 42; computations in Python) run from a dispersed
start ($\pi = 0.5$, means at $\bar x \pm s$, $\sigma_1 = \sigma_2 = s$):

| $t$ | $\ell(\theta^{(t)})$ | $\pi$ | $\mu_1$ | $\mu_2$ | $\sigma_1$ | $\sigma_2$ |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | $-475.707$ | 0.500 | 0.076 | 4.798 | 2.361 | 2.361 |
| 1 | $-443.928$ | 0.482 | 0.801 | 3.956 | 1.973 | 1.531 |
| 2 | $-437.957$ | 0.477 | 0.631 | 4.083 | 1.889 | 1.311 |
| 3 | $-433.112$ | 0.471 | 0.471 | 4.188 | 1.739 | 1.157 |
| 5 | $-428.151$ | 0.447 | 0.204 | 4.240 | 1.444 | 1.056 |
| 10 | $-423.339$ | 0.394 | $-0.156$ | 4.126 | 1.078 | 1.105 |
| 20 | $-423.064$ | 0.380 | $-0.233$ | 4.072 | 1.014 | 1.150 |
| 45 | $-423.063$ | 0.379 | $-0.236$ | 4.069 | 1.012 | 1.152 |

The log-likelihood increased at every one of the 45 iterations (checked
programmatically), quickly at first and then in tiny increments — the typical
EM pattern. Two observations: the converged log-likelihood ($-423.063$)
*exceeds* the log-likelihood at the true parameter values ($-426.970$),
because the MLE fits this particular sample, not the population; and
responsibilities are soft assignments — EM with hard assignments
($r_{ik} \in \{0, 1\}$) reduces to $k$-means-like alternating classification,
which does not share the monotonicity guarantee for the mixture likelihood.

## Variants and applications

- **ECM (expectation–conditional maximization)** splits the M step into
  simpler conditional maximizations when the joint maximization is awkward.
- **MCEM** approximates an intractable E step by Monte Carlo; the exact
  monotonicity property then holds only approximately.
- **MM (minorize–maximize)** algorithms generalize the construction: EM is
  the special case where $Q + \text{const}$ minorizes $\ell$.

In quantitative psychology the main application is **marginal maximum
likelihood**: the latent variable is integrated out of the likelihood and EM
handles the integration iteratively. In [IRT](/topics/irt) the latent trait
plays the role of $\mathbf{U}$; in [CDM](/topics/cdm) it is the attribute
profile, with up to $2^K$ latent classes. Other standard uses include finite
mixtures generally, missing-data problems, and hidden Markov models (where EM
is known as the Baum–Welch algorithm).
