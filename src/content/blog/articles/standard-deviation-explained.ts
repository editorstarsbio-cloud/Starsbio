import type { Article } from '../types';

export const article: Article = {
  slug: 'standard-deviation-explained',
  title: 'Standard Deviation Explained',
  description: 'Understand standard deviation, how it measures data variance, and its applications in statistics and finance.',
  category: 'math-guides',
  author: 'Statistics Team',
  published: '2026-10-10T00:00:00Z',
  status: 'published',
  featured: true,
  relatedCalculators: ['standard-deviation-calculator'],
  tags: ['statistics', 'math', 'data'],
  body: [
    { type: 'p', text: 'Standard deviation is a fundamental statistical metric that quantifies the amount of variation or dispersion in a set of data values. A low standard deviation indicates that the data points tend to be close to the mean (the expected value) of the set, while a high standard deviation indicates that the data points are spread out over a wider range of values. This measurement is crucial across numerous fields, including finance, scientific research, and quality control.' },
    { type: 'h2', text: 'Population vs. Sample Standard Deviation' },
    { type: 'p', text: 'There are two main types of standard deviation calculations depending on the data source: population and sample. Population standard deviation is used when you have data for every member of the entire population. Sample standard deviation is used when your data represents only a subset or sample of the wider population. The sample calculation applies Bessel\'s correction (dividing by N-1 instead of N) to correct for bias in the estimation of the population variance.' },
    { type: 'h3', text: 'Population Formula' },
    { type: 'formula', text: 'σ = √[ Σ(xi - μ)² / N ]' },
    { type: 'h3', text: 'Sample Formula' },
    { type: 'formula', text: 's = √[ Σ(xi - x̄)² / (n - 1) ]' },
    { type: 'h2', text: 'Applications in Finance' },
    { type: 'p', text: 'In finance, standard deviation is the standard measure of market volatility. It represents the historical risk of an investment. A volatile stock has a high standard deviation, indicating its price can change dramatically over a short time period. Conversely, a stable blue-chip stock typically exhibits a lower standard deviation. Investors use this metric to gauge the risk-return profile of their portfolios and make informed allocation decisions.' },
    { type: 'h2', text: 'The Empirical Rule' },
    { type: 'p', text: 'For normally distributed data, standard deviation follows the Empirical Rule, also known as the 68-95-99.7 rule. This principle states that approximately 68% of all data points fall within one standard deviation of the mean. Furthermore, 95% fall within two standard deviations, and 99.7% fall within three standard deviations. This predictable distribution allows statisticians to identify outliers and determine the probability of specific outcomes accurately.' },
    { type: 'note', text: 'Standard deviation is highly sensitive to outliers. A single extreme value can disproportionately increase the resulting standard deviation.' }
  ]
};
