import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function BlogPage() {
  const blogPosts = [
    {
      id: "ai-education-future",
      title: "The Future of AI in Education",
      excerpt: "Exploring how artificial intelligence is transforming the learning landscape and what it means for students and educators.",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "AI & Education",
      image: "/blog/ai-education.jpg",
      featured: true
    },
    {
      id: "effective-code-learning",
      title: "10 Tips for Effective Code Learning with AI",
      excerpt: "Learn how to maximize your programming skills using AI-powered code assistants and personalized learning paths.",
      author: "Michael Chen",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "Coding",
      image: "/blog/code-learning.jpg",
      featured: false
    },
    {
      id: "math-problem-solving",
      title: "Mastering Complex Math Problems with AI Assistance",
      excerpt: "Discover strategies for tackling advanced mathematical concepts using step-by-step AI guidance.",
      author: "Prof. Emily Rodriguez",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Mathematics",
      image: "/blog/math-problems.jpg",
      featured: false
    },
    {
      id: "science-education-innovation",
      title: "Innovative Approaches to Science Education",
      excerpt: "How virtual labs and AI tutors are revolutionizing the way we teach and learn scientific concepts.",
      author: "Dr. James Wilson",
      date: "2023-12-28",
      readTime: "8 min read",
      category: "Science",
      image: "/blog/science-edu.jpg",
      featured: false
    },
    {
      id: "essay-writing-ai",
      title: "Enhancing Essay Writing Skills with AI Feedback",
      excerpt: "Learn to leverage AI tools to improve your writing while maintaining your unique voice and style.",
      author: "Lisa Thompson",
      date: "2023-12-20",
      readTime: "5 min read",
      category: "Writing",
      image: "/blog/essay-writing.jpg",
      featured: false
    },
    {
      id: "personalized-learning",
      title: "The Power of Personalized Learning Paths",
      excerpt: "How AI creates custom educational experiences tailored to individual learning styles and paces.",
      author: "Dr. Robert Martinez",
      date: "2023-12-15",
      readTime: "6 min read",
      category: "Learning Theory",
      image: "/blog/personalized-learning.jpg",
      featured: false
    }
  ];

  const categories = [
    "All",
    "AI & Education",
    "Coding",
    "Mathematics",
    "Science",
    "Writing",
    "Learning Theory"
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "AI & Education":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "Coding":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Mathematics":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Science":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "Writing":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400";
      case "Learning Theory":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 futuristic-heading">AI Edu Blog</h1>
          <p className="text-lg text-muted-foreground">
            Insights, tips, and stories about AI-powered education and the future of learning.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="futuristic-button"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map((post) => (
          <Card key={post.id} className="futuristic-card mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Featured Image</span>
              </div>
              <div className="flex flex-col justify-center p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={getCategoryColor(post.category)}>
                    {post.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">Featured</span>
                </div>
                <h2 className="text-2xl font-bold mb-3 futuristic-heading">{post.title}</h2>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                <Button asChild className="w-full md:w-auto futuristic-button">
                  <Link href={`/blog/${post.id}`}>
                    Read Article
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <Card key={post.id} className="futuristic-card hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                <span className="text-muted-foreground">Blog Image</span>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getCategoryColor(post.category)}>
                    {post.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span>{post.author}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{formatDate(post.date)}</span>
                  <Button variant="outline" size="sm" asChild className="futuristic-button">
                    <Link href={`/blog/${post.id}`}>
                      Read More
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12">
          <Card className="futuristic-card max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Stay Updated</CardTitle>
              <CardDescription>
                Subscribe to our newsletter for the latest insights on AI in education.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-border rounded-md bg-background"
              />
              <Button className="futuristic-button">
                Subscribe
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}