import type { Article } from '../types';

export const article: Article = {
  slug: 'molarity-and-dilution',
  title: 'Molarity and Dilution Calculations',
  description: 'A scientific guide explaining molarity concepts, solute concentration, and standard dilution formulas.',
  category: 'science',
  author: 'Chemistry Team',
  published: '2025-02-15T00:00:00Z',
  status: 'published',
  relatedCalculators: ['molarity-calculator'],
  tags: ['chemistry', 'science', 'molarity', 'solutions'],
  body: [
    { type: 'p', text: 'In chemistry, accurately expressing the concentration of a solution is critical for experimental replication and quantitative analysis. Molarity is the most common standard unit of concentration used in laboratories. It defines the relationship between the amount of solute dissolved and the total volume of the resulting solution.' },
    { type: 'h2', text: 'Understanding Molarity' },
    { type: 'p', text: 'Molarity, denoted by the capital letter M, is formally defined as the number of moles of solute per liter of solution. A 1.0 M solution contains exactly one mole of solute dissolved in a total volume of one liter.' },
    { type: 'formula', text: 'Molarity (M) = Moles of Solute (mol) / Volume of Solution (L)' },
    { type: 'p', text: 'To calculate molarity, you must often convert initial mass measurements into moles using the substance\'s molar mass. Furthermore, if the solvent volume is provided in milliliters, it must be converted to liters by dividing by 1000 before applying the formula. Accuracy in these unit conversions prevents severe experimental errors.' },
    { type: 'h2', text: 'The Process of Dilution' },
    { type: 'p', text: 'Laboratories frequently purchase or prepare highly concentrated stock solutions. These stock solutions save storage space and are highly stable over time. To perform experiments, researchers dilute these stock solutions with a solvent, usually distilled water, to achieve a specific lower concentration.' },
    { type: 'p', text: 'During dilution, the total number of moles of solute remains entirely constant. The only change is an increase in the solvent volume, which results in a proportional decrease in the molarity. This constant relationship allows chemists to calculate required dilution volumes easily.' },
    { type: 'h3', text: 'The Dilution Formula' },
    { type: 'p', text: 'Because the moles of solute do not change, you can equate the initial state (1) to the final state (2) using the standard dilution equation.' },
    { type: 'formula', text: 'M₁V₁ = M₂V₂' },
    { type: 'ul', items: [
      'M₁ represents the initial concentration of the stock solution.',
      'V₁ represents the initial volume of the stock solution needed.',
      'M₂ represents the desired final concentration.',
      'V₂ represents the desired final total volume.'
    ] },
    { type: 'note', text: 'When using the dilution formula, volume units must simply be identical on both sides of the equation. Unlike calculating strict molarity, you can use milliliters directly without converting to liters.' },
    { type: 'p', text: 'By rearranging the equation algebraically, you can solve for V₁ to determine exactly how much stock solution to pipet into a new flask. You then add solvent until the final volume reaches V₂. These standardized calculations are the bedrock of pharmaceutical preparations, biological assays, and chemical manufacturing.' }
  ]
};
