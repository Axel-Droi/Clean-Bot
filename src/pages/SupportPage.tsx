import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const charities = [
  {
    name: "The Ocean Cleanup",
    url: "https://theoceancleanup.com/donate/"
  },
  {
    name: "Keep America Beautiful",
    url: "https://kab.org/donate/"
  },
  {
    name: "World Wildlife Fund",
    url: "https://support.worldwildlife.org/site/Donation2?df_id=14640&14640.donation=form1"
  },
  {
    name: "Earth Day Network",
    url: "https://www.earthday.org/donate/"
  },
  {
    name: "Surfrider Foundation",
    url: "https://www.surfrider.org/donate"
  }
];

const SupportPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-24 bg-background">
        <div className="container mx-auto px-6 max-w-2xl">
          <h1 className="text-5xl font-bold mb-8 text-foreground text-center">Support Environmental Causes</h1>
          <p className="text-lg text-muted-foreground mb-8 text-center">
            Help make a difference by supporting these trusted charities dedicated to environmental protection and cleanup.
          </p>
          <ul className="space-y-6">
            {charities.map((charity) => (
              <li key={charity.name} className="bg-card rounded-xl p-6 shadow-card flex flex-col items-center">
                <span className="text-xl font-semibold mb-2 text-primary">{charity.name}</span>
                <a href={charity.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-base">
                  Donate
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;
