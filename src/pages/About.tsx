import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-16 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-white mb-8">
          About SkillTrack
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 text-center mb-12">
          SkillTrack is a leading online learning platform dedicated to providing high-quality courses across various domains. Whether you're looking to develop new skills, enhance your career, or pursue a hobby, SkillTrack offers a vast library of courses tailored to your needs.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=600&q=60"
              alt="Our Mission"
              className="rounded-lg shadow-lg w-full h-64 object-cover mb-6 transition-transform transform hover:scale-105"
            />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              Our mission is to democratize education by making learning accessible and affordable for everyone. We strive to create a supportive learning environment that fosters growth, creativity, and innovation.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=600&q=60"
              alt="Our Vision"
              className="rounded-lg shadow-lg w-full h-64 object-cover mb-6 transition-transform transform hover:scale-105"
            />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              We envision a world where knowledge is the key to success and personal fulfillment. SkillTrack aims to be at the forefront of the global education movement, empowering millions to achieve their goals through continuous learning.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white text-center mb-8">
            Why Choose SkillTrack?
          </h2>
          <ul className="space-y-8">
            <li className="flex items-start md:items-center">
              <span className="text-blue-600 dark:text-blue-400 text-4xl mr-6">✔️</span>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <strong>Expert Instructors:</strong> Learn from industry professionals with real-world experience.
              </p>
            </li>
            <li className="flex items-start md:items-center">
              <span className="text-blue-600 dark:text-blue-400 text-4xl mr-6">✔️</span>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <strong>Interactive Learning:</strong> Engage in quizzes, projects, and hands-on exercises to reinforce your knowledge.
              </p>
            </li>
            <li className="flex items-start md:items-center">
              <span className="text-blue-600 dark:text-blue-400 text-4xl mr-6">✔️</span>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <strong>Flexible Schedule:</strong> Learn at your own pace, anytime, anywhere.
              </p>
            </li>
            <li className="flex items-start md:items-center">
              <span className="text-blue-600 dark:text-blue-400 text-4xl mr-6">✔️</span>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <strong>Comprehensive Progress Tracking:</strong> Monitor your progress and stay motivated with personalized learning paths.
              </p>
            </li>
            <li className="flex items-start md:items-center">
              <span className="text-blue-600 dark:text-blue-400 text-4xl mr-6">✔️</span>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <strong>Certifications:</strong> Earn recognized certificates to boost your resume and showcase your skills.
              </p>
            </li>
          </ul>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-8">
            Join the SkillTrack Community
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Become part of a global network of learners, share your journey, and inspire others to achieve their dreams.
          </p>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
            <Link to={"/courses"}>Start Learning Today</Link>
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
