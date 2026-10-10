## About the Future Value Calculator

**Future Value (FV)** calculates how much a current sum of money, or a series of regular payments, will be worth at a specific date in the future when invested at a given interest rate. It is the mathematical opposite of Present Value.

---

## The Formula

The formula for the future value of a single lump sum is the standard compound interest formula:

$$ \text{FV} = \text{Present Value} \times (1 + r)^t $$

Where:
- **$r$** = Interest rate per period
- **$t$** = Number of periods

**Example (Lump Sum):**
You invest $5,000 today at a 7% annual return. How much will it be worth in 20 years?
$$ \text{FV} = 5000 \times (1 + 0.07)^{20} = 5000 \times 3.8697 = \mathbf{\$19,348.50} $$

### Future Value of an Annuity
Most people do not just invest a lump sum; they contribute a specific amount every month or year (an annuity). The formula for the future value of an annuity is:

$$ \text{FV} = P \times \left( \frac{(1 + r)^t - 1}{r} \right) $$

*(Where $P$ is the periodic payment amount)*

**Example (Regular Contributions):**
You invest $5,000 every year for 20 years at a 7% annual return.
$$ \text{FV} = 5000 \times \left( \frac{(1 + 0.07)^{20} - 1}{0.07} \right) = 5000 \times \left( \frac{2.8697}{0.07} \right) = 5000 \times 40.995 = \mathbf{\$204,975} $$

---

## The Impact of Compounding Frequency

The more frequently interest is calculated and added to your balance, the faster your money grows. A 6% annual rate compounded *daily* yields slightly more than a 6% rate compounded *annually*.

- **Annual:** $(1 + 0.06)^1 = 1.0600$
- **Monthly:** $(1 + \frac{0.06}{12})^{12} = 1.0616$
- **Daily:** $(1 + \frac{0.06}{365})^{365} = 1.0618$

The difference (called the APY or Annual Percentage Yield) becomes highly significant over large sums and long periods.

---

## Frequently Asked Questions

**Why is Future Value important?**
It helps you plan for retirement and major purchases. If you know you need $1,000,000 to retire in 30 years, you can use the FV formula backward to calculate exactly how much you need to save each month at an expected 8% return to reach that goal.

**Does this account for inflation?**
No. The Future Value calculator gives you the *nominal* amount of money you will have. To find out the actual purchasing power of that money, you must subtract the expected inflation rate from your expected return rate (e.g., 8% return - 3% inflation = 5% "real" return).
