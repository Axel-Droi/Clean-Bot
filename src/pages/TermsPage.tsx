import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-24 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-5xl font-bold mb-8 text-foreground text-center">Terms of Service</h1>
          <p className="text-lg text-muted-foreground mb-8 text-center">
            Please read these terms of service carefully before using CleanBot.
          </p>
          <div className="space-y-6 text-muted-foreground text-base">
            <h2 className="text-2xl font-bold mb-2">Acceptance of Terms</h2>
            <p>By accessing or using CleanBot, you agree to these terms and conditions.</p>
            <h2 className="text-2xl font-bold mb-2">Use of Service</h2>
            <p>You agree to use CleanBot for lawful purposes and not to misuse the service.</p>
            <h2 className="text-2xl font-bold mb-2">Limitation of Liability</h2>
            <p>CleanBot is provided as-is. We are not liable for any damages arising from use of the service.</p>
            <h2 className="text-2xl font-bold mb-2">Contact</h2>
            <p>If you have questions about our terms, please contact us at info@cleanbot.ai.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;
