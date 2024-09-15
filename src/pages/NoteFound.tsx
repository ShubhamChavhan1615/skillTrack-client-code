import React from 'react';
import { Link } from 'react-router-dom';
import { FaAnglesLeft } from "react-icons/fa6";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          404
        </h1>
        <p className="text-2xl mt-4 text-gray-700">Page Not Found</p>
        <p className="text-lg mt-2 text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link to="/" className="mt-6 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          <FaAnglesLeft className="w-5 h-5 mr-2" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
