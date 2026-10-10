export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with AllCalcTool.com for feedback, bug reports, or calculator requests.',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto prose prose-slate">
      <h1>Contact Us</h1>
      <p>
        We are always looking to improve AllCalcTool.com. If you have found a bug in one of our calculators, want to suggest a new calculator type, or have other feedback, we'd love to hear from you.
      </p>
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mt-8">
        <p className="mb-0 text-center font-medium">
          Please email us at: <br/>
          <a href="mailto:support@allcalctool.com" className="text-xl">support@allcalctool.com</a>
        </p>
      </div>
    </div>
  );
}
