import type { Article } from '../types';

export const article: Article = {
  slug: 'mean-median-mode-explained',
  title: 'Mean, Median, and Mode Explained',
  description: 'Learn the differences between mean, median, and mode, and when to use each measure of central tendency.',
  category: 'math-guides',
  author: 'Statistics Team',
  published: '2026-10-10T00:00:00Z',
  status: 'published',
  featured: false,
  relatedCalculators: ['mean-median-mode-calculator'],
  tags: ['statistics', 'math', 'averages'],
  body: [
    { type: 'p', text: 'Mean, median, and mode are the three primary measures of central tendency used in statistics. They provide different ways to summarize a dataset with a single value that represents the center or typical value of the distribution. Understanding the distinct properties of each measure is crucial for accurate data analysis and interpretation.' },
    { type: 'h2', text: 'The Mean (Arithmetic Average)' },
    { type: 'p', text: 'The mean is the most commonly used measure of central tendency. It is calculated by adding all the values in a dataset together and dividing the sum by the total number of values. The mean incorporates every data point into its calculation, making it a comprehensive representation of the data. However, the mean is highly susceptible to outliers. A single exceptionally high or low value can significantly skew the result, misrepresenting the typical value of the dataset.' },
    { type: 'formula', text: 'Mean = (Σx) / n' },
    { type: 'h2', text: 'The Median' },
    { type: 'p', text: 'The median is the exact middle value in a dataset when the numbers are arranged in ascending or descending order. If the dataset has an odd number of observations, the median is the single middle number. If there is an even number of observations, the median is the average of the two middle numbers. Unlike the mean, the median is robust against outliers. It provides a more accurate reflection of the typical value in skewed distributions, such as income data or real estate prices.' },
    { type: 'h2', text: 'The Mode' },
    { type: 'p', text: 'The mode is the value that appears most frequently in a dataset. A dataset can have one mode (unimodal), two modes (bimodal), multiple modes (multimodal), or no mode at all if every value appears only once. The mode is unique because it is the only measure of central tendency that can be used with nominal (categorical) data. For example, if you are determining the most popular car color in a parking lot, the mode is the appropriate measure.' },
    { type: 'h2', text: 'Choosing the Right Measure' },
    { type: 'p', text: 'Selecting the appropriate measure depends on the shape of your data distribution and the level of measurement. Use the mean for normally distributed continuous data without extreme outliers. Choose the median for skewed continuous or ordinal data. Finally, use the mode for categorical data or when you need to know the absolute most common occurrence.' },
    { type: 'note', text: 'In a perfectly symmetrical normal distribution, the mean, median, and mode are all perfectly equal.' }
  ]
};
