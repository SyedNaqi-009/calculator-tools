import Link from "next/link";
import { PageSEO } from "@/components/seo";

export default function DMCAPage() {
  return (
    <>
      <PageSEO 
        title="DMCA Policy | CalcHub"
        description="CalcHub respects intellectual property rights. Read our Digital Millennium Copyright Act (DMCA) policy and takedown procedure."
        url="/dmca"
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm mb-6 text-muted-foreground">
          <Link href="/" className="hover:underline">Home</Link> &gt; 
          <span className="ml-1">DMCA</span>
        </nav>

        <div className="prose prose-blue dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">DMCA Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last Updated: March 2024</p>

          <p>
            CalcHub respects the intellectual property rights of others. It is our policy to respond to any claim that Content posted on the Site infringes on the copyright or other intellectual property rights of any person or entity in accordance with the Digital Millennium Copyright Act (DMCA).
          </p>

          <h2>Filing a DMCA Takedown Notice</h2>
          <p>
            If you believe in good faith that any content on CalcHub infringes your copyright, you (or your agent) may send us a notice requesting that the content be removed or access to it blocked. The notice must include the following information:
          </p>
          <ol>
            <li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest.</li>
            <li>A description of the copyrighted work that you claim has been infringed, including the URL (i.e., web page address) of the location where the copyrighted work exists or a copy of the copyrighted work.</li>
            <li>A description of where the material that you claim is infringing is located on the Site, reasonably sufficient to permit us to locate the material (e.g., specific URLs).</li>
            <li>Your address, telephone number, and email address.</li>
            <li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>
          </ol>

          <h2>Where to Send the Notice</h2>
          <p>
            You can submit your DMCA takedown notice to our designated Copyright Agent via email:
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:dmca@calchub.com">dmca@calchub.com</a><br/>
            <strong>Subject Line:</strong> DMCA Takedown Notice
          </p>

          <h2>Counter-Notice</h2>
          <p>
            If you believe that your content was removed (or access to it was disabled) by mistake or misidentification, you may file a counter-notice with our Copyright Agent. The counter-notice must contain:
          </p>
          <ol>
            <li>Your physical or electronic signature.</li>
            <li>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or disabled.</li>
            <li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or a misidentification of the material.</li>
            <li>Your name, address, and telephone number, and a statement that you consent to the jurisdiction of the federal court in your jurisdiction, and that you will accept service of process from the person who provided the original DMCA notification.</li>
          </ol>

          <h2>Repeat Infringers</h2>
          <p>
            In accordance with the DMCA and other applicable law, CalcHub has adopted a policy of terminating, in appropriate circumstances and at our sole discretion, users who are deemed to be repeat infringers.
          </p>
        </div>
      </div>
    </>
  );
}
