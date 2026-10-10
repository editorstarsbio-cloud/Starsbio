import type { Article } from '../types';

export const article: Article = {
  slug: 'area-and-volume-formulas',
  title: 'Essential Area and Volume Formulas',
  description: 'A reference guide for calculating the area of 2D shapes and the volume of 3D objects.',
  category: 'math-guides',
  author: 'Math Team',
  published: '2025-02-15T00:00:00Z',
  status: 'published',
  relatedCalculators: ['area-calculator', 'volume-calculator'],
  tags: ['geometry', 'area', 'volume', 'math'],
  body: [
    { type: 'p', text: 'Geometry relies heavily on standard formulas to determine the spatial properties of objects. Area measures the two-dimensional space enclosed within a flat shape, while volume measures the three-dimensional space occupied by a solid object. Understanding these fundamental calculations is necessary for fields ranging from architecture to basic home improvement.' },
    { type: 'h2', text: 'Two-Dimensional Shapes: Area' },
    { type: 'p', text: 'The area of a shape is expressed in square units, such as square meters or square feet. The calculation methodology depends entirely on the geometric properties of the shape in question.' },
    { type: 'h3', text: 'Rectangles and Squares' },
    { type: 'p', text: 'For a rectangle, the area is calculated by multiplying its length by its width. A square is simply a specialized rectangle where all four sides are equal, meaning the area is the side length squared.' },
    { type: 'formula', text: 'Area (Rectangle) = l × w' },
    { type: 'formula', text: 'Area (Square) = s²' },
    { type: 'h3', text: 'Triangles and Circles' },
    { type: 'p', text: 'A triangle occupies half the area of a rectangle with the same base and height. A circle involves the mathematical constant pi (π), representing the ratio of a circle\'s circumference to its diameter.' },
    { type: 'formula', text: 'Area (Triangle) = ½ × b × h' },
    { type: 'formula', text: 'Area (Circle) = π × r²' },
    { type: 'h2', text: 'Three-Dimensional Objects: Volume' },
    { type: 'p', text: 'Volume calculations determine the capacity of a solid object and are expressed in cubic units. Many volume formulas involve multiplying the area of the object\'s base by its height.' },
    { type: 'h3', text: 'Prisms and Cylinders' },
    { type: 'p', text: 'A rectangular prism (like a box) has a rectangular base, so you multiply length, width, and height. A cylinder has a circular base, so you calculate the base area and multiply it by the height.' },
    { type: 'formula', text: 'Volume (Rectangular Prism) = l × w × h' },
    { type: 'formula', text: 'Volume (Cylinder) = π × r² × h' },
    { type: 'h3', text: 'Spheres and Cones' },
    { type: 'p', text: 'Spheres and cones require different constants. A cone takes up exactly one-third the volume of a cylinder with the matching base and height. A sphere\'s volume depends entirely on its radius.' },
    { type: 'formula', text: 'Volume (Cone) = ⅓ × π × r² × h' },
    { type: 'formula', text: 'Volume (Sphere) = ⁴⁄₃ × π × r³' },
    { type: 'note', text: 'When performing calculations, ensure all measurements are converted to the same units before applying the formulas.' },
    { type: 'p', text: 'Memorizing these basic equations provides a strong foundation for more complex mathematical reasoning. Whether estimating the amount of paint needed for a wall or determining the water capacity of a pool, these geometric formulas represent essential tools for problem-solving.' }
  ]
};
