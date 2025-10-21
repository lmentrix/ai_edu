import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function CommunityPage() {
  const forums = [
    {
      id: "general-discussion",
      title: "General Discussion",
      description: "Share your thoughts, ask questions, and connect with other learners",
      posts: 1234,
      members: 567,
      latestActivity: "2 minutes ago",
      category: "General"
    },
    {
      id: "coding-help",
      title: "Coding Help & Tips",
      description: "Get help with coding problems and share programming tips",
      posts: 892,
      members: 423,
      latestActivity: "5 minutes ago",
      category: "Coding"
    },
    {
      id: "math-problems",
      title: "Math Problem Solving",
      description: "Discuss mathematical concepts and solve problems together",
      posts: 756,
      members: 389,
      latestActivity: "12 minutes ago",
      category: "Mathematics"
    },
    {
      id: "science-exploration",
      title: "Science Exploration",
      description: "Explore scientific concepts and share discoveries",
      posts: 623,
      members: 312,
      latestActivity: "25 minutes ago",
      category: "Science"
    },
    {
      id: "writing-workshop",
      title: "Writing Workshop",
      description: "Share essays, get feedback, and improve writing skills",
      posts: 445,
      members: 267,
      latestActivity: "1 hour ago",
      category: "Writing"
    },
    {
      id: "ai-education",
      title: "AI in Education",
      description: "Discuss the role of AI in learning and education",
      posts: 334,
      members: 198,
      latestActivity: "2 hours ago",
      category: "AI & Education"
    }
  ];

  const events = [
    {
      id: "coding-workshop",
      title: "AI-Powered Coding Workshop",
      description: "Learn advanced coding techniques with AI assistance",
      date: "2024-02-15",
      time: "3:00 PM EST",
      duration: "2 hours",
      attendees: 45,
      maxAttendees: 100,
      type: "Workshop"
    },
    {
      id: "math-study-group",
      title: "Weekly Math Study Group",
      description: "Collaborative problem-solving session for calculus students",
      date: "2024-02-10",
      time: "5:00 PM EST",
      duration: "1 hour",
      attendees: 23,
      maxAttendees: 50,
      type: "Study Group"
    },
    {
      id: "science-webinar",
      title: "Science Research Methods Webinar",
      description: "Learn effective research methodologies with AI tools",
      date: "2024-02-18",
      time: "2:00 PM EST",
      duration: "1.5 hours",
      attendees: 67,
      maxAttendees: 200,
      type: "Webinar"
    },
    {
      id: "writing-feedback",
      title: "Essay Writing Feedback Session",
      description: "Get personalized feedback on your essays from peers and AI",
      date: "2024-02-12",
      time: "4:00 PM EST",
      duration: "1 hour",
      attendees: 18,
      maxAttendees: 30,
      type: "Feedback Session"
    }
  ];

  const contributors = [
    {
      id: "sarah-johnson",
      name: "Sarah Johnson",
      role: "Community Moderator",
      contributions: 234,
      badges: ["Helper", "Expert", "Moderator"],
      avatar: "SJ"
    },
    {
      id: "michael-chen",
      name: "Michael Chen",
      role: "Coding Expert",
      contributions: 189,
      badges: ["Helper", "Expert"],
      avatar: "MC"
    },
    {
      id: "emily-rodriguez",
      name: "Emily Rodriguez",
      role: "Math Tutor",
      contributions: 156,
      badges: ["Helper", "Tutor"],
      avatar: "ER"
    },
    {
      id: "james-wilson",
      name: "James Wilson",
      role: "Science Enthusiast",
      contributions: 143,
      badges: ["Helper", "Contributor"],
      avatar: "JW"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "General":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      case "Coding":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Mathematics":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Science":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "Writing":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "AI & Education":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Workshop":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Study Group":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Webinar":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "Feedback Session":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 futuristic-heading">Community</h1>
          <p className="text-lg text-muted-foreground">
            Connect with fellow learners, share knowledge, and grow together in our vibrant educational community.
          </p>
        </div>

        <Tabs defaultValue="forums" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="forums">Forums</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="contributors">Contributors</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          </TabsList>

          <TabsContent value="forums" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {forums.map((forum) => (
                <Card key={forum.id} className="futuristic-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getCategoryColor(forum.category)}>
                            {forum.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl mb-2">{forum.title}</CardTitle>
                        <CardDescription>{forum.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>{forum.posts} posts</span>
                        <span>{forum.members} members</span>
                      </div>
                      <span>Last activity: {forum.latestActivity}</span>
                    </div>
                    <Button variant="outline" className="w-full futuristic-button">
                      Join Forum
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="futuristic-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getEventTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>Duration: {event.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span>{event.attendees}/{event.maxAttendees} attending</span>
                      </div>
                    </div>
                    <Button className="w-full futuristic-button">
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contributors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contributors.map((contributor) => (
                <Card key={contributor.id} className="futuristic-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{contributor.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{contributor.name}</CardTitle>
                        <CardDescription>{contributor.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {contributor.contributions} contributions
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {contributor.badges.map((badge, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="futuristic-button">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guidelines" className="space-y-6">
            <Card className="futuristic-card">
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
                <CardDescription>
                  Help us maintain a positive and productive learning environment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Be Respectful</h4>
                    <p className="text-sm text-muted-foreground">
                      Treat all community members with respect and kindness. We're all here to learn and grow together.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Stay on Topic</h4>
                    <p className="text-sm text-muted-foreground">
                      Keep discussions relevant to the forum category and educational purposes.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Share Knowledge</h4>
                    <p className="text-sm text-muted-foreground">
                      Contribute helpful information and support others in their learning journey.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">No Spam</h4>
                    <p className="text-sm text-muted-foreground">
                      Avoid posting repetitive content, advertisements, or irrelevant links.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Protect Privacy</h4>
                    <p className="text-sm text-muted-foreground">
                      Don't share personal information about yourself or others without consent.
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Violations of these guidelines may result in temporary or permanent removal from the community.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}