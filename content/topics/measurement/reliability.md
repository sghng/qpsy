---
description: Reliability and precision of scores — consistency over explicitly defined replications, random versus systematic error and true change, relative and absolute interpretations, the classical reliability coefficient, estimation designs and the error facets each includes, population and range dependence, the Spearman–Brown prophecy, standard errors of measurement, generalizability, decision consistency, group means, and reporting
---

# Reliability

"Reliability" has long carried two meanings in the measurement literature.
In its narrow, classical sense it names the **reliability coefficient** — the
correlation between scores on two equivalent forms of a test, assuming the
first administration leaves performance on the second unaffected. In its
broad sense it names the consistency of scores across replications of a
testing procedure, however that consistency is summarized: reliability
coefficients, standard errors, generalizability coefficients, item response
theory information functions, or indices of classification consistency. The
2014 *Standards* resolve the ambiguity by using **reliability/precision** for
the general notion and *reliability coefficient* for the classical quantity;
this page follows that usage.

**Canonical reference:** [AERA, APA, & NCME, *Standards for Educational and
Psychological Testing*](/resources#standards-for-educational-and-psychological-testing)
#ref/standards

The need for precision grows with the consequences of the decisions and
interpretations built on the scores. Where a score leads to a decision that
is not easily reversed — admission to a professional school, a score-based
clinical judgment in a legal context — a higher degree of
reliability/precision is warranted; where the decision is reversible or will
be corroborated by information from other sources, scores with more modest
precision may suffice (Standard 2.0). There is no universal cutoff.

An individual's performances, products, and responses vary from one sample
of tasks to another and from one occasion to another, even under strictly
controlled conditions, and different raters may award different scores to
the same performance. Reliability/precision is high when scores are
consistent across the replications the interpretation invokes, and low when
they are not. Which variations count as error — and therefore everything
else on this page, from estimation design to reporting — follows from
declaring what a replication is. The single-administration coefficients
(coefficient alpha, Kuder–Richardson, split-half) are developed in
[internal consistency and coefficient
alpha](/topics/measurement/internal-consistency); consistency across raters
has its own machinery in [rater agreement and intraclass
correlation](/topics/measurement/rater-agreement).

## Consistency over defined replications

A replication of a testing procedure is an independent administration
arranged so that the attribute being measured would not be expected to
change. Whether two administrations qualify is a substantive judgment about
the construct. For an attribute not expected to change over an extended
period — a trait — scores from two successive days, using different forms
where appropriate, are replications. For a state variable such as mood or
hunger, where fairly rapid change is ordinary, successive-day scores are
*not* replications: the scores obtained on each occasion are interpreted as
the value of the variable on that occasion. What counts as "the same
procedure" also depends on the instrument: for many tests of knowledge or
skill, an alternate form with a different sample of items is a legitimate
replication, whereas survey instruments and many personality measures expect
the same questions every time, so that a substantial change in wording
constitutes a different form.

Standardized procedures hold some conditions fixed — the test materials, the
stipulated administration procedures, the prescribed scoring rules, time
limits, the resources available to examinees — and deliberately allow others
to vary: the time and place of testing, the persons administering the test,
the particular tasks (as samples from a common content domain), and the
persons who score the results. An administration that maintains the fixed
conditions and draws acceptable samples of the allowed-to-vary conditions is
a legitimate replication.

Each allowed-to-vary condition is a potential source of error under the
intended interpretation. Variation over occasions is error if the
interpretation presumes the construct does not change across them; variation
from form to form is error if the observed performances are treated as a
sample from a domain of similar tasks; variation over qualified raters is
error whenever raters assign the scores. Score variations that are
inconsistent with the definition of the construct being assessed are
attributed to measurement error. Because this definition governs every
coefficient computed afterwards, the range of replications over which
reliability/precision is evaluated should be stated explicitly, with a
rationale for the choice (Standard 2.1).

Allowing more variation enlarges error, but not always at a net cost.
Performance assessments, simulations, and portfolio assessments enlarge the
scope of variation allowed in replications and tend to yield lower
reliability than more structured formats such as multiple-choice tests, yet
they can provide more direct measures of the attribute of interest. A
deliberate sacrifice of precision can reduce construct irrelevance or
construct underrepresentation and thereby improve the validity of the
intended interpretation — a trade to be made consciously at the design
stage, not discovered after the coefficients are computed.

## Random error, systematic error, and true change

Random errors of measurement are unpredictable fluctuations in scores. Some
are rooted within the test taker — fluctuations in motivation, interest, and
attention, and the inconsistent application of skills — and some are
external — variations in testing conditions such as time of day and level of
distraction, and variations in scoring due to scorer subjectivity. Random
errors cannot be removed from an observed score, but their aggregate
magnitude can be summarized (by the coefficients and standard errors below)
and their impact controlled to some extent, by standardization or by
averaging over multiple measurements.

Systematic errors affect performances in a consistent rather than a random
manner. An incorrect answer key contributes systematic error; so do
differences in the difficulty of test forms that have not been adequately
equated or linked, under which examinees taking one form receive higher
scores on average than they would have received on the other. Systematic
errors are generally not included in the standard error of measurement and are
not regarded as contributing to a lack of reliability/precision: they are
construct-irrelevant influences that threaten validity. A set of scores can be
perfectly consistent across replications and still systematically wrong;
consistency indices say nothing about this failure, which belongs to
[validity evidence](/topics/measurement/validity).

Change is not error either. When scores differ across occasions because
examinees learned or matured between the measurements, the change is the
phenomenon of interest, not measurement error. Whether an observed
difference is random error, systematic error, or real change is fixed by the
declared interpretation and the design — not by the size of the difference.
The reliability of the differences themselves is treated in [reliability of
change scores](/topics/measurement/change-scores).

## Relative and absolute interpretations

Interpretations of test scores fall into two broad categories. A *relative*
interpretation conveys the standing of an individual or group within a
reference population; an *absolute* interpretation relates the status of an
individual or group to defined performance standards. The standard error is
not the same for the two: any source of error that is the same for all
individuals contributes nothing to relative error but may contribute fully
to absolute error. A rater who is uniformly more stringent on a given
occasion depresses every score equally — rank order within the group
survives, while judged mastery against an absolute standard does not.

Traditional norm-referenced reliability coefficients were developed to
evaluate the precision of relative standings, through the ratio of
true-score variance to observed-score variance. As the uses of scores have
expanded — diagnostic categorization, the evaluation of educational programs
— the families of indices have expanded with them: indices for change and
difference scores, indices of decision consistency, and indices for the
precision of group means, each treated in its own section below. The same
absolute-versus-consistency distinction recurs in [rater agreement and
intraclass correlation](/topics/measurement/rater-agreement), where it
separates two intraclass-correlation estimands.

## The reliability coefficient

Under [classical test
theory](/topics/measurement/classical-test-theory) the reliability
coefficient is the proportion of observed-score variance that is true-score
variance,

$$
\rho_{XX'} = \frac{\sigma_T^2}{\sigma_X^2},
$$

equal to the squared correlation between observed and true scores and, when
parallel forms exist, to the correlation between them. Strictly parallel
forms measure the same construct and yield scores with the same means and
standard deviations in the populations of interest and the same correlations
with all other variables; in practice the coefficient is estimated by the
correlation between alternate forms built to the same specifications — the
same distribution of content and item formats, the same administrative
procedures, at least approximately the same means and standard deviations —
which are interchangeable only approximately. In a population the
coefficient lies between 0 (all error) and 1 (no error); sample estimates
can fall below 0. How large a coefficient must be depends on the stakes of
the decisions made with the scores — there is no universal cutoff.

The decomposition, the parallel-through-congeneric test families, and the
identities behind these statements are the business of [classical test
theory](/topics/measurement/classical-test-theory); this page treats the
estimation designs and the interpretation of what they estimate.

## Estimation designs and their error facets

Consistency can be defined across occasions, across forms, across items
within one administration, or across raters; each design targets a different
error source and is blind to the others. Three broad categories of
reliability coefficient are recognized: coefficients from alternate forms
administered in independent sessions, coefficients from the same form
administered on separate occasions, and internal-consistency coefficients
from the relationships among items or item subsets within a single
administration. Where test scoring involves a high level of judgment,
indices of scorer consistency are obtained alongside.

| Design | What is repeated | Error facets included | Error facets excluded | Principal weaknesses |
| --- | --- | --- | --- | --- |
| Test–retest | Same form, second occasion | Occasion instability | Form sampling; rater error (with fixed scoring) | Carry-over; interval choice |
| Alternate forms | A second, matched form | Form sampling; occasion instability when sessions differ | Rater error (with fixed scoring) | Parallelism unverifiable; carry-over; two administrations |
| Internal consistency | Nothing — one administration | Item sampling within the form | Occasion and rater error entirely | Stringent item-level assumptions |
| Scorer consistency | Same performances, another rater or panel | Rater variability | Task-to-task and occasion variation | Halo; agreement is not examinee consistency |

**Test–retest** correlates scores from the same form on two occasions. If
the interval is short, memory and practice can carry responses over and
correlate the two error scores, inflating the same-form correlation and
overestimating reliability. If the interval
is long, the attribute itself may change, and the coefficient measures the
stability of the construct rather than the consistency of the scores.

**Parallel forms** correlates two forms built to the same specification. In
practice exact parallelism — identical true scores and error variances —
cannot be verified, and the carry-over and interval problems persist:
carry-over when the two administrations are close together, and the interval
dilemma when they are separated.

**Internal consistency** requires only one administration of one form. Its
two classical tools are the split-half method and coefficient alpha,
developed in [internal consistency and coefficient
alpha](/topics/measurement/internal-consistency). The economy has a price: a
single administration cannot see occasion error or rater error at all, and
the coefficients rest on strong assumptions about how items relate —
split-half estimation via the Spearman–Brown formula assumes parallel
half-tests; alpha assumes essential tau-equivalence.

**Speeded tests.** When a test is designed to reflect rate of work,
internal-consistency estimates of reliability — particularly by the odd–even
method — are likely to be inflated. For highly speeded tests the appropriate
evidence comes from designs that actually vary the form or the occasion, not
from agreement among items within one sitting.

**Coefficients are not interchangeable.** Each category embeds a distinct
definition of measurement error (Standard 2.6). A coefficient may reflect
scorer inconsistencies but not variation in an examinee's performances; an
internal-consistency coefficient reflects only agreement among items within
the instrument and misses day-to-day changes in performance entirely.
Alternate-form, test–retest, and internal-consistency coefficients therefore
answer different questions and should not be treated as substitutes, and
error variances derived from item response theory are generally not
equivalent to those estimated by other approaches. Reports should state
which sources of error a coefficient reflects and which it ignores.

**Retest designs are not automatically superior.** Where past experience or
theory supports assuming that scores do not change over occasions, it can be
reasonable to assume invariance without conducting a test–retest study, and
an internal-consistency coefficient plus that assumption may suffice. When
several facets matter at once — forms, occasions, raters — the overall
reliability given all of them can be estimated in a single study that crosses
them: different forms administered on different occasions and scored by
different raters.

**The design must fit the structure of the test.** Reliability estimation
procedures should be consistent with that structure (Standard 2.5). A total
score computed on a substantially multidimensional test should be treated as
a composite and handled with the tools of [reliability of composite
scores](/topics/measurement/composite-scores), and a split-half estimate
requires halves comparable in content and statistical characteristics (see
[internal consistency](/topics/measurement/internal-consistency)).
Reliability for a total score does not transfer to its parts: totals can be
acceptably consistent while subscores are not, and composites formed from
selected subtests need their own evidence (Standard 2.3). Score differences
require their own precision data as well — the reliability of a difference
can be much lower than the reliabilities of the separate scores (Standard
2.4; [change scores](/topics/measurement/change-scores)).

**Scorer facets.** Where subjective judgment enters scoring, evidence should
bear on both interrater consistency and within-examinee consistency over
repeated measurements, distinguishing among independent panels scoring the
same performances, a single panel scoring successive performances, and
independent panels scoring successive performances (Standard 2.7). Two
cautions attach. Raters evaluating positively correlated characteristics may
let a favorable or unfavorable assessment of one trait color their judgment
of another (halo; see [response bias](/topics/measurement/response-bias)).
And high interrater consistency does not imply consistency of examinee
performance from task to task. Reported coefficients can also understate
operational error when the raters in a reliability study are especially well
trained relative to operational scorers, or when scorers are still refining
their performance early in an extended scoring window. The coefficients
themselves — kappa, weighted kappa, the intraclass-correlation family — are
developed in [rater agreement and intraclass
correlation](/topics/measurement/rater-agreement).

## Population and range dependence

The interpretation of any reliability/precision analysis depends on the
population being tested; coefficients from a nationally representative
sample may differ substantially from those obtained in a more homogeneous
sample. Two mechanisms produce the dependence.

First, a coefficient is a ratio of true-score variance to observed-score
variance in a population, and the numerator moves with how much the
construct actually varies there. When the variability of the construct is
low, reliability and generalizability coefficients tend to be small; when it
is high, they tend to be large. The same instrument can thus carry quite
different coefficients in a representative sample and in a subgroup drawn
from one gender, one ethnic group, or one community. Standard errors of
measurement are less dependent on the variability of the test takers than
coefficients are, which is one reason to report the standard error alongside
any coefficient.

Second, coefficients can differ from one population to another even when
construct variability is the same, because particular error sources — rater
effects, familiarity with formats and instructions — have more impact in one
population than another. In general, if any aspect of the assessment
procedure or the population being assessed changes in operational use, the
reliability/precision of the scores may change.

Three practical consequences follow. Estimates of reliability/precision
should be provided for each relevant subgroup for which the test is
recommended, especially when interpretation involves within-group inferences
— subgroup norms, specific linguistic or cultural subgroups, individuals
with particular disabilities (Standard 2.11); coefficients can differ
substantially when subgroups differ in construct variability, while the
standard error is less affected, so both should be evaluated and reported.
When a test is normed for several grades or a range of ages, data should be
reported for each grade or age band, not pooled: a coefficient from a sample
spanning grades with steadily increasing average scores gives a spuriously
inflated impression of reliability/precision (Standard 2.12). And when
coefficients are adjusted for restriction of range, the adjustment
procedure, the adjusted and unadjusted coefficients, the standard
deviations of the group actually tested and of the target population, and
the rationale should all be reported; adjustment formulas that presume a
constant standard error across score levels should not be used unless that
constancy can be defended (Standard 2.20). Selection mechanisms and the
correction formulas are treated in [range
restriction](/topics/measurement/range-restriction).

## Test length and the Spearman–Brown prophecy

If $X = \sum_{j=1}^{J} Y_j$ is a sum of $J$ components each with reliability
$\rho_{YY'}$ (the correlation between parallel copies of the component), the
reliability of the lengthened score is

$$
\rho_{XX'} = \frac{J\,\rho_{YY'}}{1 + (J - 1)\,\rho_{YY'}}.
$$

The formula predicts the effect of lengthening ($J > 1$) or shortening
($J < 1$) a test, provided the added components are parallel to the existing
ones: equally correlated with the common true score, with uncorrelated
errors. Solving it for $J$ turns it into a prophecy formula.

**Worked prophecy.** A six-item test has reliability $6/7 \approx .86$ (the
six-item matrix example in [internal
consistency](/topics/measurement/internal-consistency)). To reach $.95$:

$$
J = \frac{\rho^*\left(1 - \rho_{YY'}\right)}{\rho_{YY'}\left(1 - \rho^*\right)}
= \frac{.95 \times \tfrac{1}{7}}{\tfrac{6}{7} \times .05}
= \frac{19}{6} \approx 3.17,
$$

so the test must grow to $6 \times 19/6 = 19$ items — thirteen more, not a
handful. The extrapolation is only as good as its premise: the added
components must be as strongly connected to the construct as the present
ones, and [internal consistency](/topics/measurement/internal-consistency)
works an example of an added item that lowers alpha rather than raising it.

Lengthening an assessment with comparable items is nonetheless one of the
standard and effective ways to improve reliability/precision, and shortening
it generally lowers reliability. When an instrument circulates in long and
short versions, evidence should be reported for scores on each version,
preferably from independent administrations to independent samples;
model-based extrapolations from one version to the other assume that items
are randomly sampled from a single domain and can be undermined by context
effects and by the nonrandom item selection typical of short forms
(Standard 2.9).

## Standard errors of measurement

The standard error of measurement (SEM) summarizes error in the units of the
score. Conceptually it is the standard deviation of a person's scores over
independent replications of the procedure; because repeated measurement of
each person is rarely feasible, it is estimated under model-based
assumptions as an average over a population. A relatively large SEM
indicates relatively low reliability/precision. Its classical formula,
$\sigma_E = \sigma_X\sqrt{1 - \rho_{XX'}}$, and the decomposition behind it
are derived in [classical test
theory](/topics/measurement/classical-test-theory).

Once a measurement procedure has been adopted and the interpretation of
scores is the primary concern, the SEM is generally more informative than a
reliability or generalizability coefficient, because it generates confidence
intervals around reported scores. Two extensions matter in practice:

- **Conditional standard errors.** The error of measurement typically varies
  with score level. Conditional standard errors are difficult to estimate
  directly but can be estimated indirectly — for example from item response
  theory information functions, with the requirement that the model
  assumptions be consistent with the data — and they can be much more
  informative than a single average standard error. They should be reported
  at several score levels unless there is evidence that the standard error
  is constant over score levels, and in the vicinity of any cut score used
  for selection or classification (Standard 2.14). Where decisions
  concentrate in one region of the scale, the conditional errors in that
  region are the relevant ones.
- **Scale units.** Standard errors depend on the scale in which they are
  reported. A conditional pattern that appears high at one score level and
  low at another on the raw-score scale can emerge quite differently when
  restated in scale-score units, so the SEM should be reported in the units
  of the reported score (Standard 2.13).

Coefficients keep two advantages over standard errors. They can be used to
estimate standard errors — overall and conditional — in settings where
direct estimation is impossible. And because they are ratios of variances
for scores on the same scale, they are invariant over linear transformations
of the score scale, which allows (cautious) comparisons among testing
procedures with different scales. Such comparisons are rarely
straightforward: coefficients depend on the variability of the groups on
which they are based, the techniques used to obtain them, the sources of
error they reflect, and the lengths and contents of the instruments. A more
comprehensive standard error — one covering the error sources the
interpretation actually invokes — is more informative than a narrow one, and
where full studies are impracticable, the error sources with the greatest
expected impact are the ones to evaluate.

## Generalizability theory

Classical test theory summarizes all measurement error in a single
distribution for each test taker. Generalizability theory instead decomposes
error by facet — items, occasions, raters, and their interactions — and
estimates a variance component for each, typically with analysis-of-variance
methods. The **universe score** for a person is the expected value
of scores over the universe of all admissible replications of the testing
procedure, playing the role the true score plays classically; a
**generalizability coefficient** is the ratio of universe-score variance to
observed-score variance, the analogue of the reliability coefficient. The
design-based coefficients of the previous section can be represented as
particular choices of which facets vary and which are held fixed;
generalizability theory extends them by estimating multiple components and
their interactions simultaneously.

The payoff is diagnostic. Separate variance-component estimates show which
facet contributes most to overall measurement error and therefore where
precision is cheapest to buy — more items, more occasions, ratings averaged
over more raters, better rater training — before resources are committed.
The mean-square estimators for the two-facet rating case are worked in
[rater agreement and intraclass
correlation](/topics/measurement/rater-agreement); item-level model-based
precision is treated in [item response theory](/topics/irt). One limit of
the model-based route deserves note: an item response theory information
function is computed from results on a specific occasion and context and
does not by itself indicate generalizability over occasions or contexts.

## Decision consistency and decision accuracy

Where the purpose of measurement is classification, some measurement errors
are more serious than others. Test takers far above or far below a cut score
can carry considerable error in their observed scores without any effect on
their classification; examinees whose true scores are close to the cut are
the ones whose classification decisions are most likely to be wrong.

**Decision consistency** is the extent to which the observed classifications
of examinees would be the same across replications of the procedure.
**Decision accuracy** is the extent to which classifications based on a
single replication agree with true classification status. Both are
quantifiable — the percentage of examinees classified the same way on two
replications, the percentage of correct decisions, chance-corrected indices
such as Cohen's kappa — and both are functions of score reliability and of
the location of the cut score: the degree of consistency or agreement is
specific to the cut score employed and its position in the score
distribution (Standard 2.16).

A standard error in the vicinity of a cut score bears on the trustworthiness
of the decisions made there, but it cannot be translated into an expected
percentage of consistent or accurate decisions without strong assumptions
about the distributions of measurement errors and true scores; the
decision-consistency and decision-accuracy indices exist to make that
translation empirically. They are usually estimated from a single
administration, but can and should be estimated directly from a test–retest
approach when test security permits, the no-change assumption is tenable,
and adequate samples are available. The kappa machinery is shared with
[rater agreement](/topics/measurement/rater-agreement).

## Precision of group means

Means — or proportions in categories — for groups are often the reported
quantity, as measures of program effectiveness or under accountability
systems, and the error sources operating at the group level differ from
those operating at the individual level. Sampling of persons can be a major
source of error: different samples from the same group yield different
means, and for samples that are not very large — the mean achievement of a
single classroom, the average expressed satisfaction of a clinical
program's clients — person-sampling error can dominate overall error even
when every individual score is precise.

Standard errors for individual scores are therefore not appropriate measures
of the precision of group averages. The appropriate statistic is the
standard error of the estimates of the group means, which reflects
variability due to the sampling of examinees as well as variability due to
individual measurement error (Standard 2.17). The tested group is itself
regarded as a sample from a larger population — comparable groups recurring
in future years, including future participants — even when every currently
available member was tested. Measurement programs that assign item subsets
randomly to different examinee subsamples and aggregate across them (matrix
sampling) reduce the burden on each examinee while covering more items, but
their reliability/precision analyses must take the sampling scheme into
account with respect to both examinees and items (Standard 2.18).

## Selecting the evidence: a design-selection procedure

1. **State the interpretation and use for every score to be interpreted** —
   totals, subscores, composites formed from selected subtests, score
   differences, group means — and the population involved. The stakes of the
   uses set the precision target: irreversible, high-consequence uses demand
   more precision than reversible or corroborated ones (Standard 2.0).
2. **Define the domain of replications.** Decide which conditions are fixed
   and which are allowed to vary — forms, occasions, contexts, raters — and
   record the rationale (Standard 2.1). Every allowed variation is a claim
   that the scores must generalize over it.
3. **Enumerate the error sources the definition creates**, and judge which
   are substantial. A source deemed negligible needs an argument — prior
   research, a new study, or an explicit rationale — not silence.
4. **Match the index to the use.** Relative interpretations call for a
   reliability or generalizability coefficient; score-level inferences and
   confidence intervals call for the SEM in the units of the reported score;
   classification uses call for conditional standard errors near the cuts
   plus decision-consistency indices; group-level conclusions call for the
   standard error of the group mean; score-difference interpretations call
   for precision data on the differences (Standard 2.4).
5. **Match the design to the facets.** One salient facet suggests a
   single-design coefficient; several suggest crossing them in one study or
   estimating generalizability-theory components. Check that the procedure
   fits the test's structure — composite treatment for multidimensional
   totals, comparable halves for any split-half estimate.
6. **Estimate on the actual population and its relevant subgroups**, and
   report with the checklist below.

## Reporting

- Report a relevant index of reliability/precision for **each** score to be
  interpreted — total, subscore, composite, and difference — not the total
  alone (Standards 2.3–2.4).
- **Name the method**: which coefficient or standard error, obtained from
  which design, with the interval between administrations where one was
  used, and the sample's size, means, standard deviations, and demographic
  characteristics, to the extent privacy obligations allow (Standard 2.19).
- **State which error sources the index reflects and which it ignores**
  (Standard 2.6).
- Report standard errors **in the units of the reported score**, and
  conditional standard errors at several score levels unless constancy is
  evidenced, especially near cut scores (Standards 2.13–2.14).
- Report **subgroup estimates** where the test is recommended for subgroups
  or normed by grade or age (Standards 2.11–2.12).
- Add **decision-consistency indices** for classification uses (Standard
  2.16) and **standard errors of group means** where means are the focus
  (Standard 2.17).
- Where coefficients are **adjusted for restriction of range**, report the
  procedure, the adjusted and unadjusted values, both groups' standard
  deviations, and the rationale (Standard 2.20).

No single approach to quantifying reliability/precision is preferred over
the others: no single index conveys all the relevant information, no method
of investigation is optimal in all situations, and the minimum acceptable
level for any index remains a matter of professional judgment. A report
that a test is "reliable," or "sufficiently reliable to permit
interpretations of individual scores," is rarely, if ever, acceptable
documentation; a report must say what was correlated with what, on whom, under
which
conditions, and which sources of error the number does and does not
contain.

A reliability coefficient describes particular scores in a particular
sample. Transporting a published coefficient to a new population or a
modified instrument is itself an assumption, and practice is often weaker
than the ideal. Flake, Pek, and Hehman (2017,
[doi:10.1177/1948550617693063](https://doi.org/10.1177/1948550617693063))
audited construct-validation practice in the 2014 volume of the *Journal of
Personality and Social Psychology*: the finite population of 122 articles
defined the frame, 39 empirical articles were sampled, and 35 remained after
exclusions. For scales that authors developed themselves without citing a
prior source, 78.2% of the evidence offered was reliability information
only. The practical standard: report reliability for the data actually
analyzed, in the sample that analyzed them.

## Failure modes

- **Design mismatch.** A single-administration coefficient cannot detect
  occasion or rater error; a stable-looking scale may still be unstable over
  time or across raters.
- **Coefficient interchange.** Alternate-form, test–retest, and
  internal-consistency coefficients are not equivalent; each reflects a
  different definition of measurement error, and substituting one for
  another silently changes the estimand (Standard 2.6).
- **Speeded-test inflation.** Internal-consistency estimates, especially
  odd–even ones, are likely to be inflated for tests designed to reflect
  rate of work.
- **Borrowed coefficients.** Reliability reported for another sample or
  instrument does not describe the scores at hand; population, subgroup, and
  range dependence make transport an argument to be made, not a default.
- **Consistency mistaken for correctness.** Systematic error — an incorrect
  key, unequated forms — leaves reliability indices untouched while
  corrupting every score. Inconsistency limits what scores can support, but
  consistency establishes nothing about validity.
- **Cut-score blindness.** An overall coefficient or average SEM says little
  about decisions concentrated near a cut score; conditional error and
  decision consistency are the relevant quantities there.
- **Group-mean misuse.** Individual-score standard errors do not measure
  the precision of group averages; person sampling can dominate the error of
  small-group means.
- **Structure mismatch.** Applying unidimensional internal-consistency
  machinery to a substantially multidimensional total, or accepting splits
  whose halves are not comparable, estimates the reliability of a score the
  instrument does not produce.

## Related pages

- [Internal Consistency and Coefficient Alpha](/topics/measurement/internal-consistency):
  the one-administration family — alpha in its forms, split-half estimation,
  Kuder–Richardson formulas, and why alpha is not evidence of
  unidimensionality.
- [Classical Test Theory](/topics/measurement/classical-test-theory): the
  score decomposition, test families, SEM derivation, and the correction for
  attenuation.
- [Factor Models and Reliability](/topics/measurement/factor-analysis):
  dimensionality, congeneric omega, and maximal reliability.
- [Rater Agreement and Intraclass Correlation](/topics/measurement/rater-agreement):
  consistency across raters rather than across items or occasions.
- [Reliability of Change Scores](/topics/measurement/change-scores): why two
  reliable measurements can yield an unreliable difference.
- [Reliability of Composite Scores](/topics/measurement/composite-scores):
  weighted composites, Horst's formula, and stratified alpha.
- [Range Restriction and Selection Corrections](/topics/measurement/range-restriction):
  selection mechanisms and range-adjustment assumptions.
