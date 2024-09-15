import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { createCourseApi } from '../services';

interface IFormInput {
    title: string;
    description: string;
    category: string;
    thumbnail: FileList;
    price: number;
    tags: string[];
}

const CreateCourse: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('thumbnail', data.thumbnail[0]);
            formData.append('price', data.price.toString());
            formData.append('tags', JSON.stringify(data.tags));

            const authToken = localStorage.getItem('authToken');
            const response = await axios.post(createCourseApi, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            console.log('Course created successfully:', response.data);
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Create a New Course</h2>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                {/* Title */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" htmlFor="title">Title</label>
                    <input
                        id="title"
                        {...register('title', { required: 'Title is required' })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white"
                        type="text"
                        placeholder="Enter your course title"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-2">{String(errors.title.message)}</p>}
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        {...register('description', { required: 'Description is required' })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white"
                        placeholder="Enter your course description"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-2">{String(errors.description.message)}</p>}
                </div>

                {/* Category */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" htmlFor="category">Category</label>
                    <input
                        id="category"
                        {...register('category', { required: 'Category is required' })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white"
                        type="text"
                        placeholder="Enter your course category"
                    />
                    {errors.category && <p className="text-red-500 text-sm mt-2">{String(errors.category.message)}</p>}
                </div>

                {/* Price */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" htmlFor="price">Price</label>
                    <input
                        id="price"
                        {...register('price', { required: 'Price is required' })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white"
                        type="number"
                        placeholder="Enter course price"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-2">{String(errors.price.message)}</p>}
                </div>

                {/* Tags */}
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

                {/* Thumbnail */}
                <div className="mb-8">
                    <label className="block text-sm font-medium mb-2" htmlFor="thumbnail">Thumbnail</label>
                    <input
                        id="thumbnail"
                        {...register('thumbnail', { required: 'Thumbnail is required' })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white"
                        type="file"
                    />
                    {errors.thumbnail && <p className="text-red-500 text-sm mt-2">{String(errors.thumbnail.message)}</p>}
                </div>

                <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all duration-300">
                    Create Course
                </button>
            </form>
        </div>
    );
};

export default CreateCourse;
