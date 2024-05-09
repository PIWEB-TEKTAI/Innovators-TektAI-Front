import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';

import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { useAuth } from '../../components/Auth/AuthProvider';

interface LeaderData {
  _id: string;
  FirstName: string;
  LastName: string;
  imageUrl: string;
}

interface ChallengeData {
  _id: string;
  title: string;
  soloParticipants: { _id: string; FirstName: string; LastName: string; imageUrl: string }[];
  soloParticipationRequests: { _id: string; FirstName: string; LastName: string; imageUrl: string }[];
  teamParticipants: { _id: string; name: string; leader: LeaderData; imageUrl: string }[];
  teamParticipationRequests: { _id: string; name: string; leader: LeaderData; imageUrl: string }[];
}

const Participations = () => {
  const [participations, setParticipations] = useState<ChallengeData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Local state for search value
  const [selectedOption, setSelectedOption] = useState<string>('all'); // Local state for selected option
  const { userAuth } = useAuth();

  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const response = await axios.get<ChallengeData[]>('http://localhost:3000/challenges/participations', { withCredentials: true });
        const sortedParticipations = response.data.sort((a, b) => a.title.localeCompare(b.title));
        setParticipations(sortedParticipations);
      } catch (error) {
        console.error('Error fetching participations:', error);
      }
    };

    fetchParticipations();
  }, []);

  const allParticipants = participations.flatMap(participation => [
    ...participation.soloParticipants.map(participant => ({
      ...participant,
      type: 'Solo Participant',
      challengeTitle: participation.title
    })),
    ...participation.soloParticipationRequests.map(request => ({
      ...request,
      type: 'Solo Participation Request',
      challengeTitle: participation.title
    })),
    ...participation.teamParticipants.map(team => ({
      _id: team._id,
      FirstName: team.name,
      LastName: `(Leader: ${team.leader.FirstName} ${team.leader.LastName})`,
      imageUrl: team.imageUrl,
      type: 'Team Participant',
      challengeTitle: participation.title
    })),
    ...participation.teamParticipationRequests.map(request => ({
      _id: request._id,
      FirstName: request.name,
      LastName: '(Leader: ' + request.leader.FirstName + ' ' + request.leader.LastName + ')',
      imageUrl: request.imageUrl,
      type: 'Team Participation Request',
      challengeTitle: participation.title
    }))
  ]);

  const filteredParticipations = allParticipants.filter(participant =>
    (selectedOption === 'all' || participant.type === selectedOption) &&
    (participant.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.LastName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };



  const handleAcceptSolo = async (challengeTitle: string, userId: string, type: string) => {
    try {
      console.log('Accepting participation:', { challengeTitle, userId, type }); // Ajout du console.log
      await axios.put(`http://localhost:3000/challenge/${challengeTitle}/acceptParticipationtitle/${userId}`, { type }, { withCredentials: true });
      // Recharge la page après avoir accepté la participation avec succès
      window.location.reload();
    } catch (error) {
      console.error('Error accepting solo participation request:', error);
    }
  };
  
  const handleCancelSolo = async  (challengeTitle: string, userId: string, type: string) => {
    try {
      await axios.put(`http://localhost:3000/challenge/${challengeTitle}/declineParticipationtitle/${userId}`, { type }, { withCredentials: true });
      window.location.reload();
    } catch (error) {
      console.error('Error canceling solo participation request:', error);
      // Gérer les erreurs
    }
  };





  
  return (
    <ConnectedClientLayout>
        <div className="rounded-sm p-5  border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <h2 className="font-bold text-black text-title-xl mb-8">List of Participations</h2>
        {/* Search bar and dropdown menu */}
        <div className="flex justify-between mb-4">
          {/* Search bar */}
          <div>
            <input
              type="text"
              placeholder="Search for a participant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search value on change
              className="border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          {/* Filtering dropdown menu */}
          <div className="status-dropdown">
            <label htmlFor="status-select"></label>
            <select
              id="status-select"
              value={selectedOption}
              onChange={handleOptionChange}
              className="form-select ml-2"
            >
              <option value="all">All</option>
              <option value="Solo Participant">Solo Participants</option>
              <option value="Solo Participation Request">Solo Participation Requests</option>
              <option value="Team Participant">Team Participants</option>
              <option value="Team Participation Request">Team Participation Requests</option>
            </select> 
          </div>
        </div>
        {/* Table of filtered participations */}
        <div>
          <table className="table-auto border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th></th> {/* Add the "border-r" class to add a right border */}
                <th className="px-4 py-2">Participant</th>
                <th className="px-4 py-2">Participation Type</th>
                <th className="px-4 py-2">Challenge Name</th>
                <th className="px-4 py-2">Actions</th> {/* Add Actions column */}
              </tr>
            </thead>
            <tbody>
            {filteredParticipations.map((participant, index) => (
  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
    <td className="border px-4 py-2">
      <img src={participant.imageUrl} alt={`${participant.FirstName} ${participant.LastName}`} className="w-10 h-10 rounded-full mr-2" />
    </td>
    <td className="border px-4 py-2">{`${participant.FirstName} ${participant.LastName}`}</td>
    <td className="border px-4 py-2">{participant.type}</td>
    <td className="border px-4 py-2">{participant.challengeTitle}</td>
    <td className="border px-4 py-2">
    {participant.type === 'Solo Participation Request' && (
  <>
    <button onClick={() => handleAcceptSolo(participant.challengeTitle, participant._id, 'Request')} className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Accept</button>
    <button onClick={() => handleCancelSolo(participant.challengeTitle, participant._id, 'Request')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Decline</button>
  </>
)}
{participant.type === 'Team Participation Request' && (
  <>
    <button onClick={() => handleAcceptSolo(participant.challengeTitle, participant._id, 'TeamRequest')} className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Accept</button>
    <button onClick={() => handleCancelSolo(participant.challengeTitle, participant._id, 'TeamRequest' )} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Decline</button>
  </>
)}
{participant.type !== 'Solo Participation Request' && participant.type !== 'Team Participation Request' && (
  <p> Accepted</p>
  
)}


    </td>
  </tr>
))}

            </tbody>
          </table>
        </div>
      </div>
    </ConnectedClientLayout>
  );
};

export default Participations;
