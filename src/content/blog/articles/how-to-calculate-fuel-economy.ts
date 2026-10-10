import type { Article } from '../types';

export const article: Article = {
  slug: 'how-to-calculate-fuel-economy',
  title: 'How to Calculate True Fuel Economy',
  description: 'Learn the most accurate method to manually calculate your vehicle\'s fuel efficiency in MPG or L/100km.',
  category: 'automotive',
  author: 'Automotive Team',
  published: '2026-10-10T00:00:00Z',
  status: 'published',
  relatedCalculators: [],
  tags: ['automotive', 'fuel', 'mpg', 'efficiency', 'cars'],
  body: [
    { type: 'p', text: 'Calculating your vehicle\'s true fuel economy provides essential insight into engine health and helps you budget accurately for travel expenses. While modern cars feature digital dashboard displays showing miles per gallon (MPG) or liters per 100 kilometers (L/100km), these built-in computers often overestimate efficiency by up to ten percent. Calculating the figure manually remains the most accurate method for tracking performance.' },
    { type: 'h2', text: 'The Measurement Process' },
    { type: 'p', text: 'The process requires tracking your fuel usage over a full tank. Begin by visiting a gas station and filling your vehicle\'s tank until the pump clicks off automatically. Do not top off the tank, as this introduces inconsistencies. Immediately record your current odometer reading, or reset your vehicle\'s trip odometer to zero.' },
    { type: 'p', text: 'Drive your vehicle normally until the tank drops to around a quarter full. Return to the same gas station and use the exact same pump if possible, as different pumps shut off at slightly different pressure levels. Fill the tank again until the automatic shut-off clicks.' },
    { type: 'p', text: 'Note two crucial numbers: the exact volume of fuel you just pumped (in gallons or liters) and your new odometer reading. If you used the main odometer, subtract the original reading from the new reading to find the total distance traveled. If you used the trip odometer, simply use the displayed mileage.' },
    { type: 'h2', text: 'Calculating Miles Per Gallon (MPG)' },
    { type: 'p', text: 'For calculating MPG, divide the total miles driven by the gallons of fuel required to refill the tank.' },
    { type: 'formula', text: 'MPG = Miles Driven / Gallons Used' },
    { type: 'p', text: 'For example, if you drove 315 miles and pumped 12.4 gallons of gas, your fuel economy is 315 divided by 12.4, equaling 25.4 MPG.' },
    { type: 'h2', text: 'Calculating Liters per 100 Kilometers (L/100km)' },
    { type: 'p', text: 'For the metric system, calculating L/100km requires a different approach. Divide the liters of fuel used by the kilometers driven, then multiply the result by 100.' },
    { type: 'formula', text: 'L/100km = (Liters Used / Kilometers Driven) * 100' },
    { type: 'p', text: 'If you drove 500 kilometers and used 42 liters, divide 42 by 500 to get 0.084. Multiply by 100 to find your fuel economy is 8.4 L/100km.' },
    { type: 'p', text: 'Performing this manual calculation across three consecutive fill-ups provides a highly accurate average. Significant sudden drops in fuel efficiency often indicate mechanical issues like underinflated tires, dirty air filters, or faulty oxygen sensors that require immediate maintenance attention.' }
  ]
};
