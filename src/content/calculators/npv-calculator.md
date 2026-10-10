## About the NPV Calculator (Net Present Value)

**Net Present Value (NPV)** is the single most important metric in corporate finance for evaluating whether a project or investment will create or destroy value. A positive NPV means the investment will generate more value than it costs. A negative NPV means you are better off not investing.

---

## The NPV Formula

$$ NPV = \sum_{t=0}^{n} \frac{C_t}{(1+r)^t} $$

In plain language: NPV = (Sum of all discounted future cash flows) − Initial Investment

Where:
- **$C_t$** = Cash flow at time period $t$ (can be negative if it's a cost)
- **$r$** = Discount rate (your required rate of return)
- **$t$** = Time period (years)

**Example:** You are considering a $50,000 investment that returns $20,000/year for 3 years, at a 10% discount rate:

| Year | Cash Flow | Discount Factor | PV |
|:---|:---|:---|:---|
| 0 | −$50,000 | 1.000 | −$50,000 |
| 1 | +$20,000 | 0.909 | $18,182 |
| 2 | +$20,000 | 0.826 | $16,529 |
| 3 | +$20,000 | 0.751 | $15,026 |

$$ NPV = -50,000 + 18,182 + 16,529 + 15,026 = -\$263 $$

NPV is slightly **negative** (-$263). This investment barely destroys value — you should not proceed at a 10% required return.

---

## Frequently Asked Questions

**What does a zero NPV mean?**
An NPV of exactly zero means the investment earns exactly your required rate of return — no more, no less. This is generally considered the break-even threshold.

**What is the relationship between NPV and IRR?**
IRR (Internal Rate of Return) is the discount rate at which NPV equals zero. If the IRR exceeds your required return, NPV is positive and the project creates value.
