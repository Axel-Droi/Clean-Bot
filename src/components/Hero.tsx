import { Button } from "@/components/ui/button";
import { Camera, Zap, TreePine, Bot } from "lucide-react";
import heroImage from "@/assets/cleanbot-hero.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="CleanBot in action" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-card animate-slide-up">
            <Bot className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Environmental Solution</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Meet <span className="bg-gradient-tech bg-clip-text text-transparent">CleanBot</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
            The revolutionary AI-powered robot that autonomously detects, collects, and disposes of litter to keep our world clean
          </p>
          
          {/* Feature Icons */}
          <div className="flex justify-center items-center gap-8 mb-10 animate-slide-up">
            <div className="flex items-center gap-2 text-accent">
              <Camera className="w-6 h-6" />
              <span className="hidden sm:inline text-sm font-medium">AI Vision</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <Zap className="w-6 h-6" />
              <span className="hidden sm:inline text-sm font-medium">Solar Powered</span>
            </div>
            <div className="flex items-center gap-2 text-accent">
              <TreePine className="w-6 h-6" />
              <span className="hidden sm:inline text-sm font-medium">Eco-Friendly</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              Discover CleanBot
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating Animation Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-accent/30 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-secondary/40 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-primary/30 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
    </section>
  );
};