import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 text-sm">
              🚀 AI-Powered Learning Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 futuristic-heading">
              Master <span className="text-primary">Coding</span>, <span className="text-primary">Math</span>, <span className="text-primary">Science</span> & <span className="text-primary">Writing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience personalized learning with AI assistance. Get instant feedback, step-by-step guidance, and accelerate your learning journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base px-8 futuristic-button">
                <Link href="/auth">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8 futuristic-button">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="explore-modules" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 futuristic-heading">Explore Learning Modules</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our specialized AI-powered learning tools designed to help you excel in different subjects.
            </p>
          </div>

          <Tabs defaultValue="code" className="w-full max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="math">Math</TabsTrigger>
              <TabsTrigger value="science">Science</TabsTrigger>
              <TabsTrigger value="essay">Essay</TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="space-y-6">
              <Card className="overflow-hidden futuristic-card">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <span className="text-xl">💻</span>
                    </div>
                    <CardTitle className="text-2xl">AI Code Assistant</CardTitle>
                  </div>
                  <CardDescription className="text-lg">
                    Write, debug, and optimize code with intelligent AI guidance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Features:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Code completion and suggestions</li>
                        <li>• Real-time error detection</li>
                        <li>• Code optimization tips</li>
                        <li>• Multi-language support</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Perfect for:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Beginners learning to code</li>
                        <li>• Experienced developers</li>
                        <li>• Code reviews and debugging</li>
                        <li>• Algorithm optimization</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full md:w-auto">
                    <Link href="/code">Start Coding</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="math" className="space-y-6">
              <Card className="overflow-hidden futuristic-card">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <span className="text-xl">🧮</span>
                    </div>
                    <CardTitle className="text-2xl">AI Math Solver</CardTitle>
                  </div>
                  <CardDescription className="text-lg">
                    Solve complex mathematical problems with step-by-step explanations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Features:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Step-by-step solutions</li>
                        <li>• Graph visualization</li>
                        <li>• Formula explanations</li>
                        <li>• Practice problems</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Covers:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Algebra & Calculus</li>
                        <li>• Statistics & Probability</li>
                        <li>• Geometry & Trigonometry</li>
                        <li>• Linear Algebra</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full md:w-auto">
                    <Link href="/math">Solve Problems</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="science" className="space-y-6">
              <Card className="overflow-hidden futuristic-card">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <span className="text-xl">🔬</span>
                    </div>
                    <CardTitle className="text-2xl">AI Science Explorer</CardTitle>
                  </div>
                  <CardDescription className="text-lg">
                    Understand complex scientific concepts with interactive AI assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Features:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Concept explanations</li>
                        <li>• Virtual experiments</li>
                        <li>• Research assistance</li>
                        <li>• Problem solving</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Subjects:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Physics & Chemistry</li>
                        <li>• Biology & Ecology</li>
                        <li>• Earth Sciences</li>
                        <li>• Astronomy</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full md:w-auto">
                    <Link href="/science">Explore Science</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="essay" className="space-y-6">
              <Card className="overflow-hidden futuristic-card">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <span className="text-xl">📝</span>
                    </div>
                    <CardTitle className="text-2xl">AI Essay Writer</CardTitle>
                  </div>
                  <CardDescription className="text-lg">
                    Craft compelling essays with AI-powered writing assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Features:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Outline generation</li>
                        <li>• Grammar & style checks</li>
                        <li>• Citation assistance</li>
                        <li>• Plagiarism detection</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Essay Types:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Academic papers</li>
                        <li>• Creative writing</li>
                        <li>• Research essays</li>
                        <li>• Personal statements</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full md:w-auto">
                    <Link href="/essay">Start Writing</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto futuristic-card">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl mb-4 futuristic-heading">Ready to Transform Your Learning?</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of students who are already learning smarter with AI Edu.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base px-8 futuristic-button">
                <Link href="/auth">Sign Up Free</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8 futuristic-button">
                <Link href="#explore-modules">Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}