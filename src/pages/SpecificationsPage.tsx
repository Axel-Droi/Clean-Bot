import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const SpecificationsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-24 bg-background">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-8 text-foreground text-center">CleanBot Specifications</h1>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Explore the technical details and features that make CleanBot a leader in autonomous environmental cleanup.
          </p>
          {/* Add specification details here */}
          {/* No specification details yet. Add your content here. */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SpecificationsPage;
