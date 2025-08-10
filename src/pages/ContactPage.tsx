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
          <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
          <form
            action="https://formspree.io/f/mgvyrnyq"
            method="POST"
            className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
          >
            <label className="block mb-4">
              <span className="text-gray-700">Your email:</span>
              <Input
                type="email"
                name="email"
                className="mt-1 block w-full"
                required
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Your message:</span>
              <Textarea
                name="message"
                className="mt-1 block w-full"
                rows={4}
                required
              ></Textarea>
            </label>
            <Button
              type="submit"
              className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-accent-dark"
            >
              Send
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;