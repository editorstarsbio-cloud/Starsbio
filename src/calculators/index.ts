import type { CalculatorDef, CategorySlug } from '@/lib/calc/types';
import { everydayCalculators } from './everyday';
import { mathCalculators } from './math';
import { financeCalculators } from './finance';
import { physicsCalculators } from './physics';
import { chemistryCalculators } from './chemistry';
import { engineeringCalculators } from './engineering';
import { businessCalculators } from './business';
import { statisticsCalculators } from './statistics';
import { dateTimeCalculators } from './date-time';
import { healthFitnessCalculators } from './health-fitness';
import { educationCalculators } from './education';
import { constructionCalculators } from './construction';
import { realEstateCalculators } from './real-estate';
import { automotiveCalculators } from './automotive';
import { cookingCalculators } from './cooking';
import { technologyCalculators } from './technology';
import { sportsCalculators } from './sports';
import { biologyAgricultureCalculators } from './biology-agriculture';

export const allCalculators: CalculatorDef[] = [
  ...everydayCalculators,
  ...mathCalculators,
  ...financeCalculators,
  ...physicsCalculators,
  ...chemistryCalculators,
  ...engineeringCalculators,
  ...businessCalculators,
  ...statisticsCalculators,
  ...dateTimeCalculators,
  ...healthFitnessCalculators,
  ...educationCalculators,
  ...constructionCalculators,
  ...realEstateCalculators,
  ...automotiveCalculators,
  ...cookingCalculators,
  ...technologyCalculators,
  ...sportsCalculators,
  ...biologyAgricultureCalculators
];

export const getCalculators = async (): Promise<CalculatorDef[]> => {
  return allCalculators;
};

export const categories: { slug: CategorySlug; name: string; desc: string }[] = [
  { slug: 'math', name: 'Math', desc: 'Calculators for algebra, geometry, percentages, and everyday mathematics.' },
  { slug: 'finance', name: 'Finance', desc: 'Tools for loans, compound interest, investments, and personal finance.' },
  { slug: 'business', name: 'Business', desc: 'Calculate profit margins, markups, ROI, and business metrics.' },
  { slug: 'statistics', name: 'Statistics', desc: 'Find averages, standard deviation, variance, and probability.' },
  { slug: 'date-time', name: 'Date & Time', desc: 'Calculate business days, age, and add or subtract time.' },
  { slug: 'health-fitness', name: 'Health & Fitness', desc: 'Estimate BMI, daily calorie needs, and other health metrics.' },
  { slug: 'education', name: 'Education', desc: 'Calculate GPA, weighted grades, and final exam targets.' },
  { slug: 'physics', name: 'Physics', desc: 'Solve for speed, force, energy, kinematics, and electronics.' },
  { slug: 'chemistry', name: 'Chemistry', desc: 'Molar mass, dilutions, concentration, and ideal gas law.' },
  { slug: 'engineering', name: 'Engineering', desc: 'Tools for structural, mechanical, and electrical engineering estimates.' },
  { slug: 'construction', name: 'Construction', desc: 'Estimate materials for concrete, flooring, roofing, and painting.' },
  { slug: 'real-estate', name: 'Real Estate', desc: 'Analyze rental yield, cap rate, mortgages, and property investments.' },
  { slug: 'automotive', name: 'Automotive', desc: 'Fuel economy, depreciation, EV charging, and driving costs.' },
  { slug: 'cooking', name: 'Cooking', desc: 'Scale recipes, calculate baker percentages, and portion meals.' },
  { slug: 'technology', name: 'Technology', desc: 'File download times, network subnetting, and screen resolutions.' },
  { slug: 'everyday', name: 'Everyday', desc: 'Split bills, calculate tips, and compare unit prices.' },
  { slug: 'sports', name: 'Sports', desc: 'Pace calculators, win percentages, and sports statistics.' },
  { slug: 'biology-agriculture', name: 'Biology & Agriculture', desc: 'Population growth, seed rates, and planting calculators.' }
];
