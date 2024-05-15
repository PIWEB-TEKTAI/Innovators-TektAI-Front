import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthProvider';
import { Converstation } from '../../types/converstation';
import { User } from '../../types/User';
import DiscussionDetailsTeam from './DiscussionDetailsTeam';

const DiscussionListTeam = () => {
  const [conversations, setConversations] = useState<Converstation[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<any | null>(
    null,
  );

  const [conversation, setConversation] = useState<Converstation | null>(null);


 


  const [clicked , setClicked] = useState(false);

  const { userAuth } = useAuth();

  const fetchConversations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/conv/list/${userAuth._id}`,
      );
      console.log('fetching data...' + response);
      const filteredConversations = response.data.filter((conversation: { team: any }) => 
        conversation.team && 
        (conversation.team.members.includes(userAuth?._id) || conversation.team.leader === userAuth?._id)
      );
      

      console.log(filteredConversations)

      setConversations(filteredConversations);
      /*const firstParticipant = filteredConversations.length > 0 ? filteredConversations[0].participants[0] : null;
        setSelectedParticipant(firstParticipant);*/
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  function calculateTimeDifference(messageTimestamp:any) {
    const messageDate = new Date(messageTimestamp).getTime();
    const currentDate = new Date().getTime();
  
    const differenceInMilliseconds = currentDate - messageDate;
  
    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
  
    if (differenceInMinutes < 60) {
      return `${differenceInMinutes} minute${differenceInMinutes !== 1 ? 's' : ''} ago`;
    } else if (differenceInMinutes < 24 * 60) {
      const differenceInHours = Math.floor(differenceInMinutes / 60);
      return `${differenceInHours} hour${differenceInHours !== 1 ? 's' : ''} ago`;
    } else {
      const differenceInDays = Math.floor(differenceInMinutes / (24 * 60));
      return `${differenceInDays} day${differenceInDays !== 1 ? 's' : ''} ago`;
    }
  }


  useEffect(() => {
    fetchConversations();
    console.log(conversations);
  }, []);

  const handleParticipantClick = (team: any , conv:any) => {
    setClicked(true);
    setSelectedTeam(team);
    setConversation(conv);
    
  };




  return (
    <ConnectedClientLayout>
      <div className="rounded-sm  border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b rounded-lg border-stroke py-4 px-6.5 dark:border-strokedark">
          <div className="flex">
            <div className="w-1/3 p-5 border-r border-gray-200 overflow-y-auto max-h-125">
              <h1 className="text-black font-medium text-xl">Active Conversations <span className='bg-blue-600 mt-2 ml-2 shadow-sm text-sm rounded-lg text-white py-1 px-2'>{conversations && conversations.length}</span></h1>
              <div className="mt-5">
                <ul>
                  {conversations.map((chat: any, key: any) => (
                    <div
                      className="flex items-center gap-5 py-3  hover:bg-gray-3 dark:hover:bg-meta-4"
                      key={key}
                    > 
                          <div
                            className="flex items-center gap-5 py-3  hover:bg-gray-3 dark:hover:bg-meta-4 cursor-pointer"
                            onClick={() => handleParticipantClick(chat.team,chat)}
                          >
                            <div className="relative h-14 w-14 rounded-full">
                              <div>
                                <img src={chat.team.imageUrl} alt="User" className="w-15 h-15 cursor-pointer rounded-full shadow-lg" />
                                <span
                                  className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white"
                                  style={{ backgroundColor: '#10B981' }}
                                ></span>
                              </div>
                            </div>
                            <div className="flex flex-1 items-center justify-between mt-2">
                              <div>
                                <h5 className="font-medium text-black dark:text-white capitalize">
                                   {chat.team.name}
                                </h5>

                                <p className='flex flex-col'>
                                  <span className={`text-md ${chat.messages[chat.messages.length - 1]?.sender !== userAuth?._id   && !clicked ? 'font-semibold' : ''} text-black dark:text-white`}>
                                      {chat.messages[chat.messages.length - 1]?.content}
                                  </span>
                                  
                                  {chat.messages[chat.messages.length - 1]?.timestamp && (
                                      <span className="text-xs text-blue-600 font-semibold"> {calculateTimeDifference(chat.messages[chat.messages.length - 1]?.timestamp)}</span>
                                  )}                               
                                </p>
                              </div>
                            </div>
                          </div>
                    </div>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-2/3 p-4">
              {selectedTeam  ? (
                <DiscussionDetailsTeam team={selectedTeam} converstation={conversation}/>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ConnectedClientLayout>
  );
};

export default DiscussionListTeam;
