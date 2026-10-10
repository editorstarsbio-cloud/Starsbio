import type { Article } from '../types';

export const article: Article = {
  slug: 'how-to-scale-a-recipe',
  title: 'How to Scale a Recipe Accurately',
  description: 'Learn the exact mathematical formula to scale recipes up or down without ruining the flavor or texture of your food.',
  category: 'cooking',
  author: 'Culinary Team',
  published: '2026-10-10T00:00:00Z',
  status: 'published',
  relatedCalculators: [],
  tags: ['cooking', 'baking', 'kitchen', 'recipe', 'scaling'],
  body: [
    { type: 'p', text: 'Scaling a recipe up for a dinner party or down for a solo meal involves more than just estimating ingredient amounts. Using a standard conversion factor ensures the ratios remain chemically balanced, preventing baking disasters or overly seasoned dishes. The process centers around finding your multiplier and applying it systematically to every ingredient in the list.' },
    { type: 'h2', text: 'Finding Your Conversion Factor' },
    { type: 'p', text: 'First, determine your exact conversion factor. Divide your desired number of servings by the original number of servings stated in the recipe.' },
    { type: 'formula', text: 'Conversion Factor = Desired Servings / Original Servings' },
    { type: 'p', text: 'For example, if a soup recipe yields four servings but you need to feed ten people, divide ten by four to get a conversion factor of 2.5. If a cookie recipe makes 36 cookies but you only want 12, divide 12 by 36 to get a factor of 0.33.' },
    { type: 'h2', text: 'Applying the Factor' },
    { type: 'p', text: 'Next, multiply every ingredient in the original recipe by this conversion factor. If the original soup calls for 2 cups of broth, multiply 2 by 2.5 to get 5 cups. If it requires 1 tablespoon of olive oil, you will need 2.5 tablespoons. For fractional amounts like 1/4 teaspoon, convert them to decimals first (0.25), multiply by the factor, and convert back to a usable fraction.' },
    { type: 'h2', text: 'Exceptions to the Rule' },
    { type: 'p', text: 'While scaling works perfectly for most ingredients, certain elements require special attention. Spices and seasonings do not always scale linearly. When doubling or tripling a recipe, do not automatically double the salt, pepper, or strong spices like cayenne. Multiply these by 1.5 instead, taste the dish during cooking, and adjust manually. Over-seasoning is difficult to fix later.' },
    { type: 'p', text: 'Cooking times and equipment also change when scaling. Baking a doubled cake batter in the original pan will result in overflowing and undercooked centers. You must either use a larger pan or bake the batter in two separate batches. For stovetop cooking, a larger volume of liquid takes significantly longer to reach a boil and requires a wider pot for even heat distribution.' },
    { type: 'p', text: 'Finally, relying on metric weights rather than volume measurements greatly improves scaling accuracy. Converting cups and tablespoons to grams before applying your conversion factor eliminates the mathematical headache of measuring 3.75 cups of flour and ensures perfect consistency every time you cook.' }
  ]
};
