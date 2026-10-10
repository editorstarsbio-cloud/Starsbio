import type { Article } from '../types';

export const article: Article = {
  slug: 'ohms-law-guide',
  title: 'Understanding Ohm\'s Law and Electrical Circuits',
  description: 'A factual overview of Ohm\'s law, explaining the relationship between voltage, current, and resistance.',
  category: 'science',
  author: 'Science Team',
  published: '2025-02-15T00:00:00Z',
  status: 'published',
  relatedCalculators: ['ohms-law-calculator'],
  tags: ['physics', 'electronics', 'electricity', 'science'],
  body: [
    { type: 'p', text: 'Ohm\'s Law is a fundamental principle in the field of electronics and electrical engineering. Formulated by the German physicist Georg Simon Ohm in 1827, it describes the mathematical relationship between current, voltage, and resistance in an electrical circuit. Understanding this relationship is critical for designing circuits, troubleshooting electrical systems, and ensuring power safety.' },
    { type: 'h2', text: 'The Core Components' },
    { type: 'p', text: 'To utilize Ohm\'s Law, you must understand the three primary variables involved in electrical flow.' },
    { type: 'ul', items: [
      'Voltage (V): Measured in volts, this is the electrical potential difference that pushes electrons through a conductor. Think of it as water pressure in a pipe.',
      'Current (I): Measured in amperes (amps), this is the actual flow rate of electric charge. It represents the volume of water flowing through the pipe.',
      'Resistance (R): Measured in ohms (Ω), this is the opposition to the flow of current. It functions like a narrowing of the pipe that restricts water flow.'
    ] },
    { type: 'h2', text: 'The Ohm\'s Law Equation' },
    { type: 'p', text: 'The law states that the current flowing through a conductor between two points is directly proportional to the voltage across the two points. This relationship is typically expressed through a simple algebraic equation.' },
    { type: 'formula', text: 'V = I × R' },
    { type: 'p', text: 'Using basic algebra, you can rearrange this standard equation to solve for any missing variable as long as the other two are known.' },
    { type: 'formula', text: 'I = V / R' },
    { type: 'formula', text: 'R = V / I' },
    { type: 'h2', text: 'Practical Applications' },
    { type: 'p', text: 'Engineers use Ohm\'s Law daily to specify component values. If a circuit requires a specific amount of current to operate an LED, and the power supply provides a fixed voltage, Ohm\'s Law determines the exact size of the resistor needed to prevent the LED from burning out.' },
    { type: 'note', text: 'Ohm\'s Law is primarily accurate for ohmic conductors, such as standard wires and resistors operating at a constant temperature. Components like diodes and transistors exhibit non-linear behavior and do not strictly follow this linear relationship.' },
    { type: 'p', text: 'When calculating circuit parameters, always ensure your units align. Convert milliamperes or kilovolts back to base amps and volts before applying the formulas. By mastering Ohm\'s Law, you establish a necessary foundation for studying complex subjects like electrical power dissipation and alternating current networks.' }
  ]
};
