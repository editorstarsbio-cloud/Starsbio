## About the Probability Calculator

**Probability** measures how likely an event is to occur, expressed as a number between 0 (impossible) and 1 (certain), or as a percentage between 0% and 100%. Our calculator handles single events, combined events, and complementary probabilities.

---

## Core Probability Formulas

### Single Event
$$ P(A) = \frac{\text{Number of favorable outcomes}}{\text{Total number of possible outcomes}} $$

**Example:** Rolling a 4 on a standard 6-sided die:
$$ P(4) = \frac{1}{6} \approx 0.1667 = 16.67\% $$

### Complement (NOT happening)
$$ P(\text{not } A) = 1 - P(A) $$

The probability of NOT rolling a 4: $1 - \frac{1}{6} = \frac{5}{6} \approx 83.33\%$

### Two Independent Events (AND — both must happen)
$$ P(A \text{ and } B) = P(A) \times P(B) $$

Rolling a 4 AND flipping heads on a coin:
$$ P = \frac{1}{6} \times \frac{1}{2} = \frac{1}{12} \approx 8.33\% $$

### Either Event (OR — at least one happens)
$$ P(A \text{ or } B) = P(A) + P(B) - P(A \text{ and } B) $$

---

## Frequently Asked Questions

**What is the difference between theoretical and experimental probability?**
Theoretical probability is calculated from mathematical reasoning (a fair coin has exactly 50% heads). Experimental probability is measured from actual trials (flipping a coin 1,000 times and counting). They converge as trials increase — this is the Law of Large Numbers.

**What does "independent" mean in probability?**
Two events are independent if the outcome of one has zero effect on the other. Coin flips are independent. Drawing cards from a deck *without replacement* are **dependent** — removing one card changes the remaining composition.

**What is conditional probability?**
$P(A|B)$ means "the probability of A given that B has already happened." Formula: $P(A|B) = \frac{P(A \text{ and } B)}{P(B)}$.
