import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSocket } from '../../SocketContext';
import { useAuth } from '../Auth/AuthProvider';
import { sendMessageTeam } from '../../services/message.services';
import axios from 'axios';



interface Props {
    team: any | null;
}

const DiscussionDetailsTeam: React.FC<Props> = ({ team }) => {
  const socket = useSocket();

  const {userAuth} = useAuth();

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState<any>([]);

  const fetchMessages = async () => {
    try {
      if(team){
        console.log(team?._id)
        const response = await axios.get(`http://localhost:3000/message/list/get/team/${userAuth._id}/${team?._id}`);
        console.log("fetching data..." + response.data);
        setMessages(response.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
      fetchMessages();
    }, [team]);


    useEffect(() => {
        socket.onAny((eventName, eventData) => {
          console.log(`Received event: ${eventName}`);
          if (eventName === "messageTeam" && (eventData.idSender === userAuth?._id || (eventData.idRecipient && team?.members.includes(eventData.idRecipient)))) {
            console.log('New message created:', eventData.content);
            // Fetch messages only if the user is a recipient or a member of the team
            if (team && (eventData.idSender === userAuth?._id ||   (eventData.idRecipient && team?.members.includes(eventData.idRecipient)))) {
              fetchMessages();
            }
          }
        });
      
        return () => {
          socket.off('messageTeam');
        };
      }, [team]);




  const handleSendMessage = async (e:any) => {
    e.preventDefault();
  
    sendMessageTeam(userAuth?._id , team?._id , message)
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
          to="#"
          className="flex items-center gap-5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
        >
          <div className="relative h-14 w-14 rounded-full">
            <img src={team?.imageUrl} alt="User" className="w-15 h-15 cursor-pointer rounded-full shadow-lg" />
            <span
              className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white"
              style={{ backgroundColor: '#10B981' }}
            ></span>
          </div>

          <div className="flex flex-1 items-center justify-between">
            <div>
              <h5 className="font-medium text-lg text-black dark:text-white capitalize">
              {team?.name}

              </h5>
              <span>Reply to message</span>
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

          (msg.sender._id === userAuth?._id ?(

              <div className="flex items-start gap-2.5" key={index}>
    
                <div className={`flex flex-col w-full mt-3 max-w-[320px] leading-1.5 p-1 px-3 border-gray-200 bg-primary rounded-s-xl rounded-se-xl dark:bg-gray-700 ml-auto`}>
                   
                    <p className="text-lg font-medium py-2.5 text-white dark:text-white">{msg.content}</p>

                </div>
              
              </div>
            ):(
              <div>
              <p className="text-sm font-medium mt-6 ml-12 text-gray-900 dark:text-white capitalize">{msg.sender.FirstName} {msg.sender.LastName}</p>

              <div className="flex items-start gap-2.5" key={index}>

                <img className="w-8 h-8 rounded-full" src={msg?.sender.imageUrl} alt="Jese image"/>

                <div className={`flex flex-col w-full mt-3 max-w-[320px] leading-1.5 p-1 px-3 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700`}>
                  
                    <p className="text-lg font-medium py-2.5 text-gray-900 dark:text-white">{msg.content}</p>

                </div>
              </div>
              </div>
            ))
        ))}
    </ul>

      </div>

      <div className="relative mt-5 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); 
              handleSendMessage(e); 
            }
          }}
          placeholder="Type something here..."
          className="w-full rounded-lg border border-stroke bg-gray mr-3 py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <div className="absolute right-22 top-1/2 inline-flex -translate-y-1/2 items-center justify-end space-x-4">
            <button className="hover:text-primary"><svg width="18" height="18" viewBox="0 0 18 18" className="fill-current"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.835 1.79102C11.2378 1.79102 10.6651 2.02824 10.2428 2.45051L3.3503 9.34302C2.64657 10.0467 2.25122 11.0012 2.25122 11.9964C2.25122 12.9917 2.64657 13.9461 3.3503 14.6499C4.05403 15.3536 5.0085 15.7489 6.00372 15.7489C6.99895 15.7489 7.95341 15.3536 8.65714 14.6499L15.5496 7.75736C15.8425 7.46446 16.3174 7.46446 16.6103 7.75736C16.9032 8.05025 16.9032 8.52512 16.6103 8.81802L9.7178 15.7105C8.73277 16.6956 7.39677 17.2489 6.00372 17.2489C4.61067 17.2489 3.27468 16.6956 2.28964 15.7105C1.30461 14.7255 0.751221 13.3895 0.751221 11.9964C0.751221 10.6034 1.30461 9.26739 2.28964 8.28236L9.18214 1.38985C9.88572 0.686279 10.84 0.291016 11.835 0.291016C12.83 0.291016 13.7842 0.686279 14.4878 1.38985C15.1914 2.09343 15.5866 3.04768 15.5866 4.04268C15.5866 5.03769 15.1914 5.99194 14.4878 6.69552L7.5878 13.588C7.16569 14.0101 6.59318 14.2473 5.99622 14.2473C5.39926 14.2473 4.82676 14.0101 4.40464 13.588C3.98253 13.1659 3.74539 12.5934 3.74539 11.9964C3.74539 11.3995 3.98253 10.827 4.40464 10.4049L10.7725 4.04454C11.0655 3.75182 11.5404 3.7521 11.8331 4.04517C12.1258 4.33823 12.1256 4.81311 11.8325 5.10583L5.4653 11.4655C5.32469 11.6063 5.24539 11.7974 5.24539 11.9964C5.24539 12.1956 5.32449 12.3865 5.4653 12.5274C5.60611 12.6682 5.79709 12.7473 5.99622 12.7473C6.19535 12.7473 6.38633 12.6682 6.52714 12.5274L13.4271 5.63486C13.8492 5.21261 14.0866 4.63973 14.0866 4.04268C14.0866 3.4455 13.8494 2.87278 13.4271 2.45051C13.0049 2.02824 12.4321 1.79102 11.835 1.79102Z"></path></svg></button>
            <button className="hover:text-primary"><svg width="19" height="18" viewBox="0 0 19 18" className="fill-current"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 2.25C5.77208 2.25 2.75 5.27208 2.75 9C2.75 12.7279 5.77208 15.75 9.5 15.75C13.2279 15.75 16.25 12.7279 16.25 9C16.25 5.27208 13.2279 2.25 9.5 2.25ZM1.25 9C1.25 4.44365 4.94365 0.75 9.5 0.75C14.0564 0.75 17.75 4.44365 17.75 9C17.75 13.5564 14.0564 17.25 9.5 17.25C4.94365 17.25 1.25 13.5564 1.25 9Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.09769 10.0469C6.84856 9.71825 6.38037 9.6523 6.05004 9.90004C5.71867 10.1486 5.65152 10.6187 5.90004 10.95L6.50004 10.5C5.90004 10.95 5.90022 10.9503 5.90041 10.9505L5.9008 10.9511L5.90167 10.9522L5.90372 10.9549L5.90913 10.962L5.9251 10.9824C5.93803 10.9988 5.95555 11.0204 5.97757 11.0467C6.02155 11.0991 6.08379 11.17 6.16363 11.2533C6.32269 11.4193 6.55512 11.6379 6.85579 11.8566C7.45424 12.2918 8.3559 12.75 9.50004 12.75C10.6442 12.75 11.5458 12.2918 12.1443 11.8566C12.445 11.6379 12.6774 11.4193 12.8365 11.2533C12.9163 11.17 12.9785 11.0991 13.0225 11.0467C13.0445 11.0204 13.0621 10.9988 13.075 10.9824L13.091 10.962L13.0964 10.9549L13.0984 10.9522L13.0993 10.9511L13.0997 10.9505C13.0999 10.9503 13.1 10.95 12.5 10.5L13.1 10.95C13.3486 10.6187 13.2814 10.1486 12.95 9.90004C12.6197 9.6523 12.1515 9.71825 11.9024 10.0469L11.8989 10.0514C11.8945 10.057 11.886 10.0676 11.8736 10.0823C11.8487 10.112 11.8084 10.1582 11.7535 10.2155C11.643 10.3308 11.477 10.4872 11.262 10.6435C10.8292 10.9583 10.2309 11.25 9.50004 11.25C8.76919 11.25 8.17084 10.9583 7.73805 10.6435C7.52309 10.4872 7.35709 10.3308 7.24661 10.2155C7.19168 10.1582 7.15139 10.112 7.12653 10.0823C7.11412 10.0676 7.10563 10.057 7.10117 10.0514L7.09769 10.0469Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 6.75C6.5 6.33579 6.83579 6 7.25 6H7.2575C7.67171 6 8.0075 6.33579 8.0075 6.75C8.0075 7.16421 7.67171 7.5 7.2575 7.5H7.25C6.83579 7.5 6.5 7.16421 6.5 6.75Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11 6.75C11 6.33579 11.3358 6 11.75 6H11.7575C12.1717 6 12.5075 6.33579 12.5075 6.75C12.5075 7.16421 12.1717 7.5 11.7575 7.5H11.75C11.3358 7.5 11 7.16421 11 6.75Z"></path></svg></button></div>
          <button onClick={handleSendMessage}  className="flex h-13 w-full max-w-13 mt-1 items-center justify-center rounded-md bg-primary text-white hover:bg-opacity-90"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>    
      </div>
    </div>
  );
};

export default DiscussionDetailsTeam;
