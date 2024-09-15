import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store/store';
import { fetchUserProfile } from '../app/store/features/user/userSlice';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const dispatch: AppDispatch = useDispatch();
  const getedUser = useSelector((state: RootState) => state.userProfileData);

  useEffect(() => setUser(getedUser), [getedUser]);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);


  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-32 w-full"></div>
        <div className="p-6 space-y-6">
          {/* User Info */}
          {user ? (
            <div className="flex flex-col items-center space-y-4">
              <FaUserCircle className="w-24 h-24 text-gray-400 -mt-12" />
              <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-indigo-500 font-medium">Role: {user.role}</p>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading...</p>
          )}

          {/* Courses Section */}
          {user && user.courses.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Enrolled Courses</h2>
              <ul className="space-y-2">
                {user.courses.map((course: { _id: React.Key; title: string }, index: number) => (
                  <li
                    key={course._id ? course._id : index} // Use course._id if available, otherwise fallback to index
                    className="p-3 bg-gray-100 border rounded-lg shadow-sm text-gray-600"
                  >
                    <Link to={`/enrolledCourse/${course._id}`}>{course.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* No Courses */}
          {user && user.courses.length === 0 && (
            <p className="text-center text-gray-600">You are not enrolled in any courses.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
