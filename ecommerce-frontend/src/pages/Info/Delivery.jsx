import React from 'react';
import Title from '../../components/Title'; // ✅ Ensure Title component exists
import delivery from '../../assets/delivery.png'; // ✅ Ensure this path is correct

const Delivery = () => {
  return (
    <div className="pt-10 px-4 bg-gradient-to-b from-[#f3f4f6] to-[#d5d5d7] text-gray-800">
      {/* Title Section */}
      <div className="text-2xl text-center pt-8">
        <Title text1="DELIVERY" text2="INFO" />
        <p className="mt-2 text-sm text-gray-600">
          Learn about our shipping methods, timelines, and service guarantees.
        </p>
      </div>

      {/* Grid Section */}
      <div className="my-14 flex flex-col md:flex-row gap-12 md:gap-16 items-center justify-center">
        {/* Image */}
        <img
          src={delivery}
          alt="Delivery"
          className="w-full md:w-[460px] rounded-xl shadow-md hover:scale-105 transition duration-300"
        />

        {/* Text Content */}
        <div className="flex flex-col gap-4 text-sm md:w-2/4 text-gray-700">
          <p className="text-lg font-semibold">Fast, secure, and reliable delivery you can trust.</p>
          <p>
            We offer nationwide shipping with trusted logistics partners. Most orders ship out within 24–48 hours.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Standard Delivery:</strong> 3–5 business days (₹50 flat rate)</li>
            <li><strong>Express Delivery:</strong> 1–2 business days (₹100 flat rate)</li>
            <li><strong>Free Shipping:</strong> On orders above ₹999</li>
          </ul>
          <p>
            Once shipped, you’ll receive a tracking link via email to monitor your package. We’re committed to getting your order to you safely and on time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
