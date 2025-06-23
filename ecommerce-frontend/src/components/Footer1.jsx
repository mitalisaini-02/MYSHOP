import React from 'react';
import { Link } from 'react-router-dom';

const Footer1 = () => {
  return (
    <footer className=" bg-transparent text-black">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] py-6 px-4 sm:px-12 gap-6">
        {/* Logo + Description */}
        <div>
          <img src="/logo.png" alt="Logo" className="mb-4 w-32" />
          <p className="text-gray-600 md:w-2/3 text-sm">
            Discover the best products at unbeatable prices. Fast delivery, easy returns, and secure checkout guaranteed.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">COMPANY</h3>
          <ul className="flex flex-col gap-2 text-sm text-gray-700">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/delivery">Delivery</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">GET IN TOUCH</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>📞 +91 1234567890</li>
            <li>✉️ info@example.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} E-commerce. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer1;
