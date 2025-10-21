import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GDPRPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 futuristic-heading">GDPR Compliance</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: January 15, 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>What is GDPR?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy for all individuals within the European Union and the European Economic Area. It also addresses the transfer of personal data outside the EU and EEA areas.
              </p>
              <p className="text-sm text-muted-foreground">
                AI Edu is committed to complying with GDPR requirements and protecting the personal data of our users, regardless of their location.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Data Controller and Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                AI Edu is the data controller for personal information processed through our educational platform. Our GDPR compliance contact information:
              </p>
              <div className="space-y-2 text-sm bg-muted p-4 rounded-lg">
                <p><strong>Data Protection Officer (DPO):</strong> privacy@aiedu.com</p>
                <p><strong>Company Name:</strong> AI Edu Inc.</p>
                <p><strong>Address:</strong> 123 Education Street, Learning City, LC 12345</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Personal Data We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We collect and process the following categories of personal data in accordance with GDPR:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>
                  <strong>Identity Data:</strong> Name, username, email address, and other contact information
                </li>
                <li>
                  <strong>Account Data:</strong> User credentials, account settings, and preferences
                </li>
                <li>
                  <strong>Learning Data:</strong> Educational progress, performance metrics, and interaction history
                </li>
                <li>
                  <strong>Technical Data:</strong> IP address, device information, browser type, and usage patterns
                </li>
                <li>
                  <strong>Payment Data:</strong> Billing information, payment method details, and transaction history
                </li>
                <li>
                  <strong>Communication Data:</strong> Support tickets, feedback, and correspondence with our team
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Legal Basis for Processing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We process personal data only when we have a valid legal basis under GDPR. Our legal bases include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>
                  <strong>Contractual Necessity:</strong> Processing necessary to provide our educational services and fulfill our contractual obligations
                </li>
                <li>
                  <strong>Legitimate Interest:</strong> Processing necessary for our legitimate interests in providing and improving our services, such as analytics and security
                </li>
                <li>
                  <strong>Legal Obligation:</strong> Processing necessary to comply with legal and regulatory requirements
                </li>
                <li>
                  <strong>Consent:</strong> Processing based on your explicit consent for specific purposes, such as marketing communications
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Your GDPR Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Right to Information</h3>
                <p className="text-muted-foreground">
                  You have the right to be informed about the collection and use of your personal data. This privacy policy provides this information, and we provide additional details when we collect data from you.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Right of Access</h3>
                <p className="text-muted-foreground">
                  You can request access to the personal data we hold about you. We will provide a copy of your personal data free of charge, typically within 30 days of receiving your request.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Right to Rectification</h3>
                <p className="text-muted-foreground">
                  You have the right to request correction of inaccurate or incomplete personal data we hold about you.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Right to Erasure</h3>
                <p className="text-muted-foreground">
                  You can request deletion of your personal data in certain circumstances, such as when the data is no longer necessary for the purposes for which it was collected.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Right to Restrict Processing</h3>
                <p className="text-muted-foreground">
                  You have the right to request restriction of processing your personal data under certain conditions, such as when you contest the accuracy of the data.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Right to Data Portability</h3>
                <p className="text-muted-foreground">
                  You can request transfer of your personal data to another service provider in a structured, commonly used, and machine-readable format.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Right to Object</h3>
                <p className="text-muted-foreground">
                  You can object to processing of your personal data in certain circumstances, particularly when we rely on legitimate interests as our legal basis.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Rights Related to Automated Decision-Making</h3>
                <p className="text-muted-foreground">
                  You have rights related to automated decision-making and profiling, including the right not to be subject to decisions based solely on automated processing.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Exercising Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                To exercise your GDPR rights, please contact us using the information provided above. We will:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>Respond to your request within 30 days (extendable to 60 days for complex requests)</li>
                <li>Verify your identity before processing your request</li>
                <li>Provide information about the actions taken in response to your request</li>
                <li>Inform you of any reasons why we cannot comply with your request</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                We will not discriminate against you for exercising your GDPR rights.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Data Security and Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>Encryption of personal data in transit and at rest</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection and GDPR compliance</li>
                <li>Secure data storage and backup procedures</li>
                <li>Data minimization and retention policies</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                We conduct regular data protection impact assessments (DPIAs) for high-risk processing activities.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Your personal data may be transferred to and processed in countries outside the European Economic Area (EEA). We ensure appropriate safeguards are in place for such transfers:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                <li>Adequacy decisions for countries recognized as providing adequate data protection</li>
                <li>Binding Corporate Rules (BCRs) for intra-organizational transfers</li>
                <li>Additional technical and organizational measures where required</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We retain personal data only as long as necessary for the purposes for which it was collected, in accordance with our legal obligations and your rights. Our retention periods include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>Account data: Retained while your account is active</li>
                <li>Learning data: Retained for 2 years after account closure</li>
                <li>Payment data: Retained for 7 years for tax and legal purposes</li>
                <li>Support communications: Retained for 3 years</li>
                <li>Analytics data: Retained for 26 months</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                We may retain certain data longer if required by law or for legitimate interests, with appropriate safeguards.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Children's Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our services are not directed to children under 16 years of age. If we become aware that we have collected personal data from children under 16 without parental consent, we will take steps to delete such information immediately.
              </p>
              <p className="text-sm text-muted-foreground">
                For users between 16-18 years old, we may process certain data with appropriate safeguards and may require parental consent for high-risk processing activities.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Data Breaches</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                In the event of a personal data breach, we will:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>Assess the risk to individuals' rights and freedoms</li>
                <li>Notify the relevant supervisory authority within 72 hours of becoming aware of the breach</li>
                <li>Inform affected individuals without undue delay if the breach poses a high risk</li>
                <li>Document all breaches and our response actions</li>
                <li>Take appropriate measures to address and remediate the breach</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We may update this GDPR compliance policy from time to time to reflect changes in our practices, technologies, or legal requirements. We will notify you of any significant changes that affect your rights and obligations.
              </p>
              <p className="text-sm text-muted-foreground">
                The "Last updated" date at the top of this page indicates when this policy was last revised.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                If you have any questions about this GDPR compliance policy or wish to exercise your rights, please contact our Data Protection Officer:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> privacy@aiedu.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Address:</strong> 123 Education Street, Learning City, LC 12345</p>
              </div>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  If you are not satisfied with our response to your GDPR rights request, you have the right to lodge a complaint with a supervisory authority in your country of residence.
                </p>
                <Button className="futuristic-button">
                  Submit GDPR Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}