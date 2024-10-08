import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { changePassApi } from '../services';

interface FormData {
    newPassword: string;
    confirmPassword: string;
}

const ChangePass: React.FC = () => {
    const { email } = useParams<{ email: string }>(); 
    const navigate = useNavigate(); 
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log('Submitting data:', data); // Debugging log

        try {
            const response = await axios.put(`${changePassApi}/${email}`, { password: data.newPassword });

            console.log('Response:', response); // Debugging log

            if (response.status === 200) {
                // Store the token in localStorage
                localStorage.setItem('authToken', response.data.token);

                // Show success toast
                toast.success('Password changed successfully!');

                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            console.error('Error changing password:', error); // Detailed error log
            toast.error('Failed to change password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center p-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6"
            >
                <h2 className="text-3xl font-bold text-center mb-8">Change Password</h2>

                <div>
                    <label htmlFor="newPassword" className="block text-gray-700 mb-2">New Password</label>
                    <input
                        id="newPassword"
                        type="password"
                        className="block w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-lg placeholder-gray-400 focus:ring focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Enter your new password"
                        {...register('newPassword', {
                            required: 'New Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long',
                            },
                        })}
                    />
                    {errors.newPassword && <p className="text-red-500 text-sm mt-2">{errors.newPassword.message}</p>}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm New Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        className="block w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-lg placeholder-gray-400 focus:ring focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Confirm your new password"
                        {...register('confirmPassword', {
                            required: 'Please confirm your new password',
                            validate: (value) => value === watch('newPassword') || 'Passwords do not match',
                        })}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">{errors.confirmPassword.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200 ease-in-out"
                >
                    Change Password
                </button>
            </form>

            <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
        </div>
    );
};

export default ChangePass;
