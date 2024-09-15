import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiSend, FiMic, FiSmile } from 'react-icons/fi';
import { AiOutlineLoading3Quarters, AiOutlineArrowDown } from 'react-icons/ai';
import { BsMoon, BsSun } from 'react-icons/bs';

const emojis = ['😀', '😂', '😍', '😎', '😢', '😡', '👍', '🙏', '💯', '🎉'];

const ChatWithAI: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string; timestamp: string }[]>([]);
    const [showFullResponse, setShowFullResponse] = useState<boolean>(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = async () => {
        if (!prompt) return;
        const timestamp = new Date().toLocaleTimeString();
        setLoading(true);
        setResponse(null);
        setMessages((prev) => [...prev, { sender: 'user', text: prompt, timestamp }]);
        try {
            const { data } = await axios.post('http://localhost:4000/api/ai/chat', { prompt });
            setMessages((prev) => [...prev, { sender: 'ai', text: data.response, timestamp: new Date().toLocaleTimeString() }]);
            setResponse(data.response);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prev) => [...prev, { sender: 'ai', text: "Sorry, something went wrong on the server.", timestamp }]);
        } finally {
            setLoading(false);
            setPrompt('');
            setShowFullResponse(false);
            scrollToBottom();
        }
    };

    const toggleShowFullResponse = () => {
        setShowFullResponse(!showFullResponse);
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    const handleEmojiSelect = (emoji: string) => {
        setPrompt(prompt + emoji);
        setShowEmojiPicker(false);
    };

    const handleSpeech = () => {
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.start();
        recognition.onresult = (event: any) => {
            setPrompt(prompt + event.results[0][0].transcript);
        };
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-300 ${theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-white'}`}>
            <button onClick={toggleTheme} className="absolute top-4 right-4 text-xl">
                {theme === 'light' ? <BsMoon /> : <BsSun />}
            </button>
            <div className={`rounded-lg shadow-lg p-6 w-full max-w-lg lg:max-w-2xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                <div className="mb-4 text-center">
                    <p className="text-2xl font-semibold">Chat with AI Ask any question</p>
                </div>
                <div ref={chatBoxRef} className="overflow-y-scroll max-h-80 mb-4">
                    {messages.map((message, index) => (
                        <div key={index} className={`mb-4 p-3 rounded-lg ${message.sender === 'user' ? 'bg-purple-600 text-white self-end' : 'bg-gray-100 text-gray-800'} animate-slide-in`}>
                            <p className="text-lg font-medium">{message.text}</p>
                            <span className="text-xs text-gray-700">{message.timestamp}</span>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex items-center justify-center">
                            <AiOutlineLoading3Quarters className="animate-spin mr-2 text-xl" />
                        </div>
                    )}
                </div>
                <div className="mb-4 relative">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Type your message..."
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${theme === 'light' ? 'text-black border-gray-300 focus:ring-purple-400' : 'text-white bg-gray-700 border-gray-600 focus:ring-purple-400'}`}
                    />
                    <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="absolute right-10 top-2 text-xl">
                        <FiSmile />
                    </button>
                    <button onClick={handleSpeech} className="absolute right-2 top-2 text-xl">
                        <FiMic />
                    </button>
                    {showEmojiPicker && (
                        <div className="absolute bottom-12 right-0 bg-white border rounded-lg shadow-lg p-2">
                            <div className="grid grid-cols-5 gap-2">
                                {emojis.map((emoji, index) => (
                                    <button key={index} onClick={() => handleEmojiSelect(emoji)} className="text-2xl hover:bg-gray-200 rounded-md">
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        onClick={handleSendMessage}
                        className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                        {loading ? (
                            <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                        ) : (
                            <FiSend className="mr-2" />
                        )}
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </div>
                {response && response.length > 300 && (
                    <div className="mt-4 text-center">
                        <span
                            onClick={toggleShowFullResponse}
                            className="text-purple-600 cursor-pointer font-semibold"
                        >
                            {showFullResponse ? 'Show Less' : 'Read More'}
                        </span>
                    </div>
                )}
                {messages.length > 3 && (
                    <button
                        onClick={scrollToBottom}
                        className="flex items-center justify-center mt-4 text-purple-600"
                    >
                        <AiOutlineArrowDown className="mr-2" /> Scroll to Latest
                    </button>
                )}
            </div>
        </div>
    );
};

export default ChatWithAI;
