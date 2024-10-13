import React from 'react';

const NoCourseFound: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-96">
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">No Courses Found</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Try adjusting your filters to find the courses you're looking for.</p>
            </div>
        </div>
    );
};

export default NoCourseFound;
