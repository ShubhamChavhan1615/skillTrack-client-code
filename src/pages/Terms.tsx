import React from 'react';

const Terms: React.FC = () => {
    return (
        <div className="min-h-screen bg-blue-50 p-8">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
                <h1 className="text-3xl font-bold text-blue-700 mb-4">Terms & Conditions</h1>
                <p className="text-gray-700 mb-4">
                    Welcome to SkillTrack! By using our platform, you agree to the following terms and conditions. Please
                    read them carefully before proceeding.
                </p>
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">User Responsibilities</h2>
                <p className="text-gray-600 mb-4">
                    Users are expected to engage with the platform respectfully, submit original content, and refrain
                    from sharing any harmful material.
                </p>
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">Intellectual Property</h2>
                <p className="text-gray-600 mb-4">
                    All course materials, content, and resources are the intellectual property of SkillTrack or its
                    respective creators. Unauthorized use is strictly prohibited.
                </p>
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">Account Termination</h2>
                <p className="text-gray-600">
                    We reserve the right to suspend or terminate accounts that violate these terms. If you have questions
                    or concerns, please contact our support team.
                </p>
            </div>
        </div>
    );
};

export default Terms;
