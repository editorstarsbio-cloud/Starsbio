import type { Article } from '../types';

export const article: Article = {
  slug: 'how-to-calculate-concrete',
  title: 'How to Calculate Concrete Requirements',
  description: 'A factual guide on calculating the correct amount of concrete for slabs, footings, and cylindrical columns.',
  category: 'construction',
  author: 'Construction Team',
  published: '2026-10-10T00:00:00Z',
  status: 'published',
  featured: false,
  relatedCalculators: ['concrete-calculator'],
  tags: ['construction', 'math', 'materials'],
  body: [
    { type: 'p', text: 'Accurately calculating concrete volume is a critical step in construction and DIY projects. Ordering too little concrete causes costly delays and structural weaknesses due to cold joints, while ordering too much results in unnecessary expenses and waste disposal issues. Concrete is typically measured and sold by the cubic yard in the United States and by the cubic meter in most other regions. The fundamental principle is to calculate the total volume of the area to be filled.' },
    { type: 'h2', text: 'Standard Rectangular Slabs' },
    { type: 'p', text: 'To calculate the concrete required for a standard rectangular slab, such as a driveway or patio, you must multiply the length, width, and depth (thickness) of the slab. It is vital to ensure all measurements are in the same unit before performing the calculation. Usually, depth is measured in inches while length and width are in feet, so the depth must be converted to feet by dividing by 12.' },
    { type: 'formula', text: 'Volume (cubic yards) = (Length(ft) × Width(ft) × Depth(ft)) / 27' },
    { type: 'h2', text: 'Calculating for Footings' },
    { type: 'p', text: 'Footings provide the foundational support for walls and structures. They are continuous rectangular prisms. The calculation is identical to that of a rectangular slab. Measure the total linear length of the trench, the width of the trench, and the intended depth of the concrete. Multiply these three dimensions together to find the cubic volume. Always double-check trench depths at multiple points, as excavations are rarely perfectly uniform.' },
    { type: 'h2', text: 'Cylindrical Columns and Sonotubes' },
    { type: 'p', text: 'Calculating volume for cylindrical columns requires using the formula for the volume of a cylinder. You need the radius of the column (half the diameter) and the height.' },
    { type: 'formula', text: 'Volume = π × r² × h' },
    { type: 'p', text: 'Again, ensure all units match. Convert the radius from inches to feet before calculating the total cubic footage, then divide by 27 to find the required cubic yards.' },
    { type: 'note', text: 'It is an industry standard to add a 10% margin of error to your final calculation to account for uneven subgrades, spillage, and settling.' },
    { type: 'p', text: 'For complex shapes or large-scale projects with variable depths, breaking the project into smaller, simple geometric sections is the most effective approach. Calculate the volume for each section individually and sum the results.' }
  ]
};
