import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../app/store/features/admin/usersSlice';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa'; // Icons for roles
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { deleteUserApi } from '../../services';

const ShowAllUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const fetchedUsers = useSelector((state: RootState) => state.usersData); // Assuming usersData is the slice name

  useEffect(() => {
    setUsers(fetchedUsers);
  }, [fetchedUsers]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  //handle delete user or instructor 
  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await axios.delete(deleteUserApi + `${userId}`);
      toast.success(response.data.msg);
      setTimeout(() => window.location.reload(), 999)
    } catch (error: any) {
      console.log(error);
      toast.error(error)
    }
  }

  return (
    <div className="p-4 md:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-8">
        User Management
      </h1>
      {users.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No users found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="py-3 px-6 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                >
                  <td className="py-4 px-6 text-gray-900 dark:text-white">{user.name}</td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-300">{user.email}</td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-300 flex items-center space-x-2">
                    {user.role === 'instructor' ? (
                      <>
                        <FaChalkboardTeacher className="text-blue-500" />
                        <span>Instructor</span>
                      </>
                    ) : (
                      <>
                        <FaUserGraduate className="text-green-500" />
                        <span>Student</span>
                      </>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition duration-200 shadow-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowAllUsers;
