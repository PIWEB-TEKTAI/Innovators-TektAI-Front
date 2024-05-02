import React, { useEffect, useState } from 'react';
import teamService from '../../services/teamsService';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal';

interface Props {
  team: any;
}

const JoinRequests: React.FC<Props> = ({ team }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<any>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [actionType, setActionType] = useState<'accept' | 'decline' | ''>('');

  useEffect(() => {
    console.log(team);
  }, [team]);

  const acceptRequest = async (teamId: any, userId: any) => {
    try {
      await teamService.acceptJoinRequest(teamId, userId);
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const declineRequest = async (teamId: any, userId: any) => {
    try {
      await teamService.declineJoinRequest(teamId, userId);
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const navigateToUser = (userId: any) => {
    navigate(`/visit/user/${userId}`);
  };

  const openModal = (requestId: any, action: 'accept' | 'decline') => {
    setSelectedRequestId(requestId);
    setActionType(action);
    setModalTitle(action === 'accept' ? 'Confirm Accept' : 'Confirm Decline');
    setModalContent(action === 'accept' ? `Are you sure you want to accept the request?` : `Are you sure you want to decline the request?`);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedRequestId(null);
    setActionType('');
    setShowModal(false);
  };

  const handleAction = () => {
    if (actionType === 'accept') {
      acceptRequest(team._id, selectedRequestId);
    } else if (actionType === 'decline') {
      declineRequest(team._id, selectedRequestId);
    }
    closeModal();
  };

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title={modalTitle}
        content={modalContent}
        onClose={closeModal}
        onSave={handleAction}
      />
      {team.requests?.map((request: any) => (
        <div key={request._id}>
          <div className="flex items-center my-4 rounded-full bg-gray-50 p-4 max-w-[85%]">
            <div className="flex cursor-pointer items-center" onClick={() => navigateToUser(request._id)}>
              <img src={request.imageUrl} alt="profile" className="rounded-full mr-2 max-h-10 w-10 mr-2" />
              <h3 className='text-black font-semibold capitalize'>{request.FirstName} {request.LastName}</h3>
            </div>
            <div className="flex justify-end ml-auto">
              <button onClick={() => openModal(request._id, 'accept')} className="mr-2 bg-green-500 text-white font-semibold text-sm rounded-full px-2 py-1">Accept</button>
              <button onClick={() => openModal(request._id, 'decline')} className="bg-red-500 text-white font-semibold text-sm rounded-full px-2 py-1">Reject</button>
            </div>
          </div>
        </div>
      ))}
      <ul className="pagination">
        {team.requests && team.requests.length > requestsPerPage && Array.from(Array(Math.ceil(team.requests.length / requestsPerPage)).keys()).map((pageNumber) => (
          <li key={pageNumber} className="page-item ">
            <button
              onClick={() => paginate(pageNumber + 1)}
              className={`page-link px-3 py-1 rounded-full  mx-1 ${currentPage === pageNumber + 1 ? 'bg-primary text-white' : ''}`}
            >
              {pageNumber + 1}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default JoinRequests;
