import React from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { addQuizeApi } from '../services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface QuizFormInputs {
  title: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

const AddQuizToCourse: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm<QuizFormInputs>({
    defaultValues: {
      title: '',
      questions: [{ question: '', options: ['', '', ''], correctAnswer: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  });

  const onSubmit: SubmitHandler<QuizFormInputs> = async (data) => {
    try {
      const response = await axios.post(addQuizeApi + `/${courseId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      toast.success('Quiz created successfully!');
      reset();
    } catch (error) {
      console.error(error);
      toast.error('Failed to create quiz.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white text-gray-900 rounded-lg shadow-lg">
      <ToastContainer />
      <h2 className="text-3xl font-semibold mb-6 text-center text-green-700">Add Quiz to Course</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Quiz Title */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="title" className="text-lg font-medium">Quiz Title</label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Quiz title is required' })}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.title && <span className="text-red-500">{errors.title.message}</span>}
        </div>

        {/* Questions */}
        {fields.map((field, index) => (
          <div key={field.id} className="border p-6 bg-gray-50 rounded-md space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Question {index + 1}</h3>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>

            {/* Question Text */}
            <div className="flex flex-col space-y-2">
              <label htmlFor={`questions.${index}.question`} className="font-medium">Question</label>
              <input
                id={`questions.${index}.question`}
                type="text"
                {...register(`questions.${index}.question`, { required: 'Question is required' })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.questions?.[index]?.question && (
                <span className="text-red-500">{errors.questions[index]?.question?.message}</span>
              )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field.options.slice(0, 3).map((_option, optIndex) => (
                <div key={optIndex} className="flex flex-col">
                  <label htmlFor={`questions.${index}.options.${optIndex}`} className="font-medium">
                    Option {optIndex + 1}
                  </label>
                  <input
                    id={`questions.${index}.options.${optIndex}`}
                    type="text"
                    {...register(`questions.${index}.options.${optIndex}`, { required: 'Option is required' })}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.questions?.[index]?.options?.[optIndex] && (
                    <span className="text-red-500">
                      {errors.questions[index]?.options[optIndex]?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Correct Answer */}
            <div className="flex flex-col space-y-2">
              <label htmlFor={`questions.${index}.correctAnswer`} className="font-medium">Correct Answer</label>
              <input
                id={`questions.${index}.correctAnswer`}
                type="text"
                {...register(`questions.${index}.correctAnswer`, { required: 'Correct answer is required' })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.questions?.[index]?.correctAnswer && (
                <span className="text-red-500">{errors.questions[index]?.correctAnswer?.message}</span>
              )}
            </div>
          </div>
        ))}

        {/* Add New Question Button */}
        <button
          type="button"
          onClick={() => append({ question: '', options: ['', '', ''], correctAnswer: '' })}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Question
        </button>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default AddQuizToCourse;
