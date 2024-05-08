import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Assuming you're using React Router for routing
import Loader from '../../common/Loader';
import teamService from '../../services/teamsService';

const InvitationHandler = () => {
  const { token } = useParams(); // Extract token from URL params
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate()
  useEffect(() => {
    const handleInvitation = async () => {
      try {
        const response = await teamService.handleInvitationLink(token); 
        navigate(response.redirectTo)
      } catch (error:any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      handleInvitation();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  if (isLoading) {
    return <Loader/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {successMessage && <div>{successMessage}</div>}
      {/* You can redirect the user here if needed */}
    </div>
  );
};

export default InvitationHandler;
