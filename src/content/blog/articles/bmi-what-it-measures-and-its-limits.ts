import type { Article } from '../types';

export const article: Article = {
  slug: 'bmi-what-it-measures-and-its-limits',
  title: 'BMI: What It Measures and Its Limits',
  description: 'Learn what Body Mass Index (BMI) measures, how the formula works, and the significant clinical limitations of this common health metric.',
  category: 'health-fitness',
  author: 'Calculator Team',
  published: '2025-01-10T00:00:00Z',
  status: 'published',
  tags: ['bmi', 'health', 'fitness'],
  relatedCalculators: [],
  body: [
    { type: 'p', text: 'Body Mass Index (BMI) is a standardized screening metric used globally to categorize human weight in relation to height. Public health organizations and medical professionals rely on this calculation as a rapid, non-invasive method to assess potential health risks associated with a person\'s body mass.' },
    { type: 'h2', text: 'The BMI Formula' },
    { type: 'p', text: 'The standard BMI formula is calculated by dividing an individual\'s weight in kilograms by the square of their height in meters. For calculations using imperial units, weight in pounds is divided by height in inches squared, and the result is multiplied by a conversion factor of 703.' },
    { type: 'formula', text: 'BMI = Weight (kg) / Height (m)^2' },
    { type: 'h2', text: 'Standard BMI Categories' },
    { type: 'p', text: 'Medical institutions typically classify BMI scores into four primary categories. A score below 18.5 is considered underweight. A range of 18.5 to 24.9 falls into the normal weight category. Individuals scoring between 25.0 and 29.9 are classified as overweight, while a score of 30.0 or higher indicates obesity. These brackets help clinicians identify statistical correlations between weight groups and the prevalence of metabolic diseases, cardiovascular conditions, and joint issues.' },
    { type: 'h2', text: 'Clinical Limitations' },
    { type: 'p', text: 'Despite its widespread clinical adoption, BMI possesses significant analytical limitations. The most prominent flaw is its inability to differentiate between lean muscle mass and adipose tissue (body fat). Muscle is significantly denser than fat, meaning athletes or highly muscular individuals frequently register in the overweight or obese categories despite having low body fat percentages.' },
    { type: 'p', text: 'Additionally, the BMI calculation completely ignores body fat distribution. Visceral fat, which accumulates around abdominal organs, poses a substantially higher metabolic risk than subcutaneous fat stored in the hips and thighs. A person with a normal BMI might still carry dangerous levels of visceral fat.' },
    { type: 'p', text: 'Furthermore, the standard BMI categories do not account for natural physiological variations related to age, biological sex, or ethnic background. Older adults naturally lose muscle mass and gain fat, while women generally carry higher body fat percentages than men at identical BMI levels. Due to these constraints, modern medical assessments utilize BMI solely as an initial screening tool, supplementing it with waist circumference measurements, body fat percentage tests, and comprehensive metabolic blood panels to evaluate true metabolic health.' }
  ]
};
