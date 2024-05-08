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
import DiscussionDetails from './DiscussionDetails';

const DiscussionList = () => {
  const [conversations, setConversations] = useState<Converstation[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState<User | null>(
    null,
  );

  const { userAuth } = useAuth();

  const fetchConversations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/conv/list/${userAuth._id}`,
      );
      console.log('fetching data...' + response);
      const filteredConversations = response.data.map(
        (conversation: { participants: any[] }) => ({
          ...conversation,
          participants: conversation.participants.filter(
            (participant) => participant._id !== userAuth?._id,
          ),
        }),
      );

      setConversations(filteredConversations);
      /*const firstParticipant = filteredConversations.length > 0 ? filteredConversations[0].participants[0] : null;
        setSelectedParticipant(firstParticipant);*/
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  useEffect(() => {
    fetchConversations();
    console.log(conversations);
  }, []);

  const handleParticipantClick = (participant: any) => {
    console.log(participant)
    setSelectedParticipant(participant);
  };

  return (
    <ConnectedClientLayout>
      <div className="rounded-sm  border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b rounded-lg border-stroke py-4 px-6.5 dark:border-strokedark">
          <div className="flex">
            <div className="w-1/3 p-5 border-r border-gray-200">
              <h1 className="text-black text-xl">Active Conversations</h1>
              <div className="mt-5">
                <ul>
                  {conversations.map((chat: any, key: any) => (
                    <div
                      className="flex items-center gap-5 py-3  hover:bg-gray-3 dark:hover:bg-meta-4"
                      key={key}
                    >
                      {chat.participants.map(
                        (participant: any) => (
                          <div
                            className="flex items-center gap-5 py-3  hover:bg-gray-3 dark:hover:bg-meta-4 cursor-pointer"
                            onClick={() => handleParticipantClick(participant)}
                          >
                            <div className="relative h-14 w-14 rounded-full">
                              <div>
                                <img src={participant.imageUrl} alt="User" className="w-15 h-15 cursor-pointer rounded-full shadow-lg" />
                                <span
                                  className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white"
                                  style={{ backgroundColor: '#10B981' }}
                                ></span>
                              </div>
                            </div>
                            <div className="flex flex-1 items-center justify-between">
                              <div>
                                <h5 className="font-medium text-black dark:text-white capitalize">
                                  {participant?.role === "company"?(<>                    
                                                {participant.company.name}
</>):(<>
  {participant.FirstName} {participant.LastName}

</>)}
                                </h5>

                                <p>
                                  <span className="text-sm text-black dark:text-white">
                                    How are you?
                                  </span>
                                  <span className="text-xs"> 12 min</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-2/3 p-4">
              {selectedParticipant ? (
                <DiscussionDetails participant={selectedParticipant} />
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

export default DiscussionList;
