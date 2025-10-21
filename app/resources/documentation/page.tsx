import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DocumentationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 futuristic-heading">Documentation</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive guides and API references to help you make the most of AI Edu's features.
          </p>
        </div>

        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="api-reference">API Reference</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started" className="space-y-6">
            <Card className="futuristic-card">
              <CardHeader>
                <CardTitle>Welcome to AI Edu</CardTitle>
                <CardDescription>Get started with our AI-powered educational platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Quick Start Guide</h4>
                    <p className="text-sm text-muted-foreground">
                      Learn the basics of AI Edu and start your learning journey in minutes.
                    </p>
                    <Badge variant="secondary">Beginner</Badge>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Account Setup</h4>
                    <p className="text-sm text-muted-foreground">
                      Configure your profile, preferences, and learning goals.
                    </p>
                    <Badge variant="secondary">Beginner</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="futuristic-card">
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
                <CardDescription>Understanding AI Edu's core features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Learning Modules</h4>
                    <p className="text-sm text-muted-foreground">
                      Explore our coding, math, science, and essay writing modules.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">AI Assistant</h4>
                    <p className="text-sm text-muted-foreground">
                      Learn how to effectively use our AI-powered learning assistant.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api-reference" className="space-y-6">
            <Card className="futuristic-card">
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>Technical reference for developers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Authentication</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Secure API authentication using OAuth 2.0
                    </p>
                    <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
{`POST /api/auth/token
Authorization: Bearer <token>
Content-Type: application/json`}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Chat API</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Interact with our AI assistant programmatically
                    </p>
                    <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
{`POST /api/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Your question here",
  "module": "math|code|science|essay"
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides" className="space-y-6">
            <Card className="futuristic-card">
              <CardHeader>
                <CardTitle>Step-by-Step Guides</CardTitle>
                <CardDescription>Detailed tutorials for specific tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Advanced Math Problem Solving</h4>
                    <p className="text-sm text-muted-foreground">
                      Learn techniques for solving complex mathematical problems.
                    </p>
                    <Badge variant="outline">Advanced</Badge>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Code Debugging with AI</h4>
                    <p className="text-sm text-muted-foreground">
                      Master the art of debugging using our AI code assistant.
                    </p>
                    <Badge variant="outline">Intermediate</Badge>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Scientific Research Assistant</h4>
                    <p className="text-sm text-muted-foreground">
                      Use AI to accelerate your scientific research and analysis.
                    </p>
                    <Badge variant="outline">Advanced</Badge>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Essay Writing Excellence</h4>
                    <p className="text-sm text-muted-foreground">
                      Craft compelling essays with AI-powered writing assistance.
                    </p>
                    <Badge variant="outline">Intermediate</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <Card className="futuristic-card">
              <CardHeader>
                <CardTitle>Code Examples</CardTitle>
                <CardDescription>Practical examples and use cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">JavaScript Integration</h4>
                    <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
{`// Initialize AI Edu client
const aiEdu = new AIEduClient({
  apiKey: 'your-api-key',
  module: 'code'
});

// Get code suggestions
const suggestions = await aiEdu.getCodeSuggestions({
  language: 'javascript',
  code: 'function calculateSum(arr) { // Your code here }'
});`}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Python Integration</h4>
                    <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
{`# Import AI Edu Python SDK
import aiedu

# Initialize client
client = aiedu.Client(api_key='your-api-key')

# Solve math problem
result = client.math.solve(
  equation="2x + 5 = 15",
  variable="x"
)
print(result)  # Output: 5`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}