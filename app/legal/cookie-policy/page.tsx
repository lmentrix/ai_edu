import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 futuristic-heading">Cookie Policy</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: January 15, 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>What Are Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. They allow us to recognize you and remember your preferences, enhance your user experience, and analyze how our website is used.
              </p>
              <p className="text-sm text-muted-foreground">
                This Cookie Policy explains what cookies are, how we use them, and your choices regarding their use.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>How We Use Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We use cookies for various purposes to enhance your experience on our website:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>
                  <strong>Essential Cookies:</strong> Required for basic website functionality, such as logging in, maintaining your session, and managing your preferences.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </li>
                <li>
                  <strong>Functional Cookies:</strong> Enable enhanced functionality and personalization, such as remembering your learning progress and preferences.
                </li>
                <li>
                  <strong>Targeting Cookies:</strong> Used to deliver relevant advertisements and content based on your interests and browsing behavior.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us analyze website usage and improve our services by collecting information about how you use our platform.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Types of Cookies We Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Session Cookies</h3>
                <p className="text-muted-foreground">
                  These are temporary cookies that expire when you close your browser. They help us maintain your session and track your actions during a single visit.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Persistent Cookies</h3>
                <p className="text-muted-foreground">
                  These remain on your device for a set period or until you delete them. They help us recognize you when you return to our website and remember your preferences.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">First-Party Cookies</h3>
                <p className="text-muted-foreground">
                  Set by our website directly and can only be read by our website. These include essential cookies for basic functionality and performance tracking.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Third-Party Cookies</h3>
                <p className="text-muted-foreground">
                  Set by external services we use on our website, such as analytics tools, social media platforms, and advertising networks.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Specific Cookies Used</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Cookie Name</th>
                      <th className="text-left py-2">Purpose</th>
                      <th className="text-left py-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b">
                      <td className="py-2">session_id</td>
                      <td className="py-2">Maintains user session</td>
                      <td className="py-2">Session</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">auth_token</td>
                      <td className="py-2">Keeps user logged in</td>
                      <td className="py-2">30 days</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">preferences</td>
                      <td className="py-2">Stores user preferences</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">analytics_id</td>
                      <td className="py-2">Tracks user behavior anonymously</td>
                      <td className="py-2">2 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">learning_progress</td>
                      <td className="py-2">Saves learning progress</td>
                      <td className="py-2">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We use the following third-party services that may set their own cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>
                  <strong>Google Analytics:</strong> For website analytics and performance monitoring
                </li>
                <li>
                  <strong>Stripe:</strong> For payment processing and subscription management
                </li>
                <li>
                  <strong>Google AdSense:</strong> For displaying relevant advertisements
                </li>
                <li>
                  <strong>Facebook Pixel:</strong> For advertising and analytics purposes
                </li>
                <li>
                  <strong>Intercom:</strong> For customer support and live chat functionality
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Please note that these third-party services have their own privacy policies and cookie policies, which we encourage you to review.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Managing Your Cookie Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Cookie Consent Banner</h3>
                <p className="text-muted-foreground">
                  When you first visit our website, you will see a cookie consent banner where you can choose which types of cookies to accept. You can change your preferences at any time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Browser Settings</h3>
                <p className="text-muted-foreground mb-2">
                  You can control and manage cookies through your browser settings:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Block all cookies or only third-party cookies</li>
                  <li>Delete existing cookies from your device</li>
                  <li>Set notifications when cookies are being set</li>
                  <li>Configure exceptions for trusted websites</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Browser-Specific Instructions</h3>
                <p className="text-muted-foreground mb-2">
                  For detailed instructions on managing cookies in your specific browser:
                </p>

              </div>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Impact of Disabling Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Please be aware that disabling cookies may affect your experience on our website:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>Some features may not function properly</li>
                <li>You may need to log in repeatedly</li>
                <li>Your preferences may not be saved</li>
                <li>Personalized content may not be displayed</li>
                <li>Learning progress may not be tracked accurately</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Essential cookies are required for basic website functionality, and disabling them may prevent you from using certain features of our Service.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Cookies for Educational Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                To provide personalized learning experiences, we use cookies to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>Track your learning progress across sessions</li>
                <li>Remember your preferred difficulty levels and subjects</li>
                <li>Save your responses to questions and exercises</li>
                <li>Customize content recommendations based on your interests</li>
                <li>Maintain your AI assistant conversation history</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                These cookies help create a seamless and personalized learning experience but are not strictly essential for basic functionality.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Updates to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices, technologies, or legal requirements. We will notify you of any significant changes by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                <li>Posting the updated policy on our website</li>
                <li>Updating the "Last updated" date at the top</li>
                <li>Displaying a notice on our website when changes are substantial</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                We encourage you to review this policy periodically to stay informed about our use of cookies.
              </p>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                If you have any questions about this Cookie Policy or our use of cookies, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> privacy@aiedu.com</p>
                <p><strong>Address:</strong> 123 Education Street, Learning City, LC 12345</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
              <div className="pt-4">
                <Button className="futuristic-button">
                  Manage Cookie Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}