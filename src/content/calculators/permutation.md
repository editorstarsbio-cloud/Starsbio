## About the Permutation Calculator

A **permutation** tells you how many ways you can arrange a subset of items from a larger set, when **order matters**. Unlike combinations (where {A,B,C} and {C,B,A} are the same), in permutations, different orderings count as different outcomes.

---

## The Formula

The number of ways to arrange $r$ items selected from $n$ items:

$$ P(n,r) = \frac{n!}{(n-r)!} $$

**Example 1 — Race:** How many ways can 3 runners finish 1st, 2nd, 3rd from 8 competitors?
$$ P(8,3) = \frac{8!}{(8-3)!} = \frac{8!}{5!} = 8 \times 7 \times 6 = 336 $$

**Example 2 — Full Arrangement:** How many ways to arrange all 4 letters in "MATH"?
$$ P(4,4) = \frac{4!}{0!} = 4! = 24 $$

---

## Permutations with Repetition

If you can reuse items (like a PIN code where each digit can be any of 10 digits):
$$ P_{\text{repeat}} = n^r $$

A 4-digit PIN from digits 0–9: $10^4 = 10,000$ possible combinations.

---

## Combinations vs Permutations — When to Use Which

**Order matters → Permutation:**
- Race standings
- Lock combinations (PIN codes)
- Anagram arrangements
- Scheduling tasks in a sequence

**Order does NOT matter → Combination:**
- Lottery tickets
- Committee selections
- Card hand choices

---

## Frequently Asked Questions

**What is the difference between a permutation and a combination numerically?**
$P(n,r) = C(n,r) \times r!$ — every combination corresponds to $r!$ permutations. For choosing 3 from 5: $C(5,3) = 10$ combinations vs. $P(5,3) = 60$ permutations.

**Are there permutations with repeated elements?**
Yes. If you have repeated elements, you divide by the factorial of each repeated count. The word "MISSISSIPPI" has 11 letters with repeats: $\frac{11!}{1! \cdot 4! \cdot 4! \cdot 2!} = 34,650$ unique arrangements.
