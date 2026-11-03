---
description: The likelihood and log-likelihood, score and Fisher information, invariance, asymptotic properties, and how MLEs are computed and can fail
---

# Maximum Likelihood Estimation

Maximum likelihood is the most widely used method of
[point estimation](/modeling/estimation): choose the parameter value under
which the observed data are most probable. For an iid sample
$X_1, \dots, X_n$ from a density or mass function $f(x \mid \theta)$, the
likelihood function is the joint density viewed as a function of $\theta$
with the data held fixed:

$$
L(\theta \mid \mathbf{x}) = \prod_{i=1}^{n} f(x_i \mid \theta), \qquad
\hat\theta = \arg\max_{\theta \in \Theta} L(\theta \mid \mathbf{x}) .
$$

The likelihood is *not* a probability distribution over $\theta$; it need not
integrate to anything in particular. $\hat\theta(\mathbf{X})$ is the maximum
likelihood *estimator*, its realized value the maximum likelihood *estimate*
(both abbreviated MLE). The maximization runs over the parameter space
$\Theta$ only, and the range of the MLE therefore coincides with the range of
the parameter.

## Log-likelihood, score, and information

Because the logarithm is strictly increasing, $L$ and its logarithm are
maximized at the same point, and the log-likelihood is almost always easier
to work with:

$$
\ell(\theta) = \log L(\theta \mid \mathbf{x}) = \sum_{i=1}^{n} \log f(x_i \mid \theta) .
$$

When $\ell$ is differentiable, interior candidates for the MLE solve the
*likelihood equations*, $\partial \ell / \partial \theta_j = 0$ for each
component. The gradient $s(\theta) = \nabla_\theta \ell(\theta)$ is the
**score**. Two cautions: a zero score is necessary, not sufficient — roots
can be minima, saddle points, or local maxima — and a maximum on the boundary
of $\Theta$ need not have zero score at all, so boundaries are checked
separately.

The **Fisher information** in one observation is

$$
I_1(\theta) = E_\theta\!\left[\left(\frac{\partial}{\partial\theta} \log f(X \mid \theta)\right)^2\right]
= -E_\theta\!\left[\frac{\partial^2}{\partial\theta^2} \log f(X \mid \theta)\right],
$$

where the second form requires regularity conditions (differentiation and
integration interchangeable). An iid sample of size $n$ carries
$I_n(\theta) = n I_1(\theta)$; for a parameter vector, $I(\theta)$ is the
matrix with entries $-E[\partial^2 \ell / \partial\theta_j\,\partial\theta_k]$
per observation. Larger information means a sharper likelihood and a smaller
achievable variance: the Cramér–Rao bound states that an unbiased estimator
$W$ of $\tau(\theta)$ satisfies
$\operatorname{Var}_\theta(W) \ge [\tau'(\theta)]^2 / I_n(\theta)$.
The **observed information** $-\ell''(\hat\theta)$ (more generally the
negative Hessian at $\hat\theta$) is the curvature actually seen in the
sample and is the usual basis for standard errors in software output.

## Worked example: Bernoulli trials

For $n$ iid $\mathrm{Bernoulli}(p)$ trials with $y = \sum_i x_i$ successes,

$$
\ell(p) = y \log p + (n - y) \log(1 - p), \qquad
\ell'(p) = \frac{y}{p} - \frac{n - y}{1 - p},
$$

so the score is zero at $\hat p = y/n$, and $\ell''(p) < 0$ throughout
$(0,1)$ confirms a maximum. The boundary cases matter: if $y = 0$ or $y = n$
the log-likelihood is monotone and $\hat p = y/n$ still holds, but only
because $p = 0$ and $p = 1$ belong to the parameter space.

With $n = 20$ and $y = 7$: $\hat p = 0.35$, and both the observed and
expected information at $\hat p$ equal $n / [\hat p(1 - \hat p)] = 87.91$,
giving

$$
\widehat{\operatorname{SE}}(\hat p) = \sqrt{\frac{\hat p(1 - \hat p)}{n}} = 0.1067,
\qquad
\text{95\% Wald CI} = 0.35 \pm 1.96 \times 0.1067 = (0.141,\ 0.559) .
$$

**Invariance.** If $\hat\theta$ is the MLE of $\theta$, then $\tau(\hat\theta)$
is the MLE of $\tau(\theta)$ for any function $\tau$ (for non-one-to-one
$\tau$, via the induced likelihood
$L^*(\eta) = \sup_{\theta:\, \tau(\theta) = \eta} L(\theta)$). On the example
above, the MLE of the log-odds is simply
$\log[\hat p/(1 - \hat p)] = \log(0.35/0.65) = -0.619$ — no refitting.
Invariance also gives the normal-theory results in one step: the MLE of
$(\mu, \sigma^2)$ is $(\bar X,\ \frac{1}{n}\sum_i (X_i - \bar X)^2)$, whose
variance component is biased but beats $S^2$ on
[MSE](/modeling/estimation).

## Large-sample properties

Under regularity conditions (identified model, smooth likelihood, the true
$\theta_0$ interior to $\Theta$, and dominance conditions that let the
log-likelihood converge uniformly), the MLE has the properties that make it
the default:

- **Consistency**: $\hat\theta \xrightarrow{p} \theta_0$.
- **Asymptotic normality and efficiency**:
  $\sqrt{n}(\hat\theta - \theta_0) \xrightarrow{d}
  \mathrm{Normal}(0, I_1(\theta_0)^{-1})$, so the asymptotic variance
  attains the Cramér–Rao bound. In the vector case the limiting covariance
  matrix is $I(\theta_0)^{-1}$.
- **Practical inference**: standard errors come from the diagonal of the
  inverse observed (or expected) information matrix, yielding Wald intervals
  and tests as in the Bernoulli example.

The Taylor expansion behind the second property also explains the standard
errors: $\ell'(\hat\theta) = 0$ expanded around $\theta_0$ gives
$\sqrt{n}(\hat\theta - \theta_0) \approx
[-\ell''(\theta_0)/n]^{-1} \cdot \ell'(\theta_0)/\sqrt{n}$, where the
numerator is asymptotically normal by the central limit theorem and the
denominator converges to $I_1(\theta_0)$. None of this promises finite-sample
optimality: in small samples other estimators can dominate, and the
properties assume the model family is correctly specified (sandwich or robust
standard errors are the usual remedy when only the variance calculation is in
doubt).

## Computing the MLE

Closed-form solutions exist for textbook families but are the exception in
latent-variable modeling. The standard numerical routes:

- **Newton–Raphson**: iterate
  $\theta^{(t+1)} = \theta^{(t)} - [\ell''(\theta^{(t)})]^{-1} \ell'(\theta^{(t)})$;
  fast locally, but needs first and second derivatives and a good start.
- **Fisher scoring**: replace the observed Hessian by its expectation
  $-I(\theta)$; equivalent to iteratively reweighted least squares in
  generalized linear models.
- **[EM](/modeling/em-algorithm)**: for models with latent variables or
  missing data; derivative-free and guaranteed to increase the likelihood at
  every iteration, at the price of slower convergence.
- General-purpose optimizers (quasi-Newton methods such as BFGS) when
  derivatives are expensive; multiple starts are prudent whenever the
  likelihood may be multimodal.

## Failure modes

- **Multiple roots and local maxima.** The likelihood equations can have
  several solutions; the global maximum is not distinguished by the score
  being zero. Analyze the likelihood before trusting one optimization run.
- **Boundary maxima.** At a boundary solution the score is nonzero and the
  usual asymptotic normal approximation centered at $\hat\theta$ with
  information-based SEs does not apply directly.
- **Flat or nearly flat likelihoods.** Weakly identified parameters produce
  estimates that are numerically unstable: small changes in the data can move
  the MLE dramatically. Inspecting the curvature (the observed information)
  is the diagnostic.
- **Nonidentification.** If different parameter values give the same
  distribution of the data, no estimator can separate them — identification
  precedes estimation in the [workflow](/modeling/).
- **Unbounded likelihoods.** Some families, notably normal mixtures, have no
  finite global maximum (a component can collapse onto one observation with
  variance shrinking to zero); see [EM](/modeling/em-algorithm) for the
  standard example.
