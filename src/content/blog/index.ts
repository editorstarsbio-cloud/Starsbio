import type { Article, BlogCategorySlug } from './types';
import { article as areaAndVolumeFormulasArticle } from './articles/area-and-volume-formulas';
import { article as bmiWhatItMeasuresAndItsLimitsArticle } from './articles/bmi-what-it-measures-and-its-limits';
import { article as bmrAndDailyCalorieNeedsArticle } from './articles/bmr-and-daily-calorie-needs';
import { article as breakEvenAnalysisGuideArticle } from './articles/break-even-analysis-guide';
import { article as capRateVsRentalYieldArticle } from './articles/cap-rate-vs-rental-yield';
import { article as compoundInterestArticle } from './articles/compound-interest';
import { article as confidenceIntervalsExplainedArticle } from './articles/confidence-intervals-explained';
import { article as downloadTimeExplainedArticle } from './articles/download-time-explained';
import { article as howMortgagePaymentsAreCalculatedArticle } from './articles/how-mortgage-payments-are-calculated';
import { article as howMuchPaintDoINeedArticle } from './articles/how-much-paint-do-i-need';
import { article as howToCalculateATipArticle } from './articles/how-to-calculate-a-tip';
import { article as howToCalculateConcreteArticle } from './articles/how-to-calculate-concrete';
import { article as howToCalculateFuelEconomyArticle } from './articles/how-to-calculate-fuel-economy';
import { article as howToCalculateGpaArticle } from './articles/how-to-calculate-gpa';
import { article as howToCalculatePercentagesArticle } from './articles/how-to-calculate-percentages';
import { article as howToCountBusinessDaysArticle } from './articles/how-to-count-business-days';
import { article as howToScaleARecipeArticle } from './articles/how-to-scale-a-recipe';
import { article as ipv4SubnettingBasicsArticle } from './articles/ipv4-subnetting-basics';
import { article as meanMedianModeExplainedArticle } from './articles/mean-median-mode-explained';
import { article as molarityAndDilutionArticle } from './articles/molarity-and-dilution';
import { article as ohmsLawGuideArticle } from './articles/ohms-law-guide';
import { article as profitMarginVsMarkupArticle } from './articles/profit-margin-vs-markup';
import { article as quadraticFormulaGuideArticle } from './articles/quadratic-formula-guide';
import { article as standardDeviationExplainedArticle } from './articles/standard-deviation-explained';
import { article as the503020BudgetRuleArticle } from './articles/the-50-30-20-budget-rule';
import { article as weightedGradesExplainedArticle } from './articles/weighted-grades-explained';

export const getArticles = async (): Promise<Article[]> => {
  const all: Article[] = [
    areaAndVolumeFormulasArticle,
    bmiWhatItMeasuresAndItsLimitsArticle,
    bmrAndDailyCalorieNeedsArticle,
    breakEvenAnalysisGuideArticle,
    capRateVsRentalYieldArticle,
    compoundInterestArticle,
    confidenceIntervalsExplainedArticle,
    downloadTimeExplainedArticle,
    howMortgagePaymentsAreCalculatedArticle,
    howMuchPaintDoINeedArticle,
    howToCalculateATipArticle,
    howToCalculateConcreteArticle,
    howToCalculateFuelEconomyArticle,
    howToCalculateGpaArticle,
    howToCalculatePercentagesArticle,
    howToCountBusinessDaysArticle,
    howToScaleARecipeArticle,
    ipv4SubnettingBasicsArticle,
    meanMedianModeExplainedArticle,
    molarityAndDilutionArticle,
    ohmsLawGuideArticle,
    profitMarginVsMarkupArticle,
    quadraticFormulaGuideArticle,
    standardDeviationExplainedArticle,
    the503020BudgetRuleArticle,
    weightedGradesExplainedArticle
  ];
  return all.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
};

export const blogCategories: { slug: BlogCategorySlug; name: string }[] = [
  { slug: 'math-guides', name: 'Math Guides' },
  { slug: 'finance-guides', name: 'Finance Guides' },
  { slug: 'business-calculations', name: 'Business Calculations' },
  { slug: 'health-fitness', name: 'Health & Fitness' },
  { slug: 'education', name: 'Education' },
  { slug: 'date-time', name: 'Date & Time' },
  { slug: 'construction', name: 'Construction' },
  { slug: 'real-estate', name: 'Real Estate' },
  { slug: 'automotive', name: 'Automotive' },
  { slug: 'cooking', name: 'Cooking' },
  { slug: 'technology', name: 'Technology' },
  { slug: 'statistics', name: 'Statistics' },
  { slug: 'everyday-calculations', name: 'Everyday Calculations' },
  { slug: 'science', name: 'Science' }
];
