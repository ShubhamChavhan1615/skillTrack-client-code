import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpWithGoogle: React.FC = () => {
    const navigate = useNavigate();

    const handleGoogleLoginSuccess = async (credentialResponse: any) => {
        try {
            // Send the token and role to the server
            const response = await axios.post(`${import.meta.env.VITE_SERVER_API}/api/google/signup`, {
                token: credentialResponse.credential,
            });
            toast.success('Signup successful')
            setTimeout(() => {
                localStorage.setItem("authToken", response.data.authToken);
                navigate("/");
                window.location.reload();
            }, 999);
        } catch (error) {
            toast.error('Error during signup')
            console.error("Error during signup:", error);
        }
    };

    const handleGoogleLoginFailure = () => {
        console.error("Google login failed");
    };

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <ToastContainer/>
                <h1 className="text-2xl font-bold mb-6">Sign Up with Google</h1>

                {/* Role Selection */}
                {/* <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700 mb-2">Select Role:</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                    </select>
                </div> */}

                {/* Google Login Button */}
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginFailure}
                    theme="filled_blue"
                    shape="pill"
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default SignUpWithGoogle;
