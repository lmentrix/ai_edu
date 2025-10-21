import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 futuristic-heading">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: January 15, 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Agreement to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Welcome to AI Edu. These Terms of Service ("Terms") govern your access to and use of our website, services, and applications (the "Service") operated by AI Edu ("we," "us," or "our").
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                AI Edu is an educational platform that provides AI-powered learning tools and resources for coding, mathematics, science, and essay writing. Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>Interactive AI assistants for personalized learning</li>
                <li>Educational content and tutorials</li>
                <li>Progress tracking and performance analytics</li>
                <li>Community features for collaborative learning</li>
                <li>Subscription-based premium features</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Accounts and Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Account Creation</h3>
                <p className="text-muted-foreground">
                  To access certain features of our Service, you must register for an account. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4 mt-2">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your account information</li>
                  <li>Maintain the security of your password</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Age Requirements</h3>
                <p className="text-muted-foreground">
                  You must be at least 13 years old to use our Service. Users between 13-18 years old require parental consent. We may restrict access to certain features for users under 18.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Subscription and Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Subscription Plans</h3>
                <p className="text-muted-foreground">
                  AI Edu offers both free and paid subscription plans. Paid subscriptions provide access to premium features and enhanced functionality.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Billing and Renewal</h3>
                <p className="text-muted-foreground mb-2">
                  Paid subscriptions are billed on a recurring basis (monthly or annually) and will automatically renew unless cancelled:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>You will be billed at the beginning of each subscription period</li>
                  <li>Prices are subject to change with 30 days notice</li>
                  <li>Payment is processed through secure third-party payment providers</li>
                  <li>You are responsible for all taxes associated with your purchase</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Cancellation and Refunds</h3>
                <p className="text-muted-foreground">
                  You may cancel your subscription at any time from your account settings. Cancellation will take effect at the end of your current billing period. We offer a 30-day money-back guarantee for new subscriptions.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Acceptable Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>You agree to use our Service only for lawful purposes and in accordance with these Terms. You may not:</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                <li>Interfere with or disrupt the Service or servers connected to the Service</li>
                <li>Upload or transmit malicious code, viruses, or harmful content</li>
                <li>Use the Service to harass, abuse, or harm others</li>
                <li>Violate applicable laws or regulations</li>
                <li>Reverse engineer, decompile, or attempt to extract our source code</li>
                <li>Use automated tools to access the Service without permission</li>
                <li>Share your account credentials with others</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Our Content</h3>
                <p className="text-muted-foreground">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of AI Edu and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">User Content</h3>
                <p className="text-muted-foreground mb-2">
                  You retain ownership of any content you create or submit to our Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Use, reproduce, and display your content for service improvement</li>
                  <li>Analyze your content to enhance our AI algorithms</li>
                  <li>Create anonymized, aggregated data for research purposes</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Educational Content</h3>
                <p className="text-muted-foreground">
                  Educational materials provided through our Service are for personal, non-commercial use only. You may not redistribute, republish, or sell our educational content without explicit permission.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection and use of your information.
              </p>
              <p className="text-sm text-muted-foreground">
                By using our Service, you consent to the collection and use of information in accordance with our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>AI-Assisted Learning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">AI Assistant Limitations</h3>
                <p className="text-muted-foreground">
                  Our AI assistants provide educational guidance but may occasionally provide incomplete or inaccurate information. Always verify important information through additional sources and use critical thinking when evaluating AI-generated content.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Academic Integrity</h3>
                <p className="text-muted-foreground">
                  While our AI tools can assist with learning, you are responsible for maintaining academic integrity. Submitting AI-generated work as your own original creation may violate academic policies at your educational institution.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including if you breach the Terms. Upon termination, your right to use the Service will cease immediately.
              </p>
              <p className="text-sm text-muted-foreground">
                All provisions of the Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, regarding the operation or availability of the Service.
              </p>
              <p className="text-sm text-muted-foreground">
                We do not guarantee that the Service will be uninterrupted, secure, or error-free. Educational outcomes are not guaranteed and depend on your individual effort and engagement.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                In no event shall AI Edu, our directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, or other intangible losses, resulting from your use of the Service.
              </p>
              <p className="text-sm text-muted-foreground">
                Our total liability to you for any cause of action shall not exceed the amount you paid to us in the twelve (12) months preceding the claim.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which AI Edu operates, without regard to conflict of law provisions.
              </p>
              <p className="text-sm text-muted-foreground">
                Any disputes arising from these Terms shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by email or by posting a notice on our Service prior to the effective date of the changes.
              </p>
              <p className="text-sm text-muted-foreground">
                Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> legal@aiedu.com</p>
                <p><strong>Address:</strong> 123 Education Street, Learning City, LC 12345</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}