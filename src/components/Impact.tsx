import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recycle, Users, MapPin, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Recycle,
    number: "10,000+",
    label: "Pieces of Litter Collected Daily",
    description: "Advanced AI enables efficient identification and collection"
  },
  {
    icon: MapPin,
    number: "24/7",
    label: "Autonomous Operation",
    description: "Solar-powered continuous cleaning with smart recharging"
  },
  {
    icon: Users,
    number: "100%",
    label: "Community Safe",
    description: "Intelligent obstacle avoidance protects people and pets"
  },
  {
    icon: TrendingUp,
    number: "Zero",
    label: "Carbon Emissions",
    description: "Completely sustainable operation with renewable energy"
  }
];

export const Impact = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transforming <span className="bg-gradient-eco bg-clip-text text-transparent">Communities</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            CleanBot is revolutionizing environmental cleanup efforts, creating cleaner, safer, and more beautiful public spaces worldwide
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="p-8 text-center bg-card shadow-card hover:shadow-float transition-all duration-300 border-0"
            >
              <div className="w-16 h-16 mx-auto bg-gradient-eco rounded-2xl flex items-center justify-center mb-6 shadow-glow">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                {stat.label}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-hero rounded-3xl p-12 text-center text-white shadow-float">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Community?
          </h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join the environmental revolution with CleanBot. Contact us to learn how AI-powered cleanup can benefit your parks, beaches, and public spaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
              Get Started Today
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white hover:text-primary">
              <a href="/about">About Us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};