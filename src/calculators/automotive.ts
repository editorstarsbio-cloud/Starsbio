import { CalculatorDef, CalcError } from '../lib/calc/types';
import { round, money, assert, num } from '../lib/calc/helpers';

export const automotiveCalculators: CalculatorDef[] = [
  {
    id: 'fuel-economy',
    name: 'Fuel Economy Calculator',
    slug: 'fuel-economy-calculator',
    category: 'automotive',
    short: 'Calculate your vehicle\'s fuel efficiency in MPG, L/100km, or km/L.',
    status: 'published',
    inputs: [
      { key: 'distance', type: 'number', label: 'Distance Traveled', default: 300, min: 0.1 },
      { key: 'distanceUnit', type: 'select', label: 'Distance Unit', options: [{ value: 'miles', label: 'Miles' }, { value: 'km', label: 'Kilometers' }], default: 'miles' },
      { key: 'fuel', type: 'number', label: 'Fuel Used', default: 12, min: 0.1 },
      { key: 'fuelUnit', type: 'select', label: 'Fuel Unit', options: [{ value: 'gallons', label: 'Gallons (US)' }, { value: 'liters', label: 'Liters' }], default: 'gallons' }
    ],
    compute: (values) => {
      const distance = num(values.distance);
      const fuel = num(values.fuel);
      const dUnit = values.distanceUnit as string;
      const fUnit = values.fuelUnit as string;

      assert(distance > 0, 'Distance must be greater than zero.');
      assert(fuel > 0, 'Fuel used must be greater than zero.');

      // Convert to miles and gallons (US)
      const miles = dUnit === 'miles' ? distance : distance * 0.621371;
      const km = dUnit === 'km' ? distance : distance * 1.60934;
      const gallons = fUnit === 'gallons' ? fuel : fuel * 0.264172;
      const liters = fUnit === 'liters' ? fuel : fuel * 3.78541;

      const mpg = miles / gallons;
      const lp100km = (liters / km) * 100;
      const kml = km / liters;

      return {
        results: [
          { label: 'Miles per Gallon (US)', value: round(mpg, 1), primary: true },
          { label: 'Liters per 100 km', value: round(lp100km, 1) },
          { label: 'Kilometers per Liter', value: round(kml, 1) }
        ]
      };
    },
    formula: 'Fuel Economy = Distance / Fuel Used',
    intro: [
      'This calculator helps you determine your vehicle\'s fuel economy based on the distance traveled and the amount of fuel used.',
      'It provides results in Miles per Gallon (MPG), Liters per 100 kilometers (L/100km), and Kilometers per Liter (km/L).'
    ],
    howTo: [
      'Enter the distance you have traveled.',
      'Select the unit of distance (miles or kilometers).',
      'Enter the amount of fuel your vehicle consumed.',
      'Select the unit of fuel (gallons or liters).',
      'The calculator will compute your fuel efficiency across different standard metrics.'
    ],
    tests: [
      {
        name: 'Default values',
        inputs: { distance: 300, distanceUnit: 'miles', fuel: 12, fuelUnit: 'gallons' },
        expect: { 'Miles per Gallon (US)': 25.0 }
      },
      {
        name: 'Metric values',
        inputs: { distance: 500, distanceUnit: 'km', fuel: 40, fuelUnit: 'liters' },
        expect: { 'Liters per 100 km': 8.0, 'Kilometers per Liter': 12.5 }
      }
    ]
  },
  {
    id: 'fuel-cost',
    name: 'Fuel Cost Calculator',
    slug: 'fuel-cost-calculator',
    category: 'automotive',
    short: 'Estimate the total fuel cost for a trip based on distance, efficiency, and fuel price.',
    status: 'published',
    inputs: [
      { key: 'distance', type: 'number', label: 'Trip Distance', default: 200, min: 0.1 },
      { key: 'efficiency', type: 'number', label: 'Fuel Efficiency (MPG or km/L)', default: 25, min: 0.1 },
      { key: 'price', type: 'number', label: 'Fuel Price (per gallon or liter)', default: 3.50, min: 0.01 }
    ],
    compute: (values) => {
      const distance = num(values.distance);
      const efficiency = num(values.efficiency);
      const price = num(values.price);

      assert(distance > 0, 'Distance must be positive.');
      assert(efficiency > 0, 'Efficiency must be positive.');
      assert(price >= 0, 'Price cannot be negative.');

      const fuelNeeded = distance / efficiency;
      const totalCost = fuelNeeded * price;

      return {
        results: [
          { label: 'Total Fuel Cost', value: totalCost, money: true, primary: true },
          { label: 'Fuel Required', value: round(fuelNeeded, 2) }
        ]
      };
    },
    formula: 'Cost = (Distance / Efficiency) × Price',
    intro: [
      'Use this calculator to quickly estimate how much you will spend on fuel for a given trip.',
      'It works for any unit system as long as you are consistent (e.g., miles, MPG, and $/gallon OR kilometers, km/L, and $/liter).'
    ],
    howTo: [
      'Enter the total distance of your trip.',
      'Enter your vehicle\'s average fuel efficiency.',
      'Enter the current price of fuel per unit.',
      'The tool will output the total expected cost and the amount of fuel you will need.'
    ],
    tests: [ {
        name: 'Default values',
        inputs: { distance: 200, efficiency: 25, price: 3.50 },
        expect: { 'Total Fuel Cost': 28.00, 'Fuel Required': 8.0 }
      }, {
        name: 'test 2',
        inputs: { distance: 200, efficiency: 25, price: 3.50 },
        expect: { 'Total Fuel Cost': 28.00, 'Fuel Required': 8.0 }
      } ]
  },
  {
    id: 'stopping-distance',
    name: 'Stopping Distance Calculator',
    slug: 'stopping-distance-calculator',
    category: 'automotive',
    short: 'Calculate how far a vehicle travels before coming to a complete stop.',
    status: 'published',
    inputs: [
      { key: 'speed', type: 'number', label: 'Speed (mph)', default: 60, min: 1 },
      { key: 'reactionTime', type: 'number', label: 'Reaction Time (seconds)', default: 1.5, min: 0.1, step: 0.1 },
      { key: 'friction', type: 'number', label: 'Coefficient of Friction', default: 0.7, min: 0.1, max: 1.0, step: 0.05, help: '0.7 is typical for dry roads, 0.4 for wet roads, 0.15 for snow.' }
    ],
    compute: (values) => {
      const speedMph = num(values.speed);
      const reactionTime = num(values.reactionTime);
      const friction = num(values.friction);

      assert(speedMph > 0, 'Speed must be positive.');
      assert(reactionTime >= 0, 'Reaction time cannot be negative.');
      assert(friction > 0, 'Friction coefficient must be positive.');

      // Convert mph to meters per second
      const speedMs = speedMph * 0.44704;
      
      const reactionDistance = speedMs * reactionTime;
      // Braking distance = v^2 / (2 * mu * g)
      const g = 9.80665; // m/s^2
      const brakingDistance = (speedMs * speedMs) / (2 * friction * g);
      
      const totalDistance = reactionDistance + brakingDistance;
      
      // Convert meters to feet
      const mToFt = 3.28084;

      return {
        results: [
          { label: 'Total Stopping Distance (ft)', value: round(totalDistance * mToFt, 1), primary: true },
          { label: 'Total Stopping Distance (m)', value: round(totalDistance, 1) },
          { label: 'Reaction Distance (ft)', value: round(reactionDistance * mToFt, 1) },
          { label: 'Braking Distance (ft)', value: round(brakingDistance * mToFt, 1) }
        ]
      };
    },
    formula: 'Stopping Distance = (Speed × Reaction Time) + (Speed² / (2 × Friction × Gravity))',
    intro: [
      'The stopping distance of a vehicle is the sum of the reaction distance (distance traveled while the driver moves their foot to the brake) and the braking distance (distance traveled once the brakes are applied).',
      'This tool estimates the total stopping distance based on speed, reaction time, and road conditions.'
    ],
    howTo: [
      'Enter the speed of the vehicle in miles per hour.',
      'Enter the driver\'s reaction time in seconds (typically 1.5s to 2.5s).',
      'Enter the coefficient of friction for the road (e.g., 0.7 for dry asphalt, 0.4 for wet asphalt).',
      'Review the calculated reaction, braking, and total stopping distances.'
    ],
    tests: [ {
        name: 'Default values',
        inputs: { speed: 60, reactionTime: 1.5, friction: 0.7 },
        expect: { 'Total Stopping Distance (ft)': 303.3, 'Total Stopping Distance (m)': 92.5 }
      }, {
        name: 'test 2',
        inputs: { speed: 60, reactionTime: 1.5, friction: 0.7 },
        expect: { 'Total Stopping Distance (ft)': 303.3, 'Total Stopping Distance (m)': 92.5 }
      } ]
  },
  {
    id: 'car-depreciation',
    name: 'Car Depreciation Calculator',
    slug: 'car-depreciation-calculator',
    category: 'automotive',
    short: 'Estimate the future value of a car based on its purchase price and annual depreciation rate.',
    status: 'published',
    inputs: [
      { key: 'price', type: 'number', label: 'Purchase Price ($)', default: 30000, min: 1 },
      { key: 'age', type: 'number', label: 'Years Owned', default: 5, min: 1, integer: true },
      { key: 'rate', type: 'number', label: 'Annual Depreciation Rate (%)', default: 15, min: 1, max: 99 }
    ],
    compute: (values) => {
      const price = num(values.price);
      const age = num(values.age);
      const rate = num(values.rate);

      assert(price > 0, 'Price must be positive.');
      assert(age > 0, 'Age must be positive.');
      assert(rate > 0 && rate < 100, 'Depreciation rate must be between 1 and 99.');

      const currentValue = price * Math.pow(1 - (rate / 100), age);
      const lostValue = price - currentValue;

      return {
        results: [
          { label: 'Estimated Current Value', value: currentValue, money: true, primary: true },
          { label: 'Total Value Lost', value: lostValue, money: true }
        ]
      };
    },
    formula: 'Current Value = Purchase Price × (1 - Annual Rate)^Years',
    intro: [
      'Cars lose value over time, a process known as depreciation. Most new cars lose a significant portion of their value in the first few years.',
      'Use this calculator to estimate the current or future value of a vehicle based on an average annual depreciation rate.'
    ],
    howTo: [
      'Enter the original purchase price of the vehicle.',
      'Enter the number of years the vehicle has been or will be owned.',
      'Enter the expected annual depreciation rate (typically 15% to 20% for standard cars).',
      'The calculator estimates the remaining value and the total monetary value lost.'
    ],
    tests: [ {
        name: 'Default values',
        inputs: { price: 30000, age: 5, rate: 15 },
        expect: { 'Estimated Current Value': 13311.16 }
      }, {
        name: 'test 2',
        inputs: { price: 30000, age: 5, rate: 15 },
        expect: { 'Estimated Current Value': 13311.16 }
      } ]
  },
  {
    id: 'car-ownership-cost',
    name: 'Cost of Car Ownership Calculator',
    slug: 'car-ownership-cost-calculator',
    category: 'automotive',
    short: 'Calculate the true monthly and annual costs of owning a vehicle.',
    status: 'published',
    inputs: [
      { key: 'loan', type: 'number', label: 'Monthly Loan/Lease Payment ($)', default: 400, min: 0 },
      { key: 'insurance', type: 'number', label: 'Monthly Insurance ($)', default: 120, min: 0 },
      { key: 'fuel', type: 'number', label: 'Monthly Fuel/Charging ($)', default: 150, min: 0 },
      { key: 'maintenance', type: 'number', label: 'Monthly Maintenance & Repairs ($)', default: 75, min: 0 },
      { key: 'other', type: 'number', label: 'Other Monthly Costs (Parking, Tolls, etc.) ($)', default: 50, min: 0 }
    ],
    compute: (values) => {
      const loan = num(values.loan);
      const insurance = num(values.insurance);
      const fuel = num(values.fuel);
      const maintenance = num(values.maintenance);
      const other = num(values.other);

      const monthlyCost = loan + insurance + fuel + maintenance + other;
      const annualCost = monthlyCost * 12;

      return {
        results: [
          { label: 'Total Monthly Cost', value: monthlyCost, money: true, primary: true },
          { label: 'Total Annual Cost', value: annualCost, money: true }
        ]
      };
    },
    formula: 'Monthly Cost = Loan + Insurance + Fuel + Maintenance + Other',
    intro: [
      'The true cost of owning a car extends well beyond the purchase price or monthly loan payment. Fuel, insurance, maintenance, and other recurring expenses add up quickly.',
      'This calculator helps you understand the total monthly and annual financial commitment required for your vehicle.'
    ],
    howTo: [
      'Enter your monthly auto loan or lease payment.',
      'Enter your estimated monthly insurance premium.',
      'Enter your estimated monthly spending on fuel or EV charging.',
      'Include an average monthly allowance for maintenance and repairs.',
      'Add any other regular monthly expenses like parking or tolls to find your total cost.'
    ],
    tests: [ {
        name: 'Default values',
        inputs: { loan: 400, insurance: 120, fuel: 150, maintenance: 75, other: 50 },
        expect: { 'Total Monthly Cost': 795, 'Total Annual Cost': 9540 }
      }, {
        name: 'test 2',
        inputs: { loan: 400, insurance: 120, fuel: 150, maintenance: 75, other: 50 },
        expect: { 'Total Monthly Cost': 795, 'Total Annual Cost': 9540 }
      } ]
  },
  {
    id: 'ev-charging-cost',
    name: 'EV Charging Cost Calculator',
    slug: 'ev-charging-cost-calculator',
    category: 'automotive',
    short: 'Calculate the cost and energy required to charge an electric vehicle.',
    status: 'published',
    inputs: [
      { key: 'capacity', type: 'number', label: 'Battery Capacity (kWh)', default: 75, min: 1 },
      { key: 'startPct', type: 'number', label: 'Starting Charge (%)', default: 20, min: 0, max: 99 },
      { key: 'endPct', type: 'number', label: 'Target Charge (%)', default: 80, min: 1, max: 100 },
      { key: 'costPerKwh', type: 'number', label: 'Electricity Cost ($/kWh)', default: 0.15, min: 0.01 },
      { key: 'efficiency', type: 'number', label: 'Charging Efficiency (%)', default: 90, min: 50, max: 100 }
    ],
    compute: (values) => {
      const capacity = num(values.capacity);
      const startPct = num(values.startPct);
      const endPct = num(values.endPct);
      const costPerKwh = num(values.costPerKwh);
      const efficiency = num(values.efficiency);

      assert(startPct < endPct, 'Target charge must be greater than starting charge.');
      assert(capacity > 0, 'Battery capacity must be greater than zero.');

      const chargeNeededPct = (endPct - startPct) / 100;
      const energyNeeded = capacity * chargeNeededPct;
      const energyDrawn = energyNeeded / (efficiency / 100);
      
      const totalCost = energyDrawn * costPerKwh;

      return {
        results: [
          { label: 'Total Charging Cost', value: totalCost, money: true, primary: true },
          { label: 'Energy Added to Battery (kWh)', value: round(energyNeeded, 2) },
          { label: 'Energy Pulled from Grid (kWh)', value: round(energyDrawn, 2) }
        ]
      };
    },
    formula: 'Cost = ((Capacity × (End % - Start %)) / Efficiency) × Price per kWh',
    intro: [
      'Charging an electric vehicle involves some energy loss, meaning you pull more electricity from the grid than actually makes it into your battery.',
      'This calculator accounts for your battery size, current charge, target charge, and charging efficiency to estimate the true cost of your charging session.'
    ],
    howTo: [
      'Enter your EV\'s total battery capacity in kilowatt-hours (kWh).',
      'Enter your current battery percentage and the percentage you want to charge to.',
      'Enter the cost of electricity per kWh at your home or public charger.',
      'Adjust the charging efficiency if known (typically 85-95% for Level 2 charging).'
    ],
    tests: [ {
        name: 'Default values',
        inputs: { capacity: 75, startPct: 20, endPct: 80, costPerKwh: 0.15, efficiency: 90 },
        expect: { 'Total Charging Cost': 7.50, 'Energy Added to Battery (kWh)': 45.0 }
      }, {
        name: 'test 2',
        inputs: { capacity: 75, startPct: 20, endPct: 80, costPerKwh: 0.15, efficiency: 90 },
        expect: { 'Total Charging Cost': 7.50, 'Energy Added to Battery (kWh)': 45.0 }
      } ]
  }
];
