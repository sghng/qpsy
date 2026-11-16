---
description: Privacy-preserving estimation of sensitive-attribute prevalence — the mirror (Warner), forced-response, and two-sample unrelated-question designs, their moment estimators and worked examples, and their identifiability, precision, and privacy limits
---

# Randomized Response Techniques

Randomized response is a survey design for estimating the prevalence of a
sensitive attribute — stigmatized behavior, rule-breaking, undisclosed status
— when direct questioning invites the [social-desirability
bias](/topics/measurement/response-bias) of evasive answers. The respondent
operates a private randomizer, such as a coin or a deck of cards, whose
outcome the researcher never observes. The outcome determines which of several
answering instructions applies, so no individual answer can be identified as a
truthful admission. What the design does identify is the population
prevalence: the randomization is built into the probability model for the
observed answers, and the prevalence is recovered by inverting that model. The
technique was introduced by Warner (1965) for exactly this purpose —
eliminating evasive-answer bias in population-proportion estimation.

Throughout, $\pi$ denotes the unknown population proportion carrying the
attribute, $\lambda$ the unknown probability that a randomly sampled
respondent answers "yes", $p$ a known randomizer probability, and hatted
symbols ($\hat\lambda$, $\hat\pi$) estimates computed from data.

## Assumptions

The designs below are method-of-moments estimators (see
[estimation](/modeling/estimation)) and rest on a common set of conditions:

- The randomizer probabilities are known exactly (a verified fair or loaded
  coin, a counted deck).
- Respondents follow the instructions, which requires that they understand
  and believe the privacy protection; the protection is the reason compliance
  is plausible.
- Randomizer outcomes are independent across respondents.
- The attribute is binary with a common prevalence $\pi$ across the sampled
  population; the target of inference is the group, never the individual.
- The number of respondents is large enough that the observed yes-proportion
  $\hat\lambda$ is close to $\lambda$; the
  [sampling distribution](/topics/foundations/sampling-distributions) of
  $\hat\lambda$ is the binomial proportion's.

## The mirror design (Warner)

The randomizer has two outcomes and the respondent either answers the
sensitive question truthfully or reversed — on a head, answer truthfully; on a
tail, answer untruthfully. A carrier then says "yes" with probability $p$, and
a non-carrier says "yes" with probability $1 - p$, so the observed yes-rate
is

$$
\lambda = p\,\pi + (1 - p)(1 - \pi) = (2p - 1)\,\pi + (1 - p).
$$

Solving for $\pi$ and inserting $\hat\lambda$ gives the moment estimator

$$
\hat\pi = \frac{\hat\lambda + p - 1}{2p - 1}.
$$

**Worked example.** A loaded coin lands heads with probability $p = 0.7$; of
$n = 100$ respondents, 60 answer "yes", so $\hat\lambda = 0.6$. Then

$$
\hat\pi = \frac{0.6 + 0.7 - 1}{2(0.7) - 1} = \frac{0.3}{0.4} = 0.75 .
$$

**Identifiability.** The estimator requires $p \neq 1/2$. At $p = 1/2$ the
model collapses to $\lambda = 1/2$ for every $\pi$: a fair coin makes every
population equally consistent with the data, so $\pi$ is not identified at
any sample size. The design therefore needs a deliberately unequal randomizer.

## The forced-response design

Here the randomizer forces the answer itself: on a head, answer "yes"
regardless of the truth; on a tail, answer truthfully. A carrier says "yes"
with probability 1, a non-carrier with probability $p$, so

$$
\lambda = p + (1 - p)\,\pi,
\qquad
\hat\pi = \frac{\hat\lambda - p}{1 - p}.
$$

**Worked example.** With a fair coin ($p = 0.5$), $n = 100$, and 60 yes
answers,

$$
\hat\pi = \frac{0.6 - 0.5}{1 - 0.5} = \frac{0.1}{0.5} = 0.20 .
$$

**Identifiability.** This design requires $p \neq 1$ — a fair coin is
acceptable, and only a randomizer that always forces the answer destroys
information about $\pi$. The two designs fail at opposite randomizer
settings, which is worth noting when one is chosen as a fallback for the
other.

## The two-sample unrelated-question design

Both designs above reveal which question was asked, only concealing the
randomizer outcome. A stronger design routes respondents between two
questions — the sensitive question (unknown prevalence $\pi_1$) and a neutral
question with unknown prevalence $\pi_2$, such as attendance at a school
event — using two independent samples with different known routing
probabilities $p_1$ and $p_2$: in sample $i$, a randomizer outcome with
probability $p_i$ selects the sensitive question, otherwise the neutral one.
The observed yes-rates follow

$$
\lambda_i = p_i\,\pi_1 + (1 - p_i)\,\pi_2, \qquad i = 1, 2 .
$$

Two equations in two unknowns: solving the system gives the estimators

$$
\hat\pi_1 = \frac{\hat\lambda_1 (1 - p_2) - \hat\lambda_2 (1 - p_1)}{p_1 - p_2},
\qquad
\hat\pi_2 = \frac{p_1 \hat\lambda_2 - p_2 \hat\lambda_1}{p_1 - p_2}.
$$

**Worked example.** Sample 1 is routed by a fair coin ($p_1 = 0.5$); sample 2
draws from a deck that is 80% light-colored cards ($p_2 = 0.8$). In sample 1,
25 of $n_1 = 50$ answer yes ($\hat\lambda_1 = 0.50$); in sample 2, 16 of
$n_2 = 50$ answer yes ($\hat\lambda_2 = 0.32$). Then

$$
\hat\pi_1 = \frac{0.50(0.2) - 0.32(0.5)}{0.5 - 0.8} = \frac{-0.06}{-0.30} = 0.20,
\qquad
\hat\pi_2 = \frac{0.5(0.32) - 0.8(0.50)}{0.5 - 0.8} = \frac{-0.24}{-0.30} = 0.80 .
$$

Both unknown prevalences are estimated, and the researcher never learns even
which question a respondent answered — the anonymity covers the question
identity, not merely the answer's truthfulness.

## Identifiability, precision, and privacy limits

**Identification conditions differ by design.** The mirror design is
identified only when $p \neq 1/2$; the forced-response design only when
$p \neq 1$; the two-sample design only when $p_1 \neq p_2$. At $p_1 = p_2$ the
two routing equations become the same equation — the determinant $p_1 - p_2$
vanishes, and the system is nonidentified. No sample size repairs
nonidentification: two unknowns cannot be recovered from one equation, so the
remedy is a different design, not more data. Larger samples help only in the
neighborhood of identification failure, when $p_1$ and $p_2$ differ but only
slightly.

**Precision.** Each estimator is a linear rescaling of an observed
proportion, so it inherits that proportion's binomial noise amplified by the
reciprocal of the design's identifying quantity. For the mirror design, with
$\operatorname{Var}(\hat\lambda) = \lambda(1 - \lambda)/n$,

$$
\operatorname{Var}(\hat\pi) = \frac{\lambda(1 - \lambda)}{n\,(2p - 1)^2} ,
$$

and analogous amplification by $1/(1 - p)^2$ and $1/(p_1 - p_2)^2$ holds in
the other two designs. The variance grows without bound as the design
approaches its nonidentification boundary, so sample-size planning must trade
the privacy strength of a near-balanced randomizer against the precision cost
of estimating near that boundary. In small samples the amplified noise can
push estimates outside $[0, 1]$, which is a signal to plan the randomizer and
sample size jointly rather than to truncate the estimate.

**Privacy.** The design guarantee is that no individual answer can be labeled
truthful or evasive — the researcher's uncertainty about the randomizer
outcome is what removes the incentive to misreport. It is not a guarantee of
zero individual-level information: in every design the probability of a given
answer differs between carriers and non-carriers (in the mirror design, $p$
versus $1 - p$), so an answer still shifts the odds of any single
respondent's status. The protection is practical plausible deniability, and
it is purchased at the price of the precision loss above. Randomized response
estimates group prevalence; it does not classify individuals, and using it as
if it did defeats both its statistical and its ethical rationale.

## Reference

- Warner, S. L. (1965). Randomized response: A survey technique for
  eliminating evasive answer bias. *Journal of the American Statistical
  Association*, 60(309), 63–69.
  [doi:10.1080/01621459.1965.10480775](https://doi.org/10.1080/01621459.1965.10480775)
