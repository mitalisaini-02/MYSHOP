import React from 'react';
import Title from '../../components/Title'; // ✅ Make sure Title component exists
import termsImg from '../../assets/term.png'; // ✅ Ensure image path is valid

const TermsConditions = () => {
  return (
    <div className="pt-10 px-4 bg-gradient-to-b from-[#f3f4f6] to-[#d5d5d7] text-gray-800">
      {/* Title Section */}
      <div className="text-2xl text-center pt-8">
        <Title text1="TERMS" text2="& CONDITIONS" />
        <p className="mt-2 text-sm text-gray-600">Please read our terms before using our services.</p>
      </div>

      {/* Content Section */}
      <div className="my-14 flex flex-col md:flex-row gap-12 md:gap-16  items-center md:items-start justify-center">
        {/* Left: Image */}
        <img
          className="w-full sm:w-[440px] md:w-[460px] rounded-xl shadow-md hover:scale-105 transition duration-300"
          src={termsImg}
          alt="Terms and Conditions"
        />

        {/* Right: Text Info */}
        <div className="flex flex-col my-10 gap-4 text-sm md:w-2/4 text-gray-700">
          <p className="text-base">
            By using our website, you agree to the following terms:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>Products sold are subject to availability and listed prices.</li>
            <li>Payments must be made securely through our payment gateways.</li>
            <li>We reserve the right to cancel orders in case of pricing errors or suspicion of fraud.</li>
            <li>Returns must be initiated within 7 days of delivery in original condition.</li>
          </ul>

          <p className="text-sm">
            If you do not agree to any part of these terms, please refrain from using our services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
