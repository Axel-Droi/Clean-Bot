import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Impact } from "@/components/Impact";
import { Footer } from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="min-h-screen space-y-32">
      <Navigation />
      <ScrollReveal yOffset={24}>
        <Hero />
      </ScrollReveal>
      <ScrollReveal yOffset={40} delay={0.1}>
        <Features />
      </ScrollReveal>
      <ScrollReveal yOffset={40} delay={0.2}>
        <Impact />
      </ScrollReveal>
      <Footer />
    </div>
  );
};

export default Index;
