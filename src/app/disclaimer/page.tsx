export const metadata = {
  title: 'Disclaimer',
  description: 'Important legal disclaimer for calculations on AllCalcTool.com.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto prose prose-slate">
      <h1>Disclaimer</h1>
      <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
      <p>
        The calculators and information provided on AllCalcTool.com are for educational, informational, and general use purposes only. 
      </p>
      <h2>Not Professional Advice</h2>
      <p>
        <strong>Financial & Tax Calculators:</strong> The results provided by our finance, mortgage, and tax calculators are estimates based on the inputs you provide and simplified formulas. They do not constitute financial, investment, or tax advice. You should consult a qualified financial advisor or tax professional before making significant financial decisions.
      </p>
      <p>
        <strong>Health & Medical Calculators:</strong> Calculators relating to health, fitness, BMI, BMR, and similar topics provide broad estimates based on generalized statistical formulas. They are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
      </p>
      <p>
        <strong>Engineering & Construction Calculators:</strong> Tools designed for construction material estimation or engineering physics are simplified models. They do not replace professional engineering analysis, site-specific surveying, or adherence to local building codes. 
      </p>
      <h2>No Warranties</h2>
      <p>
        While we strive to ensure the accuracy of our calculators and content, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
      </p>
    </div>
  );
}
