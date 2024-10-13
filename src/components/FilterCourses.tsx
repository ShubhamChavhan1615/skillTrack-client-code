import React, { useState, useEffect } from 'react';

interface FilterCoursesProps {
  onFilter: (category: string) => void;
}

const FilterCourses: React.FC<FilterCoursesProps> = ({ onFilter }) => {
  const [category, setCategory] = useState('');

  // Automatically apply filters when category or instructor changes
  useEffect(() => {
    onFilter(category);
  }, [category, onFilter]);

  return (
    <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Filter Courses</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Category Filter */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="web development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterCourses;
