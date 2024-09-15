import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for the toast notifications
import { editCourseApi } from '../services';

interface CourseFormValues {
    title: string;
    description: string;
    category: string;
    price: number;
    tags: string;
    thumbnail: FileList; // File upload handling
}

const EditCourse: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const { register, handleSubmit, formState: { errors } } = useForm<CourseFormValues>();
    const navigate = useNavigate();

    const onSubmit = async (data: CourseFormValues) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('price', data.price.toString()); // Convert number to string
        formData.append('tags', JSON.stringify(data.tags));
        if (data.thumbnail && data.thumbnail.length > 0) {
            formData.append('thumbnail', data.thumbnail[0]); // Append file
        }

        try {
            await axios.put(editCourseApi + `/${courseId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                },
            });

            // Show success toast
            toast.success('Course updated successfully!');

            // Navigate after a brief delay to show the toast
            setTimeout(() => {
                navigate('/courses');
            }, 2000);

        } catch (error) {
            console.error("Failed to update course", error);

            // Show error toast
            toast.error('Failed to update course. Please try again later.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <ToastContainer /> {/* Add ToastContainer for displaying toasts */}
            <h2 className="text-2xl font-bold mb-6">Edit Course</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        {...register('title', { required: true })}
                        className={`mt-1 block w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="Course Title"
                    />
                    {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        {...register('description', { required: true })}
                        className={`mt-1 block w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="Course Description"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        {...register('category', { required: true })}
                        className={`mt-1 block w-full p-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="Course Category"
                    />
                    {errors.category && <p className="text-red-500 text-sm">Category is required</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Price (in Rs.)</label>
                    <input
                        {...register('price', { required: true, valueAsNumber: true })}
                        type="number"
                        className={`mt-1 block w-full p-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="Course Price"
                    />
                    {errors.price && <p className="text-red-500 text-sm">Price is required</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" htmlFor="tags">Tags</label>
                    <input
                        id="tags"
                        {...register('tags')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white"
                        type="text"
                        placeholder="Enter course tags (comma separated)"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                    <input
                        {...register('thumbnail')}
                        type="file"
                        className="mt-1 block w-full p-2"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white p-2 rounded-md shadow hover:bg-indigo-700"
                >
                    Update Course
                </button>
            </form>
        </div>
    );
};

export default EditCourse;
