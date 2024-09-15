import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1487611459768-bd414656ea10?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGl0JTIwdGVjaHxlbnwwfHwwfHx8MA%3D%3D")' }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold">
          Empower Your Learning Journey
        </h1>
        <h2 className="mt-2 text-2xl md:text-4xl font-semibold">
          Learn, Grow, Succeed
        </h2>
        <p className="mt-4 text-lg md:text-2xl max-w-2xl mx-auto">
          Discover top courses and enhance your skills today.
        </p>
        <button className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-lg font-medium shadow-lg transform transition-transform hover:scale-105">
          <Link to={"/courses"}>Get Started</Link>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
