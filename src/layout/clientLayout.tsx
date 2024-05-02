import React, { useState, ReactNode, useEffect } from 'react';
import ClientHeader from '../components/ClientHeader/index';
import { useAuth } from '../components/Auth/AuthProvider';
import axios from 'axios';
import { mdiMessage } from '@mdi/js';
import { Icon } from '@mdi/react';
import Chatbot from '../../src/pages/landing/chatbot.tsx';


const ClientLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const { pathname } = location;
    // Check if the current path contains "auth"
  const isLanding = pathname.includes('/landing');
  const [connectedUser, setConnectedUser]= useState<any>(null);
  const { userAuth } = useAuth(); 
  interface Message {
    text: string;
    sender: string;
}

const [messages, setMessages] = useState<Message[]>([]);
const [inputValue, setInputValue] = useState('');


const sendMessage = async () => {
    if (!inputValue.trim()) return; // Don't send empty messages

    try {
        const response = await axios.post('http://localhost:3000/user/chatbot', {
            message: inputValue,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        if (response.status !== 200) {
            throw new Error('Failed to send message');
        }

        const data = response.data;
        setMessages(prevMessages => [
            ...prevMessages,
            { text: inputValue, sender: 'user' },
            { text: data.response, sender: 'agent' }
        ]);
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

const [showChat, setShowChat] = useState(false); // State variable to track whether the chat is visible

const toggleChat = () => {
    setShowChat(!showChat);
};


  
  
  useEffect(() => {
    setConnectedUser(userAuth);
  }, [userAuth]);
  
  
  return (
    
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
                <ClientHeader connectedUser={connectedUser} authenticated={authenticated} />

      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex  overflow-hidden">
        


        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-hidden overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto mt-0 max-w-screen-2xl" >
              {children}
            </div>
            
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
          
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      {/* Chat Icon and Interface */}
      <div>
  <div className="fixed bottom-4 right-4 bg-white p-3 rounded-full shadow-md cursor-pointer" onClick={toggleChat}>
    <Icon path={mdiMessage} className="h-6 w-6 text-gray-600" />
  </div>

  {showChat && (
              <Chatbot />

  )}
</div>




      {/* Chat Icon and Interface End */}
    </div>
    {/* Page Wrapper End */}
  </div>
);
};
export default ClientLayout;
