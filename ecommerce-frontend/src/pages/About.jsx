import React from 'react';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import about from '../assets/about.png';

const About = () => {
  return (
    <div className="pt-10 px-4 bg-gradient-to-b from-[#f3f4f6] to-[#d5d5d7] text-gray-800">
      {/* About Title */}
     <div className="text-2xl text-center  pt-8">
       <Title text1="ABOUT" text2="US" />
       <p className="mt-2 text-sm text-gray-600">Learn more about our brand, mission, and values.</p>
       
      </div>
       

      {/* About Content Section */}
      <div className="my-14 flex flex-col md:flex-row gap-12 md:gap-16 items-center justify-center">
        <img
          className="w-full md:w-[460px] rounded-xl shadow-md hover:scale-105 transition duration-300"
          src={about}
          alt="About us"
        />
        <div className="flex flex-col gap-4 text-sm md:w-2/4 text-gray-700">
          <p className="text-lg font-semibold">Forever was born out of a passion for innovation and design.</p>
          <p>
            Since our inception, we've worked tirelessly to curate premium collections — ensuring unmatched quality
            and customer delight with every product.
          </p>
          <div>
            <h3 className="text-base font-bold mt-4 text-gray-900">OUR MISSION</h3>
            <p>
              To deliver timeless fashion and heartfelt service while empowering individuals to express their unique
              style with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center mt-20">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white border-l-4 border-green-500 rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
          <h4 className="font-semibold text-lg mb-2">QUALITY ASSURANCE</h4>
          <p className="text-sm text-gray-600">
            Every item undergoes strict quality checks to guarantee comfort, style, and long-lasting performance.
          </p>
        </div>

        <div className="bg-white border-l-4 border-blue-500 rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
          <h4 className="font-semibold text-lg mb-2">CONVENIENCE</h4>
          <p className="text-sm text-gray-600">
            Seamlessly browse, order, and receive your favorites with ease — from anywhere, anytime.
          </p>
        </div>

        <div className="bg-white border-l-4 border-purple-500 rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
          <h4 className="font-semibold text-lg mb-2">EXCEPTIONAL SERVICE</h4>
          <p className="text-sm text-gray-600">
            From sizing tips to post-purchase support, we’re here to help — with genuine care and quick responses.
          </p>
        </div>
      </div>

      {/* Newsletter Box */}
      <div className="mt-24">
        <NewsletterBox />
      </div>
    </div>
  );
};

export default About;
