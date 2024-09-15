import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AppDispatch, RootState } from '../app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../app/store/features/user/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for the toast notifications

const stripePromise = loadStripe('pk_test_51PxoUl2Katb405IjRgSHqoW7fATTF3ud6jXZ7B2nk1r8lvINvwHjDnKEtHl8ugrSu4G0dOK4dRxg1G2pILdvktPU00RfSlc4sU'); // Replace with your Stripe publishable key

interface Course {
    _id: string;
    title: string;
    description: string;
    thumbnail?: string;
    instructor: {
        _id: string;
        name: string;
    };
    rating: number[];
    price: string;
    category: string;
}

interface PopularCoursesProps {
    courses: Course[];
}

const PopularCourses: React.FC<PopularCoursesProps> = ({ courses }) => {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    // Get user state
    const [user, setUser] = useState<any>(null);
    const dispatch: AppDispatch = useDispatch();
    const userProfile = useSelector((state: RootState) => state.userProfileData);

    useEffect(() => setUser(userProfile), [userProfile]);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    const openPaymentModal = (course: Course) => {
        setSelectedCourse(course);
    };

    const closePaymentModal = () => {
        setSelectedCourse(null);
    };

    const handleDeleteCourse = async (courseId: any) => {
        try {
            const response = await axios.delete(`http://localhost:4000/instructor/api/delete/course/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            })
            toast.success(response.data.msg)
            setTimeout(() => {
                window.location.reload();
            }, 999)
        } catch (error: any) {
            console.log(error);
            toast.error(error)
        }
    }

    return (
        <Elements stripe={stripePromise}>
            <ToastContainer />
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {courses.map((course) => (
                    <div
                        key={course._id}
                        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 overflow-hidden"
                    >
                        <Link to={`/description/course/${course._id}`}>
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-90"
                            />
                        </Link>
                        <div className="p-6 space-y-3">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {course.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Instructor: {course.instructor.name}
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                                    {course.price === '0' ? 'Free' : `₹${course.price}`}
                                </span>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                {course.price === '0' ? (
                                    <Link to={`/course/${course._id}/enroll`} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                                        Enroll Now
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => openPaymentModal(course)}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300"
                                    >
                                        Buy Now
                                    </button>
                                )}
                            </div>

                            {user && user.role === 'instructor' && user._id === course.instructor._id && (
                                <div className="mt-4 flex justify-between space-x-2">
                                    <Link to={`/course/${course._id}/edit`} className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300">
                                        Edit Course
                                    </Link>
                                    <Link to={`/course/${course._id}/add-quiz`} className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-300">
                                        Add Quiz
                                    </Link>
                                    <button onClick={() => handleDeleteCourse(course._id)} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {selectedCourse && (
                <PaymentModal course={selectedCourse} onClose={closePaymentModal} />
            )}
        </Elements>
    );
};

interface PaymentModalProps {
    course: Course;
    onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ course, onClose }) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const { handleSubmit } = useForm();

    const handlePayment = async () => {
        if (!stripe || !elements) return;

        setLoading(true);

        try {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) {
                return navigate("/login");
            }
            const { data } = await axios.post('http://localhost:4000/payment/api/create-payment-intent', {
                amount: Number(course.price) * 100,
                courseId: course._id,
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            const clientSecret = data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                },
            });

            if (result.error) {
                console.error(result.error.message);
                toast.error(result.error.message)
            } else if (result.paymentIntent?.status === 'succeeded') {
                toast.success('Payment succeeded!');
                console.log('Payment succeeded!');
            }
        } catch (error) {
            console.error('Payment error:', error);
        } finally {
            setLoading(false);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">{course.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">Price: ₹{course.price}</p>

                <form onSubmit={handleSubmit(handlePayment)} className="space-y-6">
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                        <CardElement
                            className="p-2"
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </div>

                    <button
                        className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        disabled={!stripe || loading}
                    >
                        {loading ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>

                <button
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-300"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default PopularCourses;
