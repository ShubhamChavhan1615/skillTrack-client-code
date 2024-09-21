import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { loginApi } from '../services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface LoginValues {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>();

    const onSubmit = async (data: LoginValues) => {
        try {
            const response = await axios.post(loginApi, data);
            console.log('Login successful:', response.data);

            // Store auth token in local storage (or other storage)
            localStorage.setItem('authToken', response.data.token);

            toast.success('Login successful');
            setTimeout(() => {
                navigate("/")
                window.location.reload();
            }, 800);
        } catch (error: any) {
            console.error('Error logging in:', error);
            // Check if error response is available
            if (error.response && error.response.data) {
                toast.error(error.response.data.msg);
            } else {
                toast.error('Error logging in: Something went wrong');
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-teal-500 to-green-500">
            <ToastContainer />
            <div className="bg-white text-gray-800 p-10 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <input
                            id="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                                    message: 'Enter a valid email address',
                                },
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                        <input
                            id="password"
                            {...register('password', { required: 'Password is required' })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    >
                        Login
                    </button>
                    <div className="mt-4 text-center text-gray-500">
                        <p className="text-xs mt-2">
                            Forgot your password? <Link to="/ResetPassword" className="text-blue-400 hover:underline">Reset password</Link>
                        </p>
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
