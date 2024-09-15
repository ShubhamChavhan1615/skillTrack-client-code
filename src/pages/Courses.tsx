import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store/store';
import { fetchCourses } from '../app/store/features/coursesSlice';
import PopularCourses from '../components/PopularCourses';
import { AppDispatch } from '../app/store/store';

const Courses: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { courses } = useSelector((state: RootState) => state.coursesData);

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);


    return (
        <div className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-screen-xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
                    Explore Our Courses
                </h2>
                    <PopularCourses courses={courses} />
            </div>
        </div>
    );
};

export default Courses;
