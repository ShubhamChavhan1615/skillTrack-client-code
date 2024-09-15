// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../app/store/store';
// import { fetchCourses } from '../app/store/features/coursesSlice';

// const DescOfCourse: React.FC = () => {
//     const { id } = useParams<{ id: string }>();
//     const dispatch: AppDispatch = useDispatch();
//     const navigate = useNavigate();
//     const { courses } = useSelector((state: RootState) => state.coursesData);
//     const [selectedCourseId, setSelectedCourseId] = useState(id); // State for selected course ID
//     const [userRating, setUserRating] = useState<number>(0); // User rating

//     useEffect(() => {
//         dispatch(fetchCourses());
//     }, [dispatch]);

//     useEffect(() => {
//         setSelectedCourseId(id);
//     }, [id]);

//     const currentCourse = courses.find(course => course._id === selectedCourseId);

//     // Calculate the average rating of the course
//     const averageRating = currentCourse?.rating 
//         ? currentCourse.rating.reduce((acc, val) => acc + val, 0) / currentCourse.rating.length 
//         : 0;

//     const relatedCourses = courses.filter(course => course.category === currentCourse?.category && course._id !== selectedCourseId);

//     // Handle user star rating click
//     const handleStarClick = (rating: number) => {
//         setUserRating(rating);
//     };

//     const handleCourseClick = (courseId: string) => {
//         setSelectedCourseId(courseId); // Update the selected course ID
//         navigate(`/description/course/${courseId}`); // Navigate to the selected course page
//     };

//     return (
//         <div className="p-6 max-w-4xl mx-auto">
//             {currentCourse ? (
//                 <div className="mb-12 bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-500">
//                     {/* Course Thumbnail */}
//                     {currentCourse.thumbnail && (
//                         <img
//                             src={currentCourse.thumbnail}
//                             alt={currentCourse.title}
//                             className="w-full h-80 object-cover"
//                         />
//                     )}

//                     <div className="p-6">
//                         {/* Course Title */}
//                         <h1 className="text-4xl font-extrabold mb-4 text-gray-800">{currentCourse.title}</h1>

//                         {/* Instructor Name */}
//                         <p className="text-lg text-gray-500 mb-4">by {currentCourse.instructor.name}</p>

//                         {/* Average Rating */}
//                         <div className="flex items-center mb-4">
//                             <span className="text-yellow-500 text-lg mr-2">
//                                 {'★'.repeat(Math.round(averageRating))}
//                                 {'☆'.repeat(5 - Math.round(averageRating))}
//                             </span>
//                             <span className="text-gray-500">
//                                 ({currentCourse.rating?.length || 0} ratings)
//                             </span>
//                         </div>

//                         {/* User Rating */}
//                         <div className="flex items-center mb-6">
//                             <span className="mr-4 text-gray-600">Rate this course:</span>
//                             {[1, 2, 3, 4, 5].map(star => (
//                                 <button
//                                     key={star}
//                                     className={`text-2xl transition-colors duration-300 ${userRating >= star ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
//                                     onClick={() => handleStarClick(star)}
//                                 >
//                                     ★
//                                 </button>
//                             ))}
//                         </div>

//                         {/* Course Price */}
//                         <p className="text-3xl font-semibold text-green-600 mb-4">₹{currentCourse.price}</p>

//                         {/* Course Description */}
//                         <p className="text-lg leading-relaxed text-gray-700 mb-6">
//                             {currentCourse.description}
//                         </p>

//                         {/* Action Buttons */}
//                         <div className="flex space-x-4">
//                             <button 
//                                 className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-500 transform transition duration-300 hover:scale-105"
//                             >
//                                 Buy Now
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <p className="text-center text-gray-500">Loading course details...</p>
//             )}

//             {/* Related Courses Section */}
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">Related Courses</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {relatedCourses.map(course => (
//                     <div 
//                         key={course._id} 
//                         className="p-4 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-2xl transform transition duration-500 hover:scale-105 cursor-pointer"
//                         onClick={() => handleCourseClick(course._id)}
//                     >
//                         {/* Thumbnail */}
//                         {course.thumbnail && (
//                             <img
//                                 src={course.thumbnail}
//                                 alt={course.title}
//                                 className="w-full h-40 object-cover rounded-md mb-4"
//                             />
//                         )}
//                         <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
//                         <p className="text-sm text-gray-500 mb-2">by {course.instructor.name}</p>
//                         <p className="text-sm text-gray-600 mb-4">{course.description}</p>
//                         <p className="text-lg font-bold text-green-600">₹{course.price}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default DescOfCourse;

//testing the code 
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store/store';
import { fetchCourses } from '../app/store/features/coursesSlice';
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';

const stripePromise = loadStripe('pk_test_51PxoUl2Katb405IjRgSHqoW7fATTF3ud6jXZ7B2nk1r8lvINvwHjDnKEtHl8ugrSu4G0dOK4dRxg1G2pILdvktPU00RfSlc4sU'); // Replace with your Stripe publishable key

const DescOfCourse: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { courses } = useSelector((state: RootState) => state.coursesData);
    const [selectedCourseId, setSelectedCourseId] = useState(id); // State for selected course ID
    const [userRating, setUserRating] = useState<number>(0); // User rating
    const [showPaymentModal, setShowPaymentModal] = useState(false); // State to manage PaymentModal visibility

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    useEffect(() => {
        setSelectedCourseId(id);
    }, [id]);

    const currentCourse = courses.find(course => course._id === selectedCourseId);

    // Calculate the average rating of the course
    const averageRating = currentCourse?.rating 
        ? currentCourse.rating.reduce((acc, val) => acc + val, 0) / currentCourse.rating.length 
        : 0;

    const relatedCourses = courses.filter(course => course.category === currentCourse?.category && course._id !== selectedCourseId);

    // Handle user star rating click
    const handleStarClick = (rating: number) => {
        setUserRating(rating);
    };

    const handleCourseClick = (courseId: string) => {
        setSelectedCourseId(courseId); // Update the selected course ID
        navigate(`/description/course/${courseId}`); // Navigate to the selected course page
    };

    const handleBuyNowClick = () => {
        setShowPaymentModal(true); // Show PaymentModal
    };

    const closePaymentModal = () => {
        setShowPaymentModal(false); // Hide PaymentModal
    };

    return (
        <Elements stripe={stripePromise}>
            <div className="p-6 max-w-4xl mx-auto">
                {currentCourse ? (
                    <div className="mb-12 bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-500">
                        {/* Course Thumbnail */}
                        {currentCourse.thumbnail && (
                            <img
                                src={currentCourse.thumbnail}
                                alt={currentCourse.title}
                                className="w-full h-80 object-cover"
                            />
                        )}

                        <div className="p-6">
                            {/* Course Title */}
                            <h1 className="text-4xl font-extrabold mb-4 text-gray-800">{currentCourse.title}</h1>

                            {/* Instructor Name */}
                            <p className="text-lg text-gray-500 mb-4">by {currentCourse.instructor.name}</p>

                            {/* Average Rating */}
                            <div className="flex items-center mb-4">
                                <span className="text-yellow-500 text-lg mr-2">
                                    {'★'.repeat(Math.round(averageRating))}
                                    {'☆'.repeat(5 - Math.round(averageRating))}
                                </span>
                                <span className="text-gray-500">
                                    ({currentCourse.rating?.length || 0} ratings)
                                </span>
                            </div>

                            {/* User Rating */}
                            <div className="flex items-center mb-6">
                                <span className="mr-4 text-gray-600">Rate this course:</span>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        className={`text-2xl transition-colors duration-300 ${userRating >= star ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                                        onClick={() => handleStarClick(star)}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>

                            {/* Course Price */}
                            <p className="text-3xl font-semibold text-green-600 mb-4">₹{currentCourse.price}</p>

                            {/* Course Description */}
                            <p className="text-lg leading-relaxed text-gray-700 mb-6">
                                {currentCourse.description}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex space-x-4">
                                <button 
                                    className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-500 transform transition duration-300 hover:scale-105"
                                    onClick={handleBuyNowClick}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Loading course details...</p>
                )}

                {/* Related Courses Section */}
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Related Courses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedCourses.map(course => (
                        <div 
                            key={course._id} 
                            className="p-4 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-2xl transform transition duration-500 hover:scale-105 cursor-pointer"
                            onClick={() => handleCourseClick(course._id)}
                        >
                            {/* Thumbnail */}
                            {course.thumbnail && (
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                            )}
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">by {course.instructor.name}</p>
                            <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                            <p className="text-lg font-bold text-green-600">₹{course.price}</p>
                        </div>
                    ))}
                </div>

                {/* Payment Modal */}
                {showPaymentModal && currentCourse && (
                    <PaymentModal course={currentCourse} onClose={closePaymentModal} />
                )}
            </div>
        </Elements>
    );
};

// Define the PaymentModal component inside the same file
const PaymentModal: React.FC<{ course: any; onClose: () => void }> = ({ course, onClose }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePayment = async (event: React.FormEvent) => {
        event.preventDefault();
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
                toast.error(result.error.message);
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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white text-center">{course.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">Price: ₹{course.price}</p>

                <form onSubmit={handlePayment} className="space-y-6">
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
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-lg text-white ${loading ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'} transition duration-300`}
                    >
                        {loading ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-300"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default DescOfCourse;
