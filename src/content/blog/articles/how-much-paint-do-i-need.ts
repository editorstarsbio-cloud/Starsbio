import type { Article } from '../types';

export const article: Article = {
  slug: 'how-much-paint-do-i-need',
  title: 'How Much Paint Do I Need? A Guide to Calculating Paint',
  description: 'Learn how to accurately calculate the amount of paint required for your interior rooms, including adjustments for doors, windows, and two coats.',
  category: 'construction',
  author: 'Construction Team',
  published: '2026-10-10T00:00:00Z',
  status: 'published',
  relatedCalculators: [],
  tags: ['paint', 'home improvement', 'construction', 'calculation'],
  body: [
    { type: 'p', text: 'Estimating paint accurately saves money and prevents inconvenient mid-project trips to the hardware store. A standard gallon of interior acrylic paint covers approximately 400 square feet on smooth walls. When determining your material needs, calculate the total surface area by multiplying the width of each wall by the room\'s floor-to-ceiling height. Sum these individual wall areas to find the gross square footage.' },
    { type: 'h2', text: 'Accounting for Doors and Windows' },
    { type: 'p', text: 'Windows and doors do not require wall paint. A standard interior door accounts for about 21 square feet, while an average window takes up 15 square feet. Subtract these areas from your gross total to find the exact net paintable area.' },
    { type: 'formula', text: 'Net Area = Gross Wall Area - (Doors * 21) - (Windows * 15)' },
    { type: 'h2', text: 'Multiple Coats and Textured Surfaces' },
    { type: 'p', text: 'Most interior paint jobs require two coats for adequate color coverage, especially when transitioning over dark colors or painting new drywall. Therefore, double your net paintable area to determine the total coverage needed. Divide this final figure by 400 to find the number of gallons required. Always round up to the nearest quart or gallon. Buying an extra quart ensures you have matching paint for future touch-ups.' },
    { type: 'p', text: 'For textured surfaces like stucco, brick, or popcorn ceilings, coverage drops significantly. A gallon might only cover 250 square feet on heavily textured materials. Primer is another key consideration. Unfinished drywall or dark walls require a distinct coat of primer before painting. Primer generally provides similar coverage to standard paint, but always check the manufacturer\'s specifications.' },
    { type: 'h2', text: 'Calculating Trim Paint' },
    { type: 'p', text: 'When calculating trim paint, measure the linear footage of baseboards, window casings, and door frames. A single gallon of trim paint usually covers around 300 to 400 linear feet, depending on the width of the trim.' },
    { type: 'h3', text: 'Example Calculation' },
    { type: 'p', text: 'Let us do a concrete example. A 12-foot by 15-foot room with 8-foot ceilings has two 12-foot walls (192 square feet) and two 15-foot walls (240 square feet), totaling 432 square feet. Subtracting one door (21 sq ft) and two windows (30 sq ft) leaves 381 square feet of paintable area.' },
    { type: 'p', text: 'For two coats, you need 762 square feet of total coverage. Dividing by 400 yields 1.905 gallons. You would purchase two gallons. Accurate calculations prevent waste, minimize expenses, and ensure a consistent finish across your entire room.' }
  ]
};
