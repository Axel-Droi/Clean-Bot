import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="bg-gradient-tech bg-clip-text text-transparent">CleanBot</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn about our mission to create a cleaner world through innovative AI-powered robotics
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                CleanBot represents the future of environmental stewardship. Our autonomous AI-powered robot 
                combines cutting-edge computer vision, solar energy, and advanced robotics to tackle the global 
                litter crisis. By deploying CleanBot in parks, streets, and public spaces, we're working towards 
                a cleaner, more sustainable future for everyone.
              </p>
            </div>
          </div>

          {/* Meet the Founders Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet the Founders</h2>
              <p className="text-lg text-muted-foreground">
                The visionaries behind CleanBot's revolutionary technology
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Founder 1 */}
              <Card className="border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-tech rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Shrivats Pandey</CardTitle>
                  <p className="text-muted-foreground">COO</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    
Shrivats Pandey is a high school innovator and the lead engineer behind CleanBot, an AI-powered autonomous robot built to tackle environmental waste through sustainable and intelligent design. Passionate about real-world problem-solving, Shrivats combines robotics, machine learning, and hardware systems to engineer impactful solutions. He is currently interning in AI and ML, applying advanced algorithms to projects like CleanBot to enhance autonomy and performance. 
                  </p>
                  <div className="flex justify-center items-center gap-2 mt-4 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>Cumberland, RI</span>
                  </div>
                </CardContent>
              </Card>

              {/* Founder 2 */}
              <Card className="border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-eco rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Rishabh Mathukia</CardTitle>
                  <p className="text-muted-foreground">CEO</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    Rishabh Mathukiya is a high school innovator and lead engineer at CleanBot, an AI-powered robot designed to combat environmental waste through smart, sustainable technology. With a strong foundation in programming, CAD design, robotics, and environmental engineering, Rishabh brings both technical skill and creative problem-solving to the table. As captain of multiple robotics teams and lead on multiple research projects, he combines hands-on leadership with a passion for building real-world solutions, from autonomous systems to green tech. Beyond engineering, Rishabh is committed to using technology for social good, mentoring younger students and giving back through community outreach. He's driven by a vision of a future where innovation and ethics go hand in hand to make a lasting impact.  
                  </p>
                  <div className="flex justify-center items-center gap-2 mt-4 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>Franklin, MA</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Company Values */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-tech rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🌱</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-muted-foreground">
                  Every decision we make is guided by our commitment to environmental sustainability
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-eco rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We push the boundaries of technology to create solutions that seemed impossible
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-tech rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Impact</h3>
                <p className="text-muted-foreground">
                  Our success is measured by the positive impact we make on our planet
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;