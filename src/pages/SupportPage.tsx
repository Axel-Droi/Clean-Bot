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
            Help make a difference by supporting CleanBot directly, or by donating to trusted environmental charities below.
          </p>

          {/* CleanBot Donation Section */}
          <div className="bg-card rounded-xl shadow-card p-8 mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4 text-center">Donate to CleanBot</h2>
            <p className="text-base text-muted-foreground mb-6 text-center">
              Your support helps us develop and deploy CleanBot technology for cleaner communities.
            </p>
            <form action="https://www.paypal.com/donate" method="get" target="_blank" className="flex flex-col items-center">
              <input type="hidden" name="business" value="your-paypal-email@example.com" />
              <input type="hidden" name="currency_code" value="USD" />
              <div className="flex flex-col gap-2 w-full items-center mb-4">
                <label htmlFor="amount" className="font-semibold text-base text-foreground flex items-center gap-2 mb-2">
                  <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" className="w-6 h-6" />
                  <span>Donate with PayPal</span>
                </label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="1"
                  step="any"
                  required
                  className="border border-border rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#0070ba] w-48"
                  placeholder="Enter amount (USD)"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#0070ba] to-[#003087] hover:from-[#005ea6] hover:to-[#0070ba] text-white font-bold py-2 px-6 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all w-56"
              >
                <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" className="w-5 h-5" />
                <span className="text-base">Donate with PayPal</span>
              </button>
            </form>
          </div>

          {/* Charities Section */}
          <div className="bg-card rounded-xl shadow-card p-8">
            <h2 className="text-2xl font-bold text-primary mb-4 text-center">Support Environmental Charities</h2>
            <p className="text-base text-muted-foreground mb-6 text-center">
              These organizations are making a real impact in environmental protection and cleanup.
            </p>
            <ul className="space-y-6">
              {charities.map((charity) => (
                <li key={charity.name} className="flex flex-col items-center">
                  <span className="text-xl font-semibold mb-2 text-primary">{charity.name}</span>
                  <a href={charity.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-base">
                    Donate
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;
