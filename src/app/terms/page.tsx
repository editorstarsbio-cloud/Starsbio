export const metadata = {
  title: 'Terms of Use',
  description: 'Terms and conditions for using AllCalcTool.com.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto prose prose-slate">
      <h1>Terms of Use</h1>
      <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
      
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using AllCalcTool.com, you accept and agree to be bound by the terms and provisions of this agreement.
      </p>

      <h2>2. Use of the Site</h2>
      <p>
        The calculators, tools, and content provided on this website are for personal, non-commercial use, as well as general informational purposes. You may not scrape, copy, reproduce, or systematically extract data or calculator logic from this website for use in a competing service.
      </p>

      <h2>3. Disclaimer of Warranties</h2>
      <p>
        The materials on AllCalcTool.com are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
      </p>
      <p>
        Please review our <a href="/disclaimer/">Disclaimer</a> for specific information regarding the limits of our financial, health, and engineering calculators.
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>
        In no event shall AllCalcTool.com or its operators be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website, even if we have been notified orally or in writing of the possibility of such damage.
      </p>

      <h2>5. Governing Law</h2>
      <p>
        These terms and conditions are governed by and construed in accordance with applicable laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
      </p>
    </div>
  );
}
