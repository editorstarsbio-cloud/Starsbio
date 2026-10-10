## About the Factorial Calculator

The **factorial** of a non-negative integer $n$, written as $n!$, is the product of all positive integers from 1 up to $n$. Factorials are the building blocks of combinatorics, probability, and statistical distributions.

---

## Definition and Formula

$$ n! = n \times (n-1) \times (n-2) \times \cdots \times 2 \times 1 $$

Special case: $0! = 1$ (by mathematical definition)

**Examples:**
- $5! = 5 \times 4 \times 3 \times 2 \times 1 = 120$
- $10! = 3,628,800$
- $20! = 2,432,902,008,176,640,000$

Factorials grow extremely rapidly — $100!$ has 158 digits.

---

## Applications of Factorials

### Combinations (Choosing Without Order)
How many ways to choose $r$ items from $n$ items?
$$ C(n,r) = \binom{n}{r} = \frac{n!}{r!(n-r)!} $$

**Example:** Lottery — how many ways to pick 6 numbers from 49?
$$ C(49,6) = \frac{49!}{6! \cdot 43!} = 13,983,816 $$

### Permutations (Choosing With Order)
$$ P(n,r) = \frac{n!}{(n-r)!} $$

**Example:** How many ways can 3 runners finish 1st, 2nd, 3rd from 10 competitors?
$$ P(10,3) = \frac{10!}{7!} = 10 \times 9 \times 8 = 720 $$

---

## Frequently Asked Questions

**Why is 0! = 1?**
The definition $0! = 1$ is not arbitrary — it is necessary for combinatorial formulas to work correctly. $C(n,0) = 1$ (there is exactly one way to choose nothing), and the formula gives $\frac{n!}{0! \cdot n!} = \frac{1}{1} = 1$ only if $0! = 1$.

**What is Stirling's Approximation?**
For very large $n$, directly computing $n!$ is impractical. Stirling's formula provides a close approximation:
$$ n! \approx \sqrt{2\pi n} \left(\frac{n}{e}\right)^n $$
