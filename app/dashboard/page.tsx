import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ConvoTimeline from "@/components/widgets/Convo_Timeline";
import { TimelineItem } from "@/types";
import SignOutButton from "@/components/auth/sign-out-button";
import LineChartWidget from "@/components/widgets/LineChartWidget";
import BarChartWidget from "@/components/widgets/BarChartWidget";
import PieChartWidget from "@/components/widgets/PieChartWidget";
import StatsWidget from "@/components/widgets/StatsWidget";

// Sample timeline data for demonstration
const sampleTimelineItems: TimelineItem[] = [
  {
    id: "1",
    title: "Introduction to React Hooks",
    description: "Learned about useState and useEffect hooks in React",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    type: "knowledge",
    importance: "high",
  },
  {
    id: "2",
    title: "Custom Hook Pattern",
    description: "Created a custom hook for API data fetching",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    type: "code",
    importance: "medium",
  },
  {
    id: "3",
    title: "Component Composition",
    description: "Explored different patterns for component composition in React",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    type: "concept",
    importance: "low",
  },
];

// Sample data for charts
const learningProgressData = [
  { month: "Jan", progress: 20 },
  { month: "Feb", progress: 35 },
  { month: "Mar", progress: 42 },
  { month: "Apr", progress: 58 },
  { month: "May", progress: 75 },
  { month: "Jun", progress: 89 },
];

const subjectPerformanceData = [
  { subject: "Math", score: 85 },
  { subject: "Science", score: 78 },
  { subject: "Code", score: 92 },
  { subject: "Essay", score: 88 },
  { subject: "History", score: 76 },
];

const learningTimeDistribution = [
  { name: "Math", value: 35, color: "#3b82f6" },
  { name: "Science", value: 25, color: "#10b981" },
  { name: "Code", value: 30, color: "#f59e0b" },
  { name: "Essay", value: 10, color: "#ef4444" },
];

const statsData = [
  {
    title: "Total Learning Hours",
    value: "156",
    description: "This month",
    trend: "up" as const,
    trendValue: "+12%",
    color: "#3b82f6",
  },
  {
    title: "Completed Lessons",
    value: "42",
    description: "This month",
    trend: "up" as const,
    trendValue: "+8%",
    color: "#10b981",
  },
  {
    title: "Average Score",
    value: "87%",
    description: "Across all subjects",
    trend: "up" as const,
    trendValue: "+5%",
    color: "#f59e0b",
  },
  {
    title: "Study Streak",
    value: "15",
    description: "Days in a row",
    trend: "neutral" as const,
    trendValue: "0%",
    color: "#8b5cf6",
  },
];

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back, {session.user.name}!
            </p>
          </div>
          <SignOutButton />
        </div>

        {/* Statistics Overview */}
        <div className="mb-8">
          <StatsWidget
            title="Learning Overview"
            description="Your learning statistics at a glance"
            stats={statsData}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 xl:col-span-1">
            <LineChartWidget
              title="Learning Progress"
              description="Your progress over the last 6 months"
              data={learningProgressData}
              dataKey="progress"
              xAxisKey="month"
              color="#3b82f6"
              height={250}
            />
          </div>
          
          <div className="lg:col-span-2 xl:col-span-1">
            <BarChartWidget
              title="Subject Performance"
              description="Your scores by subject"
              data={subjectPerformanceData}
              dataKey="score"
              xAxisKey="subject"
              color="#10b981"
              height={250}
            />
          </div>
          
          <div className="lg:col-span-2 xl:col-span-1">
            <PieChartWidget
              title="Time Distribution"
              description="How you spend your learning time"
              data={learningTimeDistribution}
              dataKey="value"
              nameKey="name"
              height={250}
            />
          </div>
        </div>

        {/* Profile and Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-base">{session.user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-base">{session.user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Account Status</p>
                    <p className="text-base">
                      {session.user.emailVerified ? "Verified" : "Not Verified"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Learning Timeline</CardTitle>
                <CardDescription>Track your learning progress and important notes</CardDescription>
              </CardHeader>
              <CardContent>
                <ConvoTimeline items={sampleTimelineItems} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}