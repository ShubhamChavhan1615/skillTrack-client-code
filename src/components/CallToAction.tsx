import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CallToAction: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const authToken = localStorage.getItem("authToken");

  const handleButtonClick = () => {
    if (authToken) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); 
    }
  };

  return (
    <div className="relative py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold">
          Ready to Start Your Learning Journey?
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Sign up today and gain access to thousands of courses.
        </p>
        <button
          onClick={handleButtonClick}
          className="mt-8 px-8 py-3 bg-white text-blue-600 rounded-lg text-lg font-medium shadow-lg hover:bg-gray-100 transform transition-transform hover:scale-105"
        >
          {authToken ? 'You’re Already Signed Up' : (
            <Link to="/signUp">
              Sign Up Now
            </Link>
          )}
        </button>
        {showToast && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
            You’re already signed up!
          </div>
        )}
      </div>
    </div>
  );
};

export default CallToAction;
