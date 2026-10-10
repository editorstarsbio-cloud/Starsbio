export const metadata = {
  title: 'About Us',
  description: 'Learn more about AllCalcTool.com and our mission to provide accurate, free calculators.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto prose prose-slate">
      <h1>About AllCalcTool</h1>
      <p>
        Welcome to AllCalcTool.com. We believe that math, finance, and everyday calculations should be accessible to everyone. Our mission is to provide a comprehensive directory of free, fast, and easy-to-use calculators.
      </p>
      <h2>What We Do</h2>
      <p>
        Whether you're splitting a restaurant bill, calculating your BMI, working out a compound interest projection, or doing physics homework, we have a tool designed to give you quick, accurate results. Our calculators run directly in your browser, meaning they are fast and respect your privacy.
      </p>
      <h2>Our Commitment to Accuracy</h2>
      <p>
        We thoroughly test our calculation engines against known results and edge cases. We clearly state the formulas, assumptions, and limitations of each tool so you understand exactly how the results are generated.
      </p>
      <p>
        If you find an issue or have a suggestion for a new calculator, please let us know through our <a href="/contact/">Contact page</a>.
      </p>
    </div>
  );
}
