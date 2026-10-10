## About the EV Charging Cost Calculator

Our **EV Charging Cost Calculator** determines exactly how much it costs to charge an electric vehicle, whether at home or at a public charging station. It helps EV owners understand their true "fuel" costs compared to internal combustion engine (ICE) vehicles.

---

## The Formula

To calculate the cost of a charge, you need the battery capacity (or the amount of energy added) and the cost of electricity.

$$ \text{Cost} = \text{Energy Added (kWh)} \times \text{Electricity Rate (\$/kWh)} $$

To calculate cost based on battery percentage:
$$ \text{Energy Added} = \text{Battery Capacity (kWh)} \times \left( \frac{\text{Target \%} - \text{Current \%}}{100} \right) $$

**Example (Home Charging):** You have a 75 kWh battery (like a Tesla Model Y). You charge from 20% to 80%, and your home electricity rate is $0.15/kWh.

1. Energy needed: $75 \times (0.80 - 0.20) = 75 \times 0.60 = 45 \text{ kWh}$
2. Add ~10% for charging inefficiency (heat loss): $45 \times 1.1 = 49.5 \text{ kWh}$
3. Cost: $49.5 \times 0.15 = \mathbf{\$7.43}$

**Example (Public Fast Charging):** Same charge (45 kWh), but at a DC Fast Charger costing $0.48/kWh.
Cost = $49.5 \times 0.48 = \mathbf{\$23.76}$

---

## Cost to Drive 100 Miles

To compare EV costs to gas cars, calculate the cost per 100 miles:

$$ \text{Cost per 100 miles} = \left(\frac{100}{\text{EV Efficiency (miles/kWh)}}\right) \times \text{Electricity Rate} $$

An EV getting 3.5 miles/kWh at $0.15/kWh costs **$4.28 per 100 miles**. A 25 MPG gas car at $3.50/gal costs **$14.00 per 100 miles**.

---

## Frequently Asked Questions

**Why is public charging so much more expensive than home charging?**
Public DC Fast Chargers (like Electrify America or Tesla Superchargers) involve massive infrastructure costs, high-power demand charges from utility companies, and profit margins. They can cost 3 to 4 times more per kWh than home electricity.

**What is charging efficiency?**
No charging process is 100% efficient. When AC power from your house is converted to DC power for the battery, some energy is lost as heat. Level 2 home charging is typically 85-90% efficient, meaning you pay for slightly more energy than what actually reaches the battery.
