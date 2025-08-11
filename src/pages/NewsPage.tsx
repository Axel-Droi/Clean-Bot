import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const NewsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-24 bg-background">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-8 text-foreground text-center">CleanBot News</h1>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Stay up to date with the latest updates, announcements, and media coverage about CleanBot.
          </p>
          {/* Add news articles, press releases, or blog posts here */}
          {/* No news articles yet. Add your updates here. */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;
