"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ConversationBox } from "@/components/widgets/Conversation_Box";
import { Beaker, Atom, Microscope, Telescope, Dna, Zap } from "lucide-react";

export default function SciencePage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  const scienceTopics = [
    {
      id: "physics",
      name: "Physics",
      description: "Study of matter, energy, and their interactions",
      icon: Atom,
      color: "bg-blue-500",
      concepts: ["Mechanics", "Thermodynamics", "Electromagnetism", "Quantum Physics"]
    },
    {
      id: "chemistry",
      name: "Chemistry",
      description: "Study of substances and their properties",
      icon: Beaker,
      color: "bg-green-500",
      concepts: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Biochemistry"]
    },
    {
      id: "biology",
      name: "Biology",
      description: "Study of living organisms",
      icon: Microscope,
      color: "bg-purple-500",
      concepts: ["Cell Biology", "Genetics", "Ecology", "Evolution"]
    },
    {
      id: "astronomy",
      name: "Astronomy",
      description: "Study of celestial objects and phenomena",
      icon: Telescope,
      color: "bg-indigo-500",
      concepts: ["Solar System", "Stars", "Galaxies", "Cosmology"]
    },
    {
      id: "earth-science",
      name: "Earth Science",
      description: "Study of Earth and its systems",
      icon: Dna,
      color: "bg-cyan-500",
      concepts: ["Geology", "Meteorology", "Oceanography", "Environmental Science"]
    },
    {
      id: "energy",
      name: "Energy Science",
      description: "Study of energy and its applications",
      icon: Zap,
      color: "bg-orange-500",
      concepts: ["Renewable Energy", "Nuclear Energy", "Energy Conservation", "Sustainability"]
    }
  ];

  const scienceExperiments = [
    {
      title: "Pendulum Motion",
      description: "Explore the physics of pendulum motion and periodicity",
      difficulty: "Beginner",
      time: "30 minutes"
    },
    {
      title: "Chemical Reactions",
      description: "Observe and analyze different types of chemical reactions",
      difficulty: "Intermediate",
      time: "45 minutes"
    },
    {
      title: "Cell Observation",
      description: "Microscopic examination of plant and animal cells",
      difficulty: "Beginner",
      time: "60 minutes"
    },
    {
      title: "Solar System Model",
      description: "Create a scale model of our solar system",
      difficulty: "Advanced",
      time: "2 hours"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 futuristic-content">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 futuristic-heading">Science Learning</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto futuristic-text">
          Explore the wonders of science through interactive lessons, experiments, and AI-powered explanations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="futuristic-card p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 futuristic-heading">Science Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scienceTopics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <Card
                    key={topic.id}
                    className={`cursor-pointer futuristic-card ${
                      selectedTopic === topic.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${topic.color}`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        {topic.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{topic.description}</p>
                      {selectedTopic === topic.id && (
                        <div className="mt-3">
                          <h4 className="font-medium mb-2">Key Concepts:</h4>
                          <div className="flex flex-wrap gap-1">
                            {topic.concepts.map((concept, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {concept}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="futuristic-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 futuristic-heading">Quick Experiments</h3>
            <div className="space-y-3">
              {scienceExperiments.map((experiment, index) => (
                <Card key={index} className="futuristic-card p-4">
                  <h4 className="font-medium mb-2">{experiment.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{experiment.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">
                      {experiment.difficulty}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{experiment.time}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3 futuristic-button">
                    Start Experiment
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="futuristic-card p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 futuristic-heading">Science Learning Resources</h2>
        <Tabs defaultValue="interactive" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="interactive">Interactive</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="interactive" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["Virtual Lab", "3D Models", "Simulations", "Quizzes", "Games", "Puzzles"].map((item, index) => (
                <Card key={index} className="futuristic-card p-4 text-center">
                  <h3 className="font-medium mb-2">{item}</h3>
                  <Button variant="outline" size="sm" className="futuristic-button">
                    Explore
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Introduction to Physics", "Chemistry Basics", "Biology Fundamentals", "Astronomy Overview"].map((item, index) => (
                <Card key={index} className="futuristic-card p-4">
                  <h3 className="font-medium mb-2">{item}</h3>
                  <p className="text-sm text-muted-foreground mb-3">Learn the fundamentals of {item.split(' ').pop()}</p>
                  <Button variant="outline" size="sm" className="futuristic-button">
                    Watch Video
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="articles" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Latest Discoveries", "Science News", "Research Papers", "Scientific Method"].map((item, index) => (
                <Card key={index} className="futuristic-card p-4">
                  <h3 className="font-medium mb-2">{item}</h3>
                  <p className="text-sm text-muted-foreground mb-3">Read about the latest in {item.toLowerCase()}</p>
                  <Button variant="outline" size="sm" className="futuristic-button">
                    Read Article
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="futuristic-card p-6 rounded-lg">
        <ConversationBox
          title="Science Assistant"
          placeholder="Ask me about scientific concepts, experiments, or any science-related questions..."
        />
      </div>
    </div>
  );
}