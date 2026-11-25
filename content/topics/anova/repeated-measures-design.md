---
description: Repeated-measures design considerations — order and position confounding, counterbalancing with balanced Latin squares and complete counterbalancing, washout and differential carryover, longitudinal measurements, complete-case limitations, and within-versus-between-subjects design selection
---

# Repeated-Measures Design Considerations

**Canonical reference:** [Maxwell, Delaney, & Kelley (MDK)](/resources#designing-experiments-and-analyzing-data) #ref/mdk

A repeated-measures design can improve precision by allowing each participant to
serve as their own control, but administering every condition to every person
also creates design problems that an independent-groups study does not face.
Conditions occur in some order, earlier conditions can influence later
responses, and measurements collected over time may be incomplete. These are
questions about what the observed condition differences mean, not merely about
which error term the analysis uses.

## Order effects

If every participant experiences the conditions in the same order, condition is
confounded with **position**. A difference between the first and last conditions
could reflect the conditions themselves, but it could also reflect practice,
fatigue, or other changes over the course of the study. In a hypothetical sleep
study, for example, administering the highest caffeine dose in the final week to
everyone would confound dose with any end-of-semester change in stress or sleep.

The partition in
[One-Way Repeated-Measures ANOVA](/topics/anova/repeated-measures-anova) cannot
separate these explanations after the fact. Removing overall participant
differences from the error term does not remove an order effect that affects a
condition systematically.

## Counterbalancing

**Counterbalancing** varies the order of conditions across participants. Its
purpose is to distribute conditions across positions so that condition and order
are not inseparable. Counterbalancing addresses position effects; it does not
guarantee that the covariance assumption of
[sphericity](/topics/anova/repeated-measures-assumptions) holds, and it does not
by itself eliminate carryover. Nor is counterbalancing what removes overall
participant differences from the condition error; that removal comes from the
sums-of-squares partition in the repeated-measures analysis.

### Reading a balanced Latin square

One counterbalancing device is a **Latin square**. Each row below is a condition
sequence assigned to a group of participants, each column is a position, and
$A$, $B$, $C$, and $D$ are four conditions:

| Sequence | Position 1 | Position 2 | Position 3 | Position 4 |
|---|---|---|---|---|
| 1 | $A$ | $B$ | $D$ | $C$ |
| 2 | $B$ | $C$ | $A$ | $D$ |
| 3 | $C$ | $D$ | $B$ | $A$ |
| 4 | $D$ | $A$ | $C$ | $B$ |

Every condition occurs once in every row and once in every column. This
particular square is also balanced for immediate succession: across the four
sequences, every condition immediately follows every other condition exactly
once. Reading each column checks that every condition occurs at that position in
the design table, while reading adjacent pairs within rows checks the succession
property.

The table balances sequences, but the realized sample is exactly balanced only
when participants are allocated equally to those sequences. With ten
participants and four sequences, an allocation of $3,3,2,2$ leaves each
condition occurring either two or three times in a given position, depending on
the position. Twelve participants could instead be allocated equally, three to
each sequence. The Latin-square layout alone does not guarantee equal sample
counts at every condition-position combination.

### Complete counterbalancing

A Latin square uses a selected set of sequences. **Complete counterbalancing**
instead uses every possible order. For $a$ conditions there are

$$
a! = a(a-1)\cdots(2)(1)
$$

possible sequences, so three conditions require $3! = 6$ orders for complete
counterbalancing. Equal allocation across those orders remains a separate
sample-design requirement.

## Carryover and washout

A **carryover effect** occurs when a previous condition continues to affect the
response in a later condition. A **washout period** between administrations may
allow temporary effects to dissipate. In a caffeine study, spacing test nights
could allow the drug and short-lived sleep disruption to clear before the next
administration; the appropriate interval is a substantive design question, not a
property of ANOVA.

Counterbalancing and washout address different problems. Changing the order
distributes conditions across positions, whereas washing out attempts to reduce
what persists from one administration into the next. Neither device handles
every form of persistence.

**Differential carryover** occurs when the effect of condition $A$ carrying into
condition $B$ differs from the effect of $B$ carrying into $A$. Persistent
differential carryover can distort within-person comparisons even when orders
are counterbalanced. When effects endure, or when experiencing one condition
permanently changes what a participant can bring to another, a
[between-subjects design](/topics/anova/one-way-anova) may be preferable.

## Repeated measurements over time

Time itself can be the within-subjects factor. The omnibus null then states
that population means are equal across occasions. Rejecting it establishes
evidence of mean differences across those occasions; it does not, on its own,
establish that an intervention caused the change. Maturation, concurrent events,
and other time-related processes remain possible explanations without a design
that rules them out.

Longitudinal time also differs from a manipulated condition whose order can be
counterbalanced. Occasions cannot be rearranged randomly for different
participants. In a hypothetical counterbalanced treatment study, condition
differences need not be simple changes across weeks; in a series observed only
over time, condition and chronological position can be inherently linked.

The traditional univariate repeated-measures analysis generally uses complete
repeated observations for each included participant. Incomplete longitudinal
records therefore raise an additional analysis problem rather than merely
reducing the sample by one isolated score.

## Strengths, limitations, and alternatives

Comparing participants with themselves can improve precision and statistical
power by removing stable overall participant differences from the condition
error term. The size of that benefit depends on the data; it is not guaranteed.
The exact partition and degrees-of-freedom comparison are developed in
[One-Way Repeated-Measures ANOVA](/topics/anova/repeated-measures-anova).

The traditional univariate test also carries important limitations:

- its usual reference distribution requires
  [sphericity](/topics/anova/repeated-measures-assumptions), which can be
  implausible for measurements collected over time;
- its standard complete-data implementation does not directly accommodate
  arbitrary incomplete repeated observations; and
- order and carryover problems require design solutions rather than a larger
  omnibus $F$ statistic.

Multivariate analysis of variance (MANOVA) and linear mixed-effects models are
alternative analyses with different assumptions and capabilities. Neither label
is a universal remedy, and a general method-selection rule for them is beyond
this page's scope.

## Choosing within or between subjects

Design selection should weigh precision against the threats created by repeated
administration. Three contrasting examples make the considerations concrete:

- Ratings of faces under several brief exposure durations are naturally
  candidates for a within-subjects design, with randomized or counterbalanced
  stimulus order.
- Comparing two strategies for teaching a new kind of problem favors a
  between-subjects design when learning one strategy cannot be undone before
  learning the other. The persistence is precisely the kind of carryover that
  counterbalancing cannot erase.
- Comparing mood after outdoor and treadmill walks can use a within-subjects
  design when sessions occur on separate days and their order is
  counterbalanced, reducing short-term carryover and position confounding.

When a causal interpretation is intended, counterbalanced assignment, blinding
where feasible, and adequate washout can support that interpretation by
removing or reducing competing explanations. They are design safeguards, not
conclusions supplied by the ANOVA. A mean contrast alone establishes neither
that the study used these safeguards nor that every alternative explanation has
been excluded.

## Related pages

- [One-Way Repeated-Measures ANOVA](/topics/anova/repeated-measures-anova)
  develops the participant, condition, and residual partition and the potential
  precision benefit of within-person comparisons.
- [Repeated-Measures Assumptions and Corrections](/topics/anova/repeated-measures-assumptions)
  defines sphericity and the corrections to the omnibus reference distribution.
- [Repeated-Measures Comparisons](/topics/anova/repeated-measures-comparisons)
  develops pairwise and complex within-person tests once the design supports
  those comparisons.
- [One-Way ANOVA](/topics/anova/one-way-anova) supplies the independent-groups
  counterpart for studies in which persistent carryover makes repeated
  administration unsuitable.
- [t Tests](/topics/foundations/t-tests) contrasts paired and independent
  comparisons in the two-condition case.
