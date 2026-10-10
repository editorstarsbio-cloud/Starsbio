## About the Doubling Time Calculator

**Doubling Time** is the amount of time it takes for a given quantity to double in size or value at a constant growth rate. We use this concept in finance (compound interest), biology (population growth), and epidemiology (spread of viruses).

---

## The Exact Formula

If a quantity grows exponentially, the exact formula to calculate the doubling time ($T_d$) is derived using natural logarithms:

$$ T_d = \frac{\ln(2)}{\ln(1 + r)} $$

Where:
- **$\ln$** = Natural logarithm
- **$r$** = Growth rate (as a decimal)

**Example:**
A country's GDP is growing at 5% per year. How long will it take for the economy to double in size?
$$ T_d = \frac{\ln(2)}{\ln(1 + 0.05)} = \frac{0.693}{0.04879} = \mathbf{14.2 \text{ years}} $$

---

## Continuous vs. Discrete Growth

If the growth is continuous (like bacteria dividing constantly, rather than interest paid once a year), the formula simplifies to:

$$ T_d = \frac{\ln(2)}{r} \approx \frac{0.693}{r} $$

If a bacteria colony grows continuously at a rate of 10% per hour:
$$ T_d = \frac{0.693}{0.10} = \mathbf{6.93 \text{ hours}} $$

---

## The Rule of 72 (Mental Shortcut)

For financial applications, the **Rule of 72** provides a highly accurate mental math shortcut for finding doubling time. You simply divide 72 by the percentage growth rate.

$$ \text{Years to Double} \approx \frac{72}{\text{Interest Rate (as whole number)}} $$

- At 6% interest: $72 / 6 = 12$ years.
- At 9% interest: $72 / 9 = 8$ years.

While not mathematically perfect to the exact decimal, it is incredibly useful for everyday financial planning.

---

## Frequently Asked Questions

**How does doubling time relate to pandemics?**
During the early exponential phase of a viral outbreak, epidemiologists track the doubling time of confirmed cases. If cases double every 3 days, hospitals can quickly become overwhelmed (1,000 cases become 64,000 cases in less than 3 weeks). Social distancing measures aim to "flatten the curve" by increasing the doubling time from 3 days to 14+ days.
