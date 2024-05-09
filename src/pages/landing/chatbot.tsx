import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { mdiMessage } from '@mdi/js';
import { Icon } from '@mdi/react';
import { useAuth } from '../../components/Auth/AuthProvider';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showChat, setShowChat] = useState(false); 
    const [speaking, setSpeaking] = useState(false); // State to track if speech synthesis is active
    const { userAuth } = useAuth();

    const userId = userAuth?._id;
  
    useEffect(() => {
        if (!showChat) {
            stopSpeaking(); // Stop speech synthesis when chat interface is closed
        }
    }, [showChat]);

    const sendMessage = async () => {
        if (!inputValue.trim()) return; 
    
        try {
            const newMessage = { text: inputValue, sender: 'user' };
            setMessages(prevMessages => [...prevMessages, newMessage]); 
            
            const response = await axios.post('http://localhost:3000/user/chatbot', {
                message: inputValue,
                userId: userId, // Send the user ID to the backend
                
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status !== 200) {
                throw new Error('Failed to send message');
            }
            console.log(userId);
            const data = response.data;
            const botResponse = { text: data.response, sender: 'agent', sentimentScore: data.sentimentScore  }; // Include sentiment score
            setMessages(prevMessages => [...prevMessages, botResponse]); 
            
            // Speak the bot's response
            speakResponse(data.response);
            
            setInputValue('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const speakResponse = (text) => {
        const speech = new SpeechSynthesisUtterance();
        speech.text = text;
        speech.volume = 1;
        speech.rate = 2;
        speech.pitch = 1;
        speech.lang = 'en-US'; // Change the language if necessary
        
        speech.onstart = () => setSpeaking(true);
        speech.onend = () => setSpeaking(false);
        
        window.speechSynthesis.speak(speech);
    };

    const stopSpeaking = () => {
        if (speaking) {
            window.speechSynthesis.cancel();
            setSpeaking(false);
        }
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    return (
        <div>
            {showChat && (
                <div className="fixed bottom-16 right-4 bg-white p-4 rounded-lg shadow-md w-96 h-96 overflow-y-auto flex flex-col">
                    {/* Render the chat interface */}
                    {messages.map((message, index) => (
                        <div key={index} className={`p-2 ${message.sender === 'user' ? 'bg-gray-200' : 'bg-blue-500 text-white'} rounded-lg mb-2 max-w-xs break-words`}>
                            {message.text}
                           
                        </div>
                    ))}

                    <div className="flex-grow"></div> 
                    
                    {/* Input field and button container */}
                    <div className="flex justify-between">
                        {/* Input field for user messages */}
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-2 flex-grow mr-2 focus:outline-none focus:ring focus:border-blue-300"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        {/* Send button */}
                        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
                    </div>
                </div>
            )}
            {/* Chat icon */}
            <div className="fixed bottom-4 right-4 bg-white p-3 rounded-full shadow-md cursor-pointer" onClick={toggleChat}>
                <Icon path={mdiMessage} className="h-6 w-6 text-gray-600" />
            </div>
        </div>
    );
};

export default Chatbot;
