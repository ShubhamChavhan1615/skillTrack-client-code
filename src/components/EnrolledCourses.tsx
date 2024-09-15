// import React, { useEffect, useState } from 'react';
// import { AppDispatch, RootState } from '../app/store/store';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCourses } from '../app/store/features/coursesSlice';
// import { useParams } from 'react-router-dom';

// // Define types for Question, Quiz, and Course
// interface Question {
//   question: string;
//   options: string[];
//   correctAnswer: string;
// }

// interface Quiz {
//   title: string;
//   questions: Question[];
// }

// interface Course {
//   _id: string;
//   title: string;
//   description: string;
//   thumbnail: string;
//   quizzes: Quiz[]; // Update to reflect quizzes structure
//   category: string;
// }

// const EnrolledCourses: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const { courses } = useSelector((state: RootState) => state.coursesData);
//   const { courseId } = useParams<{ courseId: string }>(); // Access the courseId from the URL

//   const [selectedAnswers, setSelectedAnswers] = useState<{ [questionIndex: number]: string }>({});
//   const [showResult, setShowResult] = useState<{ [questionIndex: number]: boolean }>({});

//   useEffect(() => {
//     dispatch(fetchCourses());
//   }, [dispatch]);

//   // Find the course based on the courseId from URL
//   const course: Partial<Course> | undefined = courses.find(course => course._id === courseId);
//   if (!course) {
//     return <div>Course not found</div>;
//   }


//   const handleAnswerSelect = (questionIndex: number, selectedOption: string, correctAnswer: string) => {
//     setSelectedAnswers(prev => ({ ...prev, [questionIndex]: selectedOption }));
//     setShowResult(prev => ({ ...prev, [questionIndex]: selectedOption === correctAnswer }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10">
//       <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
//         {course ? (
//           <div className="space-y-6">
//             {/* Course Title */}
//             <h1 className="text-2xl font-semibold text-gray-800">{course.title}</h1>

//             {/* Course Thumbnail */}
//             <img
//               src={course.thumbnail}
//               alt={`${course.title} Thumbnail`}
//               className="w-full h-64 object-cover rounded-md"
//             />

//             {/* Course Description */}
//             <p className="text-gray-600">{course.description}</p>

//             {/* Category */}
//             <div>
//               <h2 className="text-lg font-medium text-gray-800">Category</h2>
//               <p className="text-gray-600">{course.category}</p>
//             </div>

//             {/* Quizzes Section */}
//             <div>
//               <h2 className="text-lg font-medium text-gray-800">Quizzes</h2>

//               {course.quizzes && course.quizzes.length > 0 ? (
//                 course.quizzes.map((quiz, quizIndex) => (
//                   <div key={quizIndex}>
//                     <h3 className="font-semibold text-gray-700 mt-4">Quiz: {quiz.title}</h3>

//                     {quiz.questions && quiz.questions.length > 0 ? (
//                       quiz.questions.map((question, questionIndex) => (
//                         <div key={questionIndex} className="mt-4">
//                           <p className="text-gray-700">{questionIndex + 1}. {question.question}</p>
//                           <ul className="ml-4 space-y-2">
//                             {question.options.map((option, optionIndex) => (
//                               <li
//                                 key={optionIndex}
//                                 onClick={() => handleAnswerSelect(questionIndex, option, question.correctAnswer)}
//                                 className={`cursor-pointer p-2 rounded-md ${selectedAnswers[questionIndex] === option
//                                   ? showResult[questionIndex]
//                                     ? 'bg-green-200'
//                                     : 'bg-red-200'
//                                   : 'bg-gray-100 hover:bg-gray-200'}`}
//                               >
//                                 {option}
//                               </li>
//                             ))}
//                           </ul>

//                           {/* Display correct or incorrect feedback */}
//                           {selectedAnswers[questionIndex] && (
//                             <p className={`mt-2 text-sm ${showResult[questionIndex] ? 'text-green-600' : 'text-red-600'}`}>
//                               {showResult[questionIndex] ? 'Correct!' : 'Incorrect!'}
//                             </p>
//                           )}
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-gray-500">No questions available for this quiz.</p>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No quizzes available for this course.</p>
//               )}
//             </div>
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">Course not found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EnrolledCourses;
import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../app/store/features/coursesSlice';
import { useParams } from 'react-router-dom';

// Define types for Question, Quiz, and Course
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Quiz {
  title: string;
  questions: Question[];
}

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  quizzes: Quiz[];
  category: string;
}

// Define types for state
type QuizVisibility = { [key: number]: boolean }; // Keys are quiz indices
type SelectedAnswers = { [key: string]: string }; // Keys are "quizIndex-questionIndex"
type ShowResult = { [key: string]: boolean }; // Keys are "quizIndex-questionIndex"

const EnrolledCourses: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state.coursesData);
  const { courseId } = useParams<{ courseId: string }>(); // Access the courseId from the URL

  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
  const [showResult, setShowResult] = useState<ShowResult>({});
  const [quizVisibility, setQuizVisibility] = useState<QuizVisibility>({});

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Find the course based on the courseId from URL
  const course: Partial<Course> | undefined = courses.find(course => course._id === courseId);
  if (!course) {
    return <div>Course not found</div>;
  }

  // Handle when an answer is selected
  const handleAnswerSelect = (quizIndex: number, questionIndex: number, selectedOption: string, correctAnswer: string) => {
    const key = `${quizIndex}-${questionIndex}`;
    setSelectedAnswers(prev => ({ ...prev, [key]: selectedOption }));
    setShowResult(prev => ({ ...prev, [key]: selectedOption === correctAnswer }));
  };

  // Toggle quiz visibility
  const toggleQuizVisibility = (quizIndex: number) => {
    setQuizVisibility(prev => ({ ...prev, [quizIndex]: !prev[quizIndex] }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        {course ? (
          <div className="space-y-6">
            {/* Course Title */}
            <h1 className="text-2xl font-semibold text-gray-800">{course.title}</h1>

            {/* Course Thumbnail */}
            <img
              src={course.thumbnail}
              alt={`${course.title} Thumbnail`}
              className="w-full h-64 object-cover rounded-md"
            />

            {/* Course Description */}
            <p className="text-gray-600">{course.description}</p>

            {/* Category */}
            <div>
              <h2 className="text-lg font-medium text-gray-800">Category</h2>
              <p className="text-gray-600">{course.category}</p>
            </div>

            {/* Quizzes Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-800">Quizzes</h2>

              {course.quizzes && course.quizzes.length > 0 ? (
                course.quizzes.map((quiz, quizIndex) => (
                  <div key={quizIndex}>
                    {/* Quiz Title */}
                    <h3 className="font-semibold text-gray-700 mt-4">Quiz: {quiz.title}</h3>

                    {/* Take Quiz Button */}
                    <button
                      onClick={() => toggleQuizVisibility(quizIndex)}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      {quizVisibility[quizIndex] ? 'Hide Quiz' : 'Take Quiz'}
                    </button>

                    {/* Quiz Questions (only show if quiz is visible) */}
                    {quizVisibility[quizIndex] && (
                      <div>
                        {quiz.questions && quiz.questions.length > 0 ? (
                          quiz.questions.map((question, questionIndex) => (
                            <div key={questionIndex} className="mt-4">
                              {/* Question Text */}
                              <p className="text-gray-700">
                                {questionIndex + 1}. {question.question}
                              </p>

                              {/* Options */}
                              <ul className="ml-4 space-y-2">
                                {question.options.map((option, optionIndex) => (
                                  <li
                                    key={optionIndex}
                                    onClick={() =>
                                      handleAnswerSelect(quizIndex, questionIndex, option, question.correctAnswer)
                                    }
                                    className={`cursor-pointer p-2 rounded-md ${
                                      selectedAnswers[`${quizIndex}-${questionIndex}`] === option
                                        ? showResult[`${quizIndex}-${questionIndex}`]
                                          ? 'bg-green-200'
                                          : 'bg-red-200'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                    } ${
                                      selectedAnswers[`${quizIndex}-${questionIndex}`] ? 'pointer-events-none' : ''
                                    }`}
                                  >
                                    {option}
                                  </li>
                                ))}
                              </ul>

                              {/* Correct or Incorrect Feedback */}
                              {selectedAnswers[`${quizIndex}-${questionIndex}`] && (
                                <p
                                  className={`mt-2 text-sm ${
                                    showResult[`${quizIndex}-${questionIndex}`] ? 'text-green-600' : 'text-red-600'
                                  }`}
                                >
                                  {showResult[`${quizIndex}-${questionIndex}`] ? 'Correct!' : 'Incorrect!'}
                                </p>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">No questions available for this quiz.</p>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No quizzes available for this course.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Course not found</p>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
