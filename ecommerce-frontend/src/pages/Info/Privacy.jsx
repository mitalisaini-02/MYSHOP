import React from 'react';
import Title from '../../components/Title';
import privacyImg from '../../assets/privacy.png'; // ✅ Ensure this path is correct

const PrivacyPolicy = () => {
  return (
    <div className="pt-10 px-4 bg-gradient-to-b from-[#f3f4f6] to-[#d5d5d7] text-gray-800">
      {/* Page Title */}
      <div className="text-2xl text-center pt-8">
        <Title text1="PRIVACY" text2="POLICY" />
        <p className="mt-2 text-sm text-gray-600">
          Learn how we handle your data and keep your information secure.
        </p>
      </div>

      {/* Main Content */}
      <div className="my-14 flex flex-col md:flex-row gap-12 md:gap-16 items-center justify-center">
        {/* Image */}
        <img
          className="w-full md:w-[460px] rounded-xl shadow-md hover:scale-105 transition duration-300"
          src={privacyImg}
          alt="Privacy policy"
        />

        {/* Text Content */}
        <div className="flex flex-col gap-4 text-sm md:w-2/4 text-gray-700">
          <p className="text-lg font-semibold">Your privacy matters to us.</p>
          <p>
            We are committed to protecting your personal data and ensuring transparency in how we use it.
            Here's what you need to know:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>We collect your name, email, phone, and address solely for order processing and support.</li>
            <li>All personal data is securely stored and never shared without your consent.</li>
            <li>Cookies are used to improve your experience and website functionality.</li>
            <li>
              You may request account deletion or data removal at any time by contacting us at
              <strong> support@yourshop.com</strong>.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
