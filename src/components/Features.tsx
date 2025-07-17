import { Card } from "@/components/ui/card";
import { Camera, Cpu, Zap, Navigation, TreePine, Shield } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "AI-Powered Vision",
    description: "High-resolution camera with advanced machine learning algorithms to accurately identify and classify different types of litter",
    gradient: "bg-gradient-tech"
  },
  {
    icon: Cpu,
    title: "NVIDIA Jetson Nano",
    description: "Powered by cutting-edge AI processing capabilities for real-time decision making and efficient obstacle avoidance",
    gradient: "bg-gradient-tech"
  },
  {
    icon: Zap,
    title: "Solar Energy",
    description: "Eco-friendly solar cells enable autonomous recharging for sustainable, continuous operation with minimal environmental impact",
    gradient: "bg-gradient-eco"
  },
  {
    icon: Navigation,
    title: "Smart Navigation",
    description: "Dynamic navigation system adapts to diverse terrains and weather conditions while avoiding people, pets, and obstacles",
    gradient: "bg-gradient-tech"
  },
  {
    icon: TreePine,
    title: "Environmental Priority",
    description: "Intelligent waste classification system prioritizes collection strategies for maximum environmental benefit",
    gradient: "bg-gradient-eco"
  },
  {
    icon: Shield,
    title: "Reliable Performance",
    description: "Robust design ensures consistent operation across parks, beaches, sidewalks, and various outdoor environments",
    gradient: "bg-gradient-tech"
  }
];

export const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Revolutionary <span className="bg-gradient-tech bg-clip-text text-transparent">Technology</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            CleanBot combines state-of-the-art AI technology with sustainable energy solutions to create the future of autonomous environmental cleanup
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-8 bg-gradient-card shadow-card hover:shadow-float transition-all duration-300 transform hover:-translate-y-2 border-0"
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.gradient} flex items-center justify-center mb-6 shadow-glow`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};