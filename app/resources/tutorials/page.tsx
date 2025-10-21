import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TutorialsPage() {
  const tutorials = [
    {
      id: "beginner-coding",
      title: "Introduction to Coding with AI",
      description: "Learn programming fundamentals with AI assistance",
      level: "Beginner",
      duration: "45 minutes",
      module: "code",
      topics: ["Variables", "Functions", "Control Flow", "Basic Algorithms"]
    },
    {
      id: "math-foundations",
      title: "Math Foundations with AI",
      description: "Master basic mathematical concepts with step-by-step guidance",
      level: "Beginner",
      duration: "60 minutes",
      module: "math",
      topics: ["Algebra", "Geometry", "Statistics", "Problem Solving"]
    },
    {
      id: "science-basics",
      title: "Science Exploration with AI",
      description: "Discover scientific concepts through interactive AI-guided learning",
      level: "Beginner",
      duration: "50 minutes",
      module: "science",
      topics: ["Physics", "Chemistry", "Biology", "Scientific Method"]
    },
    {
      id: "essay-writing",
      title: "Essay Writing Fundamentals",
      description: "Learn to structure and write compelling essays with AI feedback",
      level: "Beginner",
      duration: "40 minutes",
      module: "essay",
      topics: ["Essay Structure", "Thesis Statements", "Paragraph Development", "Citations"]
    },
    {
      id: "advanced-algorithms",
      title: "Advanced Algorithms and Data Structures",
      description: "Deep dive into complex algorithms with AI optimization",
      level: "Advanced",
      duration: "90 minutes",
      module: "code",
      topics: ["Dynamic Programming", "Graph Algorithms", "Tree Structures", "Complexity Analysis"]
    },
    {
      id: "calculus-mastery",
      title: "Calculus Mastery with AI",
      description: "Master calculus concepts with personalized AI tutoring",
      level: "Advanced",
      duration: "120 minutes",
      module: "math",
      topics: ["Derivatives", "Integrals", "Limits", "Applications"]
    },
    {
      id: "research-methods",
      title: "Scientific Research Methods",
      description: "Learn proper research methodologies with AI assistance",
      level: "Intermediate",
      duration: "75 minutes",
      module: "science",
      topics: ["Experimental Design", "Data Analysis", "Research Ethics", "Publication"]
    },
    {
      id: "academic-writing",
      title: "Academic Writing Excellence",
      description: "Master academic writing skills with AI-powered feedback",
      level: "Intermediate",
      duration: "55 minutes",
      module: "essay",
      topics: ["Research Papers", "Literature Review", "Academic Style", "Peer Review"]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getModuleColor = (module: string) => {
    switch (module) {
      case "code":
        return "from-blue-500 to-blue-600";
      case "math":
        return "from-green-500 to-green-600";
      case "science":
        return "from-purple-500 to-purple-600";
      case "essay":
        return "from-orange-500 to-orange-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 futuristic-heading">Interactive Tutorials</h1>
          <p className="text-lg text-muted-foreground">
            Step-by-step guided learning experiences with AI assistance. Choose your skill level and start learning today.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge variant="outline" className="px-3 py-1">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Beginner
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Intermediate
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
              Advanced
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} className="futuristic-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${getModuleColor(tutorial.module)} flex items-center justify-center`}>
                        <span className="text-white text-sm font-bold">
                          {tutorial.module.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <Badge className={getLevelColor(tutorial.level)}>
                        {tutorial.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{tutorial.title}</CardTitle>
                    <CardDescription>{tutorial.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {tutorial.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                    {tutorial.topics.length} topics
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">What you'll learn:</h4>
                  <div className="flex flex-wrap gap-1">
                    {tutorial.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button asChild className="w-full futuristic-button">
                  <Link href={`/tutorials/${tutorial.id}`}>
                    Start Tutorial
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="futuristic-card max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Can't find what you're looking for?</CardTitle>
              <CardDescription>
                We're constantly adding new tutorials. Request a specific topic or skill level.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="futuristic-button">
                Request a Tutorial
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}