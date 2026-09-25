import Link from "next/link";
import { PageSEO } from "@/components/seo";

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageSEO 
        title="Terms and Conditions | CalcHub"
        description="Read the terms and conditions for using CalcHub services and calculators."
        url="/terms-and-conditions"
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm mb-6 text-muted-foreground">
          <Link href="/" className="hover:underline">Home</Link> &gt; 
          <span className="ml-1">Terms and Conditions</span>
        </nav>

        <div className="prose prose-blue dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-sm text-muted-foreground mb-8">Last Updated: March 2024</p>

          <p>
            Welcome to CalcHub! By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2>1. Use of the Site</h2>
          <p>
            CalcHub provides various online calculators and related informational content for free. You may use our tools for personal, educational, or professional purposes. However, you agree not to:
          </p>
          <ul>
            <li>Use the site in any way that violates applicable federal, state, local, or international law.</li>
            <li>Attempt to reverse engineer, decompile, or extract the source code of the calculators.</li>
            <li>Use automated scripts, bots, or scrapers to interact with the site.</li>
          </ul>

          <h2>2. Intellectual Property Rights</h2>
          <p>
            The website and its original content, features, functionality, and calculator algorithms are owned by CalcHub and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works of, publicly display, or publicly perform any of our materials without our prior written consent.
          </p>

          <h2>3. No Warranty</h2>
          <p>
            The calculators and information on CalcHub are provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, as to the operation of the tools or the accuracy of the information provided.
          </p>
          <p>
            While we strive for accuracy, the results provided by our calculators are estimates and should not be used as the sole basis for making financial, health, or critical business decisions.
          </p>

          <h2>4. Limitation of Liability</h2>
          <p>
            In no event shall CalcHub, its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the website or any content provided on it.
          </p>

          <h2>5. Links to Third-Party Sites</h2>
          <p>
            Our website may contain links to third-party web sites or services that are not owned or controlled by CalcHub. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
          </p>

          <h2>6. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. We will provide notice of any significant changes by updating the "Last Updated" date at the top of this page. Your continued use of the site after any such changes constitutes your acceptance of the new Terms.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please <Link href="/contact">contact us</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
