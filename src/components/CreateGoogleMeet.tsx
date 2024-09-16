import React from 'react';

const CreateGoogleMeet: React.FC = () => {
    const handleAuth = async () => {
        // Redirect to the Google OAuth endpoint on your backend
        window.location.href = 'http://localhost:4000/google/auth/google'; // Redirects to the server OAuth route
    };

    return (
        <div>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleAuth}
            >
                Authenticate with Google
            </button>
        </div>
    );
};

export default CreateGoogleMeet;
