## About the Half-Life Calculator

**Half-life** is the time it takes for half of the atoms in a radioactive substance to decay. This concept is central to nuclear physics, archaeology (carbon dating), medicine (drug dosage scheduling), and environmental science (tracking radioactive contamination).

---

## The Decay Formula

The amount of a substance remaining after time $t$ is:

$$ N(t) = N_0 \times \left(\frac{1}{2}\right)^{\frac{t}{t_{1/2}}} $$

Or equivalently:
$$ N(t) = N_0 \times e^{-\lambda t} $$

Where $\lambda = \frac{\ln 2}{t_{1/2}}$ is the decay constant.

**Example:** Carbon-14 has a half-life of 5,730 years. You start with 100g. How much remains after 11,460 years?

$\frac{11460}{5730} = 2$ half-lives have passed:
$$ N = 100 \times \left(\frac{1}{2}\right)^2 = 100 \times 0.25 = 25 \text{ g} $$

---

## Common Half-Lives

| Isotope | Half-Life | Application |
|:---|:---|:---|
| Carbon-14 | 5,730 years | Archaeological dating |
| Uranium-238 | 4.5 billion years | Geological dating |
| Iodine-131 | 8 days | Cancer treatment |
| Technetium-99m | 6 hours | Medical imaging |

---

## Frequently Asked Questions

**Does half-life mean the substance is gone after two half-lives?**
No. After one half-life, 50% remains. After two, 25% remains. After ten, 0.098% remains. Theoretically, some amount always remains — the substance asymptotically approaches zero but never fully disappears.

**How is half-life used in medicine?**
Pharmacokinetics uses the biological half-life of drugs to determine dosing schedules. A drug with a 4-hour half-life must be taken every 4–8 hours to maintain effective blood concentrations.
