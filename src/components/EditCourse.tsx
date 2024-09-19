import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editCourseApi } from '../services';
import { AppDispatch, RootState } from '../app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../app/store/features/coursesSlice';

interface CourseFormValues {
    title: string;
    description: string;
    category: string;
    price: number;
    tags: string;
    thumbnail: FileList;
}

const EditCourse: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const dispatch: AppDispatch = useDispatch();
    const { courses } = useSelector((state: RootState) => state.coursesData);
    useEffect(() => {
        dispatch(fetchCourses());
      }, [dispatch]);
    const course = courses.find(course => course._id === courseId);
    const navigate = useNavigate();

    // Initialize useForm with default values from the selected course
    const { register, handleSubmit, formState: { errors } } = useForm<CourseFormValues>();

    const onSubmit = async (data: CourseFormValues) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('price', data.price.toString());
        formData.append('tags', JSON.stringify(data.tags.split(',').map(tag => tag.trim()))); // Convert tags back to an array
        if (data.thumbnail && data.thumbnail.length > 0) {
            formData.append('thumbnail', data.thumbnail[0]);
        }

        try {
            await axios.put(editCourseApi + `/${courseId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
            });

            toast.success('Course updated successfully!');

            setTimeout(() => {
                navigate('/courses');
            }, 2000);

        } catch (error) {
            console.error("Failed to update course", error);
            toast.error('Failed to update course. Please try again later.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <ToastContainer />
            <h2 className="text-3xl font-semibold mb-8 text-gray-800">Edit Course</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Title */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Title</label>
                    <input
                        {...register('title', { required: true })}
                        defaultValue={course?.title}
                        className={`mt-2 block w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200`}
                        placeholder="Course Title"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">Title is required</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Description</label>
                    <textarea
                        {...register('description', { required: true })}
                        defaultValue={course?.description}
                        className={`mt-2 block w-full p-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200`}
                        placeholder="Course Description"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm mt-1">Description is required</p>}
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Category</label>
                    <input
                        {...register('category', { required: true })}
                        defaultValue={course?.category}
                        className={`mt-2 block w-full p-3 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200`}
                        placeholder="Course Category"
                    />
                    {errors.category && <p className="text-red-500 text-sm mt-1">Category is required</p>}
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Price (in Rs.)</label>
                    <input
                        {...register('price', { required: true, valueAsNumber: true })}
                        defaultValue={course?.price}
                        type="number"
                        className={`mt-2 block w-full p-3 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200`}
                        placeholder="Course Price"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">Price is required</p>}
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Tags</label>
                    <input
                        {...register('tags')}
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                        placeholder="Enter course tags (comma separated)"
                    />
                </div>

                {/* Thumbnail */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Thumbnail</label>
                    <input
                        {...register('thumbnail')}
                        type="file"
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-indigo-700 transition-colors duration-300"
                >
                    Update Course
                </button>
            </form>
        </div>
    );
};

export default EditCourse;
