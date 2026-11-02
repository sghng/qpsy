---
description: Events, conditioning, independence, and Bayes — the probability machinery behind statistical inference
---

# Probability

Probability is the mathematics of uncertainty, and inference is its applied
face: a sample is one draw from a population, and the question "could this
result plausibly be chance?" is a question about probability. This page
defines events and their combinations, the rules for computing
probabilities, and the machinery of conditioning that underlies p-values
and Bayes' theorem.

## What probability is

The probability of an event is a number between 0 and 1 expressing how
likely the event is. Values 0 and 1 assign no probability and certainty in
the probability model, respectively; in continuous models, however, a
probability-zero event is not necessarily logically impossible. Three
interpretations give the number its meaning.

- **Long-run relative frequency.** The probability of an outcome is the
  proportion of times it would occur in a long series of independent
  repetitions of a random process. A single coin toss is unpredictable; the
  proportion of heads over repeated tosses of a fair coin tends toward 0.5
  as the number of repetitions grows. This frequentist reading is the foundation of sampling-based
  inference.
- **Theoretical (classical) probability.** When a process has finitely many
  *equally likely* outcomes, probabilities follow by counting:

  $$P(A) = \frac{\text{number of outcomes in } A}{\text{total number of outcomes}}.$$

  The numerator counts **outcomes**, not events, and the formula is only as
  good as the equally-likely assumption. The outcomes "0, 1, 2 heads in two
  tosses," for example, are not equally likely — there are two ways to get
  one head but one way each to get zero or two.
- **Empirical probability.** When the process cannot be assumed uniform,
  probability is estimated from observed frequencies: the proportion of
  occurrences of $A$ in past data. Empirical probabilities are estimates;
  theoretical and long-run probabilities are what they estimate.

## Sample spaces and events

The **sample space** $S$ is the set of all possible outcomes of a random
process; it may be finite ($\{H, T\}$ for one coin toss) or infinite (any
number in an interval). An **event** is a subset of $S$ — one or more
outcomes viewed as a single proposition. The **complement** $A^c$ of an
event $A$ consists of all outcomes not in $A$, and

$$P(A^c) = 1 - P(A).$$

## Combining events

For two events $A$ and $B$:

- The **union** $A \cup B$ ("$A$ or $B$") contains outcomes in either event or
  both.
- The **intersection** $A \cap B$ ("$A$ and $B$") contains outcomes in both.
- Events are **mutually exclusive** (disjoint) if $A \cap B = \emptyset$:
  they cannot occur together, so $P(A \cap B) = 0$.

### Addition rule

The probability that at least one of two events occurs is

$$P(A \cup B) = P(A) + P(B) - P(A \cap B).$$

The intersection is subtracted because it is counted in both $P(A)$ and
$P(B)$ — a Venn diagram makes the double counting visible. For mutually
exclusive events the rule reduces to $P(A \cup B) = P(A) + P(B)$.

## Conditional probability

A **conditional probability** is the probability of one event within the
restricted world where another event is known to have occurred:

$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \qquad P(B) > 0.$$

Conditioning renormalizes the sample space to $B$: only the outcomes in $B$
remain possible, and their probabilities are rescaled to sum to 1. For
example, on a fair die with $A = \{2, 4, 6\}$ (even) and $B = \{4, 5, 6\}$
(above 3), $P(A \mid B) = 2/3$ — two of the three outcomes in $B$ are even.

### The order of conditioning matters

In general

$$P(A \mid B) \neq P(B \mid A).$$

With the same die, let $A = \{2, 4, 6\}$ and $B = \{6\}$. Then
$P(A \mid B) = 1$ — a 6 is certainly even — but $P(B \mid A) = 1/3$: only
one of the three even faces is a 6. The two conditionals describe different
restrictions of the sample space and coincide only in special cases. This
asymmetry is not a technicality: a p-value is $P(\text{data at least this
extreme} \mid \text{null model})$, not the probability of the null given
the data. Keeping the condition and the target in their proper roles is the
subject of [P-Values](/topics/foundations/p-values).

### Marginal, joint, and conditional

In a two-way classification, the **joint** probability $P(A \cap B)$ is the
probability of both events together; a **marginal** probability such as
$P(A)$ is the overall probability of $A$ across all groups; a **conditional**
probability such as $P(A \mid B)$ is the probability of $A$ within one
group. The three are linked by the conditional-probability definition above.

## Multiplication rule

Rearranging the definition of conditional probability yields the general
**multiplication rule** for joint probability:

$$P(A \cap B) = P(A \mid B)\, P(B) = P(B \mid A)\, P(A).$$

Either factorization is valid; choose the one that matches what is known.
The rule chains to more events:

$$P(A \cap B \cap C) = P(A)\, P(B \mid A)\, P(C \mid A \cap B).$$

### Independence

Events $A$ and $B$ are **independent** when knowing one occurred changes
nothing about the other: $P(A \mid B) = P(A)$, equivalently $P(B \mid A) =
P(B)$. For independent events the multiplication rule simplifies to

$$P(A \cap B) = P(A)\, P(B),$$

extended to any number of independent events by multiplying their marginal
probabilities. Independence is an assumption about how the world generates
data (separate trials, unrelated mechanisms); it cannot be manufactured by
wishing, and it should be stated when it is used.

### Independence is not mutual exclusivity

The two simplifying conditions are easily confused and are almost opposite
in force. Mutual exclusivity is a property of the *events*: they share no
outcomes. Independence is a property of the *probabilities*: knowing one
occurred leaves the other's probability unchanged. If $A$ and $B$ are
mutually exclusive and both have positive probability, they cannot be
independent — conditioning on $B$ drives the probability of $A$ to zero.
Disjointness shrinks the joint to nothing; independence leaves the joint as
the product of the marginals.

## Law of total probability

An event can usually occur through several mutually exclusive routes. If
$B_1, \ldots, B_k$ partition the sample space (mutually exclusive and
exhaustive), then

$$P(A) = \sum_{i=1}^{k} P(A \mid B_i)\, P(B_i).$$

The marginal probability of $A$ is a weighted average of its conditional
probabilities across the groups, weighted by the groups' probabilities. For a binary
partition this reads $P(A) = P(A \mid B)P(B) + P(A \mid B^c)P(B^c)$.

**Screening example.** Suppose a condition affects 1% of a population,
$P(C) = 0.01$, and a test has sensitivity $P({+} \mid C) = 0.90$ and false
positive rate $P({+} \mid C^c) = 0.08$. Then

$$P(+) = 0.90 \times 0.01 + 0.08 \times 0.99 = 0.0882,$$

so about 8.8% of all tests are positive even though only 1% of the
population has the condition.

## Bayes' theorem

The multiplication rule gives two expressions for the same joint
probability, $P(A \mid B)P(B) = P(B \mid A)P(A)$. Equating them and dividing
yields **Bayes' theorem**:

$$P(B \mid A) = \frac{P(A \mid B)\, P(B)}{P(A)} = \frac{P(A \mid B)\, P(B)}{\sum_i P(A \mid B_i)\, P(B_i)},$$

where the denominator uses the law of total probability when $B$ is one
member of the partition $\{B_i\}$. Bayes' theorem **reverses the
conditioning**: it converts the probability of evidence given a hypothesis
into the probability of the hypothesis given the evidence.

Continuing the screening example, the probability that a person with a
positive test actually has the condition is

$$P(C \mid +) = \frac{0.90 \times 0.01}{0.0882} \approx 0.102.$$

Despite 90% sensitivity, only about one in ten positive results is a true
case, because the condition is rare and false positives are many in
absolute terms. Base rates drive this result; neglecting them is the most
common error in conditional-probability reasoning, and the reason a
low-prevalence screening program needs confirmatory testing.

## Random variables and distributions

A **random variable** $X$ assigns a numerical value to each outcome of a
random process. It is **discrete** when its possible values form a finite or
countable set (counts, correct responses, numbers of events) and
**continuous** when it can take any value in an interval (reaction times,
heights, blood pressure).

### Probability mass functions

For a discrete random variable, the **probability mass function** (PMF)
gives the probability of each value:

$$p(x) = P(X = x), \qquad \sum_x p(x) = 1.$$

Point probabilities are meaningful for discrete variables: $P(X = 1)$ is
well defined and generally positive. Named families of PMFs model common
counting processes; the binomial family in particular underlies the exact
tail probabilities of the [Sign Test](/topics/foundations/sign-test).

### Probability density functions

For a continuous random variable, individual points carry no probability:

$$P(X = x) = 0 \quad \text{for every } x,$$

because no point occupies any share of an interval's infinitely many
possibilities. Probability attaches to ranges instead, through the
**probability density function** (PDF) $f(x)$:

$$P(a \leq X \leq b) = \int_a^b f(x)\, dx, \qquad \int_{-\infty}^{\infty} f(x)\, dx = 1.$$

The total area under a density curve is 1, and probability is area over an
interval. The **height of the curve is not a probability** — it is a
density, probability per unit of $x$, and can exceed 1. A density curve is
therefore read by area, never by height; this area interpretation is
exactly what makes tail probabilities and p-values geometrically meaningful
once a sampling distribution is specified in
[Sampling Distributions](/topics/foundations/sampling-distributions).

## Connections

The rules on this page — conditioning, total probability, Bayes' theorem —
are general-purpose reasoning tools that appear wherever uncertainty is
inverted: diagnostic testing, classification, and evidence evaluation. In
the inferential chain of this collection they are prerequisites for
[Sampling Distributions](/topics/foundations/sampling-distributions),
[Hypothesis Testing](/topics/foundations/hypothesis-testing), and
[P-Values](/topics/foundations/p-values); the [Sign Test](/topics/foundations/sign-test)
applies them to a concrete binomial question.
