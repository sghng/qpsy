---
description: Point-biserial, biserial, phi, and tetrachoric correlations — SD conventions, ceiling values under dichotomization, latent-normal conversions, and matrix cautions
---

# Correlations Involving Binary Variables

Pearson's correlation describes *linear* association between two quantitative
variables ([Correlation](/topics/measurement/correlation)).
Measurement data routinely break that shape: a 0/1 item score paired with a
continuous total score, or two binary items paired with each other. The
coefficients in this note adapt correlation to those cases. Each adaptation
embeds a model of **how the binary variable arose**, and that model — not
arithmetic — determines the largest value the coefficient can attain and what
an estimate means.

Throughout, $X$ is a continuous variable (typically a total score), $Y\in\{0,1\}$
a binary variable (typically an item score, 1 = correct), $\bar X_1$ and
$\bar X_0$ the means of $X$ among cases with $Y=1$ and $Y=0$, $n_1$ and $n_0$
the counts of those cases, $n=n_0+n_1$, and $p=n_1/n$, $q=1-p$. Two
standard-normal functions recur: $\varphi(\cdot)$ is the standard normal
density and $\Phi(\cdot)$ its cumulative distribution function (see
[Probability](/topics/foundations/probability)). The **phi coefficient**
below is written $\phi$; it is a correlation for 2×2 tables, a different
object from the density $\varphi$.

## Point-biserial correlation

The **point-biserial correlation** $r_{pb}$ is Pearson's $r$ computed between
$X$ and the 0/1 scores of $Y$. Because $Y$ takes only two values, the general
formula collapses into a difference between group means, and the collapsed
form depends on which standard-deviation convention is used for $X$. With the
*sample* standard deviation $s_x$ (divisor $n-1$),

$$
r_{pb} = \frac{\bar X_1 - \bar X_0}{s_x}\sqrt{\frac{n_1 n_0}{n(n-1)}},
$$

and with the *population* form $\hat\sigma_x$ (divisor $n$),

$$
r_{pb} = \frac{\bar X_1 - \bar X_0}{\hat\sigma_x}\sqrt{p(1-p)} .
$$

Each pairing reproduces Pearson's $r$ exactly; this follows by substituting
the binary moments of $Y$ (in particular, the sample variance of $Y$ with
divisor $n-1$ is $npq/(n-1)$) into the Pearson formula. The two conventions
must not be mixed: pairing the $n-1$ standard deviation with the
$\sqrt{p(1-p)}$ multiplier **understates** $r$ by a factor
$\sqrt{(n-1)/n}$; the reverse mismatch overstates it by $\sqrt{n/(n-1)}$.
A report should state which convention its software and formulas use.

**Interpretation as item discrimination.** In item analysis, $r_{pb}$
expresses how well the item separates higher from lower scorers: positive
values mean the $Y=1$ group averages higher on $X$. When $X$ is the total
score that contains the item itself, the correlation is mechanically inflated
by part–whole overlap — the item correlates with itself through the total.
The standard remedy is the **item-rest (corrected item–total) correlation**
$r_{pb(-i)}$, the point-biserial correlation between item $i$ and the rest
score (the total with item $i$ removed); $r_{pb(-i)}$ is generally smaller
than the item–total version. Screening rules and the practical interpretation
of these indices belong to
[Classical Item Analysis](/topics/measurement/item-analysis).

When *both* variables are dichotomous, the same reduction yields the phi
coefficient of the 2×2 table: the point-biserial coefficient is then
identical to $\phi$ (below).

## The ceiling under a normal threshold

Although $r_{pb}$ looks like an ordinary correlation, it cannot reach $\pm 1$
when $Y$ arises by thresholding a normally distributed $X$. The population
correlation of $(X, Y)$ with $E(X)=\mu$, standard deviation $\sigma_X$, and
$P(Y=1)=p$ is

$$
\rho_{XY} = \frac{E[(X-\mu)(Y-p)]}{\sigma_X\sqrt{p(1-p)}} .
$$

Among all binary variables $Y$ with success probability $p$, this quantity is
largest when $Y=1$ exactly for the largest $p$ proportion of $X$ — a
threshold rule. Writing $\xi_p$ for the standardized cutoff satisfying
$\int_{\xi_p}^{\infty}\varphi(z)\,dz = p$, the maximum is

$$
\max \rho_{pb} = \frac{\varphi(\xi_p)}{\sqrt{p(1-p)}} .
$$

The bound depends on nothing but $p$, is symmetric in $p \leftrightarrow 1-p$,
and is undefined at $p=0$ or $p=1$, where $Y$ has no variance at all:

| $p$ | .05 | .10 | .25 | .30 | .50 | .70 | .90 | .95 |
|---|---|---|---|---|---|---|---|---|
| $\max \rho_{pb}$ | .4732 | .5850 | .7339 | .7587 | .7979 | .7587 | .5850 | .4732 |

The maximum is $.7979$ at $p=.5$: a simulated normal sample with $Y=1$
exactly when $X$ exceeds its median yields $r_{pb}\approx .798$. Three
consequences follow.

1. **The point-biserial coefficient is not scaled over $[-1,1]$ under this
   model.** An item with difficulty far from .5 cannot show a large
   point-biserial correlation even when the underlying association is
   perfect, and the ceiling falls as difficulty becomes extreme.
2. **A sample value above $.8$ is not an error by itself.** The bound is a
   *population* ceiling under a *marginal-normal* $X$; a sample statistic can
   exceed the population bound, and a non-normal $X$ removes the bound
   entirely (next section).
3. **Comparisons across items with different difficulties are comparisons
   against different ceilings** — the same numerical $r_{pb}$ is closer to
   its ceiling for an extreme item than for a moderate one.

## Contrast: the two-component normal mixture

The $.7979$ ceiling is a property of the threshold model, not of the
coefficient. Suppose instead that $X$ is generated *within* the two groups:
$X\mid Y=1 \sim N(\mu_1,\sigma^2)$ and $X\mid Y=0 \sim N(\mu_0,\sigma^2)$
with equal variances, so the marginal distribution of $X$ is a mixture of two
normals rather than a single normal. With the standardized separation
$\Delta=(\mu_1-\mu_0)/\sigma$,

$$
\rho_{pb} = \frac{\Delta\sqrt{pq}}{\sqrt{1 + pq\,\Delta^2}} .
$$

The coefficient equals zero at $\Delta=0$ and approaches $\pm 1$ as
$|\Delta|\to\infty$ (at $\Delta=1$, $p=.5$ it equals $.4472$). So whether a
point-biserial correlation *can* approach $\pm 1$ depends on which model
generated the data: thresholding a single normal caps it below $.8$, while a
separable two-group mixture does not. The lesson for practice is diagnostic,
not defeatist — a large $r_{pb}$ signals that $X$ is not marginally normal
with $Y$ a threshold of it.

## Biserial correlation

The **biserial correlation** assumes the binary variable is a dichotomized
*continuous* variable: a latent $Y^{*}$, jointly normal with $X$, is observed
as $Y=1$ when $Y^{*}$ exceeds a cutoff. The biserial coefficient $\rho_{bis}$
estimates the Pearson correlation between $X$ and the unobserved $Y^{*}$ —
for example, a pass/fail training record dichotomizes a continuous
performance dimension. With $p$ the proportion with $Y=1$,

$$
\rho_{bis} = \frac{\mu_1-\mu_0}{\sigma_x}\cdot\frac{\sqrt{p(1-p)}}{\varphi\!\left(\Phi^{-1}(p)\right)}
= \rho_{pb}\cdot\frac{\sqrt{p(1-p)}}{\varphi\!\left(\Phi^{-1}(p)\right)},
$$

where $\mu_1,\mu_0$ are the $X$-means of the two observed groups and
$\sigma_x$ the standard deviation of $X$. (Because the normal density is
symmetric, $\varphi(\Phi^{-1}(p))=\varphi(\Phi^{-1}(1-p))$; the multiplier
must correspond to the group named in the numerator.) The sample version
substitutes $\hat p$ and the sample means into the same expression.

The conversion factor exceeds 1 for every $p\in(0,1)$, so the biserial
estimate is always larger in magnitude than the point-biserial value:

| $p$ | .10 | .30 | .50 | .60 | .90 |
|---|---|---|---|---|---|
| factor | 1.7094 | 1.3180 | 1.2533 | 1.2680 | 1.7094 |

**Worked conversion.** An item with $r_{pb}=.29$ answered correctly by
$p=.6$ of examinees has conversion factor $1.2680$ and
$\hat\rho_{bis}=.29\times1.2680=.3677$. Conversely, the biserial coefficient
recovers a latent correlation that restriction to two observed groups
attenuates: in simulated data with true $\rho(X,Y^{*})=.6$ and a cutoff
placing $30\%$ of cases at $Y=1$, the sample yields $r_{pb}=.4556$ but
$r_{bis}=.6003$.

**Tate's bound.** The factor is smallest at $p=.5$. The sharp inequality

$$
\Phi(x)\bigl(1-\Phi(x)\bigr) \;\ge\; \tfrac{\pi}{2}\,\varphi^2(x),
\qquad\text{equality only at } x=0,
$$

known from Tate's analysis of the point-biserial coefficient, gives

$$
\frac{\rho_{bis}}{\rho_{pb}} \ge \sqrt{\pi/2} \approx 1.2533,
\qquad\text{equivalently}\qquad
r_{pb} \le 0.7979\, r_{bis},
$$

which is the exact constant behind the rule of thumb that a point-biserial
value is at most about eight-tenths of the corresponding biserial value.

**Range and failures.** At $p=.5$ the point-biserial ceiling ($.7979$) times
the factor ($1.2533$) is exactly 1, so the *population* biserial correlation
does span $[-1,1]$. But the *sample* estimate inherits sampling error
without any built-in bound and is undefined at $\hat p=0$ or $1$: with
$X=(9,9,17,17)$ and $Y=(0,0,1,1)$, the data show perfect separation
($r_{pb}=1.0000$, $\hat p=.5$), yet

$$
\hat\rho_{bis} = 1.0000 \times \frac{0.5}{\varphi(0)} = 1.2533 > 1 .
$$

An estimate outside $[-1,1]$ is not a paradox; it is evidence that the
latent-normal dichotomization model does not fit these data.

**The Brogden–Clemans alternative.** A competing estimator rescales the mean
difference by the means of the extreme score groups rather than by the normal
ordinate:

$$
r_{BC} = \frac{\bar X_1-\bar X_0}{M_{\max}-M_{\min}},
$$

where $M_{\max}$ and $M_{\min}$ are the means of the largest and smallest
$\hat p$ proportions of the $X$ values. On the four-observation example
above, $r_{BC}=(17-9)/(17-9)=1.0000$. Unlike the Tate-factor estimate, this
estimator cannot leave $[-1,1]$, which recommends it where $r_{pb}$ is large
and the factor-based biserial estimate misbehaves.

## The phi coefficient

When both variables are binary, association lives in a 2×2 table. With cells

| | $X{=}0$ | $X{=}1$ | total |
|---|---|---|---|
| $Y{=}0$ | $a$ | $b$ | $a+b$ |
| $Y{=}1$ | $c$ | $d$ | $c+d$ |
| total | $a+c$ | $b+d$ | $n$ |

the **phi coefficient** is

$$
\hat\phi = \frac{ad-bc}{\sqrt{(a+c)(b+d)(a+b)(c+d)}} .
$$

It is algebraically the Pearson correlation of the 0/1 codings, so it
inherits Pearson's interpretation; $ad-bc$ compares diagonal with
off-diagonal clustering, and $\hat\phi$ is zero exactly when the table shows
independence — each cell frequency equals its independence expectation, e.g.
$E(a)=(a+b)(a+c)/n$.

**Margins constrain the extremes.** $\hat\phi=1$ requires $b=c=0$ — all mass
on one diagonal — which is possible only when the two variables have equal
success rates. Let $p_i=P(X{=}1)$ and $p_j=P(Y{=}1)$ with $p_i\ge p_j$;
then

$$
\max\hat\phi = \sqrt{\frac{p_j(1-p_i)}{p_i(1-p_j)}} .
$$

At $p_i=.6$, $p_j=.4$ the maximum is $2/3\approx.667$; at more extreme
margins it shrinks further. Binary items with extreme difficulties are
therefore *severely range-restricted* variables, and $\phi$ values between
such items are small even when the underlying association is strong — a
selection phenomenon, not a weak relationship (see
[Range Restriction and Selection Corrections](/topics/measurement/range-restriction)).
This margin dependence, not the coefficient's arithmetic, is why $\phi$ is
unsuitable for comparing association strength across items or studies with
different difficulties.

## Tetrachoric correlation

The **tetrachoric correlation** $\rho_{tet}$ assumes *both* variables
dichotomize a latent bivariate-normal pair; it estimates the correlation of
that latent pair. Unlike phi, it is not a function of the table alone: the
thresholds are unknown, estimation is iterative, and no closed-form transform
from $\hat\phi$ to $\hat\rho_{tet}$ exists in general.

**Equal-margin identity.** One special case does have an exact closed form.
When both margins are one-half, the latent bivariate-normal model gives

$$
\hat\phi = \frac{2}{\pi}\arcsin\hat\rho_{tet}
\qquad\Longleftrightarrow\qquad
\hat\rho_{tet} = \sin\!\left(\frac{\pi}{2}\hat\phi\right),
$$

an identity for 2×2 tables of normal-cut data with equal margins. The common
approximation

$$
\hat\rho_{tet} \approx \tfrac{3}{2}\,\hat\phi
$$

is the linearization of this curve near zero (the true initial slope is
$\pi/2\approx1.5708$). It is serviceable only for weak association: in
simulated equal-margin data it tracks the exact transform closely at true
$\rho=.4$ (giving $.4788$ against the transform's $.4807$) but fails
qualitatively at strong association — at true $\rho=.9$ the sample
$\hat\phi=.7179$ gives $\sin(\pi\hat\phi/2)=.9034$ while the approximation
returns $1.0769$, an impossible correlation. The approximation also cannot
apply once $\hat\phi>2/3$, where $1.5\hat\phi$ exceeds 1.

**Assumptions and matrix behavior.** The tetrachoric coefficient is only as
good as its latent bivariate-normality assumption; skewed or bimodal latent
distributions violate it, and failures surface as out-of-range or unstable
estimates. Two further practice cautions:

- $\phi$ is not recommended as the association input to factor analysis of
  binary items — its margin-dependent ceiling distorts the correlation
  structure. Tetrachoric (more generally, polychoric) correlations are the
  standard input instead; see
  [Factor Models and Reliability](/topics/measurement/factor-analysis).
- A phi matrix is always positive semidefinite, because it *is* the Pearson
  correlation matrix of the 0/1 codings. A matrix of pairwise sample
  tetrachoric correlations need not be — pairwise estimation can produce an
  indefinite matrix, a technical obstacle for factor analysis and structural
  equation modeling. The polychoric estimation machinery is described in the
  registry entry for
  [Jöreskog (1994)](/registry/joreskog-1994-polychoric-correlations).

## Choosing a coefficient

| Situation | Coefficient | Latent model assumed | Ceiling |
|---|---|---|---|
| continuous $X$, binary $Y$ | point-biserial $r_{pb}$ | none to compute; normal-threshold to interpret bounds | $\pm.7979$ under normal threshold |
| continuous $X$, binary $Y$ from a cut on a latent normal | biserial $\rho_{bis}$ | latent normal $Y^{*}$, joint normality with $X$ | full $[-1,1]$; sample values may exceed it |
| two binary variables, no latent model wanted | $\phi$ | none | margin-dependent, $<1$ unless margins equal |
| two binary variables, latent bivariate normal | tetrachoric $\rho_{tet}$ | latent bivariate normal pair | full $[-1,1]$ |

**Failure modes.** Reading $r_{pb}$ against a $[-1,1]$ scale; mixing
standard-deviation conventions (which can deflate or inflate the result); comparing
coefficients across items with different difficulties as if their ceilings
matched; applying the biserial conversion when the dichotomization is not of
a normal latent variable, or reading $\hat\rho_{bis}>1$ as computational
error rather than model failure; comparing $\phi$ values across margin
configurations; using tetrachoric correlations where bivariate normality is
implausible, or assuming a pairwise tetrachoric matrix is positive
semidefinite.

## References

- Tate, R. F. (1954). Correlation between a discrete and a continuous
  variable: Point-biserial correlation. *The Annals of Mathematical
  Statistics*, 25(3), 603–607.
  [doi:10.1214/aoms/1177728730](https://doi.org/10.1214/aoms/1177728730) —
  classical treatment of the point-biserial coefficient and its relation to
  the biserial.
- Jöreskog, K. G. (1994). On the estimation of polychoric correlations and
  their asymptotic covariance matrix. *Psychometrika*, 59(3), 381–389.
  [doi:10.1007/BF02296131](https://doi.org/10.1007/BF02296131) — see the
  [registry entry](/registry/joreskog-1994-polychoric-correlations).
