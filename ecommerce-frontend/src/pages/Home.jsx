
import Hero from '../components/Hero';
import BestSeller from '../components/BestSeller';
import LatestCollection from '../components/LatestCollection';
import React from 'react';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';
const Home = () => {
  return (
    <>
      <Hero />
      
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </>
  );
};

export default Home;
