import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../app/store/features/instructorCourses/instructorCoursesSlice'; 

const EnrolledStudents: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { instructorCourses } = useSelector((state: RootState) => state.instructorCoursesData);

  useEffect(() => {
    dispatch(fetchInstructorCourses());
  }, [dispatch]);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200 mb-6 text-center">
        Enrolled Students
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {instructorCourses.map((course) => (
          <div
            key={course._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl p-6 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              {course.title}
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-5 line-clamp-3">
              {course.description}
            </p>

            {course.enrollments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No students enrolled.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-200 dark:bg-gray-700">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Name
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {course.enrollments.map((student: any) => (
                      <tr key={student._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">
                          {student.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">
                          {student.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledStudents;
