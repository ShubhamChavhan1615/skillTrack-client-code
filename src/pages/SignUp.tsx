import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { sendOtpApi, signUpApi } from '../services'; // Define your API endpoints correctly
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FcGoogle } from 'react-icons/fc';

const stripePromise = loadStripe('pk_test_51PxoUl2Katb405IjRgSHqoW7fATTF3ud6jXZ7B2nk1r8lvINvwHjDnKEtHl8ugrSu4G0dOK4dRxg1G2pILdvktPU00RfSlc4sU');

interface FormValues {
  name: string;
  email: string;
  password: string;
  role: string;
  otp: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
  const [otpSent, setOtpSent] = useState(false);
  const [serverOtp, setServerOtp] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<FormValues, 'otp'>>({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [isSendOtpDisabled, setIsSendOtpDisabled] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    if (!otpSent) {
      setIsSendOtpDisabled(true);
      try {
        setFormData({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        });

        const response = await axios.post(sendOtpApi, { email: data.email });
        setOtpSent(true);
        toast.success('OTP sent successfully');
        setServerOtp(response.data.otp);
        reset({ otp: '' });
      } catch (error) {
        console.error('Error sending OTP:', error);
        toast.error('Failed to send OTP');
        setIsSendOtpDisabled(false);
      }
    } else {
      if (data.otp == serverOtp) {
        if (formData.role === 'instructor') {
          // Show payment modal for instructor role
          setShowPaymentModal(true);
        } else {
          await signUpUser();
        }
      } else {
        toast.error('Invalid OTP');
      }
    }
  };

  const signUpUser = async () => {
    try {
      const response = await axios.post(signUpApi, { ...formData });
      localStorage.setItem('authToken', response.data.token);
      toast.success('User signed up successfully');
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 800);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to sign up');
    }
  };

  const handleInstructorPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      toast.error('Stripe is not loaded');
      setLoading(false);
      return;
    }

    try {
      const paymentResponse = await axios.post(`${import.meta.env.VITE_SERVER_API}/payment/api/instructor/create-payment-intent/${formData.email}`, {
        amount: 500 * 100, // amount in paise
        description: 'Instructor Sign Up Fee',
      });
      const clientSecret = paymentResponse.data.clientSecret;

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Stripe Card Element not found');

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.name,
            email: formData.email,
          },
        },
      });

      if (paymentResult.error) {
        toast.error(`Payment failed: ${paymentResult.error.message}`);
      } else if (paymentResult.paymentIntent?.status === 'succeeded') {
        toast.success('Payment successful');
        setShowPaymentModal(false);
        await signUpUser();
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Payment failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-3 items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <ToastContainer />
      <div className="bg-white text-gray-800 p-10 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center mb-6">{otpSent ? 'Enter OTP' : 'Sign Up'}</h2>
        <div className="text-center mb-2 border rounded-lg">
          <span className="text-sm">Continue with google account?</span>
          <Link to="/auth/google/signup" className="text-purple-600 font-medium ml-2 inline-block"><FcGoogle /></Link><br />
          <span className='text-sm'>Available for only student</span>
        </div>
        <hr className='p-2' />
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
                  autoComplete="email"
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
                  autoComplete="current-password"
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
            className={`w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${!otpSent ? '' : 'disabled:bg-purple-600'}`}
            disabled={!otpSent && isSendOtpDisabled}
          >
            {otpSent ? 'Verify OTP' : 'Send OTP'}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-sm">Already have an account?</span>
          <Link to="/login" className="text-purple-600 font-medium ml-2">Login</Link>
        </div> 
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Instructor Payment</h2>
            <form onSubmit={handleInstructorPayment}>
              <CardElement className="p-4 border border-gray-300 rounded-md" />
              <button
                type="submit"
                disabled={!stripe || !elements || loading}
                className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              >
                {loading ? 'Processing...' : 'Pay ₹50000'}
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="mt-2 w-full text-red-600 hover:underline"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default function WrappedSignUp() {
  return (
    <Elements stripe={stripePromise}>
      <SignUp />
    </Elements>
  );
}
