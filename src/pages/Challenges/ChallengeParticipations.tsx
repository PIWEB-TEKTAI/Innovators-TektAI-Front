import React, { useState, useEffect } from 'react';
import { getUserById } from '../../services/user.service';
import { acceptParticipation } from '../../services/challengeService';
import Modal from '../../components/modal';

interface Props {
  challenge?: any;
  userAuth?:any;
}

const ChallengeParticipations: React.FC<Props> = ({ challenge,userAuth}) => {
  const [participantDetails, setParticipantDetails] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>(''); // Add more filter criteria as needed
  const  [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confiramtionMessage,setConfirmationMessage] = useState('');
  const [errorConfirmationMesage,setErrorConfirmationMessage]=useState(false);

  useEffect(() => {
    const fetchParticipantDetails = async () => {
      if (!challenge?.participations) return; // Ensure participations exist before processing

      const participants = challenge?.participations.soloParticipants || [];
      const requests = challenge?.participations.soloParticipationRequests || [];

      const details = await Promise.all([
        ...participants.map(async (participant: any) => {
          const user = await getUserById(participant);
          return { ...user, type: 'Participant' }; // Add type property
        }),
        ...requests.map(async (participant: any) => {
          const user = await getUserById(participant);
          return { ...user, type: 'Request' }; // Add type property
        })
      ]);

      setParticipantDetails(details);
    };

    fetchParticipantDetails();
  }, [challenge?.participations]);
  const handleConfirmationModalAppearance =(id:any)=>{
    setParticipationId(id);
    setShowConfirmationModal(true);
  }
const handleAcceptRequest = async (userId: string) => {
    try {
      await acceptParticipation(challenge._id, userId);
      setConfirmationMessage("Participation request accepted succesfully");

    } catch (error:any) {
      console.error('Error accepting participation request:', error);
      const errorMessage = error.response.data.message;
      setConfirmationMessage(errorMessage)  
      setErrorConfirmationMessage(true);
    }
  };
  const itemsPerPage = 10; // Adjust as needed
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = participantDetails.slice(indexOfFirstItem, indexOfLastItem);
  const [participationId,setParticipationId] = useState("");
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const closeModal = () => {
    setShowConfirmationModal(false);
  };
  return (
    
    <div>
         <Modal
        showModal={showConfirmationModal}
        setShowModal={setShowConfirmationModal}
        title="Add Paticipation Request"
        content="Are you sure you want to participate to this challenge?"
        onClose={closeModal}
        onSave={()=>handleAcceptRequest(participationId)}
        postSaveMessage={confiramtionMessage}
        error = {errorConfirmationMesage}

      />
      <ul>
        {currentItems.map((participation, index) => (
          <li key={index}>
            <div className="flex justify-between">
             <div className="flex">
             <img className="w-15 h-15 p-4" src={participation.imageUrl} alt="userImage" />
              <div className="flex-col">
                <div className="capitalize">{participation.FirstName} {participation.LastName}</div>
                <div>{participation.email}</div>

              </div>
             </div>
              <div className="flex justify-end">
              {participation.type =="Request"&&
              <>
                <div> {userAuth?._id == challenge.createdBy._id && challenge.status =="open" && challenge.createdBy.role=="company" &&
                (<button onClick={() => handleConfirmationModalAppearance(participation._id)} className='rounded-full py-1 px-3 text-sm font-semibold mr-4 bg-green-500 text-white'>accept</button>)}</div>

              </>}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div>
        {participantDetails.length > itemsPerPage && (
          <ul>
            {Array.from({ length: Math.ceil(participantDetails.length / itemsPerPage) }).map((_, index) => (
              <li key={index} onClick={() => paginate(index + 1)}>{index + 1}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChallengeParticipations;

