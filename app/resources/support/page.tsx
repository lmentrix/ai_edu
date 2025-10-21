import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SupportPage() {
  const faqs = [
    {
      id: "account-setup",
      question: "How do I set up my account?",
      answer: "To set up your account, click on the Sign Up button in the top navigation. Fill in your email address, create a password, and follow the verification steps sent to your email.",
      category: "Account"
    },
    {
      id: "payment-issues",
      question: "I'm having trouble with payment. What should I do?",
      answer: "If you're experiencing payment issues, first check that your payment information is correct. If the problem persists, contact our support team with details about the error message you're receiving.",
      category: "Billing"
    },
    {
      id: "ai-assistant",
      question: "How does the AI assistant work?",
      answer: "Our AI assistant uses advanced machine learning models to provide personalized learning assistance. It analyzes your questions and provides step-by-step guidance tailored to your learning style and pace.",
      category: "Features"
    },
    {
      id: "progress-tracking",
      question: "Can I track my learning progress?",
      answer: "Yes! Your dashboard includes comprehensive progress tracking. You can view completed lessons, time spent learning, skill improvements, and achievement badges.",
      category: "Features"
    },
    {
      id: "subscription-cancellation",
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time from your account settings. Go to Dashboard > Account > Subscription > Cancel. Your access will continue until the end of your current billing period.",
      category: "Billing"
    },
    {
      id: "technical-issues",
      question: "The platform isn't working correctly. What should I do?",
      answer: "First, try clearing your browser cache and cookies, then restart your browser. If issues persist, check our status page for any ongoing maintenance or contact technical support.",
      category: "Technical"
    }
  ];

  const contactOptions = [
    {
      id: "live-chat",
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Available 24/7",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      action: "Start Chat"
    },
    {
      id: "email",
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 24 hours",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          <path d="m22 7-10 5L2 7"></path>
        </svg>
      ),
      action: "Send Email"
    },
    {
      id: "phone",
      title: "Phone Support",
      description: "Speak directly with our team",
      availability: "Mon-Fri, 9AM-6PM EST",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
      action: "Call Us"
    }
  ];

  const guides = [
    {
      id: "getting-started",
      title: "Getting Started Guide",
      description: "Learn the basics of AI Edu and set up your account",
      duration: "5 min read",
      category: "Beginner"
    },
    {
      id: "billing-guide",
      title: "Billing & Subscription Guide",
      description: "Understand our pricing plans and billing process",
      duration: "3 min read",
      category: "Billing"
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting Common Issues",
      description: "Solve common technical problems quickly",
      duration: "7 min read",
      category: "Technical"
    },
    {
      id: "ai-tips",
      title: "Getting the Most from AI Assistant",
      description: "Tips and tricks for effective AI interactions",
      duration: "4 min read",
      category: "Features"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Account":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Billing":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Features":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "Technical":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "Beginner":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 futuristic-heading">Support Center</h1>
          <p className="text-lg text-muted-foreground">
            Find answers, get help, and connect with our support team.
          </p>
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="submit">Submit Ticket</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            <div className="space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.id} className="futuristic-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getCategoryColor(faq.category)}>
                            {faq.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactOptions.map((option) => (
                <Card key={option.id} className="futuristic-card hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      {option.icon}
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">{option.availability}</p>
                      <Button className="w-full futuristic-button">
                        {option.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="futuristic-card">
              <CardHeader>
                <CardTitle>Office Hours</CardTitle>
                <CardDescription>
                  Schedule a one-on-one session with our support team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Technical Support</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Monday - Friday: 9:00 AM - 6:00 PM EST
                    </p>
                    <Button variant="outline" size="sm" className="futuristic-button">
                      Book Session
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Account & Billing</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Monday - Friday: 10:00 AM - 5:00 PM EST
                    </p>
                    <Button variant="outline" size="sm" className="futuristic-button">
                      Book Session
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.map((guide) => (
                <Card key={guide.id} className="futuristic-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getCategoryColor(guide.category)}>
                            {guide.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{guide.duration}</span>
                      <Button variant="outline" size="sm" className="futuristic-button">
                        Read Guide
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="submit" className="space-y-6">
            <Card className="futuristic-card max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Submit a ticket and our team will get back to you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input placeholder="Brief description of your issue" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                    <option value="">Select a category</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="account">Account Issue</option>
                    <option value="feature">Feature Request</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Please describe your issue in detail..." 
                    rows={6}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Priority</label>
                  <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <Button className="w-full futuristic-button">
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}