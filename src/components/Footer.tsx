import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 pl-3 pr-3">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 lg:px-0">
                {/* Branding & Info Section */}
                <div className="flex flex-col mb-8 md:mb-0">
                    <h1 className="text-3xl font-bold mb-2">SkillTrack</h1>
                    <p className="text-gray-400 mb-4">
                        Empowering instructors and students with easy-to-use tools for managing courses, quizzes, and educational content.
                    </p>
                    <p className="text-gray-400">© {new Date().getFullYear()} SkillTrack. All rights reserved.</p>
                </div>

                {/* Quick Links Section */}
                <div className="flex flex-col mb-8 md:mb-0">
                    <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
                    <ul className="space-y-3">
                        <li><Link to="/courses" className="text-gray-400 hover:text-white transition-colors">Courses</Link></li>
                        <li><Link to="/Instructors" className="text-gray-400 hover:text-white transition-colors">Instructors</Link></li>
                        <li><Link to="/About" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                        <li><Link to="/Contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                        <li><Link to="/ask-ai" className="text-gray-400 hover:text-white transition-colors">Ask a Question to AI</Link></li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                            <FaFacebookF className="w-6 h-6" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
                            <FaTwitter className="w-6 h-6" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
                            <FaLinkedinIn className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="container mx-auto mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center px-6 lg:px-0">
                <p className="text-gray-400 text-sm">Developed by <span className="font-semibold">Shubham Chavhan</span> - Full Stack Developer</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Privacy Policy</Link>
                    <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
