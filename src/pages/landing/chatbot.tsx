import React, { useState } from 'react';
import axios from 'axios';
import { mdiMessage } from '@mdi/js';
import { Icon } from '@mdi/react';

const Chatbot = () => {
    interface Message {
        text: string;
        sender: string;
    }

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [showChat, setShowChat] = useState(false); // State variable to track whether the chat interface is visible

    const sendMessage = async () => {
        if (!inputValue.trim()) return; // Don't send empty messages
    
        try {
            const newMessage: Message = { text: inputValue, sender: 'user' };
            setMessages(prevMessages => [...prevMessages, newMessage]); // Add user message to the message history
            
            const response = await axios.post('http://localhost:3000/user/chatbot', {
                message: inputValue,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status !== 200) {
                throw new Error('Failed to send message');
            }
    
            const data = response.data;
            const botResponse: Message = { text: data.response, sender: 'agent' };
            setMessages(prevMessages => [...prevMessages, botResponse]); // Add bot response to the message history
            setInputValue('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

                    <div className="flex-grow"></div> {/* This div will push the input field and button to the bottom */}
                    
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
