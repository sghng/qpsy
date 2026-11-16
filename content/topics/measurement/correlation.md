---
description: Correlation — the Pearson coefficient as standardized covariance with its computational forms, sign, range, and unit-invariance properties, geometric and simple-regression interpretations, checks for outliers, nonlinearity, range restriction, and variable type, and inference for ρ with the zero-null t test and the Fisher transformation for nonzero nulls and confidence intervals
---

# Correlation

Correlation summarizes the direction and strength of the **linear**
relationship between two quantitative variables in a single unit-free number.
The Pearson coefficient $r$ is the standard bivariate summary in measurement
and prediction — reliability, validity, and item statistics are all
correlations — but it compresses a two-dimensional relationship into one
number and inherits its behavior from the raw scores, which makes scatterplot,
outlier, nonlinearity, and range-restriction checks part of any responsible
use. This page treats the coefficient itself: its definition from covariance,
its properties, its geometric and regression readings, and inference for the
population correlation $\rho$. Monotone association is treated in
[rank correlation](/topics/measurement/rank-correlation), dichotomized
variables in
[correlations involving binary variables](/topics/measurement/binary-correlations),
and selection effects in
[range restriction and selection corrections](/topics/measurement/range-restriction).

Throughout, $N$ is the number of observed pairs $(X_i, Y_i)$, $i = 1,\dots,N$.

## From covariance to correlation

The raw material is covariance. For a population, the covariance of $X$ and
$Y$ is the average product of deviations from the population means,

$$
\sigma_{XY}=\mathbb{E}\!\left[(X-\mu_X)(Y-\mu_Y)\right],
$$

where $\mu_X$ and $\mu_Y$ are the population means. Covariance is positive
when the two deviations tend to share their sign — above-average $X$ with
above-average $Y$ — and negative when they tend to oppose it. Its magnitude,
however, is uninterpretable on its own: it is expressed in the *product* of
the two variables' units, so the same association produces different
covariances under different measurement units.

The correlation divides covariance by the two standard deviations, removing
the scale. In the population,

$$
\rho=\frac{\sigma_{XY}}{\sigma_X\,\sigma_Y},
$$

with $\sigma_X$ and $\sigma_Y$ the population standard deviations; $\rho$ is
estimated from $N$ paired observations by the sample means $\bar{X}$,
$\bar{Y}$, the sample standard deviations $s_X$, $s_Y$ (divisor $N-1$), and
the sample covariance $s_{XY}$:

$$
r=\frac{1}{N-1}\sum_{i=1}^{N}
\frac{(X_i-\bar{X})(Y_i-\bar{Y})}{s_X\,s_Y}
=\frac{s_{XY}}{s_X s_Y}.
$$

A positive sign indicates that above-average values of one variable accompany
above-average values of the other; a negative sign, the reverse.

**The divisor cancels.** Covariance and variance both depend on the
$N$ versus $N-1$ convention ([variability](/topics/foundations/descriptive-statistics)),
but $r$ does not: computing the numerator covariance and both standard
deviations with divisor $N$ instead of $N-1$ multiplies all three by the same
factor, which cancels in the ratio. Any *consistent* convention gives the same
$r$. This immunity is special to the full formula. Collapsed shortcut
formulas — such as the point-biserial expressions that pair a standard
deviation with a $\sqrt{p(1-p)}$ multiplier — can mix conventions and change
the value; that hazard and its remedies are treated in
[correlations involving binary variables](/topics/measurement/binary-correlations).

## Three equivalent computational forms

The same $r$ can be written three ways, each convenient in a different
setting.

**Standardized-score form.** Let $z_{X,i}=(X_i-\bar{X})/s_X$ and
$z_{Y,i}=(Y_i-\bar{Y})/s_Y$ be the $z$-scores of the two variables. Then

$$
r=\frac{1}{N-1}\sum_{i=1}^{N} z_{X,i}\,z_{Y,i},
$$

the average product of the paired $z$-scores (with the $N-1$ convention;
divisor $N$ gives the same value for the same reason as above). Each case
contributes positively when its two $z$-scores lie on the same side of zero
and negatively when they lie on opposite sides, which is the most direct
reading of what $r$ averages.

**Centered-sum form.** Dropping the divisors entirely,

$$
r=\frac{\sum_{i=1}^{N}(X_i-\bar{X})(Y_i-\bar{Y})}
{\sqrt{\sum_{i=1}^{N}(X_i-\bar{X})^{2}}\,
 \sqrt{\sum_{i=1}^{N}(Y_i-\bar{Y})^{2}}},
$$

the sum of cross-products of the centered scores divided by the square roots
of the two sums of squares. This form contains no $N$ at all and is the
identity behind the geometric reading below.

**Raw-score (computational) form.** Expanding the deviations gives a formula
in raw sums alone:

$$
r=\frac{N\sum_{i=1}^{N}X_iY_i-\Bigl(\sum_{i=1}^{N}X_i\Bigr)\Bigl(\sum_{i=1}^{N}Y_i\Bigr)}
{\sqrt{N\sum_{i=1}^{N}X_i^{2}-\bigl(\sum_{i=1}^{N}X_i\bigr)^{2}}\,
 \sqrt{N\sum_{i=1}^{N}Y_i^{2}-\bigl(\sum_{i=1}^{N}Y_i\bigr)^{2}}}.
$$

This is the hand-calculation form: it needs only the five sums
$\sum X_i$, $\sum Y_i$, $\sum X_iY_i$, $\sum X_i^2$, $\sum Y_i^2$. The three
forms are algebraically identical; in finite-precision arithmetic the raw-sum
form can suffer catastrophic cancellation when the scores are large relative
to their spread, the same hazard noted for the
[computational variance](/topics/foundations/descriptive-statistics), so the
centered form is preferred in software.

### Worked example

For $X=(1,2,3,4,5)$ and $Y=(2,4,5,4,5)$: the raw sums are $\sum X_i=15$,
$\sum Y_i=20$, $\sum X_iY_i=66$, $\sum X_i^2=55$, $\sum Y_i^2=86$, so the
computational form has numerator $5(66)-(15)(20)=30$ and denominator
$\sqrt{(5\cdot55-15^2)(5\cdot86-20^2)}=\sqrt{(50)(30)}=\sqrt{1500}=38.7298$.
The centered quantities are
$\sum(X_i-\bar X)(Y_i-\bar Y)=6$ with sums of squares $10$ and $6$, so the
centered-sum form gives $6/\sqrt{60}$. All three forms return

$$
r=\frac{30}{\sqrt{1500}}=\sqrt{\tfrac{3}{5}}=0.7746,
\qquad r^2=\tfrac{3}{5}=0.60.
$$

## Sign, range, and invariance properties

**Sign and range.** The coefficient satisfies $-1 \le r \le 1$, with the
endpoints attained exactly when the points lie on a straight line. The sign
gives the direction of the linear association; the magnitude, its strength
relative to the best straight line.

**Location invariance.** Adding a constant to either variable leaves $r$
unchanged: $r$ is built from deviations from means. If $X'_i=X_i+a$, then
$X'_i-\bar X'=(X_i+a)-(\bar X+a)=X_i-\bar X$. Shifting the origin of either
scale — raw scores versus deviation scores, Celsius versus Kelvin — does
nothing.

**Scale invariance.** Multiplying either variable by a positive constant also
leaves $r$ unchanged, and multiplying by a negative constant changes only the
sign: $r(cX,\,dY)=\operatorname{sign}(cd)\,r(X,Y)$ for nonzero constants $c$
and $d$. Reversing the scoring direction of one variable — reverse-keyed
items, "lower is better" criteria — reverses the sign of $r$ and nothing
else.

These are two *separate* properties, and together they make $r$ unit-free:
any positive rescaling of either variable (centimeters to inches, raw scores
to $T$-scores) leaves $r$ exactly as it was. This is why a single number can
summarize association between variables measured in unrelated units.

**What invariance does not cover.** $r$ is *not* invariant under nonlinear
transformations. A strictly monotone transformation, such as taking logs of a
positive variable or ranking observations, preserves ordering but changes the
spacings on which $r$ depends; a nonmonotone transformation such as squaring
can alter the relationship further. Applying Pearson's coefficient after rank
transformation yields [Spearman's $\rho$](/topics/measurement/rank-correlation).

## Geometry: correlation as an angle

Center each variable and regard the results as vectors in $N$-dimensional
space, $\mathbf{x}=(X_1-\bar X,\dots,X_N-\bar X)$ and
$\mathbf{y}=(Y_1-\bar Y,\dots,Y_N-\bar Y)$. The centered-sum formula is the
cosine of the angle $\theta$ between these vectors:

$$
r=\frac{\mathbf{x}\cdot\mathbf{y}}
{\lVert\mathbf{x}\rVert\,\lVert\mathbf{y}\rVert}=\cos\theta .
$$

Three consequences follow immediately. A cosine lies in $[-1,1]$, which is
the range bound. The endpoints occur exactly when the two centered vectors
are collinear — when the data lie on a straight line. And $r=0$ means the
centered vectors are orthogonal: the linear components of the two variables
are perpendicular, however much other structure they share. (Both vectors
must be nonzero: a variable with no variance has no correlation with
anything.)

## Correlation and simple linear regression

The least-squares line for predicting $Y$ from $X$ is
$\hat{Y}=a+bX$ with

$$
b=r\,\frac{s_Y}{s_X},
\qquad
a=\bar{Y}-b\bar{X},
$$

and in standardized units the line is simply $\hat{z}_Y = r\,z_X$: the slope
of the regression of the standardized outcome on the standardized predictor
*is* the correlation. With $\mathit{SS}_{\mathrm{res}}$ the sum of squared
residuals around the line and
$\mathit{SS}_{\mathrm{tot}}=\sum_{i=1}^{N}(Y_i-\bar{Y})^{2}$ the sum of
squared deviations of $Y$ about its mean, the squared coefficient,

$$
r^{2}=1-\frac{\mathit{SS}_{\mathrm{res}}}{\mathit{SS}_{\mathrm{tot}}},
$$

is the proportion by which the least-squares line reduces the deviation sum
of squares. Regressing $X$ on $Y$ produces a different
slope but the *same* $r^2$. The residuals from the least-squares line are
exactly uncorrelated with $X$ — a property of the least-squares fit, not
evidence of independence.

**Scope.** The identity between $r^2$ and a "proportion of variance
explained" holds for the *simple* straight-line regression — one predictor,
fitted by least squares. Adding predictors or curvature to the model can
raise the achievable $R^2$ above $r^2$, and a strong curved relationship can
leave $r^2$ at zero. Whenever $r^2$ is read as "variance explained," the
phrase means variance *linearly associated* with the single other variable,
as elaborated under interpretation below.

## Interpreting r

### Interpretation through r²

The squared coefficient, $r^2$, is the coefficient of determination: the
proportion of the variance in $Y$ that is linearly associated with variance in
$X$. An observed $r=0.30$ between a selection score and a job-performance
measure, for instance, gives $r^2=0.09$: nine percent of the variation in
performance is associated with variation in the test score, and the remaining
91 percent is associated with other sources.

Two cautions frame this interpretation. First, $r^2$ is a descriptive
proportion of *linearly associated* variance — it quantifies association, not
a causal explanation, and "variance explained" is a figure of speech for that
association, not a demonstrated mechanism. Second, squaring a non-extreme
correlation shrinks its magnitude toward zero and can make a substantively
useful predictor look negligible; report $r$ itself alongside $r^2$.

### Association is not causation

$r$ is symmetric in $X$ and $Y$ — it contains no direction of influence —
and an association between two measured variables may be produced by $X$
affecting $Y$, by $Y$ affecting $X$, by a third variable affecting both, or by
design features of the study. No value of $r$, however large, distinguishes
these. Causal readings require design (randomization, longitudinal
structure) and theory, not the coefficient; the role of correlation evidence
within validity arguments is treated in [validity](/topics/measurement/validity).

### Zero correlation is not independence

Uncorrelated means only that the *linear* component of the association is
zero. If $X$ and $Y$ are independent (with finite variances), then $\rho=0$
necessarily; but $\rho=0$ does not imply independence. Take any distribution
symmetric about zero with a finite third moment and let $Y=X^2$: then
$\operatorname{cov}(X,Y)=\mathbb{E}[X^3]-\mathbb{E}[X]\,\mathbb{E}[X^2]=0$,
yet $Y$ is a deterministic function of $X$. The bivariate normal family is
the standard exception — there, zero correlation and independence are
equivalent — and that equivalence is a property of that family, not of
correlation in general.

## What r does not capture

- **Outliers.** Pearson's $r$ is not resistant to outliers: a single extreme
  point can manufacture or destroy an apparent linear relationship. Because
  the coefficient gives no warning, inspect the scatterplot before trusting
  it, and consider robust alternatives when extreme observations are genuine.
- **Nonlinearity.** $r$ captures only linear structure. A curved relationship
  can yield a correlation near zero despite a strong systematic relationship;
  an inverted-U relation between test anxiety and examination performance is
  one example. A monotone but curved relation can be summarized with [rank
  correlation](/topics/measurement/rank-correlation). A nonmonotone relation
  should instead be modeled directly, for example with polynomial terms or a
  suitable transformation.
- **Range restriction.** Selection and restricted sampling distort the
  observed correlation — most familiarly attenuating it, as when only
  applicants above an admissions cutoff are observed, though the direction of
  the distortion depends on how the range was restricted. Correcting for
  restriction is treated in
  [range restriction and selection corrections](/topics/measurement/range-restriction).
- **Categorical and ordinal variables.** $r$ is defined for quantitative
  variables. When one or both variables are dichotomous, the correlation is
  still meaningful but requires specialized formulas and interpretations —
  see
  [correlations involving binary variables](/topics/measurement/binary-correlations);
  ordinal variables are the natural home of the rank coefficients.
- **Pooled groups.** Combining samples that differ in location or spread can
  create or mask association within the combined data. Examine subgroups
  separately before pooling.

The scatterplot is the check for all five: shape (linearity, curvature),
extreme points, the range actually covered, and whether the "variables" are
in fact quantitative and single-population.

## Inference for ρ

### What the procedures assume

The procedures below are statements about the *population* correlation
$\rho$ estimated by $r$. They require:

1. **Independent pairs.** The $N$ pairs $(X_i,Y_i)$ are drawn independently
   from one bivariate distribution. Repeated measurements of the same
   persons, dyads or classrooms (clustered data), and serially correlated
   observations violate this: the effective sample size is smaller than $N$,
   and the $t$ and Fisher procedures overstate precision.
2. **Bivariate normality** of $(X,Y)$ — the assumption under which the $t$
   statistic has exactly a $t$ distribution and the Fisher approximation is
   derived. Bivariate normality entails normal marginals, a linear
   conditional mean of $Y$ given $X$, and a constant conditional standard
   deviation (see [probability](/topics/foundations/probability)). Moderate
   departures matter little in large samples, but outliers and heavy tails
   destabilize $r$ itself.
3. **No distorting selection.** The pairs observed are the pairs sampled:
   selection on either variable changes what $r$ estimates
   ([range restriction](/topics/measurement/range-restriction)).

### Testing ρ = 0

Let $\rho$ denote the population correlation and $r$ the sample correlation
from $N$ independent pairs. For the null hypothesis $H_0: \rho = 0$, the test
statistic

$$
t=\frac{r\sqrt{N-2}}{\sqrt{1-r^{2}}}
$$

follows a $t$ distribution with $N-2$ degrees of freedom under the null
(assuming bivariate normality), and is referred to the $t$ family in the
usual way — see [hypothesis testing](/topics/foundations/hypothesis-testing)
and [t tests](/topics/foundations/t-tests). One- or two-sided alternatives are
handled as in any $t$ test.

This procedure tests zero only. It cannot be reused with a nonzero null value
substituted in.

### Nonzero nulls: the Fisher z transformation

When $\rho \ne 0$, the sampling distribution of $r$ is skewed, so the $t$
statistic above does not apply. Fisher's variance-stabilizing transformation

$$
z=\operatorname{arctanh}(r)=\frac{1}{2}\ln\frac{1+r}{1-r}
$$

is approximately normally distributed for bivariate normal data:

$$
z \sim N\!\left(\operatorname{arctanh}(\rho),\;\frac{1}{N-3}\right),
$$

with the approximation accurate in moderate to large samples. To test
$H_0: \rho=\rho_0$ with $\rho_0 \ne 0$, compute

$$
Z^{*}=\left[\operatorname{arctanh}(r)-\operatorname{arctanh}(\rho_0)\right]
\sqrt{N-3}
$$

and refer $Z^{*}$ to the standard normal distribution. The same machinery
underlies the [confidence interval](/topics/foundations/confidence-intervals)
logic of estimation, and $r$ itself serves as an
[effect size](/topics/foundations/effect-sizes) in many applications.

### Worked example

Suppose $r = 0.21$ from $N = 600$ pairs, and the question is whether this is
compatible with $\rho_0 = 0.25$ (two-sided). The transformed values are
$\operatorname{arctanh}(0.21) = 0.2132$,
$\operatorname{arctanh}(0.25) = 0.2554$, and
$1/\sqrt{N-3} = 1/\sqrt{597} = 0.0409$, giving

$$
Z^{*}=(0.2132-0.2554)\sqrt{597}=-1.0321,
$$

with two-sided $p = 0.3020$. The null hypothesis that $\rho = 0.25$ is not
rejected at conventional levels.

### Confidence intervals by back-transformation

The interval procedure extends the test and is the preferred form for
reporting:

1. Transform the estimate: $z=\operatorname{arctanh}(r)$.
2. Compute the standard error,
   $\operatorname{SE}=1/\sqrt{N-3}$, which does not depend on $r$.
3. Form the interval on the $z$ scale,
   $z \pm z_{1-\alpha/2}\operatorname{SE}$; for a 95% interval,
   $z_{.975}=1.9600$.
4. Back-transform *both* endpoints with $\tanh$: the interval for $\rho$ is
   $\bigl(\tanh(z_L),\,\tanh(z_U)\bigr)$.

Applying this to the worked example: $z=0.2132$,
$\operatorname{SE}=1/\sqrt{597}=0.0409$, and the margin is
$1.9600 \times 0.0409 = 0.0802$, so the $z$-scale interval is
$(0.1330,\;0.2934)$. Back-transforming with $\tanh$ gives the 95% interval

$$
0.1322 \le \rho \le 0.2852 .
$$

The interval sits asymmetrically around $r=.21$ (it extends $0.078$ below and
$0.075$ above), reflecting the skew of $r$'s sampling distribution that the
transformation exists to handle. It contains $\rho_0=.25$, consistent with
the nonrejection above.

### Two procedural notes

First, carry the transformation at full precision: rounding $z$ to two
decimals before forming the statistic shifts it to about $-1.11$ and the
p-value to about $0.27$ — enough to matter when a result sits near a decision
threshold. Second, failing to reject $H_0: \rho = \rho_0$ is *not* evidence
that $\rho$ equals $\rho_0$: a nonrejection means the data are compatible
with the null value, and establishing approximate equality requires an
equivalence-testing approach, not a failed significance test.

## Correlation matrices

For $p$ variables, the pairwise correlations form a $p \times p$ correlation
matrix: ones on the diagonal, $r_{jk}$ in cell $(j,k)$. Every correlation
matrix is positive semidefinite — it is the covariance matrix of the
standardized variables — and a sample matrix computed from one common set of
complete cases inherits this. A matrix built by *pairwise deletion*, where
each correlation uses whichever pairs are complete for that variable pair,
need not be positive semidefinite, a technical hazard for anything downstream
that requires a valid covariance structure, such as
[factor models](/topics/measurement/factor-analysis). Pairwise matrices of
tetrachoric correlations carry the same hazard for a second reason; see
[correlations involving binary variables](/topics/measurement/binary-correlations).

## Correlation in measurement

Many classical summaries in measurement are correlations or functions of
correlations, so the coefficient's properties and pathologies propagate through
the field:

- **Item analysis.** Item discrimination is summarized by item–total and
  item–rest correlations; for dichotomous items these are point-biserial
  correlations, with their own ceilings and conventions. The part–whole
  inflation of uncorrected item–total correlations and the screening rules
  built on them are treated in
  [classical item analysis](/topics/measurement/item-analysis) and
  [correlations involving binary variables](/topics/measurement/binary-correlations).
- **Reliability.** Test–retest and parallel-form designs estimate reliability
  as a correlation between two measurements; under
  [classical test theory](/topics/measurement/classical-test-theory) the
  reliability coefficient equals the correlation between parallel forms, and
  internal-consistency functions of the inter-item correlations are collected
  in [internal consistency](/topics/measurement/internal-consistency).
- **Validity.** Relations-to-other-variables evidence is largely correlational:
  the validity coefficient is the correlation between test scores and a
  criterion. Raw coefficients are attenuated by measurement error in both
  measures (the [correction for attenuation](/topics/measurement/classical-test-theory))
  and distorted by selection in criterion samples
  ([range restriction](/topics/measurement/range-restriction)). Comparisons
  across instruments or studies should consider differences in reliability and
  selection; any corrections should be applied consistently, with assumptions
  stated and adjusted values reported alongside the observed coefficients.
- **Latent structure.** Factor analysis begins from the correlation (or
  covariance) matrix of the items; for binary and ordinal items the choice of
  coefficient determines what the matrix means
  ([factor models and reliability](/topics/measurement/factor-analysis)).

## An analysis workflow

1. **Plot first.** Inspect the scatterplot — shape, extreme points, range
   covered — before computing anything, and plot subgroups separately if the
   sample mixes populations.
2. **Confirm the variable types.** Both variables quantitative? Ordinal or
   dichotomous variables route to the rank or binary coefficients linked
   above.
3. **Check distorting conditions.** Outliers, curvature, range restriction,
   and pooling are each handled or modeled deliberately, not discovered
   after the fact.
4. **Compute $r$ and $r^2$ on the data actually analyzed**, reporting $N$ and
   how missing data were treated (listwise versus pairwise deletion, with the
   matrix caution above).
5. **For inference, verify independent pairs**, then choose the procedure by
   the null: the $t$ statistic for $\rho_0=0$; the Fisher transformation for
   any other null and for intervals.
6. **Back-transform interval endpoints** and report $r$, $r^2$, the
   confidence interval, and $N$ together.
7. **Interpret with the caveats attached**: linear association, not
   causation; where measurement error or selection is present, correct before
   comparing coefficients across instruments or studies, and report
   corrections alongside the observed values.

## Failure modes

- Reading $r \approx 0$ as "no relationship": curvature and dependence without
  correlation both hide structure from $r$.
- Trusting $r$ without the scatterplot; a single outlier can manufacture or
  destroy the apparent linear relationship.
- Comparing correlations across samples with different ranges without
  selection corrections, or assuming restriction always attenuates (middle
  deletion can inflate — see
  [range restriction](/topics/measurement/range-restriction)).
- Substituting a nonzero null into the zero-null $t$ statistic.
- Rounding intermediate values inside the Fisher computation, shifting the
  statistic and p-value near thresholds.
- Interpreting a nonrejection as evidence that $\rho$ equals the null value.
- Applying the $t$ or Fisher procedures to dependent pairs — clustered,
  dyadic, or repeated-measures data — which overstates precision.
- Reporting only $r^2$ (which shrinks toward zero) or only $r$ (which invites
  the "variance explained" misreading).
- Treating "variance explained" as causal explanation.
- Applying Pearson's $r$ to ordinal or binary data without the specialized
  coefficients' ceilings and convention cautions.

## Related notes

- [Rank correlation](/topics/measurement/rank-correlation) — monotone
  association without linearity or distributional assumptions.
- [Correlations involving binary variables](/topics/measurement/binary-correlations)
  — point-biserial, biserial, phi, and tetrachoric family members.
- [Range restriction and selection corrections](/topics/measurement/range-restriction)
  — how selection distorts $r$ and how to correct it.
- [Classical item analysis](/topics/measurement/item-analysis) — item-level
  use of correlations in test construction.
- [Classical test theory](/topics/measurement/classical-test-theory) — the
  error model behind attenuation and reliability-as-correlation.
