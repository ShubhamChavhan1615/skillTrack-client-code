import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                </div>
            ))}
        </div>
    );
};

export default Loading;
