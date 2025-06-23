import React from 'react';
import Title from '../components/Title';
import contact from '../assets/contact.png'; // ✅ Ensure this path is correct

const Contact = () => {
  return (
    <div className="px-4 pt-10 pb-20 bg-[#d5d5d7] text-gray-800">
      {/* Page Title */}
      <div className="text-2xl text-center border-t border-gray-300 pt-8">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Contact Info & Image */}
      <div className="mt-12 grid md:grid-cols-2 gap-14 items-center">
        {/* Image Section */}
        <div>
          <img
            src={contact}
            alt="Contact Us"
            className="w-full h-auto rounded-xl shadow-xl hover:scale-105 transition duration-300 object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="space-y-6 px-6 py-8 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-green-700">Get in Touch</h2>
          <p className="text-sm leading-relaxed">
            Have any questions, feedback, or concerns? Reach out to us using the details below. We're here to help!
          </p>

          <div className="text-sm space-y-2">
            <p><span className="font-semibold">📧 Email:</span> support@yourecommerce.com</p>
            <p><span className="font-semibold">📞 Phone:</span> +91 9876543210</p>
            <p><span className="font-semibold">📍 Address:</span> 123 Fashion Street, New Delhi, India</p>
          </div>

          <div className="text-sm space-y-1">
            <p className="font-semibold">🕒 Business Hours:</p>
            <p>Mon - Fri: 9:00 AM – 6:00 PM</p>
            <p>Sat - Sun: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
