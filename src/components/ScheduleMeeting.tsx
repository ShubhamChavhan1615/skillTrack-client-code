import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface MeetingFormInputs {
    summary: string;
    description: string;
    startTime: string;
    endTime: string;
}

const ScheduleMeeting: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<MeetingFormInputs>();
    const [meetLink, setMeetLink] = useState('');
    const { courseId } = useParams<{ courseId: string }>();

    const onSubmit: SubmitHandler<MeetingFormInputs> = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_API}/google/create-meet/${courseId}`, data);
            setMeetLink(response.data.meetLink);
        } catch (error) {
            console.error('Error creating meeting:', error);
            alert('Failed to schedule a meeting');
        }
    };
    

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Schedule a Meeting</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Summary"
                        {...register('summary', { required: 'Summary is required' })}
                        className={`border ${errors.summary ? 'border-red-500' : 'border-gray-300'} w-full p-3 rounded-lg focus:ring focus:ring-green-500 focus:outline-none`}
                    />
                    {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary.message}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Description"
                        {...register('description', { required: 'Description is required' })}
                        className={`border ${errors.description ? 'border-red-500' : 'border-gray-300'} w-full p-3 rounded-lg focus:ring focus:ring-green-500 focus:outline-none`}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>
                <div>
                    <input
                        type="datetime-local"
                        {...register('startTime', { required: 'Start time is required' })}
                        className={`border ${errors.startTime ? 'border-red-500' : 'border-gray-300'} w-full p-3 rounded-lg focus:ring focus:ring-green-500 focus:outline-none`}
                    />
                    {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>}
                </div>
                <div>
                    <input
                        type="datetime-local"
                        {...register('endTime', { required: 'End time is required' })}
                        className={`border ${errors.endTime ? 'border-red-500' : 'border-gray-300'} w-full p-3 rounded-lg focus:ring focus:ring-green-500 focus:outline-none`}
                    />
                    {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime.message}</p>}
                </div>
                <button type="submit" className="bg-green-600 text-white py-3 px-6 w-full rounded-lg hover:bg-green-500 transition-all">
                    Schedule Meeting
                </button>
            </form>

            {meetLink && (
                <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center">
                    <p className="text-lg text-gray-700 font-semibold">Google Meet Link:</p>
                    <a href={meetLink} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline break-words">
                        {meetLink}
                    </a>
                </div>
            )}
        </div>
    );
};

export default ScheduleMeeting;
