import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, Camera, Zap, Navigation as NavigationIcon, Database, Wifi } from "lucide-react";

const technologies = [
  {
    icon: Cpu,
    title: "NVIDIA Jetson Nano",
    description: "Powerful AI computing platform enabling real-time processing and decision making",
    specs: ["4GB LPDDR4 Memory", "128-core Maxwell GPU", "Quad-core ARM A57 CPU", "25.6 GB/s Memory Bandwidth"]
  },
  {
    icon: Camera,
    title: "High-Resolution Vision System",
    description: "Advanced computer vision with machine learning for accurate object detection",
    specs: ["4K Camera Resolution", "60fps Processing", "Multi-spectrum Analysis", "Real-time Object Classification"]
  },
  {
    icon: Zap,
    title: "Solar Energy Management",
    description: "Efficient solar collection and battery management for autonomous operation",
    specs: ["High-efficiency Solar Cells", "Smart Battery Management", "Weather Adaptive Charging", "24/7 Operation Capability"]
  },
  {
    icon: NavigationIcon,
    title: "Autonomous Navigation",
    description: "Advanced path planning and obstacle avoidance using LIDAR and sensors",
    specs: ["360° LIDAR Scanning", "GPS + IMU Navigation", "Dynamic Path Planning", "Terrain Adaptation"]
  },
  {
    icon: Database,
    title: "AI Processing Engine",
    description: "Custom machine learning models for waste identification and collection optimization",
    specs: ["Custom Neural Networks", "Edge AI Processing", "Continuous Learning", "99.2% Accuracy Rate"]
  },
  {
    icon: Wifi,
    title: "Connectivity & Monitoring",
    description: "Real-time monitoring and fleet management capabilities",
    specs: ["5G/WiFi Connectivity", "Cloud Integration", "Remote Monitoring", "Fleet Coordination"]
  }
];

const TechnologyPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Cutting-Edge <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Technology</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            CleanBot leverages the latest advances in AI, robotics, and sustainable energy to deliver unmatched autonomous cleaning performance
          </p>
        </div>
      </section>

      {/* Technology Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {technologies.map((tech, index) => (
              <Card key={index} className="p-8 bg-gradient-card shadow-float hover:shadow-glow transition-all duration-300 border-0">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-tech rounded-2xl flex items-center justify-center shadow-glow flex-shrink-0">
                    <tech.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      {tech.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {tech.description}
                    </p>
                    
                    <div className="space-y-2">
                      {tech.specs.map((spec, specIndex) => (
                        <div key={specIndex} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-muted-foreground">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-hero rounded-3xl p-12 text-white shadow-float">
              <h3 className="text-3xl font-bold mb-4">
                See CleanBot Technology in Action
              </h3>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Experience the power of AI-driven environmental cleanup. Request a live demonstration.
              </p>
              <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
                Schedule Technical Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TechnologyPage;