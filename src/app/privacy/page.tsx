export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for AllCalcTool.com outlining our data collection practices.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto prose prose-slate">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
      
      <h2>Overview</h2>
      <p>
        At AllCalcTool.com, your privacy is important to us. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data.
      </p>

      <h2>Client-Side Calculations</h2>
      <p>
        The vast majority of our calculators operate entirely on the client-side (in your browser). This means that the numbers you input into the calculators (such as financial figures, health metrics, or personal data) are processed locally on your device and are <strong>not</strong> transmitted to or stored on our servers.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li><strong>Log Data:</strong> Like most websites, our hosting provider may collect standard server logs including your IP address, browser type, referring pages, and timestamps.</li>
        <li><strong>Analytics:</strong> We may use basic, privacy-respecting analytics tools to understand which calculators are most popular. This data is aggregated and anonymized.</li>
        <li><strong>Contact Information:</strong> If you choose to contact us via email, we will securely store your email address and message solely for the purpose of responding to your inquiry.</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        AllCalcTool.com strives to use as few cookies as possible. We do not use third-party tracking cookies or advertising cookies without your explicit consent. Some essential technical cookies may be used for site security and core functionality.
      </p>

      <h2>Changes to this Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
      </p>
    </div>
  );
}
