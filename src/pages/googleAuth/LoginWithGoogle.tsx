import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginWithGoogle: React.FC = () => {
    const navigate = useNavigate();

    const handleGoogleLoginSuccess = async (credentialResponse: any) => {
        try {
            // Send the token to the server for authentication
            const response = await axios.post(`${import.meta.env.VITE_SERVER_API}/api/google/login`, {
                token: credentialResponse.credential,
            });
            
            toast.success('Login successful');
            setTimeout(() => {
                localStorage.setItem("authToken", response.data.authToken);
                navigate("/");
                window.location.reload();
            }, 999);
        } catch (error) {
            toast.error('Error during login');
            console.error("Error during login:", error);
        }
    };

    const handleGoogleLoginFailure = () => {
        console.error("Google login failed");
        toast.error('Google login failed');
    };

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <ToastContainer />
                <h1 className="text-2xl font-bold mb-6">Log In with Google</h1>

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

export default LoginWithGoogle;
