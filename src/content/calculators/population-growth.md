## About the Population Growth Calculator

Our **Population Growth Calculator** models how populations—whether human cities, bacterial colonies, or endangered animal species—change over time. It uses exponential growth formulas to project future numbers based on current growth rates.

---

## The Formula

The standard formula for continuous exponential population growth is:

$$ P(t) = P_0 \times e^{rt} $$

Where:
- **$P(t)$** = Population at time $t$
- **$P_0$** = Initial Population
- **$e$** = Euler's number (approximately 2.71828)
- **$r$** = Growth rate (as a decimal)
- **$t$** = Time (in years, days, hours, etc.)

**Example (Human City):**
A city has a population of 100,000 and is growing at a rate of 2% (0.02) per year. What will the population be in 10 years?
$$ P(10) = 100000 \times e^{(0.02 \times 10)} = 100000 \times e^{0.2} = 100000 \times 1.2214 = \mathbf{122,140} $$

**Example (Bacteria):**
A colony of 500 bacteria grows at a rate of 50% per hour. In 24 hours:
$$ P(24) = 500 \times e^{(0.50 \times 24)} = 500 \times e^{12} = 500 \times 162754 = \mathbf{81,377,000} $$

---

## Exponential vs. Logistic Growth

The formula above assumes unlimited resources, which is impossible in the real world.

1. **Exponential Growth:** The population grows faster and faster forever (a "J-curve"). This happens initially when resources are abundant.
2. **Logistic Growth:** The population grows rapidly at first, but slows down as it approaches the "carrying capacity" of the environment (an "S-curve"). Carrying capacity is the maximum population the environment can sustain before food, water, or space run out. 

---

## Frequently Asked Questions

**Why does a small growth rate result in huge numbers?**
Because of compounding. A 1% growth rate doesn't sound like much, but a population of 1 billion growing at 1% adds 10 million people in the first year. The next year, the 1% is calculated on 1.01 billion, adding 10.1 million. The absolute number added grows every single cycle.

**What is a negative growth rate?**
If the death rate exceeds the birth rate, $r$ becomes negative. The population undergoes exponential decay. Several developed nations currently have negative organic growth rates.
