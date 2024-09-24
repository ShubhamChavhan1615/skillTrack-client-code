import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../../app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../app/store/features/coursesSlice'; // Ensure this action is correctly defined
import { deleteCourseApi } from '../../services';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
// Import your delete action if available, e.g., `deleteCourse`

const ShowAllCourses: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { courses } = useSelector((state: RootState) => state.coursesData);

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    const handleDelete = async (courseId: string) => {
        try {
            const response = await axios.delete(deleteCourseApi + `/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            });
            toast.success(response.data.msg);
            setTimeout(() => {
                window.location.reload();
            }, 999);
        } catch (error: any) {
            console.log(error);
            toast.error(error);
        }
    };

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 min-h-screen">
            <ToastContainer />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">All Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div
                        key={course._id}
                        className="p-4 bg-white dark:bg-gray-700 rounded shadow-md flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {course.title}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mt-2">
                                {course.description}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Instructor: <span className="font-medium">{course.instructor.name}</span>
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Category: {course.category}
                            </p>
                        </div>
                        <button
                            onClick={() => handleDelete(course._id)}
                            className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowAllCourses;
