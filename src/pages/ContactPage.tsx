import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageSquare, Clock, Users } from "lucide-react";
import { Navigation } from "@/components/Navigation"; // Adjust the path as needed

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    content: "shrivatspandey26@gmail.com",
    subContent: "We'll respond within 24 hours"
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "+1 (401)-359-6209 | +1 (508)-440-6948",
    subContent: "Mon-Fri, 9AM-8PM EST"
  },
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

      {/* Contact Form Section */}
      <section className="py-16">
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
              
              <div className="space-y-8 mt-16">
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
                
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-8 bg-gradient-card shadow-float border-0">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold text-foreground">Send us a Message</h3>
              </div>
              
              <form className="space-y-6" action="https://formspree.io/f/mgvyrnyq" method="POST">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <Input name="firstName" placeholder="John" className="bg-background/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <Input name="lastName" placeholder="Doe" className="bg-background/50" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input name="email" type="email" placeholder="john.doe@example.com" className="bg-background/50" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Organization
                  </label>
                  <Input name="organization" placeholder="CleanBot" className="bg-background/50" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea 
                    name="message"
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
    </div>
  );
};

export default ContactPage;