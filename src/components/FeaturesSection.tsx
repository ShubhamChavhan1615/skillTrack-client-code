import React from 'react';

const features = [
  { title: 'Easy Course Management', icon: '🎓' },
  { title: 'Interactive Quizzes', icon: '📝' },
  { title: 'Track Progress', icon: '📊' },
];

const FeaturesSection: React.FC = () => {
  return (
    <div className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Key Features
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md transform transition-transform hover:scale-105"
            >
              <div className="text-5xl">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
