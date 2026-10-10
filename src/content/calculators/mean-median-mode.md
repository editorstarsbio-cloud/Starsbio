## About the Mean, Median, Mode Calculator

**Mean**, **Median**, and **Mode** are the three measures of central tendency — the most fundamental concepts in descriptive statistics. Each describes the "center" of a dataset differently, and each has situations where it is the most appropriate choice.

---

## The Three Measures Explained

### Mean (Arithmetic Average)
Sum all values, divide by count:
$$ \bar{x} = \frac{\sum x_i}{n} $$

**Example:** Dataset: 5, 8, 3, 9, 5
$$ \bar{x} = \frac{5+8+3+9+5}{5} = \frac{30}{5} = 6 $$

### Median (Middle Value)
Sort the data, find the middle value.
- **Odd count:** The exact middle value.
- **Even count:** Average of the two middle values.

Sorted: 3, 5, **5**, 8, 9 → **Median = 5**

### Mode (Most Frequent Value)
The value(s) that appear most often.

Dataset: 3, 5, 5, 8, 9 → **Mode = 5** (appears twice)

A dataset can have no mode, one mode (unimodal), or multiple modes (multimodal).

---

## When to Use Each Measure

| Situation | Best Measure |
|:---|:---|
| Symmetric data, no outliers | Mean |
| Skewed data, extreme outliers | Median |
| Categorical or nominal data | Mode |
| Household income data | Median (outliers skew mean) |
| Most popular product size | Mode |

**Why income statistics use median:** A neighborhood of 99 people earning $50,000 plus one billionaire earning $1,000,000,000 has a *mean* income of ~$10 million — completely misleading. The *median* income of $50,000 tells the true story.

---

## Frequently Asked Questions

**Can the mean, median, and mode all be the same?**
Yes. In a perfectly symmetrical, unimodal distribution (a perfect bell curve), all three measures converge at the same central value.

**What if there is no mode?**
If every value in the dataset appears exactly once, there is no mode. Some statisticians say the dataset has "no mode" while others list all values as modes.
