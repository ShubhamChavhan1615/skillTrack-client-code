import React, { useState } from 'react';
import axios from 'axios';

const ScheduleMeeting: React.FC = () => {
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [meetLink, setMeetLink] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/google/create-meet', {
                summary,
                description,
                startTime,
                endTime,
            });

            // Set the Google Meet link in state
            setMeetLink(response.data.meetLink);
        } catch (error) {
            console.error('Error creating meeting:', error);
            alert('Failed to schedule a meeting');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    required
                    className="border rounded p-2 mb-2"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="border rounded p-2 mb-2"
                />
                <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    className="border rounded p-2 mb-2"
                />
                <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    className="border rounded p-2 mb-2"
                />
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
                    Schedule Meeting
                </button>
            </form>

            {meetLink && (
                <p className="mt-4">
                    Google Meet Link: <a href={meetLink} target="_blank" rel="noopener noreferrer">{meetLink}</a>
                </p>
            )}
        </div>
    );
};

export default ScheduleMeeting;
