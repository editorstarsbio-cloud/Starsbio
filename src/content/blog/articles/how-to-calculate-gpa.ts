import type { Article } from '../types';

export const article: Article = {
  slug: 'how-to-calculate-gpa',
  title: 'How to Calculate GPA',
  description: 'A step-by-step guide explaining how Grade Point Average (GPA) is calculated, including quality points, credit hours, and numerical grading scales.',
  category: 'education',
  author: 'Calculator Team',
  published: '2025-01-10T00:00:00Z',
  status: 'published',
  tags: ['gpa', 'grades', 'school'],
  relatedCalculators: [],
  body: [
    { type: 'p', text: 'Grade Point Average (GPA) is a standardized numerical indicator of academic achievement used extensively by high schools, colleges, and universities. It represents the average value of accumulated final grades earned in courses over a specific timeframe. Understanding the exact mechanics of GPA calculation is essential for students monitoring their academic standing, applying for scholarships, or seeking admission to higher education institutions.' },
    { type: 'h2', text: 'The Standard GPA Scale' },
    { type: 'p', text: 'The standard unweighted GPA operates on a 4.0 scale. In this system, letter grades translate to specific numerical values. A standard \'A\' grade converts to 4.0 quality points, a \'B\' yields 3.0 points, a \'C\' provides 2.0 points, and a \'D\' offers 1.0 point. An \'F\' results in 0.0 points. Many institutions utilize a plus and minus system, where an \'A-\' might equal 3.7 and a \'B+\' equals 3.3.' },
    { type: 'h2', text: 'Calculation Steps' },
    { type: 'p', text: 'To calculate an unweighted GPA, you must determine the total number of quality points earned and divide that figure by the total number of credit hours attempted.' },
    { type: 'ol', items: [
      'Convert every final letter grade into its corresponding quality point value.',
      'Multiply each quality point value by the number of credits assigned to that specific course. A 3-credit course where a student earns an \'A\' (4.0) generates 12 total grade points.',
      'Sum the grade points from all completed courses.',
      'Divide this total sum by the total number of credits attempted.'
    ]},
    { type: 'p', text: 'For instance, if a student accumulates 45 grade points across 15 credit hours, their resulting GPA is exactly 3.0.' },
    { type: 'h2', text: 'Special Circumstances' },
    { type: 'p', text: 'Institutions do not typically factor in courses graded on a pass/fail basis when calculating GPA. A \'Pass\' grants the academic credit without affecting the numerical average, while a \'Fail\' usually impacts the GPA identically to an \'F\' grade. Withdrawals typically leave the GPA unchanged, though they appear on the official transcript.' },
    { type: 'p', text: 'Tracking GPA throughout an academic career allows students to identify subject areas requiring additional focus. Consistently calculating these numbers ensures academic transparency and helps students set realistic benchmarks for future semesters.' }
  ]
};
