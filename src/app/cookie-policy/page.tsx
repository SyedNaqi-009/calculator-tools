import Link from "next/link";
import { PageSEO } from "@/components/seo";

export default function CookiePolicyPage() {
  return (
    <>
      <PageSEO 
        title="Cookie Policy | CalcHub"
        description="Learn about how CalcHub uses cookies to improve your browsing experience."
        url="/cookie-policy"
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm mb-6 text-muted-foreground">
          <Link href="/" className="hover:underline">Home</Link> &gt; 
          <span className="ml-1">Cookie Policy</span>
        </nav>

        <div className="prose prose-blue dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last Updated: March 2024</p>

          <p>
            This Cookie Policy explains how CalcHub ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website at calchub.com. It explains what these technologies are, why we use them, and your rights to control our use of them.
          </p>

          <h2>What are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>

          <h2>Why Do We Use Cookies?</h2>
          <p>We use first-party and third-party cookies for several reasons:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> These are strictly necessary to provide you with services available through our website and to use some of its features.</li>
            <li><strong>Performance & Analytics Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used (e.g., Google Analytics).</li>
            <li><strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website. This enables us to personalize our content for you and remember your preferences (like theme settings and recent calculator history).</li>
            <li><strong>Targeting & Advertising Cookies:</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests (e.g., Google AdSense).</li>
          </ul>

          <h2>Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, deliver advertisements on and through the service, and so on.
          </p>
          <p>
            Specifically, we use Google AdSense to serve ads. Google’s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer">Google Ads Settings</a>.
          </p>

          <h2>How Can You Control Cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
          </p>
          <p>
            For more information on how to manage and delete cookies, visit <a href="https://www.aboutcookies.org/" target="_blank" rel="noreferrer">aboutcookies.org</a>.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about our use of cookies or other technologies, please <Link href="/contact">contact us</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
