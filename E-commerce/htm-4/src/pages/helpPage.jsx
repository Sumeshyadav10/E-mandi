import React from "react";
import { Link } from "react-router-dom";

const HelpPage = () => {
  const cardStyle = "p-6 rounded-2xl shadow-md bg-white text-gray-800 border border-green-300 hover:shadow-lg transition hover:scale-105";

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-100 text-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-green-600">
          Help & Support
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* General Help */}
          <div className={cardStyle}>
            <h2 className="text-2xl font-bold mb-4">🌾 General Help</h2>
            <p className="text-lg mb-4">
              Questions about using E-Mandi? Write to us:
            </p>
            <a
              href="mailto:support@e-mandi.com"
              className="text-green-600 font-semibold underline"
            >
              support@e-mandi.com
            </a>
          </div>

          {/* Farmer Support */}
          <div className={cardStyle}>
            <h2 className="text-2xl font-bold mb-4">👨‍🌾 Farmer Assistance</h2>
            <p className="text-lg mb-4">
              Need help listing your produce or managing your sales?
            </p>
            <a
              href="mailto:farmersupport@e-mandi.com"
              className="text-green-600 font-semibold underline"
            >
              farmersupport@e-mandi.com
            </a>
          </div>

          {/* Buyer Support */}
          <div className={cardStyle}>
            <h2 className="text-2xl font-bold mb-4">🛒 Buyer Assistance</h2>
            <p className="text-lg mb-4">
              Facing issues with buying or payments? We're here:
            </p>
            <a
              href="mailto:buyersupport@e-mandi.com"
              className="text-green-600 font-semibold underline"
            >
              buyersupport@e-mandi.com
            </a>
          </div>

          {/* FAQs */}
          <div className={cardStyle}>
            <h2 className="text-2xl font-bold mb-4">📚 FAQs</h2>
            <p className="text-lg mb-4">
              Find answers to common questions in our{" "}
              <Link
                to="/faq"
                className="text-green-600 font-semibold underline"
              >
                FAQ section
              </Link>
              .
            </p>
          </div>

          {/* Call Us */}
          <div className={cardStyle}>
            <h2 className="text-2xl font-bold mb-4">📞 Call Support</h2>
            <p className="text-lg mb-4">
              Need urgent help? Call our helpline:
            </p>
            <p className="text-lg font-semibold">+91 98765 43210</p>
          </div>

          {/* Send Us a Message */}
          <div className={cardStyle}>
            <h2 className="text-2xl font-bold mb-4">💬 Send a Message</h2>
            <p className="text-lg mb-4">
              Prefer to become the Seller ? Visit the{" "}
              <Link
                to="/send-message"
                className="text-green-600 font-semibold underline"
              >
                Message Support
              </Link>{" "}
              page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
