import type { CalculatorDef, CalcValues, CalcOutput } from '../lib/calc/types';
import { round, assert, num, parseDate, addDays, formatDate } from '../lib/calc/helpers';

const introDisclaimer = 'Note: This calculator provides an estimate and is not medical advice. Consult a healthcare professional for medical decisions.';

export const healthFitnessCalculators: CalculatorDef[] = [
  {
    id: 'bmi',
    name: 'BMI Calculator',
    slug: 'bmi',
    category: 'health-fitness',
    short: 'Calculate your Body Mass Index (BMI).',
    inputs: [
      { key: 'weight', type: 'number', label: 'Weight', unit: 'kg', default: 70 },
      { key: 'height', type: 'number', label: 'Height', unit: 'cm', default: 175 },
    ],
    compute: (v: CalcValues): CalcOutput => {
      const w = num(v.weight);
      const h = num(v.height);
      assert(w > 0 && h > 0, 'Weight and height must be positive.');
      const hm = h / 100;
      const bmi = w / (hm * hm);
      
      let category = 'Normal weight';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi >= 25 && bmi < 30) category = 'Overweight';
      else if (bmi >= 30) category = 'Obese';

      return {
        results: [
          { label: 'BMI', value: round(bmi, 1), primary: true },
          { label: 'Category', value: category },
        ],
      };
    },
    formula: 'BMI = Weight (kg) / (Height (m))^2',
    intro: ['Calculate your Body Mass Index (BMI).', introDisclaimer],
    status: 'tested',
    tests: [
      { name: 'Normal', inputs: { weight: 70, height: 175 }, expect: { 'BMI': 22.9, 'Category': 'Normal weight' } },
      { name: 'Obese', inputs: { weight: 100, height: 175 }, expect: { 'BMI': 32.7, 'Category': 'Obese' } },
    ]
  },
  {
    id: 'bmr',
    name: 'BMR Calculator',
    slug: 'bmr',
    category: 'health-fitness',
    short: 'Calculate your Basal Metabolic Rate.',
    inputs: [
      { key: 'gender', type: 'select', label: 'Gender', options: [{label:'Male',value:'m'},{label:'Female',value:'f'}], default: 'm' },
      { key: 'age', type: 'number', label: 'Age', unit: 'years', default: 30 },
      { key: 'weight', type: 'number', label: 'Weight', unit: 'kg', default: 70 },
      { key: 'height', type: 'number', label: 'Height', unit: 'cm', default: 175 },
    ],
    compute: (v) => {
      const a = num(v.age);
      const w = num(v.weight);
      const h = num(v.height);
      const g = String(v.gender);
      assert(a > 0 && w > 0 && h > 0, 'Inputs must be positive.');
      
      const bmr = g === 'm'
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

      return { results: [{ label: 'BMR', value: round(bmr, 0), unit: 'kcal/day', primary: true }] };
    },
    formula: 'Mifflin-St Jeor Equation',
    intro: ['Estimate your Basal Metabolic Rate (BMR), the calories you burn at rest.', introDisclaimer],
    status: 'tested',
    tests: [
      { name: 'Male', inputs: { gender: 'm', age: 30, weight: 70, height: 175 }, expect: { 'BMR': 1649 } },
      { name: 'Female', inputs: { gender: 'f', age: 30, weight: 60, height: 165 }, expect: { 'BMR': 1320 } }
    ]
  },
  {
    id: 'calorie',
    name: 'Calorie Calculator',
    slug: 'calorie',
    category: 'health-fitness',
    short: 'Estimate your daily calorie needs.',
    inputs: [
      { key: 'bmr', type: 'number', label: 'BMR', unit: 'kcal', default: 1500 },
      { key: 'activity', type: 'select', label: 'Activity Level', options: [
        {label: 'Sedentary', value: '1.2'},
        {label: 'Lightly active', value: '1.375'},
        {label: 'Moderately active', value: '1.55'},
        {label: 'Very active', value: '1.725'}
      ], default: '1.2' }
    ],
    compute: (v) => {
      const bmr = num(v.bmr);
      const act = num(v.activity);
      assert(bmr > 0, 'BMR must be positive.');
      return {
        results: [
          { label: 'Maintenance Calories', value: round(bmr * act, 0), unit: 'kcal/day', primary: true },
          { label: 'Weight Loss (0.5 kg/wk)', value: round(bmr * act - 500, 0), unit: 'kcal/day' }
        ]
      };
    },
    formula: 'Calories = BMR * Activity Multiplier',
    intro: ['Estimate daily calories to maintain or lose weight.', introDisclaimer],
    status: 'tested',
    tests: [
      { name: 'Sedentary', inputs: { bmr: 1500, activity: '1.2' }, expect: { 'Maintenance Calories': 1800 } },
      { name: 'Active', inputs: { bmr: 1500, activity: '1.55' }, expect: { 'Maintenance Calories': 2325 } }
    ]
  },
  {
    id: 'target-heart-rate',
    name: 'Target Heart Rate',
    slug: 'target-heart-rate',
    category: 'health-fitness',
    short: 'Calculate target heart rate zones.',
    inputs: [
      { key: 'age', type: 'number', label: 'Age', unit: 'years', default: 30 }
    ],
    compute: (v) => {
      const a = num(v.age);
      assert(a > 0 && a < 120, 'Enter a valid age.');
      const maxHr = 220 - a;
      return {
        results: [
          { label: 'Max Heart Rate', value: maxHr, unit: 'bpm' },
          { label: 'Moderate (50-70%)', value: `${round(maxHr * 0.5, 0)} - ${round(maxHr * 0.7, 0)}`, unit: 'bpm', primary: true },
          { label: 'Vigorous (70-85%)', value: `${round(maxHr * 0.7, 0)} - ${round(maxHr * 0.85, 0)}`, unit: 'bpm' }
        ]
      };
    },
    formula: 'Max HR = 220 - Age. Zones are percentages of Max HR.',
    intro: ['Find your target heart rate zones for exercise.', introDisclaimer],
    status: 'tested',
    tests: [
      { name: 'Age 30', inputs: { age: 30 }, expect: { 'Max Heart Rate': 190, 'Moderate (50-70%)': '95 - 133' } },
      { name: 'Age 50', inputs: { age: 50 }, expect: { 'Max Heart Rate': 170, 'Vigorous (70-85%)': '119 - 145' } }
    ]
  },
  {
    id: 'body-fat',
    name: 'Body Fat Calculator',
    slug: 'body-fat',
    category: 'health-fitness',
    short: 'Estimate body fat percentage.',
    inputs: [
      { key: 'gender', type: 'select', label: 'Gender', options: [{label:'Male',value:'m'},{label:'Female',value:'f'}], default: 'm' },
      { key: 'waist', type: 'number', label: 'Waist', unit: 'cm', default: 90 },
      { key: 'neck', type: 'number', label: 'Neck', unit: 'cm', default: 38 },
      { key: 'height', type: 'number', label: 'Height', unit: 'cm', default: 180 },
      { key: 'hip', type: 'number', label: 'Hip (Female only)', unit: 'cm', default: 0 }
    ],
    compute: (v) => {
      const g = String(v.gender);
      const w = num(v.waist);
      const n = num(v.neck);
      const h = num(v.height);
      const hip = num(v.hip);
      assert(w > 0 && n > 0 && h > 0, 'Measurements must be positive.');
      assert(w > n, 'Waist must be larger than neck.');

      let bf = 0;
      if (g === 'm') {
        bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
      } else {
        assert(hip > 0, 'Hip measurement required for females.');
        bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hip - n) + 0.22100 * Math.log10(h)) - 450;
      }
      return { results: [{ label: 'Body Fat', value: round(bf, 1), unit: '%', primary: true }] };
    },
    formula: 'U.S. Navy Method',
    intro: ['Estimate body fat percentage using tape measurements.', introDisclaimer],
    status: 'tested',
    tests: [
      { name: 'Male', inputs: { gender: 'm', waist: 90, neck: 38, height: 180, hip: 0 }, expect: { 'Body Fat': 17.5 }, tolerance: 0.5 },
      { name: 'Female', inputs: { gender: 'f', waist: 70, neck: 35, height: 165, hip: 95 }, expect: { 'Body Fat': 23.9 }, tolerance: 0.5 }
    ]
  },
  {
    id: 'ideal-weight',
    name: 'Ideal Weight Calculator',
    slug: 'ideal-weight',
    category: 'health-fitness',
    short: 'Calculate ideal body weight.',
    inputs: [
      { key: 'gender', type: 'select', label: 'Gender', options: [{label:'Male',value:'m'},{label:'Female',value:'f'}], default: 'm' },
      { key: 'height', type: 'number', label: 'Height', unit: 'cm', default: 175 }
    ],
    compute: (v) => {
      const h = num(v.height);
      const g = String(v.gender);
      assert(h >= 152.4, 'Height must be at least 152.4 cm (5 feet).');
      const inchesOver5Ft = (h - 152.4) / 2.54;
      const ibw = g === 'm' ? 50 + 2.3 * inchesOver5Ft : 45.5 + 2.3 * inchesOver5Ft;
      return { results: [{ label: 'Ideal Weight (Devine)', value: round(ibw, 1), unit: 'kg', primary: true }] };
    },
    formula: 'Devine Formula: 50kg (male) or 45.5kg (female) + 2.3kg per inch over 5 feet.',
    intro: ['Estimate your ideal body weight.', introDisclaimer],
    status: 'tested',
    tests: [
      { name: 'Male', inputs: { gender: 'm', height: 175 }, expect: { 'Ideal Weight (Devine)': 70.5 }, tolerance: 0.2 },
      { name: 'Female', inputs: { gender: 'f', height: 165 }, expect: { 'Ideal Weight (Devine)': 56.9 }, tolerance: 0.2 }
    ]
  },
  {
    id: 'waist-to-height-ratio',
    name: 'Waist-to-Height Ratio',
    slug: 'waist-to-height-ratio',
    category: 'health-fitness',
    short: 'Calculate waist-to-height ratio.',
    inputs: [
      { key: 'waist', type: 'number', label: 'Waist', unit: 'cm', default: 80 },
      { key: 'height', type: 'number', label: 'Height', unit: 'cm', default: 180 }
    ],
    compute: (v) => {
      const w = num(v.waist);
      const h = num(v.height);
      assert(w > 0 && h > 0, 'Values must be positive.');
      const ratio = w / h;
      let risk = 'Low Risk';
      if (ratio > 0.5) risk = 'Increased Risk';
      return {
        results: [
          { label: 'Ratio', value: round(ratio, 2), primary: true },
          { label: 'Risk Level', value: risk }
        ]
      };
    },
    formula: 'WHtR = Waist / Height',
    intro: ['Waist-to-height ratio is a measure of body fat distribution.', introDisclaimer],
    status: 'tested',
    tests: [
      { name: 'Healthy', inputs: { waist: 80, height: 180 }, expect: { 'Ratio': 0.44, 'Risk Level': 'Low Risk' } },
      { name: 'Risk', inputs: { waist: 100, height: 170 }, expect: { 'Ratio': 0.59, 'Risk Level': 'Increased Risk' } }
    ]
  },
  {
    id: 'protein-intake',
    name: 'Protein Intake',
    slug: 'protein-intake',
    category: 'health-fitness',
    short: 'Estimate your daily protein needs.',
    inputs: [
      { key: 'weight', type: 'number', label: 'Weight', unit: 'kg', default: 70 },
      { key: 'goal', type: 'select', label: 'Goal', options: [
        {label: 'Sedentary', value: '0.8'},
        {label: 'Maintain Muscle / Active', value: '1.2'},
        {label: 'Build Muscle', value: '1.6'}
      ], default: '0.8' }
    ],
    compute: (v) => {
      const w = num(v.weight);
      const m = num(v.goal);
      assert(w > 0, 'Weight must be positive.');
      return { results: [{ label: 'Daily Protein', value: round(w * m, 0), unit: 'g', primary: true }] };
    },
    formula: 'Protein (g) = Weight (kg) * Multiplier (0.8 - 1.6+)',
    intro: ['Estimate how much protein you need daily based on your goals.', introDisclaimer],
    status: 'tested',
    tests: [
      { name: 'Sedentary', inputs: { weight: 70, goal: '0.8' }, expect: { 'Daily Protein': 56 } },
      { name: 'Build Muscle', inputs: { weight: 70, goal: '1.6' }, expect: { 'Daily Protein': 112 } }
    ]
  },
  {
    id: 'due-date',
    name: 'Pregnancy Due Date',
    slug: 'due-date',
    category: 'health-fitness',
    short: 'Calculate pregnancy due date.',
    inputs: [
      { key: 'lmp', type: 'date', label: 'First day of last period', default: 'today' }
    ],
    compute: (v) => {
      const d = parseDate(String(v.lmp));
      const due = addDays(d, 280); // 40 weeks
      return { results: [{ label: 'Estimated Due Date', value: formatDate(due), primary: true }] };
    },
    formula: 'Due Date = LMP + 280 days (Naegele\'s rule)',
    intro: ['Estimate your pregnancy due date based on your last menstrual period.', introDisclaimer],
    status: 'tested',
    tests: [
      { name: 'Test 1', inputs: { lmp: '2023-01-01' }, expect: { 'Estimated Due Date': '2023-10-08' } },
      { name: 'Test 2', inputs: { lmp: '2023-05-15' }, expect: { 'Estimated Due Date': '2024-02-19' } }
    ]
  },
  {
    id: 'lean-body-mass',
    name: 'Lean Body Mass',
    slug: 'lean-body-mass',
    category: 'health-fitness',
    short: 'Calculate your lean body mass.',
    inputs: [
      { key: 'gender', type: 'select', label: 'Gender', options: [{label:'Male',value:'m'},{label:'Female',value:'f'}], default: 'm' },
      { key: 'weight', type: 'number', label: 'Weight', unit: 'kg', default: 80 },
      { key: 'height', type: 'number', label: 'Height', unit: 'cm', default: 180 }
    ],
    compute: (v) => {
      const w = num(v.weight);
      const h = num(v.height);
      const g = String(v.gender);
      assert(w > 0 && h > 0, 'Inputs must be positive.');
      const lbm = g === 'm'
        ? 0.407 * w + 0.267 * h - 19.2
        : 0.252 * w + 0.473 * h - 48.3;
      return { results: [{ label: 'Lean Body Mass (Boer)', value: round(lbm, 1), unit: 'kg', primary: true }] };
    },
    formula: 'Boer Formula',
    intro: ['Estimate lean body mass (body weight minus fat).', introDisclaimer],
    status: 'tested',
    tests: [
      { name: 'Male', inputs: { gender: 'm', weight: 80, height: 180 }, expect: { 'Lean Body Mass (Boer)': 61.4 }, tolerance: 0.2 },
      { name: 'Female', inputs: { gender: 'f', weight: 65, height: 165 }, expect: { 'Lean Body Mass (Boer)': 46.1 }, tolerance: 0.2 }
    ]
  }
];
