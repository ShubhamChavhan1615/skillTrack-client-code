import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import CallToAction from '../components/CallToAction';
import PartnersClients from '../components/PartnersClients';
import Courses from './Courses';
import TestimonialsSection from '../components/TestimonialsSection';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <HeroSection />
      <Courses/>
      <FeaturesSection />
      <CallToAction />
      <PartnersClients />
      <TestimonialsSection/>
    </div>
  );
};

export default Home;
