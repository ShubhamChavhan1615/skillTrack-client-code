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
  explanation: string; // New field for detailed feedback
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
type QuizTimer = { [key: number]: number }; // Timer for each quiz

const EnrolledCourses: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state.coursesData);
  const { courseId } = useParams<{ courseId: string }>();

  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
  const [showResult, setShowResult] = useState<ShowResult>({});
  const [quizVisibility, setQuizVisibility] = useState<QuizVisibility>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<{ [key: number]: number }>({});
  const [quizTimer, setQuizTimer] = useState<QuizTimer>({});
  const [score, setScore] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Find the course based on the courseId from URL
  const course: Partial<Course> | undefined = courses.find((course) => course._id === courseId);
  if (!course) {
    return <div>Course not found</div>;
  }

  // Handle when an answer is selected
  const handleAnswerSelect = (
    quizIndex: number,
    questionIndex: number,
    selectedOption: string,
    correctAnswer: string
  ) => {
    const key = `${quizIndex}-${questionIndex}`;
    setSelectedAnswers((prev) => ({ ...prev, [key]: selectedOption }));
    const isCorrect = selectedOption === correctAnswer;
    setShowResult((prev) => ({ ...prev, [key]: isCorrect }));

    // Update score
    setScore((prev) => ({
      ...prev,
      [quizIndex]: isCorrect ? (prev[quizIndex] || 0) + 1 : prev[quizIndex] || 0,
    }));
  };

  // Toggle quiz visibility
  const toggleQuizVisibility = (quizIndex: number) => {
    setQuizVisibility((prev) => ({ ...prev, [quizIndex]: !prev[quizIndex] }));
    setCurrentQuestionIndex((prev) => ({ ...prev, [quizIndex]: 0 })); // Reset to first question
    setQuizTimer((prev) => ({ ...prev, [quizIndex]: 60 })); // Start with 60 seconds for each quiz
  };

  // Handle navigation to next question
  const handleNextQuestion = (quizIndex: number) => {
    setCurrentQuestionIndex((prev) => ({
      ...prev,
      [quizIndex]: (prev[quizIndex] || 0) + 1,
    }));
  };

  // Handle navigation to previous question
  const handlePrevQuestion = (quizIndex: number) => {
    setCurrentQuestionIndex((prev) => ({
      ...prev,
      [quizIndex]: (prev[quizIndex] || 0) - 1,
    }));
  };

  // Timer management
  useEffect(() => {
    const interval = setInterval(() => {
      setQuizTimer((prev) => {
        const newTimers = { ...prev };
        Object.keys(newTimers).forEach((quizIndex) => {
          if (newTimers[parseInt(quizIndex, 10)] > 0) {
            newTimers[parseInt(quizIndex, 10)] -= 1;
          }
        });
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        {course ? (
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-800">{course.title}</h1>
            <img src={course.thumbnail} alt={`${course.title} Thumbnail`} className="w-full h-64 object-cover rounded-md" />
            <p className="text-gray-600">{course.description}</p>
            <div>
              <h2 className="text-lg font-medium text-gray-800">Category</h2>
              <p className="text-gray-600">{course.category}</p>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-800">Quizzes</h2>
              {course.quizzes && course.quizzes.length > 0 ? (
                course.quizzes.map((quiz, quizIndex) => (
                  <div key={quizIndex}>
                    <h3 className="font-semibold text-gray-700 mt-4">Quiz: {quiz.title}</h3>
                    <button
                      onClick={() => toggleQuizVisibility(quizIndex)}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      {quizVisibility[quizIndex] ? 'End Quiz' : 'Start Quiz'}
                    </button>

                    {quizVisibility[quizIndex] && (
                      <div>
                        <p className="text-gray-600">Time left: {quizTimer[quizIndex]} seconds</p>

                        {quiz.questions && quiz.questions.length > 0 ? (
                          <>
                            {quiz.questions
                              .filter((_, questionIndex) => questionIndex === currentQuestionIndex[quizIndex])
                              .map((question, questionIndex) => (
                                <div key={questionIndex} className="mt-4">
                                  <p className="text-gray-700">
                                    {currentQuestionIndex[quizIndex] + 1}. {question.question}
                                  </p>
                                  <ul className="ml-4 space-y-2">
                                    {question.options.map((option, optionIndex) => (
                                      <li
                                        key={optionIndex}
                                        onClick={() =>
                                          handleAnswerSelect(
                                            quizIndex,
                                            currentQuestionIndex[quizIndex],
                                            option,
                                            question.correctAnswer
                                          )
                                        }
                                        className={`cursor-pointer p-2 rounded-md ${
                                          selectedAnswers[`${quizIndex}-${currentQuestionIndex[quizIndex]}`] === option
                                            ? showResult[`${quizIndex}-${currentQuestionIndex[quizIndex]}`]
                                              ? 'bg-green-200'
                                              : 'bg-red-200'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                        } ${
                                          selectedAnswers[`${quizIndex}-${currentQuestionIndex[quizIndex]}`]
                                            ? 'pointer-events-none'
                                            : ''
                                        }`}
                                      >
                                        {option}
                                      </li>
                                    ))}
                                  </ul>

                                  {selectedAnswers[`${quizIndex}-${currentQuestionIndex[quizIndex]}`] && (
                                    <p
                                      className={`mt-2 text-sm ${
                                        showResult[`${quizIndex}-${currentQuestionIndex[quizIndex]}`]
                                          ? 'text-green-600'
                                          : 'text-red-600'
                                      }`}
                                    >
                                      {showResult[`${quizIndex}-${currentQuestionIndex[quizIndex]}`]
                                        ? 'Correct!'
                                        : `Incorrect! Explanation: ${question.explanation}`}
                                    </p>
                                  )}

                                  <div className="flex justify-between mt-4">
                                    <button
                                      onClick={() => handlePrevQuestion(quizIndex)}
                                      className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
                                      disabled={currentQuestionIndex[quizIndex] === 0}
                                    >
                                      Previous
                                    </button>
                                    <button
                                      onClick={() => handleNextQuestion(quizIndex)}
                                      className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
                                      disabled={
                                        currentQuestionIndex[quizIndex] === quiz.questions.length - 1
                                      }
                                    >
                                      Next
                                    </button>
                                  </div>
                                </div>
                              ))}
                          </>
                        ) : (
                          <p>No questions available.</p>
                        )}
                      </div>
                    )}
                    {quizVisibility[quizIndex] && (
                      <p className="mt-2 text-gray-800">
                        Score: {score[quizIndex]}/{quiz.questions.length}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p>No quizzes available for this course.</p>
              )}
            </div>
          </div>
        ) : (
          <p>Loading course data...</p>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
