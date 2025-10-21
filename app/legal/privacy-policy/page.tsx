import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 futuristic-heading">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: January 15, 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                AI Edu ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our educational services.
              </p>
              <p>
                By using AI Edu, you consent to the data practices described in this policy. If you do not agree with the terms of this privacy policy, please do not access or use our website.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <p className="text-muted-foreground mb-2">
                  We may collect personally identifiable information, such as:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Name and email address</li>
                  <li>Account credentials (username, password)</li>
                  <li>Billing information (payment method, billing address)</li>
                  <li>Profile information (learning goals, preferences)</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Usage Data</h3>
                <p className="text-muted-foreground mb-2">
                  We automatically collect certain information about how you use our services:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Pages visited and time spent on each page</li>
                  <li>Learning progress and performance metrics</li>
                  <li>Features used and interactions with AI assistants</li>
                  <li>Device information and browser type</li>
                  <li>IP address and location data</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Learning Data</h3>
                <p className="text-muted-foreground">
                  To provide personalized learning experiences, we collect information about your educational activities, including questions asked, problems solved, and feedback received. This data is used to improve our AI algorithms and tailor content to your learning style.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We use the collected information for various purposes:</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>To provide and maintain our educational services</li>
                <li>To personalize your learning experience and provide AI-powered assistance</li>
                <li>To process payments and manage your subscription</li>
                <li>To communicate with you about your account and services</li>
                <li>To improve our website, services, and user experience</li>
                <li>To analyze usage patterns and optimize our AI algorithms</li>
                <li>To detect and prevent fraud or abuse of our services</li>
                <li>To comply with legal obligations and protect our rights</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>
                  <strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our services (e.g., payment processors, hosting services).
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid legal requests.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the transaction.
                </li>
                <li>
                  <strong>Aggregated Data:</strong> We may share anonymized, aggregated data that does not personally identify you for research, analytics, or marketing purposes.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and vulnerability testing</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection practices</li>
                <li>Secure data storage and backup procedures</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>
                  <strong>Access:</strong> Request access to the personal information we hold about you.
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate or incomplete information.
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal information.
                </li>
                <li>
                  <strong>Portability:</strong> Request transfer of your data to another service provider.
                </li>
                <li>
                  <strong>Objection:</strong> Object to processing of your personal information.
                </li>
                <li>
                  <strong>Restriction:</strong> Request restriction of processing your personal information.
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>
                  <strong>Essential Cookies:</strong> Required for basic website functionality.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> Help us understand how our website is used.
                </li>
                <li>
                  <strong>Functional Cookies:</strong> Remember your preferences and settings.
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements.
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                You can control cookie settings through your browser preferences. However, disabling certain cookies may affect website functionality.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our services are not intended for children under 13 years of age. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete such information.
              </p>
              <p className="text-sm text-muted-foreground">
                For users between 13-18 years of age, we require parental consent for account creation and may limit certain features to protect younger users.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                AI Edu may transfer and process your personal information outside of your country of residence. When we do so, we ensure appropriate safeguards are in place to protect your data in accordance with applicable data protection laws.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top.
              </p>
              <p className="text-sm text-muted-foreground">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> privacy@aiedu.com</p>
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