import React from 'react';
import shoppinglogo from '../assets/shoppinglogo.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-[#f4f4f4] to-[#eaeaea] py-10 sm:py-16 border border-gray-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 gap-10">
        {/* Text Content */}
        <div className="sm:w-1/2 text-center sm:text-left space-y-6">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <div className="w-10 h-0.5 bg-[#414141]"></div>
            <p className="text-sm md:text-base font-medium text-[#414141]">OUR BESTSELLERS</p>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight tracking-tight prata-regular">
            Welcome to <span className="text-[#EE6C4D]">MyShop</span>
          </h1>

          <p className="text-gray-600 max-w-md text-sm sm:text-base">
            Discover exclusive fashion, electronics, and lifestyle essentials. Curated for modern shopping lovers like you.
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-4">
            <Link to="/collection">
              <button className="px-6 py-3 bg-[#293241] text-white text-sm font-semibold rounded-full shadow hover:bg-[#1e2a35] transition duration-300">
                Shop Now
              </button>
            </Link>

            <Link to="/about" className="text-[#414141] underline text-sm hover:text-[#EE6C4D] transition duration-300">
              Learn more →
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="sm:w-1/2 animate-fade-in-up">
          <img
            src={shoppinglogo}
            alt="Hero Banner"
            className="w-full max-w-md mx-auto drop-shadow-lg rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
