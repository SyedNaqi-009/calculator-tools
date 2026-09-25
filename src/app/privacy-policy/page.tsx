import Link from "next/link";
import { PageSEO } from "@/components/seo";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageSEO 
        title="Privacy Policy | CalcHub"
        description="Read our Privacy Policy to understand how CalcHub collects, uses, and protects your data."
        url="/privacy-policy"
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm mb-6 text-muted-foreground">
          <Link href="/" className="hover:underline">Home</Link> &gt; 
          <span className="ml-1">Privacy Policy</span>
        </nav>

        <div className="prose prose-blue dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Effective Date: March 2024</p>

          <p>
            At CalcHub ("we," "our," or "us"), your privacy is of utmost importance. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website (calchub.com).
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            When you use CalcHub, we may collect the following types of information:
          </p>
          <ul>
            <li><strong>Non-Personal Information:</strong> Includes browser type, device type, operating system, and anonymous usage data (e.g., pages visited, time spent).</li>
            <li><strong>Personal Information:</strong> We only collect personal information (such as your name and email address) if you voluntarily provide it to us, for instance, by filling out a contact form or subscribing to our newsletter.</li>
          </ul>
          <p>
            <strong>Note on Calculators:</strong> The vast majority of our calculators operate entirely on the client side (in your browser). We do not store, track, or collect the specific numbers, financial data, or health data you input into our calculators.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li>To operate and maintain our website.</li>
            <li>To improve user experience based on analytical data.</li>
            <li>To respond to your inquiries and support requests.</li>
            <li>To serve relevant advertisements through third-party ad networks (like Google AdSense).</li>
          </ul>

          <h2>3. Cookies and Tracking Technologies</h2>
          <p>
            CalcHub uses cookies to enhance your browsing experience. Cookies are small data files placed on your device. We use them for:
          </p>
          <ul>
            <li>Remembering your preferences (e.g., dark/light mode, calculator history).</li>
            <li>Analytics (Google Analytics) to understand website traffic.</li>
            <li>Advertising (Google AdSense) to serve personalized ads based on your visits to our site and other sites on the internet.</li>
          </ul>
          <p>
            You can manage or disable cookies through your browser settings. Please review our <Link href="/cookie-policy">Cookie Policy</Link> for more details.
          </p>

          <h2>4. Third-Party Services</h2>
          <p>
            We may share your non-personal data with third-party service providers for analytics and advertising. These third parties have their own privacy policies governing their use of your data.
          </p>
          <ul>
            <li><strong>Google Analytics:</strong> We use it to monitor site usage.</li>
            <li><strong>Google AdSense:</strong> Used to serve ads. Google uses the DoubleClick cookie to serve interest-based ads. You can opt-out of personalized advertising by visiting Google's Ads Settings.</li>
          </ul>

          <h2>5. CCPA & GDPR Compliance</h2>
          <p>
            If you are a resident of California (CCPA) or the European Economic Area (GDPR), you have certain rights regarding your personal data, including the right to access, delete, or restrict processing of your personal information. To exercise these rights, please contact us.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>7. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Effective Date." We encourage you to review this page periodically.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:privacy@calchub.com">privacy@calchub.com</a> or via our <Link href="/contact">Contact Page</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
