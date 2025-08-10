import { Navigation } from "@/components/Navigation"; // Adjust the path as needed
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">
          © 2023 CleanBot. All rights reserved.{" "}
          <Link
            to="/privacy-policy"
            className="text-accent hover:underline"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export { Footer };
const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="pt-24 pb-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            Privacy Policy
          </h1>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              At CleanBot, we value your privacy and are committed to protecting
              your personal information. This Privacy Policy outlines how we
              collect, use, and safeguard your data.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We may collect personal information such as your name, email
              address, and any other details you provide when contacting us or
              using our services.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              Your information is used to provide and improve our services,
              respond to inquiries, and send updates about CleanBot.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement industry-standard security measures to protect your
              data from unauthorized access, alteration, or disclosure.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4">
              You have the right to access, update, or delete your personal
              information. Contact us at shrivatspandey26@gmail.com for any
              requests.
            </p>
            <p className="text-gray-700">
              For more details, feel free to reach out to us. Thank you for
              trusting CleanBot!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;