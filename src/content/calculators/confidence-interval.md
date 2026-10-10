## About the Confidence Interval Calculator

A **confidence interval** gives you a range of values that is likely to contain the true population parameter you are estimating. Rather than a single point estimate, it quantifies the uncertainty in your measurement.

A **95% confidence interval** means: if you collected 100 random samples and calculated this interval for each, approximately 95 of those intervals would contain the true population mean.

---

## The Formula (for a population mean)

$$ CI = \bar{x} \pm z \times \frac{\sigma}{\sqrt{n}} $$

Where:
- **$\bar{x}$** = Sample mean
- **$z$** = Z-score for your confidence level (1.96 for 95%, 2.576 for 99%)
- **$\sigma$** = Population standard deviation (or sample standard deviation $s$)
- **$n$** = Sample size

**Example:** You sample 50 students and find a mean test score of 78, with a standard deviation of 10. Calculate the 95% CI:

$$ CI = 78 \pm 1.96 \times \frac{10}{\sqrt{50}} = 78 \pm 1.96 \times 1.414 = 78 \pm 2.77 $$

**95% CI: (75.23, 80.77)**

You are 95% confident the true population mean score is between 75.23 and 80.77.

---

## Common Z-values for Confidence Levels

| Confidence Level | Z-score |
|:---|:---|
| 90% | 1.645 |
| 95% | 1.960 |
| 99% | 2.576 |
| 99.9% | 3.291 |

---

## Frequently Asked Questions

**Does a wider confidence interval mean less certainty?**
Yes. A wider interval reflects more uncertainty (small sample size, high variance). Narrowing a CI requires increasing sample size, which is why large studies are more conclusive.

**What is the margin of error?**
The margin of error is the second half of the CI formula: $z \times \frac{\sigma}{\sqrt{n}}$. In polling, you frequently see "±3 percentage points" — that is the margin of error at a 95% confidence level.
