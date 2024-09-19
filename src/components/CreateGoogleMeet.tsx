import React from 'react';

const CreateGoogleMeet: React.FC = () => {
    const handleAuth = async () => {
        // Redirect to the Google OAuth endpoint on your backend
        window.location.href = `${import.meta.env.VITE_SERVER_API}/google/:courseId/auth/google`; // Redirects to the server OAuth route
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Google Meet</h2>
                <p className="text-gray-600 mb-6">
                    Click the button below to authenticate via Google and create a Google Meet.
                </p>
                <button
                    className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    onClick={handleAuth}
                >
                    Authenticate with Google
                </button>
            </div>
        </div>
    );
};

export default CreateGoogleMeet;
