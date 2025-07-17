import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageSquare, Clock, Users } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    content: "info@cleanbot.ai",
    subContent: "We'll respond within 24 hours"
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "+1 (555) 123-CLEAN",
    subContent: "Mon-Fri, 9AM-6PM EST"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    content: "Innovation District, Tech City",
    subContent: "Schedule an appointment"
  }
];

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Get in <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Ready to revolutionize your community's environmental cleanup? Contact us to learn more about CleanBot solutions.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-foreground">
                Let's Start a Conversation
              </h2>
              
              <p className="text-muted-foreground mb-12 text-lg leading-relaxed">
                Whether you're a city planner, park manager, or environmental advocate, we'd love to discuss how CleanBot can help create cleaner, more sustainable communities.
              </p>
              
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-tech rounded-xl flex items-center justify-center shadow-glow flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        {info.title}
                      </h3>
                      <p className="text-primary font-medium mb-1">
                        {info.content}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {info.subContent}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                <Card className="p-6 bg-gradient-card shadow-card border-0">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-6 h-6 text-primary" />
                    <h4 className="font-semibold text-foreground">Demo Available</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Schedule a live demonstration of CleanBot in action
                  </p>
                </Card>
                
                <Card className="p-6 bg-gradient-card shadow-card border-0">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-6 h-6 text-secondary" />
                    <h4 className="font-semibold text-foreground">Pilot Programs</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Join our pilot program for early access and special pricing
                  </p>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-8 bg-gradient-card shadow-float border-0">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold text-foreground">Send us a Message</h3>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <Input placeholder="John" className="bg-background/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <Input placeholder="Doe" className="bg-background/50" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input type="email" placeholder="john.doe@example.com" className="bg-background/50" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Organization
                  </label>
                  <Input placeholder="City Parks Department" className="bg-background/50" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us about your environmental cleanup needs and how CleanBot can help..."
                    rows={5}
                    className="bg-background/50"
                  />
                </div>
                
                <Button variant="hero" size="lg" className="w-full text-lg py-4">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;