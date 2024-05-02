import { Link } from 'react-router-dom';
import { User } from '../../types/User';
import { useEffect, useState } from 'react';
import { useSocket } from '../../SocketContext';
import { useAuth } from '../Auth/AuthProvider';
import { sendMessage } from '../../services/message.services';
import axios from 'axios';

interface Props {
    participant: User | null;
}

const DiscussionDetails: React.FC<Props> = ({ participant }) => {
  const socket = useSocket();

  const {userAuth} = useAuth();

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState<any>([]);

  const fetchMessages = async () => {
    try {
      if(participant){
        console.log(participant?._id)
        const response = await axios.get(`http://localhost:3000/message/list/get/${userAuth._id}/${participant?._id}`);
        console.log("fetching data..." + response.data);
        setMessages(response.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
      fetchMessages();
    }, [participant]);


  useEffect(() => {
    socket.onAny((eventName, eventData) => {
      console.log(`Received event: ${eventName}`);
      if (eventName === "message" && (userAuth?._id === eventData.idSender || userAuth?._id === eventData.idRecipient )) {
          console.log('New message created:', eventData.content);
          
          //fetchMessages();
          if (participant && (participant._id === eventData.idSender || participant._id === eventData.idRecipient)) {
            fetchMessages();
          }
         
      }
    });

    return () => {
      socket.off('message');
    };
  }, [participant]);



  const handleSendMessage = async (e:any) => {
    e.preventDefault();
  
    sendMessage(userAuth?._id , participant?._id , message)
      .then((response) => {
        console.log('message added successfully:', response);
        setMessage('')
      })
      .catch((error) => {
        
        console.error('Error adding messages:', error);
        
      });
};


  return (   
    <div>
   
      <div className="border-b border-gray-200 mb-5">
        <Link
          to="/"
          className="flex items-center gap-5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
        >
          <div className="relative h-14 w-14 rounded-full">
            <img src={participant?.imageUrl} alt="User" className="w-15 h-15 cursor-pointer rounded-full shadow-lg" />
            <span
              className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white"
              style={{ backgroundColor: '#10B981' }}
            ></span>
          </div>

          <div className="flex flex-1 items-center justify-between">
            <div>
              <h5 className="font-medium text-lg text-black dark:text-white capitalize">
                {participant?.FirstName} {participant?.LastName}
              </h5>
            </div>
          </div>
        </Link>
      </div>

      <div
        className="overflow-y-auto max-h-125"
        
      > 
       <ul>
        {messages.map((msg:any, index:any) => (
          //<li key={index}>{msg.content}</li>


          (msg.sender === userAuth?._id ? (

              <div className="flex items-start gap-2.5" key={index}>
    
                <div className={`flex flex-col w-full mt-3 max-w-[320px] leading-1.5 p-1 px-3 border-gray-200 bg-blue-600 rounded-s-xl rounded-se-xl dark:bg-gray-700 ml-auto`}>
                   
                    <p className="text-lg font-medium py-2.5 text-white dark:text-white">{msg.content}</p>

                </div>
              
              </div>
            ):(
              <div className="flex items-start gap-2.5" key={index}>
                <img className="w-8 h-8 rounded-full" src={participant?.imageUrl} alt="Jese image"/>

                <div className={`flex flex-col w-full mt-3 max-w-[320px] leading-1.5 p-1 px-3 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700`}>
                  
                    <p className="text-lg font-medium py-2.5 text-gray-900 dark:text-white">{msg.content}</p>
                </div>
              </div>
            ))
        ))}
      </ul>

      </div>

      <div className="mt-5 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full rounded-lg border border-stroke bg-transparent mr-3 py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
            <button className="hover:bg-primary hover:text-white inline-flex items-center justify-center bg-white px-4 py-2 text-primary font-medium text-center  border border-primary rounded-lg  hover:scale-[1] focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
              onClick={handleSendMessage}>
                Send 
            </button>          
      </div>
    </div>
  );
};

export default DiscussionDetails;
