## About the Combination Calculator

A **combination** tells you in how many ways you can choose a subset of items from a larger set, when the **order of selection does not matter**. Combinations are fundamental in probability, statistics, cryptography, and game theory.

---

## The Formula

The number of ways to choose $r$ items from $n$ items (without repetition, order irrelevant):

$$ C(n,r) = \binom{n}{r} = \frac{n!}{r!(n-r)!} $$

**Example 1 — Lottery:** How many ways to pick 6 numbers from 49 (order doesn't matter):
$$ C(49,6) = \frac{49!}{6! \cdot 43!} = 13,983,816 $$

Your odds of winning a standard 6/49 lottery jackpot: 1 in 13,983,816.

**Example 2 — Committee:** How many 3-person committees from a group of 10?
$$ C(10,3) = \frac{10!}{3! \cdot 7!} = \frac{10 \times 9 \times 8}{3 \times 2 \times 1} = 120 $$

---

## Combinations vs. Permutations

| | Formula | When to Use |
|:---|:---|:---|
| **Combination** | $\frac{n!}{r!(n-r)!}$ | Order doesn't matter (teams, committees, hands of cards) |
| **Permutation** | $\frac{n!}{(n-r)!}$ | Order matters (races, passwords, rankings) |

A combination $C(5,2) = 10$; the corresponding permutation $P(5,2) = 20$ — always larger because each combination corresponds to $r!$ permutations.

---

## Frequently Asked Questions

**What are Pascal's Triangle and combinations?**
Pascal's Triangle is a triangular array where each entry is $\binom{n}{r}$. Row $n$, position $r$ gives $C(n,r)$. The triangle has beautiful properties: each row sums to $2^n$, and adjacent entries add to give the entry below them.

**What is "combinations with repetition"?**
If you can choose the same item multiple times (e.g., choosing 3 flavors from 5 where repeats are allowed): $C_r(n,r) = \binom{n+r-1}{r}$.
