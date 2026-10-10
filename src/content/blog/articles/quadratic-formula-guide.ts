import type { Article } from '../types';

export const article: Article = {
  slug: 'quadratic-formula-guide',
  title: 'Solving Equations with the Quadratic Formula',
  description: 'A complete guide to understanding and applying the quadratic formula to solve polynomials.',
  category: 'math-guides',
  author: 'Math Team',
  published: '2025-02-15T00:00:00Z',
  status: 'published',
  relatedCalculators: ['quadratic-formula-calculator'],
  tags: ['algebra', 'math', 'equations', 'quadratic'],
  body: [
    { type: 'p', text: 'A quadratic equation is a second-degree polynomial equation. The highest exponent attached to any variable is two. These equations appear frequently in physics, engineering, and advanced mathematics to model parabolic trajectories, calculate optimization problems, and determine varying rates of change.' },
    { type: 'h2', text: 'Standard Form' },
    { type: 'p', text: 'Before applying any solving methods, a quadratic equation must be written in standard form. This structure organizes the terms by descending powers of x and sets the entire expression equal to zero.' },
    { type: 'formula', text: 'ax² + bx + c = 0' },
    { type: 'p', text: 'In this standard form, the coefficients "a", "b", and "c" are known real numbers, and "a" cannot equal zero. The variable "x" represents the unknown values, also called roots or x-intercepts, that satisfy the equation.' },
    { type: 'h2', text: 'The Quadratic Formula' },
    { type: 'p', text: 'While some quadratic equations can be solved by factoring or completing the square, the quadratic formula provides a universal solution method that works for every possible quadratic equation. It directly calculates the values of x based on the coefficients.' },
    { type: 'formula', text: 'x = [-b ± √(b² - 4ac)] / 2a' },
    { type: 'p', text: 'The plus-minus symbol (±) indicates that the formula typically yields two distinct solutions. You must calculate the equation once using addition and a second time using subtraction.' },
    { type: 'h2', text: 'Understanding the Discriminant' },
    { type: 'p', text: 'The portion of the quadratic formula located under the square root symbol is called the discriminant. It serves as a diagnostic tool that reveals the nature and quantity of the roots without requiring you to complete the full calculation.' },
    { type: 'formula', text: 'Δ = b² - 4ac' },
    { type: 'ul', items: [
      'If the discriminant is positive, the equation has two distinct real roots.',
      'If the discriminant is exactly zero, the equation has one repeating real root.',
      'If the discriminant is negative, the equation has two complex (imaginary) roots.'
    ] },
    { type: 'note', text: 'When dealing with a negative discriminant in standard algebra, you can state there are no real solutions. In advanced mathematics, you will use imaginary numbers (i) to express the complex roots.' },
    { type: 'p', text: 'To use the quadratic formula efficiently, carefully extract the a, b, and c values from your standard-form equation. Pay close attention to negative signs, as misplacing a sign is the most frequent error during substitution. By following the order of operations, you can reliably find the intersections of any parabola.' }
  ]
};
