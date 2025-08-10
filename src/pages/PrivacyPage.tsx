import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-24 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-5xl font-bold mb-8 text-foreground text-center">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground mb-8 text-center">
            Your privacy is important to us. This page explains how CleanBot collects, uses, and protects your information.
          </p>
          <div className="space-y-6 text-muted-foreground text-base">
            <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>
            <p>We may collect personal information such as your name, email address, and organization when you contact us or use our services.</p>
            <h2 className="text-2xl font-bold mb-2">How We Use Information</h2>
            <p>We use your information to respond to inquiries, improve our services, and communicate updates. We do not sell or share your data with third parties.</p>
            <h2 className="text-2xl font-bold mb-2">Data Security</h2>
            <p>We implement security measures to protect your information from unauthorized access.</p>
            <h2 className="text-2xl font-bold mb-2">Contact</h2>
            <p>If you have questions about our privacy policy, please contact us at info@cleanbot.ai.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
