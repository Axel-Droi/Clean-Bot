import { Navigation } from "@/components/Navigation";
import { Impact } from "@/components/Impact";
import { Footer } from "@/components/Footer";

const ImpactPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Impact />
      </div>
      <Footer />
    </div>
  );
};

export default ImpactPage;