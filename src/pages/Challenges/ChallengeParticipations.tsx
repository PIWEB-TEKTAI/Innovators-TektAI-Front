import React, { useState, useEffect } from 'react';
import { getUserById } from '../../services/user.service';
import { acceptParticipation, declineParticipation } from '../../services/challengeService';
import Modal from '../../components/modal';
import teamService from '../../services/teamsService';
import { useNavigate } from 'react-router-dom';

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
  const  [showDeclineModal, setShowDeclineModal] = useState(false);
  const [ParticipationType, setParticipationType] =useState('');

  useEffect(() => {
    const fetchParticipantDetails = async () => {
      if (!challenge?.participations) return; // Ensure participations exist before processing

      const participants = challenge?.participations.soloParticipants || [];
      const requests = challenge?.participations.soloParticipationRequests || [];
      const teamParticipants = challenge?.participations.TeamParticipants || [];
      const teamRequests = challenge?.participations.TeamParticipationRequests || [];

      const details = await Promise.all([
        ...participants.map(async (participant: any) => {
          const user = await getUserById(participant);
          return { ...user, type: 'Participant' }; // Add type property
        }),
        ...requests.map(async (participant: any) => {
          const user = await getUserById(participant);
          return { ...user, type: 'Request' }; // Add type property
        }),
        ...teamParticipants.map(async (participant: any) => {
          const team = await teamService.getTeamById(participant._id);
          return { ...team, type: 'TeamParticipant' }; // Add type property
        }),
        ...teamRequests.map(async (participant: any) => {
          const team = await teamService.getTeamById(participant._id);
          return { ...team, type: 'TeamRequest' }; // Add type property
        })
      ]);

      setParticipantDetails(details);
    };

    fetchParticipantDetails();
  }, [challenge?.participations]);


  const handleConfirmationModalAppearance =(id:any,type:string)=>{
    setParticipationId(id);
    setParticipationType(type)
    setShowConfirmationModal(true);
  }

   
  const handleDeclineModalAppearance =(id:any)=>{
    setParticipationId(id);
    setShowDeclineModal(true);
  }


const handleAcceptRequest = async (userId: string,type:string) => {
    try {
      await acceptParticipation(challenge._id, userId,type);
      setConfirmationMessage("Participation request accepted succesfully");
      setTimeout(() => {
        window.location.reload();
      }, 3000);

    } catch (error:any) {
      console.error('Error accepting participation request:', error);
      const errorMessage = error.response.data.message;
      setConfirmationMessage(errorMessage)  
      setErrorConfirmationMessage(true);
    }
  };


  const handleDeclineRequest = async (userId: string) => {
    try {
      await declineParticipation(challenge._id, userId);
      setConfirmationMessage("Participation request declined succesfully");
      setTimeout(() => {
        window.location.reload();
      }, 3000);

    } catch (error:any) {
      console.error('Error declining participation request:', error);
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

  const closeDeclineModal = () => {
    setShowDeclineModal(false);
  };
  const navigate = useNavigate();
  const navigateToUser =(userId:any) =>{
    navigate(`/visit/user/${userId}`);

  } 
  return (
    
    <div>
         <Modal
        showModal={showConfirmationModal}
        setShowModal={setShowConfirmationModal}
        title="Accept Paticipation Request"
        content="Are you sure you want to accept this participation request?"
        onClose={closeModal}
        onSave={()=>handleAcceptRequest(participationId,ParticipationType)}
        postSaveMessage={confiramtionMessage}
        error = {errorConfirmationMesage}
      />
      <Modal
        showModal={showDeclineModal}
        setShowModal={setShowDeclineModal}
        title="Decline Paticipation Request"
        content="Are you sure you want to decline this participation request?"
        onClose={closeDeclineModal}
        onSave={()=>handleDeclineRequest(participationId)}
        postSaveMessage={confiramtionMessage}
        error = {errorConfirmationMesage}
      />
      <ul>
        {currentItems.map((participation, index) => (
          <li key={index} className='mb-5'>
            <div className="flex justify-between">
             <div className="flex">
                {(participation.type == "Participant" || participation.type =="Request") && (      
                  <>       
                 <img className="w-18 h-18 p-4 cursor-pointer" src={participation.imageUrl} alt="userImage"  onClick={()=>navigateToUser(participation._id)} />
       
                  <div className="flex-col cursor-pointer" >

                       <div className="capitalize mt-3" onClick={()=>navigateToUser(participation._id)} >{participation.FirstName} {participation.LastName} </div>
                       <div>{participation.email}</div>
                  </div>

                  </>

                )}

                {(     
                  (participation.type == "TeamParticipant" || participation.type =="TeamRequest") && (
                   <>
                    <img className="w-18 h-18 p-4 cursor-pointer" src={participation.imageUrl} alt="userImage" />

                    <div className="capitalize mt-4 text-lg">{participation.name} </div>
                   </>

                 ))}

              </div>
         
              <div className="flex justify-end items-center">
              { (participation.type =="Request" || participation.type == "TeamRequest") &&
              <>
                <div>
                   {userAuth?._id == challenge.createdBy._id && challenge.status =="open" && challenge.createdBy.role=="company" &&
                (<button onClick={() => handleConfirmationModalAppearance(participation._id,participation.type )} className='rounded-full py-1 px-3 text-sm font-semibold mr-4 bg-green-500 text-white'>Accept</button>)}</div>

              </>
              
              }
               {participation.type =="Request"&&
              <>
                <div> {userAuth?._id == challenge.createdBy._id && challenge.status =="open" && challenge.createdBy.role=="company" &&
                (<button onClick={() => handleDeclineModalAppearance(participation._id)} className='rounded-full py-1 px-3 text-sm font-semibold mr-4 bg-red-500 text-white'>Decline</button>)}</div>

              </>
              
              }
              {participation.type =="Request" || participation.type == "TeamRequest"&&
              <>
                <div> {userAuth?.role === 'challenger' && challenge.status =="open" && challenge.participations.soloParticipationRequests.includes(userAuth?._id) &&
                (<span className='rounded-full py-1 px-3 text-sm font-semibold mr-4 bg-green-500 text-white'>Request sent</span>)}</div>

              </>
              
              }
              
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