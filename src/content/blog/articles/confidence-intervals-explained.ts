import type { Article } from '../types';

export const article: Article = {
  slug: 'confidence-intervals-explained',
  title: 'Confidence Intervals Explained',
  description: 'A clear explanation of confidence intervals, margin of error, and how to interpret statistical certainty.',
  category: 'math-guides',
  author: 'Statistics Team',
  published: '2026-10-10T00:00:00Z',
  status: 'published',
  featured: false,
  relatedCalculators: ['confidence-interval-calculator'],
  tags: ['statistics', 'math', 'research'],
  body: [
    { type: 'p', text: 'A confidence interval is a range of estimates for an unknown parameter, defined as an interval with a lower and upper bound. It is computed at a designated confidence level, most commonly 95%. This statistical tool provides a margin of error around a sample estimate, indicating the degree of uncertainty associated with the sampling method. Confidence intervals are essential for interpreting polling data, clinical trial results, and market research studies.' },
    { type: 'h2', text: 'Understanding the Confidence Level' },
    { type: 'p', text: 'The confidence level represents the frequency of possible confidence intervals that contain the true value of the unknown population parameter. For example, if you conduct a survey and calculate a 95% confidence interval, it means that if you were to repeat the same survey 100 times using new samples, approximately 95 of those calculated intervals would contain the true population mean. It does not mean there is a 95% probability that the true mean falls within your single specific interval.' },
    { type: 'h2', text: 'Components of a Confidence Interval' },
    { type: 'p', text: 'Calculating a confidence interval requires three primary components:' },
    { type: 'ul', items: [
      'Sample Statistic: The mean or proportion calculated from your sample data.',
      'Confidence Level: The desired level of certainty, which determines the critical value (z-score or t-score).',
      'Standard Error: A measure of the statistical accuracy of an estimate, derived from the standard deviation and sample size.'
    ]},
    { type: 'h2', text: 'The Margin of Error' },
    { type: 'p', text: 'The margin of error is the range of values above and below the sample statistic in a confidence interval. It is calculated by multiplying the critical value by the standard error. A smaller margin of error indicates a more precise estimate. You can decrease the margin of error by increasing the sample size or by decreasing the confidence level. However, reducing the confidence level increases the risk that the interval will not contain the true population parameter.' },
    { type: 'formula', text: 'CI = x̄ ± (z * (s / √n))' },
    { type: 'h2', text: 'Practical Application' },
    { type: 'p', text: 'Consider a political poll stating that a candidate has 45% support with a margin of error of ±3% at a 95% confidence level. The confidence interval is 42% to 48%. The polling organization is 95% confident that the true level of support among the entire population falls within this specific range. Researchers must balance the need for precision with the practical constraints of data collection.' }
  ]
};
