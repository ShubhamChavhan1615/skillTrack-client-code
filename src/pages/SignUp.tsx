import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { sendOtpApi, signUpApi } from '../services';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface FormValues {
    name: string;
    email: string;
    password: string;
    role: string;
    otp: string;
}

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const [otpSent, setOtpSent] = useState(false);
    const [serverOtp, setServerOtp] = useState<string | null>(null);
    const [formData, setFormData] = useState<Omit<FormValues, 'otp'>>({
        name: '',
        email: '',
        password: '',
        role: 'student',
    });

    const onSubmit = async (data: FormValues) => {
        if (!otpSent) {
            try {
                setFormData({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    role: data.role,
                });

                const response = await axios.post(sendOtpApi, { email: data.email });
                setOtpSent(true);
                setServerOtp(response.data.otp);
                reset({ otp: '' }); // Reset OTP field
            } catch (error) {
                console.error('Error sending OTP:', error);
                toast.error('Failed to send OTP');
            }
        } else {
            if (data.otp == serverOtp) {
                try {
                    const response = await axios.post(signUpApi, { ...formData });
                    console.log('User registered successfully:', response.data);
                    localStorage.setItem("authToken", response.data.token);
                    toast.success("User signed up successfully");
                    setTimeout(() => {
                        navigate("/")
                        window.location.reload();
                    }, 800);
                } catch (error) {
                    console.error('Error submitting form:', error);
                    toast.error('Failed to sign up');
                }
            } else {
                console.error('Invalid OTP');
                toast.error('Invalid OTP');
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            <ToastContainer />
            <div className="bg-white text-gray-800 p-10 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-semibold text-center mb-6">{otpSent ? 'Enter OTP' : 'Sign Up'}</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {!otpSent && (
                        <>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    type="text"
                                    placeholder="Enter your name"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>

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
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    type="email"
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    {...register('password', { required: 'Password is required' })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    type="password"
                                    placeholder="Enter your password"
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2" htmlFor="role">Role</label>
                                <select
                                    id="role"
                                    {...register('role', { required: 'Role is required' })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="student">Student</option>
                                    <option value="instructor">Instructor</option>
                                </select>
                                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                            </div>
                        </>
                    )}

                    {otpSent && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2" htmlFor="otp">OTP</label>
                            <input
                                id="otp"
                                {...register('otp', { required: 'OTP is required' })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                type="text"
                                placeholder="Enter the OTP sent to your email"
                            />
                            {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                    >
                        {otpSent ? 'Submit OTP' : 'Send OTP'}
                    </button>
                </form>
                <div className='flex mt-3'>
                    <p>Already have an account?</p> <Link to={'/login'} className='ml-2 text-blue-600 underline' >Login</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
