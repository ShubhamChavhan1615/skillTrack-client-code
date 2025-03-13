import React from 'react';

const Privacy: React.FC = () => {
    return (
        <div className="min-h-screen bg-green-50 p-8">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
                <h1 className="text-3xl font-bold text-green-700 mb-4">Privacy Policy</h1>
                <p className="text-gray-700 mb-4">
                    Welcome to Skiltrack! Your privacy is important to us. This policy outlines how we collect, use,
                    and protect your information.
                </p>
                <h2 className="text-2xl font-semibold text-green-600 mb-2">Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                    We collect information you provide directly to us, such as your name, email address, and content
                    you submit to our platform.
                </p>
                <h2 className="text-2xl font-semibold text-green-600 mb-2">How We Use Information</h2>
                <p className="text-gray-600 mb-4">
                    We use your information to improve our services, personalize your experience, and ensure
                    platform security.
                </p>
                <h2 className="text-2xl font-semibold text-green-600 mb-2">Your Choices</h2>
                <p className="text-gray-600">
                    You have the right to access, correct, or delete your data. Contact us for assistance.
                </p>
            </div>
        </div>
    );
};

export default Privacy;
